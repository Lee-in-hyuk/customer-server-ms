// import 대신 require를 씀.
// commonJS방식으로 쓰기 때문.
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const fs = require('fs');
const dataj = fs.readFileSync("./database.json");
const parseData = JSON.parse(dataj);    // database.json받아온거를 객체형태로 변수에 담음
const mysql = require('mysql');

// php에서 connect 만든거랑 같은 개념
const connection = mysql.createConnection({
    host:parseData.host,
    user: parseData.user,
    password: parseData.password,
    port: parseData.port,
    database: parseData.database
})

app.use(express.json()); //json형식의 데이터를 처리할 수 있도록 설정
app.use(cors());        // 브라우저의 다양한 사용을 위해 설정

// get요청이 오면 res.send를 보내주겠다. -> 브라우저에 http://localhost:8080/customers 입력해서 확인해보기
// 게시글 전체 조회
app.get('/customers', async(req,res)=>{
    // php할 때 result = mysqli_query()날려주는거랑 같은 개념
    // query(쿼리문, 콜백함수(에러값,결과,컬럼))
    connection.query(
        "SELECT * FROM customers",
        (err, rows, fields) =>{
            res.send(rows);
        }
    )
    // 여기까지 작성하고 http://localhost:8080/customers 브라우저에 입력했을 때 데이터 잘 나오면 성공
})
// 해당 c_no 게시글 조회
// DetailCustomer.js에서 axios.get(`http://localhost:8080/customer/${id}`)에 있는 ${id}의 값을 가져옴
app.get('/customer/:id', async(req,res)=>{
    const param = req.params;
    connection.query(
        `SELECT * FROM customers where c_no=${param.id}`,
        (err, rows, fields) =>{
            res.send(rows);
        }
    )
})

// post요청 오면 res.send를 보내주겠다. -> 포스트맨으로 http://localhost:8080/createcustomer확인해보기
// app.post('/createcustomer', async(req,res)=>{
//     res.send('등록되었습니다.')
// })

// post전송 - 테이블에 항목을 insert
// app.post(경로, 함수)
// insert into 테이블명(컬럼명1, 컬럼명2...) values(값1,값2....);
app.post('/addCustomer',async(req,res)=>{
    // console.log(req.body); // 포스트맨에서 Body에 작성한 내용이 터미널에 찍히고,
    // // res.send를 포스트맨에 보내줌.
    // res.send('그린컴퓨터');
    const { c_name, c_phone, c_birthday, c_gender, c_addr } = req.body;
    // php할 때 query날려주는거랑 같은 개념
    // query(첫번째 파라미터:쿼리문, 두번째 파라미터:배열, 세번째 파라미터:콜백함수(에러값,결과,컬럼))
    // insert문에는 중간에 배열이 들어가는데, 그 배열 안에 있는것들이 쿼리문의 ?물음표 안에 순차적으로 들어감
    // 배열 안의 값들은 createCustomer.js에 있는 setFormData(변경된 폼데이터)값들이 담기게 됨.
    connection.query('insert into customers(c_name, c_phone, c_birthday, c_gender, c_addr) values(?,?,?,?,?);',
    [c_name, c_phone, c_birthday, c_gender, c_addr],
    function(err, result, fields){
        console.log(result);
    })
    res.send('그린컴퓨터');
})

// 삭제하기
// delete from 테이블명 where 컬럼명 = 값
app.delete('/customer/:id', async(req,res)=>{
    const param = req.params;
    connection.query(`delete from customers where c_no = ${param.id}`,(err, rows, fields)=>{
        res.send(rows);
    })
})

// 셋팅한 app을 실행
app.listen(port, ()=>{
    console.log('고객서버가 돌아가고 있습니다.')
})