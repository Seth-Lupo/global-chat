import { getDoc, doc } from "firebase/firestore"

export default async (db, auth) => {

    if (auth.currentUser == null) {
        return null
    }

    let userInfoDoc = await doc(db, `userInfo/${auth.currentUser.uid}`)
    let userInfo = await getDoc(userInfoDoc);
    return userInfo.data()

}