const countriesAPI = "https://restcountries.com/v2/all";
const totalLanguagesElement = document.getElementById("total-languages");
const countriesTable = document.getElementById("countries-table");

fetch(countriesAPI)
  .then((response) => response.json())
  .then((data) => {
    const languages = new Set();

    data.forEach((country) => {
      if (country.languages) {
        country.languages.forEach((language) => {
          languages.add(language.name);
        });
      }
    });

    const totalLanguages = languages.size;
    totalLanguagesElement.textContent = `Total Languages: ${totalLanguages}`;
  })
  .catch((error) => {
    console.error("Error fetching countries data:", error);
    totalLanguagesElement.textContent = "Error retrieving data";
  });

fetch(countriesAPI)
  .then((response) => response.json())
  .then((data) => {
    const sortedCountries = data.sort((a, b) => b.area - a.area);
    const largestCountries = sortedCountries.slice(0, 10);

    largestCountries.forEach((country) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = country.name;
      row.appendChild(nameCell);

      const areaCell = document.createElement("td");
      areaCell.textContent = country.area.toLocaleString();
      row.appendChild(areaCell);

      countriesTable.querySelector("tbody").appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Error fetching countries data:", error);
  });
