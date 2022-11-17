const route = require('express').Router()
const xlsx = require('xlsx')
const express = require('express')
const PelayananModel = require('../models/pelayanan')
const masterfModel = require('../models/masterf')
const { parse } = require('dotenv')
const dateUtils = require('../utils/dateUtils')


route.get('/', async (req, res) => {
    const attached = req.body
    console.log('bruh')
    res.status(400).json({message: 'nigga sonic teenage warhead!'})
})

route.post('/ingfowangsaf/:npwp', async (req, res) => {
    const enpewepe = req.params.npwp
    const previousInput = await PelayananModel.find({npwp:enpewepe})

    if (enpewepe !== null || enpewepe !== undefined) {
        // console.log(enpewepe)
    const resultante = await masterfModel.findOne({NPWP:enpewepe})
    // res.status(400).json({message: 'nigga sonic teenage warhead!'})
    res.status(200).json({found: resultante, previous: previousInput?.length > 0})
    } else {
        res.status(200).json({found: 'params not found!', previous: previousInput?.length > 0})
    }
})

route.get('/pelayanan', async (req, res) => {
    // query params will always be string, dont forget to parseInt if you expect number
    const quer = req.query
    const regPattern = quer.lookFor
    
    function startNum ( page ) {
        const pageNum = parseInt(page)
        if (pageNum < 0 || isNaN(pageNum) || pageNum === '') {
            // console.log('page num is smaller than one :', pageNum)
            return 0
        } else {
            return pageNum*10 - 10
        }
    }
    
    const startPoint = startNum(quer.start)

    if (quer?.lookFor?.length < 1) {
        try {
            // get total news total number -
            const totalRecords = await PelayananModel.countDocuments()
            const resultante = await PelayananModel.find().sort({ _id: -1 }).skip(startPoint).limit(10);
            
            res.status(200).json(
                { 
                    records: resultante ,
                    recordsNum:totalRecords
                });
        } catch (error) { 
            console.log(error);
            res.status(500).json({message:'query error!'})
        }
    } else if (quer?.lookFor?.length > 0) {
        // console.log('query opt: ', quer)
        try {
            const pattern = { $regex: new RegExp(regPattern), $options: 'i' }
            const criteria = { 
               $or: [
                    {"nama" : pattern},
                    {"nik" : pattern},
                    {"alamat" : pattern},
                    {"klu" : pattern},
                    {"email" : pattern},
                    {"kategori" : pattern},
                    {"nomorhp" : pattern},
                     {"loket" : pattern},
                    {"npwp" : pattern},
                    {"kepentingan.main" :  pattern},
                    {"kepentingan.desc" : pattern}
                ]

            }
            // get total news total number -
            const totalRecords = await PelayananModel.countDocuments(criteria)
            const resultante = await PelayananModel.find(criteria).sort({ _id: -1 }).skip(startPoint).limit(10);
            
            res.status(200).json(
                { 
                    records: resultante ,
                    recordsNum:totalRecords
                });
        } catch (error) { 
            console.log(error);
            res.status(500).json({message:'query error!'})
        }
    } else {
      res.status(404).send("query params doesnt exist");
    }
})


route.post('/pelayanan', async (req, res) => {
    const attachment = req.body
    attachment.tanggal = dateUtils.formatDate(new Date())

    try {
        const newRecord = new PelayananModel(attachment)
        await newRecord.save()
        res.status(200).json({message: 'record is saved!', file: attachment})
    } catch (error) {
        console.log(error)
        res.status(400).send('something is wrong with data submitted!')
    }
})


module.exports = route