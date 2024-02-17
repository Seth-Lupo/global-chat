<script>

    import { FirebaseApp, SignedIn, SignedOut, User, Doc } from 'sveltefire'
    import { getContext } from "svelte";
  import { signOut } from 'firebase/auth';

  

    let db = getContext("db")
    let auth = getContext("auth")


    let logOut = () => {
        signOut(auth);
    }

</script>

<button on:click={logOut}> Log Out</button>