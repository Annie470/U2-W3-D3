//variabile carrello
const pCart = document.getElementById("special-p");
let cart = parseFloat(localStorage.getItem("cart"));
if (!cart) {
  cart = 0;
  localStorage.setItem("cart", cart.toFixed(2));
  pCart.innerText = 0;
} else {
  pCart.innerText = cart.toFixed(2);
}
const arrayCart = [cart];
console.log(cart);

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
    <p class="card-text">${element.price}</p>
  </div>
  <div class="d-flex flex-column align-items-center">
    <button class="btn btn-outline-warning text-black w-75 mb-1 add">Add</button>
    <button class="btn btn-outline-warning text-black w-75 mb-1 remove">Remove</button>
    <button class="btn btn-outline-danger text-black w-75 mt-4 mb-2 canc">Discard</button>
  </div>
</div>`;
    const row = document.querySelector(".row");
    row.appendChild(card);

    //bottone d-none
    const cancBtn = card.querySelector(".canc");
    cancBtn.addEventListener("click", () => {
      card.classList.add("d-none");
    });

    const price = card.querySelector("p+p");
    const priceN = Math.floor(parseFloat(price.textContent) * 100) / 100;

    //bottone carrello
    const addBtn = card.querySelector(".add");
    addBtn.addEventListener("click", () => {
      arrayCart.push(priceN);
      cart = arrayCart.reduce((acc, n) => {
        return acc + n;
      });
      localStorage.setItem("cart", cart.toFixed(2));
      //il p del cart
      pCart.innerHTML = cart.toFixed(2);
    });

    //bottone rimuovi da carrello
    const remBtn = card.querySelector(".remove");
    remBtn.addEventListener("click", () => {
      cart -= priceN;
      localStorage.setItem("cart", cart);
      //il p del cart
      pCart.innerHTML = cart.toFixed(2);
    });
  });
};
