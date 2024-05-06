const initPublic = async () => {
  const resp = await fetch("/api/tickets/working-on");
  const lastTickets = await resp.json();

  renderTickets(lastTickets);
};

function renderTickets(tickets) {
  tickets.forEach((ticket, index) => {
    if (index >= 4) return;
    document.querySelector(
      `#lbl-ticket-0${index + 1}`
    ).innerHTML = `Ticket ${ticket.number}`;
    document.querySelector(
      `#lbl-desk-0${index + 1}`
    ).innerHTML = `${ticket.handleAtDesk}`;
  });
}
function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");
  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);

    if (type === "on-last-tickets-changed") {
      renderTickets(payload);
    }
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

initPublic();
connectToWebSockets();
