import React, { Component } from 'react'
import { Container, Flex, Heading } from '@chakra-ui/react'
import { ButtonToggle } from './components/Buttons/ButtonToggle'
import TaskListHero from './components/TaskListHero/TaskListHero'
import AddTask from './components/AddTask'
import FilterTask from './components/FilterTask'

export class App extends Component {
  render() {
    return (
      <Container maxW="6xl">
        <Flex
          w="full"
          justify="center"
          align="center"
          gap="5"
          p="4"
          mt="5"
          mb="8"
        >
          <Heading
            fontWeight="semibold"
            fontFamily="Poppins"
            letterSpacing="wide"
            textTransform="uppercase"
            bgClip="text"
            bgGradient="linear(to-r, emerald.500,violet.600)"
          >
            Gerenciador de Tarefas
          </Heading>
          <ButtonToggle />
        </Flex>

        <AddTask />

        <FilterTask />

        <TaskListHero />
      </Container>
    )
  }
}
