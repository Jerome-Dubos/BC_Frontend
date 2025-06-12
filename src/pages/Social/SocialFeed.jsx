import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SocialFeed.css";

const SocialFeed = () => {
  const { user, users, isDirectrice, isProfesseur, isEleve } = useAuth();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: users.find(
        (u) => u.role === "professeur" && u.matiere === "Mathématiques"
      ),
      content:
        "📊 Nouveaux exercices de géométrie disponibles pour les 3ème ! N'hésitez pas à me poser vos questions en commentaire.",
      timestamp: "2024-12-06T08:30:00",
      type: "document",
      subject: "Mathématiques",
      likes: 12,
      comments: 3,
      document: "Exercices Géométrie - Chapitre 5.pdf",
    },
    {
      id: 2,
      author: users.find((u) => u.role === "directrice"),
      content:
        "📢 Rappel important : Réunion parents-professeurs le vendredi 15 décembre à 18h. Merci de confirmer votre présence.",
      timestamp: "2024-12-06T09:15:00",
      type: "announcement",
      likes: 8,
      comments: 5,
    },
    {
      id: 3,
      author: users.find(
        (u) => u.role === "professeur" && u.matiere === "Français"
      ),
      content:
        "📚 Belle lecture de Lucas Petit sur 'Le Petit Prince' aujourd'hui ! Bravo pour cette analyse approfondie des thèmes.",
      timestamp: "2024-12-06T10:45:00",
      type: "praise",
      likes: 15,
      comments: 2,
      mentions: ["lucas.petit@bonecole.fr"],
    },
    {
      id: 4,
      author: users.find((u) => u.role === "eleve" && u.prenom === "Emma"),
      content:
        "❓ Est-ce que quelqu'un peut m'expliquer l'exercice 12 de la page 45 en mathématiques ? Je n'arrive pas à comprendre la méthode.",
      timestamp: "2024-12-06T11:20:00",
      type: "question",
      subject: "Mathématiques",
      likes: 3,
      comments: 7,
    },
  ]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: user,
      content: newPost,
      timestamp: new Date().toISOString(),
      type: "general",
      likes: 0,
      comments: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 60) {
      return `il y a ${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `il y a ${diffHours}h`;
    } else {
      return date.toLocaleDateString("fr-FR");
    }
  };

  const getPostIcon = (type) => {
    switch (type) {
      case "document":
        return "📚";
      case "announcement":
        return "📢";
      case "praise":
        return "🎉";
      case "question":
        return "❓";
      default:
        return "💬";
    }
  };

  const getPostColor = (type) => {
    switch (type) {
      case "document":
        return "bg-blue-50 border-blue-200";
      case "announcement":
        return "bg-red-50 border-red-200";
      case "praise":
        return "bg-green-50 border-green-200";
      case "question":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="social-feed-page">
      <div className="social-feed-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="social-feed-header"
        >
          <h1 className="feed-title">📱 Réseau Social</h1>
          <p className="feed-subtitle">
            {isDirectrice &&
              "Communiquez avec tout l'établissement et partagez des informations importantes"}
            {isProfesseur &&
              "Partagez vos contenus pédagogiques et échangez avec vos collègues"}
            {isEleve &&
              "Restez connecté avec vos camarades et suivez l'actualité de votre classe"}
          </p>
        </motion.div>

        {/* Zone de création de post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="post-creation-card"
        >
          <div className="post-creation-header">
            <div className="user-avatar">{user?.avatar}</div>
            <div className="post-input-container">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={
                  isDirectrice
                    ? "Partagez une annonce importante..."
                    : isProfesseur
                    ? "Partagez une ressource pédagogique..."
                    : "Quoi de neuf ?"
                }
                className="post-input"
                rows="3"
              />
              <div className="post-creation-footer">
                <div className="character-count">
                  {newPost.length}/500 caractères
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim() || newPost.length > 500}
                  className="post-submit-button"
                >
                  📝 Publier
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feed des posts */}
        <div className="posts-feed">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="post-card"
            >
              <div className="post-header">
                <div className="post-author-info">
                  <div className="post-author-avatar">
                    {post.author?.avatar}
                  </div>
                  <div className="post-author-details">
                    <div className="post-author-name">
                      {post.author?.prenom} {post.author?.nom}
                    </div>
                    <div className="post-author-role">{post.author?.role}</div>
                    <div className="post-timestamp">
                      {formatTimestamp(post.timestamp)}
                    </div>
                  </div>
                </div>

                <div className="post-type-badge">
                  <span className="post-type-icon">
                    {getPostIcon(post.type)}
                  </span>
                  <span className="post-type-label">{post.subject}</span>
                </div>
              </div>

              <div className="post-content">
                {post.subject && (
                  <div className="post-subject">{post.subject}</div>
                )}
                <p>{post.content}</p>

                {post.document && (
                  <div className="post-document">
                    <span className="document-icon">📄</span>
                    <div className="document-name">{post.document}</div>
                    <span className="download-icon">⬇️</span>
                  </div>
                )}

                {post.mentions && (
                  <div className="post-mentions">
                    Mentionne :{" "}
                    {post.mentions
                      .map((email) => {
                        const mentionedUser = users.find(
                          (u) => u.email === email
                        );
                        return mentionedUser
                          ? `${mentionedUser.prenom} ${mentionedUser.nom}`
                          : email;
                      })
                      .join(", ")}
                  </div>
                )}
              </div>

              <div className="post-footer">
                <div className="post-actions">
                  <button className="action-button">
                    ❤️ <span className="action-count">{post.likes}</span>
                  </button>
                  <button className="action-button">
                    💬 <span className="action-count">{post.comments}</span>
                  </button>
                  <button className="action-button">📤 Partager</button>
                </div>

                {(isDirectrice || post.author?.id === user?.id) && (
                  <button className="post-delete-button">
                    <span className="delete-icon">🗑️</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar communauté */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="community-sidebar"
        >
          <h3 className="sidebar-title">👥 Membres actifs</h3>
          <div className="members-grid">
            {users.slice(0, 8).map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-avatar">{member.avatar}</div>
                <div className="member-name">
                  {member.prenom} {member.nom}
                </div>
                <div className="member-role">{member.role}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialFeed;
