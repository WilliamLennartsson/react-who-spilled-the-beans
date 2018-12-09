import React, { Component } from 'react'
import { View, Button } from 'react-native'

export default class ButtonList extends Component{
    constructor(props){
        super(props)
        this.renderButtons = this.renderButtons.bind(this)
    }

    renderButtons(){
        let btnList = []
        let names = this.props.names
        for (index in names){
            btnList.push(<Button title={names[index]}></Button>)
        }
        return btnList
    }

    render(){
        return (<View>
            {this.renderButtons()}
        </View>)
    }
}
