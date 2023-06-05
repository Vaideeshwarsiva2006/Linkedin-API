import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));      
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let responseAccess = {
    accessToken: '',
};

app.get("/accessToken", cors(), async (req, res) => {
    res.json(responseAccess);
})

app.post("/accessToken", async(req, res) => {
    responseAccess = req.body;
    res.send(req.body);
})

app.get("/", cors(), async (req, res) => {
    const response = await fetch("https://api.linkedin.com/v2/me?oauth2_access_token=" + responseAccess.accessToken)
    res.json(await response.json());
    responseAccess.accessToken = '';
})

app.get("/profile", cors(), async (req, res) => {
    const response = await fetch("https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))&oauth2_access_token=" + responseAccess.accessToken)
    res.json(await response.json());
    responseAccess.accessToken = '';
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})