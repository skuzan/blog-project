import { useState } from "react";
import { notify } from "../../Toasts/toast";

const AddPost = ({ onAddPost}) => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!title || !content) {
      notify.error("Title and content are required.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newPost = {
      title,
      excerpt,
      content,
      category,
      tags,
      createdAt : new Date().toISOString(),
      coverImage : "/images/posts/study-tips-7th.jpg",
      readingTime : 5
    };

    if (onAddPost) {
      onAddPost(newPost);
    }

    // formu sıfırla
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setTagsInput("");
  };

  return (
    <div className="addpost-page">
      <div className="addpost-card">
        <h1 className="addpost-title">Create New Post</h1>
        <p className="addpost-subtitle">
          Write a new blog post with title, short summary and full content.
        </p>

        <form className="addpost-form" onSubmit={handleSubmit}>
          {/* TITLE */}
          <div className="addpost-field">
            <label className="addpost-label">Title</label>
            <input
              type="text"
              className="addpost-input"
              placeholder="Getting Started with My Dev Blog"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* EXCERPT */}
          <div className="addpost-field">
            <label className="addpost-label">Excerpt</label>
            <textarea
              className="addpost-input addpost-textarea"
              placeholder="Short summary that will appear on the home page."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* CATEGORY */}
          <div className="addpost-field">
            <label className="addpost-label">Category</label>
            <input
              type="text"
              className="addpost-input"
              placeholder="e.g. Development, School, Lifestyle"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* TAGS */}
          <div className="addpost-field">
            <label className="addpost-label">Tags</label>
            <input
              type="text"
              className="addpost-input"
              placeholder="react, javascript, learning"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
            <span className="addpost-helper">
              Separate tags with commas (e.g. <em>react, javascript, blog</em>).
            </span>
          </div>

          {/* BUTTONS */}
          <div className="addpost-actions">
            <button type="submit" className="addpost-btn primary">
              Publish Post
            </button>
            <button
              type="button"
              className="addpost-btn ghost"
              onClick={() => {
                setTitle("");
                setExcerpt("");
                setContent("");
                setCategory("");
                setTagsInput("");
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

export default AddPost;