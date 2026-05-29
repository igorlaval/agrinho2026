/* =========================================
   ELEMENTOS
========================================= */

const truck =
  document.getElementById("truck");

const woods =
  document.querySelectorAll(".wood");

const deliveryZone =
  document.querySelector(".delivery-zone");

const woodText =
  document.getElementById("wood");

const ecoText =
  document.getElementById("eco");

const fuelText =
  document.getElementById("fuel");

const message =
  document.getElementById("message");

/* =========================================
   POSIÇÃO
========================================= */

let truckX = 100;
let truckY = window.innerHeight - 200;

let woodCount = 0;
let eco = 100;
let fuel = 100;

let carryingWood = false;

/* =========================================
   MOVIMENTO
========================================= */

document.addEventListener("keydown", (event) => {

  const speed = 15;

  switch(event.key){

    case "ArrowUp":
      truckY -= speed;
      break;

    case "ArrowDown":
      truckY += speed;
      break;

    case "ArrowLeft":
      truckX -= speed;
      break;

    case "ArrowRight":
      truckX += speed;
      break;
  }

  /* LIMITES */

  if(truckX < 0) truckX = 0;
  if(truckY < 80) truckY = 80;

  if(truckX > window.innerWidth - 140){
    truckX = window.innerWidth - 140;
  }

  if(truckY > window.innerHeight - 120){
    truckY = window.innerHeight - 120;
  }

  /* ENERGIA */

  fuel -= 0.1;

  if(fuel < 0){
    fuel = 0;
  }

  fuelText.innerText =
    Math.floor(fuel);

  /* ATUALIZA CAMINHÃO */

  truck.style.left =
    truckX + "px";

  truck.style.top =
    truckY + "px";

  verificarColisao();
});

/* =========================================
   COLISÃO
========================================= */

function verificarColisao(){

  const truckRect =
    truck.getBoundingClientRect();

  /* MADEIRAS */

  woods.forEach((wood) => {

    if(wood.style.display === "none") return;

    const woodRect =
      wood.getBoundingClientRect();

    const colidiu =
      truckRect.left < woodRect.right &&
      truckRect.right > woodRect.left &&
      truckRect.top < woodRect.bottom &&
      truckRect.bottom > woodRect.top;

    if(colidiu){

      wood.style.display = "none";

      carryingWood = true;

      woodCount++;

      eco -= 5;

      if(eco < 0){
        eco = 0;
      }

      woodText.innerText =
        woodCount;

      ecoText.innerText =
        eco;
    }

  });

  /* BASE */

  const baseRect =
    deliveryZone.getBoundingClientRect();

  const entregou =
    truckRect.left < baseRect.right &&
    truckRect.right > baseRect.left &&
    truckRect.top < baseRect.bottom &&
    truckRect.bottom > baseRect.top;

  if(entregou && carryingWood){

    carryingWood = false;

    eco += 10;

    if(eco > 100){
      eco = 100;
    }

    ecoText.innerText =
      eco;

    verificarVitoria();
  }

}

/* =========================================
   VITÓRIA
========================================= */

function verificarVitoria(){

  if(woodCount >= 3){

    message.classList.remove("hidden");

  }

}