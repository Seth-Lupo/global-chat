<script>
    import { page } from '$app/stores';
    import Chatroom from './Chatroom.svelte';
    import ChatBar from "./ChatBar.svelte"
    import Map from './Map.svelte'

    import chatState from '$lib/chatState';
    import Profiles from './Profiles.svelte';
    
    import * as flags from 'svelte-flags';

    let Icon = flags.Icon
    function toCamel(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }


</script>



<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 100vh;
        background-color: black;

    }
</style>



<main>
    <ChatBar></ChatBar>

    <Chatroom chatroomID={$page.params.slug}></Chatroom>
    <Profiles chatroomID={$page.params.slug} ></Profiles>
    <Map chatroomID={$page.params.slug}></Map>
   
</main>
