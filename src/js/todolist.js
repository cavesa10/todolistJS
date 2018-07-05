import {d, c, ls, j, ENTER_KEY} from './helpers'
import Task from './task'

export default class ToDoList {
  constructor (key) {
    this.key = key
    if (!ls.getItem(key)) {
      ls.setItem(key, j.stringify([]))
    }
    this.addTask = this.addTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
  }
  addTask (e) {
    if (!e.target.value && e.keyCode === ENTER_KEY) {
      alert('No puedes agregar una tarea vacia')
    } else {
      if (e.keyCode === ENTER_KEY) {
        let newTask = new Task(e.target.value)
        let tasks = j.parse(ls.getItem(this.key))
        tasks.push(newTask)
        ls.setItem(this.key, j.stringify(tasks))
        this.renderTask(newTask)
        e.target.value = null
      }
      // c(this.key, tasks, newTask, ls)
    }
  }

  editTask (e) {
    if (e.target.localName === 'label') {
      let tasks = j.parse(ls.getItem(this.key))
      let toEdit = tasks.findIndex(task => task.name === e.target.textContent)
      let label = d.querySelector(`[data-id="${tasks[toEdit].id}"]`)
      // c(tasks, toEdit, label)
      const saveTask = e => {
        e.target.textContent = e.target.textContent
        tasks[toEdit].name = e.target.textContent
        ls.setItem(this.key, j.stringify(tasks))
        e.target.blur()
      }
      label.addEventListener('blur', e => saveTask(e))
      label.addEventListener('keyup', e => (e.keyCode === ENTER_KEY) && saveTask(e))
    }
  }

  removeTask (e) {
    if (e.target.localName === 'a') {
      let tasks = j.parse(ls.getItem(this.key))
      let toRemove = tasks.findIndex(task => task.id.toString() === e.target.dataset.id)
      // c(tasks, toRemove)
      tasks.splice(toRemove, 1)
      ls.setItem(this.key, j.stringify(tasks))
      e.target.parentElement.remove()
    }
  }

  renderTask (task) {
    let templateTask = `
      <li class="List-item ${task.isComplete ? 'complete' : ''}">
        <input id="${task.id}" type="checkbox" class="List-checkbox" ${task.isComplete ? 'checked' : ''}>
        <label data-id="${task.id}" class="List-label" contenteditable  spellcheck>${task.name}</label>
        <a href="#" data-id="${task.id}" class="List-removeLink">&#128465;</a>
      </li>
    `
    list.insertAdjacentHTML('beforeend', templateTask)
  }

  render () {
    let tasks = j.parse(ls.getItem(this.key))
    let listTasks = list.children
    tasks.forEach(task => {
      this.renderTask(task)
    })
    Array.from(listTasks).forEach(li => {
      li.querySelector('input[type="checkbox"]').addEventListener('change', e => {
        let task = tasks.filter(task => task.id.toString() === e.target.id)
        c(task)
        if (e.target.checked) {
          e.target.parentElement.classList.add('complete')
          task[0].isComplete = true
        } else {
          e.target.parentElement.classList.remove('complete')
          task[0].isComplete = false
        }
        ls.setItem(this.key, j.stringify(tasks))
      })
    })
    task.addEventListener('keyup', this.addTask)
    list.addEventListener('click', this.editTask)
    list.addEventListener('click', this.removeTask)
  }
}
