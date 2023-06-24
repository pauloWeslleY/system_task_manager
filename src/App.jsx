import React, { Component } from 'react'
import { Container, Flex, Heading } from '@chakra-ui/react'
import { ButtonToggle } from './components/Buttons/ButtonToggle'
import TaskListHero from './components/TaskListHero/TaskListHero'

export class App extends Component {
  render() {
    return (
      <Container maxW="6xl">
        <Flex
          w="full"
          justify="center"
          align="center"
          gap={5}
          p={4}
          mt={5}
          mb={8}
        >
          <Heading fontWeight="semibold" fontFamily="DMSans">
            Gerenciador de Tarefas
          </Heading>
          <ButtonToggle />
        </Flex>

        <section>
          <TaskListHero />
        </section>
      </Container>
    )
  }
}
