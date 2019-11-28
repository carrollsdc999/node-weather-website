const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//set up handbars config
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Simon Carroll'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Simon Carroll'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Simon Carroll',
        message: 'This is the help page'
    })
})

app.get('/weather', (req, res) =>{
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {

        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, {summary, temperature, temperatureHigh, temperatureLow, chanceOfRain} = {}) => {
            
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: `${summary} It is currently ${temperature} degrees outside, with highs of ${temperatureHigh} degrees and lows of ${temperatureLow} degrees. There is a ${chanceOfRain}% chance of rain.`,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error-404', {
        title: 'Help',
        name: 'Simon Carroll',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) =>{
    res.render('error-404', {
        title: 'Help',
        name: 'Simon Carroll',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})