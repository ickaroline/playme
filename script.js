const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress");
const nowPlaying = document.getElementById("now-playing");

const tracks = document.querySelectorAll(".track");
let currentIndex = 0;

// Lista de músicas a partir dos elementos da playlist
const songs = Array.from(tracks).map(track => ({
  src: track.getAttribute("data-src"),
  title: track.querySelector("h3").innerText,
  artist: track.querySelector("p").innerText
}));

// carregar música
function loadSong(index) {
  currentIndex = index;
  audio.src = songs[index].src;
  nowPlaying.innerText = `Tocando: ${songs[index].title} - ${songs[index].artist}`;
  audio.load();
}

// tocar
function playSong() {
  audio.play();
}

// pausar
function pauseSong() {
  audio.pause();
}

// anterior
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

// próxima
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

// atualizar barra de progresso
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
});

// Clicar na barra de progresso para mudar a posição
document.querySelector(".progress-bar").addEventListener("click", function (e) {
  const bar = this;
  const clickX = e.offsetX;
  const barWidth = bar.clientWidth;
  const duration = audio.duration;

  if (!isNaN(duration)) {
    const newTime = (clickX / barWidth) * duration;
    audio.currentTime = newTime;
  }
});

// Tornar a barra de progresso clicável
document.querySelector(".progress-bar").addEventListener("click", function (e) {
  const bar = this;
  const rect = bar.getBoundingClientRect(); // Pega o tamanho e posição do elemento
  const clickX = e.clientX - rect.left; // Posição do clique relativa à barra
  const barWidth = rect.width;

  const duration = audio.duration;
  if (!isNaN(duration)) {
    const newTime = (clickX / barWidth) * duration;
    audio.currentTime = newTime;
  }
});



// quando terminar, vai para a próxima
audio.addEventListener("ended", nextSong);

// eventos dos botões
playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// clicar na música da playlist
tracks.forEach((track, index) => {
  track.addEventListener("click", () => {
    loadSong(index);
    playSong();
  });
});

// carregar primeira música
loadSong(0);
