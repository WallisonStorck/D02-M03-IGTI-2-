async function getDataAPI() {
  // const data = await (await fetch("https://restcountries.com/v3.1/all")).json();
  const data = await (await fetch("https://restcountries.com/v2/all")).json();
  const accurateData = data.map((country) => {
    return {
      id: country.numericCode,
      name: country.name,
      flag: country.flags.png,
      population: country.population,
    };
  });

  console.log(accurateData);
}

window.onload = () => {
  console.log("Script is running!");
  getDataAPI();
};
