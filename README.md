# Socket Server Express

A real-time chat server built with Express, Socket.IO, and TypeScript that enables real-time messaging and user management.

## Prerequisites

Before running the server, ensure you have these global dependencies installed:

```bash
# Install TypeScript and ts-node globally
npm install -g typescript ts-node

# Install wscat for testing WebSocket connections
npm install -g wscat
```

## Installation

1. Install project dependencies:

```bash
npm install
```

2. Start the server:

```bash
ts-node index.ts
```

You should see:

-   "Servidor iniciado correctamente"
-   "Conexiones sockets"

## Testing the Application

### REST API Endpoints

1. Get all messages:

```bash
curl http://localhost:5000/mensajes
```

2. Send a broadcast message:

```bash
curl -X POST http://localhost:5000/mensajes \
-H "Content-Type: application/json" \
-d '{"cuerpo": "Hello everyone!", "de": "TestUser"}'
```

3. Send a private message (replace USER_ID with actual user ID):

```bash
curl -X POST http://localhost:5000/mensajes/USER_ID \
-H "Content-Type: application/json" \
-d '{"cuerpo": "Private message", "de": "TestUser"}'
```

4. Get list of connected users:

```bash
curl http://localhost:5000/usuarios/detalle
```

### WebSocket Testing

1. Connect a client using wscat:

```bash
wscat -c "ws://localhost:5000/socket.io/?EIO=4&transport=websocket"
```

2. Login as a user (send after connecting):

```json
{ "tipo": "configurar-usuario", "nombre": "User1" }
```

3. Send a message:

```json
{ "tipo": "mensaje", "cuerpo": "Hello everyone!", "de": "User1" }
```

## Features

-   Real-time messaging
-   User management (connect/disconnect tracking)
-   Private messaging
-   User rooms support
-   Broadcast messages
-   REST API endpoints
-   WebSocket events for real-time updates

## Project Structure

-   `clases/server.ts`: Main server configuration
-   `clases/usuario.ts`: User class definition
-   `clases/usuarios-lista.ts`: User management
-   `routes/router.ts`: REST API endpoints
-   `sockets/sockets.ts`: WebSocket event handlers

## Testing Multiple Users

Open different terminal windows to simulate multiple users:

Terminal 1 (Server):

```bash
ts-node index.ts
```

Terminal 2 (User1):

```bash
wscat -c "ws://localhost:5000/socket.io/?EIO=4&transport=websocket"
# Then send: {"tipo":"configurar-usuario","nombre":"User1"}
```

Terminal 3 (User2):

```bash
wscat -c "ws://localhost:5000/socket.io/?EIO=4&transport=websocket"
# Then send: {"tipo":"configurar-usuario","nombre":"User2"}
```
