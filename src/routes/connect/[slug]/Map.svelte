<script>
  import { onMount, onDestroy } from "svelte";
  import pkg from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";
  import chatState from "$lib/chatState";
  import { getContext } from "svelte";

  import { collection, getDocs, getDoc } from "firebase/firestore";
  import { doc } from "firebase/firestore";

  const { Map, NavigationControl, Marker, Popup } = pkg;

  export let chatroomID;

  let db = getContext("db");
  let auth = getContext("auth");

  let map;
  let mapContainer;

  const apiKey = "MnBRzIJOWxkTMhc4kVeq";

  onMount(async () => {
    const initialState = { lng: 0, lat: 35.6844, zoom: 1 };

    let getUserCountries = async () => {
      let allowedUserIDs = [];
      let allowedUsersCollection = collection(
        db,
        `chatrooms/${chatroomID}/allowedUsers`
      );
      let allowedUsers = await getDocs(allowedUsersCollection);

      let userCountries = {};

      for (let userDoc of allowedUsers.docs) {
        let userInfoDoc = doc(db, `userInfo/${userDoc.id}`);
        let userInfo = await getDoc(userInfoDoc);

        if (!(userInfo.data().country in userCountries)) {
          userCountries[userInfo.data().country] = [];
        }
        userCountries[userInfo.data().country].push(userDoc.id);
      }

      let codeString = Object.keys(userCountries).join("").toLowerCase()

      console.log(codeString)
      let borderDataDictResponse = await fetch(`/geodata?codes=${codeString}`)
      let borderDataDict = await borderDataDictResponse.json();

      console.log(borderDataDict)
      
      for (let [code, borderData] of Object.entries(borderDataDict)) {
        
            map.addSource(code, {
              type: "geojson",
              data: borderData,
            });

            map.addLayer({
              id: code,
              type: "fill",
              source: code,
              paint: {
                "fill-color": "#088",
                "fill-opacity": 0.5,
              },
            });
        
          map.on("load", () => {

            map.addSource(code, {
              type: "geojson",
              data: borderData,
            });

            map.addLayer({
              id: code,
              type: "fill",
              source: code,
              paint: {
                "fill-color": "#088",
                "fill-opacity": 0.5,
              },
            });

          })     

      }
    };

    getUserCountries();

    map = new Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/backdrop/style.json?key=${apiKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    onDestroy(() => {
      map.remove();
    });
  });
</script>


<div class="map-wrap" class:inactive={$chatState != 2}>
  <a href="https://www.maptiler.com" class="watermark"
    ><img
      src="https://api.maptiler.com/resources/logo.svg"
      alt="MapTiler logo"
    /></a
  >
  <div class="map" bind:this={mapContainer}></div>
</div>

<style>
  .inactive {
    display: none !important;
  }
  .map-wrap {
    position: relative;
    width: 100%;
    height: 90vh; /* calculate height of the screen minus the heading */
    min-width: 80vh;
    width: 60vw;
    height: 90vh;
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .watermark {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 999;
  }
</style>
