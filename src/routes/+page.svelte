<script>

    import { FirebaseApp, SignedIn, SignedOut, User, Doc } from 'sveltefire'
    import { getContext } from "svelte";
    import LogOutButton from '$lib/LogOutButton.svelte';
    import { goto } from '$app/navigation';

    import getUserInfo from "$lib/getUserInfo"

    import { onMount } from "svelte"
  import ChatDashboard from '$lib/ChatDashboard.svelte';

    let db = getContext("db")
    let auth = getContext("auth")

    

    let userInfo

    onMount(async () => {
        auth.onAuthStateChanged(async () => {
            if (!auth.currentUser) {
                await goto("/log-in")
            }
            userInfo = await getUserInfo(db, auth)
            
        })
    })

    


</script>

<style>

    #headerDiv {
        width: 100%;
        height: 10rem;
        display: flex;
        background-color: black;
        justify-content: space-between;
        padding: 2rem;
        align-items: center;

    }

    #leftHeader {

    } 

    #rightHeader {
        display: flex;


    }

    #rightHeader > * {
        margin: 1rem;
    }

    h1 {
        color:green;
    }

    h2 {
        color:white;
    }

</style>

<FirebaseApp firestore={db} auth={auth}>
   
    <SignedIn>

        <div>
            <div id="headerDiv">
                <div id="leftHeader">
                    <h1>Global Chat</h1>
                </div>

                <div id="rightHeader">
                    <h2><i>Hello {userInfo ? userInfo.firstName : ""} 👋</i></h2>
                    <LogOutButton></LogOutButton>
                </div>
            </div>
                

            <ChatDashboard></ChatDashboard>
        </div>
        
    </SignedIn>

</FirebaseApp>