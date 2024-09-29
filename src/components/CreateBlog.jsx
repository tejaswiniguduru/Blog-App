import { useState } from 'react'; 
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [html, setHtml] = useState('');
    const navigate = useNavigate();

    function onChange(e) {
        setHtml(e.target.value);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSubmit = async (data) => {
        const newData = {
            ...data, 
            description: html
        };

        console.log("Submitted Data:", newData); // Log the data to check its structure

        try {
            const res = await fetch("http://localhost:8000/api/blogs", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Server Error:", errorData);
                throw new Error(errorData.message || 'Network response was not ok');
            }

            toast("Blog added successfully.");
            navigate('/');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast('An error occurred while creating the blog.');
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Create Blog</h4>
                <a href="/" className='btn btn-dark'>Back</a>
            </div>
            <div className="card border-0 shadow-lg mb-5">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input 
                                {...register('title', { required: true })} 
                                type="text" 
                                className={`form-control ${errors.title && 'is-invalid'}`} 
                                placeholder='Title' 
                            />
                            {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Short Description</label>
                            <textarea 
                                {...register('short_desc')} 
                                cols="30" 
                                rows="5" 
                                className='form-control'>
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            <Editor 
                                value={html}
                                containerProps={{ style: { height: '700px' } }}
                                onChange={onChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Author</label>
                            <input 
                                {...register('author', { required: true })} 
                                type="text" 
                                className={`form-control ${errors.author && 'is-invalid'}`} 
                                placeholder='Author' 
                            />
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        </div>
                        <button type="submit" className='btn btn-dark'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog;
