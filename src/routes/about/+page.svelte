<script>

    import Icon1 from "$lib/assets/collegestudents.jpg"
    import Icon2 from "$lib/assets/map.jpg"
    import Icon3 from "$lib/assets/userInterface.jpg"
    import Icon4 from "$lib/assets/userProfile.jpg"
    import Icon5 from "$lib/assets/youngstudents.jpg"

    import { goto } from "$app/navigation"

    let signup = () => {
        goto("sign-up")
        alert("HEY")
    }

</script>

<style>

/* import "@fontsource/roboto";
import "@fontsource/open-sans";
import "@fontsource/raleway"; */
/* background-color: rgb(245 245 245); */



*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* Change the font */
    font-family: 'Chivo Mono', sans-serif;                                     
    scroll-behavior: smooth;
    text-decoration: none;


    
}


.navbar__links:hover {
  /* change the hover colour to green tmrw */
  color: #41913c;
  transition: all 0.3s ease;
}

.navbar__menu{
  display: flex;
  align-items: center;
  list-style: none;


}



.navbar__links{
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  text-decoration: none;
  height: 100%;
  transition: all .3s ease;

}


.navbar__btn{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
}

.registration_container{
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 10px 20px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  
  /* find a better linear gradient */
  background: #200122;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6f0000, #200122);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #6f0000, #200122); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: #fff;
  transition: all 0.3s ease;
}



/* new code */

    
.header {
  background: #131313;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
} 

.logo_container{
  display: flex;
  justify-self: space-between;
  height: 60px;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 50px;
  
}
    
.logo_container {
  background: #76b852;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #8DC26F, #76b852);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #8DC26F, #76b852); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  
}

.header_toggle{
  display: flex;
  align-items: center;
  list-style: none;


}

.navbar__item{
  height: 60px;
}

#navbar_btn{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
}
    /* padding: 50px; */
    




  

  .intro_box {
    width: 100%;
    height: 400px;
    background: #131313;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    text-decoration-thickness: 300;
    position: sticky;
    top: 0;
    z-index: -1;
    margin: 0 auto;
    padding: 0 0;
  }

  .about_container{
    width: auto;
    position: absolute;
    height: 1200px;
    background: #41913c;
    color: #fff;
    display: flex;
    justify-self: space-between;
    /* align-items: center; */
    font-size: 1.2rem;
    text-decoration-thickness: 300;
    position: sticky;
    top: 0;
    z-index: -1;
    margin: 0 auto;
    padding: 0 0;
  }

  .about_container h1{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    height: 30%;
    text-align: center;
    /* padding: 30px; */
  }

  .about_container h2{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    
  }
  .information_about{
    align-items: center;
    padding: 50px 30px;
    margin: 0 auto;
  }

  .information_about h2{
    font-size: 3rem;
    font-weight: 300;
  }
  
  .information_about p {
    font-weight: 100;
    font-size: 1rem;
    padding: 30px;
    text-align: center;
  }


  .image_grid{
    --gap: 32px; 
   --num-cols: 2;
   --row-height: 400px;
   box-sizing: border-box;
   padding: var(--gap);
    display: grid;
    grid-template-columns: repeat(var(--num-cols), 1fr);
   grid-auto-rows: var(--row-height);
   gap: var(--gap);
  }


  .image_grid > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
/* 
@media screen and (max-width: 960px) {
  .image_grid{
      --num-cols: 1;
      --row-height: auto;
      
  }
  .about_container{
    padding: 25px;
  }
  
} */

/* Registration Section */


.registration_container{
    width: auto;
    position: absolute;
    height: 500px;
    background: #41913c;
    color: #fff;
    display: flex;
    justify-content: space-around;
    /* align-items: center; */
    font-size: 1.2rem;
    text-decoration-thickness: 300;
    position: sticky;
    top: 0;
    z-index: -1;
    margin: 0 auto;
    padding: 0 0;
}
/* for the introducttion text */
.registration_container h1{
  align-items: center;
  text-align: center;
  color: #fff;
  text-align: center;
  margin-left: 50px;
}

.button_register {
  font-size: 1.8rem;
  
  background: #bc4e9c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f80759, #bc4e9c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f80759, #bc4e9c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  

  color: #131313;
  width: 25%;
  height: 20%;
  align-items: center;
  border: none;
  border-radius: 20px;
  
  cursor: pointer;
  position: relative;
  transition: all 0.35s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;


}


#register_button{
  font-size: 30px;
  color: white;
  
}










  /* footer section of website */
  .footer__container {
    background-color: #131313;
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #footer__logo {
    color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
  }

  .website__rights {
    color: #fff;
  }

 

  
  /* .image_grid-col-2 {
    grid-column: span 2;
}
  .image_grid-row-2{
    grid-row: span 2;
} */


  

</style>


    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat Title</title>
        
    
    
    </head>
    
    <!-- navbar for webpage -->

    <nav class="header">
        <div class="logo_container">
            <a href="/" id="our_logo" >Global Chat</a>
        

        </div>
        <div class="navbar__toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>

        <ul class="header_toggle">
            <li class="navbar_item">
                <a href="#about" class="navbar__links" id="profile-page">About</a>
            </li>
            <li class="navbar_item">
                <a href="#signup" class="navbar__links" id="career-page">Sign Up</a>
            </li>
            <li class="navbar_item" id="navbar_btn">
                <a href="log-in" class="navbar__links" id="career-page">Log In</a>
            </li>
            <!-- <li class="navbar__btn">
                <a href="#about" class="navbar__links" id="about-page">About Me</a>
            </li> -->
        </ul>
    </nav>
   
     <!-- Make Navbar * fix the contraction of the screen
     <nav class="navbar">
        <div class="navbar__container">
            <a href="#home" id="navbar__logo" >Brian Becker</a>
        
        <div class="navbar__toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>

        <ul class="navbar__menu">
            <li class="navbar__item">
                <a href="#profile" class="navbar__links" id="profile-page">Profile</a>
            </li>
            <li class="navbar__item">
                <a href="#portfolio" class="navbar__links" id="career-page">Portfolio</a>
            </li>
             <li class="navbar__item">
                <a href="#career" class="navbar__links" id="career-page">Career</a>
            </li> 
            <li class="navbar__btn">
                <a href="#about" class="navbar__links" id="about-page">About Me</a>
            </li>
        </ul>
    </nav> -->
    
    
    <div class = "body"> 
    
    <!-- main image section -->
    <main class="app">
        <div class = "intro_box">
            <img src={Icon1} alt="Global Chat future Participants">
        </div>

        <div class = "about_container" id="about">
            
            <div class = "title_about">
            
        </div>
            <div class="information_about">
                
        <h2>We are a global chat app focused on removing cultural inequalities</h2> 
            <!-- <p>Designed by tufts university students, ___ more information on chatbot app for customers ____</p> -->
        <p>Joining will match you with plenty of students across the world, joining an interconnected community. We aim to for you to make an effort and communicate in the other person's native language.</p>
        <div class="image_grid">
            <img src={Icon2} alt="map of world">
            <img src={Icon3} alt="people chatting">
            <img src={Icon4} alt="Sample profile">
            <img src={Icon5} alt="Global Chat future Participants">
        
        </div>
    </div>
</main>
<div on:click={signup}  class="registration" id="signup">
    <div on:click={signup}  class = "registration_container">
        <h1>Register to join an interconnected community</h1>
        <div on:click={signup} class="button_register">
        <a href="sign-up" id="register_button">Sign Up!</a>
        </div>
    </div>
    

</div>
</div> 
    
        
   






    
    <!-- Footer Section -->

    <div class="footer__container">
        <div class="footer__links">

            <div class="footer__link--wrapper">
                <p class="website__rights">© Seth Lupo, Brian Becker, Benson Jiang, Shema Placide for JumboHack 2024. All rights reserved</p>
            </div>
        </div>
    </div>




