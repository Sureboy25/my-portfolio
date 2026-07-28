// ================= SCROLL ANIMATION =================
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }
    });
},{

    threshold:0.2

});
document.querySelectorAll(".hidden").forEach(el=>{
    observer.observe(el);
});
// ================= CONTACT FORM =================
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
if(form){
form.addEventListener("submit", async function(e){
    e.preventDefault();
    const button = form.querySelector("button");
    button.innerHTML = "Sending...";
    button.disabled = true;
    let formData = new FormData(form);
    try{
        let response = await fetch(
            "https://formspree.io/f/mbdnqoja",
            {
                method:"POST",
                body:formData,
                headers:{
                    "Accept":"application/json"
                }
            }
        );
        if(response.ok){
            message.innerHTML = "✅ Message sent successfully!";
            message.style.color="lightgreen";
            // kusafisha form baada ya kutuma
            form.reset();
            // kufuta ujumbe baada ya sekunde 5
            setTimeout(()=>{
                message.innerHTML="";
            },5000);
        }else{
            message.innerHTML = "❌ Failed to send message.";
            message.style.color="red";
            setTimeout(()=>{
                message.innerHTML="";
            },5000);
        }
    }catch(error){
        message.innerHTML =
        "❌ Network error.";
        message.style.color="red";
        setTimeout(()=>{
            message.innerHTML="";
        },5000);
    }
    button.innerHTML="Send Message";
    button.disabled=false;
});
}
// ================= GRAPHIC GALLERY =================
function openGallery(){
    document.getElementById("graphicPreview").style.display="block";
}
function closeGallery(){
    document.getElementById("graphicPreview").style.display="none";
}
// ================= CURRENT YEAR FOOTER =================
const year = new Date().getFullYear();
const footerText = document.querySelector("footer p");
if(footerText){
    footerText.innerHTML =`Developed by Matogolo &copy; ${year} | All rights reserved.`;
}