const { User } = require('../models');

async function ensureAdminExists() {
  const adminEmail = 'admin@college.com';
  const admin = await User.findOne({ where: { email: adminEmail } });

  if (!admin) {
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: 'admin123',
      role: 'admin',
    });
    console.log('Default admin created: admin@college.com / admin123');
  }
}

module.exports = { ensureAdminExists };
