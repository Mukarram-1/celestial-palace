const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

router.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    await connection.query('UPDATE employees SET ? WHERE id = ?', [updatedData, id]);
    console.log('Employee updated');
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
