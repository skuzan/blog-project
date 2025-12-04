import { useParams, Link, useNavigate } from "react-router";

const PostDetails = ({ posts }) => {
  const makeSlug = (title) => title.toLowerCase().replace(/\s+/g, "-"); // tarayıcı adresini düzenleme başlığa göre

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => makeSlug(p.title) == postId);

  if (!post) {
    return <div className="post-detail">Post not found.</div>;
  }

  return (
    <div className="post-detail">
      <button className="post-back-btn"  onClick={()=>navigate(-1)}>
        ← Back to Posts
      </button>

      <h1 className="post-detail-title">{post.title}</h1>

      <div className="post-detail-meta">
        <span>{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
        <span>• {post.readingTime} min read</span>
      </div>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="post-detail-cover"
        />
      )}

      <p className="post-detail-content">{post.content}</p>

      <div className="post-detail-tags">
        {post.tags.map((tag, index) => (
          <div key={index} className="post-detail-tag">
            {tag}
          </div>
        ))}
      </div>
      <section className="other-blogs">
        <h3>📖 You may also like</h3>
        <div className="other-blogs-list">
          {posts
            .filter((b) => b.id !== postId)
            .slice(0, 5)
            .map((b) => (
              <Link key={b.id} to={`/posts/${makeSlug(b.title)}`} className="other-blog-link">
                {b.title}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PostDetails;
