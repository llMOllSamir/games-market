class DataBack {
  constructor(
    imgUrl,
    title,
    Category,
    Platform,
    Status,
    description,
    game_url
  ) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.Category = Category;
    this.Platform = Platform;
    this.Status = Status;
    this.description = description;
    this.game_url = game_url;
  }
}

export async function getApiById(id) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "309a8b791dmsh3122e38a57b9757p13f319jsn8606c0aa5328",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  let response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  let res = await response.json();
  let gamebox = details(res);
  return gamebox;
}

function details(obj) {
  let gameBox = new DataBack(
    obj.thumbnail,
    obj.title,
    obj.genre,
    obj.platform,
    obj.status,
    obj.description,
    obj.game_url
  );
  return gameBox;
}

export function dataShow(obj, element) {
  let showBox = `<div class="col-4">
    <img src="${obj.imgUrl}" class="w-100" alt="" />
  </div>
  <div class="col-md-8">
    <h3>Title: ${obj.title}</h3>
    <p>Category: <span class="badge text-bg-info"> ${obj.Category}</span></p>
    <p>Platform: <span class="badge text-bg-info"> ${obj.Platform}</span></p>
    <p>Status: <span class="badge text-bg-info"> ${obj.Status}</span></p>
    <p class="small">
      ${obj.description}
    </p>
    <a
      class="btn btn-outline-warning text-light"
      target="_blank"
      href="${obj.game_url}"
      >Show Game</a
    >
  </div>`;
  element.innerHTML = showBox;
}
