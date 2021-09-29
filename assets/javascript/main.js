//DEFINE
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//SWITCH TAB
{
    var curTabIndex = 1;

    const tabSections = $$('.filter__item');
    const years = $$('.grade__title');

    tabSections.forEach((tabSection, index) => {   
        tabSection.onclick = function(){
            //remove
            $('.filter__grade.filter__item--active').classList.remove('filter__item--active');
            $('.grade__body.grade__body--active').classList.remove('grade__body--active');
            $('.grade__title.container__title--active').classList.remove('container__title--active')
            $('.tab-semester.tab--active').classList.remove('tab--active');

            //add
            $(`.grade-${index+1}-1`)?.classList.add('grade__body--active');
            $('.tab-semester:first-child').classList.add('tab--active');
            years[index].classList.add('container__title--active');
            this.classList.add('filter__item--active');

            curTabIndex = index + 1;
        }
    })

    //SWITCH SEMESTER

    const semesters = $$('.tab-semester');

    semesters.forEach((semester, index) => {
        semester.onclick = function(){
            $('.tab-semester.tab--active').classList.remove('tab--active');
            $('.grade__body.grade__body--active')?.classList.remove('grade__body--active');

            $(`.grade-${curTabIndex}-${index + 1}`).classList.add('grade__body--active')
            this.classList.add('tab--active');
        }
    })
}

//MUSICS
{
    const name = $('.current__song-name');
    const artist = $('.current__song-artist');
    const img = $('.current__img');
    const audio = $('#audio');

    const playBtn = $('.btn-play');
    const nextBtn = $('.btn-next');
    const prevBtn = $('.btn-prev');
    const randomBtn = $('.btn-random');
    const repeatBtn = $('.btn-repeat');

    const currentSong = $('.music__current-song');
    const currentImg = $('.current__img');
    const progress = $('.progress');
    const progressTimeCount = $('.progress_time-count');

    var playList;
    var heartList;
    var heartCheckList;

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
        isRepeat: false,
        songs: [
            {
                name: '202020',
                artist: 'Lil\'Boi',
                path: './assets/musics/202020.mp3',
                image: './assets/img/music-cover/202020.jpg',
                time: '3:36'
            },
            {
                name: 'Covid Days',
                artist: 'Lil\'Boi',
                path: './assets/musics/CovidDays.mp3',
                image: './assets/img/music-cover/CovidDays.jpg',
                time: '2.26'
            },
            {
                name: 'Dành Cho Em',
                artist: 'Lil\'Boi',
                path: './assets/musics/DanhChoEm.mp3',
                image: './assets/img/music-cover/DanhChoEm.jpg',
                time: '3:22'
            },
            {
                name: 'Eyes-Nose-Lips',
                artist: 'Lil\'Boi',
                path: './assets/musics/EyesNoseLips.mp3',
                image: './assets/img/music-cover/EyesNoseLips.jpg',
                time: '3:50'
            },
            {
                name: 'Mùa Thu Trở Lại (FallBack)',
                artist: 'Lil\'Boi',
                path: './assets/musics/FallBack.mp3',
                image: './assets/img/music-cover/FallBack.jpg',
                time: '3:05'
            },
            {
                name: 'Cây Đá Trên Sao (FallBack2)',
                artist: 'Lil\'Boi',
                path: './assets/musics/FallBack2.mp3',
                image: './assets/img/music-cover/FallBack2.jpg',
                time: '3:27'
            },
            {
                name: 'Gió Nàng Bân',
                artist: 'Lil\'Boi',
                path: './assets/musics/GioNangBan.mp3',
                image: './assets/img/music-cover/GioNangBan.jpg',
                time: '3:34'
            },
            {
                name: 'Mơ',
                artist: 'Lil\'Boi',
                path: './assets/musics/Mo.mp3',
                image: './assets/img/music-cover/Mo.jpg',
                time: '3:32'
            },
            {
                name: 'Người Bạn 4 Chân',
                artist: 'Lil\'Boi',
                path: './assets/musics/NguoiBan4Chan.mp3',
                image: './assets/img/music-cover/NguoiBan4Chan.jpg',
                time: '4:05'
            },
            {
                name: 'Rap Til\' Last',
                artist: 'Lil\'Boi',
                path: './assets/musics/RapTilLast.mp3',
                image: './assets/img/music-cover/RapTilLast.jpg',
                time: '3:41'
            },
            {
                name: 'Thuốc Lá và Cà Phê',
                artist: 'Lil\'Boi',
                path: './assets/musics/ThuocLaCf.mp3',
                image: './assets/img/music-cover/ThuocLaCf.jpg',
                time: '2.54'
            },
            {
                name: 'Về Phía Sau',
                artist: 'Lil\'Boi',
                path: './assets/musics/VePhiaSau.mp3',
                image: './assets/img/music-cover/VePhiaSau.jpg',
                time: '2.59'
            },
            {
                name: 'Về Phía Trước',
                artist: 'Lil\'Boi',
                path: './assets/musics/VePhiaTruoc.mp3',
                image: './assets/img/music-cover/VePhiaTruoc.jpg',
                time: '3:09'
            },
        ],

        defineProperties: function(){
            Object.defineProperty(this, 'currentSong', {
                get: function(){
                    return this.songs[this.currentIndex];
                }
            })
        },

        handleEvents: function(){
            const _this = this;

            //Handle Image Rotate
            const currentImgAnimate = currentImg.animate([
                { transform: 'rotate(360deg)'}
            ], {
                duration: 30000, //10sec
                interations: Infinity
            })

            currentImgAnimate.pause();

            //Event Click Play
            playBtn.onclick = function(){
                if (_this.isPlaying){
                    audio.pause();
                } else{
                    audio.play();
                }
            }
            //While playing
            audio.onplay = function(){
                _this.isPlaying = true;
                currentSong.classList.add('playing');
                currentImgAnimate.play();
            }
            //While pausing
            audio.onpause = function(){
                _this.isPlaying = false;
                currentSong.classList.remove('playing');
                currentImgAnimate.pause();
            }

            //Update Progress while playing
            audio.ontimeupdate = function(){
                if(audio.duration){
                    const percent = (audio.currentTime / audio.duration * 100);
                    progress.value = percent;
                    
                    // progressTimeCount.style.left = `calc(${Math.floor(percent)}% - 2.5%)`;
                    progressTimeCount.style.left = `calc(${percent - 2.5}%`;
                    _this.getTimeCurrent(audio.duration * percent / 100);
                }
            }

            //While seeking
            progress.onchange = function(e){
                const seekTime = audio.duration * e.target.value / 100;
                audio.currentTime = seekTime; 
                _this.getTimeCurrent(seekTime);
            }

            //Next Song
            nextBtn.onclick = function(){
                _this.specificCurrentSong(false);
                
                if(_this.isRandom){
                    _this.randomSong();
                }
                else
                    _this.nextSong();
                audio.play();
                _this.scrollToActiveSong();
            }

            //Prev Song
            prevBtn.onclick = function(){
                _this.specificCurrentSong(false);

                if(_this.isRandom){
                    _this.randomSong();
                }
                else
                    _this.prevSong();
                audio.play();
                _this.scrollToActiveSong();
            }

            //Random On/Off
            randomBtn.onclick = function(){
                _this.isRandom = !_this.isRandom
                randomBtn.classList.toggle('active', _this.isRandom);
            }
            
            //Repeat On/Off
            repeatBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat
                repeatBtn.classList.toggle('active', _this.isRepeat);
            }

            //When ended
            audio.onended = function(){
                _this.specificCurrentSong(false);
                if (_this.isRepeat){
                    _this.loadCurrentSong();
                }
                else if (_this.isRandom){
                    _this.randomSong();
                }
                else{
                    _this.autoNextSong();
                }
                audio.play();
                scrollToActiveSong();
            }

            //Select Song
            playList.forEach( (songItem, index) => {
                songItem.onclick = function(){
                    _this.specificCurrentSong(false);

                    _this.currentIndex = index;
                    audio.play();
                }
            })

            //Like Song
            heartList.forEach( (heartItem, index) => {
                heartItem.onclick = function(){
                    heartCheckList[index] = !heartCheckList[index];
                    heartList[index].classList.toggle('active', heartCheckList[index]);
                }
            })
        },
        render: function(){
            html = this.songs.map(song => {
                return `
                    <div class="song__item">
                        <i class="fas fa-music song-icon"></i>
                        <div class="song__img" 
                            style="background-image: url(${song.image});">
                        </div>
                        <div class="song__info">
                            <span class="song__name">${song.name}</span>
                            <span class="song__artist">${song.artist}</span>
                        </div>
                        <div class="song__time">${song.time}</div>
                        <i class="fas fa-heart song__heart"></i>
                        <i class="fas fa-ellipsis-h song__option"></i>
                    </div>
                `
            });

            $('.music__playlist').innerHTML += html.join('');
            
            playList = $$('.song__item');
            heartList = $$('.song__heart');
            heartCheckList = new Array(heartList.length).fill(false);
        },

        loadCurrentSong: function(){
            name.textContent = this.currentSong.name;
            artist.textContent = this.currentSong.artist;
            img.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;

            this.specificCurrentSong(true);
        },

        nextSong: function(){
            if (this.currentIndex < this.songs.length-1)
                this.currentIndex++;
            else this.currentIndex = 0;
            this.loadCurrentSong();
        },

        prevSong: function(){
            if (this.currentIndex > 0)
                this.currentIndex--;
            else this.currentIndex = this.songs.length - 1;
            this.loadCurrentSong();
        },

        randomSong: function(){
            let ranIndex = 0
            do {
                ranIndex = Math.floor(Math.random() * this.songs.length-1);
            } while(ranIndex === this.currentIndex || ranIndex < 0);
            this.currentIndex = ranIndex;
            this.loadCurrentSong();
        },

        autoNextSong: function(){
            if (this.currentIndex < this.songs.length - 1)
                this.currentIndex += 1;
            else
                this.currentIndex += 0;
            this.loadCurrentSong();
        },

        getTimeCurrent: function(seconds){
            let TimeCountMinute = progressTimeCount.querySelector('.time-count__mins');
            let TimeCountSecond = progressTimeCount.querySelector('.time-count__secs');

            mins = Math.floor(seconds / 60);
            secs = Math.floor(seconds % 60);

            mins < 10 ? TimeCountMinute.textContent = `0${mins}`: TimeCountMinute.textContent = `${mins}`;
            secs < 10 ? TimeCountSecond.textContent = `0${secs}`: TimeCountSecond.textContent = `${secs}`;
        },

        specificCurrentSong: function(specific){
            if (specific){
                playList[this.currentIndex].style.backgroundColor = "#553d3d";
                playList[this.currentIndex].style.borderRadius = "3px";
            }
            else{
                playList[this.currentIndex].style.backgroundColor = null;
                playList[this.currentIndex].style.borderRadius = null;
            }
        },

        scrollToActiveSong: function(){
            setTimeout(() => {
                playList[this.currentIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            }, 300)
        },  

        start: function(){
            //render
            this.render();

            //define properties
            this.defineProperties(); 

            //Listen and Handle Events
            this.handleEvents();

            //Upload First Song into UI
            this.loadCurrentSong();

        }
    }

    app.start();    
}







