import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  IoChatbubbleEllipsesOutline,
  IoCheckmarkCircle,
  IoClose,
  IoPersonOutline,
  IoSend,
} from "react-icons/io5";
import { RiRobotLine } from "react-icons/ri";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Réponses prédéfinies pour la démo
  const botResponses = {
    salut: "Bonjour ! Ravi de vous rencontrer. Que puis-je faire pour vous ?",
    bonjour: "Bonjour ! Comment allez-vous ? En quoi puis-je vous aider ?",
    cours:
      "Nous proposons des cours de français, anglais, espagnol et allemand. Tous les niveaux sont acceptés, du débutant (A1) au niveau maîtrise (C2). Souhaitez-vous plus d'informations sur une langue en particulier ?",
    tarif:
      "Nos tarifs varient selon le format : 40€/h pour les cours particuliers, 299€/trimestre pour les cours en groupe, 450€ pour les stages intensifs de 2 semaines. Voulez-vous plus de détails ?",
    horaire:
      "Nous sommes ouverts du lundi au vendredi de 8h à 20h, et le samedi de 9h à 17h. Nos cours ont lieu en journée et en soirée pour s'adapter à vos disponibilités.",
    inscription:
      "Pour vous inscrire, vous pouvez : 1) Faire notre test de niveau gratuit, 2) Choisir votre cours, 3) Remplir le formulaire d'inscription, 4) Effectuer le paiement. Voulez-vous commencer par le test ?",
    test: "Notre test de niveau est gratuit et prend environ 15 minutes. Il évalue votre compréhension écrite et orale. Vous pouvez le faire en ligne ou lors d'un rendez-vous. Quelle option préférez-vous ?",
    professeur:
      "Notre équipe compte des professeurs natifs et expérimentés : Sarah (anglais), Carlos (espagnol), Anna (allemand), et Marie (français). Tous sont diplômés et passionnés par l'enseignement.",
    adresse:
      "Nous sommes situés au 123 Rue de l'Éducation, 75001 Paris. Facilement accessible en métro (ligne 1, station Louvre). Voulez-vous que je vous envoie un plan ?",
    contact:
      "Vous pouvez nous contacter au +33 1 23 45 67 89, par email à contact@boncours.fr, ou via notre formulaire de contact sur le site. Nous répondons sous 24h !",
    default:
      "Je comprends votre question, mais je n'ai pas d'information précise à ce sujet. Je vous invite à contacter notre équipe au +33 1 23 45 67 89 ou à contact@boncours.fr pour une réponse personnalisée.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Recherche de mots-clés
    if (message.includes("salut") || message.includes("hello")) {
      return botResponses.salut;
    }
    if (message.includes("bonjour") || message.includes("bonsoir")) {
      return botResponses.bonjour;
    }
    if (
      message.includes("cours") ||
      message.includes("formation") ||
      message.includes("langue")
    ) {
      return botResponses.cours;
    }
    if (
      message.includes("prix") ||
      message.includes("tarif") ||
      message.includes("coût") ||
      message.includes("combien")
    ) {
      return botResponses.tarif;
    }
    if (
      message.includes("horaire") ||
      message.includes("heure") ||
      message.includes("ouvert")
    ) {
      return botResponses.horaire;
    }
    if (
      message.includes("inscription") ||
      message.includes("inscrire") ||
      message.includes("comment")
    ) {
      return botResponses.inscription;
    }
    if (
      message.includes("test") ||
      message.includes("niveau") ||
      message.includes("évaluation")
    ) {
      return botResponses.test;
    }
    if (
      message.includes("professeur") ||
      message.includes("enseignant") ||
      message.includes("prof")
    ) {
      return botResponses.professeur;
    }
    if (
      message.includes("adresse") ||
      message.includes("où") ||
      message.includes("localisation")
    ) {
      return botResponses.adresse;
    }
    if (
      message.includes("contact") ||
      message.includes("téléphone") ||
      message.includes("email")
    ) {
      return botResponses.contact;
    }

    return botResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulation du délai de réponse
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Délai réaliste entre 1-2 secondes
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "Quels sont vos cours ?",
    "Vos tarifs ?",
    "Comment s'inscrire ?",
    "Faire le test de niveau",
    "Vos horaires ?",
  ];

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          backgroundColor: isOpen ? "#e74c3c" : "#eabd83",
        }}
      >
        {isOpen ? (
          <IoClose size={24} />
        ) : (
          <IoChatbubbleEllipsesOutline size={24} />
        )}
        {!isOpen && (
          <motion.div
            className="notification-dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
          />
        )}
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="bot-info">
                <div className="bot-avatar">
                  <RiRobotLine size={20} />
                </div>
                <div className="bot-details">
                  <h3>Assistant Bon Cours</h3>
                  <span className="status">
                    <IoCheckmarkCircle size={12} />
                    En ligne
                  </span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <IoClose size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.sender === "bot" && (
                    <div className="message-avatar">
                      <RiRobotLine size={16} />
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <div className="message-avatar user">
                      <IoPersonOutline size={16} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  className="message bot typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <RiRobotLine size={16} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Réponses rapides */}
            {messages.length === 1 && (
              <div className="quick-replies">
                <p>Questions fréquentes :</p>
                <div className="quick-replies-grid">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      className="quick-reply-btn"
                      onClick={() => handleQuickReply(reply)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input">
              <div className="input-container">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  rows="1"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="send-btn"
                >
                  <IoSend size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
