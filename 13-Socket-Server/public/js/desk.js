const lblPending = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const lblAlert = document.querySelector(".alert");
const lblCurrentTicket = document.querySelector("small");

const btnDraw = document.querySelector("#btn-draw");
const btnDone = document.querySelector("#btn-done");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Escritorio es requerido");
}

const deskNumber = searchParams.get("escritorio");
let workingTicket = null;
deskHeader.innerHTML = deskNumber;

const checkTicketCount = (currentCount = 0) => {
  console.log(currentCount);
  if (currentCount === 0) {
    lblAlert.classList.remove("d-none");
  } else {
    lblAlert.classList.add("d-none");
  }
  lblPending.innerHTML = currentCount;
};
const loadInitialCount = async () => {
  const resp = await fetch("http://localhost:3000/api/tickets/pending");
  const pendings = await resp.json();
  checkTicketCount(pendings.length);
};

const getTicket = async () => {
  await finishTicket();
  const resp = await fetch(`/api/tickets/draw/${deskNumber}`);
  const { status, ticket, message } = await resp.json();
  if (status === "error") {
    lblCurrentTicket.innerHTML = message;
  }

  workingTicket = ticket;
  if (workingTicket) {
    lblCurrentTicket.innerHTML = workingTicket?.number;
  }
};

const finishTicket = async () => {
  if (!workingTicket) return;
  const resp = await fetch(`/api/tickets/done/${workingTicket.number}`, {
    method: "PUT",
  });
  const { status } = await resp.json();
  if (status === "ok") {
    workingTicket = null;
    lblCurrentTicket.innerText = "";
  }
};

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);
    if (type !== "on-ticket-count-changed") return;
    checkTicketCount(payload);
  };

  socket.onclose = (event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Connected");
  };
}

btnDraw.addEventListener("click", getTicket);
btnDone.addEventListener("click", finishTicket);

loadInitialCount();
connectToWebSockets();
