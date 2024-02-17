<script>

    import { FirebaseApp, SignedIn, SignedOut, User, Doc } from 'sveltefire'
    import { getContext } from "svelte";
    import LogOutButton from '$lib/LogOutButton.svelte';
    import { goto } from '$app/navigation';

    import { onMount } from "svelte"

    let db = getContext("db")
    let auth = getContext("auth")

    onMount(async () => {
        auth.onAuthStateChanged(async () => {
            if (!auth.currentUser) {
                await goto("/log-in")
            }
        }) 
    }) 


</script>

<FirebaseApp firestore={db} auth={auth}>
   
    <SignedIn>
        <LogOutButton></LogOutButton>
    </SignedIn>

</FirebaseApp>