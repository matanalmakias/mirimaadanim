export const serverUrl = `http://localhost:3001`;
//export const serverUrl = `https://miricatering.herokuapp.com`;

export const useSocket = (socket) => {
  socket.emit("update");
};
export const dayList = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
];
