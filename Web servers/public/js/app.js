console.log('Client side javascript is loaded!');

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const content = document.querySelector('p');

weatherForm.addEventListener('submit', (event) => {
    content.innerHTML = "Loading....";
    event.preventDefault();
    fetch(`http://localhost:3000/weather?address=${address.value}`).then((response) => {
    response.json().then(data => {
        if(data.data !== undefined){
            content.innerHTML = data.data;
        } else {
            content.innerHTML = "Something went wrong"
        }
    })
})
})