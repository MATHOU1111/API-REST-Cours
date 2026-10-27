# Authentification de l'API

## Configuration

Copier les variables suivantes dans `.env` :

```env
AUTH_TOKEN_SECRET=secret-long-et-aleatoire
```

`AUTH_TOKEN_SECRET` doit rester confidentiel et être suffisamment long. Les
identifiants sont stockés dans la collection MongoDB `Users`. Les mots de passe
doivent être enregistrés sous forme de hash bcrypt. Les jetons sont des JWT
signés avec cette clé.

## Obtenir un jeton

Envoyer les identifiants à `POST /api/auth/token` :

```http
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Une authentification réussie retourne `200 OK` avec un jeton valable 5 minutes :

```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 300
}
```

Le jeton est signé et son expiration est vérifiée à chaque requête. Il doit
être transmis dans l'en-tête `Authorization` :

```http
Authorization: Bearer <access_token>
```

## Routes protégées

Les lectures (`GET /api/products` et `GET /api/products/:id`) restent
accessibles sans authentification. Toutes les actions d'écriture nécessitent
un jeton valide :

- `POST /api/products`
- `PATCH /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

## Codes HTTP d'authentification

- `200 OK` : jeton généré.
- `400 Bad Request` : corps de demande incomplet ou invalide.
- `401 Unauthorized` : identifiants invalides ou jeton absent, invalide ou expiré.
- `503 Service Unavailable` : `AUTH_TOKEN_SECRET` absent.
