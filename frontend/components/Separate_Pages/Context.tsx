// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the user context
export interface UserContextType {
    addUser: (userId: string, email: string) => void;
    getUserEmail: (userId: string) => string | null;
}

// Create a default context value
const defaultContextValue: UserContextType = {
    addUser: () => {}, // Empty function for default
    getUserEmail: () => null, // Return null for default
};

// Create the context
const UserContext = createContext<UserContextType>(defaultContextValue);

// Define the props for the provider
interface UserProviderProps {
    children: ReactNode;
}

// Create the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<{ [key: string]: string }>({});

    const addUser = (userId: string, email: string) => {
        setUsers((prevUsers) => ({
            ...prevUsers,
            [userId]: email,
        }));
    };

    const getUserEmail = (userId: string) => {
        return users[userId] || null;
    };

    return (
        <UserContext.Provider value={{ addUser, getUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for using the UserContext
export const useUser = () => {
    return useContext(UserContext);
};
