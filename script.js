async function getTimeFrames() {
    try {
        const jsonResponse = await fetch("/data.json");
        const response = jsonResponse.json();
        return response;
    } catch (error) {
        console.log("Error: " + error);
        return [];
    }
};

async function renderTimeFrames () {
    const article = document.getElementsByTagName("article")[0];
    
    const timeFrames = await getTimeFrames();
    
    for(let i = 0; i < timeFrames.length; i++){
        const section = document.createElement(`section`);
        section.id = timeFrames[i].title.toLowerCase().replace(" ", "-");
        
        section.innerText = timeFrames[i].title;
        article.appendChild(section);
    };
    // console.log(section)
};

renderTimeFrames();