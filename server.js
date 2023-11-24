// server.js para crear un servidor Node.js
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51O4zqnCTeNftF9bgrSV6PQmcUwJPd9zAm26HOWFPh4ocGvvtwCt2pC68WsH21VmvXQcFmXqtkCd7HDzi620bhQHS00wzSUfhw4');
const express = require('express');
const path = require('path');

const app = express();

//app.set('views', path.join(__dirname, 'dist'));
//app.set('view engine', 'ejs');

// Definir la ruta estática para los archivos en la carpeta 'public'
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/checkout', function(req, res) {
    // Asume que el frontend envía el 'token' y el 'amount'
    const token = req.body.token;
    const amount = req.body.amount;
  
    // Crea un cargo usando el SDK de Stripe
    stripe.charges.create({
      amount: amount, // cantidad en centavos
      currency: 'usd',
      description: 'Mi producto',
      source: token,
    }, function(error, charge) {
      if (error) {
        res.status(500).send({ success: false, message: error.message });
      } else {
        // Envía una respuesta al cliente
        res.send({ success: true, charge: charge });
      }
    });
  });



// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    //res.render(path.join(__dirname, 'dist', 'index1.ejs'));
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
