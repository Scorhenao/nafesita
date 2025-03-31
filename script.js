const heart = document.getElementById("heart");
const message = document.getElementById("message");
const question = document.getElementById("question");
const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const gifContainer = document.getElementById("gif-container");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const heartbeatSound = document.getElementById("heartbeat-sound");
const backgroundMusic = document.getElementById("background-music");

const messages = [
  "Eres la mejor parte de mi vida ❤️",
  "No hay un solo día que no piense en ti 😍",
  "Mi corazón es tuyo para siempre 💖",
  "Eres mi sueño hecho realidad ✨",
  "Cada día a tu lado es un regalo 🎁",
  "Contigo, todo es mejor ❤️‍🔥",
  "Te elijo hoy, mañana y siempre 💍",
  "Me haces la persona más feliz del mundo 😊",
  "¿Lista para la gran pregunta? 👀",
];

let index = -1;

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
