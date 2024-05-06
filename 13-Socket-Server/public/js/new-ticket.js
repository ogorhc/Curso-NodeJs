const spanTicketLbl = document.querySelector("span");
const newTicketBtn = document.querySelector("button");
const url = "http://localhost:3000/api/tickets";

const getLastTicket = async () => {
  const resp = await fetch(`${url}/last`);
  const last = await resp.json();
  spanTicketLbl.innerHTML = `En cola ${last}`;
};

const onNewTicket = async () => {
  spanTicketLbl.innerHTML = "Cargando...";
  const resp = await fetch(`${url}`, {
    method: "POST",
  });
  const newTicket = await resp.json();
  spanTicketLbl.innerHTML = `En cola ${newTicket.number}`;
};

newTicketBtn.addEventListener("click", onNewTicket);

getLastTicket();
