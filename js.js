const getLibData = function () {
  fetch(" https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Errore richiesta, status ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data); //è un array
      getCards(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
getLibData();

//metodo per creare card da un array
const getCards = function (array) {
  array.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("col-12");
    card.classList.add("col-md-4");
    card.classList.add("col-lg-3");
    card.innerHTML = `<div class="card">
  <img src="${element.img}" class="card-img-top" alt="copertina">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">Category: ${element.category}</p>
    <p class="card-text">Price: ${element.price}</p>
    <a href="#" id="add" class="btn btn-primary">Add/Remove</a>
    <a href="#" id="canc" class="btn btn-primary">Canc</a>
  </div>
</div>`;
    const row = document.querySelector(".row");
    row.appendChild(card);
  });
};
