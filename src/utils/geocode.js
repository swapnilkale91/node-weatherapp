const request = require('request')

const geocode = (place, callback) => {

    console.log('place : ' + place)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=pk.eyJ1Ijoic3dhcG5pbGthbGU5MSIsImEiOiJjanp6a3V3dnEwbWdjM25wZHpyM2QzMjJwIn0.m3ObrJ2oREEGBvTtsWsJKw'

    request({url, json: true}, (error, {body}={}) => {

        console.log(body)

        if(error){
            callback('Unable to connect to weather services...', undefined)
        } else if(body.features.length === 0) {
            console.log('unable to find location')
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name  
            })
        } 
    })
}

module.exports = geocode