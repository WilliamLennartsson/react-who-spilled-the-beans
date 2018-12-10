import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/Colors'

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.button, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={[styles.text, this.props.textStyle]}>{this.props.children}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.veryLight,
        margin: 3,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
    },
    text: {
        fontSize: 12,
        color: Colors.veryDark,
        fontWeight: 'bold',
    },
})

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
}
