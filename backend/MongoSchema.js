const mongoose = require("mongoose")
const { use } = require("react")

mongoose.connect("mongodb+srv://hy025u:Hy1301%40123@cluster0.hqjyslm.mongodb.net/PayTM")

const userInSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName: String,
    lastName :String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const user = mongoose.model("user", userInSchema)
const Account = mongoose.model("account", accountSchema)

module.exports = {
    user,
    Account
}