// This variable will hold the WebSocket client connection.
let wsClient;

function init() {
  /* Note: 
      Though the conditional block below is not necessary, it is a best practice to avoid
      tampering with a cluttered namespace.
      */

  // If a WebSocket connection exists already, close it
  if (wsClient) {
    wsClient.onerror = wsClient.onopen = wsClient.onclose = null;
    wsClient.close();
  }

  // TODO:
  // Exercise 4: Create a new WebSocket connection with the server using the ws protocol.
  const URL = "ws://localhost:" + PORT;
  wsClient = new WebSocket(URL);

  // TODO:
  // Exercise 5: Respond to connections by defining the .onopen event handler.
  wsClient.onopen = function () {
    console.log("Connected to server");

    // TODO:
    // Exercise 7: Respond to messages from the servery by defining the .onmessage event handler
    wsClient.onmessage = function (event) {
      // Exercise 9: Parse custom message types, formatting each message based on the type.
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "message":
          showMessageReceived(message.data);
          break;
        default:
          console.log("Unknown message type: " + message.type);
      }
    };

    /* Note:
        The event handlers below are useful for properly cleaning up a closed/broken WebSocket client connection.
        To read more about them, check out the WebSocket API documentation: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        */
  };

  // .onclose is executed when the socket connection is closed
  wsClient.onclose = (event) => {
    showMessageReceived("No WebSocket connection :(");
    wsClient = null;
  };

  // .onerror is executed when error event occurs on the WebSocket connection
  wsClient.onerror = (event) => {
    console.error("WebSocket error observed:", event);
    wsClient = null;
  };
}

function sendMessageToServer(message) {
  // Make sure the client is connected to the ws server
  if (!wsClient) {
    showMessageReceived("No WebSocket connection :(");
    return;
  }

  // TODO:
  // Exercise 6: Send the message from the messageBox to the server
  wsClient.send(
    JSON.stringify({
      type: "message",
      data: message,
    })
  );
}

// Start the WebSocket server
init();
