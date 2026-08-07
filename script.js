/* ========================================
   SCRIPT PRINCIPAL - Propuesta para Yoli
   ======================================== */

let pantallaActual = 1;
const totalPantallasHistoria = 8;

// ========================================
// NAVEGACIÓN ENTRE PANTALLAS
// ========================================

function mostrar(id) {
    const pantallas = document.querySelectorAll(".pantalla");
    pantallas.forEach(p => p.classList.remove("activa"));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add("activa");
    }
}

function siguiente() {
    pantallaActual++;
    if (pantallaActual <= totalPantallasHistoria) {
        mostrar("p" + pantallaActual);

        // Cuando llegamos a la pantalla de la pregunta (p8)
        if (pantallaActual === 8) {
            iniciarPregunta();
        }
    }
}

// ========================================
// PANTALLA 1 - EFECTO MÁQUINA DE ESCRIBIR
// ========================================

function iniciarTypewriter() {
    const texto = "Hay casualidades que solo ocurren una vez en la vida...";
    const elemento = document.getElementById("typewriter");
    let i = 0;

    elemento.textContent = "";

    function escribir() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(escribir, 55);
        } else {
            // Espera un poco y pasa a la siguiente pantalla
            setTimeout(() => {
                siguiente();
            }, 2200);
        }
    }

    // Pequeña pausa inicial para que se sienta cinematográfico
    setTimeout(escribir, 800);
}

// ========================================
// PANTALLA 8 - SECUENCIA DE LA PREGUNTA
// ========================================

function iniciarPregunta() {
    const yoli = document.getElementById("yoli-text");
    const pregunta = document.getElementById("pregunta-text");
    const preguntaFinal = document.getElementById("pregunta-final");
    const btnSi = document.getElementById("btn-si");

    // Paso 1: "Yoli..."
    setTimeout(() => {
        yoli.classList.remove("oculto");
        yoli.classList.add("mostrar");
    }, 400);

    // Paso 2: "Hay una única pregunta..."
    setTimeout(() => {
        pregunta.classList.remove("oculto");
        pregunta.classList.add("mostrar");
    }, 2200);

    // Paso 3: "¿Quieres ser mi novia?"
    setTimeout(() => {
        preguntaFinal.classList.remove("oculto");
        preguntaFinal.classList.add("mostrar");
    }, 4200);

    // Paso 4: Botón Sí
    setTimeout(() => {
        btnSi.classList.remove("oculto");
        btnSi.classList.add("mostrar");
    }, 5600);
}

// ========================================
// ACEPTAR - ANIMACIÓN FINAL
// ========================================

function aceptar() {
    // Explosión de corazones + confeti
    explosionCorazones();
    lanzarConfeti();

    // Pequeño delay y cambiamos a la pantalla final
    setTimeout(() => {
        mostrar("final");
        document.getElementById("final").classList.add("zoom-final");
        iniciarContador();
        // Lluvia suave continua de corazones
        lluviaSuave();
    }, 900);
}

// ========================================
// CONTADOR EN TIEMPO REAL
// ========================================

function iniciarContador() {
    // ============================================
    // CAMBIA ESTA FECHA POR EL MOMENTO EXACTO
    // Formato: "AAAA-MM-DDTHH:MM:SS"
    // ============================================
    const startDate = new Date("2026-08-08T20:00:00");

    function actualizar() {
        const ahora = new Date();
        let diferencia = ahora - startDate;

        // Si la fecha todavía no ha llegado → mostrar todo en 0
        if (diferencia < 0) {
            diferencia = 0;
        }

        // Cálculo de años, meses, días, horas, minutos, segundos
        const segundosTotales = Math.floor(diferencia / 1000);
        const minutosTotales = Math.floor(segundosTotales / 60);
        const horasTotales = Math.floor(minutosTotales / 60);
        const diasTotales = Math.floor(horasTotales / 24);

        // Años y meses aproximados (más natural para un contador emotivo)
        const años = Math.floor(diasTotales / 365);
        const diasRestantes = diasTotales % 365;
        const meses = Math.floor(diasRestantes / 30);
        const dias = diasRestantes % 30;

        const horas = horasTotales % 24;
        const minutos = minutosTotales % 60;
        const segundos = segundosTotales % 60;

        // Actualizar el DOM
        document.getElementById("years").textContent = años;
        document.getElementById("months").textContent = meses;
        document.getElementById("days").textContent = dias;
        document.getElementById("hours").textContent = horas;
        document.getElementById("minutes").textContent = minutos;
        document.getElementById("seconds").textContent = segundos;
    }

    actualizar();
    setInterval(actualizar, 1000);
}

// ========================================
// CARTA
// ========================================

function mostrarCarta() {
    mostrar("carta");
}

function cerrarCarta() {
    mostrar("final");
}

// ========================================
// ANIMACIONES DE CORAZONES Y CONFETI
// ========================================

function crearCorazon(contenedor, tamañoMin = 18, tamañoMax = 36) {
    const corazon = document.createElement("div");
    corazon.className = "heart";
    corazon.innerHTML = "❤️";
    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = (Math.random() * (tamañoMax - tamañoMin) + tamañoMin) + "px";
    corazon.style.animationDuration = (Math.random() * 3 + 3.5) + "s";
    contenedor.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, 7000);
}

function explosionCorazones() {
    const contenedor = document.getElementById("hearts");
    // Explosión inicial intensa
    for (let i = 0; i < 45; i++) {
        setTimeout(() => {
            crearCorazon(contenedor, 22, 48);
        }, i * 40);
    }
}

function lluviaSuave() {
    const contenedor = document.getElementById("hearts");
    setInterval(() => {
        crearCorazon(contenedor, 16, 30);
    }, 280);
}

function lanzarConfeti() {
    const contenedor = document.getElementById("confetti");
    const colores = ["#ff2d55", "#ff5e7a", "#ffffff", "#ff9aab", "#ffc2cc"];

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const piece = document.createElement("div");
            piece.className = "confeti-piece";
            piece.style.left = Math.random() * 100 + "vw";
            piece.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            piece.style.width = (Math.random() * 8 + 5) + "px";
            piece.style.height = (Math.random() * 8 + 5) + "px";
            piece.style.animationDuration = (Math.random() * 2.5 + 2.5) + "s";
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;
            contenedor.appendChild(piece);

            setTimeout(() => {
                piece.remove();
            }, 5500);
        }, i * 25);
    }
}

// ========================================
// INICIO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    // Arranca automáticamente el typewriter de la primera pantalla
    iniciarTypewriter();
});