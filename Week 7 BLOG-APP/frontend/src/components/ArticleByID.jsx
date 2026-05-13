import { useParams, useLocation, useNavigate } from "react-router-dom"; // usually imported from react-router-dom
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast"; // <-- Make sure to import your toast library

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const user = useAuth((state) => state.currentUser);

  // 1. Ensure location.state is only used if it matches the current URL id
  const [article, setArticle] = useState(() => {
    if (location.state && location.state._id === id) {
      return location.state;
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Prevent fetching ONLY if we already have the specific article for this ID
    if (article && article._id === id) return;

    const getArticle = async () => {
      setLoading(true);
      setError(null); // Reset errors on new fetch attempts

      try {
        const res = await axios.get(
          // 3. Changed 'article' to 'articles' (Standard REST APIs usually use plural for routes)
          // Change back to 'article/${id}' if your backend specifically uses the singular form.
          `https://atp-24eg105g20-2.onrender.com/user-api/articles/${id}`,
          { withCredentials: true }
        );

        setArticle(res.data.payload);
      } catch (err) {
        // 4. Added robust error fallbacks for CORS/Network issues
        setError(
          err.response?.data?.message || 
          err.response?.data?.error || 
          err.message || 
          "Failed to fetch article"
        );
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]); // Only re-run when the ID in the URL changes

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus
      ? "Restore this article?"
      : "Delete this article?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `https://atp-24eg105g20-2.onrender.com/author-api/articles`,
        {
          articleId: article._id,
          isArticleActive: newStatus,
        },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      navigate("/author-profile");
    } catch (err) {
      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        // Ensure toast is imported at the top!
        // toast(msg); 
        alert(msg); // Fallback if toast isn't set up
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  const addComment = async (commentObj) => {
    try {
      commentObj.articleId = article._id;

      let res = await axios.put(
        "https://atp-24eg105g20-2.onrender.com/user-api/articles",
        commentObj,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setArticle(res.data.payload);
        reset(); // Clear the comment input after successful submission
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  if (loading)
    return <p className={loadingClass + " text-center px-4"}>Loading article...</p>;

  if (error)
    return <p className={errorClass + " text-center px-4 text-red-500"}>{error}</p>;

  if (!article) return null;

  return (
    <div className={`${articlePageWrapper} px-4 sm:px-6 py-6 sm:py-10 max-w-4xl mx-auto`}>

      {/* Header */}
      <div className={`${articleHeader} space-y-3 sm:space-y-4`}>

        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase text-lg sm:text-2xl md:text-3xl`}>
          {article.title}
        </h1>

        <div className={`${articleAuthorRow} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm`}>
          {/* 5. Safe optional chaining added to user?.role to prevent crashes if logged out */}
          <div className={authorInfo}>✍ {user?.role || "Guest"}</div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={`${articleContent} text-sm sm:text-base leading-relaxed`}>
        {article.content}
      </div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={`${articleActions} flex flex-col sm:flex-row gap-3 mt-4`}>

          <button className={`${editBtn} w-full sm:w-auto`} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={`${deleteBtn} w-full sm:w-auto`} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>

        </div>
      )}

      {/* USER actions */}
      {user?.role === "USER" && (
        <div className={`${articleActions} mt-4`}>

          <form onSubmit={handleSubmit(addComment)} className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              {...register("comment", { required: true })}
              className={`${inputClass} text-sm sm:text-base`}
              placeholder="Write your comment here..."
            />

            <button
              type="submit"
              className="bg-amber-600 text-white px-5 py-2 rounded-2xl w-full sm:w-auto"
            >
              Add comment
            </button>

          </form>

        </div>
      )}

      {/* comments */}
      <div className={`${commentsWrapper} mt-6 sm:mt-8`}>

        {(!article.comment || article.comment.length === 0) && (
          <p className="text-[#a1a1a6] text-sm text-center">
            No comments yet
          </p>
        )}

        {article.comment?.map((commentObj, index) => {
          const name = commentObj.user?.email || "User";
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={`${commentCard} p-3 sm:p-4`}>

              <div className={commentHeader}>
                <div className={commentUserRow}>

                  <div className={`${avatar} w-8 h-8 sm:w-10 sm:h-10`}>
                    {firstLetter}
                  </div>

                  <div>
                    <p className={`${commentUser} text-sm sm:text-base`}>
                      {name}
                    </p>
                    <p className={`${commentTime} text-xs sm:text-sm`}>
                      {formatDate(commentObj.createdAt || new Date())}
                    </p>
                  </div>

                </div>
              </div>

              <p className={`${commentText} text-sm sm:text-base`}>
                {commentObj.comment}
              </p>

            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={`${articleFooter} text-xs sm:text-sm mt-6`}>
        Last updated: {formatDate(article.updatedAt)}
      </div>

    </div>
  );
}

export default ArticleByID;
