"use strict";

let pantalla = document.getElementById("pantalla");
let teclas = document.querySelectorAll(".tecla");
let ultOperacion = "";
let resultado = 0;
let principio = true;
let calc = true;
let operaciones = ["+", "-", "/", "*", "%", "^"];

function procesador(entrada, keyCode = null) {
    console.log(entrada);
    let val = pantalla.textContent;

    if (entrada == "." && val.indexOf(".") > -1) return;

    if (entrada == "" || keyCode === 8) {
        if (val.length > 1) {
            val = val.substring(0, val.length - 1);
            pantalla.textContent = val;
        } else {
            pantalla.textContent = "0";
            principio = 1;
            calc = 1;
        }
    } else {
        if (entrada == "c" || keyCode === 27) {
            pantalla.textContent = "0";
            resultado = 0;
            principio = true;
            calc = true;
        } else {
            if (principio) {
                val = "";
                pantalla.textContent = val;
                principio = false;
            }

            if (operaciones.indexOf(entrada) != -1) {
                principio = true;

                if (calc) {
                    resultado = val;
                    calc = false;
                } else {
                    calculador(val);
                    pantalla.textContent = resultado;
                }

                ultOperacion = entrada.toLowerCase();
            } else {
                if (entrada == "=" || keyCode === 13) {
                    calculador(val);
                    pantalla.textContent = resultado;

                    calc = true;
                    principio = true;
                } else {
                    // Ingresa los valores de las teclas
                    // uno al lado del otro
                    pantalla.textContent = val + entrada;
                }
            }
        }
    }
}

function calculador(val) {
    val = parseFloat(val);
    resultado = parseFloat(resultado);

    switch (ultOperacion) {
        case "+":
            resultado += val;
            break;

        case "-":
            resultado -= val;
            break;

        case "*":
            resultado *= val;
            break;

        case "/":
            resultado /= val;
            break;

        case "%":
            resultado *= val;
            resultado /= 100;
            break;

        case "^":
            resultado **= val;
    }
}

window.addEventListener("keyup", handleKeyPress);

function handleKeyPress(e) {
    e.preventDefault();

    let keyCode = e.which || e.keyCode,
        key = e.key;

    if (
        key.match(/([0-9]|Enter|Escape|Backspace)/) ||
        operaciones.indexOf(key) !== -1
    )
        procesador(key, keyCode);
}

let isNumKeyPad = (numKey) => numKey >= 48 && numKey <= 57,
    convertToNumPadKey = (numKey) => numKey + 48;

teclas.forEach(function (e) {
    e.addEventListener("click", function () {
        let entrada = this.textContent.toLowerCase().trim();

        procesador(entrada);
    });
});
