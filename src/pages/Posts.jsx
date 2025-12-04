import { useState, useMemo } from "react";
import { Link } from "react-router";

const Posts = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const makeSlug = (title) => title.toLowerCase().replace(/\s+/g, "-"); // tarayıcı adresini düzenleme başlığa göre

  // Tekrarlayan kategorileri temizleyelim
  const categories = useMemo(() => {
    const all = posts.map((p) => p.category);
    return ["all", ...Array.from(new Set(all))]; // "all" + unique category list
  }, [posts]);

  // Seçili kategoriye göre post'ları filtrele
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="posts-wrapper">
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

      <div className="posts-search">
        <label htmlFor="search">Search posts: </label>
        <input
          id="search"
          type="text"
          placeholder="Search by title, excerpt or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* POSTS LIST */}
      {filteredPosts.map((post) => {
        // 🔐 tags'i güvene al (BURADA HESAPLIYORUZ)
        const safeTags = Array.isArray(post.tags)
          ? post.tags
          : typeof post.tags === "string"
          ? post.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

        return (
          <div className="post-card" key={post.id}>
            <h3>{post.category}</h3>
            <h2>{post.title}</h2>

            <div className="post-meta">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>• {post.readingTime} min read</span>
            </div>

            <p className="post-excerpt">{post.excerpt}</p>

            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="post-image"
              />
            )}

            <p className="post-content">{post.content}</p>

            {safeTags.length > 0 && (
              <ul className="tag-list">
                {safeTags.map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
            )}

            <Link
              to={`/posts/${makeSlug(post.title)}`}
              className="read-more-btn"
            >
              Read More
            </Link>
          </div>
        );
      })}

      {filteredPosts.length === 0 && <p>No posts found for this category.</p>}
    </div>
  );
};

export default Posts;
