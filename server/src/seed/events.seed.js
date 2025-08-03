import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/event.models.js';

dotenv.config();

const sampleEvents = [
  {
    title: 'Tech Conference 2023',
    shortDesc: 'Annual technology conference featuring the latest in software development',
    fullDesc: 'Join us for three days of workshops, keynotes, and networking with industry leaders in technology and software development.',
    dateStart: new Date('2023-10-15T09:00:00'),
    dateEnd: new Date('2023-10-17T18:00:00'),
    location: 'Convention Center, Tech City',
    imageUrl: 'https://example.com/tech-conf.jpg',
    calendarSlug: 'tech-conference-2023',
    status: 'published',
    likes: 150
  },
  {
    title: 'Web Development Workshop',
    shortDesc: 'Hands-on workshop for modern web development',
    fullDesc: 'Learn the latest web technologies including React, Node.js, and MongoDB in this intensive two-day workshop.',
    dateStart: new Date('2023-11-05T10:00:00'),
    dateEnd: new Date('2023-11-06T16:00:00'),
    location: 'Digital Hub, Downtown',
    imageUrl: 'https://example.com/web-dev.jpg',
    calendarSlug: 'web-dev-workshop-nov',
    status: 'published',
    likes: 89
  },
  {
    title: 'AI & Machine Learning Summit',
    shortDesc: 'Exploring the future of artificial intelligence',
    fullDesc: 'A one-day summit bringing together AI researchers, practitioners, and enthusiasts to discuss the latest advancements in machine learning.',
    dateStart: new Date('2023-11-20T09:30:00'),
    location: 'Innovation Center, Tech Park',
    imageUrl: 'https://example.com/ai-summit.jpg',
    status: 'published',
    likes: 203
  },
  {
    title: 'Startup Pitch Night',
    shortDesc: 'Local startups pitch their ideas to investors',
    fullDesc: 'Witness the next big ideas as local startups pitch their businesses to a panel of investors.',
    dateStart: new Date('2023-12-03T18:00:00'),
    location: 'Venture Hub, Business District',
    imageUrl: 'https://example.com/startup-pitch.jpg',
    status: 'published',
    likes: 67
  },
  {
    title: 'Blockchain Workshop',
    shortDesc: 'Introduction to blockchain technology and cryptocurrencies',
    fullDesc: 'Learn the fundamentals of blockchain technology, smart contracts, and cryptocurrency development.',
    dateStart: new Date('2023-12-12T13:00:00'),
    dateEnd: new Date('2023-12-14T17:00:00'),
    location: 'Crypto Hub, Financial District',
    imageUrl: 'https://example.com/blockchain.jpg',
    status: 'published',
    likes: 112
  },
  {
    title: 'UX/UI Design Conference',
    shortDesc: 'Exploring the latest in user experience and interface design',
    fullDesc: 'Join leading designers as they share insights and trends in user experience and interface design.',
    dateStart: new Date('2024-01-15T09:00:00'),
    dateEnd: new Date('2024-01-16T17:00:00'),
    location: 'Design Center, Creative District',
    imageUrl: 'https://example.com/ux-ui.jpg',
    status: 'draft',
    likes: 0
  },
  {
    title: 'Cloud Computing Workshop',
    shortDesc: 'Hands-on with AWS, Azure, and GCP',
    fullDesc: 'Learn how to deploy and manage applications on major cloud platforms in this comprehensive workshop.',
    dateStart: new Date('2024-02-05T10:00:00'),
    dateEnd: new Date('2024-02-07T16:00:00'),
    location: 'Cloud Campus, Tech Valley',
    imageUrl: 'https://example.com/cloud-workshop.jpg',
    status: 'published',
    likes: 78
  },
  {
    title: 'Cybersecurity Summit',
    shortDesc: 'Protecting digital assets in a connected world',
    fullDesc: 'Experts discuss the latest threats and strategies in cybersecurity and data protection.',
    dateStart: new Date('2024-02-20T09:00:00'),
    dateEnd: new Date('2024-02-21T17:00:00'),
    location: 'Security Center, Business District',
    imageUrl: 'https://example.com/cyber-summit.jpg',
    status: 'published',
    likes: 145
  },
  {
    title: 'Mobile App Development Bootcamp',
    shortDesc: 'Build cross-platform mobile applications',
    fullDesc: 'Learn to develop mobile apps using React Native and Flutter in this intensive bootcamp.',
    dateStart: new Date('2024-03-10T10:00:00'),
    dateEnd: new Date('2024-03-14T16:00:00'),
    location: 'Mobile Dev Lab, Tech Campus',
    imageUrl: 'https://example.com/mobile-bootcamp.jpg',
    status: 'published',
    likes: 92
  },
  {
    title: 'Data Science Conference',
    shortDesc: 'Advancements in data analysis and machine learning',
    fullDesc: 'Explore the latest trends and techniques in data science, analytics, and machine learning.',
    dateStart: new Date('2024-04-05T09:00:00'),
    dateEnd: new Date('2024-04-06T17:00:00'),
    location: 'Data Science Institute, University District',
    imageUrl: 'https://example.com/data-science-conf.jpg',
    status: 'published',
    likes: 178
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert sample events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`Seeded ${createdEvents.length} events`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function if this file is run directly
if (process.argv[1].includes('events.seed.js')) {
  seedDatabase();
}

export default seedDatabase;
