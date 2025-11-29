import { Link } from "react-router";

const Posts = ({ posts }) => {

  const makeSlug = (title) =>
  title.toLowerCase().replace(/\s+/g, "-"); // tarayıcı adresini düzenleme başlığa göre


  return (
    <div className="posts-wrapper">
      {posts.map((post) => (
        
                <div className="post-card" key={post.id}>
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
          <ul className="tag-list">
            {post.tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </ul>
          <Link to = {`/posts/${makeSlug(post.title)}`} className="read-more-btn"> Read More</Link>
        </div>
        

      ))}
    </div>
  );
};

export default Posts;
