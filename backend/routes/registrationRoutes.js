const express = require('express');
const router = express.Router();
const { 
  createRegistration, 
  getRegistrations, 
  getRegistrationById, 
  getRegistrationCount, 
  deleteRegistration 
} = require('../controllers/registrationController');
const verifyAdminToken = require('../middleware/adminAuth');

router.post('/', createRegistration);
router.get('/', verifyAdminToken, getRegistrations);
router.get('/count', verifyAdminToken, getRegistrationCount);
router.get('/:id', verifyAdminToken, getRegistrationById);
router.delete('/:id', verifyAdminToken, deleteRegistration);

module.exports = router;
