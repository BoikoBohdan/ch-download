const axios = require('axios');
const FormData = require('form-data');


function getToken(e_mail, password) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('e_mail', 'andrey.gabchak@gmail.com');
    data.append('password', '88b6pVRzD6fr');

    const config = {
      method: 'post',
      url: 'https://coursehunter.net/sign-in',
      headers: { 
        'Cookie': 'locale=ru; subscriber_ident=26764551-d546-4ac4-8992-6bc8a8540444', 
        ...data.getHeaders()
      },
      data
    };
    axios(config)
      .then(res => {
         resolve(res.headers['set-cookie'][1] + ';');
      })
      .catch(err => {
        console.log(err, 'err')
        reject(err)
      });
  });
};

module.exports = getToken;