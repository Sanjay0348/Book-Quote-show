// MongoDB initialization script
db = db.getSiblingDB('bookquotes');

// Create collections
db.createCollection('quotes');

// Create indexes
db.quotes.createIndex({ "category": 1 });
db.quotes.createIndex({ "author": 1 });
db.quotes.createIndex({ "likes": -1 });
db.quotes.createIndex({ "createdAt": -1 });
db.quotes.createIndex({
  "text": "text",
  "author": "text", 
  "book": "text"
});

console.log('✅ MongoDB initialized successfully');