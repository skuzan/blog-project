const Messages = ({ messages, onDeleteMessage }) => {
  return (
    <section className="messages-page">
      <div className="messages-header">
        <h1>Messages</h1>
        <p>All messages submitted via the contact form.</p>
      </div>

      {!messages || messages.length === 0 ? (
        <div className="messages-empty">
          <h2>No messages yet</h2>
          <p>
            Once someone submits your contact form, their message will appear
            here.
          </p>
        </div>
      ) : (
        <div className="messages-grid">
          {[...messages].reverse().map((message) => (
            <article className="message-card" key={message.id}>
              <div className="message-card-header">
                <div className="message-card-title">
                  <h2>{message.fullName}</h2>
                  <p className="message-meta">
                    {message.email}
                    {message.phone && (
                      <>
                        <span className="meta-separator">·</span>
                        <span>{message.phone}</span>
                      </>
                    )}
                  </p>
                  {/* 🔥 NEW: DATE */}
                  <p className="message-date">
                    {new Date(message.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  className="message-delete"
                  onClick={() => {
                    const confirm = window.confirm(
                      "Silmek istediğinize emin misiniz"
                    );

                    if (confirm) {
                      onDeleteMessage && onDeleteMessage(message.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>

              <p className="message-body">{message.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Messages;
