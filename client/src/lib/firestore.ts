import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query, 
  orderBy, 
  limit,
  where,
  getDoc,
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// Types matching our original schema
export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  createdAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export interface CompanyInfo {
  id: string;
  description: string;
  mission: string;
  showsProduced: string;
  artistsFeatured: string;
  yearsExperience: string;
  phone: string;
  email: string;
  address: string;
}

// Collection references
const songsCollection = collection(db, "songs");
const contactsCollection = collection(db, "contacts");
const companyCollection = collection(db, "company");

// Songs operations
export const getAllSongs = async (): Promise<Song[]> => {
  const q = query(songsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date()
  })) as Song[];
};

export const addSong = async (songData: Omit<Song, "id" | "createdAt">): Promise<Song> => {
  const docRef = await addDoc(songsCollection, {
    ...songData,
    createdAt: Timestamp.now()
  });
  
  return {
    id: docRef.id,
    ...songData,
    createdAt: new Date()
  };
};

export const updateSong = async (id: string, songData: Partial<Omit<Song, "id" | "createdAt">>): Promise<void> => {
  const songRef = doc(db, "songs", id);
  await updateDoc(songRef, songData);
};

export const deleteSong = async (id: string): Promise<void> => {
  const songRef = doc(db, "songs", id);
  await deleteDoc(songRef);
};

// Contact submissions operations
export const getAllContactSubmissions = async (): Promise<ContactSubmission[]> => {
  const q = query(contactsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date()
  })) as ContactSubmission[];
};

export const addContactSubmission = async (contactData: Omit<ContactSubmission, "id" | "createdAt" | "isRead">): Promise<ContactSubmission> => {
  const docRef = await addDoc(contactsCollection, {
    ...contactData,
    createdAt: Timestamp.now(),
    isRead: false
  });
  
  return {
    id: docRef.id,
    ...contactData,
    createdAt: new Date(),
    isRead: false
  };
};

export const updateContactSubmissionStatus = async (id: string, isRead: boolean): Promise<void> => {
  const contactRef = doc(db, "contacts", id);
  await updateDoc(contactRef, { isRead });
};

export const deleteContactSubmission = async (id: string): Promise<void> => {
  const contactRef = doc(db, "contacts", id);
  await deleteDoc(contactRef);
};

// Company info operations
export const getCompanyInfo = async (): Promise<CompanyInfo | null> => {
  const q = query(companyCollection, limit(1));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) return null;
  
  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data()
  } as CompanyInfo;
};

export const updateCompanyInfo = async (companyData: Omit<CompanyInfo, "id">): Promise<CompanyInfo> => {
  const existing = await getCompanyInfo();
  
  if (existing) {
    const companyRef = doc(db, "company", existing.id);
    await updateDoc(companyRef, companyData);
    return { id: existing.id, ...companyData };
  } else {
    const docRef = await addDoc(companyCollection, companyData);
    return { id: docRef.id, ...companyData };
  }
};

// Admin management functions
export const addAdmin = async (userId: string, email: string): Promise<void> => {
  const adminRef = doc(db, 'admins', userId);
  try {
    await updateDoc(adminRef, {
      email,
      isAdmin: true,
      addedAt: Timestamp.now()
    });
  } catch (error) {
    // If document doesn't exist, create it with setDoc
    await setDoc(adminRef, {
      email,
      isAdmin: true,
      addedAt: Timestamp.now()
    });
  }
};

export const removeAdmin = async (userId: string): Promise<void> => {
  const adminRef = doc(db, 'admins', userId);
  await deleteDoc(adminRef);
};

export const isUserAdmin = async (userId: string): Promise<boolean> => {
  const adminDoc = await getDoc(doc(db, 'admins', userId));
  return adminDoc.exists() && adminDoc.data()?.isAdmin === true;
};

// Initialize with default data if collections are empty
export const initializeDefaultData = async (): Promise<void> => {
  try {
    // Check if company info exists
    const existingCompany = await getCompanyInfo();
    if (!existingCompany) {
      await addDoc(companyCollection, {
        description: "Jashan Films stands as a premier Punjabi music production house, dedicated to showcasing the rich cultural heritage of Punjab through television programming. We broadcast authentic Punjabi music shows on Doordarshan three times a week, reaching millions of viewers across India.",
        mission: "As a licensed advertisement agency with Doordarshan, we bridge the gap between talented artists and national television, providing comprehensive production services that honor traditional Punjabi music while embracing modern broadcasting standards.",
        showsProduced: "500+",
        artistsFeatured: "1000+",
        yearsExperience: "25+",
        phone: "+91 98151 05700",
        email: "official@jashanfilms.com",
        address: "Jalandhar, Punjab, India"
      });
    }

    // Check if songs exist
    const existingSongs = await getDocs(query(songsCollection, limit(1)));
    if (existingSongs.empty) {
      const sampleSongs = [
        {
          title: "Punjabi Folk Song - Traditional",
          artist: "Featured Artist Name",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          views: "2.5M"
        },
        {
          title: "Modern Punjabi Hit",
          artist: "Popular Singer",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          views: "1.8M"
        },
        {
          title: "Cultural Dance Performance",
          artist: "Traditional Group",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          views: "950K"
        }
      ];

      for (const song of sampleSongs) {
        await addDoc(songsCollection, {
          ...song,
          createdAt: Timestamp.now()
        });
      }
    }

    console.log("Firebase data initialization completed");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
};