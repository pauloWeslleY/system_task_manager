import React, { Component } from 'react'
import { Text } from '@chakra-ui/react'

export class TitleHero extends Component {
  render() {
    return (
      <Text as="h3" fontSize={['xl']}>
        {this.props.title}
      </Text>
    )
  }
}
