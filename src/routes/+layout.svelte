<script>
    
    import { FirebaseApp, SignedIn, User, Doc } from 'sveltefire'
    import { initializeApp} from 'firebase/app'
    import { getFirestore } from 'firebase/firestore'
    import { getAuth} from 'firebase/auth'
    import { SignedOut } from 'sveltefire';

	import { getContext, setContext } from 'svelte';
	
	import './styles.css';

    const firebaseConfig = {
		apiKey: "AIzaSyBoEKe4ADUmVm7vyag2AlNoR4Fe3THUQOo",
		authDomain: "global-chat-9b9c9.firebaseapp.com",
		projectId: "global-chat-9b9c9",
		storageBucket: "global-chat-9b9c9.appspot.com",
		messagingSenderId: "455928957368",
		appId: "1:455928957368:web:90971061f0fe9fd168a74d",
		measurementId: "G-77KXQ96CZG"
	};
    
    const app = initializeApp(firebaseConfig);
    
	const db = getFirestore(app);
    const auth = getAuth(app);

	setContext("db", db)
	setContext("auth", auth)

	import "@fontsource/roboto";
	import "@fontsource/open-sans";
	import "@fontsource/raleway";


</script>



<style>

	
    :root {
        font-family: "Raleway";
        
    }

    /* :global(*) {
        box-sizing: border-box;
		margin: 0;
		padding: 0;
    } */


</style>

<slot db={db} auth={auth} />


