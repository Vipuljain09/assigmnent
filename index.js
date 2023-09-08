import express from "express";
import axios from 'axios';
import cors from 'cors';
// const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());


app.get('/api/convert/',async(req,res)=>{
    if(!req.body.toConvert)return res.status(401).json("Invaild Request");
    const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
    const arr = req.body.toConvert;
    

    const tt = async (arr) => {

        const result = await Promise.all(arr.map(async (item) => {
          const amount = item.amount;
          const cnt1 = item.from;
          const to_arr = item.to;
      
          const to_res = await Promise.all(to_arr.map(async (cnt2) => {
            const curr2 = cnt2.toLowerCase();
            const apiRes = await axios.get(URL + `${cnt1.toLowerCase()}/${cnt2.toLowerCase()}.json`);
            const resData = apiRes.data;
      
            console.log({ "to": cnt2, "value": (resData[curr2]) * amount });
      
            return { "to": cnt2, "value": (resData[curr2]) * amount };
          }));
          return {"amount":amount,"from":cnt1.toLowerCase(),"exchangeValues":to_res};
          
        }));
      
        console.log(result);
        return result;
      }
    
      const x = await tt(arr);
      
      res.json(x);
      
      
      
    
    res.json(req.body);
})



app.listen(8800,()=>{
    console.log("connected!!");
    
})

