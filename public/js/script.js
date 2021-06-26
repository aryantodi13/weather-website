console.log('Client side JS file loaded.');

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';
    var url = 'http://localhost:3000/weather?address=' + address.value;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error;
            }
            else{
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
    })
})