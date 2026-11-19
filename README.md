# MiniBiblio

Application web de gestion des emprunts d'une bibliothèque.

## Technologies choisies

- **Backend** : Node.js, Express.js
- **Frontend** : React.js, TypeScript, Vite, Tailwind CSS, Zustand, Axios, React Hook Form, Zod
- **Base de données** : PostgreSQL (hébergée sur Neon)

## Installation et lancement

### 1. Prérequis

- Node.js installé sur votre machine.
- Un compte Neon avec une base de données PostgreSQL active.

### 2. Configuration du Backend

Accédez au dossier `backend` et installez les dépendances :

```bash
cd backend
npm install
```

Créez un fichier `.env` à la racine du dossier `backend` et ajoutez-y votre chaîne de connexion Neon :

```env
DATABASE_URL=votre_chaine_de_connexion_neon
PORT=3000
```

Exécutez le script SQL (`src/db/schema.sql`) dans l'éditeur SQL de Neon pour créer les tables et insérer les données de test.

Lancez le serveur :

```bash
node src/server.js
```

Le serveur sera accessible sur `http://localhost:3000`.

### 3. Configuration du Frontend

Dans un nouveau terminal, accédez au dossier `frontend` et installez les dépendances :

```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### 4. Lancement des tests

_(À compléter une fois les tests mis en place)_

```bash
cd backend
npm test
```

## État d'avancement

### Ce qui a été réalisé

- **Base de données** :
  - Création du schéma relationnel (livres, membres, emprunts).
  - Mise en place des contraintes de clés étrangères et d'unicité (ISBN, email).

- **Backend (API REST)** :
  - Mise en place de l'architecture (Routes, Controllers, Services).
  - Gestion centralisée des erreurs.
  - Endpoint `GET /api/books` : Récupération de la liste des livres
  - Endpoint `POST /api/books` : Création d'un livre avec validation et gestion de l'unicité de l'ISBN.

- **Frontend** :
  - Initialisation du projet avec React, TypeScript et Tailwind CSS.
  - Mise en place d'un store global avec Zustand pour la gestion de l'état des livres.
  - Création du dashboard.
  - Affichage de la liste des livres connectée à l'API.
  - Formulaire d'ajout de livre sous forme de modal, avec validation stricte côté client via React Hook Form et Zod.
  - Gestion des états de chargement et affichage des erreurs renvoyées par l'API.

### Ce qui n'a pas encore été réalisé

- CRUD complet pour les membres.
- Endpoint de création d'un emprunt (`POST /api/loans`) et application des règles métier (R1, R2, R3, R4).
- Endpoint de retour d'un livre (`PUT /api/loans/:id/return`).
- Liste des emprunts en cours avec indicateur de retard.
- Interface frontend pour la gestion des membres et des emprunts.
- Tests automatisés (Jest/Supertest).

### Ce qui serait fait avec deux heures de plus

- Implémentation des règles métier (R1 à R4) côté serveur et écriture des tests unitaires correspondants (au moins 3 tests) avec Jest et Supertest.
- Développement de l'interface des emprunts avec un tableau listant les retards et un filtre par membre.
- Ajout d'une pagination sur la liste des livres et des emprunts.
- Refactoring du frontend pour extraire les composants UI réutilisables (boutons, inputs).

## Choix techniques importants

### Architecture backend

Séparation claire entre les routes, les contrôleurs (qui gèrent le HTTP) et les services (qui contiennent la logique métier et les requêtes SQL). Cela facilite la testabilité et la maintenance.

### Requêtes SQL brutes

Utilisation du driver `pg` sans ORM. Ce choix permet un contrôle total sur les requêtes SQL, notamment pour le calcul des exemplaires disponibles (via un `LEFT JOIN`) et pour appliquer les règles métier de manière performante.

### Gestion d'état avec Zustand

Choisi pour sa légèreté et sa simplicité par rapport à Redux. Il permet de centraliser les appels API et de partager l'état des livres entre les composants sans prop drilling.

### Validation avec Zod

Utilisé conjointement avec React Hook Form pour définir un schéma de validation typé. Cela garantit que les données envoyées au backend sont correctes et permet de générer des messages d'erreur précis pour l'utilisateur.

### Tailwind CSS v4

Configuration via le plugin Vite officiel (`@tailwindcss/vite`) pour une intégration plus rapide et sans fichier de configuration complexe, conformément aux recommandations actuelles.
