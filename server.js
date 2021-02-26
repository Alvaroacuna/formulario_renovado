const express = require("express");
const session = require("express-session");
const app = express();


app.use(session({secret: 'formulario'}));
app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );


app.set('views', __dirname + '/vistas'); 
app.set('view engine', 'ejs');

app.get("/", function (req,res){
    res.render("formulario");
})

//app.get("/result", function(req, res){
   //  res.render("results", {results: req.session.results})
// }) //

app.post("/", function (req, res){
    console.log(req.body);
    res.render("formulario");
})
const server = app.listen(8000, function(){
    console.log("Escuchando el puerto: 8000");
});

const io = require('socket.io')(server);

// cuando me conecte con algún cliente
io.on('connection', function(socket) {
  // le mando información con el código "saludo_s"
  socket.on('formulario_publicacion', function (data) {
    const numero = Math.floor(Math.random()*1000);
    const objeto = JSON.stringify(data);
    socket.emit('mensaje_actualizado', {
        informacion: `La información enviada al formulario es: ${objeto}`
    })
    socket.emit('numero_aleatorio', {
        mensajenumero: `Tu número aleatorio es: ${numero}`
    })
  })
});


