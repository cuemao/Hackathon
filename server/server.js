const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
/*const users = [{
  acc: 'aaa', pwd: '123', email: 'b02901045@ntu.edu.tw',
  events: [
    {idx: 0, title: 'event1', done: true, available: [0,2]},
    {idx: 1, title: 'event2', done: false, available: []},
    {idx: 2, title: 'event3', done: false, available: []},
  ],
  }];
const eventsInfo = [{
  idx: 0, host: 'aaa', title: 'event1', description: 'description',
  options: [{idx: 0, time: '2017/05/10 (Wed)', available: ['aaa']}, 
            {idx: 1, time: '2017/05/12 (Fri)', available: []},
            {idx: 2, time: '2017/05/14 (Sun)', available: ['aaa']},
            {idx: 3, time: '2017/05/16 (Tue)', available: []}
           ]
  },{
  idx: 1, host: 'aaa', title: 'event2', description: 'description',
  options: [{idx: 0, time: '2017/05/10 (Wed)', available: ['aaa']}, 
            {idx: 1, time: '2017/05/12 (Fri)', available: []},
            {idx: 2, time: '2017/05/14 (Sun)', available: ['aaa']},
            {idx: 3, time: '2017/05/16 (Tue)', available: []}
           ]
  },{
  idx: 2, host: 'aaa', title: 'event3', description: 'description',
  options: [{idx: 0, time: '2017/05/10 (Wed)', available: ['aaa']}, 
            {idx: 1, time: '2017/05/12 (Fri)', available: []},
            {idx: 2, time: '2017/05/14 (Sun)', available: ['aaa']},
            {idx: 3, time: '2017/05/16 (Tue)', available: []}
           ]
  },
];*/
const users=[];
const eventsInfo=[];

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'cuemaoweb@gmail.com',
    pass: 'webprogramming'
  }
});

app.set('port', 3001);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('dist'));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, '/public/index.html'));
  res.json({ user: 'mao', pass: '123'});
});

app.post('/login', (req, res) => {
  const acc = req.body.acc;
  const pwd = req.body.pwd;
  const user = users.find((user) => user.acc === acc);
  if ((user !== undefined)  && (user.pwd === pwd)) {
    res.json({ response: 'success' });
  } else {
    res.json({ response: 'failed' });
  }
});

app.post('/events', (req, res) => {
  const acc = req.body.acc;
  const user = users.find((user) => user.acc === acc);
  const events = user.events;
  res.json({ events: events });
});

app.post('/users', (req, res) => {
  const acc = req.body.acc;
  const user = users.find((user) => user.acc === acc);
  console.log(user);
  res.json({ user: user });
});

app.post('/signup', (req, res) => {
  const acc = req.body.acc;
  const pwd = req.body.pwd;
  const email = req.body.email;
  const user = users.find((user) => user.acc === acc);
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
  users.forEach((u) => {console.log(u.acc);});
  console.log(users);

});

app.post('/eventInfo', (req, res) => {
  const idx = req.body.idx;
  const eventInfo = eventsInfo.find((i) => i.idx === idx);
  console.log(eventInfo.title);
  res.json({eventInfo: eventInfo});
});

app.post('/createEvent', (req, res) => {
  const idx = eventsInfo.length;
  const host = req.body.host;
  const title = req.body.title;
  const description = req.body.description;
  const dates = req.body.dates;
  const options = dates.map((date, i) => {
    return {idx: i, time: date, available: []} });
  const invitees = req.body.invitees;
  
  users.find((u) => u.acc === host).events.push({
    idx: idx, title: title, done: false, available: []});
  eventsInfo.push({
    idx: idx, host: host, title: title, description: description,
    options: options
  });
  invitees.forEach((invitee) => {
    users.find((user) => user.acc === invitee).events.push({
      idx: idx, title: title, done: false,
      available: [],
    });
  });
  res.json({ response: 'success' });
});

app.post('/invite', (req, res) => {
  const idx = req.body.idx;
  const invitees = req.body.invitees;
  const title = req.body.title;
  invitees.forEach((invitee) => {
    users.find((user) => user.acc === invitee).events.push({
      idx: idx, title: title, done: false,
      available: [],
    });
  });
  console.log(users);
  res.json({ response: 'success'});
});

app.listen(app.get('port'), () => {
  console.log('listening on port ', app.get('port'), '!');
});

/*
const mailOptions = {
  from: 'cuemaoweb@gmail.com',
  to: 'b02901045@ntu.edu.tw',
  subject: 'Email Test',
  text: 'hi mao mao \n test \n test',
};

transporter.sendMail(mailOptions, (err, info) => {
  if(err) console.log(err);
  else console.log('ya');
});
*/
