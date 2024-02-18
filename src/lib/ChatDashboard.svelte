<script>

    import { FirebaseApp, SignedIn, SignedOut, User, Doc, Collection } from 'sveltefire'
    import { getContext } from "svelte";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { doc, setDoc, addDoc, collection, onSnapshot, getDocs} from "firebase/firestore"
    import getUserInfo from '$lib/getUserInfo';
    import * as flags from 'svelte-flags';
    import chatState from '$lib/chatState';

    let db = getContext("db");
    let auth = getContext("auth");

    let getUserChatRooms = async () => {
        
        let userChatsDocs = collection(db, `userInfo/${auth.currentUser.uid}/chats`);
        let userChats = await getDocs(userChatsDocs);

        console.log(userChats.docs)

        for (let chat of userChats.docs) {
            console.log(chat.data())
        }

        

    }


    let secondsToDate = (seconds) => {
        let date = new Date(seconds*1000);
        return date.toDateString();
    }

    onMount(() => {
        getUserChatRooms();
    })

    let sortingFunction = (x, y) => {
        if (x.date.seconds > y.date.seconds) {
            return -1
        } else if (x.date.seconds < y.date.seconds) {
            return 1
        } else {
            return 0
        }
    }

   


</script>

<style>

    #linkDiv {
        display: flex;
        flex-direction: column;

        margin: 1rem 0;
    }

    main{
        margin: 1rem;
        background-color: white;
        box-shadow: 2px 2px 5px grey;
        padding: 1rem;
        width: fit-content;
    }

    #latestRoom {
        font-size: 2rem;
        margin: 3rem 0 ;
    }

    h4 {
        font-size: 2rem;
    }


</style>

<main>

    <Collection ref={`userInfo/${auth.currentUser.uid}/chats`} let:data let:count>
        
        {#if data.length > 0}

            <a id="latestRoom" href="connect/{data.sort(sortingFunction)[0].chatroomID}">Latest ({secondsToDate(data.sort(sortingFunction)[0].date.seconds)})</a>

            <div id="linkDiv">
                <h4>Past Chat Rooms</h4>
                {#each data.sort(sortingFunction) as chatroom}
                    <a href="connect/{chatroom.chatroomID}">{secondsToDate(chatroom.date.seconds)}</a>
                {/each}
            </div>

        {:else} 
            <h4>You are in no rooms. You will be matched shortly.</h4>
        
        {/if}

            

    </Collection>




</main>

