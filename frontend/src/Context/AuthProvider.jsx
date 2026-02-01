import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState();
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    const fetchProfile = async () => {
        try {
            const { data } = await axios.get("http://localhost:4001/api/users/my-profile", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            setIsAuthenticated(true);
            setProfile(data.data);
        } catch (error) {
            console.log("error fetching profile:", error);
            setIsAuthenticated(false);
        }
    };
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const {data} = await axios.get("http://localhost:4001/api/blogs/all-blogs");
                setBlogs(data);
            } catch (error) {
                console.log("error fetching blogs:", error);
            }
        };
        fetchBlogs();
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ blogs, profile, setProfile, isAuthenticated, setIsAuthenticated, fetchProfile }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;


