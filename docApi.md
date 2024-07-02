
# Documentation de l'API pour les Frontends

Pour que les développeurs front-end puissent utiliser efficacement votre API, voici une documentation détaillée des endpoints, y compris les méthodes HTTP, les URL, les descriptions, et les informations sur l'authentification.

/!\ Les commandes lié à "order" ( les commandes ) ne fonctionnent pas encore... /!\

## Utilisateur

1. Inscription

    - Méthode : POST
    - URL : /api/users/register
    - Description : Permet à un utilisateur de s'inscrire.
    - Body :
      ```json
      {
         "username": "string",
         "biography": "string",
         "first_name": "string",
         "last_name": "string",
         "street": "string",
         "street_number": "string",
         "apartment": "string",
         "postal_code": "string",
         "city": "string",
         "password": "string",
         "email": "string",
         "paypal_address": "string",
         "profile_image": "file"
      }
      ```
    - Token : Non

2. Connexion

    - Méthode : POST
    - URL : /api/users/login
    - Description : Authentification de l'utilisateur.
    - Body :
      ```json
      {
         "username": "string",
         "password": "string"
      }
      ```
    - Token : Non

3. Récupérer les informations d'un utilisateur

    - Méthode : GET
    - URL : /api/users/:userId
    - Description : Permet de récupérer les informations d'un utilisateur spécifique.
    - Token : Oui

4. Mettre à jour les informations d'un utilisateur

    - Méthode : PUT
    - URL : /api/users/:userId
    - Description : Permet de mettre à jour les informations d'un utilisateur spécifique.
    - Body :
      ```json
      {
         "username": "nouveau_nom",
         "email": "nouveau_email"
      }
      ```
    - Token : Oui

5. Tableau de bord

    - Méthode : GET
    - URL : /api/users/dashboard
    - Description : Récupère les informations de l'utilisateur connecté.
    - Token : Oui

## Articles

1. Ajouter un article

    - Méthode : POST
    - URL : /api/articles
    - Description : Permet d'ajouter un nouvel article.
    - Body :
      ```json

      {
        "article_photo":"file",
        "title": "string",
        "article_description":"string",
        "article_price":"number",
        "shipping_cost":"number",
        "category_name":"string",
        "date_added":"string"
        }
      ```
    - Token : Oui

2. Voir les articles de l'utilisateur

    - Méthode : GET
    - URL : /api/articles/user
    - Description : Récupérer les articles d'un utilisateur spécifique.
    - Token : Oui

3. Modifier un article

    - Méthode : PUT
    - URL : /api/articles/:articleId
    - Description : Mettre à jour un article spécifique.
    - Body :
      ```json
      {
         "title": "string",
         "description": "string",
         "price": "number",
         "category": "string",
         "article_photo": "file"
      }
      ```
    - Token : Oui

4. Supprimer un article

    - Méthode : DELETE
    - URL : /api/articles/:articleId
    - Description : Supprimer un article spécifique.
    - Token : Oui

5. Récupérer un article par son ID

    - Méthode : GET
    - URL : /api/articles/:articleId
    - Description : Récupérer les détails d'un article spécifique.
    - Token : Non

6. Ajouter une évaluation

    - Méthode : POST
    - URL : /api/articles/:id/evaluations
    - Description : Ajouter une évaluation pour un article.
    - Body :
      ```json
      {
         "rating": "number",
         "comment": "string"
      }
      ```
    - Token : Oui

7. Afficher tous les articles "public"

    - Méthode : GET
    - URL : /api/articles
    - Description : Récupérer tous les articles publics.
    - Token : Non

8. Récupérer une évaluation

    - Méthode : GET
    - URL : /api/articles/:articleId/evaluations
    - Description : Récupérer les évaluations d'un article spécifique.
    - Token : Non

9. Récupérer le prix d'un article spécifique

    - Méthode : GET
    - URL : /api/articles/:articleId/price
    - Description : Récupérer le prix d'un article spécifique.
    - Token : Non

10. Récupérer les prix de tous les articles

     - Méthode : GET
     - URL : /api/articles/prices
     - Description : Récupérer les prix de tous les articles.
     - Token : Non

11. Récupérer les articles et leurs prix dans une catégorie spécifique

     - Méthode : GET
     - URL : /api/categories/:categoryId/articles/prices
     - Description : Récupérer les articles et leurs prix dans une catégorie spécifique.
     - Token : Non

## Catégories

1. Ajouter une catégorie

    - Méthode : POST
    - URL : /api/categories
    - Description : Ajouter une nouvelle catégorie.
    - Body :
      ```json
      {
         "name": "string"
      }
      ```
    - Token : Oui

2. Afficher toutes les catégories

    - Méthode : GET
    - URL : /api/categories
    - Description : Récupérer toutes les catégories.
    - Token : Non

3. Modifier le nom d'une catégorie

    - Méthode : PUT
    - URL : /api/categories/:categoryId
    - Description : Mettre à jour une catégorie spécifique.
    - Body :
      ```json
      {
         "name": "nouveau_nom"
      }
      ```
    - Token : Oui

4. Supprimer une catégorie

    - Méthode : DELETE
    - URL : /api/categories/:categoryId
    - Description : Supprimer une catégorie spécifique.
    - Token : Oui

## Favoris

1. Ajouter un article aux favoris

    - Méthode : POST
    - URL : /api/favorites
    - Description : Ajouter un article aux favoris de l'utilisateur.
    - Body :
      ```json
      {
         "articleId": "string"
      }
      ```
    - Token : Oui

2. Récupérer les favoris de l'utilisateur

    - Méthode : GET
    - URL : /api/favorites/user
    - Description : Récupérer la liste des articles favoris de l'utilisateur.
    - Token : Oui

3. Supprimer un favori

    - Méthode : DELETE
    - URL : /api/favorites/:articleId
    - Description : Supprimer un article des favoris de l'utilisateur.
    - Token : Oui

## Panier

1. Ajouter un article au panier

    - Méthode : POST
    - URL : /api/cart
    - Description : Ajouter un article au panier de l'utilisateur.
    - Body :
      ```json
      {
         "articleId": "string",
         "quantity": "number"
      }
      ```
    - Token : Oui

2. Récupérer les articles du panier de l'utilisateur

    - Méthode : GET
    - URL : /api/cart/user
    - Description : Récupérer la liste des articles dans le panier de l'utilisateur.
    - Token : Oui

3. Supprimer un article du panier

    - Méthode : DELETE
    - URL : /api/cart/:articleId
    - Description : Supprimer un article du panier de l'utilisateur.
    - Token : Oui

## Commandes

1. Créer une commande

    - Méthode : POST
    - URL : /api/orders
    - Description : Permet de créer une nouvelle commande.
    - Body :
      ```json
      {
         "orderDetails": "détails_de_la_commande"
      }
      ```
    - Token : Oui

2. Récupérer les commandes d'un utilisateur

    - Méthode : GET
    - URL : /api/orders/user
    - Description : Récupérer toutes les commandes passées par un utilisateur spécifique.
    - Token : Oui

3. Récupérer une commande par son ID

    - Méthode : GET
    - URL : /api/orders/:orderId
    - Description : Récupérer les détails d'une commande spécifique.
    - Token : Oui

4. Mettre à jour le statut d'une commande

    - Méthode : PUT
    - URL : /api/orders/:orderId/status
    - Description : Mettre à jour le statut d'une commande.
    - Body :
      ```json
      {
         "status": "nouveau_statut"
      }
      ```
    - Token : Oui


## Obtenir toutes les évaluations

- Méthode : GET

URL : http://localhost:3001/api/evaluations

Exemple de réponse :

json
Copier le code
[
    {
        "evaluation_id": 1,
        "evaluation_number": 5,
        "evaluation_description": "Je le veux !",
        "user_id": 7,
        "article_id": 9,
        "date_added": "2023-07-01T00:00:00.000Z",
        "commented_user_id": null
    }
]

## Obtenir une évaluation par ID

Méthode : GET
URL : http://localhost:3000/api/evaluations/:id
Remplacez :id par l'ID de l'évaluation que vous souhaitez obtenir, par exemple 1.

Exemple de réponse :

json
Copier le code
{
    "evaluation_id": 1,
    "evaluation_number": 5,
    "evaluation_description": "Je le veux !",
    "user_id": 7,
    "article_id": 9,
    "date_added": "2023-07-01T00:00:00.000Z",
    "commented_user_id": null
}

## Créer une nouvelle évaluation

Méthode : POST
URL : http://localhost:3000/api/evaluations
Body (JSON) :

json
Copier le code
{
    "evaluation_number": 4,
    "evaluation_description": "Très bon produit",
    "user_id": 8,
    "article_id": 10
}
Exemple de réponse :

json
Copier le code
{
    "evaluation_id": 2,
    "evaluation_number": 4,
    "evaluation_description": "Très bon produit",
    "user_id": 8,
    "article_id": 10,
    "date_added": "2023-07-01T00:00:00.000Z",
    "commented_user_id": null
}

## Mettre à jour une évaluation

Méthode : PUT
URL : http://localhost:3000/api/evaluations/:id
Remplacez :id par l'ID de l'évaluation que vous souhaitez mettre à jour, par exemple 1.

Body (JSON) :

json
Copier le code
{
    "evaluation_number": 3,
    "evaluation_description": "Produit correct",
    "user_id": 7,
    "article_id": 9
}
Exemple de réponse :

json
Copier le code
{
    "evaluation_id": 1,
    "evaluation_number": 3,
    "evaluation_description": "Produit correct",
    "user_id": 7,
    "article_id": 9,
    "date_added": "2023-07-01T00:00:00.000Z",
    "commented_user_id": null
}

## Supprimer une évaluation

Méthode : DELETE
URL : http://localhost:3000/api/evaluations/:id
Remplacez :id par l'ID de l'évaluation que vous souhaitez supprimer, par exemple 1.

Exemple de réponse :

json
Copier le code
{}
 


