import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Table, Tag, Select, Button, Modal, Input, Space } from 'antd'
import { getAllLeads, updateLeadStatus, deleteLead } from '../../../api/Lead'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import moment from 'moment'

const { Option } = Select
const { TextArea } = Input

function Leads() {
    const [leads, setLeads] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedLead, setSelectedLead] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isViewModalVisible, setIsViewModalVisible] = useState(false)
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => {
        fetchLeads()
    }, [])

    const fetchLeads = async () => {
        setLoading(true)
        try {
            const response = await getAllLeads()
            if (response.success) {
                setLeads(response.leads || [])
            }
        } catch (error) {
            console.error('Error fetching leads:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (leadId, newStatus) => {
        try {
            const response = await updateLeadStatus(leadId, { status: newStatus })
            if (response.success) {
                fetchLeads()
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const handleEdit = (lead) => {
        setSelectedLead(lead)
        setStatus(lead.status)
        setNotes(lead.notes || '')
        setIsModalVisible(true)
    }

    const handleView = (lead) => {
        setSelectedLead(lead)
        setIsViewModalVisible(true)
    }

    const handleSaveEdit = async () => {
        if (!selectedLead) return
        
        try {
            const response = await updateLeadStatus(selectedLead._id, { status, notes })
            if (response.success) {
                setIsModalVisible(false)
                setSelectedLead(null)
                setStatus('')
                setNotes('')
                fetchLeads()
            }
        } catch (error) {
            console.error('Error updating lead:', error)
        }
    }

    const handleDelete = async (leadId) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                const response = await deleteLead(leadId)
                if (response.success) {
                    fetchLeads()
                }
            } catch (error) {
                console.error('Error deleting lead:', error)
            }
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'orange'
            case 'contacted':
                return 'blue'
            case 'converted':
                return 'green'
            case 'rejected':
                return 'red'
            default:
                return 'default'
        }
    }

    const getStatusCounts = () => {
        const counts = {
            pending: 0,
            contacted: 0,
            converted: 0,
            rejected: 0,
            total: leads.length
        }
        leads.forEach(lead => {
            if (counts.hasOwnProperty(lead.status)) {
                counts[lead.status]++
            }
        })
        return counts
    }

    const statusCounts = getStatusCounts()

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            ellipsis: true,
            render: (text) => (
                <span title={text}>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    value={status}
                    onChange={(value) => handleStatusChange(record._id, value)}
                    style={{ width: 120 }}
                >
                    <Option value="pending">
                        <Tag color="orange">Pending</Tag>
                    </Option>
                    <Option value="contacted">
                        <Tag color="blue">Contacted</Tag>
                    </Option>
                    <Option value="converted">
                        <Tag color="green">Converted</Tag>
                    </Option>
                    <Option value="rejected">
                        <Tag color="red">Rejected</Tag>
                    </Option>
                </Select>
            ),
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Contacted', value: 'contacted' },
                { text: 'Converted', value: 'converted' },
                { text: 'Rejected', value: 'rejected' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('DD MMM YYYY, hh:mm A'),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<FaEye />}
                        onClick={() => handleView(record)}
                        title="View Details"
                    />
                    <Button
                        type="link"
                        icon={<FaEdit />}
                        onClick={() => handleEdit(record)}
                        title="Edit"
                    />
                    <Button
                        type="link"
                        danger
                        icon={<FaTrash />}
                        onClick={() => handleDelete(record._id)}
                        title="Delete"
                    />
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
                        <p className="text-gray-600 mt-1">Manage and track all customer inquiries</p>
                    </div>

                    {/* Status Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                            <div className="text-sm text-gray-600">Total Leads</div>
                            <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
                            <div className="text-sm text-gray-600">Pending</div>
                            <div className="text-2xl font-bold text-orange-600">{statusCounts.pending}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                            <div className="text-sm text-gray-600">Contacted</div>
                            <div className="text-2xl font-bold text-blue-600">{statusCounts.contacted}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                            <div className="text-sm text-gray-600">Converted</div>
                            <div className="text-2xl font-bold text-green-600">{statusCounts.converted}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
                            <div className="text-sm text-gray-600">Rejected</div>
                            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <Table
                            columns={columns}
                            dataSource={leads.map(lead => ({ ...lead, key: lead._id }))}
                            loading={loading}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showTotal: (total) => `Total ${total} leads`,
                            }}
                        />
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            <Modal
                title="Edit Lead"
                open={isModalVisible}
                onOk={handleSaveEdit}
                onCancel={() => {
                    setIsModalVisible(false)
                    setSelectedLead(null)
                    setStatus('')
                    setNotes('')
                }}
                okText="Save"
                cancelText="Cancel"
            >
                {selectedLead && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <Input value={selectedLead.name} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input value={selectedLead.email} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <Input value={selectedLead.phone} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <Select
                                value={status}
                                onChange={setStatus}
                                className="w-full"
                            >
                                <Option value="pending">Pending</Option>
                                <Option value="contacted">Contacted</Option>
                                <Option value="converted">Converted</Option>
                                <Option value="rejected">Rejected</Option>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <TextArea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                placeholder="Add notes about this lead..."
                            />
                        </div>
                    </div>
                )}
            </Modal>

            {/* View Modal */}
            <Modal
                title="Lead Details"
                open={isViewModalVisible}
                onCancel={() => {
                    setIsViewModalVisible(false)
                    setSelectedLead(null)
                }}
                footer={[
                    <Button key="close" onClick={() => {
                        setIsViewModalVisible(false)
                        setSelectedLead(null)
                    }}>
                        Close
                    </Button>,
                ]}
            >
                {selectedLead && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <p className="text-gray-900">{selectedLead.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <p className="text-gray-900">{selectedLead.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <p className="text-gray-900">{selectedLead.phone}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <p className="text-gray-900 whitespace-pre-wrap">{selectedLead.message}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <Tag color={getStatusColor(selectedLead.status)}>
                                {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                            </Tag>
                        </div>
                        {selectedLead.notes && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <p className="text-gray-900 whitespace-pre-wrap">{selectedLead.notes}</p>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                            <p className="text-gray-900">{moment(selectedLead.createdAt).format('DD MMMM YYYY, hh:mm A')}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Leads

