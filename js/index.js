"use strict";

import { getApis, navActiveClass, showInner } from "./Home.js";
import { dataShow, getApiById } from "./title.js";

// .........................var................
let show = document.getElementById("items");
let detailsShow = document.querySelector("#showDetails");
let secHome = document.querySelector("#home");
let secTitle = document.querySelector("#title");
let navCategrys = Array.from(document.querySelectorAll("#home nav ul li a"));
let cardList;
let btnClose = document.querySelector("#btnClose");
// ......................Methods................
// getApis for api and return data in array
// navActiveClass for active element in nav
// showInner for show data in html
// .........................Event..........................
(async function () {
  let gameList = await getApis("mmorpg");
  showInner(gameList, show);
  cardList = Array.from(document.querySelectorAll("#home .card"));
  eventForCard(cardList);
})();

for (const item of navCategrys) {
  item.addEventListener("click", async function (event) {
    let targets = event.target;
    let categryUrl = event.target.getAttribute("data-category");
    navActiveClass(navCategrys, targets);
    let gameList = await getApis(categryUrl);
    showInner(gameList, show);
    cardList = Array.from(document.querySelectorAll("#home .card"));
    eventForCard(cardList);
  });
}

btnClose.addEventListener("click", function () {
  secHome.classList.remove("d-none");
  secTitle.classList.add("d-none");
});

function eventForCard(elementlist) {
  for (const item of elementlist) {
    item.addEventListener("click", async function () {
      let showId = this.getAttribute("data-id");
      let boxGame = await getApiById(showId);
      dataShow(boxGame, detailsShow);
      secHome.classList.add("d-none");
      secTitle.classList.remove("d-none");
      $("#loading").fadeIn(0);
      $("#title").ready(function () {
        $("#loading").fadeOut(1000);
      });
    });
  }
}

$(document).ready(function () {
  $("body").css("overflow", "auto");
  $("#loading").fadeOut(1000);
});
