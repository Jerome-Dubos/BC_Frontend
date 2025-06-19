import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  IoAddOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoSyncOutline,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import "./UserManagement.css";

// Composant Modal Portal pour affichage pleine page
const ModalPortal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return createPortal(children, document.body);
};

const UserManagement = ({
  students = [],
  showCreateForm: propShowCreateForm,
  setShowCreateForm: propSetShowCreateForm,
  newUser: propNewUser,
  setNewUser: propSetNewUser,
  handleCreateUser: propHandleCreateUser,
}) => {
  const [localShowCreateForm, setLocalShowCreateForm] = useState(false);
  const [localNewUser, setLocalNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [localUsers, setLocalUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const showCreateForm =
    propShowCreateForm !== undefined ? propShowCreateForm : localShowCreateForm;
  const setShowCreateForm = propSetShowCreateForm || setLocalShowCreateForm;
  const newUser = propNewUser || localNewUser;
  const setNewUser = propSetNewUser || setLocalNewUser;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showDeleteModal) setShowDeleteModal(false);
        else if (showEditModal) setShowEditModal(false);
        else if (showViewModal) setShowViewModal(false);
        else if (showCreateForm) setShowCreateForm(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    showDeleteModal,
    showEditModal,
    showViewModal,
    showCreateForm,
    setShowCreateForm,
  ]);

  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) {
      closeFunction();
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateUser =
    propHandleCreateUser ||
    ((e) => {
      e.preventDefault();
      console.log("Création d'utilisateur:", newUser);

      const newUserWithId = {
        ...newUser,
        id: Date.now(),
        status: "active",
      };
      setLocalUsers((prev) => [...prev, newUserWithId]);

      showNotification(`Utilisateur ${newUser.name} créé avec succès !`);
      setShowCreateForm(false);
      setNewUser({
        name: "",
        email: "",
        role: "student",
        password: "",
      });
    });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setLocalUsers((prev) =>
      prev.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    showNotification(`Utilisateur ${editingUser.name} modifié avec succès !`);
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLocalUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
    showNotification(
      `Utilisateur ${selectedUser.name} supprimé avec succès !`,
      "warning"
    );
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const defaultUsers = [
    {
      id: 1,
      name: "Marie Dupont",
      email: "marie.dupont@email.com",
      role: "student",
      status: "active",
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@email.com",
      role: "teacher",
      status: "active",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      email: "sophie.laurent@email.com",
      role: "student",
      status: "inactive",
    },
    {
      id: 4,
      name: "Pierre Dubois",
      email: "pierre.dubois@email.com",
      role: "teacher",
      status: "active",
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      role: "student",
      status: "active",
    },
  ];

  const baseUsers = students.length > 0 ? students : defaultUsers;
  const usersToDisplay = [...baseUsers, ...localUsers];

  // Fonction pour générer un mot de passe sécurisé
  const generateSecurePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "-_"; // Seulement tirets et underscores

    const allChars = lowercase + uppercase + numbers + symbols;
    let password = "";

    // Assurer au moins un caractère de chaque type
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Compléter avec des caractères aléatoires pour atteindre 12 caractères
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Mélanger le mot de passe
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const handleGeneratePassword = () => {
    const newPassword = generateSecurePassword();
    setNewUser({ ...newUser, password: newPassword });
    showNotification("Mot de passe sécurisé généré !", "success");
  };

  return (
    <div className="user-management-section">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === "success" ? (
            <IoCheckmarkCircleOutline size={20} />
          ) : (
            <IoAlertCircleOutline size={20} />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="user-management-header">
        <h3 className="user-management-title">Gestion des utilisateurs</h3>
        <button
          className="user-management-add-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <IoAddOutline size={16} />
          Créer un utilisateur
        </button>
      </div>

      <div className="user-management-users-grid">
        {usersToDisplay.map((user) => (
          <div key={user.id} className="user-management-user-card">
            <div className="user-management-user-header">
              <div className="user-management-user-avatar">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="user-management-user-info">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <span className={`user-management-user-role ${user.role}`}>
                  {user.role === "teacher" && <IoPersonOutline size={12} />}
                  {user.role === "student" && <IoSchoolOutline size={12} />}
                  {user.role === "director" && (
                    <MdAdminPanelSettings size={12} />
                  )}
                  {user.role === "teacher"
                    ? "Professeur"
                    : user.role === "student"
                    ? "Étudiant"
                    : "Directeur"}
                </span>
              </div>
            </div>
            <div className="user-management-user-actions">
              <button
                className="user-management-action-btn view"
                onClick={() => handleViewUser(user)}
                title="Voir les détails"
              >
                <IoEyeOutline size={14} />
              </button>
              <button
                className="user-management-action-btn edit"
                onClick={() => handleEditUser(user)}
                title="Modifier l'utilisateur"
              >
                <IoCreateOutline size={14} />
              </button>
              <button
                className="user-management-action-btn delete"
                onClick={() => handleDeleteUser(user)}
                title="Supprimer l'utilisateur"
              >
                <IoTrashOutline size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de création d'utilisateur - PORTAL PLEINE PAGE */}
      <ModalPortal isOpen={showCreateForm}>
        <div
          className="modal-overlay"
          onClick={(e) => handleOverlayClick(e, () => setShowCreateForm(false))}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3>Créer un nouvel utilisateur</h3>
              <button
                className="close-modal"
                onClick={() => setShowCreateForm(false)}
              >
                <IoCloseOutline size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="student">Étudiant</option>
                  <option value="teacher">Professeur</option>
                  <option value="director">Directeur</option>
                </select>
              </div>
              <div className="form-group">
                <label>Mot de passe temporaire</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    required
                    placeholder="Mot de passe"
                  />
                  <div className="password-buttons">
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      title={
                        showPassword
                          ? "Cacher le mot de passe"
                          : "Voir le mot de passe"
                      }
                    >
                      {showPassword ? (
                        <IoEyeOffOutline size={16} />
                      ) : (
                        <IoEyeOutline size={16} />
                      )}
                    </button>
                    <button
                      type="button"
                      className="generate-password-btn"
                      onClick={handleGeneratePassword}
                      title="Générer un mot de passe sécurisé"
                    >
                      <IoSyncOutline size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  Annuler
                </button>
                <button type="submit">
                  <IoAddOutline size={16} />
                  Créer l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalPortal>

      {/* Modal de visualisation - PORTAL PLEINE PAGE */}
      <ModalPortal isOpen={showViewModal && selectedUser}>
        <div
          className="modal-overlay"
          onClick={(e) => handleOverlayClick(e, () => setShowViewModal(false))}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3>Détails de l'utilisateur</h3>
              <button
                className="close-modal"
                onClick={() => setShowViewModal(false)}
              >
                <IoCloseOutline size={20} />
              </button>
            </div>

            {/* Section profil avec avatar */}
            <div className="view-user-profile">
              <div className="user-profile-section">
                <div className="user-avatar">
                  {selectedUser && selectedUser.name
                    ? selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "?"}
                </div>
                <div className="user-info">
                  <span className="user-name">
                    {selectedUser?.name || "Nom non disponible"}
                  </span>
                  <span className="user-email">
                    {selectedUser?.email || "Email non disponible"}
                  </span>
                </div>
              </div>
            </div>

            {selectedUser && (
              <div className="user-details">
                <div className="detail-row">
                  <strong>Nom :</strong> {selectedUser.name}
                </div>
                <div className="detail-row">
                  <strong>Email :</strong> {selectedUser.email}
                </div>
                <div className="detail-row">
                  <strong>Rôle :</strong>
                  <span className={`role-badge ${selectedUser.role}`}>
                    {selectedUser.role === "teacher" && (
                      <IoPersonOutline size={12} />
                    )}
                    {selectedUser.role === "student" && (
                      <IoSchoolOutline size={12} />
                    )}
                    {selectedUser.role === "director" && (
                      <MdAdminPanelSettings size={12} />
                    )}
                    {selectedUser.role === "teacher"
                      ? "Professeur"
                      : selectedUser.role === "student"
                      ? "Étudiant"
                      : "Directeur"}
                  </span>
                </div>
                <div className="detail-row">
                  <strong>Statut :</strong>
                  <span className={`status-badge ${selectedUser.status}`}>
                    {selectedUser.status === "active" ? "Actif" : "Inactif"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalPortal>

      {/* Modal d'édition - PORTAL PLEINE PAGE */}
      <ModalPortal isOpen={showEditModal && editingUser}>
        <div
          className="modal-overlay"
          onClick={(e) => handleOverlayClick(e, () => setShowEditModal(false))}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3>Modifier l'utilisateur</h3>
              <button
                className="close-modal"
                onClick={() => setShowEditModal(false)}
              >
                <IoCloseOutline size={20} />
              </button>
            </div>

            {/* Section profil avec avatar */}
            <div className="edit-user-profile">
              <div className="user-profile-section">
                <div className="user-avatar">
                  {editingUser && editingUser.name
                    ? editingUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "?"}
                </div>
                <div className="user-info">
                  <span className="user-name">
                    {editingUser?.name || "Nom non disponible"}
                  </span>
                  <span className="user-email">
                    {editingUser?.email || "Email non disponible"}
                  </span>
                </div>
              </div>
            </div>

            {editingUser && (
              <form onSubmit={handleSaveEdit} className="create-user-form">
                <div className="form-group">
                  <label>Nom complet</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rôle</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  >
                    <option value="student">Étudiant</option>
                    <option value="teacher">Professeur</option>
                    <option value="director">Directeur</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, status: e.target.value })
                    }
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowEditModal(false)}>
                    Annuler
                  </button>
                  <button type="submit">
                    <IoCheckmarkCircleOutline size={16} />
                    Sauvegarder
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </ModalPortal>

      {/* Modal de confirmation de suppression - PORTAL PLEINE PAGE ULTRA MODERNE */}
      <ModalPortal isOpen={showDeleteModal && selectedUser}>
        <div
          className="modal-overlay delete-overlay"
          onClick={(e) =>
            handleOverlayClick(e, () => setShowDeleteModal(false))
          }
        >
          <div className="modal-content delete-modal-modern">
            <div className="delete-icon-container">
              <IoWarningOutline size={48} />
            </div>

            {/* Header moderne */}
            <div className="delete-header">
              <h3>Confirmer la suppression</h3>
            </div>

            {/* Bouton de fermeture positionné par rapport au modal */}
            <button
              className="close-modal-delete"
              onClick={() => setShowDeleteModal(false)}
            >
              <IoCloseOutline size={24} />
            </button>

            {selectedUser && (
              <div className="delete-content-modern">
                <p className="delete-question">
                  Êtes-vous sûr de vouloir supprimer l'utilisateur
                </p>
                <div className="user-highlight">
                  <div className="user-profile-section">
                    <div className="user-avatar">
                      {selectedUser && selectedUser.name
                        ? selectedUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "?"}
                    </div>
                    <div className="user-info">
                      <span className="user-name">
                        {selectedUser?.name || "Nom non disponible"}
                      </span>
                      <span className="user-email">
                        {selectedUser?.email || "Email non disponible"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="warning-box">
                  <IoAlertCircleOutline size={20} />
                  <span>
                    Cette action est temporaire - les données reviendront au
                    rechargement de la page
                  </span>
                </div>
              </div>
            )}

            <div className="delete-actions">
              <button
                type="button"
                className="cancel-btn-modern"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="delete-btn-modern"
                onClick={confirmDelete}
              >
                <IoTrashOutline size={18} />
                Supprimer (démo)
              </button>
            </div>
          </div>
        </div>
      </ModalPortal>
    </div>
  );
};

export default UserManagement;
