import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BlogCreator = () => {
    const [blogs, setBlogs] = useState([]); // Initialize state to hold the blogs
    const [newBlog, setNewBlog] = useState({ title: '', short_desc: '' }); // Initialize state for new blog data
    const [isLoading, setIsLoading] = useState(false);

    const createBlog = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlog),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to create the blog.');
            }

            const createdBlog = await res.json();

            // Update the blogs state with the new blog
            setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);

            toast.success('Blog created successfully.');
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error(`An error occurred while creating the blog: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
    };

    return (
        <div>
            <h2>Create a New Blog</h2>
            <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleChange}
                placeholder="Blog Title"
            />
            <textarea
                name="short_desc"
                value={newBlog.short_desc}
                onChange={handleChange}
                placeholder="Short Description"
            />
            <button onClick={createBlog} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Blog'}
            </button>

            <div>
                <h3>Blogs</h3>
                {blogs.map((blog) => (
                    <div key={blog.id}>
                        <h4>{blog.title}</h4>
                        <p>{blog.short_desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogCreator;
