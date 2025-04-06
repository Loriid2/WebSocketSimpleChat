const areaInserimentoNome = document.getElementById("inserimentoNome");
const nomeModale = document.getElementById("nomeModale");
const joinButton = document.getElementById("join");
const chat = document.getElementById("chat");
const input = document.getElementById("input");

const areaInserimentoMess = document.getElementById("areaInserimentoMess");
const inputMessaggio = document.getElementById("inputMessaggio");
const button = document.getElementById("sendMessage");

const listaUtenti= document.getElementById("listaUsers");
let nomeUser= null;

areaInserimentoMess.classList.add("hidden");
chat.classList.add("hidden");

const template = "<li class='list-group-item'>%MESSAGE</li>";
const messages = [];

const socket = io();

const entraChat=()=>{
  const nome = nomeModale.value;
  if(nome.length>0){
    nomeUser = nome;
    socket.emit("message", "benvenuto in chat" + nomeUser);
    socket.emit("set_username", nomeUser);
    areaInserimentoNome.classList.remove("show");
    areaInserimentoNome.classList.add("hidden");
    areaInserimentoMess.classList.remove("hidden");
    areaInserimentoMess.classList.add("show");
    chat.classList.remove("hidden");
    chat.classList.add("show");
  }
}

joinButton.onclick = () => {
  entraChat();
}


button.onclick = () => {
  socket.emit("message", inputMessaggio.value);
  inputMessaggio.value = "";
}

socket.on("chat", (message) => {
  console.log(typeof message);
  if (typeof message === 'string') {
    messages.push(message);
  } else if (typeof message === 'object' && message.message) {
    messages.push(message.message);
  }
  render();
})


socket.on("list",(list)=>{
  console.log("lista ricevuta: "+ list);
  renderList(list);
});

socket.on('disconnect', () => {
  console.log('Disconnesso dal server');
});

const render = () => {
  let html = "";
  messages.forEach((message) => {
    const row = template.replace("%MESSAGE", message);
    html+=row;
  });
  chat.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
}

const renderList=(userList)=>{
  let html = "";
  userList.forEach((user) => {
    html+=`<li>${user.name}</li>`;
  });
  listaUtenti.innerHTML = html;
}