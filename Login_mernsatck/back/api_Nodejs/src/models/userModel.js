const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

// // Criptografa a senha antes de salvar
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Método para comparar senhas
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model('database', UserSchema)

module.exports = User
