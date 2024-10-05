import './style.css';
const screen = document.getElementById("screen");
const equation = document.getElementById("equation");
const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let firstValue = "";
let operator = "";
let secondValue = "";
let statusOn = false;

turnOff()
buttons.forEach(button => button.addEventListener('click', () => {
  const clickedButton = button.textContent;

  if (clickedButton === 'AC') {
    turnOn(); 
    firstValue = "";
    secondValue = "";
    equation.textContent = "";
    result.textContent = 0;
  } else if (clickedButton === 'Bye') {
    if (statusOn === true) {
      equation.textContent = "";
      result.textContent = 'Goodbye!';
      setTimeout(() => {
        turnOff(); 
      }, 1000);
    }
    statusOn = false;
  }

  if (statusOn === true) {
    if (clickedButton === "←") {
      if (secondValue) {
        secondValue = secondValue.slice(0, -1);
      } else if (operator) {
        operator = "";
      } else {
        firstValue = firstValue.slice(0, -1);
      }
      displayEquation();

    } else if (clickedButton === "Hello") {
      const hello = ["Hola", "Hello", "Bonjour", "Ciao", "Salam", "Shalom", "Ni Hao", "안녕하세요", "Namaste"];
      const randomizeHello = Math.floor(Math.random() * hello.length);
      result.textContent = hello[randomizeHello];

    } else if (clickedButton === "x" || clickedButton === "-" || clickedButton === "+" || clickedButton === "÷") {
      if (clickedButton === "-" && (firstValue === "" || (operator && secondValue === ""))) {
        if (operator) {
          if (secondValue === "") {
            secondValue = "-";
          } else {
            secondValue = "-" + secondValue;
          }
        } else {
          if (firstValue === "") {
            firstValue = "-";
          } else {
            firstValue = "-" + firstValue;
          }
        }
      } else if (operator && secondValue === "") {
        operator = clickedButton; 
      } else if (!operator) {
        operator = clickedButton; 
      }
      displayEquation();
    } else if (clickedButton === "=") {
      if (firstValue && operator && secondValue) {
        let expression = `${firstValue} ${operator.replace(/x/g, '*').replace(/÷/g, '/')} ${secondValue}`;
        
        try {
          const evaluatedResult = eval(expression);
          result.textContent = evaluatedResult.toString().substring(0, 10);
          firstValue = evaluatedResult.toString().substring(0, 10);
          operator = '';
          secondValue = '';
        } catch (error) {
          result.textContent = "Error: Invalid Expression";
        }
      }
    } else {
      if (clickedButton !== "=" && clickedButton !== "AC" && clickedButton !== "Bye") {
        if (operator) {
          secondValue += clickedButton; 
        } else {
          firstValue += clickedButton; 
        }
        displayEquation();
      }
    }
  }
}));

function turnOn() {
  statusOn = true;
  screen.style.backgroundColor = "darkslategray";
  result.textContent = 0;
  displayEquation();
}

function turnOff() {
  statusOn = false;
  screen.style.backgroundColor = "black";
  firstValue = "";
  operator = "";
  secondValue = "";
  result.textContent = "";
  equation.textContent = "";
}

function displayEquation() {
  equation.textContent = `${firstValue} ${operator} ${secondValue}`;
}