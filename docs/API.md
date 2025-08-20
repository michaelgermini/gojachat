# API Documentation - GojaChat

## Base URL
```
http://localhost:3001
```

## Endpoints

### Utilisateurs

#### GET /users
Récupère tous les utilisateurs.

**Réponse:**
```json
[
  {
    "id": 1,
    "username": "alice",
    "email": "alice@gojachat.com",
    "avatar": "https://i.pravatar.cc/150?img=1",
    "status": "online",
    "lastSeen": "2024-01-15T10:30:00Z"
  }
]
```

#### GET /users/:id
Récupère un utilisateur par son ID.

#### POST /users
Crée un nouvel utilisateur.

**Body:**
```json
{
  "username": "nouveau_user",
  "email": "nouveau@gojachat.com",
  "avatar": "https://i.pravatar.cc/150?img=5",
  "status": "online"
}
```

### Conversations

#### GET /conversations
Récupère toutes les conversations.

**Réponse:**
```json
[
  {
    "id": 1,
    "name": "Équipe GojaChat",
    "type": "group",
    "participants": [1, 2, 3, 4],
    "createdAt": "2024-01-10T08:00:00Z",
    "lastMessage": {
      "id": 15,
      "content": "N'oubliez pas la réunion demain à 10h !",
      "senderId": 1,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  }
]
```

#### GET /conversations/:id
Récupère une conversation par son ID.

#### POST /conversations
Crée une nouvelle conversation.

**Body:**
```json
{
  "name": "Nouvelle conversation",
  "type": "direct",
  "participants": [1, 2]
}
```

### Messages

#### GET /messages
Récupère tous les messages avec filtres optionnels.

**Paramètres de requête:**
- `conversationId`: ID de la conversation
- `_sort`: Champ de tri (ex: timestamp)
- `_order`: Ordre de tri (asc/desc)

**Exemple:**
```
GET /messages?conversationId=1&_sort=timestamp&_order=asc
```

#### GET /messages/:id
Récupère un message par son ID.

#### POST /messages
Envoie un nouveau message.

**Body:**
```json
{
  "conversationId": 1,
  "senderId": 1,
  "content": "Bonjour tout le monde !",
  "type": "text"
}
```

### Notifications

#### GET /notifications
Récupère toutes les notifications avec filtres optionnels.

**Paramètres de requête:**
- `userId`: ID de l'utilisateur
- `read`: Statut de lecture (true/false)

#### GET /notifications/:id
Récupère une notification par son ID.

#### PATCH /notifications/:id
Met à jour une notification (ex: marquer comme lue).

**Body:**
```json
{
  "read": true
}
```

## WebSocket Events

### Événements côté client

#### Connexion
```javascript
socket.emit('joinConversation', { conversationId: 1 });
```

#### Envoi de message
```javascript
socket.emit('sendMessage', {
  conversationId: 1,
  senderId: 1,
  content: "Bonjour !",
  type: "text"
});
```

#### Mise à jour du statut
```javascript
socket.emit('updateStatus', { status: 'online' });
```

### Événements côté serveur

#### Nouveau message
```javascript
socket.on('newMessage', (message) => {
  console.log('Nouveau message:', message);
});
```

#### Nouvelle notification
```javascript
socket.on('newNotification', (notification) => {
  console.log('Nouvelle notification:', notification);
});
```

#### Changement de statut utilisateur
```javascript
socket.on('userStatusChange', (data) => {
  console.log('Statut utilisateur:', data);
});
```

## Codes de statut HTTP

- `200` - Succès
- `201` - Créé
- `400` - Requête invalide
- `404` - Ressource non trouvée
- `500` - Erreur serveur

## Authentification

L'API utilise une authentification simple basée sur l'email. Pour les comptes de démonstration :

- **Alice**: alice@gojachat.com / password
- **Bob**: bob@gojachat.com / password
- **Charlie**: charlie@gojachat.com / password
- **Diana**: diana@gojachat.com / password

## Exemples d'utilisation

### Récupérer les messages d'une conversation
```bash
curl "http://localhost:3001/messages?conversationId=1&_sort=timestamp&_order=asc"
```

### Envoyer un message
```bash
curl -X POST http://localhost:3001/messages \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": 1,
    "senderId": 1,
    "content": "Bonjour !",
    "type": "text"
  }'
```

### Marquer une notification comme lue
```bash
curl -X PATCH http://localhost:3001/notifications/1 \
  -H "Content-Type: application/json" \
  -d '{"read": true}'
```
