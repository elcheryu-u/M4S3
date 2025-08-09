// //////// Inserción de documentos //////// //

// USERS
db.users.insertMany([
  {
    _id: ObjectId("66b9a1010000000000000001"),
    name: "Sergio Cortes",
    email: "sergio.cortes@gmail.com",
    country: "Colombia",
    preferredGenres: ["Action", "Sci-Fi"],
    watchHistory: [
      { contentId: ObjectId("66b9a1010000000000001001"), watchedAt: ISODate("2025-08-01T19:30:00Z") },
      { contentId: ObjectId("66b9a1010000000000001002"), watchedAt: ISODate("2025-08-02T21:15:00Z") }
    ]
  },
  {
    _id: ObjectId("66b9a1010000000000000002"),
    name: "Juan Wills",
    email: "juanw@gmail.com",
    country: "Italy",
    preferredGenres: ["Drama", "Romance"],
    watchHistory: [
      { contentId: ObjectId("66b9a1010000000000001003"), watchedAt: ISODate("2025-08-03T18:00:00Z") }
    ]
  }
]);


// CONTENT
db.content.insertMany([
  {
    _id: ObjectId("66b9a1010000000000001003"),
    title: "Titanic",
    type: "movie",
    durationMinutes: 195,
    releaseYear: 1997,
    genres: ["Drama", "Romance"],
    cast: ["Leonardo DiCaprio", "Kate Winslet"]
  },
  {
    _id: ObjectId("66b9a1010000000000001002"),
    title: "Avatar: El Camino del Agua",
    type: "movie",
    durationMinutes: 192,
    releaseYear: 2022,
    genres: ["Acción", "Sci-Fi"],
    cast: ["Sam Worthington", "Zoe Saldaña"]
  },
  {
    _id: ObjectId("66b9a1010000000000001001"),
    title: "El Señor de los Anillos: La Comunidad del Anillo",
    type: "movie",
    durationMinutes: 178,
    releaseYear: 2001,
    genres: ["Drama", "Aventura"],
    cast: ["Elijah Wood", "Ian McKellen"]
  }
]);

// RATINGS

db.ratings.insertMany([
  {
    _id: ObjectId("66b9a1010000000000002001"),
    userId: ObjectId("66b9a1010000000000000001"),
    contentId: ObjectId("66b9a1010000000000001001"),
    score: 4.8,
    comment: "Great movie!",
    createdAt: ISODate("2025-08-02T15:45:00Z")
  },
  {
    _id: ObjectId("66b9a1010000000000002002"),
    userId: ObjectId("66b9a1010000000000000002"),
    contentId: ObjectId("66b9a1010000000000001003"),
    score: 3.8,
    comment: "Nice story, but slow pacing.",
    createdAt: ISODate("2025-08-04T11:20:00Z")
  }
]);

// PLAYLIST

db.playlists.insertMany([
  {
    _id: ObjectId("66b9a1010000000000003001"),
    userId: ObjectId("66b9a1010000000000000001"),
    name: "Pa'l finde",
    createdAt: ISODate("2025-07-15T10:00:00Z"),
    items: [
      { contentId: ObjectId("66b9a1010000000000001002") },
      { contentId: ObjectId("66b9a1010000000000001001") }
    ]
  }
]);

// INTERACTIONS

db.interactions.insertMany([
  {
    _id: ObjectId("66b9a1010000000000004001"),
    userId: ObjectId("66b9a1010000000000000001"),
    contentId: ObjectId("66b9a1010000000000001002"),
    type: "like",
    createdAt: ISODate("2025-08-05T20:00:00Z")
  },
  {
    _id: ObjectId("66b9a1010000000000004002"),
    userId: ObjectId("66b9a1010000000000000002"),
    contentId: ObjectId("66b9a1010000000000001003"),
    type: "comment",
    commentText: "Such a beautiful love story!",
    createdAt: ISODate("2025-08-06T14:30:00Z")
  }
]);

// //////// Consultas básicas (Lectura) //////// //

// Query 1: Find movies with a duration greater than 180 minutes using $gt
db.content.find({
  type: "movie",
  durationMinutes: { $gt: 180 }
})

// Query 2: Find users who prefer both "Drama" and "Romance" genres using $and
db.users.find({
  $and: [
    { preferredGenres: "Drama" },
    { preferredGenres: "Romance" }
  ]
});

// Query 3: Find content released in or after 2001 using $gte
db.content.find({
  releaseYear: { $gte: 2001 }
});

// Query 4: Find users who have watched specific content IDs using $in
db.users.find({
  "watchHistory.contentId": {
    $in: [
      ObjectId("66b9a1010000000000001001"),
      ObjectId("66b9a1010000000000001002")
    ]
  }
});

// Query 5: Find content with titles matching a pattern using $regex (case-insensitive)
db.content.find({
  title: { $regex: "Avatar", $options: "i" }
});

// Query 6: Find users who have watched more than 1 content item using $size
db.users.find({
  watchHistory: { $size: 2 }
});

// Query 7: Find ratings with a score less than 4 or comments containing "slow" using $or and $regex
db.ratings.find({
  $or: [
    { score: { $lt: 4 } },
    { comment: { $regex: "slow", $options: "i" } }
  ]
});

// Query 8: Find playlists created before August 2025 using $lt
db.playlists.find({
  createdAt: { $lt: ISODate("2025-08-01T00:00:00Z") }
});

// Query 9: Find interactions of type "like" for a specific content ID using $eq
db.interactions.find({
  type: { $eq: "like" },
  contentId: ObjectId("66b9a1010000000000001002")
});

// Query 10: Find content that is either of type "movie" or has "Sci-Fi" genre using $or
db.content.find({
  $or: [
    { type: "movie" },
    { genres: "Sci-Fi" }
  ]
});

// //////// Actualizaciones y eliminaciones //////// //

// //// UPDATES //// //

// Update 1: Update a single rating's score and comment for a specific user and content
db.ratings.updateOne(
  {
    userId: ObjectId("66b9a1010000000000000001"),
    contentId: ObjectId("66b9a1010000000000001001")
  },
  {
    $set: {
      score: 4.9,
      comment: "Even better on rewatch!",
      createdAt: ISODate("2025-08-07T10:00:00Z")
    }
  }
);

// Update 2: Add a new genre to all movies released before 2000
db.content.updateMany(
  {
    type: "movie",
    releaseYear: { $lt: 2000 }
  },
  {
    $push: { genres: "Classic" }
  }
);

// Update 3: Add a new watch history entry for a specific user
db.users.updateOne(
  {
    _id: ObjectId("66b9a1010000000000000002")
  },
  {
    $push: {
      watchHistory: {
        contentId: ObjectId("66b9a1010000000000001001"),
        watchedAt: ISODate("2025-08-07T14:00:00Z")
      }
    }
  }
);

// Update 4: Update the name of a playlist for a specific user
db.playlists.updateOne(
  {
    _id: ObjectId("66b9a1010000000000003001")
  },
  {
    $set: { name: "Weekend Favorites" }
  }
);

// //// DELETIONS //// //

// Delete 1: Delete a single interaction of type "comment" for a specific content
db.interactions.deleteOne(
  {
    contentId: ObjectId("66b9a1010000000000001003"),
    type: "comment"
  }
);

// Delete 2: Delete all ratings with a score less than 4
db.ratings.deleteMany(
  {
    score: { $lt: 4 }
  }
);

// Delete 3: Delete playlists created before July 2025
db.playlists.deleteMany(
  {
    createdAt: { $lt: ISODate("2025-07-01T00:00:00Z") }
  }
);

// //////// Índices //////// //

// Index 1: Create an index on the 'email' field in the 'users' collection for fast user lookups
db.users.createIndex(
  { email: 1 },
  { name: "email_idx" }
);

// Index 2: Create a compound index on 'title' and 'genres' in the 'content' collection for searches by title and genre
db.content.createIndex(
  { title: 1, genres: 1 },
  { name: "title_genres_idx" }
);

// Index 3: Create an index on 'contentId' in the 'ratings' collection for efficient rating lookups by content
db.ratings.createIndex(
  { contentId: 1 },
  { name: "contentId_idx" }
);

// Index 4: Create an index on 'userId' in the 'playlists' collection to optimize user-specific playlist queries
db.playlists.createIndex(
  { userId: 1 },
  { name: "userId_idx" }
);

// Index 5: Create a compound index on 'contentId' and 'type' in the 'interactions' collection for interaction queries
db.interactions.createIndex(
  { contentId: 1, type: 1 },
  { name: "contentId_type_idx" }
);

// //// LISTING INDEXES //// //

// List indexes for the 'users' collection
db.users.getIndexes();

// List indexes for the 'content' collection
db.content.getIndexes();

// List indexes for the 'ratings' collection
db.ratings.getIndexes();

// List indexes for the 'playlists' collection
db.playlists.getIndexes();

// List indexes for the 'interactions' collection
db.interactions.getIndexes();


// //////// Agregaciones //////// //

// Average rating per movie
db.ratings.aggregate([
  {
    $lookup: {
      from: "content",
      localField: "contentId",
      foreignField: "_id",
      as: "contentDetails"
    }
  },
  {
    $unwind: "$contentDetails"
  },
  {
    $match: {
      "contentDetails.type": "movie"
    }
  },
  {
    $group: {
      _id: "$contentId",
      movieTitle: { $first: "$contentDetails.title" },
      averageRating: { $avg: "$score" }
    }
  },
  {
    $project: {
      _id: 0,
      movieTitle: 1,
      averageRating: { $round: ["$averageRating", 2] }
    }
  },
  {
    $sort: { averageRating: -1 }
  }
]);


// Total number of contents viewed per user
db.users.aggregate([
  {
    $lookup: {
      from: "content",
      localField: "watchHistory.contentId",
      foreignField: "_id",
      as: "watchedContentDetails"
    }
  },
  {
    $project: {
      _id: 0,
      userName: "$name",
      totalWatched: { $size: "$watchHistory" }
    }
  },
  {
    $sort: { totalWatched: -1 }
  }
]);