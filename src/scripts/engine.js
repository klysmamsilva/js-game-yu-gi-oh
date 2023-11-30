const state = {
    score: {
      playerScore: 0,
      computerScore: 0,
      scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
      avatar: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      type: document.getElementById("card-type"),
    },
    fieldCards: {
      player: document.getElementById("player-field-card"),
      computer: document.getElementById("computer-field-card"),
    },
    playersSides: {
      player1: "player-cards",
      player1BOX: document.querySelector("#player-cards"),
      computer: "computer-cards",
      computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
      button: document.getElementById("next-duel"),
    },
  };
  
  const playersSides = {
    player1: "player-cards",
    computer: "computer-cards",
  };
  
  const pathImages = "./src/assets/icons/";
  
  const cardData = [
    {
      id: 0,
      name: "Dragão Branco Olhos Azuis Fusão",
      type: "Papel",
      img: `${pathImages}dragon blue eyes fusion.png`,
      winOf: [1,3,4,6,7],
      loseOf: [2,5,8],
    },
    {
      id: 1,
      name: "Mago Negro",
      type: "Pedra",
      img: `${pathImages}dark magician.png`,
      winOf: [2,4,5,7,8],
      loseOf: [0,3,6],
    },
    {
      id: 2,
      name: "Exodia",
      type: "Tesoura",
      img: `${pathImages}exodia.png`,
      winOf: [0,3,5,6,8],
      loseOf: [1,4,7],
    },
    {
    id: 3,
    name: "Feiticeira Negra",
    type: "Papel",
    img: `${pathImages}dark magician girl.png`,
    winOf: [0,4,6,7],
    loseOf: [1,2,5,8],
    },
    {
    id: 4,
    name: "Lamina Afiada",
    type: "Pedra",
    img: `${pathImages}bladedge.png`,
    winOf: [1,2,5,7,8],
    loseOf: [0,3,6],
    },
    {
    id: 5,
    name: "Homem Bolha",
    type: "Tesoura",
    img: `${pathImages}bubbleman.png`,
    winOf: [0,2,3,5,6],
    loseOf: [1,4,7],
    },
    {
    id: 6,
    name: "Homem Chamalado",
    type: "Papel",
    img: `${pathImages}flame wingman.png`,
    winOf: [1,0,4,7],
    loseOf: [2,5,8,],
    },
    {
    id: 7,
    name: "Kuriboh Alado",
    type: "Pedra",
    img: `${pathImages}kuriboh.png`,
    winOf: [1,2,4,5,8],
    loseOf: [0,3,6],
    }, 
    {  
    id: 8,
    name: "Neos Espacial",
    type: "Tesoura",
    img: `${pathImages}neos.png`,
    winOf: [0,2,3,5,6], 
    loseOf: [1,4,7],
},
  ];
  
  async function getRandomId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
  }
  
  async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");
  
    if (fieldSide === playersSides.player1) {
      cardImage.addEventListener("mouseover", () => {
        drawSelectCard(idCard);
      });
  
      cardImage.addEventListener("click", () => {
        setCardsField(cardImage.getAttribute("data-id"));
      });
    }
  
    return cardImage;
  }
  
  async function setCardsField(cardId) {

    await removeAllCardsImages();
  
    let computerCardId = await getRandomId();
  
    await hiddenCardsFieldsImages(true);
  
    await hiddenCardsdetails();
  
    await drawCardsInField(cardId, computerCardId);
  
    let duelResults = await checkDuelResult(cardId, computerCardId);
  
    await updateScore();
  
    await drawButton(duelResults);
  }
  
  async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
  }
  
  async function hiddenCardsFieldsImages(value) {
    if (value === true) {
      state.fieldCards.player.style.display = "block";
      state.fieldCards.computer.style.display = "block";
    }
  
    if (value === false) {
      state.fieldCards.player.style.display = "none";
      state.fieldCards.computer.style.display = "none";
    }
  }
  
  // Função para ocultar detalhes das cartas
  async function hiddenCardsdetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
  }
  
  async function updateScore() {
    state.score.scoreBox.innerText = `Venceu: ${state.score.playerScore} Perdeu: ${state.score.computerScore}`;
  }
  
  async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
  }
  
  async function checkDuelResult(playerCardId, computerCardId) {
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];
  
    if (playerCard.winOf.includes(computerCardId)) {
      duelResults = "Venceu";
      state.score.playerScore++;
    }
  
    if (playerCard.loseOf.includes(computerCardId)) {
      duelResults = "Perdeu";
      state.score.computerScore++;
    }
    await playAudio(duelResults);
  
    return duelResults;
  }
  
  async function removeAllCardsImages() {
    let { computerBOX, player1BOX } = state.playersSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
  
    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
  }
  
  /**
   * @param {number} index 
   */
  async function drawSelectCard(index) {

    state.cardSprites.avatar.src = cardData[index].img;
  
    state.cardSprites.name.innerText = cardData[index].name;
  
    state.cardSprites.type.innerText = "Atributo: " + cardData[index].type;
  }
  
  async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
      const randomIdCard = await getRandomId();
      const cardImage = await createCardImage(randomIdCard, fieldSide);
  
      document.getElementById(fieldSide).appendChild(cardImage);
    }
  }
  
  async function resetDuel() {

    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  
    init();
  }
  
  async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
  
    try {
      audio.play();
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error.message);
    }
  }
  
  function init() {

    hiddenCardsFieldsImages(false);
    drawCards(5, playersSides.player1);
    drawCards(5, playersSides.computer);
    const bgm = document.getElementById("bgm");
    bgm.play();
    
  }
  
  init();