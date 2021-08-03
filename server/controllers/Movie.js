const { Movie } = require("../models");
// 위에 거 아직 안만듬.
const axios = require('axios');
require("dotenv").config();

module.exports = {
  // 검색 
  movie : (req, res) => {  
    console.log('[data query]', req.query.query);
    const moviData = req.query.query;
    axios
    .get('https://openapi.naver.com/v1/search/movie.json', {
      params: { 
        query: moviData, 
        display: 20 
      }, 
      headers: { 
        'X-Naver-Client-Id': process.env.NAVER_API_KEY, 
        'X-Naver-Client-Secret': process.env.NAVER_API_SECRET_KEY, 
        'Access-Control-Allow-Origin': '*' } })
    .then(function(response) { 
      const items = response.data.items; 
      res.send({items:items}); 
    }).catch(function(error) { 
      console.log(error);
    })
  },
  //DB에 저장 post로 작성해야함. 근데 테이블끼리 연결을 아직 못함.
  movieLike : (req,res) => {
    //data가 query가 아니라, body 형태로 받아오나?
    //객체로  vlue는 모두 스트링값
    const { actor, director, link, title, userid, genre, image } = req.body;
    console.log('[찜한 목록] : ', req.body);

    Movie
    .findOrCreate({
      // title과 director를 조회
      where: {
        title, director
      },
      // 검색 결과가 존재하지 않을 때 =>  새로 생성되는 요소가 가지는 기본 값
      // user.id
      defaults: {
        actor, director, link, title, userid, genre, image 
      }
    })
    .then(([data, created]) => {
      // 찝한 데이터가 있을 때
      if (!created) {
        res.status(409).send('이미 찜하셨습니다.')
      }
      // 찜한게 없으면 json 파일로 수정 후 보내기.
      res.status(201).json(data);
    })
  }
}