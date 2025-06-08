import { Link } from "react-router-dom";
import { deleteBlog } from "../utils/blogService";

export default function BlogList({ blogs, setBlogs }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedBlogs = deleteBlog(id);  // delete from localStorage & get updated list
      setBlogs(updatedBlogs);  // update UI instantly
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">📝 All Blogs</h2>
          <Link to="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition">
            ➕ Create New
          </Link>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs found. Create one!</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img src={blog.coverImage} alt="Cover" className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{blog.content?.slice(0, 100)}...</p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>{blog.author}</strong> · {blog.category}
                  </p>
                  <div className="flex gap-2 justify-between">
                    <Link to={`/view/${blog.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm transition">View</Link>
                    <Link to={`/edit/${blog.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md text-sm transition">Edit</Link>
                    <button onClick={() => handleDelete(blog.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
