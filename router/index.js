/** @format */

const router = require('express').Router();
const auth = require('../middleware/auth');
const passport = require('passport');

const {
  getAllUserGameApi,
  getUserGameByIdApi,
  createUserGameApi,
  updateUserGameApi,
  deleteUserGameApi,
} = require('../controllers/user_game_api');

const {
  getAllUserGameViews,
  getUserGameByIdViews,
  createUserGameFormViews,
  createUserGameViews,
  updateUserGameViews,
  deleteUserGameViews,
} = require('../controllers/user_game_views');

const {
  getAllUserGameHistoryApi,
  getUserGameHistoryByIdApi,
  createUserGameHistoryApi,
  deleteUserGameHistoryByHistoryIdApi,
  deleteUserGameHistoryByUserGameIdApi,
} = require('../controllers/user_game_history_api');

const {
  getAllUserGameHistoryViews,
  createUserGameHistoryFormViews,
  createUserGameHistoryViews,
  deleteUserGameHistoryByHistoryIdViews,
  deleteUserGameHistoryByUserGameIdViews,
} = require('../controllers/user_game_history_views');

const {
  getAllUserGameBiodataApi,
  getUserGameBiodataByIdApi,
  createUserGameBiodataApi,
  updateUserGameBiodataApi,
  deleteUserGameBiodataApi,
} = require('../controllers/user_game_biodata_api');

const {
  getAllUserGameBiodataViews,
  getUserGameBiodataByIdViews,
  createUserGameBiodataFormViews,
  createUserGameBiodataViews,
  updateUserGameBiodataViews,
  deleteUserGameBiodataViews,
} = require('../controllers/user_game_biodata_views');

const { errorPage } = require('../controllers/error');

const { registerPage, registerViews } = require('../controllers/auth_views');

const { register, login } = require('../controllers/auth_api');

// const { login, loginPage } = require('../controllers/auth');

/* REST API ENDPOINT */

// User_Games Endpoint
router.get('/api/get-users-games', auth, getAllUserGameApi);
router.get('/api/get-user-games/:id', auth, getUserGameByIdApi);
router.post('/api/create-user-games', auth, createUserGameApi);
router.put('/api/update-user-games/:id', auth, updateUserGameApi);
router.delete('/api/delete-user-games/:id', auth, deleteUserGameApi);

// // User_Game_Histories Endpoint
router.get('/api/get-user-game-histories', auth, getAllUserGameHistoryApi);
router.get('/api/get-user-game-history/:id', auth, getUserGameHistoryByIdApi);
router.post('/api/create-user-game-history', auth, createUserGameHistoryApi);
router.delete('/api/delete-user-game-history-id/:id', auth, deleteUserGameHistoryByHistoryIdApi);
router.delete('/api/delete-user-game-history-usergameid/:id', auth, deleteUserGameHistoryByUserGameIdApi);

// // User_Game_Biodatas Endpoint
router.get('/api/get-user-game-biodatas', auth, getAllUserGameBiodataApi);
router.get('/api/get-user-game-biodata/:id', auth, getUserGameBiodataByIdApi);
router.post('/api/create-user-game-biodata', auth, createUserGameBiodataApi);
router.put('/api/update-user-game-biodata/:id', auth, updateUserGameBiodataApi);
router.delete('/api/delete-user-game-biodata/:id', auth, deleteUserGameBiodataApi);

router.post('/api/register', register);
router.post('/api/login', login);

/* ================================================================================================ */

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/view');
  }
  next();
}

// views Endpoint
router.get('/view/', checkAuthenticated, getAllUserGameViews);
router.get('/view/usergames/create', checkAuthenticated, createUserGameFormViews);
router.get('/view/usergames/update/:id', checkAuthenticated, getUserGameByIdViews);
router.post('/view/usergames', checkAuthenticated, createUserGameViews);
router.post('/view/usergames/:id', checkAuthenticated, updateUserGameViews);
router.get('/view/usergames/delete/:id', checkAuthenticated, deleteUserGameViews);

router.get('/view/usergamesbiodata', checkAuthenticated, getAllUserGameBiodataViews);
router.get('/view/usergamesbiodata/create', checkAuthenticated, createUserGameBiodataFormViews);
router.get('/view/usergamesbiodata/update/:id', checkAuthenticated, getUserGameBiodataByIdViews);
router.post('/view/usergamesbiodata', checkAuthenticated, createUserGameBiodataViews);
router.post('/view/usergamesbiodata/:id', checkAuthenticated, updateUserGameBiodataViews);
router.get('/view/usergamesbiodata/delete/:id', checkAuthenticated, deleteUserGameBiodataViews);

router.get('/view/usergameshistory', checkAuthenticated, getAllUserGameHistoryViews);
router.get('/view/usergameshistory/create', checkAuthenticated, createUserGameHistoryFormViews);
router.post('/view/usergameshistory', checkAuthenticated, createUserGameHistoryViews);
router.get('/view/usergameshistory/deletebyhistory/:id', checkAuthenticated, deleteUserGameHistoryByHistoryIdViews);
router.get('/view/usergameshistory/deletebyusergame/:id', checkAuthenticated, deleteUserGameHistoryByUserGameIdViews);
router.get('/view/error', errorPage);

router.get('/register', checkNotAuthenticated, registerPage);
router.post('/register', checkNotAuthenticated, registerViews);

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/view',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

router.all('*', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
