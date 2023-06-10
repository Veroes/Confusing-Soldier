const troopsData = {
  0: {
    greedy: false,
    dp: false,
  },
};

const urlParams = new URLSearchParams(window.location.search);
let inTroopsCount = urlParams.get("inTroopsCount");

const troopsLeft = document.getElementById("troopsLeft");
troopsLeft.innerHTML = `${inTroopsCount} left`;

const listContainer = document.getElementById("listContainer");
const soldierName = document.getElementById("sname");
const combatPower = document.getElementById("cpower");

const randomSoldierImg = () => {
  const arrayImg = [
    "./assets/soldier_1.png",
    "./assets/soldier_2.png",
    "./assets/soldier_3.png",
    "./assets/soldier_4.png",
  ];

  const randomNumber = Math.floor(Math.random() * 4);
  const imgElement = document.createElement("img");
  imgElement.src = arrayImg[randomNumber];

  return [imgElement, arrayImg[randomNumber]];
};

let objectIndex = 1;
const btnTroop = document.getElementById("btnTroop");

function nextPage() {
  urlParams.set("troopsData", JSON.stringify(troopsData));
  window.location.href = `confusing-result.html?${urlParams.toString()}`;
  /*
  urlParams.set("troopsData", JSON.stringify(troopsData));
  window.history.replaceState(null, null, `?${urlParams.toString()}`);
  */
}

btnTroop.addEventListener("click", () => {
  if (inTroopsCount !== 0) {
    let li = document.createElement("li");
    const randomImg = randomSoldierImg();
    let chosenImgElement = randomImg[0];
    let chosenImg = randomImg[1];
    li.appendChild(chosenImgElement);
    li.innerHTML += `${soldierName.value} ${combatPower.value}`;
    listContainer.appendChild(li);

    troopsData[objectIndex] = new Object();
    troopsData[objectIndex].name = soldierName.value;
    troopsData[objectIndex].power = parseInt(combatPower.value);
    troopsData[objectIndex].img = chosenImg;
    troopsData[objectIndex].status = false;
    troopsData[objectIndex].order = 0;

    inTroopsCount--;
    troopsLeft.innerHTML = `${inTroopsCount} left`;
    objectIndex++;

    soldierName.value = "";
    combatPower.value = "";
    if (inTroopsCount === 0) {
      btnTroop.style.backgroundColor = "#9BABB8";

      const algorithmPath = document.getElementById("algorithm-path");
      const newButton1 = document.createElement("button");
      newButton1.innerHTML = "Greedy";
      newButton1.classList = "button-style";
      newButton1.addEventListener("click", () => {
        troopsData[0].greedy = true;
        nextPage();
      });

      const newButton2 = document.createElement("button");
      newButton2.innerHTML = "Dynamic Programming";
      newButton2.classList = "button-style";
      newButton2.addEventListener("click", () => {
        troopsData[0].dp = true;
        nextPage();
      });
      algorithmPath.appendChild(newButton1);
      algorithmPath.appendChild(newButton2);
    }
  }
});
