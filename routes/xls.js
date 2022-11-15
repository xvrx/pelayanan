const route = require('express').Router()
const xlsx = require('xlsx')
const records = require('../models/pelayanan')
const express = require('express')



route.post('/', async (req, res) => {
    const attached = await records.find({}).sort({ _id: -1 })
    if (attached.length === 0) {
        res.status(400).json(
            {message:"No records found!"}
        )
    } else {
        try {
            const file = attached
            // console.log(file)
            if (!file) return res.status(404).json({ message: 'request body is not available!' })
            const stripped = []
            await file.forEach((obj, idx) => stripped.push(
                {
                    NO: idx + 1,
                    TANGGAL: obj?.tanggal,
                    NAMA: obj?.nama,
                    NPWP: obj?.npwp,
                    NIK: obj?.Kriteria,
                    KATEGORI: obj?.kategori,
                    NPWP: obj?.npwp,
                    ALAMAT: obj?.alamat,
                    KLU: obj?.klu,
                    NOMO_HP: obj?.nohp,
                    EMAIL: obj?.email,
                    LOKET: obj?.loket,
                    PENYELESAIAN: obj?.penyelesaian,
                    KEPENTINGAN_1: obj?.kepentingan?.main?.toString(),
                    KEPENTINGAN_2: obj?.kepentingan?.desc,
                }
            ))
    
            // console.log(stripped)
            // res.send('file accessed!')
            let stringify = JSON.stringify(stripped)
            stringify = JSON.parse(stringify)
            const newBook = xlsx.utils.book_new()
            const newSheet = xlsx.utils.json_to_sheet(stringify)
            const downloadXls = './download/records.xlsx'
            xlsx.utils.book_append_sheet(newBook, newSheet, 'Histori Pelayanan')
            xlsx.writeFile(newBook, downloadXls)
            res.set({
                'content-type': 'application/octet-stream',
                'content-disposition': 'attachment;filename=' + encodeURI(downloadXls)
            })
            res.download('./download/records.xlsx')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

})


module.exports = route