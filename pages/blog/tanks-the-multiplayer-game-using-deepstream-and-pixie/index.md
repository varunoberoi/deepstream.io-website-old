{
    "title": "Tanks! Concepts behind making a deepstream multiplayer game",
    "dateISO": "20160112",
    "author": "yasserf",
    "thumbnail": "deepstream-clients.png"
}

Multiplayer games are surprisingly one of the leaders in realtime technology usage. I say surprisingly because concepts like chatting applications, collabrative tools and social apps are usually the first things that come to mind. Let's see how deepstream.io can used to provide the communication layer.

Before we start looking at anything specific, let's look at the basic theory behind multiplayer games.

### Central Servers

Central servers are responsible for pretty much everything that happens in a game. They are the source of truth and usually take control inputs from clients, determine the games state and then informs all the players.

This is useful because you players can't cheat easily, and the clients only depend on the server latency being good for smooth game play.

### Peer to Peer Games

The second type is P2P games. This means clients connect to each other to create a network ( this could be direct )