import ConfigStatus from '../components/ConfigStatus';

export default function StatusPage() {
  // Check if environment variables are configured
  const firebaseConfigured = !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );

  const mongoConfigured = !!(
    process.env.MONGODB_URI &&
    process.env.MONGODB_URI !== 'mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority'
  );

  return <ConfigStatus firebaseConfigured={firebaseConfigured} mongoConfigured={mongoConfigured} />;
}
