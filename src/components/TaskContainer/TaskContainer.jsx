import React, { Component } from 'react'
import { Stack } from '@chakra-ui/react'

export class TaskContainer extends Component {
  render() {
    return <Stack spacing={5}>{this.props.children}</Stack>
  }
}
