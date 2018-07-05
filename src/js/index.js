import { d } from './helpers'
import ToDoList from './todolist'

const task = d.querySelector('#task')
const list = d.querySelector('#list')
const todo = new ToDoList('MyList')

todo.render()
