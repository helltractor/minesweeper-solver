// ==UserScript==
// @name         minesweeper solver
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  try to take over the world!
// @author       helltractor
// @match        https://minesweeper.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(convert, 1000);
})();

function convert() {
    const face = document.getElementById('top_area_face');
    if (face && (face.classList.contains('hdd_top-area-face-lose') || face.classList.contains('hdd_top-area-face-win'))) {
        return; // Game over
    }

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

    const link = `https://mrgris.com/projects/minesweepr/demo/analyzer/?w=${columns}&h=${rows}&mines=${mines}&board=${result.join('')}`;
    let button = document.getElementById('analyse_btn');

    if (!button) {
        createButton();
    }
    button.href = link;
}

function getNumberFromClassName(className) {
    let match = className.match(/hdd_top-area-num(\d)/);
    return match ? parseInt(match[1]) : 0;
}

function createButton() {
    let button = document.createElement('a');
    button.id = 'analyse_btn';
    button.target = '_blank';
    button.classList.add('btn', 'btn-sm', 'btn-default', 'btn-retro', 'btn-fixed', 'btn-retro-big');
    button.title = '';
    button.setAttribute('data-original-title', '分析');

    let i = document.createElement('i');
    // https://fontawesome.com/v4/cheatsheet/
    i.className = 'fa fa-search';
    button.appendChild(i);

    let div = document.getElementById('GameBottomPanelBlock');
    if (div.children.length === 4){
        div.appendChild(button);
    }
}
