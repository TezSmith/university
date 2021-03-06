
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// function getCustomer(id, callback) {
//   setTimeout(() => {
//     callback({ 
//       id: 1, 
//       name: 'Mosh Hamedani', 
//       isGold: true, 
//       email: 'email' 
//     });
//   }, 4000);  
// }

// function getTopMovies(callback) {
//   setTimeout(() => {
//     callback(['movie1', 'movie2']);
//   }, 4000);
// }

// function sendEmail(email, movies, callback) {
//   setTimeout(() => {
//     callback();
//   }, 4000);
// }

const getCustomer = (id) => {
   return new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve({
         id: 1,
         name: 'Mosh Hamedani',
         isGold: true,
         email: 'email'
       });
     }, 4000)
   })
}

const getTopMovies = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

const sendEmail = (email, movies) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Email sent...');
    }, 4000);
  });
};

const contactCustomer = async () => {
  const customer = await getCustomer();
  console.log(`Here's the customer: ${customer.name}`)
  if (customer.isGold) {
    const movies = await getTopMovies();
    console.log('Top movies: ', movies);
    const email = await sendEmail(customer.email, movies)
    console.log(email)
  }
}

contactCustomer()

