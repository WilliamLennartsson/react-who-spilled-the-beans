import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
// import { getQuotes } from '../model/API'
import { fetchQuotes } from '../actions/index'
import ButtonList from './ButtonList'
import GameLogic from '../model/GameLogic'

class Game extends Component {
    componentWillMount() {
        this.model = new GameLogic()
    }

    startGame() {
        this.props.fetchQuotes()
        this.model.currentQuote.answers.push('aaaaaaaaa')
    }

    renderQuotes() {
        console.log('this.props.quotes: ', this.props.quotes)

        if (this.props.quotes.length === 0) {
            return <Text>Press start to play, mannen</Text>
        }
        // model not connected to store yet so will use
        // this.props.quotes instead of this.model.answers()
        return (
            <View style={styles.renderQuotesContainer}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.props.quotes[0].quote}</Text>
                <ButtonList names={this.props.quotes} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Start" onPress={() => this.startGame()} />
                {this.renderQuotes()}
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
})
