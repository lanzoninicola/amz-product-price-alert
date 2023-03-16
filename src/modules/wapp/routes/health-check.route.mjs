import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
  return res.status(200).json('Ready')
})

export default router
