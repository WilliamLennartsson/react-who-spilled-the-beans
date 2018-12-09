
export class GameLogic{
    
    constructor(){
        this.quotes = []
        this.currentQuote = {
            quote: "",
            author: "",
            answers: []
        }
    }

    answers(){
        return this.currentQuote.answers
    }
}