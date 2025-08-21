# API Documentation - GojaChat

## Base URL
```
http://localhost:3001
```

## Endpoints

### Users

#### GET /users
Retrieves all users.

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
Retrieves a user by their ID.

#### POST /users
Creates a new user.

**Body:**
```json
{
  "username": "new_user",
  "email": "new@gojachat.com",
  "avatar": "https://i.pravatar.cc/150?img=5",
  "status": "online"
}
```

### Conversations

#### GET /conversations
Retrieves all conversations.

**Réponse:**
```json
[
  {
    "id": 1,
    "name": "GojaChat Team",
    "type": "group",
    "participants": [1, 2, 3, 4],
    "createdAt": "2024-01-10T08:00:00Z",
    "lastMessage": {
      "id": 15,
      "content": "Don't forget the meeting tomorrow at 10am!",
      "senderId": 1,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  }
]
```

#### GET /conversations/:id
Retrieves a conversation by its ID.

#### POST /conversations
Creates a new conversation.

**Body:**
```json
{
  "name": "New conversation",
  "type": "direct",
  "participants": [1, 2]
}
```

### Messages

#### GET /messages
Retrieves all messages with optional filters.

**Query parameters:**
- `conversationId`: Conversation ID
- `_sort`: Sort field (e.g., timestamp)
- `_order`: Sort order (asc/desc)

**Example:**
```
GET /messages?conversationId=1&_sort=timestamp&_order=asc
```

#### GET /messages/:id
Retrieves a message by its ID.

#### POST /messages
Sends a new message.

**Body:**
```json
{
  "conversationId": 1,
  "senderId": 1,
  "content": "Hello everyone!",
  "type": "text"
}
```

### Notifications

#### GET /notifications
Retrieves all notifications with optional filters.

**Query parameters:**
- `userId`: User ID
- `read`: Read status (true/false)

#### GET /notifications/:id
Retrieves a notification by its ID.

#### PATCH /notifications/:id
Updates a notification (e.g., mark as read).

**Body:**
```json
{
  "read": true
}
```

## WebSocket Events

### Client-side events

#### Connection
```javascript
socket.emit('joinConversation', { conversationId: 1 });
```

#### Send message
```javascript
socket.emit('sendMessage', {
  conversationId: 1,
  senderId: 1,
  content: "Hello!",
  type: "text"
});
```

#### Update status
```javascript
socket.emit('updateStatus', { status: 'online' });
```

### Server-side events

#### New message
```javascript
socket.on('newMessage', (message) => {
  console.log('New message:', message);
});
```

#### New notification
```javascript
socket.on('newNotification', (notification) => {
  console.log('New notification:', notification);
});
```

#### User status change
```javascript
socket.on('userStatusChange', (data) => {
  console.log('User status:', data);
});
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Authentication

The API uses simple email-based authentication. For demo accounts:

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
