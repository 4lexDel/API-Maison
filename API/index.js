const express = require('express');
const app = express();

const { getDatabaseConnection } = require('./initBDD');

var path = require('path');

var cors = require('cors');
const jwtUtils = require('./utils/jwt.utils');

const { getUserById } = require('./controllers/usersController');

const { login, register, getUserProfile, changePassword } = require('./view/usersAuth');
const { houseList, houseDetail, houseAddPoint, addHouse, updateHouse, deleteHouse } = require('./view/houseView');
const { challengeList, challengeDetail, addChallenge, updateChallenge, deleteChallenge } = require('./view/challengeView');
const { proofList, proofDetail, updateProof, addProof, deleteProof } = require('./view/proofView');

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

    addHouse(req, res, BDD_CONNECTOR);
});

app.put("/api/houses/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("PUT /api/houses/:id");

    updateHouse(req, res, BDD_CONNECTOR);
});

app.get("/api/houses/:id", async(req, res) => {
    console.log("GET /api/house/:id");

    houseDetail(req, res, BDD_CONNECTOR);
});

app.post('/api/houses/:id/add-points', authMid, adminCheckMid, async(req, res) => {
    console.log("POST /api/houses/:id/add-points");

    houseAddPoint(req, res, BDD_CONNECTOR);
});

app.delete("/api/houses/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("DELETE /api/houses/:id");

    deleteHouse(req, res, BDD_CONNECTOR);
});

/**--------------------------------------------Challenge----------------------------------------------- */
app.get("/api/challenges", async(req, res) => {
    console.log("GET /api/challenges");

    challengeList(req, res, BDD_CONNECTOR);
});

app.get("/api/challenges/:id", async(req, res) => {
    console.log("GET /api/challenges/:id");

    challengeDetail(req, res, BDD_CONNECTOR);
});

app.post("/api/challenges", authMid, adminCheckMid, async(req, res) => {
    console.log("POST /api/challenges");

    addChallenge(req, res, BDD_CONNECTOR);
});

app.put("/api/challenges/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("PUT /api/challenges/:id");

    updateChallenge(req, res, BDD_CONNECTOR);
});

app.delete("/api/challenges/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("DELETE /api/challenges/:id");

    deleteChallenge(req, res, BDD_CONNECTOR);
});

/**--------------------------------------------proof----------------------------------------------- */
app.get("/api/proofs", authMid, adminCheckMid, async(req, res) => {
    console.log("GET /api/proofs");

    proofList(req, res, BDD_CONNECTOR);
});

app.get("/api/proofs/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("GET /api/proofs/:id");

    proofDetail(req, res, BDD_CONNECTOR);
});

app.post("/api/proofs", authMid, adminCheckMid, async(req, res) => {
    console.log("POST /api/proofs");

    addProof(req, res, BDD_CONNECTOR);
});

app.put("/api/proofs/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("PUT /api/proofs/:id");

    updateProof(req, res, BDD_CONNECTOR);
});

app.delete("/api/proofs/:id", authMid, adminCheckMid, async(req, res) => {
    console.log("DELETE /api/proofs/:id");

    deleteProof(req, res, BDD_CONNECTOR);
});
/**------------------------------------------------------------------------------------------- */