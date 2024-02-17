<script>
    
    import SignUp from "$lib/SignUp.svelte"
    import { onMount } from "svelte";
    import { getContext } from "svelte";
    import { goto } from '$app/navigation';

    let db = getContext("db")
    let auth = getContext("auth")

    
    
</script>

<style>

    main {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100vh;
        width: 100vw;

        margin: 0;
        padding: 0;
    }

</style>

<main><SignUp></SignUp></main>

