# API REST produits

## Installation

```bash
npm install
```

Copier `.env.example` vers `.env`, puis adapter `MONGODB_URI` si nécessaire.
MongoDB doit être démarré avant le lancement de l'API.

## Lancement

```bash
npm start
```

En développement :

```bash
npm run dev
```

## Routes

- `GET /api/products` : lister les produits (`200`)
- `GET /api/products/:id` : consulter un produit (`200`, `400` ou `404`)
- `POST /api/products` : ajouter un produit (`201`)
- `PATCH /api/products/:id` : modifier partiellement un produit (`200`)
- `PUT /api/products/:id` : remplacer un produit (`200`)
- `DELETE /api/products/:id` : supprimer un produit (`204`)

Un produit contient les champs JSON obligatoires `name`, `description`, `price` et `category`.
