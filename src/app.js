const express = require('express')
const path = require('path')
const hbs = require('hbs')
const search = require('./utils/search')




const app = express()
const port = 3000 || process.env.PORT

// app configrations
const viewsPath = path.join(__dirname, '../public/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))



// ...................

app.get('/api', (req, res) => {
   if (!req.query.key) {
       return res.send({"error": "please provide query"})
   }

   search(req.query.key, req.query.page, (error, photos) => {
       
       if (error) {

        return res.send({error})
            
       }

       res.send({photos})
   })

})







//  Home Page 

app.get('/', (req, res) => {
    res.render('index')
})

// providors

app.get('/providors', (req, res) => {
    res.render('providors')
})


app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})






app.listen(port,() => {
    console.log(`listn on ${port}`);
    
})