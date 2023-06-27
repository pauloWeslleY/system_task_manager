import React, { Component } from 'react'
import { Text } from '@chakra-ui/react'

export class InputTextLabel extends Component {
  render() {
    return (
      <Text color="red.600" fontWeight="semibold">
        {this.props.children}
      </Text>
    )
  }
}
