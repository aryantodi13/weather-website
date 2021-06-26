const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

app.listen(3000, () => {
    console.log('Web Server started successfully.')
})

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title:"Weather App", 
        name: "Aryan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"About", 
        name:"Aryan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help",
        message:"I need some help", 
        name: "Aryan"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide address"
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({ 
                location, 
                forecast: forecastData 
            });
        });
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        message:"Help article not found.", 
        title:"Error 404", 
        name:"Aryan"
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        message:"Page not found.",
        title:"Error 404", 
        name:"Aryan"
    })
})
