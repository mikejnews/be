function byCrypt(password) {
  return bcrypt.hash(password, 12);
}

module.exports = {
  byCrypt,
};
