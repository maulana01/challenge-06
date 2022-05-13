/** @format */

const { UserGameHistory, UserGame } = require('../models');
const moment = require('moment');

module.exports = {
  getAllUserGameHistoryApi: (req, res) => {
    UserGameHistory.findAll({
      attributes: ['id_history_user', 'skor', 'tanggal_bermain', 'id_user', 'createdAt', 'updatedAt'],
      include: [{ model: UserGame, as: 'user_game_history', attributes: ['id_user', 'username'] }],
    })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ message: 'Berhasil Get All User Game History', result });
        } else {
          res.status(404).json({ message: 'User Game History Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Gagal Get All User Game History', err: err.message });
      });
  },
  getUserGameHistoryByIdApi: (req, res) => {
    UserGameHistory.findAll({
      where: {
        id_user: req.params.id,
      },
      attributes: ['id_history_user', 'id_user', 'skor', 'tanggal_bermain', 'createdAt', 'updatedAt'],
    })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ message: 'Berhasil Get All User Game History By id_user', result });
        } else {
          res.status(404).json({ message: 'User Game History dengan ID ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Gagal Get User Game History By Id', err: err.message });
      });
  },
  createUserGameHistoryApi: (req, res) => {
    UserGameHistory.create({
      id_user: req.body.id_user,
      skor: req.body.skor,
      tanggal_bermain: req.body.tanggal_bermain,
    })
      .then((result) => {
        res.status(200).json({ message: 'Berhasil Membuat User Game History', result });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Gagal Membuat User Game History', err: err.message });
      });
  },
  deleteUserGameHistoryByHistoryIdApi: (req, res) => {
    UserGameHistory.destroy({
      where: {
        id_history_user: req.params.id,
      },
    })
      .then((result) => {
        if (result) {
          res.status(200).json({ message: 'Berhasil Menghapus User Game History', result });
        } else {
          res.status(404).json({ message: 'User Game History dengan ID History ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Gagal Menghapus User Game History', err: err.message });
      });
  },
  deleteUserGameHistoryByUserGameIdApi: (req, res) => {
    UserGameHistory.destroy({
      where: {
        id_user: req.params.id,
      },
    })
      .then((result) => {
        if (result) {
          res.status(200).json({ message: 'Berhasil Menghapus User Game History', result });
        } else {
          res.status(404).json({ message: 'User Game History dengan ID User ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Gagal Menghapus User Game History', err: err.message });
      });
  },
};
