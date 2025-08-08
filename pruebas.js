
// Insertar usuarios
db.users.insertMany([
  {
    name: "Sergio Alejandro",
    email: "correo.sergio@gmail.com",
    country: "Colombia",
    preferred_genre: ["Acción", "Ciencia Ficción"],
    viewing_history: []
  },
  {
    name: "Ana Ruiz",
    email: "ana.example@gmail.com",
    country: "México",
    preferred_genre: ["Drama", "Romance"]
  }
])

// Insertar contenido
db.content.insertMany([
  {
    title: "Matrix",
    type: "movie",
    duration: 136,
    year: 1999,
    genres: ["Ciencia ficción", "Acción"],
    cast: ["Keanu Reeves", "Laurence Fishburne"],
    ratings: []
  },
  {
    title: "Breaking Bad",
    type: "serie",
    duration: 49,
    year: 2008,
    genres: ["Drama", "Crimen"],
    cast: ["Bryan Cranston", "Aaron Paul"],
    ratings: []
  }
])