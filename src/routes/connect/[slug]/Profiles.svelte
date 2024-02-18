<script>

    export let chatroomID

    import chatState from "$lib/chatState";
    import Profile from "./Profile.svelte";
    import { getContext, onMount } from "svelte"
    import {collection , getDoc, getDocs, doc} from "firebase/firestore"

    let db = getContext("db");
    let auth = getContext("auth");

    $: userInfoList = []

    let getUserInfo = async () => {
        
        let allowedUserIDs = [];
        let allowedUsersCollection = collection(db, `chatrooms/${chatroomID}/allowedUsers`);
        let allowedUsers = await getDocs(allowedUsersCollection);

        for (let userDoc of allowedUsers.docs) {

            let userInfoDoc = doc(db, `userInfo/${userDoc.id}`)
            let userInfo = await getDoc(userInfoDoc)

            console.log(userInfo.data().firstName)

            userInfoList.push(userInfo.data())
            userInfoList = userInfoList

        }
    
    };

    onMount(async () => {
        getUserInfo()
    })

</script>

<style>

    .inactive {
        display: none;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 60vw;
        height: 90vh;

        background-color: white;
        box-shadow: 2px 2px 5px grey;
        /* border: solid 1px green; */

        border-radius: 1rem 1rem 0 0;
        padding: 1rem;

        min-width: 80vh;

        overflow-y: scroll;
    }


</style>

<main class:inactive={$chatState != 1}>

    {#key userInfoList}
        {#each userInfoList as userInfo}
            <Profile  userInfo={userInfo}></Profile>
            
        {/each}
    {/key}

</main>