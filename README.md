# Express-Note-Taker
express application capable to write, save, and delete notes

# Description
Code for the front end of application was provided, developer was responsible for the backend code and combining the two.<br>
Application uses 2 HTML routes: GET/ * redirects to the root (index.html), GET /notes - Should return the notes.html file.<br>
Notes are stored in a db.json file on the backend. <br>
3 API routes were created:<br>
/api/notes reads the db.json file and return all saved notes as JSONB<br>
POST /api/notes receives a new note to save on the request.body, add it to the db.json file, and then return the new note to the client when the save icon is clicked<br>
DELETE /api/notes/:id receives a query paramter containing the id of a note to delete when the trash can next to the<Br> corresponding title is clicked<br>

# How it works
In terminal or command line and type in run npm watch<br>
Follow http to your local server, and begin working in application<Br>
If local port is locked,  npx kill-port 3000<br>



