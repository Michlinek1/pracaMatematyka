const trojkat = document.getElementsByClassName("trojkat")[0];
const aInput = document.getElementById("a");
const bInput = document.getElementById("b");
const cInput = document.getElementById("c");
const tangens = document.getElementById("tg");
const sinus = document.getElementById("sin");
const cosinus = document.getElementById("cos");
const wszystko = document.getElementById("wszystko");
const submit = document.querySelector("input[type=submit]");
const ah1 = document.getElementById("ah1");
const ah2 = document.getElementById("ah2");
const ah3 = document.getElementById("ah3");

tangens.onclick = function () {
  clearValues();
  hideButtons()
  showInputs(true, true, false);
};

sinus.onclick = function () {
  clearValues();
  hideButtons()
  showInputs(true, false, true);
};

cosinus.onclick = function () {
  clearValues();
  hideButtons()
  showInputs(false, true, true);
};

wszystko.onclick = function () {
  hideButtons();
  addButtons();
};

function clearValues() {
  ah1.textContent = "";
  ah2.textContent = "";
  ah3.textContent = "";
}

function showInputs(aVisible, bVisible, cVisible) {
  aInput.style.display = aVisible ? "block" : "none";
  bInput.style.display = bVisible ? "block" : "none";
  cInput.style.display = cVisible ? "block" : "none";
}

function addButtons() {

  const buttonA = createButton("przyciskA", "A", clicked);
  const buttonB = createButton("przyciskB", "B", clicked);
  const buttonC = createButton("przyciskC", "C", clicked);

  if (trojkat && buttonA) {
    trojkat.appendChild(buttonA);
  }
  if (trojkat && buttonB) {
    trojkat.appendChild(buttonB);
  }
  if (trojkat && buttonC) {
    trojkat.appendChild(buttonC);
  }
}

function checkIfInputsExist() {
  if (aInput.offsetParent !== null){
    aInput.style.display = "none";
  }else if (bInput.offsetParent !== null){
    bInput.style.display = "none";
  }else if(cInput.offsetParent !== null){
    cInput.style.display = "none";
  }
}

function hideInputs() {
  if (!checkIfInputsExist()) {
    aInput.style.display = "none";
    bInput.style.display = "none";
    cInput.style.display = "none";
  }
}

function hideButtons() {
  const existingButtonA = document.getElementById("przyciskA");
  const existingButtonB = document.getElementById("przyciskB");
  const existingButtonC = document.getElementById("przyciskC");

  if (existingButtonA) {
  existingButtonA.remove();
  }
  if (existingButtonB) {
    existingButtonB.remove();
  }
  if (existingButtonC) {
    existingButtonC.remove();
  }
}

function clicked(event) {
  if (aInput !== null && aInput.offsetParent !== null && bInput !== null && bInput.offsetParent !== null) {
    RozwiazanieWiad("Bok c zostanie obliczony pitagorasem!");
    event.target.remove();
    return;
  } else if (bInput !== null && bInput.offsetParent !== null && cInput !== null && cInput.offsetParent !== null) {
    RozwiazanieWiad("Bok A zostanie obliczony pitagorasem!");
    event.target.remove();
    return;
  } else if (cInput !== null && cInput.offsetParent !== null && aInput !== null && aInput.offsetParent !== null) {
    RozwiazanieWiad("Bok B zostanie obliczony pitagorasem!");
    event.target.remove();
    return;
  }

  if (event.target.id === "przyciskA") {
    aInput.style.display = "block";
    event.target.parentNode.replaceChild(aInput, event.target);
  } else if (event.target.id === "przyciskB") {
    bInput.style.display = "block";
    event.target.parentNode.replaceChild(bInput, event.target);
  } else if (event.target.id === "przyciskC") {
    cInput.style.display = "block";
    event.target.parentNode.replaceChild(cInput, event.target);
  }
}

submit.onclick = function () {
  if (!tangens.checked && !sinus.checked && !cosinus.checked && !wszystko.checked) {
    RozwiazanieWiad("Nie zaznaczyłeś żadnej opcji!");
    return;
  }

  const a = parseInt(aInput.value);
  const b = parseInt(bInput.value);
  const c = parseInt(cInput.value);
  const cValue = Math.sqrt(a ** 2 + b ** 2);
  const bValue = Math.sqrt(c ** 2 - a ** 2);
  const aValue = Math.sqrt(c ** 2 - b ** 2);
  const sinusValue = a / c;
  const tangensValue = a / b;
  const cosinusValue = b / c;
  if (tangens.checked) {
    if (isNaN(a) || isNaN(b)) {
      RozwiazanieWiad("A albo b jest puste");
      return;
    }
    if (tangensValue < 0) {
      RozwiazanieWiad(`Tangens nie może być mniejsze niż 0, zmień wartości!`);
      return;
    }
    showInputs(false, false, false);
    ah1.textContent = a;
    ah2.textContent = b;
    ah3.innerHTML = cValue.toFixed(2);
    RozwiazanieWiad(`Tangens jest równe: ${tangensValue.toFixed(2)}`);
    tangens.checked = false
  } else if (sinus.checked) {
    if (isNaN(a) || isNaN(c)) {
      RozwiazanieWiad("A albo c jest puste");
      return;
    }
    if (sinusValue < 0) {
      RozwiazanieWiad(`Sinus nie może być mniejsze niż 0, zmień wartości!`);
      return;
    }
    if(a > c){
      RozwiazanieWiad("Przeciwprostokątna C nie może być mniejsza od przyprostokątnej A!")
      return
    }
    showInputs(false, false, false);
    ah1.textContent = a;
    ah3.textContent = c;
    ah2.innerHTML = bValue.toFixed(2);
    RozwiazanieWiad(`Sinus jest równe: ${sinusValue.toFixed(2)}`);
    sinus.checked = false
  } else if (cosinus.checked) {
    if (isNaN(b) || isNaN(c)) {
      RozwiazanieWiad("B albo c jest puste");
      return;
    }
    if (cosinusValue < 0) {
      RozwiazanieWiad(`Cosinus nie może być mniejsze niż 0, zmień wartości!`);
      return;
    }
    if(b > c){
      RozwiazanieWiad("Przeciwprostokątna C nie może być mniejsza od przyprostokątnej B!")
      return
    }
    showInputs(false, false, false);
    ah1.innerHTML = aValue.toFixed(2);
    ah2.textContent = b;
    ah3.textContent = c;
    RozwiazanieWiad(`Cosinus jest równe: ${cosinusValue.toFixed(2)}`);
    cosinus.checked = false
  } else if (wszystko.checked) {
    if (aInput !== null && aInput.offsetParent !== null && bInput !== null && bInput.offsetParent !== null) {
      hideInputs()
      ah1.textContent = a
      ah2.textContent = b
      ah3.textContent = cValue.toFixed(2);
      RozwiazanieWiad(`Sinus: ${(a / cValue).toFixed(2)} \n Cosinus: ${(b / cValue).toFixed(2)} \n Tangens: ${tangensValue.toFixed(2)}`)
      wszystko.checked = false; 
    } else if (bInput !== null && bInput.offsetParent !== null && cInput !== null && cInput.offsetParent !== null) {
      hideInputs()
      ah1.textContent = Math.sqrt(c**2 - b**2).toFixed(2);
      ah2.textContent = b
      ah3.textContent = c
      RozwiazanieWiad(`Sinus: ${(parseInt(ah1.textContent) / c).toFixed(2)} \n Cosinus: ${(b / c).toFixed(2)} \n Tangens: ${(parseInt(ah1.textContent) / b).toFixed(2)}`)
      wszystko.checked = false; 
    } else if (cInput !== null && cInput.offsetParent !== null && aInput !== null && aInput.offsetParent !== null) {
        if(c < a){
          RozwiazanieWiad("Przeciwprostokątna C nie może być mniejsza od przyprostokątnej A!")
          return
        }
      hideInputs()
      ah1.textContent = a;
      ah2.textContent = Math.sqrt(c**2 - a**2);
      ah3.innerHTML = c;
      RozwiazanieWiad(`Sinus: ${(a / c).toFixed(2)} \n Cosinus: ${(parseInt(ah2.textContent) / c).toFixed(2)} \n Tangens: ${(a / (parseInt(ah2.textContent))).toFixed(2)}`)
      wszystko.checked = false; 
    }
  }
};

function RozwiazanieWiad(message) {
  const alertContainer = document.createElement("div");
  alertContainer.className = "alert";
  alertContainer.textContent = message;

  trojkat.appendChild(alertContainer);

  setTimeout(function () {
    alertContainer.remove();
    clearValues();
  }, 1000);
}

function createButton(id, value, onClick) {
  checkIfInputsExist()
  const button = document.createElement("input");
  button.id = id;
  button.type = "submit";
  button.value = value;
  button.onclick = onClick;
  return button;
}