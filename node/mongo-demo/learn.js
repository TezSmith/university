
// Trade off btwn query performance vs consistency

// Using References (Normalization) -> Consistency
let author = {
  name: 'Tez'
}

let course = {
  author: 'id'
}

// Using Embedded Documents (Denormalization) -> Faster Querying

let course = {
  author: {
    name: 'Tez'
  }
}

// Hybrid - Good for getting snapshots of data at a point in time. Ecommerce!

let author = {
  name: 'Mosh',
  // + 50 other properties
}

let course = {
  author = {
    id: 'ref',
    name: 'Mosh'
  }
}