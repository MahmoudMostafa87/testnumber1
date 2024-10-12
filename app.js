const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const home=require('./router/home');
const customer=require('./router/customer');
const chef=require('./router/chef');
const app=express();
app.use(express.json());
app.set('view engine','pug');
app.set('views','./view');


app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.static('for learn'));
app.use(express.urlencoded({extended:true}));


app.use('/',customer);
app.use('/setting',home);
app.use('/Employees/setting/',chef);


const port=process.env.Port||8000;

app.listen(port,'127.0.0.2',()=>{
    console.log(`running...${port}`);
})
