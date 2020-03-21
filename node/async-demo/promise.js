const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(1)
    reject(new Error('message'))
  }, 2000)
})

p
 .then(result => console.log(`Here's the result: ${result}`))
 .catch(err => console.log(`Here's the error: ${err.message}`))