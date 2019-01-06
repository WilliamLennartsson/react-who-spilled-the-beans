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
            isPlaying: false,
            quotes: [],
            gameQuote: {
                quote: {},
                answers: [],
            },
            quotesIndex: 0,
            score: {
                correctAnswers: 0,
                attempts: 0,
            },
        }
    }

    setCurrentQuote() {
        this.setState((prevState) => {
            const stateCopy = { ...prevState }
            const newGameQuote = newCurrentQuote(stateCopy)
            let newIndex = stateCopy.quotesIndex + 1
            newIndex = newIndex === stateCopy.quotes.length ? 0 : newIndex
            return {
                quotesIndex: newIndex,
                gameQuote: newGameQuote,
            }
        })
    }

    startGame() {
        getQuotes((res) => {
            this.setState({
                quotes: res,
                isPlaying: true,
                score: {
                    attempts: 0,
                    correctAnswers: 0,
                }
            }, () => {
                this.setCurrentQuote()
            })
        })
    }

    answerButtonPressed(name) {
        let amt = 0
        const correctGuess = this.state.gameQuote.quote.author === name
        if (correctGuess) amt++
        this.setState(prevState => ({
            score: {
                attempts: prevState.score.attempts + 1,
                correctAnswers: prevState.score.correctAnswers + amt,
            },
        }), () => {
            if (this.state.score.attempts >= 10) {
                this.setState({
                    isPlaying: false,
                    gameQuote: {
                        answers: [],
                    },
                })
            } else {
                this.setCurrentQuote()
            }
            // console.log('score: ', this.state.score, 'correctGuess: ')
        });
    }

    finalScore() {
        return (
            <Text>
                {'You only got '}
                {this.state.score.correctAnswers}
                {' / '}
                {this.state.score.attempts}
                {' ... lol'}
            </Text>
        )
    }

    renderButtons() {
        const { answers } = this.state.gameQuote
        if (answers.length > 0) {
            return (
                <View style={styles.buttonContainer}>
                    {answers.map((answer, index) => (
                            <Button
                                style={styles.button}
                                key={index}
                                onPress={() => this.answerButtonPressed(answer)}
                            >
                            {answer}
                            </Button>
                        ))}
                </View>
            )
        }
    }

    renderQuote() {
        if (this.state.gameQuote.answers.length <= 0) return
        return <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.gameQuote.quote.quote}</Text>
    }

    renderScore() {
        return (
            <Text>
                {this.state.score.correctAnswers}
                {' / '}
                {this.state.score.attempts}
            </Text>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.score.attempts > 0 && this.state.isPlaying === false ? this.finalScore() : null}
                {this.state.isPlaying ? this.renderScore() : <Text style={{ fontSize: 20, textAlign: 'center' }}>Press start to start</Text>}
                {!this.state.isPlaying ? <Button title="Start" onPress={() => this.startGame()}> Start</Button> : null}
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
