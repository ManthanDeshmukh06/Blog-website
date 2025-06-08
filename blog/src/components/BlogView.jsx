import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BlogView({ blogs }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const found = blogs.find(b => b.id === id);
    setBlog(found || null);
  }, [id, blogs]);

  if (!blog) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <img src={blog.coverImage} alt="cover" className="w-full h-64 object-cover rounded-md mb-4" />
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <p className="text-sm text-gray-500"><strong>{blog.author}</strong> &middot; {blog.category}</p>
    </div>
  );
}
