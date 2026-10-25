document.addEventListener("DOMContentLoaded", function() {
    const heroBanner = document.querySelector(".hero-banner");
    const form = document.getElementById("registerForm");
    const successMessage = document.getElementById("successMessage");

    const images = [
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80" 
    ];
    let currentIndex = 0;

    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % images.length;
        heroBanner.style.backgroundImage = `url('${images[currentIndex]}')`;
    }
    setInterval(changeBackgroundImage, 4000);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();

        if (fullName === "" || phone === "" || email === "") {
            alert("Моля, попълнете всички полета!");
            return;
        }

        const participant = {
            name: fullName,
            phone: phone,
            email: email,
            registrationDate: new Date().toLocaleString()
        };
        
        let participantsList = JSON.parse(localStorage.getItem("bni_participants")) || [];
        participantsList.push(participant);
        localStorage.setItem("bni_participants", JSON.stringify(participantsList));

        successMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i> Успешна регистрация! Вашето място е запазено.`;
        successMessage.classList.remove("hidden");

        form.reset();

        setTimeout(() => {
            successMessage.classList.add("hidden");
        }, 5000);
    });
});