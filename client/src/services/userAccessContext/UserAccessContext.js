import React, { createContext, useState, useContext } from 'react';

const UserAccessContext = createContext();

export const UserAccessProvider = ({ children }) => {
    const [userAccess, setUserAccess] = useState({
        hasAccess: null,
        isLoading: true
    });

    const resetUserAccess = () => {
        setUserAccess({
            hasAccess: null,
            isLoading: true
        });
    };

    return (
        <UserAccessContext.Provider value={{ userAccess, setUserAccess, resetUserAccess }}>
            {children}
        </UserAccessContext.Provider>
    );
};

export const useUserAccess = () => useContext(UserAccessContext);
