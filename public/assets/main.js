const username = document.getElementById("username");
const login_sendbtn = document.getElementById("login_sendbtn");
const login_resetbtn = document.getElementById("login_resetbtn");
const loginpage = document.querySelector(".login");
const chat_history = document.getElementById("chat_history");
const chatmsg = document.getElementById("chat_msg");
const chatbtn = document.getElementById("chat_sendmsg");

let userdata = {
  username,
};

const socket = io("http://localhost:3100", {
  withCredentials: true,
});

socket.once("hello", (arg) => {
  arg.forEach((element) => {
    chat_history.innerHTML += `<li class="chat_message">${element.username}: ${element.message}</li>`;
  });
});

socket.on("sendmsg", (arg) => {
  chat_history.innerHTML += `<li class="chat_message">${arg.username}: ${arg.message}</li>`;
});

socket.on("usersonline", (arg) => {
  document.title = `Online users: ${arg}`;
});

login_sendbtn.addEventListener("click", () => {
  if (
    username.value == "" ||
    username.value == null ||
    username.value == undefined
  ) {
    return;
  }

  userdata.username = username.value;
  loginpage.style.display = "none";
});

login_resetbtn.addEventListener("click", () => {
  username.value = "";
});

chatbtn.addEventListener("click", () => {
  if (
    chatmsg.value == "" ||
    chatmsg.value == null ||
    chatmsg.value == undefined
  ) {
    return;
  }
  socket.emit("receivemsg", {
    username: userdata.username,
    message: chatmsg.value,
  });
});
