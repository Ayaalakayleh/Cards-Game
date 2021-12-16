class CardEngine {
    constructor() {
        this.Deck = [];  //array of cards
        this.Player1Cards = []; //array of player 1 cards
        this.Player2Cards = []; //array of player 2 cards
        this.GroundCards  = []; //array of ground cards
        this.Player1CardsEL = null;
        this.Player2CardsEL = null;
        this.GroundCardsEL  = null;
        this.counterPlayer1EL = null;
        this.counterPlayer2EL = null;
        this.msgTextEL = null;
        this.RestartBtnEL = null;
        this.turn = true;
    }
    init = () => {
        this.Player1CardsEL = document.getElementsByClassName('player1')[0];
        this.Player2CardsEL = document.getElementsByClassName('player2')[0];
        this.GroundCardsEL = document.getElementsByClassName('ground-img')[0];
        this.counterPlayer1EL = document.getElementsByClassName('counter-Player1')[0];
        this.counterPlayer2EL = document.getElementsByClassName('counter-Player2')[0];
        this.msgTextEL    = document.getElementsByClassName('msgText')[0];
        this.RestartBtnEL = document.getElementsByClassName('RestartBtn')[0];
        this.Player1CardsEL.addEventListener('click', this.OnPlayer1Click);
        this.Player2CardsEL.addEventListener('click', this.OnPlayer2Click);
        this.RestartBtnEL.addEventListener('click', this.RestartGame);
        this.display('player1  _ VS _  player2');
        this.BuildDeck();
        this.ShuffleDeck();
        this.Deal();
    }
    BuildDeck = () => {
        for (let i = 0; i < 13; i++) {  
            this.Deck.push({ type: 'heart', number: i + 1 });
            this.Deck.push({ type: 'spade', number: i + 1 });
            this.Deck.push({ type: 'diamond', number: i + 1 });
            this.Deck.push({ type: 'club', number: i + 1 });
        }
        return this.Deck;
    }
    ShuffleDeck = () => {
        // let len = this.Deck.length - 1;
        for (let i = 0; i < this.Deck.length - 1; i++) {
            let randomIndex = Math.floor(Math.random() * 51);
            let temp = this.Deck[i];
            this.Deck[i] = this.Deck[randomIndex];
            this.Deck[randomIndex] = temp;
        }
        return this.Deck;
    }
    Deal = () => {
        this.Player1Cards = this.Deck.slice(0, this.Deck.length / 2);
        this.Player2Cards = this.Deck.slice(this.Deck.length / 2);
    }
    OnPlayer1Click = () => {  
        if (this.turn !== true) {
            this.display('is not you turn');
            return;
        }
        let card = this.Player1Cards.pop();
        this.Draw(card);  
        this.GroundCards.push(card);
        this.checkIfPlayerCardMatch(this.Player1Cards,card);
        this.displayCardeCount();        
        this.CheckPlayerWin(this.Player1Cards,'1');
        this.turn = false;
    }
    OnPlayer2Click = () => {
        if (this.turn !== false) {
            this.display('is not you turn');
            return;
        }
        let card = this.Player2Cards.pop();
        this.Draw(card); 
        this.GroundCards.push(card);
        this.checkIfPlayerCardMatch(this.Player2Cards,card);
        this.displayCardeCount();
        this.CheckPlayerWin(this.Player2Cards,'2');
        this.turn = true;
    }
    Draw = (card) => {
        this.GroundCardsEL.src = 'images/' + card.type + card.number + '.png';
    }
    checkIfPlayerCardMatch = (playerCards,card)=>{
        if(this.GroundCards.length == 1 ){ 
            return;
        } 
        if(this.GroundCards[this.GroundCards.length-2].number == card.number){
            this.display('Cards match, cards will be added to your pack');
            this.AddGroundCardsToPlayerCards(playerCards);
        }
    }
    AddGroundCardsToPlayerCards =(playerCards)=>{
        let len = this.GroundCards.length;
        for(let i=0; i<len; i++){
            let lastCard = this.GroundCards.pop();
            playerCards.push(lastCard);
        }  
    }
    displayCardeCount =()=>{
        this.counterPlayer1EL.innerHTML = this.Player1Cards.length;
        this.counterPlayer2EL.innerHTML = this.Player2Cards.length;
    }
    CheckPlayerWin =(playerCards,n)=>{
        if(playerCards.length == 0){
            this.display('win player'+n);
            this.RestartBtnEL.style.display = 'block';
        }
    }    
    display = (str) =>{
        this.msgTextEL.innerHTML = str;
    }
    RestartGame =() => {
        this.GroundCards = []; 
        this.GroundCardsEL.src = 'images/xCard.png';
        this.display('player1  _ VS _  player2');
        this.RestartBtnEL.style.display = 'none';
        this.Deal();
        this.displayCardeCount();
        this.Player1CardsEL.addEventListener('click', this.OnPlayer1Click);
        this.Player2CardsEL.addEventListener('click', this.OnPlayer2Click);
        this.RestartBtnEL.addEventListener('click', this.RestartGame); 
    }
}
let obj = new CardEngine();
obj.init();