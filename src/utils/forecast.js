const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5cceb8a690e1a515e4147c384bccb2f9/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to weather service`)
        } else if (body.error) {
            callback(`Unable to find location`)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability
            })
        }
    })
} 

module.exports = forecast;
