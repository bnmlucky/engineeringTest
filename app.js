var form = document.querySelector("form");
const input = document.querySelector('input');

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const newImage = input.value;
    console.log(newImage);

});



