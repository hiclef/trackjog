//import "./styles.css";

const appendInfoCard = (route, time, duration) => {
  const cardSection = document.querySelector("#cardSection");
  cardSection.innerHTML = "";

  const markup = `<div class="route-info-card">
      <h3>${route}</h3>
      <p>Start Time: ${time}</p>
      <p>Duration: ${duration}</p>
    </div>`;

  cardSection.insertAdjacentHTML("beforeend", markup);
};

const routeList = document.querySelector(".route-list ul");

routeList.addEventListener("click", e => {
  if (e.target.classList.contains("route-item")) {
    const route = e.target.dataset.name;
    const time = e.target.dataset.time;
    const duration = e.target.dataset.duration;
    appendInfoCard(route, time, duration);
  }
});

document.querySelector("#title").innerHTML = "Welcome, visitor";
