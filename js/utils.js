'use strict'

//min- in, max-out
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomLightColor() {
    var letters = 'BCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 5)];
    }
    return color;
}
function getRandomDarkColor() {
    var letters = '01234';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 5)];
    }
    return color;
}


//function check if the color (on fill) is dark or light and send to correct function 
function chackIsDarkColor(color) {
    const letters = '0123456789ABCDEF'
    let sum = 0
    color = color.split('')
    for (let i = 1; i < color.length; i++) {
        color[i] = letters.indexOf(color[i])
        sum += color[i]
    }
    if (sum<6*8) return getRandomLightColor()
    return getRandomDarkColor()
}