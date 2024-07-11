# Projet Artisans en Ligne ( Craftify )

- **Front-end** : Auréliane Gagliardi,  Thomas Thonnard;
- **Back-end** : Yasmine Sanchez,  Samuel Sanchez;

## Portfolio du site

https://craftify-project.myportfolio.com/contact-craftify

## Table des Matières

1. [Description](#description)
2. [Technologies Utilisées](#technologies-utilisées)
3. [Fonctionnalités](#fonctionnalités)
4. [Installation et Configuration](#installation-et-configuration)
5. [Structure du Projet](#structure-du-projet)
6. [Contribuer](#contribuer)
7. [Licence](#licence)

## Description

Ce projet vise à offrir aux artisans une plateforme leur permettant de créer et gérer facilement leur boutique en ligne. Avec l'utilisation de technologies modernes, nous avons développé une solution complète qui comprend un backend robuste et un frontend réactif.

## Technologies Utilisées

### Backend

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express** : Framework web pour Node.js.
- **SQL** : Base de données relationnelle pour stocker les informations.
- **MailJet** : Service d'envoi d'emails transactionnels.

### Frontend

- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **Tailwind CSS** : Framework CSS utilitaire pour un design moderne et réactif.

## Fonctionnalités

- **Boutique en ligne** : Profil utilisateur / artisans.
- **Gestion des Produits** : Ajout, modification et suppression de produits.
- **Panier d'Achat** : Gestion des articles dans le panier (ajout/suppression), possibilité d'ajouter des produits en favori.
- **Paiement Sécurisé** : Intégration avec des services de paiement (Fake payement API).
- **Tableau de Bord** : Interface pour que les artisans gèrent leur boutique et leurs profils en ligne.

## Installation et Configuration

### Prérequis

- Node.js (version X.X.X)
- NPM ou Yarn
- Base de données SQL
- Compte MailJet pour l'envoi d'emails

### Instructions

1. **Cloner le dépôt**

    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2. **Installer les dépendances**

    ```bash
    npm install
    ```

3. **Configurer les variables d'environnement**

    Créez un fichier `.env` à la racine du projet et ajoutez les informations.


4. **Démarrer l'application**

    ```bash
    npm start
    ```

## Structure du Projet

```plaintext
root
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
├── .gitignore
├── package.json
└── README.md

