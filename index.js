// Select the element with the id (submit-button)
const submitButton = document.getElementById("submit-button");
console.log(submitButton);

const sectionResults = document.getElementById("section-results");
console.log(sectionResults);

const header = document.querySelector(".header");
if (!header) {
    submitButton.removeEventListener("click", headerShrink);
}

const displayResults = function (res) {
    clearContents(sectionResults);

    let dogFrame = document.createElement("div");
    dogFrame.classList.add("image__container");

    if (res.status === "error" || !res.results.length) {
        sectionResults.appendChild(dogFrame).innerHTML =
            '<h1>Oopsies, no movie postrs for you!</h1>'
    } else {
        console.log(res.results)

        res.results.forEach(movie => {
            if (movie.poster_path) {
                let dogPic = document.createElement("img");

                sectionResults.appendChild(dogFrame).appendChild(dogPic);
                dogPic.src = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path;
                dogPic.alt = 'Movie Poster';
            }
        })
    }

    headerShrink();

};

// Creates a function and assigns it to the variable headerShrink
const headerShrink = function () {
    const headerTitle = document.querySelector(".header__title");
    const headerDes = document.querySelector(".header__description");
    const form = document.getElementById("form");

    console.log(header.classList);

    //Check if the header contains a class with "header" in it
    if (header.classList.contains("header")) {
        header.classList.remove("header");
        header.classList.add("header--small");
        headerTitle.classList.remove("header__title");
        headerTitle.classList.add("header__title--small");
        headerDes.classList.remove("header__description");
        headerDes.classList.add("header__description--small");
        document.getElementById("mission").remove();
        document.getElementById("slogan").remove();
        form.style.display = "flex";
    }
};

const clearContents = function (container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

const onFetchDog = e => {
    e.preventDefault();
    let movie_input = document.getElementById("movie").value.replace(" ", "%");

    console.log(movie_input);

    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie_input}&api_key=9cb4ff0f9a0fbe1e87645f79141d70af`)
        .then(res => res.json())
        .then(res => displayResults(res));
}

submitButton.addEventListener("click", onFetchDog);

