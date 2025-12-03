import { useEffect, useState } from "react";
import { notify } from "../../Toasts/toast";
import { useNavigate, useParams } from "react-router";

const UpdatePost = ({ onUpdatePost, posts, currentUserId }) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const editPost = posts.find((post) => post.id === postId);

  console.log(editPost);

  const [formPost, setFormPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
  });

  useEffect(() => {
    if (editPost) {
      setFormPost({
        title: editPost.title || "",
        excerpt: editPost.excerpt || "",
        content: editPost.content || "",
        category: editPost.category || "",
        // tags array ise virgülle birleştir
        tags: Array.isArray(editPost.tags)
          ? editPost.tags.join(", ")
          : editPost.tags || "",
      });
    }
  }, [editPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formPost.title ||
      !formPost.excerpt ||
      !formPost.content ||
      !formPost.category ||
      !formPost.tags
    ) {
      notify.error("Title, Excerpt, Content, Category and Tags are required.");
      return;
    }

    const tagsArray = formPost.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedPost = {
      ...editPost,
      title: formPost.title,
      excerpt: formPost.excerpt,
      content: formPost.content,
      category: formPost.category,
      tags: tagsArray,
      userId: currentUserId,
      createdAt: new Date().toISOString(),
      coverImage: "/images/posts/study-tips-7th.jpg",
      readingTime: 5,
    };

    if (updatedPost) {
      onUpdatePost(editPost.id, updatedPost);
    }

    setFormPost({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
    });
    notify.success("Your post has been updated successfully. ");
  };

  return (
    <div className="addpost-page">
      <div className="addpost-card">
        <h1 className="addpost-title">Create New Post</h1>
        <p className="addpost-subtitle">
          Update a new blog post with title, short summary and full content.
        </p>

        <form className="addpost-form" onSubmit={handleSubmit}>
          {/* TITLE */}
          <div className="addpost-field">
            <label className="addpost-label">Title</label>
            <input
              type="text"
              className="addpost-input"
              placeholder="Getting Started with My Dev Blog"
              name="title"
              value={formPost.title}
              onChange={handleChange}
            />
          </div>

          {/* EXCERPT */}
          <div className="addpost-field">
            <label className="addpost-label">Excerpt</label>
            <textarea
              className="addpost-input addpost-textarea"
              placeholder="Short summary that will appear on the home page."
              value={formPost.excerpt}
              name="excerpt"
              onChange={handleChange}
            />
            <span className="addpost-helper">
              Keep it short and inviting (1–2 sentences).
            </span>
          </div>

          {/* CONTENT */}
          <div className="addpost-field">
            <label className="addpost-label">Content</label>
            <textarea
              className="addpost-input addpost-textarea addpost-textarea-big"
              placeholder="Write your full blog content here..."
              value={formPost.content}
              name="content"
              onChange={handleChange}
            />
          </div>

          {/* CATEGORY */}
          <div className="addpost-field">
            <label className="addpost-label">Category</label>
            <input
              type="text"
              className="addpost-input"
              placeholder="e.g. Development, School, Lifestyle"
              value={formPost.category}
              name="category"
              onChange={handleChange}
            />
          </div>

          {/* TAGS */}
          <div className="addpost-field">
            <label className="addpost-label">Tags</label>
            <input
              type="text"
              className="addpost-input"
              placeholder="react, javascript, learning"
              name="tags"
              value={formPost.tags}
              onChange={handleChange}
            />
            <span className="addpost-helper">
              Separate tags with commas (e.g. <em>react, javascript, blog</em>).
            </span>
          </div>

          {/* BUTTONS */}
          <div className="addpost-actions">
            <button type="submit" className="addpost-btn primary">
              Update Post
            </button>
            <button
              type="button"
              className="addpost-btn ghost"
              onClick={() => {
                setFormPost.title("");
                setFormPost.excerpt("");
                setFormPost.content("");
                setFormPost.category("");
                setFormPost.tags("");
              }}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
