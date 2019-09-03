const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/633faf9ab6531d311e2729528782b078/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'
    
    request({url, json: true}, (error, {body}) => {
    
        if(error){
            callback("Unable to connect to weather services...", undefined)
        }  else if(body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +  " It is currently "+ body.currently.temperature + " degrees out. There is "+ (body.currently.precipProbability *100) + "% chance of rain.")
        }
    })
}

module.exports = forecast