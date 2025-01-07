import { Component } from 'react'
import { HStack, Select, Text } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { SelectField } from './SelectField'
import { TaskActions } from '../store/actions'

class FilterTask extends Component {
  handleFilteredTasksChange = event => {
    this.props.onSetFilteredTask(event.target.value)
  }

  handleTasksOrderByCreationDate = event => {
    this.props.onTasksOrderByCreationDate(event.target.value)
  }

  render() {
    return (
      <HStack justify="center" align="center" my="4">
        <SelectField>
          <Text as="h3" fontSize={['xl']}>
            Filtra por tarefas completadas
          </Text>
          <Select
            variant="filled"
            focusBorderColor="purple.600"
            onChange={this.handleFilteredTasksChange}
          >
            <option value="all">Todas</option>
            <option value="completed">Completas</option>
            <option value="pending">Pendente</option>
          </Select>
        </SelectField>
        <SelectField>
          <Text as="h3" fontSize={['xl']}>
            Filtra por Data de criação
          </Text>
          <Select
            variant="filled"
            focusBorderColor="purple.600"
            onChange={this.handleTasksOrderByCreationDate}
          >
            <option value="asc">Mais antigo</option>
            <option value="desc">Criado recentemente</option>
          </Select>
        </SelectField>
      </HStack>
    )
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onSetFilteredTask: filter => dispatch(TaskActions.FILTERED(filter)),
  onTasksOrderByCreationDate: order => {
    dispatch(TaskActions.ORDER(order))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterTask)
