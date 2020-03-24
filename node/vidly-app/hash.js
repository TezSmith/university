const bcrypt = require('bcrypt')

// Uses async await vs callbacks

const protect = async () => {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash('pw123', salt);
  console.log(hashed)
}

protect()

