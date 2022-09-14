/* 
    Auth Routes
    host + /api/files

*/

const { Router } = require('express');
const { getFiles, getFile } = require('../controllers/files');


const router = Router();

router.get('/', getFiles)

router.get('/:id', getFile)



module.exports =  router
