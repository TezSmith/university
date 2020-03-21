
// Callback Hell prevention with Promises
const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: id, username: 'Test' });
    }, 2000)
  })
};

const getRepo = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Could not get repos'))
      // resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  })
};

// console.log('Before')
// getUser(1)
//   .then(res => getRepo(res.username))
//   .then(res => console.log(`Here's the repo: ${res}`))
//   .catch(err => console.log(`Error: ${err.message}`))
// console.log('After')

// Callback Hell prevention with Async / Await
 const displayRepos = async () => {
   try {
     const user = await getUser(1)
     const repos = await getRepo(user)
     console.log(repos)
   }
   catch (err) {
     console.log(`Error: ${err.message}`)
   }
 } 

 displayRepos()


