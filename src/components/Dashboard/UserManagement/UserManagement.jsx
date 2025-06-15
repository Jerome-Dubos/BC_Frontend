import { motion } from "framer-motion";
import React from "react";
import {
  IoAddOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import "./UserManagement.css";

const UserManagement = ({
  students,
  showCreateForm,
  setShowCreateForm,
  newUser,
  setNewUser,
  handleCreateUser,
}) => {
  return (
    <motion.div
      className="user-management"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="management-header">
        <h3>Gestion des utilisateurs</h3>
        <button
          className="create-user-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <IoAddOutline size={16} />
          Créer un utilisateur
        </button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
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
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status === "active" ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">
                      <IoEyeOutline size={14} />
                    </button>
                    <button className="action-btn edit">
                      <IoCreateOutline size={14} />
                    </button>
                    <button className="action-btn delete">
                      <IoTrashOutline size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de création d'utilisateur */}
      {showCreateForm && (
        <div className="modal-overlay">
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
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />
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
      )}
    </motion.div>
  );
};

export default UserManagement;
