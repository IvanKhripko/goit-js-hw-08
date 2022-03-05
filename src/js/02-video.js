import '../css/common.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = "videoplayer-current-time";
const ifraime = document.querySelector('iframe');
const player = new  Vimeo.Player(ifraime);

const onPlay = function(data) {
    localStorage.setItem(STORAGE_KEY, data.seconds)
}

player.on('timeupdate', throttle(onPlay, 1000));

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

player.setCurrentTime(localStorage.getItem(STORAGE_KEY)).then(function(seconds) {
    localStorage.setItem(STORAGE_KEY, seconds)
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;

        default:
            break;
    }
    
})

