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
    }


</style>

<main>

    <Collection ref={`userInfo/${auth.currentUser.uid}/chats`} let:data let:count>
        
        {#if data.length > 0}

            <a href="connect/{data.sort(sortingFunction)[0].chatroomID}">Latest Chat Room</a>

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

