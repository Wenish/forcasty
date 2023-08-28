export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongodb: {
      uri: process.env.DATABASE_MONGODB_URI,
      name: process.env.DATABASE_MONGODB_NAME || 'forcasty',
    },
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  },
});
