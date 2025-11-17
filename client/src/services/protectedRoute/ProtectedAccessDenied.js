import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../authService/AuthService';
import Loader from '../../common/Loader';
import { useUserAccess } from '../userAccessContext/UserAccessContext';
import axiosInstance from '../axiosInstance/AxiosInstance';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
    const token = getToken();
    const { userAccess, setUserAccess } = useUserAccess();

    useEffect(() => {
        const checkAccess = async () => {
            if (!token) {
                setUserAccess({ hasAccess: false, isLoading: false });
                return;
            }

            if (userAccess.hasAccess === null) {
                    try {
                    const response = await axiosInstance.get('/check-access');

                    if (response.status === 200 && response.data.message === 'Access granted') {
                        setUserAccess({ hasAccess: true, isLoading: false });
                    }
                } catch (error) {
                    console.error(error);
                    setUserAccess({ hasAccess: false, isLoading: false });
                }
            }
        };

        checkAccess();
    }, [token, userAccess, setUserAccess]);

    if (userAccess.isLoading) {
        return <Loader />;
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!userAccess.hasAccess) {
        return <Component {...rest} />;
    }

    return <Navigate to="/user/dashboard" />;
};

export default ProtectedRoute;
