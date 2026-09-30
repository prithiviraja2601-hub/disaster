const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });

// In production or local, you must set these environment variables.
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // The private key might be wrapped in quotes or have literal '\n' characters if loaded from .env
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let db, auth;
try {
  if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
    initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    console.warn('⚠️ Firebase Admin credentials not found in backend/.env. Using default (will fail if not authenticated in environment).');
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'disater-c0313'
    });
  }
  db = getFirestore();
  auth = getAuth();
} catch (error) {
  console.error('Firebase Admin initialization error:', error.message);
}

// Export a mocked admin object to keep compatibility with admin.auth()
const admin = {
  auth: () => auth
};

module.exports = { admin, db };
