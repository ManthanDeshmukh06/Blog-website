const STORAGE_KEY = 'blogs';

export const getAllBlogs = () => {
  const blogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return blogs;
};

export const getBlogById = (id) => {
  const blogs = getAllBlogs();
  return blogs.find(blog => blog.id.toString() === id.toString());
};

export const createBlog = (blog) => {
  const blogs = getAllBlogs();
  blog.id = Date.now().toString();
  const updatedBlogs = [...blogs, blog];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
  return blog;
};

export const updateBlog = (id, updatedBlog) => {
  const blogs = getAllBlogs().map(blog =>
    blog.id.toString() === id.toString() ? { ...updatedBlog, id: blog.id } : blog
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return blogs;  // <-- return updated list here for state update
};

export const deleteBlog = (id) => {
  const blogs = getAllBlogs().filter(blog => blog.id.toString() !== id.toString());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return blogs;  // <-- return updated list here for state update
};
