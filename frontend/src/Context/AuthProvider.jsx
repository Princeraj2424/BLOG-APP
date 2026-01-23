import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const {data} = await axios.get("http://localhost:4001/api/blogs/all-blogs");
                console.log(data);
                setBlogs(data.blogs);
            } catch (error) {
                console.log("error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;


