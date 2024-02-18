<script>

    export let userInfo
    import * as flags from 'svelte-flags';

    import countries from '$lib/countries.json'
    import languages from '$lib/languages.json'

    let Icon = flags.Icon
    function toCamel(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function getCountryNameByCode(code) {
        const country = countries.find(country => country.code === code.toUpperCase());
        return country ? country.name : null;
    }

    function getLanguageNameByCode(code) {
        const country = languages.find(country => country.code === code.toLowerCase());
        return country ? country.name : null;
    }

</script>

<style>

    main {
        width: 100%;
        background-color: rgb(240, 240, 240);
        height: 14vw;
        margin: 1rem;

        display: flex;
        flex-direction: row;

        align-items: center;

        padding: 1rem;
    }

    main > * {
        margin: 1rem;
    }

   #nameDiv {
    display:flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
    box-shadow: 2px 2px 5px grey;

    aspect-ratio: 1/1;

    justify-content: center;
    align-items: center;
    

    width: fit-content;

   }

   h1 {
    font-size: 2rem;
    font-style:bold;
   }
    
   #countryDiv {
    display:flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
    box-shadow: 2px 2px 5px grey;

    aspect-ratio: 1/1;

    justify-content: center;
    align-items: center;
    

    width: fit-content;
   }

   #otherDiv {
    display:flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
    box-shadow: 2px 2px 5px grey;

    aspect-ratio: 1/1;

    justify-content: center;
    align-items: center;

    
   }

   #bioDiv {

    
    height: 100%;
    background-color: white;
    box-shadow: 2px 2px 5px grey;

    flex-grow: 2;

    padding: 1rem;

 

   }

   h1,h2,h3 {
    text-align: center;
   }

   h1 {
    font-size: 4.5vh;
   }

   h2 {
    font-size: 3vh;
   }

   h3 {
    font-size: 3.75vh;
   }

   p {
    font-size: 1.5vh;
   }

</style>

<main>
    <div id="nameDiv">
        <h1><b>{userInfo.firstName}</b></h1>
        <h1><b>{userInfo.lastName}</b></h1>
    </div>

    <div id="countryDiv">
        <Icon size={70} icon={flags[toCamel(userInfo.country)]}/>
        <h2><b>{getCountryNameByCode(userInfo.country)}</b></h2>
        <h2><i>{getLanguageNameByCode(userInfo.language)}</i></h2>
    </div>

    

    <div id="otherDiv">
        <h2>{userInfo.age} Years Old,</h2>
        <h3>{userInfo.institution}</h3>
    </div>

    <div id="bioDiv"><p>{userInfo.bio}</p></div>




</main>