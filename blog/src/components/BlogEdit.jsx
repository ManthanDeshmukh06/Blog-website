import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogById, updateBlog } from '../utils/blogService';

export default function BlogEdit({ blogs, setBlogs }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const blog = getBlogById(id);
    setForm(blog);
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updatedBlogs = updateBlog(id, form);  // update localStorage & get updated list
    setBlogs(updatedBlogs);  // update state to reflect UI immediately
    navigate('/');
  };

  if (!form) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} required className="w-full border rounded p-2" />
        <textarea name="content" value={form.content} onChange={handleChange} required rows={6} className="w-full border rounded p-2" />
        <input name="author" value={form.author} onChange={handleChange} required className="w-full border rounded p-2" />
        <input name="category" value={form.category} onChange={handleChange} required className="w-full border rounded p-2" />
        <input name="coverImage" value={form.coverImage} onChange={handleChange} required className="w-full border rounded p-2" />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Update</button>
      </form>
    </div>
  );
}
