
const assert = require('chai').assert;
const chai = require('chai')

const  axios  = require('axios');
const { expect } = require('chai');
const file = require('../controllers/files');
const csvToArray = require('../utils/csvToArray');

/* Tests */
const getFiles = file.getFiles();
const getFile = file.getFile();



describe("Tests de files controller", ()=>{

    const api = axios.create({
        baseURL: "https://echo-serv.tbxnet.com/v1/secret",
        
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          'Authorization': 'Bearer aSuperSecretKey'
        },
      });

    it('Debe retornar un array si tiene la respuesta correcta', async()=>{
       
        const { data } = await api("/files");
        
        assert.typeOf( data.files,  'array');

        assert.include( data.files,  'test1.csv');
        
    })

    
    it("Debe retornar un array si el nombre de archivo contiene un status code 200 si es valido", async()=>{

        const validFile = 'test3.csv';

        const { data } = await api(`/file/${validFile}`);   
        const formatFile = csvToArray(data)

        assert.typeOf( formatFile, 'array' )
       

    })


    
   


})