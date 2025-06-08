import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../utils/blogService';

export default function BlogForm({ setBlogs }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    coverImage: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newBlog = createBlog(form);
    setBlogs(prev => [...prev, newBlog]);  // update UI instantly
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">✍️ Create Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" onChange={handleChange} required className="w-full border rounded p-2" />
        <textarea name="content" placeholder="Content" onChange={handleChange} required rows={6} className="w-full border rounded p-2" />
        <input name="author" placeholder="Author" onChange={handleChange} required className="w-full border rounded p-2" />
        <input name="category" placeholder="Category" onChange={handleChange} required className="w-full border rounded p-2" />
        <input name="coverImage" placeholder="Cover Image URL" onChange={handleChange} required className="w-full border rounded p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
}
