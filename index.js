// import 대신 require를 씀.
// commonJS방식으로 쓰기 때문.
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json()); //json형식의 데이터를 처리할 수 있도록 설정
app.use(cors());        // 브라우저의 다양한 사용을 위해 설정

// get요청이 오면 res.send를 보내주겠다.
app.get('/customers', async(req,res)=>{
    res.send('고객리스트 입니다.')
})
// post요청 오면 res.send를 보내주겠다.
app.post('/createcustomer', async(req,res)=>{
    res.send('등록되었습니다.')
})

// 셋팅한 app을 실행
app.listen(port, ()=>{
    console.log('고객서버가 돌아가고 있습니다.')
})