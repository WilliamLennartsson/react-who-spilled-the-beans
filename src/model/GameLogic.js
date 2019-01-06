import {
    Component,
} from 'react'

export default class GameLogic extends Component {
    constructor(props) {
        super(props)
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
    const { quotes } = state
    // console.log(quotes)
    if (quotes.length <= 0) return
    const numberOfWrongAnswers = 3

    const randomIndex = quotes.length
    const currentQuote = quotes[state.quotesIndex]
    const newAnswers = []
    for (let i = 0; i < numberOfWrongAnswers; i++) {
        const randomNumber = Math.floor((Math.random() * randomIndex))
        newAnswers.push(quotes[randomNumber].author)
    }
    newAnswers.push(currentQuote.author)
    const newGameQuote = {
        quote: currentQuote,
        answers: newAnswers,
    }
    // console.log('currentQuote: ', newGameQuote)
    return newGameQuote
}
