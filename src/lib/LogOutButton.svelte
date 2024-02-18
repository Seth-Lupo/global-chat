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

<style>
  button {
      background-color: whitesmoke;
      font-size: 1rem;
      padding: 1rem;
      border-radius: 0.25rem;
      margin: 0.25rem;
      transition: background-color 0.3s;
  }

</style>

<button on:click={logOut}>Global Chat</button>