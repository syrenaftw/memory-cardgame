const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 5;

//link text
playerLivesCount.textContent = playerLives;

//generate the data
const getData = () => [
    { imgSrc: "./images/cats.png", name: "cat"},
    { imgSrc: "./images/drake.jpg", name: "drake"},
    { imgSrc: "./images/mermaid.png", name: "mermaid"},
    { imgSrc: "./images/sea.jpg", name: "sea"},
    { imgSrc: "./images/sett.png", name: "sett"},
    { imgSrc: "./images/smoke.jpg", name: "smoke"},
    { imgSrc: "./images/thief.png", name: "thief"},
    { imgSrc: "./images/waifu.jpeg", name: "waifu"},
    { imgSrc: "./images/cats.png", name: "cat"},
    { imgSrc: "./images/drake.jpg", name: "drake"},
    { imgSrc: "./images/mermaid.png", name: "mermaid"},
    { imgSrc: "./images/sea.jpg", name: "sea"},
    { imgSrc: "./images/sett.png", name: "sett"},
    { imgSrc: "./images/smoke.jpg", name: "smoke"},
    { imgSrc: "./images/thief.png", name: "thief"},
    { imgSrc: "./images/waifu.jpeg", name: "waifu"},
];

//randomize
const randomize = () => {
    const cardData = getData();
    console.log(cardData);
    cardData.sort(() => Math.random() -0.5);
    return cardData;
};

//card generator function
const cardGenerator = () => {
    const cardData = randomize();
    //generate the hmtl

    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        
        //attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name',item.name);
        //attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) =>{
            card.classList.toggle('toggleCard');
            checkCards(e);
        }) 
    });
};

//check cards
const checkCards = (e) =>{
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    
    console.log(flippedCards);
    //logic
    if(flippedCards.length === 2){
        if(
            flippedCards[0].getAttribute("name") === 
            flippedCards[1].getAttribute("name")
            ) {
                console.log("match");     
                flippedCards.forEach((card) =>{
                    card.classList.remove("flipped");
                    card.style.pointerEvents = "none";
                });
        } else {
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"),1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0){
                restart("loser");
            }
        }
    }
    //run a check to see if we won the game
    if(toggleCard.length === 16){
        restart("ez");
    }
};


//restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name); 
            section.style.pointerEvents = "all";
        },1000);
    });
    playerLives = 5;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
 
};
cardGenerator();
