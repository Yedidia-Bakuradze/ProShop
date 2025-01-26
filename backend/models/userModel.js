import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Hashing before saving
userSchema.pre('save', async function (next) {
    //If the password isn't modified
    if (!this.isModified('password')) {
        next();
    }
    const salf = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salf);
});

const User = mongoose.model('User', userSchema);
export default User;
