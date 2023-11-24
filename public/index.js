
import { loadStripe } from '@stripe/stripe-js';

// Reemplaza 'tu_clave_publica_de_stripe' con tu clave pública de Stripe
//const stripePromise = loadStripe('tu_clave_publica_de_stripe');
const stripePromise = loadStripe('pk_test_51O4zqnCTeNftF9bgee8zp4iLTk14k47Gn1bk8v06JrpOBKe7aiWt2hHCqILmL3cPQQyz8vZXk6OOVnruXtvEmqwS00CT7SPV1i');

stripePromise.then(stripe => {
  // Crea una instancia de Elements y asocia el elemento 'card-element' con tu formulario
  const elements = stripe.elements();
  const card = elements.create('card');
  card.mount('#card-element');
}).catch(error => {
  console.error('Error al cargar el cliente de Stripe:', error);
  // Aquí puedes agregar manejo adicional de errores, como mostrar un mensaje al usuario
});



