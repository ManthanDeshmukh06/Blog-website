import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogEdit from "./components/BlogEdit";
import BlogView from "./components/BlogView";

import { getAllBlogs } from "./utils/blogService";

export default function App() {
  const [localBlogs, setLocalBlogs] = useState([]);
  const [apiNews, setApiNews] = useState([]);

  useEffect(() => {
    setLocalBlogs(getAllBlogs());
  }, []);

  useEffect(() => {
    fetch("/news?q=tesla&from=2025-05-08&sortBy=publishedAt")
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          const newsBlogs = data.articles.map((item, idx) => ({
            id: "news-" + idx,
            title: item.title,
            content: item.description || "",
            author: item.source.name || "NewsAPI",
            category: "Business",
            coverImage: item.urlToImage || "",
          }));
          setApiNews(newsBlogs);
        }
      })
      .catch(() => setApiNews([]));
  }, []);

  const blogs = [...localBlogs, ...apiNews];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<BlogList blogs={blogs} setBlogs={setLocalBlogs} />}
        />
        <Route path="/create" element={<BlogForm setBlogs={setLocalBlogs} />} />
        <Route
          path="/edit/:id"
          element={<BlogEdit blogs={localBlogs} setBlogs={setLocalBlogs} />}
        />
        <Route path="/view/:id" element={<BlogView blogs={blogs} />} />
      </Routes>
    </Router>
  );
}
