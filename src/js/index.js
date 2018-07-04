import { d } from './helpers'
import ToDoList from './todolist'

const taks = d.querySelector('#task')
const list = d.querySelector('#list')
const todo = new ToDoList('edList')

todo.render()
