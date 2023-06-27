import React, { Component } from 'react'
import { Flex } from '@chakra-ui/react'

export class TaskHeroBox extends Component {
  render() {
    return (
      <Flex flexDir={['column']} w="lg" gap={4}>
        {this.props.children}
      </Flex>
    )
  }
}
