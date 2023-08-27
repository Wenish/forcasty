export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongodb: {
      uri: process.env.DATABASE_MONGODB_URI,
      name: process.env.DATABASE_MONGODB_NAME || 'forcasty',
    },
  },
});
