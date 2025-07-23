# Spécifications Base de Données - Bon Cours

## 🎯 Vue d'ensemble

Ce document définit la structure de la base de données pour l'application Bon Cours, avec une attention particulière portée à l'internationalisation (i18n).

## 🌍 Stratégie d'Internationalisation

### Principe

- **Clés de traduction** : Toutes les données textuelles sont stockées sous forme de clés de traduction
- **Séparation des préoccupations** : Les données métier sont séparées des traductions
- **Flexibilité** : Support facile de nouvelles langues sans modification de la structure

### Avantages

- ✅ Cohérence des traductions
- ✅ Maintenance simplifiée
- ✅ Performance optimisée
- ✅ Évolutivité

## 📊 Structure des Tables

### Table `languages` (Langues enseignées)

```sql
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL, -- 'en', 'fr', 'es', 'de', etc.
    translation_key VARCHAR(50) UNIQUE NOT NULL, -- 'languages.english'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table `course_levels` (Niveaux de cours)

```sql
CREATE TABLE course_levels (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL, -- 'adult', 'child'
    translation_key VARCHAR(50) UNIQUE NOT NULL, -- 'levels.adult'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table `course_types` (Types de cours)

```sql
CREATE TABLE course_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL, -- 'presentiel', 'visio'
    translation_key VARCHAR(50) UNIQUE NOT NULL, -- 'types.presentiel'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table `teachers` (Professeurs)

```sql
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    bio_translation_key VARCHAR(100), -- 'teachers.sarah.bio'
    specialties TEXT[], -- ['languages.english', 'languages.spanish']
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table `courses` (Cours)

```sql
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    language_id INTEGER REFERENCES languages(id),
    level_id INTEGER REFERENCES course_levels(id),
    type_id INTEGER REFERENCES course_types(id),
    teacher_id INTEGER REFERENCES teachers(id),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration VARCHAR(10) NOT NULL, -- '1h', '1h30'
    max_students INTEGER NOT NULL DEFAULT 8,
    enrolled_students INTEGER DEFAULT 0,
    date DATE NOT NULL,
    room_number VARCHAR(20), -- Pour les cours présentiels
    meeting_link VARCHAR(500), -- Pour les cours visio
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'full'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table `translations` (Traductions)

```sql
CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    language_code VARCHAR(10) NOT NULL, -- 'fr', 'en'
    translation_key VARCHAR(100) NOT NULL, -- 'languages.english'
    translation_value TEXT NOT NULL, -- 'Anglais' (fr) ou 'English' (en)
    context VARCHAR(50), -- 'ui', 'email', 'notification'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(language_code, translation_key)
);
```

## 🔄 API Endpoints

### Récupération des cours

```http
GET /api/courses/schedule
Query Parameters:
- week: YYYY-MM-DD (date de début de semaine)
- level: adult|child
- type: presentiel|visio
- lang: fr|en (langue de réponse)
```

### Réponse API

```json
{
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2024-01-15T10:00:00Z",
    "supportedLanguages": ["fr", "en"],
    "requestedLanguage": "fr"
  },
  "adult": {
    "presentiel": {
      "2024-01-15": [
        {
          "id": 1,
          "languageKey": "languages.english",
          "levelKey": "levels.adult",
          "typeKey": "types.presentiel",
          "startTime": "14:00",
          "endTime": "15:30",
          "duration": "1h30",
          "teacher": "Sarah Johnson",
          "maxStudents": 8,
          "enrolledStudents": 6,
          "date": "2024-01-15"
        }
      ]
    }
  }
}
```

## 🛠️ Utilitaires de Migration

### Script de migration des données existantes

```javascript
// Exemple de migration depuis l'ancien format
const migrateCourseData = (oldData) => {
  const newData = {
    metadata: {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      supportedLanguages: ["fr", "en"],
      defaultLanguage: "fr",
    },
  };

  // Migration des langues
  const languageMapping = {
    Anglais: "languages.english",
    Espagnol: "languages.spanish",
    Français: "languages.french",
    Allemand: "languages.german",
    Italien: "languages.italian",
  };

  // Migration des niveaux
  const levelMapping = {
    adulte: "levels.adult",
    enfant: "levels.child",
  };

  // Migration des types
  const typeMapping = {
    presentiel: "types.presentiel",
    visio: "types.visio",
  };

  // Appliquer les mappings...
  return newData;
};
```

## 📝 Gestion des Traductions

### Insertion des traductions

```sql
-- Exemple d'insertion des traductions françaises
INSERT INTO translations (language_code, translation_key, translation_value) VALUES
('fr', 'languages.english', 'Anglais'),
('fr', 'languages.spanish', 'Espagnol'),
('fr', 'languages.french', 'Français'),
('fr', 'languages.german', 'Allemand'),
('fr', 'languages.italian', 'Italien'),
('fr', 'levels.adult', 'Adulte'),
('fr', 'levels.child', 'Enfant'),
('fr', 'types.presentiel', 'Présentiel'),
('fr', 'types.visio', 'Visioconférence');

-- Exemple d'insertion des traductions anglaises
INSERT INTO translations (language_code, translation_key, translation_value) VALUES
('en', 'languages.english', 'English'),
('en', 'languages.spanish', 'Spanish'),
('en', 'languages.french', 'French'),
('en', 'languages.german', 'German'),
('en', 'languages.italian', 'Italian'),
('en', 'levels.adult', 'Adult'),
('en', 'levels.child', 'Child'),
('en', 'types.presentiel', 'In-Person'),
('en', 'types.visio', 'Online');
```

### Récupération des traductions

```sql
-- Récupérer toutes les traductions pour une langue
SELECT translation_key, translation_value
FROM translations
WHERE language_code = 'fr' AND is_active = true;

-- Récupérer une traduction spécifique
SELECT translation_value
FROM translations
WHERE language_code = 'fr' AND translation_key = 'languages.english';
```

## 🔧 Configuration Frontend

### Service API

```javascript
// services/coursesService.js
export const getCoursesSchedule = async (week, level, type, lang = "fr") => {
  const response = await fetch(
    `/api/courses/schedule?week=${week}&level=${level}&type=${type}&lang=${lang}`
  );
  return response.json();
};
```

### Hook personnalisé

```javascript
// hooks/useCourses.js
export const useCourses = (week, level, type) => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getCoursesSchedule(
        week,
        level,
        type,
        i18n.language
      );
      setData(courses);
      setLoading(false);
    };
    fetchData();
  }, [week, level, type, i18n.language]);

  return { data, loading };
};
```

## 🚀 Avantages de cette Approche

### Pour le Développement

- **Cohérence** : Toutes les traductions centralisées
- **Maintenance** : Ajout de langues sans modification de code
- **Performance** : Traductions pré-calculées côté serveur
- **Qualité** : Validation des clés de traduction

### Pour l'Utilisateur

- **Expérience fluide** : Changement de langue instantané
- **Cohérence** : Même terminologie partout
- **Accessibilité** : Support complet des langues

### Pour l'Administration

- **Gestion centralisée** : Interface d'administration des traductions
- **Historique** : Traçabilité des modifications
- **Validation** : Détection des traductions manquantes

## 📋 Checklist de Mise en Place

- [ ] Créer les tables de base de données
- [ ] Migrer les données existantes
- [ ] Implémenter les API endpoints
- [ ] Mettre à jour le frontend
- [ ] Tester les traductions
- [ ] Documenter les procédures de maintenance
- [ ] Former l'équipe à la gestion des traductions
