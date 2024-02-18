<script>
  import { FirebaseApp, SignedIn, SignedOut, User, Doc } from "sveltefire";
  import { getContext } from "svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import countries from "./countries.json";
  import languages from "./languages.json";
  import { collection, doc, getDoc, getDocs, setDoc, addDoc, orderBy, updateDoc} from "firebase/firestore";

  let db = getContext("db");
  let auth = getContext("auth");

  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { update } from "firebase/database";

  let email = "";
  let password = "";
  let firstName = "";
  let lastName = "";
  let age = "";
  let selectedLanguageCode = "";
  let bio = "";
  let institution = "";
  let selectedCountryCode = "";

  let handleSubmit = async () => {
    await createUserWithEmailAndPassword(auth, email, password);

    let userInfoDoc = await doc(db, `userInfo/${auth.currentUser.uid}`);
    await setDoc(userInfoDoc, {
      firstName: firstName,
      lastName: lastName,
      age: age,
      institution: institution,
      language: selectedLanguageCode,
      country: selectedCountryCode,
      bio: bio,
    });

    let chosenChatroomID = 0

    
        let sortingRooms = (a, b) => {
            if (a.data().userCount < b.data().userCount) {
                return -1;
            }
            if (a.data().userCount > b.data().userCount) {
                return 1;
            }
            return 0;
        };
    

    
    let chatroomCollection = collection(db, "chatrooms")
    let chatrooms = await getDocs(chatroomCollection)

    const chatroomData = chatrooms.docs.sort(sortingRooms);

    for (let doc of chatroomData) {
        console.log(doc.id)
    }
    let bestID = chatroomData[0].id

    console.log(chatroomData[0].id)

    updateDoc(doc(db, `chatrooms/${bestID}`), {userCount: chatroomData[0].data().userCount + 1})

    let userChatCollection = collection(db, `userInfo/${auth.currentUser.uid}/chats`)
    addDoc(userChatCollection, {chatroomID: bestID, date: new Date()})

    setDoc(doc(db,`chatrooms/${bestID}/allowedUsers/${auth.currentUser.uid}`), {})

    await signInWithEmailAndPassword(auth, email, password);

   
  };

  // onMount(async () => {
  //     auth.onAuthStateChanged(async () => {
  //         if (auth.currentUser) {
  //             await goto("/")
  //         }
  //     })
  // })
</script>

<FirebaseApp firestore={db} {auth}>
  <SignedOut>
    <main>
      <h1>Sign Up</h1>

      <div id="form">
        <div id="form1">
          <div class="formEntry">
            <label>Email</label>
            <input type="text" bind:value={email} />
          </div>

          <div class="formEntry">
            <label>Password</label>
            <input type="text" bind:value={password} />
          </div>

          <div class="formEntry">
            <label>First Name</label>
            <input type="text" bind:value={firstName} />
          </div>

          <div class="formEntry">
            <label>Last Name</label>
            <input type="text" bind:value={lastName} />
          </div>

          <div class="formEntry">
            <label>Age</label>
            <input type="text" bind:value={age} />
          </div>

          <div class="formEntry">
            <label>Institution</label>
            <input type="text" bind:value={institution} />
          </div>
        </div>

        <div id="form2">
          <div class="formEntry">
            <label>Country</label>
            <select bind:value={selectedCountryCode}>
              {#each countries as country (country.code)}
                <option value={country.code}>{country.name}</option>
              {/each}
            </select>

            <div class="formEntry">
              <label>Language</label>
              <select bind:value={selectedLanguageCode}>
                {#each languages as language (language.code)}
                  <option value={language.code}>{language.name}</option>
                {/each}
              </select>
            </div>

            <div class="formEntry">
              <label>Bio</label>
              <textarea bind:value={bio}></textarea>
            </div>
          </div>
        </div>
      </div>

      <button on:click={handleSubmit}>Submit</button>

      <a href="/log-in">Already have an account, click here.</a>
    </main>
  </SignedOut>
</FirebaseApp>

<style>
  main {
    display: flex;
    background-color: white;
    box-shadow: 2px 2px 5px grey;
    width: 65vh;

    flex-direction: column;
    padding: 1rem;

    font-size: 1.5rem;
  }

  #form {
    display: flex;
  }

  #form1 {
    display: flex;
    width: 50%;

    flex-direction: column;

    font-size: 1.5rem;
    padding-right: 1rem;
  }

  #form2 {
    display: flex;
    width: 50%;

    flex-direction: column;

    padding-left: 1rem;

    font-size: 1.5rem;
  }

  main > * {
    margin: 0.5rem;
  }

  input {
    border: 0.1px grey solid;
    border-radius: 3px;
    font-size: 1.25rem;
  }

  .formEntry {
    display: flex;
    flex-direction: column;
  }

  button {
    font-size: 2rem;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    background-color: whitesmoke;
    transition: background-color 0.2s;

    font-style: italic;
    font-weight: 200;

    padding: 0.25rem 1rem;
    border-radius: 5px;
  }

  button:hover {
    background-color: rgb(202, 255, 200);
  }

  select {
    border: 0.1px grey solid;
    border-radius: 3px;

    height: 1.25rem;
    background-color: white;
  }

  textarea {
    font-size: 1.25rem;
    height: 15vh;
  }

  a {
    font-size: 1rem;
    margin: 0.5rem auto;
  }
</style>
