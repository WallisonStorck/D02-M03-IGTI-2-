let countries = {
  GENERAL: null,
  FAVORITES: null,
};

let countriesFavorites = [];
let countriesGeneral = [];

let classNames = {
  DIV_GENERAL: null,
  H2_GENERAL: null,
  SPAN_GENERAL: null,
  UL_GENERAL: null,

  DIV_FAVORITES: null,
  H2_FAVORITES: null,
  SPAN_FAVORITES: null,
  UL_FAVORITES: null,
};

function removeFromFavorites(id) {
  const i = countriesGeneral.findIndex((country) => {
    return parseInt(country.id) == id;
  });
  countriesFavorites.splice(i, 1);
}

function removeFromGeneral(id) {
  countriesGeneral.splice(id, 1);
  showCountries(countriesGeneral);
}

function moveToFavorite(id) {
  const i = countriesGeneral.findIndex((country) => {
    return parseInt(country.id) === id;
  });

  countriesFavorites.push(countriesGeneral[i]);

  classNames.UL_FAVORITES.innerHTML = ""; //Limpa a ul
  countriesFavorites.forEach((country) => {
    classNames.UL_FAVORITES.innerHTML += `<li>
    <a class="btn-floating btn-small waves-effect waves-light red" onclick="removeFromFavorites(${country.id})"><i class="material-icons">-</i></a>
    <img src=${country.flag} alt="Bandeira">
    ${country.name}
    <br>${country.population}
    </li>`;
  });

  removeFromGeneral(i);

  //Conta a população
  console.log(countriesFavorites);
  const countPopulation = countriesFavorites.reduce((accumulator, current) => {
    return (accumulator += current.population);
  }, 0);

  classNames.H2_FAVORITES.textContent = `Países (${countriesFavorites.length})`;
  classNames.SPAN_FAVORITES.textContent = `População total: ${countPopulation}`;
}

function showCountries() {
  //Lista países
  classNames.UL_GENERAL.innerHTML = ""; //Limpa a ul
  countriesGeneral.forEach((country) => {
    // console.log(`${country.name} => ${country.id}`);
    classNames.UL_GENERAL.innerHTML += `<li>
    <a class="btn-floating btn-small waves-effect waves-light" onclick="moveToFavorite(${parseInt(
      country.id
    )})"><i class="material-icons">+</i></a>
      <img src=${country.flag} alt="Bandeira">
      ${country.name}
      <br>${country.population}
    </li>`;
  });

  //Conta a população
  const countPopulation = countriesGeneral.reduce((accumulator, current) => {
    return (accumulator += current.population);
  }, 0);

  classNames.H2_GENERAL.textContent = `Países (${countriesGeneral.length})`;
  classNames.SPAN_GENERAL.textContent = `População total: ${countPopulation}`;
}

async function getDataAPI() {
  const data = await (await fetch("https://restcountries.com/v2/all")).json();

  countriesGeneral = data.map((country) => {
    return {
      id: country.numericCode,
      name: country.name,
      flag: country.flags.png,
      population: country.population,
    };
  });

  showCountries();
}

function init() {
  classNames.DIV_GENERAL = document.querySelector(".allCountries");
  classNames.H2_GENERAL = document.querySelector(".cntCountriesGeneral");
  classNames.SPAN_GENERAL = document.querySelector(".cntPopulationGeneral");
  classNames.UL_GENERAL = document.querySelector(".generalCountry");

  classNames.DIV_FAVORITES = document.querySelector(".favoriteCountries");
  classNames.H2_FAVORITES = document.querySelector(".cntCountriesFavorites");
  classNames.SPAN_FAVORITES = document.querySelector(".cntPopulationFavorites");
  classNames.UL_FAVORITES = document.querySelector(".favoriteCountry");

  getDataAPI();
}

window.onload = () => {
  console.log("Script is running!");
  init();
};
