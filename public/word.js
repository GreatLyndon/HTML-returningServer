const button = document.querySelector('button');
const definition = document.querySelector('#container div p');
const addAnimal = document.querySelector('#addData');
const form = document.querySelector('form');
const pic = document.querySelector('input[type="file"]');
const animal = document.querySelector('input[type="text"]');
const heading = document.querySelector('div + h1');
const newDefi = document.querySelector('#newDef');

button.onclick = function(event) {
    event.preventDefault();
    window.location.replace("http://test.ppppzzzz.buzz:3000/");
}

if(definition.textContent === 'NOT FOUND') {
    addAnimal.classList.remove('hidden');
}

form.onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('animal', animal.value.trim());
    formData.append('definition', newDefi.value.trim());
    formData.append('picture', pic.files[0]);
    options = {
        method: 'POST',
        body: formData
    }
    await fetch('http://test.ppppzzzz.buzz:3000/add', options).then(response => response.text()).then(text => {console.log(text)});
    addAnimal.classList.add('hidden');
    heading.classList.remove('hidden');
};
