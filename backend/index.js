import express from 'express'
const app = express()
import mongoose from 'mongoose'
import shows from './models/shows.js'
import bodyParser from 'body-parser'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({path:'.env'});

// console.log(process.env.DB_URL)


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'shows', }, function (err) {
    if (err) { throw err } else {
        console.log('Successfully connected');
    }
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


(async function request() {
    for (let i = 0; i < 1000; i++) {
        const result = await axios.get(
            `http://api.tvmaze.com/shows/${i + 1}?embed[]=episodes&embed[]=cast`,{
                validateStatus: function (status) {
                  return status < 500; // Resolve only if the status code is less than 500
                }
              }
        )
        var tmp2 = {
                        id: result.data.id,
                        name: result.data.name,
                        image: result.data.image ? result.data.image.original : null,
                        details: {
                            genres: result.data.genres,
                            year: result.data.premiered,
                            description: result.data.sumary,
                            cast: result.data._embedded ? result.data._embedded.cast : null,
                            episodes: result.data._embedded ? result.data._embedded.episodes : null
                        }
                    }
        
                    const pelis = new shows(tmp2);
                    pelis.save()
                    .then(() => { console.log(i) })
                    // .catch((err)=>console.log(err))

    }

})()


app.get('/shows/:id', (req, res) => {
    shows.find({ 'details.genres': { $in: [req.params.id] } }, function (err, shows) {
        res.json(shows)
    })
})



//shows/:id

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '3000'
app.listen(port,host, () => {
    console.log('listening on port 3000')
})

