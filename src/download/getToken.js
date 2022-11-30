const axios = require('axios');
const FormData = require('form-data');


function getToken(e_mail, password) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('e_mail', e_mail);
    data.append('password', password);
    const config = {
      method: 'post',
      url: 'https://coursehunter.net/sign-in',
      headers: { 
        ...data.getHeaders(),
        'Postman-Token': '84ee2099-f1e2-4328-8455-c831721a96fe',
        'Cookie': 'locale=ru', 
      },
      data,
      maxRedirects: 0,
      validateStatus: function (status) {
        if(status === 302){
          return true
        }
        return status >= 200 && status < 300; // default
      }
    };
    axios(config)
      .then((res) => {
        resolve(res.headers['set-cookie'][1] + ';');
      })
      .catch(err => {
        console.log(err, 'err')
        reject(err)
      });
  });
};

module.exports = getToken;