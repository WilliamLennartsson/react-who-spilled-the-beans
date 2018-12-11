import react, { Component } from 'react'

export default class GameLogic extends Component{
    constructor() {
        this.quotes = []
        this.currentQuote = {
            quote: '',
            author: '',
            answers: [],
        }
    }

    answers() {
        return this.currentQuote.answers
    }
}
export const newCurrentQuote = (state) => {
    const quotes = state.quotes
        if (quotes.length <= 0) return
        const numberOfWrongAnswers = 7  ;
        const randomIndex = quotes.length
        const currentQuote = quotes[state.quotesIndex]
        let newAnswers = []
        for (let i = 0; i < numberOfWrongAnswers; i++){
            let randomNumber = Math.floor((Math.random() * randomIndex))
            newAnswers.push(quotes[randomNumber].author)
        }
        newAnswers.push(currentQuote.author)
        const newGameQuote = {
            quote: currentQuote,
            answers: newAnswers
        }
        //console.log('currentQuote: ', newGameQuote)
        return newGameQuote
}