import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Button from './reuseable/Button'

export default class ButtonList extends Component {
    /* constructor(props) {
        super(props)
        this.renderButtons = this.renderButtons.bind(this)
    } */

    /* renderButtons() {
        const { names } = this.props

        const buttonList = []
        const buttonNames = names
        for (let i = 0; i < buttonNames.length; i + 1) {
            buttonList.push(<Button title={buttonNames[i]} />)
        }
        return buttonList
    } */

    renderList() {
        const { names } = this.props
        const buttonNames = names
        return (
            buttonNames.map((buttonName, index) => (
                <Button
                    style={styles.button}
                    key={index}
                >
                {buttonName.author}
                </Button>
            ))
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderList()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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

ButtonList.propTypes = {
    // names: PropTypes.arrayOf(React.propTypes.string),
    names: PropTypes.array,
}

ButtonList.defaultProps = {
    names: [],
}
