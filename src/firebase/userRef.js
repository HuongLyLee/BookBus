import { doc } from "firebase/firestore"
import { db } from "../firebaseConfig"

// Tạo đối tượng DocumentReference đến vị trí người dùng trong Firestore
export const userDocRef = (userId) =>{
    return doc(db, 'users', userId)
}