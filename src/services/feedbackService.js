import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { encryptContent } from '../utils/encryption';

// Submit new feedback
export const submitFeedback = async ({ 
  originalContent, 
  transformedContent, 
  isAnonymous, 
  recipient, 
  inviteCode,
  sender = null // Optional
}) => {
  try {
    // Encrypt the original content before storing
    const encryptedOriginal = await encryptContent(originalContent);
    
    // Add the feedback to Firestore
    await addDoc(collection(db, 'feedbacks'), {
      originalContent: encryptedOriginal, // Encrypted original feedback
      transformedContent, // AI-transformed feedback (not encrypted)
      isAnonymous,
      sender: isAnonymous ? null : sender,
      recipient,
      inviteCode,
      timestamp: serverTimestamp(),
      isRead: false
    });
    
    return true;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

// Get all feedbacks for a specific invite code
export const getFeedbacksByCode = async (inviteCode) => {
  try {
    const q = query(
      collection(db, 'feedbacks'),
      where('inviteCode', '==', inviteCode)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    return [];
  }
};

// Get all feedbacks for a specific recipient
export const getFeedbacksByRecipient = async (recipient) => {
  try {
    const q = query(
      collection(db, 'feedbacks'),
      where('recipient', '==', recipient)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    return [];
  }
};
