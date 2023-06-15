const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app.js');
const User = require('../src/models/user.js');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@gmail.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
};

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save();
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Yeasin Arafath',
        email: 'yeasin.arafath@gmail.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should login existing user', async () =>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexisting user', async () =>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongpassword'
    }).expect(400)
})


test('Should get profile for user', async () =>{
    await (await request(app).get('/users/me')).setEncoding('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200)
})