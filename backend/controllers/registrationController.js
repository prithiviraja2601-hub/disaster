const { db } = require('../config/firebaseAdmin');

exports.createRegistration = async (req, res) => {
  try {
    const { fullName, studentId, email, phone, college, department, year, eventName } = req.body;

    // Validate
    if (!fullName || !studentId || !email || !college || !department || !year) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Phone format validation (simple 10-digit check or standard length)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Check duplicate student ID
    const studentSnapshot = await db.collection('registrations').where('studentId', '==', studentId).get();
    if (!studentSnapshot.empty) {
      return res.status(400).json({ error: 'Student ID already registered' });
    }

    // Check duplicate email
    const emailSnapshot = await db.collection('registrations').where('email', '==', email).get();
    if (!emailSnapshot.empty) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create unique registration ID
    const countSnapshot = await db.collection('registrations').count().get();
    const count = countSnapshot.data().count;
    const registrationId = `REG-${String(count + 1).padStart(6, '0')}`;

    const newRegistration = {
      registrationId,
      fullName,
      studentId,
      email,
      phone,
      college,
      department,
      year,
      eventName: eventName || 'Disaster Management 2026',
      status: 'confirmed',
      registeredAt: new Date().toISOString()
    };

    await db.collection('registrations').add(newRegistration);
    res.status(201).json({ success: true, registrationId, data: newRegistration });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const snapshot = await db.collection('registrations').orderBy('registeredAt', 'desc').get();
    const registrations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Fetch Registrations Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('registrations').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRegistrationCount = async (req, res) => {
  try {
    const countSnapshot = await db.collection('registrations').count().get();
    res.status(200).json({ count: countSnapshot.data().count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('registrations').doc(id).delete();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
