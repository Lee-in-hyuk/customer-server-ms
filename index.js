// import 대신 require를 씀.
// commonJS방식으로 쓰기 때문.
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json()); //json형식의 데이터를 처리할 수 있도록 설정
app.use(cors());        // 브라우저의 다양한 사용을 위해 설정

// get요청이 오면 res.send를 보내주겠다. -> 브라우저에 http://localhost:8080/customers 입력해서 확인해보기
app.get('/customers', async(req,res)=>{
    res.send({
        data :[
            {
              no:0,
              name: "김그린",
              phone: '010-1234-1234',
              birthday: '1987-12-12',
              gender: '남성',
              addr: '울산 남구 삼산동 화합로 12'
            },
            {
              no:1,
              name: "이블루",
              phone: '010-1234-4321',
              birthday: '1987-12-13',
              gender: '여성',
              addr: '울산 남구 삼산동 화합로 15'
            },
            {
              no:3,
              name: "성레드",
              phone: '010-4321-1234',
              birthday: '1987-11-12',
              gender: '여성',
              addr: '울산 남구 삼산동 화합로 22'
            },
          ]
    })
})
// post요청 오면 res.send를 보내주겠다. -> 포스트맨으로 http://localhost:8080/createcustomer확인해보기
app.post('/createcustomer', async(req,res)=>{
    res.send('등록되었습니다.')
})

// 셋팅한 app을 실행
app.listen(port, ()=>{
    console.log('고객서버가 돌아가고 있습니다.')
})