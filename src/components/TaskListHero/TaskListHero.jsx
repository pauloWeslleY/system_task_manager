import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import TaskItemHero from './TaskItemHero'
import ModalEditTask from '../ModalEditTask'

class TaskList extends Component {
  static orderParseDate = dateStr => {
    console.log('dateStr', dateStr)
    if (typeof dateStr !== 'string') {
      console.error('Invalid date string:', dateStr)
      throw new TypeError(`Expected a string, but received ${typeof dateStr}`)
    }

    const months = {
      janeiro: 1,
      fevereiro: 2,
      março: 3,
      abril: 4,
      maio: 5,
      junho: 6,
      julho: 7,
      agosto: 8,
      setembro: 9,
      outubro: 10,
      novembro: 11,
      dezembro: 12,
    }

    const [day, month, year, time] = dateStr.split(/[\sdeàs:]+/)
    console.log('data', [day, month, year, time])
    console.log('year', year)

    const formattedDate = dayjs(`${year}-${months[month]}-${day}`, 'YYYY-MM-DD')
    console.log(formattedDate.format('YYYY-MM-DD'))

    if (!day || !month || !year || !time) {
      throw new Error(`Invalid date format: ${dateStr}`)
    }

    const [hours, minutes, seconds] = time.split(':').map(Number)

    return new Date(
      Number(year),
      months[month],
      Number(day),
      hours,
      minutes,
      seconds
    )
  }

  handleFilteredTask = () => {
    switch (this.props.filter) {
      case 'completed':
        return this.props.tasks.filter(task => task.completed)
      case 'pending':
        return this.props.tasks.filter(task => !task.completed)
      default:
        return this.props.tasks
    }
  }

  orderByDate = tasks => {
    const { sortOrder } = this.props

    if (sortOrder === 'asc') {
      return tasks.sort(
        (a, b) =>
          TaskList.orderParseDate(a.date) > TaskList.orderParseDate(b.date)
      )
    }

    if (sortOrder === 'desc') {
      return tasks.sort(
        (a, b) =>
          TaskList.orderParseDate(a.date) < TaskList.orderParseDate(b.date)
      )
    }

    return tasks
  }

  render() {
    const filteredTasks = this.handleFilteredTask()
    const orderedTasks = this.orderByDate(filteredTasks)

    // const sortedTasks =
    //   sortOrder === 'desc'
    //     ? filteredTasks.sort((a, b) => b.date > a.date)
    //     : sortOrder === 'asc'
    //     ? filteredTasks.sort((a, b) => a.date < b.date)
    //     : filteredTasks

    return (
      <VStack my={5}>
        {orderedTasks.map(task => (
          <React.Fragment key={task.id}>
            <TaskItemHero task={task} />

            <ModalEditTask taskId={task.id} task={task} />
          </React.Fragment>
        ))}
      </VStack>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps)(TaskList)
