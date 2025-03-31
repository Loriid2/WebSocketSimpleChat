const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");

const template = "<li class=\"list-group-item\">%MESSAGE</li>";
const messages = [];

const socket = io();

input.onkeydown = (event) => {
  
  if (event.keyCode === 13) {
      event.preventDefault();
      button.click();
  }
}

button.onclick = () => {
  socket.emit("message", input.value);
  input.value = "";
}

socket.on("chat", (message) => {
  console.log(message);
  messages.push(message);
  render();
})

const render = () => {
  let html = "";
  messages.forEach((message, index) => {
    const color = index % 2 === 0 ? "red" : "blue";
    const row = `<li class="list-group-item" style="color: ${color};">${message}</li>`;
    html += row;
  });
  chat.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
}