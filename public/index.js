const form = document.querySelector('form');
const animal = document.querySelector('#animal');

form.onsubmit = async function(event) {
    event.preventDefault();
    const searchName = animal.value.trim();
    window.location.replace("http://test.ppppzzzz.buzz:3000/" + searchName);
};
