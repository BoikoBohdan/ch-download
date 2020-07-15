'use strict';

const cheerio = require('cheerio');
let request = require('request');
request = request.defaults({
  jar: true
});

function getVideos(url, token) {
  return new Promise(function(resolve, reject) {
    let result = [];
    let names = [];
    const options = { url: url };
    if (token) {
      const cookie = request.cookie(token);
      options.headers = {
        Cookie: cookie
      };
    }
    request(options, function(err, res, html) {
      if (!err) {
        let $ = cheerio.load(html);
        let videoMaterials = $('.icon-download');
        let urlMaterials;
        if (videoMaterials !== undefined && videoMaterials.length) {
          urlMaterials = videoMaterials[1].parent.attribs.href
        }
        $('#lessons-list').filter(function() {
          let data = $(this);
          const dataArray = data
              .children()
              .children()
              .toArray();
          const filterData = dataArray.filter(
              el => el.name === 'script' && el.attribs.type === 'application/ld+json'
          );
          // console.log(filterData)
          const filterSpan = dataArray.filter(el => el.name === 'div' && el.attribs.class === 'lessons-name');
          filterSpan.map(el => {
            if (el.name === 'div') {
              const index = Number(el.parent.attribs['data-index']);
              let videoName = 'Lesson ' + (index + 1);
              if (el.children && el.children[0]) {
                videoName = `${index + 1} ` + el.children[0].data.replace(/[\/:*?"<>|]/g, '');
              }
              names.push(videoName);
            }
          });
          filterData.map(el => {
            const data = JSON.parse(el.children[0].data)
            const {contentUrl} = data
            result.push(contentUrl);
          });
          resolve({ result, names, urlMaterials });
        });
      } else {
        reject(err);
      }
    });
  });
}

module.exports = getVideos;