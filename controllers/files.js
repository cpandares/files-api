const axios = require('axios');
const csv = require('csv-parser')
const { response } = require('express');
const fs = require('fs');
const csvToArray = require('../utils/csvToArray');

const api = axios.create({
    baseURL: "https://echo-serv.tbxnet.com/v1/secret",
    
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      'Authorization': 'Bearer aSuperSecretKey'
    },
  });

const getFiles = async(req, res = response)=>{
  
    try {

      const { data } = await api("/files");
      return  res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg: 'Something wrong'
        })
        
    }
   

}

const getFile = async( req, res = response )=>{

    const name = req.params.id; 

    
    try {
        const  data  = await api(`/file/${name}`);    
        
    
        let resp = csvToArray(data);
       
        resp = resp.filter( item => 
            item.text.length > 5 &&  item.number.length > 2 && item.hex.length === 32  && delete item.file )
      
       return res.status(200).json({
            "ok" : true,
            "file": name,
            "lines": resp
        })
        
    } catch (error) {
        
        if(error.message === "Request failed with status code 404"){
           return res.status(404).json({
                ok:false,
                msg: "Request failed with status code 404",
                statusCode: 404
            })
        }
        if(error.message === "Request failed with status code 500" )
        res.status(500).json({
            ok:false,
            msg: "File error"
        })
    }

}



module.exports = {
    getFiles,
    getFile
}
