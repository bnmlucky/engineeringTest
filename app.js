const form = document.querySelector("form");
const input = document.querySelector('input');
const images = [];

const allImagesDiv = document.getElementById("allimages");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const page = document.querySelector(".page-num");
const maxItem = 10;
let index = 1;

var modal = document.getElementById('simpleModal');
var closeBtn = document.getElementById('closeBtn');

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const newImage = input.value;
    console.log(newImage);
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=2pbUP2ptCDDc5PPyxrm26V8RwwK8D93i&q=${newImage}&limit=50&offset=0&rating=g&lang=en`;
    console.log(endpoint);

    fetch(endpoint)
        .then(response => response.json())
        .then(data => showImages(data))
        .catch(error => console.log('Looks like there was a problem', error));

    function showImages(data) {

        while (allImagesDiv.firstChild) allImagesDiv.removeChild(allImagesDiv.firstChild);

        for (let i = 0; i < 50; i++) {
            const image = document.createElement('img');
            image.setAttribute('src', data.data[i].images.preview_gif.url);
            // image.setAttribute("class", "hide"); - only one class can be added at creation of these elements
            // image.setAttribute("class", "show"); - but not 2

            allImagesDiv.appendChild(image);

            // My attempt at a modal

            image.addEventListener('click', openModal);

            function openModal() {
                modal.style.display = 'block';
                image.setAttribute('src', data.data[i].images.preview_gif.url);
                document.querySelector(".modal-content").appendChild(image);
            }

        }
    }

    //My attempt at pagination that I couldn't make work 

    const allImages = allImagesDiv.children;
    const pagination = Math.ceil(allImages.length / maxItem);
    console.log(pagination);

    prev.addEventListener("click", function () {
        index--;
        check();
        showItems();
    })

    next.addEventListener("click", function () {
        index++;
        check();
        showItems();
    })

    function check() {
        if (index == pagination) {
            next.classList.add("disabled");
        } else {
            next.classList.remove("disabled");
        }

        if (index == 1) {
            prev.classList.add("disabled");
        } else {
            prev.classList.remove("disabled");
        }
    }

    function showItems() {
        for (let i = 0; i < allImages.length; i++) {
            allImages[i].classList.remove("show");
            allImages[i].classList.add("hide"); //this is where I can't add a class to a dynamically generated image
            if (i >= (index * maxItem) - maxItem && i < index * maxItem) {
                allImages[i].classList.remove("hide");
                allImages[i].classList.add("show");
            }
            page.innerHTML = index;
        }
    }

    window.onload = function () {
        showItems();
        check();
    }

    // end of pagination attempt

    // modal functions



    const reloadPage = () => {
        document.getElementById("future-query").addEventListener("click", event => {
            location.reload(true);
        })
    }

    reloadPage();
    input.focus();


});










