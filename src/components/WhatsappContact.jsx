import React from 'react'

function WhatsappContact() {
    return (
        <div class="fixed bottom-[20px] right-[10px] z-50">
            <a
                href="https://wa.me/923702789462?text=Hello%20Ibrahim%20I%20want%20to%20contact%20you"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/500px-WhatsApp_icon.png"
                    alt="WhatsApp Chat"
                    class="w-14 cursor-pointer 
             drop-shadow-[0_0_20px_rgba(0,255,0,0.7)]
             hover:scale-110 transition-all duration-300"
                />
            </a>
        </div>
    )
}

export default WhatsappContact
