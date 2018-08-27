/**
 * Created by yang on 17/09/23.
 */

let express = require('express')
let router = express.Router()
let data = require('./data.json')

let seller = data.seller
let goods = data.goods
let ratings = data.ratings

router.get('/seller', (req, res) => {
	res.json({
		code: 0,
		data: seller
	})
})

router.get('/goods', (req, res) => {
	res.json({
		code: 0,
		data: goods
	})
})

router.get('/ratings', (req, res) => {
	res.json({
		code: 0,
		data: ratings
	})
})

router.post('/seller', (req, res) => {
	res.json({
		code: 0,
		data: seller
	})
})

router.post('/goods', (req, res) => {
	res.json({
		code: 0,
		data: goods
	})
})

router.post('/ratings', (req, res) => {
	res.json({
		code: 0,
		data: ratings
	})
})

module.exports = router
