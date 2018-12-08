import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import Game from '../components/Game'
export default class MainScreen extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return <View>
            <Game/>
        </View>
    }
}