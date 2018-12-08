import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { getQuotes } from '../model/API'
import { fetchQuotes } from '../actions/index'

class Game extends Component {
    

    startGame(){
        this.props.fetchQuotes()
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

   /*  showAuthor(){
        console.log(this.state.quoteList)
        if (this.state.quoteList[0] == undefined)  return "Loading" 
        else return this.state.quoteList[0].author
    } */

    render(){
        return (
                <View style={{ paddingTop: 100 }}>
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