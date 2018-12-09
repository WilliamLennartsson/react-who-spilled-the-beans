import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { getQuotes } from '../model/API'
import { fetchQuotes } from '../actions/index'

import ButtonList from './ButtonList'
import { GameLogic } from '../model/GameLogic';
class Game extends Component {
    
    componentWillMount(){
        this.model = new GameLogic()
    }
    startGame(){
        this.props.fetchQuotes()
        this.model.currentQuote.answers.push("aaaaaaaaa")
    }

    renderQuotes() {
        console.log('this.props.quotes: ', this.props.quotes)

        if (this.props.quotes.length == 0) {
            return <Text>Loading...</Text>
        }
        return (
            <Text>{this.props.quotes[0].quote}</Text>
        )
    }

    newQuote(){
        
    }

    render(){
        return (
                <View style={{ paddingTop: 100 }}>
                    <Button title="Start" onPress={() => this.startGame()} />
                    {this.renderQuotes()}
                    <ButtonList names={this.model.answers()} />
                </View>
        )
    }
}

const mapStateToProps = ({ gameReducer }) => {
    const { quotes } = gameReducer

    return { quotes }
}

export default connect(mapStateToProps, { fetchQuotes })(Game)