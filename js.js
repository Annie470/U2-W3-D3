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
    card.innerHTML = `<div class="card h-100 d-flex flex-column">
  <img src="${element.img}" class="card-img-top" alt="copertina">
  <div class="card-body d-flex flex-column flex-grow-1">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">Category: ${element.category}</p>
    <p class="card-text">Price: ${element.price}</p>
  </div>
  <div class="d-flex flex-column align-items-center">
    <button class="btn btn-outline-warning text-black w-75 mb-1 add">Add/Remove</button>
    <button class="btn btn-outline-warning text-black w-75 mb-2 canc">Canc</button>
  </div>
</div>`;
    const row = document.querySelector(".row");
    row.appendChild(card);

    //bottone d-none
    const cancBtn = card.querySelector(".canc");
    cancBtn.addEventListener("click", () => {
      card.classList.add("d-none");
    });

    //bottone carrello
    const addBtn = card.querySelector(".add");
  });
};
