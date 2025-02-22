const article = document.getElementsByTagName("article")[0];
const dailyButton = document.getElementsByClassName("dailyItem")[0];
const weeklyButton = document.getElementsByClassName("weeklyItem")[0];
const monthlyButton = document.getElementsByClassName("monthlyItem")[0];

let timeFrames = null;

const periodObj = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
};

async function updateValues (newPeriod) {
    const timeSpentElements = document.getElementsByClassName("timeSpent");
    const previousTimeSpentElements = document.getElementsByClassName("previousTimeSpent");

    return timeFrames.forEach((_, i) => {
        timeSpentElements[i].innerText = `${timeFrames[i].timeframes[newPeriod].current}hrs`;
        previousTimeSpentElements[i].innerText = `${periodObj[newPeriod]} - ${timeFrames[i].timeframes[newPeriod].previous}hrs`;
    });
};

function changeSection (buttonEl) {
    const currentPeriod = article.className;
    const newPeriod = buttonEl.dataset.period;
    article.classList.replace(currentPeriod, `${newPeriod}Period`);
    return updateValues(newPeriod);
};

dailyButton.onclick = () => changeSection(dailyButton);
weeklyButton.onclick = () => changeSection(weeklyButton);
monthlyButton.onclick = () => changeSection(monthlyButton);

async function getTimeFrames() {
    try {
        const jsonResponse = await fetch("/data.json");
        const response = jsonResponse.json();
        return response;
    } catch (error) {
        throw new Error("Application error: " + error);
    }
};

function createSectionCard (timeFrame, headImgName, period) {
    const section = document.createElement("section");
    section.id = timeFrame.title.toLowerCase().replace(" ", "-");

    const headImgContainer = document.createElement("div");
    const headImg = document.createElement("img");
    headImg.src = `./images/icon-${headImgName}.svg`;
    headImg.alt = `${timeFrame.title.toLowerCase()} icon`;
    headImgContainer.appendChild(headImg);

    const cardContentContainer = document.createElement("div");

    const cardTopContent = document.createElement("div");
    const title = document.createElement("p");
    title.innerText = timeFrame.title;
    const dotsImg = document.createElement("img");
    dotsImg.src = `./images/icon-ellipsis.svg`;
    dotsImg.alt = "More options";
    cardTopContent.append(title, dotsImg);

    const cardBottomContent = document.createElement("div");
    const timeSpent = document.createElement("h2");
    timeSpent.classList.add("timeSpent");
    timeSpent.innerText = `${timeFrame.timeframes[period].current}hrs`;
    const previousTimeSpent = document.createElement("p");
    previousTimeSpent.classList.add("previousTimeSpent");
    previousTimeSpent.innerText = `${periodObj[period]} - ${timeFrame.timeframes[period].previous}hrs`;
    cardBottomContent.append(timeSpent, previousTimeSpent);

    cardContentContainer.append(cardTopContent, cardBottomContent);
    section.append(headImgContainer, cardContentContainer);

    return section;
};

async function renderTimeFrames () {
    timeFrames = await getTimeFrames();
    
    for(let i = 0; i < timeFrames.length; i++){
        const timeFrame = timeFrames[i];

        const sectionCard = createSectionCard(
            timeFrame, 
            timeFrame.title.toLowerCase().replace(" ", "-"), 
            "weekly"
        );
        
        article.appendChild(sectionCard);
    };
};
renderTimeFrames();