`use strict`;
const express = require(`express`);
const bodyParser = require(`body-parser`);
const request = require(`request`);
const https = require(`https`);
const { response } = require("express");

const app = express();
app.use(express.static(`Public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, function (req, res) {
  res.sendFile(__dirname + `/signup.html`);
});

app.post(`/signup`, function (req, res) {
  const { firstName, lastName, emailAddress } = req.body;
  const data = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = `https://us13.api.mailchimp.com/3.0/lists/62ab12d0f4`;
  const options = {
    method: `POST`,
    auth: `kjord94:217e9053a72ddd668d6aea4b44b23c1b-us13`,
  };

  const request = https.request(url, options, function (response) {
    response.on(`data`, function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log(`Server running on port 3000`);
});

//Key
// 217e9053a72ddd668d6aea4b44b23c1b-us13

//Audience ID
// 62ab12d0f4
