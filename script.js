'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputValue = document.querySelector('input');
const btnSubmit = document.querySelector('.btn');
const reloadBtn = document.querySelector('.reload');
const reload = document.querySelector('.btn__1');
const bodyText = document.querySelector('.text');

let html;

///////////////////////////////////////

//BUTTON TO RENDER COUNTRIES

btnSubmit.addEventListener('click', function () {
  const renderCountry = function (data, className = '') {
    html = `<article class="country ${className}" >
   <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M People</p>
      <p class="country__row"><span>🗣️</span>${
        Object.keys(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.keys(data.currencies)[0]
      }</p>
    </div>
  </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;

    if (countriesContainer.children.length >= 3)
      countriesContainer.children[0].parentNode.removeChild(
        countriesContainer.children[0]
      );

    //CLEARING THE INPUT FIELD
    inputValue.value = '';

    //SHOW RELOAD BUTTON
    reloadBtn.classList.remove('hidden');

    //HIDE TEXT INFORMATION
    bodyText.style.display = 'none';
  };

  //APPEND RELOAD BUTTON TO PAGE

  reload.addEventListener('click', function (e) {
    e.preventDefault();

    window.location.reload();
  });

  //FUNCTION TO GET COUNTRY FROM API

  const getCountryDataAndNeighbour = async function (country) {
    try {
      //Fetch the data of country

      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );

      if (!response.ok)
        throw new Error(`Please Input a valid country name ${error.message}`);

      const data = await response.json();

      //Rendering the country
      renderCountry(...data);

      //Get the neighbour through destruct
      const neighbour = data[0].borders;

      if (!neighbour) return;

      ////

      const theSecondRequest = async function () {
        const response2 = await fetch(
          `https://restcountries.com/v3.1/alpha/${neighbour[0]}`
        );

        if (!response2.ok)
          throw new Error(`Please Input a valid country name ${error.message}`);

        const data2 = await response2.json();

        renderCountry(...data2, 'neighbour');
      };

      ///
      theSecondRequest();

      ///
    } catch (error) {
      html = `Please input correct word ${error.message}`;

      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;

      if (countriesContainer.children.length > 0) {
        html = '';
      }
    }
  };

  getCountryDataAndNeighbour(inputValue.value);
  inputValue.value = '';
});

//////

// const getCountryDataAndNeighbour = function (country) {
//   //OLD SCHOOL WAY OF AJAX CALLS
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data.languages);
//     // const {languages1} = data.languages;
//     // console.log(data);
//     // console.log(languages1);
//     // console.log(data);

//     renderCountry(data);

//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

///////

///////////

//////

// const getCountryData = function (country) {
//   //OLD SCHOOL WAY OF AJAX CALLS
//   const request = new XMLHttpRequest();

//   request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       // console.log(data.languages);
//       // const {languages1} = data.languages;
//       // console.log(data);
//       // console.log(languages1);

//       const html = `<article class="country">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M People</p>
//         <p class="country__row"><span>🗣️</span>${Object.keys(data.languages)[0]}</p>
//         <p class="country__row"><span>💰</span>${Object.keys(data.currencies)[0]}</p>
//       </div>
//     </article>`

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//       });
//   };

//   getCountryData('portugal');
//   getCountryData('usa');
//   getCountryData('nigeria');
//   getCountryData('guernsey');
//   getCountryData('benin');
