import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { getQuotes } from '../model/API'
import { fetchQuotes } from '../actions/index'
import { newCurrentQuote } from '../model/GameLogic'
import Button from './reuseable/Button'

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quotes: [],
            gameQuote: {
                quote: {},
                answers: []
            },
            quotesIndex: 0,
            score: {
                correctAnswers: 0,
                attempts: 0
            }
        }
    }

    newCurrentQuote(){
        const newGameQuote = newCurrentQuote(this.state)
        let newIndex = this.state.quotesIndex + 1 
        newIndex = newIndex == this.state.quotes.length ? 0 : newIndex 
        this.setState({
            quotesIndex: newIndex,
            gameQuote: newGameQuote
        })
    }

    startGame() {
        getQuotes((res) => {
            this.setState({
                ...this.state,
                quotes: res
            },
            this.newCurrentQuote
            )
        })
    }

    answerButtonPressed(name){
        console.log(name, " : Name", this.state.gameQuote.quote.author, " ; answer")
        if (this.state.gameQuote.quote.author == name) { 
            console.log("You're right!")
        } else {
            console.log("You're garbage!")
        }
        this.newCurrentQuote()
    }

    renderButtons(){
        const answers = this.state.gameQuote.answers
        if(answers.length > 0){
            return (
                <View style={styles.buttonContainer}>
                    {answers.map((answer, index) => {
                        return <Button
                            style={styles.button}
                            key={index}
                            onPress={() => this.answerButtonPressed(answer)}
                            >
                            {answer}
                        </Button>
                    })}
                </View>
            )
        }
    }

    renderQuote(){
        if (this.state.gameQuote.answers.length <= 0) return <Text style={{ fontSize: 20, textAlign: 'center' }}>Hit start to play</Text>
        return <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.gameQuote.quote.quote}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Start" onPress={() => this.startGame()} > Start</Button>
                {this.renderQuote()}
                {this.renderButtons()}
            </View>
        )
    }
}

const mapStateToProps = ({ gameReducer }) => {
    const { quotes } = gameReducer

    return { quotes }
}

export default connect(mapStateToProps, { fetchQuotes })(Game)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    renderQuotesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 25,
    },
    buttonContainer: {
        marginTop: 25,
        flex: 1,
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        width: '45%',
        height: '15%',
    },
})
