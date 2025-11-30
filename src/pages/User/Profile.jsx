import { useEffect, useState } from "react";
import { notify } from "../../Toasts/toast";

const Profile = ({ data, currentUserId, onUpdateUser }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

const currentUser = data.find((u) => u.id == currentUserId);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || "");
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
      setAvatar(currentUser.avatar || "");
      setBio(currentUser.bio || "");
    }
  }, [currentUser]);

    const handleSave = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      fullName,
      username,
      email,
      avatar,
      bio,
    };

    onUpdateUser(currentUser.id, updatedUser);

    notify.success("Your profile has been saved successfully.");
  };

  
  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p>No user loaded. Please login first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Profile Settings</h1>
        <p className="profile-subtitle">
          Update your personal information, avatar and bio.
        </p>

        <div className="profile-layout">
          {/* LEFT: FORM */}
          <form className="profile-form" onSubmit={handleSave}>
            <div className="profile-field">
              <label className="profile-label">Full Name</label>
              <input
                type="text"
                className="profile-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="profile-field">
              <label className="profile-label">Username</label>
              <input
                type="text"
                className="profile-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="profile-field">
              <label className="profile-label">Email</label>
              <input
                type="email"
                className="profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="profile-field">
              <label className="profile-label">Avatar URL</label>
              <input
                type="text"
                className="profile-input"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>

            <div className="profile-field">
              <label className="profile-label">Bio</label>
              <textarea
                className="profile-input profile-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="profile-btn primary">
                Save Changes
              </button>
            </div>
          </form>

          {/* RIGHT: PREVIEW */}
          <div className="profile-preview">
            <div className="profile-preview-card">
              <div className="profile-avatar-wrapper">
                <img
                  src={avatar}
                  alt={fullName}
                  className="profile-avatar"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/120";
                  }}
                />
              </div>
              <h2 className="profile-preview-name">{fullName}</h2>
              <p className="profile-preview-username">@{username}</p>
              <p className="profile-preview-bio">{bio}</p>
              <p className="profile-preview-email">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
