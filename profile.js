"use strict";

/* ================= HOME TYPING EFFECT ================= */

const typingTexts = [
    {
        element: "name",
        text: "Hello I'm Matogolo",
        speed: 120
    },
    {
        element: "title",
        text: "I'm Web Developer & Designer",
        speed: 90
    },
    {
        element: "description1",
        text: "I create modern websites, mobile applications, fast responsive and user-friendly systems with creative digital solutions for businesses and organizations.",
        speed: 45
    }
];


function typeWriter(elementId, text, speed){

    return new Promise((resolve)=>{

        const element = document.getElementById(elementId);

        if(!element){
            resolve();
            return;
        }


        element.textContent = "";

        let index = 0;


        function typing(){

            if(index < text.length){

                element.textContent += text.charAt(index);

                index++;

                setTimeout(typing, speed);

            }else{

                resolve();

            }

        }


        typing();

    });

}



async function startTyping(){

    for(const item of typingTexts){

        await typeWriter(
            item.element,
            item.text,
            item.speed
        );


        await new Promise(resolve=>{

            setTimeout(resolve,600);

        });

    }

}



window.addEventListener("load",()=>{

    startTyping();

});





/* ================= SCROLL ANIMATION ================= */


if("IntersectionObserver" in window){


    const observer = new IntersectionObserver(

        (entries)=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    entry.target.classList.add("show");


                    observer.unobserve(entry.target);


                }


            });


        },

        {
            threshold:0.2
        }

    );



    document
    .querySelectorAll(".hidden")
    .forEach(element=>{


        observer.observe(element);


    });



}else{


    document
    .querySelectorAll(".hidden")
    .forEach(element=>{


        element.classList.add("show");


    });


}







/* ================= CONTACT FORM ================= */


const form = document.getElementById("contact-form");

const message = document.getElementById("form-message");



if(form){


form.addEventListener("submit", async function(e){


    e.preventDefault();



    const button = form.querySelector("button");


    const originalText = button.innerHTML;



    button.disabled = true;


    button.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';



    const formData = new FormData(form);



    const controller = new AbortController();



    const timeout = setTimeout(()=>{

        controller.abort();

    },10000);




    try{


        const response = await fetch(

            "https://formspree.io/f/mbdnqoja",

            {

                method:"POST",

                body:formData,

                headers:{
                    "Accept":"application/json"
                },

                signal:controller.signal

            }

        );



        clearTimeout(timeout);



        if(response.ok){


            message.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Message sent successfully!';


            message.style.color="lightgreen";


            form.reset();



        }else{


            message.innerHTML =
            '<i class="fa-solid fa-circle-xmark"></i> Failed to send message.';


            message.style.color="red";


        }



    }catch(error){



        message.innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> Network error. Try again.';


        message.style.color="red";



    }




    setTimeout(()=>{


        message.innerHTML="";


    },5000);




    button.innerHTML = originalText;


    button.disabled=false;



});

}





/* ================= GRAPHIC GALLERY ================= */


const gallery = document.getElementById("graphicPreview");



function openGallery(){


    if(!gallery) return;


    gallery.style.display="block";


    document.body.style.overflow="hidden";


}



function closeGallery(){


    if(!gallery) return;


    gallery.style.display="none";


    document.body.style.overflow="";


}




document.addEventListener("keydown",(event)=>{


    if(event.key==="Escape"){


        closeGallery();


    }


});





if(gallery){


gallery.addEventListener("click",(event)=>{


    if(event.target === gallery){


        closeGallery();


    }


});


}







/* ================= FOOTER YEAR ================= */


const year = document.getElementById("year");



if(year){


    year.textContent = new Date().getFullYear();


}







/* ================= MOBILE MENU ================= */


const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.getElementById("nav-menu");




function toggleMenu(){


    if(!navMenu || !menuToggle) return;



    const opened =
    navMenu.classList.toggle("active");



    menuToggle.setAttribute(
        "aria-expanded",
        opened
    );


}





if(menuToggle){


    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


}




document
.querySelectorAll("#nav-menu a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        navMenu.classList.remove("active");


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


    });


});





/* CLOSE MENU OUTSIDE CLICK */


document.addEventListener("click",(event)=>{


    if(!navMenu || !menuToggle) return;



    if(

        navMenu.classList.contains("active")

        &&

        !navMenu.contains(event.target)

        &&

        !menuToggle.contains(event.target)

    ){


        navMenu.classList.remove("active");


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


    }


});