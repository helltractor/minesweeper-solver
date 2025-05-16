// ==UserScript==
// @name         minesweeper solver
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       helltractor
// @match        https://minesweeper.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let intervalId = setInterval(convert, 1000);
})();

function convert() {

    const face = document.getElementById('top_area_face');
    if (face && (face.classList.contains('hdd_top-area-face-lose') || face.classList.contains('hdd_top-area-face-win'))) {
        return; // Game over
    }

    let div = document.getElementById('AreaBlock');
    let buttons = div.getElementsByTagName('button');

    // Loop backwards through the list of buttons and remove each one
    for (let i = buttons.length - 1; i >= 0; i--) {
        buttons[i].parentNode.removeChild(buttons[i]);
    }

    // Get the elements
    let hundredsElement = document.getElementById('top_area_mines_100');
    let tensElement = document.getElementById('top_area_mines_10');
    let onesElement = document.getElementById('top_area_mines_1');

    if(hundredsElement == null || hundredsElement == undefined) {
        return;
    }
    // Extract the numbers from the class names
    let hundreds = getNumberFromClassName(hundredsElement.className);
    let tens = getNumberFromClassName(tensElement.className);
    let ones = getNumberFromClassName(onesElement.className);

    // Calculate the total mines
    let mines = hundreds * 100 + tens * 10 + ones;

    let result = "";
    let rows = document.getElementsByClassName("clear").length
    var cells = document.getElementsByClassName("cell")
    var columns = cells.length / rows

    for (var i = 0; i < cells.length; i++) {
        if(i % rows == 0 && i !== 0) {
            result += ":";
        }
        if (cells[i].classList.contains('hdd_flag')) {
            mines += 1;
            result += '!';
        } else if (cells[i].classList.contains('hdd_closed')) {
            result += 'x';
        }
        if (cells[i].classList.contains('hdd_type0')) {
            result += '.';
        }
        for (let n = 1; n <= 8; n++) {
            if (cells[i].classList.contains(`hdd_type${n}`)) {
                result += String(n);
                break;
            }
        }
    }
    var link = `https://mrgris.com/projects/minesweepr/demo/analyzer/?w=${columns}&h=${rows}&mines=${mines}&board=${result}`;

    let button = document.createElement('button');
    button.innerHTML = '分析当前局面';
    button.style.padding = '6px 12px';
    button.style.backgroundColor = '#f0f0f0';
    button.style.color = '#333';
    button.style.border = '1px solid #ccc';
    button.style.borderRadius = '5px';
    button.style.fontSize = '14px';
    button.style.cursor = 'pointer';
    button.style.marginLeft = '10px';
    button.onclick = function() {
        window.open(link, '_blank');
    };

    let div2 = document.getElementById('GameBottomPanelBlock');
    if (div2.children.length === 4){
        div2.appendChild(button);
    }

}

function getNumberFromClassName(className) {
    let match = className.match(/hdd_top-area-num(\d)/);
    return match ? parseInt(match[1]) : 0;
}
