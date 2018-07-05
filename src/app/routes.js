import express from 'express'

const routes = express.Router()

routes
  .get('/', (req, res, next) => {
    res.render('index', {
      title: 'ToDo List',
      description: 'ToDo List Isomórfico con Vanilla JS'
    })
  })
export default routes
