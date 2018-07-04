import { ls, j } from './helpers'
import {task} from './index'

export default class ToDoList {
  constructor (key) {
    this.key = key
    if (!ls.getItem(key)) {
      ls.setItem(key, j.stringify)
    }
  }
  addTask (e) {
    alert('Funciona')
  }

  render () {
    task.addEventeListener('keyup', this.addTask)
  }
}
