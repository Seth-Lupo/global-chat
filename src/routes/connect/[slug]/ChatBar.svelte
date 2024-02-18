<script>
  import { goto } from "$app/navigation";
  import LogOutButton from "$lib/LogOutButton.svelte";
  import { signOut } from "firebase/auth";
  import { getContext } from "svelte";
  import chatState from "$lib/chatState"

    let db = getContext("db")
    let auth = getContext("auth")


    let logOut = () => {
        signOut(auth);
    }

</script>

<style>
    main {
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #barDiv {
        display: flex;
        flex-flow: column;
        background-color: white;
        padding: 1rem;
        
        box-shadow: 2px 2px 5px grey;
        margin: 0 1rem;
        border-radius: 1rem 0 0 0;

        

    }


    
    button {    
        background-color: whitesmoke;
        font-size: 1rem;
        padding: 1rem;
        border-radius: 0.25rem;
        margin: 0.25rem;
        transition: background-color 0.3s;
        
    }

    button:hover {
        background-color: lightgray;
    }

    .radioButton {
        margin: 0;
        border: 0;
        
        border-radius: 0;
        padding: 0.75rem;

        width: 100%;
        

    }

    .topRadio {
        border-radius: 0.5rem 0.5rem 0 0;
    }

    .bottomRadio {
        border-radius: 0 0 0.5rem 0.5rem;
    }

    #radioDiv {
        align-items: center;

        display: flex;
        flex-direction: column;

        padding: 0.5rem;

        height: min-content;

    }

    .active {
        background-color: #90EE90;
    }

</style>

<main>
    <div id="barDiv">
        
        <button on:click={() => {goto("/")}}>Home</button>
        <button on:click={logOut}>Log Out</button>

        <div id="radioDiv">
        
            <button class="radioButton topRadio" class:active={$chatState == 0} on:click={() => {chatState.set(0)}}>Chat</button>
            <button class="radioButton" class:active={$chatState == 1} on:click={() => {chatState.set(1)}}>Profiles</button>
            <button class="radioButton bottomRadio" class:active={$chatState == 2} on:click={() => {chatState.set(2)}}>Map</button>

        </div>
        
    </div>
</main>

