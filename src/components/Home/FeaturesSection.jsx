import { useTranslation } from "react-i18next";
import {
  IoLanguageOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <IoLanguageOutline size={48} />,
      title: t("home.feature_innovative"),
      description: t("home.feature_innovative_desc"),
      color: "#3498db",
    },
    {
      icon: <IoPeopleOutline size={48} />,
      title: t("home.feature_expert"),
      description: t("home.feature_expert_desc"),
      color: "#e74c3c",
    },
    {
      icon: <IoTrophyOutline size={48} />,
      title: t("home.feature_results"),
      description: t("home.feature_results_desc"),
      color: "#f39c12",
    },
    {
      icon: <IoTimeOutline size={48} />,
      title: t("home.feature_flexible"),
      description: t("home.feature_flexible_desc"),
      color: "#2ecc71",
    },
  ];

  return (
    <section className="features">
      <h2>{t("home.why_choose")}</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            style={{ "--accent-color": feature.color }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
