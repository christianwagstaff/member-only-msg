#! /usr/bin/env node
require("dotenv").config();
const bcrypt = require("bcryptjs/dist/bcrypt");

console.log("This script populates some test members, boards, and messages");

// Set up Models for DB
const async = require("async");
const Member = require("./models/member");
const Message = require("./models/message");
const Board = require("./models/board");

// Set up Database Connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

let members = [];
let messages = [];
let boards = [];

function createMember(name, username, password, activeMember, icon, cb) {
  let memberDetails = {
    name,
    username,
    activeMember,
    icon,
    dateJoined: new Date(),
  };
  // create hashed password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return cb(err, null);
    }
    memberDetails.password = hashedPassword;
    const member = new Member(memberDetails);
    member.save(function (err) {
      if (err) {
        return cb(err, null);
      }
      console.log("Member: " + member);
      members.push(member);
      cb(null, member);
    });
  });
}

function createBoard(name, creator, cb) {
  const boardDetails = { name, creator, createdDate: new Date() };
  const board = new Board(boardDetails);
  board.save(function (err) {
    if (err) {
      return cb(err, null);
    }
    console.log("Board: " + board);
    boards.push(board);
    cb(null, board);
  });
}

function createMessage(user, title, message, board, cb) {
  const messageDetails = {
    user,
    title,
    message,
    board,
    createdDate: new Date(),
  };
  const messageItem = new Message(messageDetails);
  messageItem.save(function (err) {
    if (err) {
      return cb(err, null);
    }
    console.log("Message: " + messageItem);
    messages.push(messageItem);
    cb(null, messageItem);
  });
}

function createMembers(cb) {
  async.series(
    [
      (callback) =>
        createMember(
          "DrunkenSpider",
          "chris@gmail.com",
          "chris123",
          true,
          1,
          callback
        ),
      (callback) =>
        createMember("Test", "test@gmail.com", "test123", true, 2, callback),
      (callback) =>
        createMember("BMan", "bman@gmail.com", "bman123", true, 3, callback),
      (callback) =>
        createMember(
          "KikiPumpkin",
          "kiki@gmail.com",
          "kiki123",
          true,
          4,
          callback
        ),
    ],
    // optional callback
    cb
  );
}

function createBoards(cb) {
  async.series(
    [
      (callback) => createBoard("all", members[0], callback),
      (callback) => createBoard("pokemon", members[3], callback),
      (callback) => createBoard("food", members[0], callback),
    ],
    cb
  );
}

function createMessages(cb) {
  async.series(
    [
      (callback) =>
        createMessage(
          members[0],
          "My First Post",
          "This is the body of my first post.",
          boards[0],
          callback
        ),
      (callback) =>
        createMessage(
          members[3],
          "My Favorite Pokemon",
          "Bellosom is so cute!",
          boards[1],
          callback
        ),
      (callback) =>
        createMessage(
          members[1],
          "Paella",
          "I just love making this Spanish dish, though I do make it without any fish...",
          boards[2],
          callback
        ),
      (callback) =>
        createMessage(
          members[2],
          "Charizard",
          "Charizard is way better than bellosom! He could breathe fire all over that plant!",
          boards[1],
          callback
        ),
    ],
    cb
  );
}

async.series(
  [createMembers, createBoards, createMessages],
  // eslint-disable-next-line no-unused-vars
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Messages: " + messages);
    }
    // All done, disconnect from the database
    mongoose.connection.close();
  }
);
