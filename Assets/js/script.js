const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", function () {
    navbar.classList.toggle("show");
});
const toggle = document.getElementById("chat-toggle");

const chatbot = document.getElementById("chat-container");

toggle.onclick = function(){

    if(chatbot.style.display==="flex"){

        chatbot.style.display="none";

    }

    else{

        chatbot.style.display="flex";

    }

}
// Gemini API



function addMessage(text, className){

    const div = document.createElement("div");

    div.className = className;

    div.innerHTML = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

window.onload = function(){

    addMessage(
        "👋 Hello! How can I help you with your construction project?",
        "ai-message"
    );

}
async function askGemini(prompt){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                contents:[

                    {
                        parts:[
                            {
                                text:prompt
                            }
                        ]
                    }

                ]

            })

        });

        const data = await response.json();

        return data.candidates[0].content.parts[0].text;

    }

    catch(error){

        return "❌ Failed to connect to AI.";

    }

}
const sendBtn = document.getElementById("send-btn");

const input = document.getElementById("user-input");

sendBtn.onclick = async function(){

    const text = input.value.trim();

    if(text==="") return;

    chatHistory.push({
        role:"user",
        text:text
    });

    addMessage(text,"user-message");

    input.value="";

    const loading = document.createElement("div");

    loading.className="loading";

    loading.innerHTML="Typing...";

    messages.appendChild(loading);

    const reply = await askGemini(text);

    loading.remove();

    addMessage(reply,"ai-message");

    chatHistory.push({

        role:"ai",

        text:reply

    });

}
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("about-us-content").innerHTML = `
        <p>
            BuildPro Construction is committed to delivering high-quality
            residential and commercial construction projects with integrity,
            innovation, and excellent craftsmanship.
        </p>
    `;

    document.getElementById("services-content").innerHTML = `
        <ul>
            <li>Residential Construction</li>
            <li>Commercial Construction</li>
            <li>Interior Design</li>
            <li>Building Renovation</li>
        </ul>
    `;

});
