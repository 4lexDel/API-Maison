const express = require('express');
const app = express();

const { getDatabaseConnection } = require('./initBDD');

var path = require('path');

var cors = require('cors');
const jwtUtils = require('./utils/jwt.utils');

const { getUserById } = require('./controllers/usersController');

const { login, register, getUserProfile, changePassword } = require('./view/usersAuth');
const { houseList, houseDetail, houseAddPoint, addHouse, updateHouse } = require('./view/houseView');
const { challengeList, challengeDetail, addChallenge, updateChallenge } = require('./view/challengeView');
const { proofList, proofDetail, updateProof, addProof } = require('./view/proofView');

const BDD_CONNECTOR = getDatabaseConnection(); //MYSQL CONNECTOR

const PORT = 5000;

app.listen(
    PORT,
    'localhost',
    () => {
        console.log(`Server started : ${PORT}`);
    }
)

app.use(express.json()); //Le body des request renvoient .json

//app.use("/static", express.static(path.resolve(__dirname, "public", "static")));
app.use("/static", express.static(path.join(__dirname, 'public/static')));

app.use(cors());


function authMid(req, res, next) { //This midleware check the token and share the userId return
    console.log("Auth mid");
    var headerAuth = req.headers['authorization']; //Get the token
    var userId = jwtUtils.getUserId(headerAuth); //Check if it exist and get the userId

    if (userId < 0) return res.status(400).json({ 'error': 'wrong token' });

    req.auth = { userId };

    next();
}

async function adminCheckMid(req, res, next) {
    console.log("Admin mid");
    let userId = req.auth.userId;

    let userResponse = await getUserById(BDD_CONNECTOR, userId);
    let user = userResponse[0];

    if (user.admin != 1) return res.status(403).json({ 'error': 'access forbidden' });

    next();
}


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/`);
});

/** -------------------------------Authentification------------------------------------------ */

app.post("/api/register", async(req, res) => {
    console.log("POST /api/register");

    register(req, res, BDD_CONNECTOR);
});

app.post("/api/login", async(req, res) => {
    console.log("POST /api/login");

    login(req, res, BDD_CONNECTOR);
});

app.get("/api/test", async(req, res) => {
    console.log("TEST /api/test");

    getUserProfile(req, res, BDD_CONNECTOR);
});

app.put("/api/changePassword", authMid, async(req, res) => {
    console.log("Change password /api/changePassword");

    changePassword(req, res, BDD_CONNECTOR);
});

/**--------------------------------------------House----------------------------------------------- */
app.get("/api/houses", async(req, res) => {
    console.log("GET /api/houses");

    houseList(req, res, BDD_CONNECTOR);
});

app.post("/api/houses", authMid, adminCheckMid, async(req, res) => {
    console.log("POST /api/houses");

    const { title } = req.body;
    const { score } = req.body;
    const { description } = req.body;

    addHouse(req, res, BDD_CONNECTOR, title, score, description);
});

app.put("/api/houses/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("PUT /api/houses/:id");

    const { id } = req.params;

    const { title } = req.body;
    const { score } = req.body;
    const { description } = req.body;

    updateHouse(req, res, BDD_CONNECTOR, id, title, score, description);
});

app.get("/api/houses/:id", async(req, res) => {
    console.log("GET /api/house/:id");

    const { id } = req.params;

    houseDetail(req, res, BDD_CONNECTOR, id);
});

app.post('/api/houses/:id/add-points', authMid, adminCheckMid, async(req, res) => {
    console.log("POST /api/houses/:id/add-points");

    const { id } = req.params;

    const { points } = req.body;

    houseAddPoint(req, res, BDD_CONNECTOR, id, points);
});

/**--------------------------------------------Challenge----------------------------------------------- */
app.get("/api/challenges", async(req, res) => {
    console.log("GET /api/challenges");

    challengeList(req, res, BDD_CONNECTOR);
});

app.get("/api/challenges/:id", async(req, res) => {
    console.log("GET /api/challenges/:id");

    const { id } = req.params;

    challengeDetail(req, res, BDD_CONNECTOR, id);
});

app.post("/api/challenges", authMid, adminCheckMid, async(req, res) => {
    console.log("POST /api/challenges");

    const { title } = req.body;
    const { description } = req.body;
    const { expiration } = req.body;
    const { award } = req.body;
    const { success } = req.body;

    addChallenge(req, res, BDD_CONNECTOR, title, description, expiration, award, success);
});

app.put("/api/challenges/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("PUT /api/challenges/:id");

    const { id } = req.params;

    const { title } = req.body;
    const { description } = req.body;
    const { expiration } = req.body;
    const { award } = req.body;
    const { success } = req.body;

    updateChallenge(req, res, BDD_CONNECTOR, id, title, description, expiration, award, success);
});

/**--------------------------------------------proof----------------------------------------------- */
app.get("/api/proofs", authMid, adminCheckMid, async(req, res) => {
    console.log("GET /api/proofs");

    proofList(req, res, BDD_CONNECTOR);
});

app.get("/api/proofs/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("GET /api/proofs/:id");

    const { id } = req.params;

    proofDetail(req, res, BDD_CONNECTOR, id);
});

app.post("/api/proofs", authMid, adminCheckMid, async(req, res) => {
    console.log("POST /api/proofs");

    const { dateProof } = req.body;
    const { proofImg } = req.body;
    const { proofDescription } = req.body;
    const { accepted } = req.body;
    const { challengerName } = req.body;
    const { idHouse } = req.body;
    const { idChallenge } = req.body;

    addProof(req, res, BDD_CONNECTOR, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge);
});

app.put("/api/proofs/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("PUT /api/proofs/:id");

    const { id } = req.params;

    const { dateProof } = req.body;
    const { proofImg } = req.body;
    const { proofDescription } = req.body;
    const { accepted } = req.body;
    const { challengerName } = req.body;
    const { idHouse } = req.body;
    const { idChallenge } = req.body;

    updateProof(req, res, BDD_CONNECTOR, id, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge);
});
/**------------------------------------------------------------------------------------------- */