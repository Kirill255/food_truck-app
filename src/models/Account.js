const mongoose = require("../data/mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const AccountSchema = new Schema({
  email: {
    type: String,
    // required: true // it's omitted, because the passport-local-mongoose works with username field, not email field directly, it turns out that we don't have an email field, it's generated inside the plugin passport-local-mongoose
  },
  password: {
    type: String,
    // required: true // it's omitted, because the passport-local-mongoose works with username field, not email field directly, it turns out that we don't have an email field, it's generated inside the plugin passport-local-mongoose
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

AccountSchema.plugin(passportLocalMongoose);

const Account = mongoose.model("Account", AccountSchema);


module.exports = Account;
