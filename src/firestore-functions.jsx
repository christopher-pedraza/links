import { db } from "./firebase-config";
import {
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";

// Function to retrieve a specific document by ID
export const getDocumentLinks = async (collectionName = "links", id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()["links"];
    } else {
        return [];
    }
};

export const checkIfNameAvailable = async (collectionName = "links", name) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
};

// Get document based on the field "name"
export const getLinksByName = async (collectionName = "links", name) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        new Error("No documents found with the name " + name);
    }
    return querySnapshot.docs[0].data()["links"];
};

// Function to create a document with a provided array of strings
export const createDocument = async (
    collectionName = "links",
    name,
    arrayData
) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            name,
            links: arrayData,
        });
        return docRef.id;
    } catch (e) {
        return null;
    }
};

// Function to delete a specific document by ID
export const deleteDocument = async (collectionName = "links", id) => {
    const docRef = doc(db, collectionName, id);
    try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error removing document: ", e);
    }
};

// Function to delete all the documents in a collection
export const deleteAllDocuments = async (collectionName = "links") => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
        deleteDocument(collectionName, doc.id);
    });
};
