document.addEventListener("DOMContentLoaded",(e)=>{
    /*
    Document's elements queries
    */
    const header = document.getElementsByTagName("header")[0];
    const otherInfo = document.querySelector("#home .other-info");
    const socialLinks = document.querySelector("#home .social-links");
    const skipBtn = document.getElementById("skipBtn");
    const menuToggleBtn = document.getElementById("toggle-menu-btn");
    const menuToggleBtnText = document.querySelector("#toggle-menu-btn span");
    const menuToggleBtnIcon = document.querySelector("#toggle-menu-btn i");
    const menu = document.getElementsByClassName("menu-wrapper")[0];
    const localTime = document.getElementById("localTime");
    let activeMenuItem = document.createElement("a");
    const menuItems = document.querySelectorAll("nav ul li a");
    
    const skillItems = Array.from(document.getElementsByClassName("skill-item"));
    const skillFilters = document.querySelectorAll("#skills .button-tag input");
    const experienceDetails = document.querySelectorAll(".experience-details");

    menuItems.forEach((item)=>{
        item.addEventListener("click",()=>{
            item.classList.toggle("active");
            activeMenuItem.classList.toggle("active");
            activeMenuItem = item;
        })
    })
    setTimeout(()=>{
        header.style.opacity = "1";
        document.getElementsByTagName("html")[0].style.overflowY = "scroll";
        //skipBtn.style.opacity = "0";
        //skipBtn.disabled = true;
        otherInfo.style.opacity = "1";
        socialLinks.style.opacity = "1";

    }
    ,9000);


    menuToggleBtn.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden");
        menuToggleBtnText.innerText = menu.classList.contains("hidden") ?  "Open Menu":"Close menu";
        menuToggleBtnIcon.classList.toggle("fa-bars");
        menuToggleBtnIcon.classList.toggle("fa-xmark")
    });

    experienceDetails.forEach((details)=>{
        details.addEventListener("click", (e)=>{
            details.classList.toggle("show");
        });
    })

    skillFilters.forEach(filter => {
        filter.addEventListener("change",()=>{
            let chosenFilter = filter.value;
            skillItems.forEach(item =>{
                if(item.getAttribute("tags").split(",").includes(chosenFilter)){
                    item.classList.toggle("active");
                }
            })     
        });
    })
    fetch("http://worldtimeapi.org/api/timezone/America/Vancouver")
        .then(data=>{
            return data.json();
        })
        .then(json=>{
            let dateTime = json.datetime.split(".")[0];
            localTime.innerText = new Date(dateTime);
            let interval = setInterval(async ()=>{
                fetch("http://worldtimeapi.org/api/timezone/America/Vancouver")
                .then(data=>{
                    return data.json();
                })
                .then(json=>{
                    let dateTime = json.datetime.split(".")[0];
                    localTime.innerText = new Date(dateTime);
                })
                .catch(e=>{
                    console.log(e);
                    clearInterval(interval);
                })        
            },
            1000);
        })
        .catch(e=>{
            console.log(e);
        }) 
    window.addEventListener("scroll",(e)=>{
        if(window.scrollY != 0){
            header.classList.add("opaque");
        }else{
            header.classList.remove("opaque");
        }
    })
});