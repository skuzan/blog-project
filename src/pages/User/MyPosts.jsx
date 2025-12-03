import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";

const MyPosts = ({ posts, currentUserId, onDeletePost }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const makeSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

  // Kategorileri tekilleştir
  const categories = useMemo(() => {
    const all = posts.map((p) => p.category);
    return ["all", ...Array.from(new Set(all))];
  }, [posts]);

  // kategoriye göre filtrele
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // sadece giriş yapan kullanıcının postları
  const myPosts = filteredPosts.filter(
    (post) => String(post.userId) === String(currentUserId)
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDeletePost && onDeletePost(id);
    }
  };

  return (
    <div className="myposts-page">
      <div className="myposts-header">
        <div>
          <h1 className="myposts-title">My Posts</h1>
          <p className="myposts-subtitle">
            View, edit or delete the posts you have created.
          </p>
        </div>

        {/* FILTER SELECT */}
        <div className="posts-filter">
          <label htmlFor="category-filter">Filter by category: </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="myposts-list">
        {myPosts.map((post) => (
          <div className="mypost-card" key={post.id}>
            <div className="mypost-main">
              <div className="mypost-top-row">
                <span className="mypost-category">{post.category}</span>
                <span className="mypost-date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h2 className="mypost-title">{post.title}</h2>

              <div className="mypost-meta">
                <span>{post.readingTime} min read</span>
                <span>
                  •{" "}
                  {Array.isArray(post.tags)
                    ? post.tags.join(", ")
                    : post.tags || ""}
                </span>
              </div>

              <p className="mypost-excerpt">{post.excerpt}</p>
            </div>

            {/* Aksiyonlar */}
            <div className="mypost-actions">
              <Link
                to={`/posts/${makeSlug(post.title)}`}
                className="mypost-btn neutral"
              >
                View
              </Link>

              {/* Edit sayfası henüz yoksa Navigate'i sonra bağlarsın */}
              <button
                type="button"
                className="mypost-btn edit"
                onClick={() => navigate(`/update-post/${post.id}`)}
              >
                Edit
              </button>

              <button
                type="button"
                className="mypost-btn delete"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {myPosts.length === 0 && (
          <p className="myposts-empty">
            You don&apos;t have any posts in this category yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
