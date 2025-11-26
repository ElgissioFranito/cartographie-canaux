# Gestion des Canaux - Cartographie Interactive

Application Angular de cartographie interactive pour la gestion et le suivi des canaux d'évacuation. Ce projet permet de visualiser, ajouter, modifier et supprimer des points d'intérêt (canaux) sur une carte dynamique Leaflet.

![Vue Carte](public/screenshots/cartographie-canaux%20screenshot%20-%20map.png)

## 🚀 Fonctionnalités Clés

### 🗺️ Cartographie Interactive
- **Visualisation** : Affichage des canaux sur une carte OpenStreetMap.
- **Marqueurs Personnalisés** : Utilisation d'icônes spécifiques pour identifier les canaux.
- **Popups Détails** : Affichage des informations complètes (Code, État, Ville, Responsable, etc.) au clic sur un marqueur.
- **Actions Rapides** : Boutons "Modifier" et "Supprimer" directement accessibles depuis les popups.

### 📝 Gestion CRUD Complète
- **Liste Tabulaire** : Vue alternative en liste pour une gestion administrative rapide.
- **Ajout Intuitif** :
  - Via le bouton "Ajouter Canal".
  - **Clic Droit sur la Carte** : Ouvre le formulaire avec les coordonnées (Latitude/Longitude) pré-remplies à l'endroit cliqué.
- **Édition & Suppression** : Modification des états (Bon, Moyen, Mauvais, Critique) et suppression avec confirmation.

![Vue Liste](public/screenshots/cartographie-canaux%20screenshot%20-%20list%20canal.png)

### 🎨 Interface Utilisateur
- **Design Responsive** : Interface claire et adaptée.
- **Formulaires Réactifs** : Validation des données en temps réel.
- **Feedback Visuel** : Codes couleurs pour les états des canaux (dans la liste).

![Formulaire Ajout](public/screenshots/cartographie-canaux%20screenshot%20-%20add%20canal.png)

## 🛠️ Stack Technique

- **Framework** : Angular 19+
- **Carte** : Leaflet
- **Style** : SCSS
- **Données** : Service Mock (In-Memory) pour la démonstration.

## 📦 Installation et Lancement

1.  **Cloner le projet**
    ```bash
    git clone <votre-repo>
    cd cartographie-canaux
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement**
    ```bash
    npm start
    ```
    Ouvrez votre navigateur sur `http://localhost:4200`.

## 👤 Auteur

Projet réalisé par **Franito ELgissio Randriamanarina**.
