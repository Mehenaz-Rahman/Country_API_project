const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const drop = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");

async function getCountry() {
    try {
        const url = await fetch("https://restcountries.com/v3.1/all");
        const res = await url.json();
        console.log(res);
        res.forEach(element => {
            showCountry(element);
        });
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

getCountry();

function showCountry(data) {
    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML = ` <div class="country-img">
    <img src="${data.flags.png}" alt="">
  </div>
  <div class="country-info">
    <h5 class = "countryName">${data.name.common}</h5>
    <p><strong>Population: </strong>${data.population}</p>
    <p class="regionName"><strong>Region: </strong>${data.region}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
    <button class="read_more" onclick="redirectToCountryPage('${data.name.common}')">Read More</button>
  </div>`;
    countriesElem.appendChild(country);
    
    const readMoreButton = country.querySelector('.read_more');
    readMoreButton.addEventListener('click', () => {
        redirectToCountryPage(data.name.common);
    });
}

function redirectToCountryPage(countryName) {
    const url = `weather.html?name=${encodeURIComponent(countryName)}`;
    window.location.href = url;
}


dropDown.addEventListener("click", () => {
    drop.classList.toggle("showDropDown");
    console.log("hello");
});
const countryName = document.getElementsByClassName("countryName")
region.forEach(element => {
    element.addEventListener("click", () => {
        const selectedRegion = element.innerText.toLowerCase();
        Array.from(document.querySelectorAll(".regionName")).forEach(regionName => {
            const countryContainer = regionName.closest(".country");
            if (selectedRegion === "all" || regionName.textContent.toLowerCase().includes(selectedRegion)) {
                countryContainer.style.display = "grid";
            } else {
                countryContainer.style.display = "none";
            }
        });
    });
});
search.addEventListener("input", ()=>{
    console.log(search.value.toLowerCase());
    Array.from(countryName).forEach(elem =>{
        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())){
            elem.parentElement.parentElement.style.display ="grid"
        }else{
            elem.parentElement.parentElement.style.display ="none"
        }
    });
})


