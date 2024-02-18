<script>

    import { FirebaseApp, SignedIn, SignedOut, User, Doc, Collection } from 'sveltefire'
    import { getContext } from "svelte";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { doc, setDoc, addDoc, collection, onSnapshot, getDocs} from "firebase/firestore"
    import getUserInfo from '$lib/getUserInfo';
    import * as flags from 'svelte-flags';
    import chatState from '$lib/chatState';

    export let chatroomID

    var userInfo = {}

    let translatedMessages = {

    }



    let requestTranslatedMessage = (message) => {



        if (!(message.text in translatedMessages)) {

            
            translatedMessages[message] = "↻"
            
            fetch(`/translator?text=${message}&language=${userInfo.language}`).then((response) => {
                response.text().then((text) => {
                    translatedMessages[message] = text
                })
            })


        }

        return ""

    }

    let getTranslatedMessage = (message) => {
        if (message.text in translatedMessages) {
            return translatedMessages[message]
        } else {
            return message
        }
    }

    let Icon = flags.Icon
    function toCamel(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    let db = getContext("db")
    let auth = getContext("auth")

    let allowedUserIDs = []
    let userAuthorized = false

    let getAllowedUserIDs = async () => {
        
        let allowedUsersCollection = collection(db, `chatrooms/${chatroomID}/allowedUsers`)
        let allowedUsers = await getDocs(allowedUsersCollection)
        allowedUsers.forEach((doc) => {
            allowedUserIDs.push(doc.id)
        });
        
        if (allowedUserIDs.includes(auth.currentUser.uid)) {
            userInfo = await getUserInfo(db, auth);
            userAuthorized = true
        } else {
            goto("/")
        }

    }

    

    onMount(async () => {

        

        await getAllowedUserIDs();

        let messageCollection = collection(db, `chatrooms/${chatroomID}/messages`)
        onSnapshot(messageCollection, async (snapshot) => {
            await new Promise(resolve => setTimeout(resolve, 10));
            // console.log(translatedMessages)
            messageDiv.scrollTop = messageDiv.scrollHeight
        });

        auth.onAuthStateChanged(async () => {
            if (!auth.currentUser) {
                await goto("/log-in")
            } else {
                userInfo = await getUserInfo(db, auth);
            }
            
        }) 

    })

    let messageDiv
    

    let sortingFunction = (x, y) => {

        if (x.date.seconds > y.date.seconds) {
            return 1
        } else if (x.date.seconds < y.date.seconds) {
            return -1
        } else {
            return 0
        }
    }

    let newMessage = ""

    let sendNewMessage = async () => {
        
        if (newMessage == "") return

        let messagesDoc = await collection(db, `chatrooms/${chatroomID}/messages`)
        addDoc(messagesDoc, {
            text: newMessage,
            date: new Date(),
            authorID : auth.currentUser.uid,
            authorName: userInfo.firstName + " " + userInfo.lastName,
            authorCountry: userInfo.country,
            AuthorLanguage: userInfo.language,
        })
        newMessage = ""
    }

    let inputEntered = (event) => {
        if (event.key === 'Enter') {
            sendNewMessage()
        }
    }

</script>

<style>

    .inactive {
        display: none !important; 
    }

    #parent {
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 60vw;
        height: 90vh;

        background-color: white;
        box-shadow: 2px 2px 5px grey;
        /* border: solid 1px green; */

        border-radius: 1rem 1rem 0 0;
        padding: 1rem;

        min-width: 80vh;
        

    }



    #headerDiv {
        width: 100%;
        /* border-left: green 2px solid;
        border-right: green 2px solid;
        border-top: green 2px solid; */
        display: flex;
        justify-content: center;
        padding: 0.75rem;

        border-radius: 5px 5px 0 0 ;

        box-shadow: 0px 5px 10px white;
        z-index: 100;
    }

    #messageDiv {

        flex-grow: 10;
        width: 100%;

        /* border-left: green 2px solid; */
        /* border-right: green 2px solid; */

        padding-left: 0.5rem;
        padding-right: 0.5rem;
        overflow-y: scroll;

        display: flex;
        flex-direction: column;
        /* align-items: center; */

    }

    #messageDiv > * {
        margin: 1rem 0;
    }

    #inputDiv {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    input {
        height: 2rem;
        width: 100%;
        font-size: 1.25rem;
        border: 0.1px grey solid;
        border-radius: 3px;
    }

    #sendButton {
        height: 2rem;
        aspect-ratio: 1 / 1;
        margin: 0.5rem;
        margin-right: 0;
        background-color: rgb(200 255 211);
        transition: background-color 0.1s;
    }

    #sendButton:hover {
        background-color: green;
    }

    .messageOther {
        background-color: rgb(190 255 190);
        padding: 0.5rem;
        width: 30rem;
        border-radius: 1rem 1rem 1rem 0rem;

        font-size: 0.9rem;

        align-self: start;
        box-shadow: 1px 1px 2px grey;
    }

    .messageSelf {
        background-color: rgb(190 235 180);
        padding: 0.5rem;
        width: 30rem;
        border-radius: 1rem 1rem 0rem 1rem;
        font-size: 0.9rem;

        align-self: end;

        box-shadow: 1px 1px 2px grey;
    }

    .messageOther * {
        text-align: left;
        flex-direction: row;
       
    }

    .messageSelf * {
        text-align: right;
        flex-direction: row-reverse;
        
    }

    .messageHeader {
        display: flex;
        align-items: center;
    }

    .author {
        margin: 0 0.25rem;
    }

    .messageText {
        display: flex;
        flex-direction: column;
    }
    .flag {
        padding: 1rem;
    }


</style>

{#if userAuthorized}

        <FirebaseApp firestore={db} auth={auth}>
        
            <SignedIn>

                <div id="parent" class:inactive={$chatState != 0}>

                    <div id="headerDiv">
                        <h1>Chat</h1>
                    </div>

                    <div id="messageDiv" bind:this={messageDiv}>

                        <Collection ref={`chatrooms/${chatroomID}/messages`} let:data let:count>

                            
                                {#each data.sort(sortingFunction) as message}
                                    
                                    <div class={(message.authorID == auth.currentUser.uid) ? "messageSelf" : "messageOther"}>
                                        
                                            <div class="messageHeader">
                                                <Icon size={30} icon={flags[toCamel(message.authorCountry)]}/>
                                                <p class="author"><b>{message.authorName}</b></p>
                                                <p><i>{new Date(message.date.seconds*1000).toTimeString().slice(0, 8)}</i></p>
                                            </div>
                                            
                                            {requestTranslatedMessage(message.text)}
                                            
                                            {#key translatedMessages[message.text]}
                                                <p>{translatedMessages[message.text]}</p>
                                            {/key}
                                                
                                            
                                            
                                        
                                    </div>

                                {/each}
                                    
                                
                            
                    
                        </Collection>

                    </div>

                    <div id="inputDiv">

                        
                        
                        <input type="text" on:keydown={inputEntered} bind:value={newMessage}>
                        <button  id="sendButton" on:click={sendNewMessage}></button>

                    </div>

                    

                </div>


                
                

            </SignedIn>

        </FirebaseApp>

{/if}