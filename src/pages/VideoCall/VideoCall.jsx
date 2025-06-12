import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./VideoCall.css";

const VideoCall = () => {
  const { user, users, isDirector, isTeacher, isStudent } = useAuth();
  const [activeTab, setActiveTab] = useState("join");
  const [isInCall, setIsInCall] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "60",
    participants: [],
    description: "",
  });

  const [scheduledMeetings] = useState([
    {
      id: 1,
      title: "Cours de Mathématiques - 3ème A",
      organizer: "Jean Martin",
      date: "2024-12-06",
      time: "14:00",
      duration: 60,
      participants: 15,
      status: "en cours",
      meetingId: "MATH-3A-001",
    },
    {
      id: 2,
      title: "Réunion Parents-Professeurs",
      organizer: "Marie Dubois",
      date: "2024-12-15",
      time: "18:00",
      duration: 120,
      participants: 25,
      status: "programmée",
      meetingId: "RPP-DEC-001",
    },
    {
      id: 3,
      title: "Formation Pédagogique",
      organizer: "Marie Dubois",
      date: "2024-12-08",
      time: "16:30",
      duration: 90,
      participants: 8,
      status: "programmée",
      meetingId: "FORM-PED-002",
    },
  ]);

  const startCall = () => {
    setIsInCall(true);
    // Simulation de participants qui rejoignent
    setTimeout(() => {
      setParticipants([
        {
          name: user.prenom + " " + user.nom,
          role: user.role,
          isMuted: false,
          isVideoOn: true,
          isMe: true,
        },
        {
          name: "Jean Martin",
          role: "professeur",
          isMuted: false,
          isVideoOn: true,
          isMe: false,
        },
        {
          name: "Emma Garcia",
          role: "eleve",
          isMuted: true,
          isVideoOn: true,
          isMe: false,
        },
        {
          name: "Lucas Petit",
          role: "eleve",
          isMuted: true,
          isVideoOn: false,
          isMe: false,
        },
      ]);
    }, 2000);
  };

  const endCall = () => {
    setIsInCall(false);
    setParticipants([]);
  };

  const handleMeetingFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setMeetingForm((prev) => ({
        ...prev,
        participants: checked
          ? [...prev.participants, value]
          : prev.participants.filter((p) => p !== value),
      }));
    } else {
      setMeetingForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    alert(`✅ Réunion "${meetingForm.title}" programmée avec succès !`);
    setMeetingForm({
      title: "",
      date: "",
      time: "",
      duration: "60",
      participants: [],
      description: "",
    });
  };

  if (isInCall) {
    return (
      <div className="video-call-page video-call-active">
        <div className="video-call-container">
          {/* Barre de navigation */}
          <div className="video-call-header">
            <div className="call-info">
              <h2 className="call-title">Cours de Mathématiques - 3ème A</h2>
              <p className="call-participants">
                {participants.length} participants
              </p>
            </div>
            <div className="video-controls">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`control-button ${isMuted ? "danger" : ""}`}
              >
                {isMuted ? "🔇" : "🎤"}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`control-button ${isVideoOff ? "danger" : ""}`}
              >
                {isVideoOff ? "📷" : "📹"}
              </button>
              <button className="control-button">💬</button>
              <button className="control-button">📤</button>
              <button onClick={endCall} className="control-button danger">
                📞
              </button>
            </div>
          </div>

          {/* Zone vidéo principale */}
          <div className="video-main-area">
            {/* Vidéo principale */}
            <div className="video-grid">
              <div className="video-participant main-speaker">
                <div className="participant-avatar">👨‍🏫</div>
                <div className="participant-info">Jean Martin - Professeur</div>
              </div>
            </div>

            {/* Sidebar participants */}
            <div className="chat-sidebar">
              <div className="chat-header">
                <h3 className="chat-title">
                  Participants ({participants.length})
                </h3>
              </div>
              <div className="participants-list">
                {participants.map((participant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="participant-item"
                  >
                    <div className="participant-avatar-small">
                      {participant.role === "professeur"
                        ? "👨‍🏫"
                        : participant.role === "directrice"
                        ? "👩‍💼"
                        : "🧑‍🎓"}
                    </div>
                    <div className="participant-name">
                      {participant.name}
                      {participant.isMe && " (Vous)"}
                    </div>
                    {participant.isMuted && (
                      <div className="participant-control muted">🔇</div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Chat */}
              <div className="chat-messages">
                <div className="chat-message">
                  <div className="message-author">Jean Martin:</div>
                  <div className="message-text">
                    Bonjour à tous ! Nous allons commencer par revoir le
                    théorème de Pythagore.
                  </div>
                </div>
                <div className="chat-message">
                  <div className="message-author">Emma Garcia:</div>
                  <div className="message-text">Bonjour Monsieur Martin !</div>
                </div>
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  className="chat-input-field"
                />
                <button className="chat-send-button">📤</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-call-page">
      <div className="video-call-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="video-call-header"
        >
          <h1 className="call-title">📹 Visioconférence</h1>
          <p className="call-participants">
            {isDirector && "Organisez et gérez les réunions de l'établissement"}
            {isTeacher && "Créez vos cours en ligne et rencontrez vos élèves"}
            {isStudent &&
              "Rejoignez vos cours en ligne et participez aux échanges"}
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="library-nav">
          <div className="setup-tabs">
            <button
              onClick={() => setActiveTab("join")}
              className={`setup-tab ${activeTab === "join" ? "active" : ""}`}
            >
              🎯 Rejoindre
            </button>
            {(isDirector || isTeacher) && (
              <button
                onClick={() => setActiveTab("schedule")}
                className={`setup-tab ${
                  activeTab === "schedule" ? "active" : ""
                }`}
              >
                📅 Programmer
              </button>
            )}
            <button
              onClick={() => setActiveTab("meetings")}
              className={`setup-tab ${
                activeTab === "meetings" ? "active" : ""
              }`}
            >
              📋 Mes réunions
            </button>
          </div>

          {/* Contenu des onglets */}
          <div className="library-content">
            {activeTab === "join" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="waiting-room"
              >
                <div className="waiting-icon">🎯</div>
                <h2 className="waiting-title">Rejoindre une réunion</h2>
                <p className="waiting-message">
                  Entrez l'ID de la réunion ou sélectionnez une réunion
                  programmée
                </p>

                <div className="form-group">
                  <label className="form-label">ID de la réunion</label>
                  <input
                    type="text"
                    placeholder="Exemple: MATH-3A-001"
                    className="form-input"
                  />
                  <button className="action-button">Rejoindre</button>
                </div>

                <div className="participants-grid">
                  <p className="waiting-message">Réunions en cours :</p>
                  <div className="participants-list">
                    {scheduledMeetings
                      .filter((meeting) => meeting.status === "en cours")
                      .map((meeting) => (
                        <div key={meeting.id} className="participant-item">
                          <div>
                            <h3 className="participant-name">
                              {meeting.title}
                            </h3>
                            <p className="message-text">
                              Par {meeting.organizer} • {meeting.participants}{" "}
                              participants
                            </p>
                            <code className="message-author">
                              {meeting.meetingId}
                            </code>
                          </div>

                          <div className="participant-controls">
                            <button
                              onClick={() => startCall(meeting.meetingId)}
                              className="join-button"
                            >
                              Rejoindre
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "schedule" && (isDirector || isTeacher) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="waiting-room"
              >
                <h2 className="waiting-title">Programmer une réunion</h2>

                <form onSubmit={handleScheduleMeeting} className="upload-form">
                  <div className="form-group">
                    <label className="form-label">Titre de la réunion *</label>
                    <input
                      type="text"
                      name="title"
                      value={meetingForm.title}
                      onChange={handleMeetingFormChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="participant-controls">
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={meetingForm.date}
                        onChange={handleMeetingFormChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Heure *</label>
                      <input
                        type="time"
                        name="time"
                        value={meetingForm.time}
                        onChange={handleMeetingFormChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Durée (minutes) *</label>
                      <select
                        name="duration"
                        value={meetingForm.duration}
                        onChange={handleMeetingFormChange}
                        className="chat-input-field"
                      >
                        <option value="30">30 minutes</option>
                        <option value="60">1 heure</option>
                        <option value="90">1h30</option>
                        <option value="120">2 heures</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Participants</label>
                    <div className="participants-grid">
                      {users.map((participant) => (
                        <label
                          key={participant.id}
                          className="participant-item"
                        >
                          <input
                            type="checkbox"
                            name="participants"
                            value={participant.id}
                            checked={meetingForm.participants.includes(
                              participant.id
                            )}
                            onChange={handleMeetingFormChange}
                          />
                          <div className="participant-avatar-small">
                            {participant.role === "professeur" ? "👨‍🏫" : "🧑‍🎓"}
                          </div>
                          <div>
                            <div className="participant-name">
                              {participant.nom} {participant.prenom}
                            </div>
                            <div className="message-author">
                              {participant.role}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={meetingForm.description}
                      onChange={handleMeetingFormChange}
                      className="chat-input-field"
                      rows="3"
                      placeholder="Ordre du jour, objectifs..."
                    />
                  </div>

                  <button type="submit" className="join-button">
                    Programmer la réunion
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === "meetings" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="waiting-room"
              >
                <h2 className="waiting-title">Mes réunions programmées</h2>

                <div className="participants-list">
                  {scheduledMeetings.map((meeting) => (
                    <div key={meeting.id} className="participant-item">
                      <div>
                        <h3 className="participant-name">{meeting.title}</h3>
                        <div className="message-text">
                          <div>
                            📅 {meeting.date} à {meeting.time}
                          </div>
                          <div>👥 {meeting.participants} participants</div>
                          <div>⏱️ {meeting.duration} minutes</div>
                          <div>👤 Organisé par {meeting.organizer}</div>
                        </div>
                        <code className="message-author">
                          {meeting.meetingId}
                        </code>
                      </div>

                      <div className="participant-controls">
                        {meeting.status === "en cours" ? (
                          <button
                            onClick={() => startCall(meeting.meetingId)}
                            className="join-button"
                          >
                            Rejoindre
                          </button>
                        ) : (
                          <button className="participant-control">
                            Modifier
                          </button>
                        )}

                        <button className="participant-control">Détails</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
