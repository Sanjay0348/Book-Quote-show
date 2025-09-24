import mongoose from 'mongoose';
import { Quote } from '../models/Quote';
import dotenv from 'dotenv';

dotenv.config();

const sampleQuotes = [
  {
    text: "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde",
    book: "Various Writings",
    category: "life",
    likes: 142
  },
  {
    text: "It is never too late to be what you might have been.",
    author: "George Eliot",
    book: "Various Writings", 
    category: "inspiration",
    likes: 98
  },
  {
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson",
    book: "Essays",
    category: "self",
    likes: 156
  },
  {
    text: "There is some good in this world, and it's worth fighting for.",
    author: "J.R.R. Tolkien",
    book: "The Two Towers",
    category: "hope",
    likes: 203
  },
  {
    text: "It is our choices that show what we truly are, far more than our abilities.",
    author: "J.K. Rowling",
    book: "Harry Potter and the Chamber of Secrets",
    category: "wisdom",
    likes: 187
  },
  {
    text: "The worst enemy to creativity is self-doubt.",
    author: "Sylvia Plath",
    book: "The Unabridged Journals of Sylvia Plath",
    category: "creativity",
    likes: 134
  },
  {
    text: "All we have to decide is what to do with the time that is given to us.",
    author: "J.R.R. Tolkien",
    book: "The Fellowship of the Ring",
    category: "time",
    likes: 167
  },
  {
    text: "When you want something, all the universe conspires in helping you to achieve it.",
    author: "Paulo Coelho",
    book: "The Alchemist",
    category: "dreams",
    likes: 221
  },
  {
    text: "It is better to be hated for what you are than to be loved for what you are not.",
    author: "André Gide",
    book: "Autumn Leaves",
    category: "authenticity",
    likes: 178
  },
  {
    text: "Get busy living, or get busy dying.",
    author: "Stephen King",
    book: "Different Seasons",
    category: "motivation",
    likes: 145
  },
  {
    text: "The goal isn't to live forever, the goal is to create something that will.",
    author: "Chuck Palahniuk",
    book: "Diary",
    category: "legacy",
    likes: 112
  },
  {
    text: "Fear doesn't shut you down; it wakes you up.",
    author: "Veronica Roth",
    book: "Divergent",
    category: "courage",
    likes: 89
  },
  {
    text: "Yes: I am a dreamer. For a dreamer is one who can only find his way by moonlight, and his punishment is that he sees the dawn before the rest of the world.",
    author: "Oscar Wilde",
    book: "The Critic as Artist",
    category: "dreams",
    likes: 156
  },
  {
    text: "One day I will find the right words, and they will be simple.",
    author: "Jack Kerouac",
    book: "The Dharma Bums",
    category: "writing",
    likes: 134
  },
  {
    text: "It sounds plausible enough tonight, but wait until tomorrow. Wait for the common sense of the morning.",
    author: "H.G. Wells",
    book: "The Time Machine",
    category: "wisdom",
    likes: 76
  },
  {
    text: "Time is the longest distance between two places.",
    author: "Tennessee Williams",
    book: "The Glass Menagerie",
    category: "time",
    likes: 91
  },
  {
    text: "Beauty was not simply something to behold; it was something one could do.",
    author: "Toni Morrison",
    book: "The Bluest Eye",
    category: "beauty",
    likes: 108
  },
  {
    text: "You can't stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.",
    author: "A.A. Milne",
    book: "Winnie-the-Pooh",
    category: "friendship",
    likes: 123
  },
  {
    text: "Human speech is like a cracked kettle on which we tap crude rhythms for bears to dance to, while we long to make music that will melt the stars.",
    author: "Gustave Flaubert",
    book: "Madame Bovary",
    category: "communication",
    likes: 87
  },
  {
    text: "It's a dangerous business, going out of your door.",
    author: "J.R.R. Tolkien",
    book: "The Lord of the Rings",
    category: "adventure",
    likes: 145
  },
  {
    text: "Beware; for I am fearless, and therefore powerful.",
    author: "Mary Shelley",
    book: "Frankenstein",
    category: "power",
    likes: 132
  },
  {
    text: "Both of them remained floating in an empty universe where the only everyday and eternal reality was love.",
    author: "Gabriel García Márquez",
    book: "One Hundred Years of Solitude",
    category: "love",
    likes: 167
  },
  {
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin",
    book: "A Dance with Dragons",
    category: "reading",
    likes: 198
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
    book: "On Writing",
    category: "books",
    likes: 176
  },
  {
    text: "Some books are so familiar that reading them is like being home again.",
    author: "Louisa May Alcott",
    book: "Little Women",
    category: "comfort",
    likes: 154
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookquotes';

    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️ Clearing existing quotes...');
    await Quote.deleteMany({});

    console.log('📚 Inserting sample quotes...');
    await Quote.insertMany(sampleQuotes);

    const count = await Quote.countDocuments();
    console.log(`✅ Successfully seeded ${count} quotes!`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
    process.exit(0);
  }
};

seedDatabase();