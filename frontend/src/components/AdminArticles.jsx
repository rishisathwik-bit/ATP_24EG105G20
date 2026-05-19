import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import {
  articleCardClass,
  articleExcerpt,
  articleMeta,
  articleStatusActive,
  articleStatusDeleted,
  articleTitle,
  emptyStateClass,
  errorClass,
  loadingClass,
} from "../styles/common";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${BASE_URL}/admin-api/articles`, {
          withCredentials: true,
        });
        setArticles(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (articles.length === 0) {
    return <p className={emptyStateClass}>No articles found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {articles.map((article) => (
        <div key={article._id} className={`${articleCardClass} relative`}>
          <span
            className={
              article.isArticleActive ? articleStatusActive : articleStatusDeleted
            }
          >
            {article.isArticleActive ? "ACTIVE" : "DELETED"}
          </span>
          <p className={articleMeta}>{article.category}</p>
          <p className={`${articleTitle} line-clamp-2`}>{article.title}</p>
          <p className={`${articleExcerpt} line-clamp-3`}>{article.content}</p>
          <p className={articleMeta}>
            By {article.author?.email || "Unknown author"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminArticles;
