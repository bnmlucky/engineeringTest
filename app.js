const form = document.querySelector("form");
const input = document.querySelector('input');

const paginationDiv = document.getElementById("pagination");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const page = document.querySelector(".page-num");

let images = [];

const totalElements = 50;
const elementsPerPage = 10;
const maxPage = totalElements / elementsPerPage - 1;

let currentPage = 0;

const allImagesDiv = document.getElementById("allimages");
const modal = document.getElementById('simpleModal');
const closeBtn = document.querySelector('.closeBtn');
const modalContent = document.querySelector(".modal-content")
const modalImg = document.getElementById("modalImg")

const pageNumberElement = document.getElementById('pageNumber')

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = input.value;
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=2pbUP2ptCDDc5PPyxrm26V8RwwK8D93i&q=${query}&limit=${totalElements}&offset=0&rating=g&lang=en`;

    fetch(endpoint)
        .then(response => response.json())
        .then(json => processResponse(json))
        .catch(error => console.log('Looks like there was a problem', error));

    function processResponse(json) {
        images = json.data;
        currentPage = 0;
        showPage();
    }

    function showPage() {
        removeImages();
        addImages();
        updatePaginationElements();
    }

    function removeImages() {
        while (allImagesDiv.firstChild)
            allImagesDiv.removeChild(allImagesDiv.firstChild);
    }

    function addImages() {
        const elementsOnPage = images.slice(currentPage * elementsPerPage, (currentPage + 1) * elementsPerPage)

        elementsOnPage.forEach(element => {
            const img = document.createElement('img');
            img.setAttribute('src', element.images.fixed_height.url);

            allImagesDiv.appendChild(img);

            setupModal(img, element.images.original.url);
        });
    }

    function setupPagination() {
        prev.addEventListener("click", () => {
            currentPage = Math.max(currentPage - 1, 0);
            showPage();
        })

        next.addEventListener("click", () => {
            currentPage = Math.min(currentPage + 1, maxPage);
            showPage();
        })
    }

    function updatePaginationElements() {
        paginationDiv.style.visibility = 'visible';
        pageNumberElement.textContent = `Page ${currentPage + 1}`

        if (currentPage == maxPage) {
            next.classList.add("disabled");
        } else {
            next.classList.remove("disabled");
        }

        if (currentPage == 0) {
            prev.classList.add("disabled");
        } else {
            prev.classList.remove("disabled");
        }
    }

    function setupModal(img, url) {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.setAttribute('src', url);
        });

        // listen for close click
        closeBtn.addEventListener("click", () => {
            modal.style.display = 'none';
        });

        // listen for outside click
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    setupPagination();
    input.focus();
});
