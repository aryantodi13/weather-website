const weatherForm = document.querySelector('form');
const myLocation = document.querySelector('#myLocation')
const address = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';
    var url = '/weather?address=' + address.value;
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
myLocation.addEventListener('click', (e) => {
    if(!navigator.geolocation) return alert('Your browser does not support geolocation') 
    message1.textContent = 'Loading...';
    message1.textContent = '';
    var coords;
    navigator.geolocation.getCurrentPosition((position) => {
        coords = (position.coords.longitude + ',' + position.coords.latitude)
        var url = '/weather?address=' + coords;
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

})
