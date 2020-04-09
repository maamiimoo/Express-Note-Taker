const path = require("path"); //serve index.html file
const express = require("express");
const bodyParser = require('body-parser')  //middleware Parse the body of the request and then gets your data 
const shortID = require("shortID");
const fs = require("fs").promises;


const app = express();
const port = 3000;


const dbFilePath = path.resolve(__dirname,'..', "db", "db.json");

//serve static files in Public Directory, make root Public Directory, add body-parser
app.use(express.static("public"));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
})); 

// get path from index.js file to index.html
app.get('/', (_, res) => {
    const filePath = path.resolve(__dirname,"..", "public", "index.html");

    res.sendFile(filePath);
});

//get path from index.js file to notes.html
app.get('/notes', (_, res) => {
    const filePath1 = path.resolve(__dirname,'..', "public", "notes.html");

    res.sendFile(filePath1);
});

// call for getNotes index.js line 14, read and return db.json
app.get('/api/notes', async (_, res) => {
    const fileData = await fs.readFile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);

    res.json(data);
  
});

// call for saveNote index.js line 22, get data from call, use req
app.post('/api/notes', async (req, res) => {
    const  { title, text }  = req.body;
    const fileData = await fs.readFile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);
    
    //push new note use shortID
    data.push({
        ID: shortID.generate(),
        title,
        text

    });

    await fs.writeFile(dbFilePath, JSON.stringify(data));
    //send json for successful call
    res.json({
        success: true
    });
});

// call to get handNoteDelete, index.js 70 , use req and add unique id
app.delete('/api/notes/:id', async (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);

    const fileData = await fs.readFile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);

//note will be terminated if note.id equals too noteId that is given 
    const newData = data.filter(note => note.id == noteId);
    await fs.writeFile(dbFilePath, JSON.stringify(newData));


    res.json({
        success: true
    });

});


//redirect to root
app.use("*", (_, res) => {
    res.redirect('/');
});

// Start the server, begin listening
app.listen(port, () => { 
    console.log(`listening at http://localhost:${port}`) 
});