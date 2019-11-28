const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY2Fycm9sbHNkYzk5OSIsImEiOiJjazNmenZuY2cwOWo2M2xwN3Y4cTE1N2RxIn0.DKUF2qV0EQ6zRmASs7S82Q&limit=1`;

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback(`Unable to connect to geocoding service`)
        } else if (body.features.length === 0) {
            callback(`Unable to find location. Try another search`)
        } else{
            callback(undefined, { 
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode