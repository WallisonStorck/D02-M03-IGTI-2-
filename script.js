let COUNTRIES_GENERAL;
let COUNTRIES_FAVORITES;

function removeFromFavorite(id) {
  console.log(id);
}

function moveToFavorite(id) {
  const divFavorites = document.querySelector(".favoriteCountries");
  const h2Favorites = divFavorites.querySelector("h2");
  const spanFavorites = divFavorites.querySelector("span");
  const ulFavorites = divFavorites.querySelector(".favoriteCountry");

  const i = COUNTRIES_GENERAL.findIndex((country) => {
    return parseInt(country.id) == id;
  });

  ulFavorites.innerHTML += `<li>
    <a class="btn-floating btn-small waves-effect waves-light red" onclick="removeFromFavorite(${COUNTRIES_GENERAL[i].id})"><i class="material-icons">-</i></a>
      <img src=${COUNTRIES_GENERAL[i].flag} alt="Bandeira">
      ${COUNTRIES_GENERAL[i].name}
      <br>${COUNTRIES_GENERAL[i].population}
    </li>`;
}

function showCountries(data) {
  const divGeneral = document.querySelector(".allCountries");
  const h2General = divGeneral.querySelector("h2");
  const spanGeneral = divGeneral.querySelector("span");
  const ulGeneral = divGeneral.querySelector(".generalCountry");
  // const ulFavorite = document.querySelector(".favoriteCountry");

  //Lista países
  data.forEach((country) => {
    ulGeneral.innerHTML += `<li>
    <a class="btn-floating btn-small waves-effect waves-light" onclick="moveToFavorite(${country.id})"><i class="material-icons">+</i></a>
      <img src=${country.flag} alt="Bandeira">
      ${country.name}
      <br>${country.population}
    </li>`;
  });

  // data.forEach((country) => {
  //   console.log(country.id);
  // });

  //Conta a população
  const countPopulation = data.reduce((accumulator, current) => {
    return (accumulator += current.population);
  }, 0);

  h2General.textContent = `Países (${data.length})`;
  spanGeneral.textContent = `População total: ${countPopulation}`;
}

async function getDataAPI() {
  // const data = await (await fetch("https://restcountries.com/v3.1/all")).json();
  const data = await (await fetch("https://restcountries.com/v2/all")).json();

  COUNTRIES_GENERAL = data.map((country) => {
    return {
      id: country.numericCode,
      name: country.name,
      flag: country.flags.png,
      population: country.population,
    };
  });

  showCountries(COUNTRIES_GENERAL);
}

window.onload = () => {
  console.log("Script is running!");
  getDataAPI();
};
