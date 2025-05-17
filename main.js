// ==UserScript==
// @name         minesweeper solver
// @namespace    http://tampermonkey.net/
// @version      1.0.1
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

    // Calculate the number of mines
    let
        hundredsElement = document.getElementById('top_area_mines_100'),
        tensElement = document.getElementById('top_area_mines_10'),
        onesElement = document.getElementById('top_area_mines_1');

    if (!hundredsElement || !tensElement || !onesElement) {
        return; // Elements not found
    }

    let 
        hundreds = getNumberFromClassName(hundredsElement.className),
        tens = getNumberFromClassName(tensElement.className),
        ones = getNumberFromClassName(onesElement.className),
        mines = hundreds * 100 + tens * 10 + ones;

    // Calculate the number of rows and columns
    let result = [],
        rows = document.getElementsByClassName("clear").length,
        cells = document.getElementsByClassName("cell"),
        columns = cells.length / rows;

    for (var i = 0; i < cells.length; i++) {
        if(i > 0 && i % rows == 0) {
            result.push(',');
        }
        if (cells[i].classList.contains('hdd_flag')) {
            mines += 1;
            result.push('!');
        } else if (cells[i].classList.contains('hdd_closed')) {
            result.push('x');
        }
        if (cells[i].classList.contains('hdd_type0')) {
            result.push('.');
        }
        for (let n = 1; n <= 8; n++) {
            if (cells[i].classList.contains(`hdd_type${n}`)) {
                result.push(n);
                break;
            }
        }
    }

    createButton(result.join(''), columns, rows, mines);
}

function getNumberFromClassName(className) {
    let match = className.match(/hdd_top-area-num(\d)/);
    return match ? parseInt(match[1]) : 0;
}

function createButton(str, columns, rows, mines) {
    const link = `https://mrgris.com/projects/minesweepr/demo/analyzer/?w=${columns}&h=${rows}&mines=${mines}&board=${str}`;
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

    let div = document.getElementById('GameBottomPanelBlock');
    if (div.children.length === 4){
        div.appendChild(button);
    }
}
