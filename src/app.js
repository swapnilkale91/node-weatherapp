const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, './templates/views')
const partialsPath =  path.join(__dirname, './templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Swapnil Kale',
        title: 'Weather app'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        name: 'Swapnil Kale',
        title: 'About me'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'Help me adding content to my website'
    })
})

app.get('/weather',(req, res) => {

    console.log('address : ' + req.query.address)
    if(!req.query.address)
        return res.send({errorMsg: 'Please provide an address'})

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {

        if(error) {
            return res.send({errorMsg: 'Please provide an address'})
        } else {
            forecast(latitude, longitude , (error, forecastData) => {
                if(error) 
                    return res.send(error)
                
                    return res.send({location, forecastData})
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: "Swapnil Kale",
        errorMsg: "Help page not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        name: "Swapnil Kale",
        errorMsg: "Page not found"
    })
})

app.listen(port, ()=> {
    console.log('Server started at port ' + port + '.')
})