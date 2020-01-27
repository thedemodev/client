const { Router } = require('express')
const chartData = require('../data/chart')

const router = Router()

router.post('/chart', function(req, res) {
    setTimeout(() => {
        res.json(chartData.chart)
    }, 800)
})

module.exports = router
