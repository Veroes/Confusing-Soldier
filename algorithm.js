const urlParams = new URLSearchParams(window.location.search);
const troopsDataParam = urlParams.get("troopsData");
const troopsData = JSON.parse(troopsDataParam);
const labelApproach = document.getElementById("algorithm-approach");

let arrayOfSoldier = [];
for (let key in Object.keys(troopsData)) {
  if (key != 0) {
    arrayOfSoldier.push(troopsData[key]);
  }
}
const checkArray = (arrayOfSoldier) => {
  for (let i = 0; i < arrayOfSoldier.length; i++) {
    if (arrayOfSoldier[i].order === 0) {
      return true;
    }
  }
  return false;
};

const checkMaxIndex = (arrayOfSoldier) => {
  let arrayPower = [];
  for (let i = 0; i < arrayOfSoldier.length; i++) {
    if (arrayOfSoldier[i].status === false && arrayOfSoldier[i].order === 0) {
      arrayPower.push([i, arrayOfSoldier[i].power]);
    }
  }
  let maxIndex = 0;
  let maxValue = 0;
  for (let i = 0; i < arrayPower.length; i++) {
    const currentValue = arrayPower[i][1];
    if (currentValue > maxValue) {
      maxValue = currentValue;
      maxIndex = arrayPower[i][0];
    }
  }
  return maxIndex;
};

const terminatePick = (arrayOfSoldier, maxIndex) => {
  if (maxIndex === 0) {
    arrayOfSoldier[maxIndex + 1].order--;
  } else if (maxIndex === arrayOfSoldier.length - 1) {
    arrayOfSoldier[maxIndex - 1].order--;
  } else {
    arrayOfSoldier[maxIndex - 1].order--;
    arrayOfSoldier[maxIndex + 1].order--;
  }
};

const greedyApproach = () => {
  let pickOrder = 1;
  while (checkArray(arrayOfSoldier)) {
    let maxIndex = checkMaxIndex(arrayOfSoldier);
    arrayOfSoldier[maxIndex].order = pickOrder;
    arrayOfSoldier[maxIndex].status = true;
    pickOrder++;
    terminatePick(arrayOfSoldier, maxIndex);
  }
};

const dpApproach = () => {
  // Coin Row
  let F = [];
  F.push(arrayOfSoldier[0].power);
  if (arrayOfSoldier[1].power > arrayOfSoldier[0].power) {
    F.push(arrayOfSoldier[1].power);
  } else {
    F.push(arrayOfSoldier[0].power);
  }
  for (let i = 2; i < arrayOfSoldier.length; i++) {
    F.push(Math.max(F[i - 1], F[i - 2] + arrayOfSoldier[i].power));
  }
  // Chosen
  let X = F.length - 1;
  while (X >= 0) {
    if (F[X] > F[X - 1] || X + 2 === 2) {
      arrayOfSoldier[X].status = true;
      X -= 2;
    } else {
      X--;
    }
  }
};

console.log(arrayOfSoldier);

// UI Implementation
const UI = (algorithmOutput) => {
  const resultBox = document.getElementById("result-box");
  arrayOfSoldier.forEach((soldier) => {
    const soldierProfile = document.createElement("div");

    soldierProfile.classList = "soldier-profile";

    const image = document.createElement("img");
    image.src = soldier.img;

    const name = document.createElement("p");
    name.textContent = soldier.name;

    const power = document.createElement("p");
    power.textContent = "Power: " + soldier.power;

    if (soldier.status === true) {
      soldierProfile.style.backgroundColor = "#539165";
    }

    soldierProfile.appendChild(image);
    soldierProfile.appendChild(name);
    soldierProfile.appendChild(power);
    if (algorithmOutput.greedy === true && soldier.order > 0) {
      const order = document.createElement("p");
      order.textContent = soldier.order;
      soldierProfile.appendChild(order);
    }
    resultBox.appendChild(soldierProfile);
  });
};

if (troopsData[0].greedy === true) {
  labelApproach.innerHTML = "Greedy Approach";
  greedyApproach();
} else {
  labelApproach.innerHTML = "Dynamic Programming Approach";
  dpApproach();
}

// UI Output
UI(troopsData[0]);
