const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const DB_URL = 'mongodb://localhost:27017/grace';

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    role: {
        default: 0,
        type: Number
    },
    password: String,
    email: String,
    phoneNumber: Number
});

const User = mongoose.model('user', UserSchema);


exports.LoginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            User.findOne({
                email: email
            }).then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, res) => {
                        if (res) {
                            mongoose.disconnect();
                            resolve(user._id);
                        } else {
                            mongoose.disconnect();
                            reject('You are not a user')
                        }
                    })

                }
                else {
                    mongoose.disconnect();
                    reject('You are not a user')
                }

            })
        }).catch((err) => {
            mongoose.disconnect();
            reject(err)
        });
    })
}
exports.addNewUser = (user) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {

            User.findOne({ email: user.email }).then((userGet) => {
                if (userGet) {
                    mongoose.disconnect();
                    reject('Email is already taken!');
                }
                else {
                    bcrypt.hash(user.password, 10, function (err, hash) {
                        user.password = hash;
                        let newUser = new User(user);
                        newUser.save().then(() => {
                            mongoose.disconnect();
                            resolve();
                        }).catch((err) => {
                            mongoose.disconnect();
                            reject('err1');
                        });
                    });

                }
            }).catch((err) => {
                mongoose.disconnect();
                reject('err2');
            });
        })
    })
}