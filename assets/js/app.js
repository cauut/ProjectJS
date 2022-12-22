const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = "F8_PLAYER";
const player = $(".player");

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Angel Baby",
            singer: "Troye Sivan",
            path: "./assets/audios/angel-baby.mp3",
            image: "./assets/img/angel-baby.jpg",
            id: 1,
        },
        {
            name: "Head In The Clouds",
            singer: "Hayd",
            path: "./assets/audios/Head In the Clouds - Hayd.mp3",
            image: "./assets/img/Head In the Clouds.jpg",
            id: 2,
        },
        {
            name: "Under The Influence",
            singer: "Chris Brown",
            path: "./assets/audios/UnderTheInfluence-ChrisBrown.mp3",
            image: "./assets/img/UnderTheInfluence.webp",
            id: 3,
        },
        {
            name: "Paris in the Rain",
            singer: "Lauv",
            path: "./assets/audios/Paris In The Rain - Lauv.mp3",
            image: "./assets/img/Paris in the Rain.webp",
            id: 4,
        },
        {
            name: "Beautiful",
            singer: "Bazzi feat. Camila Cabello",
            path: "./assets/audios/Beautiful - Bazzi_ Camila Cabello.mp3",
            image: "./assets/img/Bazzi feat. Camila Cabello - Beautiful.jpg",
            id: 5,
        },
        {
            name: "I Fucking Love You",
            singer: "Bazzi",
            path: "./assets/audios/Ifly-Bazzi.mp3",
            image: "./assets/img/I.F.L.Y.jpg",
            id: 6,
        },
        {
            name: "Solo",
            singer: "Clean Bandit feat. Demi Lovato",
            path: "./assets/audios/SoloFeatDemiLovato-CleanBandit.mp3",
            image: "./assets/img/Clean Bandit - Solo.jpg",
            id: 7,
        },
        {
            name: "Night Changes",
            singer: "One Direction",
            path: "./assets/audios/NightChanges-OneDirection.mp3",
            image: "./assets/img/One Direction - Night Changes.jpg",
            id: 8,
        },
        {
            name: "Right Now (Na Na Na)",
            singer: "Akon",
            path: "./assets/audios/Right now Na Na Na_ - Akon.mp3",
            image: "./assets/img/Akon - Right Now (Na Na Na).jpg",
            id: 9,
        },
        {
            name: "Real Friends",
            singer: "Camila Cabello",
            path: "./assets/audios/RealFriends-CamilaCabello.mp3",
            image: "./assets/img/Camila Cabello - Real Friends.jpg",
            id: 10,
        },
        {
            name: "Dusk Till Dawn",
            singer: "ZAYN ft. Sia",
            path: "./assets/audios/DuskTillDawn-ZaynSia.mp3",
            image: "./assets/img/ZAYN - Dusk Till Dawn (Official Video) ft. Sia.jpg",
            id: 11,
        },
        {
            name: "Broken Angel",
            singer: "Arash feat. Helena",
            path: "./assets/audios/Broken Angel - Arash_ Helena.mp3",
            image: "./assets/img/Arash feat. Helena - Broken Angel.jpg",
            id: 12,
        },
        {
            name: "Without Me",
            singer: "Halsey",
            path: "./assets/audios/Without Me - Halsey.mp3",
            image: "./assets/img/Halsey - Without Me.jpg",
            id: 13,
        },
        {
            name: "Never Be the Same",
            singer: "Camila Cabello",
            path: "./assets/audios/Never Be The Same - Camila Cabello.mp3",
            image: "./assets/img/Camila Cabello - Never Be the Same.jpg",
            id: 14,
        },
        {
            name: "Attention",
            singer: "Charlie Puth",
            path: "./assets/audios/Attention - Charlie Puth.mp3",
            image: "./assets/img/Charlie Puth - Attention.jpg",
            id: 15,
        },
        {
            name: "As It Was",
            singer: "Harry Styles",
            path: "./assets/audios/As It Was - Harry Styles.mp3",
            image: "./assets/img/Harry Styles - As It Was.jpg",
            id: 16,
        },
        {
            name: "Kiss Me More",
            singer: "Doja Cat",
            path: "./assets/audios/KissMeMore-DojaCat.mp3",
            image: "./assets/img/Doja Cat - Kiss Me More.jpg",
            id: 17,
        },
        {
            name: "Señorita",
            singer: "Shawn Mendes, Camila Cabello",
            path: "./assets/audios/Senorita - Shawn Mendes_ Camila Cabello.mp3",
            image: "./assets/img/Shawn Mendes, Camila Cabello - Señorita.jpg",
            id: 18,
        },
        {
            name: "Let You Love Me",
            singer: "Rita Ora",
            path: "./assets/audios/Let You Love Me - Rita Ora.mp3",
            image: "./assets/img/Rita Ora - Let You Love Me.jpg",
            id: 19,
        },
        {
            name: "2U",
            singer: "David Guetta ft Justin Bieber",
            path: "./assets/audios/2U - David Guetta_ Justin Bieber.mp3",
            image: "./assets/img/David Guetta ft Justin Bieber - 2U.jpg",
            id: 20,
        },
        {
            name: "Somewhere Only We Know",
            singer: "Hloshit",
            path: "./assets/audios/SomewhereOnlyWeKnow-hloshit.mp3",
            image: "./assets/img/Somewhere Only We Know- Hloshit.jpg",
            id: 21,
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        var htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${
                index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                    <div
                        class="thumb"
                        style="
                            background-image: url('${song.image}');
                        "
                    ></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });
        playlist.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEven: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        document.onscroll = function () {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPersent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPersent;
            }
        };
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        };
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);

            repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.onclick();
            }
        };
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
            if (songNode || e.target.closest(".option")) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    console.log(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                if (e.target.closest(".option")) {
                }
            }
        };
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }, 400);
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.handleEven();
        this.loadCurrentSong();

        this.render();
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    },
};
app.start();
