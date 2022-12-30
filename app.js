const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const router = express.Router();

require('dotenv').config()

const PORT = process.env.PORT


app.use(express.json())
app.use(cors())

app.use(express.urlencoded({extended: false}))
// app.use(express.urlencoded({limit: '25mb'}));

// parse application/json
app.use(bodyParser.json())
app.use(router)


const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.KEY);

router.get('/', (req, res) =>{
    res.send(`
        NewsRoom api
`)
})

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
router.get('/api/', (req, res)=>{
    newsapi.v2.topHeadlines({
      category: 'general',
      language: 'en',
      country: 'us',
      pageSize: 12
    }).then(response => {
      res.status(200).json(response.articles)
    });
})

router.get('/api/:category', (req, res) => {
    const { category } = req.params
        newsapi.v2.topHeadlines({
        category: category,
        language: 'en',
        country: 'us',
    }).then(response => {
        res.status(200).json(response.articles)
    });
})


app.listen(PORT, ()=>{
    console.log(`App is listening to ${PORT}`)
} )