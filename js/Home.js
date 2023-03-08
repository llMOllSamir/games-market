class Card {
  constructor(gId, src, gName, title, category, gPlatform) {
    this.id = gId;
    this.imgSrc = src;
    this.gameName = gName;
    this.shortTitle = title;
    this.gameCategory = category;
    this.platform = gPlatform;
  }
}

export function navActiveClass(array, elem) {
  for (const item of array) {
    item.classList.remove("active") ? item.classList.remove("active") : "";
  }
  elem.classList.add("active");
}


export async function getApis(categry) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "309a8b791dmsh3122e38a57b9757p13f319jsn8606c0aa5328",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  let response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categry}`,
    options
  );
  let res = await response.json();
  let listofData = uiData(res);
  return listofData;
}

function uiData(gameResponseApi) {
  let apiRespons = gameResponseApi;
  let gameList = [];

  for (const item of apiRespons) {
    let gameId = item.id;
    let imgUrl = item.thumbnail;
    let titleGame = item.title;
    let short_desc = item.short_description;
    let categ = item.genre;
    let pForm = item.platform;
    let dataShow = new Card(
      gameId,
      imgUrl,
      titleGame,
      short_desc,
      categ,
      pForm
    );
    gameList.push(dataShow);
  }
  return gameList;
}

export function showInner(array, element) {
  let cardItem = "";
  for (const elem of array) {
    cardItem += `<div class=" col-12 col-md-6 col-lg-4 col-xl-3   ">
  
    <div data-id="${elem.id}" class="card bg-transparent object-fit-contain h-100">
      <img
        class="card-img-top p-3 w-100"
        src="${elem.imgSrc}"
        alt="Games"
      />
      <div class="card-body py-1">
        <h5 class="card-title d-flex justify-content-between">
          "${elem.gameName}"
          <span class="badge bg-success p-2">Free</span>
        </h5>
        <p class="card-text opacity-50">
          "${elem.shortTitle}"
        </p>
      </div>
      <div
        class="card-footer bg-transparent d-flex justify-content-between"
      >
        <span class="badge bg-secondary">"${elem.gameCategory}"</span
        ><span class="badge bg-secondary">"${elem.platform}"</span>
      </div>
    
  </div>
</div>`;
  }
  element.innerHTML = cardItem;
}
