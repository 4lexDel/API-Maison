require('dotenv').config(); // Load env variables
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const housesRoutes = require('./app/routes/housesRoutes');
const challengesRoutes = require('./app/routes/challengesRoutes');
const authRoutes = require('./app/routes/authRoutes');
const proofsRoutes = require('./app/routes/proofsRoutes');

const app = express();

/** -------------------------------------------Main middlewares----------------------------------------- */
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
/**----------------------------------------------------------------------------------------------------- */


/** -------------------------------------------Authentification----------------------------------------- */
app.use('/api/auth', authRoutes);
/**--------------------------------------------Houses--------------------------------------------------- */
app.use('/api/houses', housesRoutes);
/**--------------------------------------------Challenges----------------------------------------------- */
app.use('/api/challenges', challengesRoutes);
/**--------------------------------------------Proof---------------------------------------------------- */
app.use('/api/proofs', proofsRoutes);
app.use('/api/proofs-img', express.static(__dirname + process.env.STORAGE_PATH));
/**----------------------------------------------------------------------------------------------------- */


/**--------------------------------------------Start server--------------------------------------------- */
const PORT = process.env.PORT || 8000;

app.listen(
    PORT,
    process.env.HOST,
    () => {
        console.log(`Server started : ${PORT}`);
    }
)