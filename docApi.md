## Yo les front-end 🚀

### Bon courage avec les nouveaux fetchs ! Pensez bien à remplacer localhost:3001 par l'IP du serveur avec le port 3001

### Si vous avez des problèmes ou des questions, n'hésitez pas à envoyer un message aux deux back-end. On est là pour vous aider

### À bientôt et bon code ! ✌️

![Courage](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXk3OHg4NTlpNTZvZGptMm84cWdhZGN1dG13bG85M3B3NjNuOWdsNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BPJmthQ3YRwD6QqcVD/giphy.webp)

# Articles

## 1. Ajouter un article

### Méthode : POST

### URL : <http://localhost:3001/api/articles/>

### Headers

### Authorization: Bearer token

### Content-Type: multipart/form-data

### Body

```json
{
  "title": "Article Title",
  "article_description": "Description de l'article",
  "article_price": 1000,
  "shipping_cost": 100,
  "category_name": "Category",
  "article_photo": "<Fichier image>"
}
```

### Description : Ajoute un nouvel article pour l'utilisateur connecté

## 2. Récupérer tous les articles de l'utilisateur connecté

### Méthode : GET

### URL : <http://localhost:3001/api/articles/user>

### Headers

### Authorization: Bearer token

### Description : Récupère tous les articles ajoutés par l'utilisateur connecté

## 3. Récupérer un article par ID

### Méthode : GET

### URL : <http://localhost:3001/api/articles/article/:id>

### Description : Récupère les détails d'un article spécifique par son ID. ##

## 4. Récupérer tous les articles disponibles (non vendus)

### Méthode : GET

### URL : <http://localhost:3001/api/articles/available-articles>

### Description : Récupère tous les articles disponibles qui ne sont pas encore vendus. ##

## 5. Mettre à jour un article

### Méthode : PUT

### URL : <http://localhost:3001/api/articles/:articleId>

### Headers

### Authorization: Bearer token

### Content-Type: multipart/form-data

### Body

```json
{
  "title": "Updated Title",
  "article_description": "Updated Description",
  "article_price": 1500,
  "shipping_cost": 150,
  "category_name": "Updated Category",
  "article_photo": "<Updated Image File>"
}
```

### Description : Met à jour un article spécifique de l'utilisateur connecté

## 6. Supprimer un article

### Méthode : DELETE

### URL : <http://localhost:3001/api/articles/:id>

### Headers

### Authorization: Bearer token

### Description : Supprime un article spécifique par son ID

## 7. Récupérer les articles d'un utilisateur spécifique

### Méthode : GET

### URL : <http://localhost:3001/api/articles/user/:userId/articles>

### Description : Récupère tous les articles ajoutés par un utilisateur spécifique

## 8. Récupérer le prix d'un article spécifique par son ID

### Méthode : GET

### URL : <http://localhost:3001/api/article/:id/price>

### Description : Récupère le prix d'un article spécifique par son ID

## 9. Récupérer tous les prix des articles

### Méthode : GET

### URL : <http://localhost:3001/api/articles/prices>

### Description : Récupère les prix de tous les articles

## 10. Récupérer les prix des articles d'une catégorie spécifique

### Méthode : GET

### URL : <http://localhost:3001/api/categories/:categoryId/prices>

### Description : Récupère les prix des articles d'une catégorie spécifique

# Évaluations

## 11. Ajouter une évaluation

### Méthode : POST

### URL : <http://localhost:3001/api/evaluation/>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "evaluation_number": 5,
  "evaluation_description": "Très bon produit",
  "user_id": 6,
  "commented_user_id": 7
}
```

### Description : Crée une nouvelle évaluation

## 12. Mettre à jour une évaluation

### Méthode : PUT

### URL : <http://localhost:3001/api/evaluation/:id>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "evaluation_number": 5,
  "evaluation_description": "Mise à jour de l'évaluation",
  "user_id": 6,
  "commented_user_id": 7
}
```

### Description : Met à jour une évaluation spécifique par son ID

## 13. Supprimer une évaluation

### Méthode : DELETE

### URL : <http://localhost:3001/api/evaluation/:id>

### Headers

### Authorization: Bearer token

### Description : Supprime une évaluation spécifique par son ID

## 14. Récupérer toutes les évaluations

### Méthode : GET

### URL : <http://localhost:3001/api/evaluation/>

### Description : Récupère toutes les évaluations

## 15. Récupérer une évaluation par ID

### Méthode : GET

### URL : <http://localhost:3001/api/evaluation/:id>

### Description : Récupère une évaluation spécifique par son ID

# Catégories

## 16. Ajouter une catégorie

### Méthode : POST

### URL : <http://localhost:3001/api/categories/>

### Headers

### Content-Type: application/json

### Body

```json
{
  "category_name": "Nouvelle catégorie"
}
```

### Description : Ajoute une nouvelle catégorie

## 17. Récupérer toutes les catégories

### Méthode : GET

### URL : <http://localhost:3001/api/categories/>

### Description : Récupère toutes les catégories

## 18. Mettre à jour une catégorie

### Méthode : PUT

### URL : <http://localhost:3001/api/categories/:categoryId>

### Headers

### Content-Type: application/json

### Body

```json
{
  "category_name": "Nom de catégorie mis à jour"
}
```

### Description : Met à jour une catégorie spécifique par son ID

## 19. Supprimer une catégorie

### Méthode : DELETE

### URL : <http://localhost:3001/api/categories/:categoryId>

### Description : Supprime une catégorie spécifique par son ID

# Favoris

## 20. Ajouter aux favoris

### Méthode : POST

### URL : <http://localhost:3001/api/favorite/>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "articleId": 1
}
```

### Description : Ajoute un article aux favoris de l'utilisateur connecté

## 21. Récupérer tous les favoris de l'utilisateur connecté

### Méthode : GET

### URL : <http://localhost:3001/api/favorite/user>

### Headers

### Authorization: Bearer token

### Description : Récupère tous les articles favoris de l'utilisateur connecté

## 22. Supprimer un favori

### Méthode : DELETE

### URL : <http://localhost:3001/api/favorite/:articleId>

### Headers

### Authorization: Bearer token

### Description : Supprime un article des favoris de l'utilisateur connecté par l'ID de l'article

# Commandes

## 23. Créer une commande

### Méthode : POST

### URL : <http://localhost:3001/api/order/>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "order_details": [
    {
      "article_id": 1,
      "quantity": 2
    },
    {
      "article_id": 2,
      "quantity": 1
    }
  ]
}
```

### Description : Crée une nouvelle commande pour l'utilisateur connecté

## 24. Récupérer les commandes de l'utilisateur connecté

### Méthode : GET

### URL : <http://localhost:3001/api/order/user>

### Headers

### Authorization: Bearer token

### Description : Récupère toutes les commandes de l'utilisateur connecté

## 25. Récupérer les détails d'une commande par ID

### Méthode : GET

### URL : <http://localhost:3001/api/order/:orderId>

### Headers

### Authorization: Bearer token

### Description : Récupère les détails d'une commande spécifique par son ID

## 26. Mettre à jour le statut d'une commande

### Méthode : PUT

### URL : <http://localhost:3001/api/order/:orderId/status>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "status": "shipped"
}
```

### Description : Met à jour le statut d'une commande spécifique

# Panier

## 27. Ajouter un article au panier

### Méthode : POST

### URL : <http://localhost:3001/api/cart/>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "articleId": 1
}
```

### Description : Ajoute un article au panier de l'utilisateur connecté

## 28. Récupérer le panier de l'utilisateur connecté

### Méthode : GET

### URL : <http://localhost:3001/api/cart/user>

### Headers

### Authorization: Bearer token

### Description : Récupère le panier de l'utilisateur connecté

## 29. Supprimer un article du panier

### Méthode : DELETE

### URL : <http://localhost:3001/api/cart/:articleId>

### Headers

### Authorization: Bearer token

### Description : Supprime un article spécifique du panier de l'utilisateur connecté

# Paiement

## 30. Créer un Payment Intent

### Méthode : POST

### URL : <http://localhost:3001/api/payment/create-payment-intent>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "amount": 1000, // Le montant en centimes (par exemple, 1000 pour 10.00 USD)
  "currency": "usd"
}
```

### Description : Crée un Payment Intent avec le montant et la devise spécifiés. Retourne le clientSecret et l'id du Payment Intent

## 31. Gérer le succès du paiement

### Méthode : POST

### URL : <http://localhost:3001/api/payment/payment-success>

### Headers

### Authorization: Bearer token

### Body

```json
{
  "paymentIntentId": "pi_123456789",
  "userId": 1,
  "articleIds": [1, 2, 3]
}
```

### Description : Gère le succès du paiement en vérifiant le statut du Payment Intent et en mettant à jour les informations de commande et d'articles dans la base de données

# Utilisateurs

## 32. Enregistrer un utilisateur

### Méthode : POST

### URL : <http://localhost:3001/api/users/register>

### Headers

### Content-Type: multipart/form-data

### Body

```json
{
  "username": "nom_utilisateur",
  "password": "mot_de_passe",
  "email": "email@domaine.com",
  "first_name": "Prénom",
  "last_name": "Nom",
  "street": "Rue",
  "street_number": "Numéro de rue",
  "apartment": "Appartement",
  "postal_code": "Code postal",
  "city": "Ville",
  "biography": "Biographie",
  "paypal_address": "Adresse PayPal",
  "profile_image": "<Fichier image>"
}
```

### Description : Enregistre un nouvel utilisateur avec les informations spécifiées

## 33. Connecter un utilisateur

### Méthode : POST

### URL : <http://localhost:3001/api/users/login>

### Headers

### Content-Type: application/json

### Body

```json
{
  "username": "nom_utilisateur",
  "password": "mot_de_passe"
}
```

### Description : Connecte un utilisateur et retourne untokenJWT

## 34. Obtenir les informations de l'utilisateur connecté

### Méthode : GET

### URL : <http://localhost:3001/api/users/dashboard>

### Headers

### Authorization: Bearer token

### Description : Récupère les informations de l'utilisateur connecté

## 35. Obtenir un utilisateur par ID

### Méthode : GET

### URL : <http://localhost:3001/api/users/:userId>

### Description : Récupère les informations d'un utilisateur spécifique par son ID

## 36. Mettre à jour les informations de l'utilisateur

### Méthode : PUT

### URL : <http://localhost:3001/api/users/update/:userId>

### Headers

### Authorization: Bearer token

### Content-Type: multipart/form-data

### Body

```json
{
  "biography": "Nouvelle biographie",
  "first_name": "Nouveau prénom",
  "last_name": "Nouveau nom",
  "street": "Nouvelle rue",
  "street_number": "Nouveau numéro de rue",
  "apartment": "Nouvel appartement",
  "postal_code": "Nouveau code postal",
  "city": "Nouvelle ville",
  "email": "nouvel_email@domaine.com",
  "paypal_address": "Nouvelle adresse PayPal",
  "profile_image": "<Nouveau fichier image>"
}
```

### Description : Met à jour les informations de l'utilisateur connecté
