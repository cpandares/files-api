const express = require('express');
var cors = require('cors');

/* Crear servidor express */

const app = express();


/* Cors */
app.use(cors());

/* Public folder */
app.use( express.static('public') );

/* body parser */
app.use( express.json() )

/* Routes */
app.use('/api/files', require('./routes/files'));

/* escuchar peticiones */

app.listen(4000, ()=>{
    console.log(`server on port 4000`)
})