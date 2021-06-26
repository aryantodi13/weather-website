const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=7d352bb82d9b4c82a16130936211906&q=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long);
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Could not connect!', undefined);
        }
        else if(body.error){
            callback(body.error.message, undefined);
        }
        else{
            const str = body.location.name + ': ' + body.current.condition.text + '. Temperature is ' + body.current.temp_c + ' C , and precipitation is ' + body.current.precip_in + ' in.';
            callback(undefined, str);
        }
    });
}

module.exports = forecast;