<script>

    import { FirebaseApp, SignedIn, SignedOut, User, Doc } from 'sveltefire'
    import { getContext } from "svelte";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import countries from './countries.json';

    let db = getContext("db")
    let auth = getContext("auth")

    import { createUserWithEmailAndPassword } from "firebase/auth";



    let email = ""
    let password = ""
    let firstName = ""
    let lastName = ""
    let age = ""
    let location = ""
    let bio = ""
    let institution = ""
    let selectedCountryCode = ""

    let handleSubmit = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    // onMount(async () => {
    //     auth.onAuthStateChanged(async () => {
    //         if (auth.currentUser) {
    //             await goto("/")
    //         }
    //     }) 
    // }) 

</script>

<style>
    
    main {
        display: flex;
        background-color: white;
        box-shadow: 2px 2px 5px grey;
        width: 50vh;
        
        flex-direction: column;
        padding: 1rem;

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



</style>

<FirebaseApp firestore={db} auth={auth}>
   
    <SignedOut>

        <main>

            <h1>Sign Up</h1>
            <div class="formEntry">
                <label>Email</label>
                <input type="text" bind:value={email}>
            </div>

            <div class="formEntry">
                <label>Password</label>
                <input type="text" bind:value={password}>
            </div>

            <div class="formEntry">
            <label>First Name</label>
            <input type="text" bind:value={firstName}>
            </div>
            
            <div class="formEntry">
            <label>Last Name</label>
            <input type="text" bind:value={lastName}>
            </div>

            <div class="formEntry">
            <label>Age</label>
            <input type="text" bind:value={age}>
            </div>

            <div class="formEntry">
                <label>Country</label>
                <select bind:value={selectedCountryCode}>
                    {#each countries as country (country.code)}
                        <option value={country.code}>{country.name}</option>
                    {/each}
                </select>
            </div>

            <div class="formEntry">
            <label>Bio</label>
            <input type="text" bind:value={bio}>
            </div>

            <div class="formEntry">
                <label>Institution</label>
                <input type="text" bind:value={institution}>
            </div>
        
            <button on:click={handleSubmit}>Submit</button>
        
        </main>

    </SignedOut>

    

</FirebaseApp>
