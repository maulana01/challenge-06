/** @format */

const { UserGameHistory, UserGame } = require('../models');
const moment = require('moment');

module.exports = {
  getAllUserGameHistoryViews: (req, res) => {
    UserGameHistory.findAll({
      attributes: ['id_history_user', 'skor', 'tanggal_bermain', 'id_user', 'createdAt', 'updatedAt'],
      include: [{ model: UserGame, as: 'user_game_history', attributes: ['id_user', 'username'] }],
    })
      .then((result) => {
        if (result.length > 0) {
          // res.status(200).json({ message: 'Berhasil Get All User Game History', result });
          res.render('usergameshistory/index', { usergameshistory: result, moment, page_name: 'usergameshistory' });
        } else {
          // res.status(404).json({ message: 'User Game History Tidak di temukan', result });
          res.render('usergameshistory/index', { usergameshistory: result, moment, page_name: 'usergameshistory' });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Get All User Game History', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  createUserGameHistoryFormViews: (req, res) => {
    UserGame.findAll({
      attributes: ['id_user', 'username'],
    })
      .then((result) => {
        res.render('usergameshistory/create', { usergames: result, page_name: 'usergameshistory' });
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Get All User Game', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  createUserGameHistoryViews: (req, res) => {
    UserGameHistory.create({
      id_user: req.body.id_user,
      skor: req.body.skor,
      tanggal_bermain: req.body.tanggal_bermain,
    })
      .then((result) => {
        // res.status(200).json({ message: 'Berhasil Membuat User Game History', result });
        res.redirect('/view/usergameshistory');
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Membuat User Game History', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  deleteUserGameHistoryByHistoryIdViews: (req, res) => {
    UserGameHistory.destroy({
      where: {
        id_history_user: req.params.id,
      },
    })
      .then((result) => {
        if (result) {
          // res.status(200).json({ message: 'Berhasil Menghapus User Game History', result });
          res.redirect('/view/usergameshistory');
        } else {
          // res.status(404).json({ message: 'User Game History dengan ID History ' + req.params.id + ' Tidak di temukan', result });
          res.render('error', { status: res.status(404), err: 'Data tidak ditemukan!' });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Menghapus User Game History', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
  deleteUserGameHistoryByUserGameIdViews: (req, res) => {
    UserGameHistory.destroy({
      where: {
        id_user: req.params.id,
      },
    })
      .then((result) => {
        if (result) {
          // res.status(200).json({ message: 'Berhasil Menghapus User Game History', result });
          res.redirect('/view/usergameshistory');
        } else {
          // res.status(404).json({ message: 'User Game History dengan ID User ' + req.params.id + ' Tidak di temukan', result });
          res.render('error', { status: res.status(404), err: 'Data tidak ditemukan!' });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Menghapus User Game History', err: err.message });
        res.render('error', { status: res.status(500), err: err.message });
      });
  },
};
