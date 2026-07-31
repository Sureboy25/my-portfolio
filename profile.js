// ================= HOME TYPING EFFECT =================
const typingTexts = [
    {
        element:"name",
        text:"Hello I'm Matogolo",
        speed:195
    },
    {
        element:"title",
        text:"I'm Web Developer & Designer",
        speed:150
    },
    {
        element:"description1",
        text:"I create modern websites, mobile applications fast responsive and user-friendly systems and creative digital solutions for businesses and organizations.",
        speed:90
    },

    //{
    //    element:"description2",
    //    text:"I build fast, responsive and user-friendly systems.",
    //    speed:90
    //}

];
function typeWriter(elementId,text,speed){
    const element = document.getElementById(elementId);
    if(!element) return;
    let index = 0;
    function typing(){
        if(index < text.length){
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(typing,speed);
        }
    }
    typing();
}
function startTyping(){
    let delay = 500;
    typingTexts.forEach((item)=>{
        setTimeout(()=>{
            typeWriter(
                item.element,
                item.text,
                item.speed
            );
        },delay);
        delay += item.text.length * item.speed + 800;
    });
}
window.addEventListener("load",()=>{
    startTyping();
});
// ================= SCROLL ANIMATION =================
if("IntersectionObserver" in window){
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },{
        threshold:0.2
    });
    document.querySelectorAll(".hidden").forEach((element)=>{
        observer.observe(element);
    });
}
// ================= CONTACT FORM =================
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
if(form){
    form.addEventListener("submit", async function(e){
        e.preventDefault();
        const button = form.querySelector("button");
        button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>Sending...`;
        button.disabled=true;
        const formData = new FormData(form);
        try{
            const response = await fetch("https://formspree.io/f/mbdnqoja",{
                method:"POST",
                body:formData,
                headers:{
                    "Accept":"application/json"
                }
            }
        );
        if(response.ok){
            message.innerHTML =`<i class="fa-solid fa-circle-check"></i>Message sent successfully!`
            message.style.color="lightgreen";
            form.reset();
        }
        else{
            message.innerHTML =`<i class="fa-solid fa-circle-xmark"></i>Failed to send message.`
            message.style.color="red";
        }
    }
    catch(error){
        console.error(error);
        message.innerHTML =`<i class="fa-solid fa-triangle-exclamation"></i>Network error. Please try again.`;
        message.style.color="red";
    }
    setTimeout(()=>{
        message.innerHTML="";
    },5000);
    button.innerHTML =`<i class="fa-solid fa-paper-plane"></i>Send Message`;
    button.disabled=false;
});
}
// ================= GRAPHIC GALLERY =================
function openGallery(){
    const gallery = document.getElementById("graphicPreview");
    if(gallery){
        gallery.style.display="block";
        document.body.style.overflow="hidden";
    }
}
function closeGallery(){
    const gallery = document.getElementById("graphicPreview");
    if(gallery){
        gallery.style.display="none";
        document.body.style.overflow="auto";
    }
}
// CLOSE GALLERY WITH ESC
document.addEventListener("keydown",(event)=>{

if(event.key==="Escape"){
closeGallery();
}
});
// CLOSE WHEN CLICK OUTSIDE IMAGE
const gallery =
document.getElementById("graphicPreview");
if(gallery){
gallery.addEventListener("click",(event)=>{
if(event.target === gallery){
closeGallery();
}
});
}
// ================= FOOTER YEAR =================
const year = new Date().getFullYear();
const footer = document.querySelector("footer p");
if(footer){
    footer.innerHTML = `<i class="fa-solid fa-copyright"></i>Developed by Matogolo &copy; ${year} | All rights reserved.`;
}
// ================= MOBILE MENU =================
function toggleMenu(){
    const menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
}
document.querySelectorAll("#nav-menu a")
.forEach(link=>{
    link.addEventListener("click",()=>{
        document
        .getElementById("nav-menu")
        .classList.remove("active");
    });
});