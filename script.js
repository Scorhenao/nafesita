const heart = document.getElementById("heart");
const message = document.getElementById("message");
const question = document.getElementById("question");
const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const gifContainer = document.getElementById("gif-container");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const backgroundMusic = document.getElementById("background-music");
const body = document.body;

let audioContext, analyser, source, dataArray;
const messages = [
  "Eres la mejor parte de mi vida ❤️",
  "No hay un solo día en que no piense en ti 😍",
  "Mi corazón es tuyo para siempre 💖",
  "Eres mi sueño hecho realidad ✨",
  "Cada día a tu lado es un regalo 🎁",
  "Contigo, todo es mejor ❤️‍🔥",
  "Te elijo hoy, mañana y siempre 💍",
  "Me haces la persona más feliz del mundo 😊",
  "No hay nada en ti que no me encante. Eres perfecta para mí en cada forma posible 💓",
  "El destino nos unió de la manera más inesperada, y ahora no imagino mi vida sin ti 🌌",
  "Lo mejor que me pudo haber pasado fue jugar Valorant ese día 🎮. Aunque mi rodilla no estuviera bien, fue la excusa perfecta para encontrarte 💘",
  "Tu risa es mi sonido favorito, tu voz mi melodía preferida y tu canto mi refugio más cálido 🥰",
  "Desde que llegaste a mi vida, cada momento es más bonito, más especial, más nuestro ✨",
  "Eres mi casualidad más bonita y mi coincidencia más afortunada 💕",
  "Si tuviera que elegir entre respirar y amarte, usaría mi último aliento para decirte cuánto te amo 💖",
  "Cada vez que me miras con esos ojitos llenos de amor, sé que estoy exactamente donde debo estar: contigo 💞",
  "No creo en la suerte, pero si existe, definitivamente la tuve el día que te conocí 🍀",
  "¿Lista para la gran pregunta? 👀",
];

let index = 0;

document.addEventListener(
  "click",
  () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      source = audioContext.createMediaElementSource(backgroundMusic);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 256;

      dataArray = new Uint8Array(analyser.frequencyBinCount);
      updateBackgroundColor();
    }

    backgroundMusic
      .play()
      .catch((error) => console.log("Reproducción bloqueada:", error));
  },
  { once: true }
);

function updateBackgroundColor() {
  requestAnimationFrame(updateBackgroundColor);

  analyser.getByteFrequencyData(dataArray);
  let avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

  let red = Math.min(255, avg * 2); // Mantiene el rojo fuerte
  let green = 0; // Elimina el verde completamente para evitar tonos no deseados
  let blue = Math.min(255, avg * 1.5); // Ajusta la cantidad de azul para generar morado y rosa

  body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

heart.addEventListener("click", () => {
  message.textContent = "¡Te amo!";
  message.classList.add("show");
});

window.addEventListener("load", () => {
  // Aseguramos que la música esté lista y se reproduzca cuando se carga la página
  document.addEventListener(
    "click",
    () => {
      backgroundMusic.volume = 0.1; // Ajusta el volumen
      backgroundMusic
        .play()
        .catch((error) =>
          console.log("Reproducción automática bloqueada:", error)
        );
    },
    { once: true }
  );

  // Inicia la animación de cambio de color
  changeBackgroundColor();
});

function changeBackgroundColor() {
  setInterval(() => {
    const currentTime = backgroundMusic.currentTime;

    // Detecta los picos en la música para cambiar el color de fondo
    if (currentTime !== lastTime) {
      if (currentTime % 2 < 1) {
        // Cambia el fondo en intervalos
        document.body.style.backgroundColor = "#f0b1b1"; // Cambia el color
      } else {
        document.body.style.backgroundColor = "#f35997"; // Otro color
      }
    }
    lastTime = currentTime;
  }, 100); // Revisamos cada 100ms
}

heart.addEventListener("click", () => {
  if (index < messages.length) {
    message.textContent = messages[index];
    message.classList.remove("show");
    setTimeout(() => message.classList.add("show"), 100);

    heart.classList.add("clicked");
    setTimeout(() => heart.classList.remove("clicked"), 300);

    // Reproducir solo 1 segundo del sonido
    heartbeatSound.currentTime = 0; // Inicia desde el principio
    heartbeatSound.play();

    setTimeout(() => {
      heartbeatSound.pause(); // Detiene el sonido después de 1 segundo
      heartbeatSound.currentTime = 0; // Reinicia el audio para la próxima vez
    }, 500); // 1000ms = 1 segundo

    index++;
  } else {
    message.style.display = "none";
    heart.style.display = "none";
    question.style.display = "block";
  }
});

noButton.addEventListener("mouseover", () => {
  noButton.style.position = "absolute";
  noButton.style.top = Math.random() * window.innerHeight + "px";
  noButton.style.left = Math.random() * window.innerWidth + "px";
});

noButton.addEventListener("click", () => {
  alert("¡JAJA! No puedes decir que no 😜");
});

yesButton.addEventListener("click", () => {
  modal.style.opacity = "1";
  modal.style.visibility = "visible";
});

closeModal.addEventListener("click", () => {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.visibility = "hidden";
    gifContainer.style.opacity = "1"; // Muestra el GIF después de cerrar el modal
    gifContainer.style.visibility = "visible";
  }, 500);
});

heart.addEventListener("click", () => {
  if (index < messages.length) {
    message.textContent = messages[index];
    message.classList.remove("show"); // Reiniciar animación
    setTimeout(() => message.classList.add("show"), 100);

    heart.classList.add("clicked"); // Animación de latido
    setTimeout(() => heart.classList.remove("clicked"), 300);

    index++;
  } else {
    message.style.display = "none";
    heart.style.display = "none";
    question.style.display = "block";
  }
});

document.addEventListener(
  "click",
  () => {
    backgroundMusic.volume = 0.1; // Ajusta el volumen (0.0 = silencio, 1.0 = máximo)
    backgroundMusic
      .play()
      .catch((error) =>
        console.log("Reproducción automática bloqueada:", error)
      );
  },
  { once: true }
); // Solo ejecuta esto una vez

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");

  // Posición aleatoria en el ancho de la pantalla
  heart.style.left = Math.random() * window.innerWidth + "px";

  // Tamaño aleatorio para dar variedad
  let size = Math.random() * 40 + 10; // Entre 10px y 40px
  heart.style.width = size + "px";
  heart.style.height = size + "px";

  document.body.appendChild(heart);

  // Elimina el corazón después de que termine la animación
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Genera un nuevo corazón cada 300ms
setInterval(createFloatingHeart, 300);
