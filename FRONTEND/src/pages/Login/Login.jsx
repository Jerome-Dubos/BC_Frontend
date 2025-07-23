import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LoginDecorations from "../../components/Login/LoginDecorations";
import LoginForm from "../../components/Login/LoginForm";
import "./Login.css";

const Login = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <LoginDecorations />
      <LoginForm />
    </motion.div>
  );
};

export default Login;
