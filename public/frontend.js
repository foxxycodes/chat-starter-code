const messages = document.querySelector(".chat");
const messageBox = document.querySelector("#messageBox");
const messageForm = document.querySelector("#messageForm");

messageForm.onsubmit = function (e) {
  e.preventDefault();
  const message = messageBox.value;
  showMessageSent(message);
  messageBox.value = "";
  sendMessageToServer(message);
};

function showMessageSent(message) {
  showNewMessage(message, "sending");
}
function showMessageReceived(message) {
  showNewMessage(message, "receiving");
}

// This function displays a message in the messages container node.
// className may either be 'mine' or 'yours' (see styles.css for the distinction)
function showNewMessage(message, className) {
  // Create a text node element for the message
  const textNode = document.createElement("div");
  textNode.innerHTML = message;
  textNode.className = "message";

  // Wrap the text node in a message element
  const messageNode = document.createElement("div");
  messageNode.className = "messages " + className;
  messageNode.appendChild(textNode);

  // Append the messageNode to the messages container element
  messages.appendChild(messageNode);
  messages.scrollTop = messages.scrollHeight;
}
