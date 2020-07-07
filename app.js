var form = document.querySelector("form");
const input = document.querySelector('input');

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const newImage = input.value;
    console.log(newImage);
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=2pbUP2ptCDDc5PPyxrm26V8RwwK8D93i&q=${newImage}&limit=50&offset=0&rating=g&lang=en`;
    console.log(endpoint);

});



