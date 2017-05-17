const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const users = [
  { acc: 'aaa', pwd: '123', email: 'b02901045@ntu.edu.tw', events: [] },
  { acc: 'bbb', pwd: '123', email: 'b02901045@ntu.edu.tw', events: [] },
  { acc: 'ccc', pwd: '123', email: 'b02901045@ntu.edu.tw', events: [] }];
const eventsInfo = [];

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'cuemaoweb@gmail.com',
    pass: 'webprogramming',
  },
});

app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/login', (req, res) => {
  const acc = req.body.acc;
  const pwd = req.body.pwd;
  const user = users.find((u) => u.acc === acc);
  if ((user !== undefined) && (user.pwd === pwd)) {
    res.json({ response: 'success' });
  } else {
    res.json({ response: 'failed' });
  }
});

app.post('/events', (req, res) => {
  const acc = req.body.acc;
  const user = users.find((u) => u.acc === acc);
  const events = user.events;
  res.json({ events: events });
});

app.post('/users', (req, res) => {
  const acc = req.body.acc;
  const user = users.find((u) => u.acc === acc);
  res.json({ user: user });
});

app.post('/signup', (req, res) => {
  const acc = req.body.acc;
  const pwd = req.body.pwd;
  const email = req.body.email;
  const user = users.find((u) => u.acc === acc);
  if ((user === undefined)) {
    users.push({
      acc: acc,
      pwd: pwd,
      email: email,
      events: [],
    });
    res.json({ response: 'success' });
  } else {
    res.json({ response: 'failed' });
  }
});

app.post('/eventInfo', (req, res) => {
  const idx = req.body.idx;
  const eventInfo = eventsInfo.find((i) => i.idx === idx);
  res.json({ eventInfo: eventInfo });
});

app.post('/createEvent', (req, res) => {
  const idx = eventsInfo.length;
  const host = req.body.host;
  const title = req.body.title;
  const description = req.body.description;
  const dates = req.body.dates;
  const options = dates.map((date, i) => {
    return { idx: i, time: date, available: [] };
  });
  const invitees = req.body.invitees;
  invitees.push(host);

  eventsInfo.push({
    idx: idx, host: host, title: title, description: description,
    options: options, invitees: invitees,
  });
  invitees.forEach((invitee) => {
    const user = users.find((u) => u.acc === invitee);
    user.events.push({ idx: idx, title: title, done: false,
      available: [],
    });
    if (user.acc !== host) {
      const mailOptions = {
        from: 'cuemaoweb@gmail.com',
        to: user.email,
        subject: 'New Event',
        text: `Hi, ${user.acc}\nYou have a new event held by ${host}!`,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) console.log(err);
        else console.log('sent');
      });
    }
  });
  res.json({ response: 'success' });
});

app.post('/check', (req, res) => {
  const idx = req.body.idx;
  const available = req.body.available;
  const user = req.body.user;
  users.find((u) => u.acc === user)
    .events.find((e) => e.idx === idx).available = available;
  const options = eventsInfo.find((e) => e.idx === idx).options;
  options.forEach((op) => {
    if (op.available.indexOf(user) !== -1) {
      op.available.splice(op.available.indexOf(user), 1);
    }
  });
  available.forEach((a) => {
    options.find((op) => op.idx === a).available.push(user);
  });
  res.json({ response: 'success' });
});

app.listen(app.get('port'), () => {
  console.log('listening on port ', app.get('port'), '!');
});

