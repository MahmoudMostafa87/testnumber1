const express=require('express');
const sql=require('mssql');

const router=express.Router();



async function connetbydatabase(){
    try{
        const pool=await sql.connect({
            user:'mahmoud',
            password:1235,
            server:'127.0.0.2',
            database:'resturant',
        });
        console.log('connection with relation');
        return pool;
    }
    catch(ex){
        console.log('not can connect');
    };
};
connetbydatabase();

sql.query(
    `
    CREATE TABLE if not exist Employee{
    ID primary key AUTO_INCREMENT,
    First_name VARCHAR(200),
    Last_name VARCHAR(200),
    AGE INT,
    PHONE INT UNIQUE,
    };
    
    CREATE TABLE is not exist Customer{
    ID primary key AUTO_INCREMENT,
    First_name VARCHAR(200),
    Last_name VARCHAR(200),
    AGE INT,
    PHONE INT UNIQUE,
    SALARY DESMAIL(4,2) NOT NULL
    };
    
    
    create table is not exist Account{
    ID int primary key AUTO_INCREMENT,
    Email varchar(225) unique NOT NULL,
    Password varchar(30) unique NOT NULL,
    Username varchar(200) UNIQUE NOT NULL,
    FOREGINE KEY(ID)REFERENCES Customer(ID);
    FOREGINE KEY(ID)REFERENCES Chef(ID);
    
    };
    `
).then(()=>{console.log('created table')})
 .catch((err)=>console.error('ERROR==========',err));

/*create all api and in custoemer and chef create api */

router.get('/developer',(req,res)=>{
    const quary='SELECT * FROM Account ORDER BY ID;';
    sql.query(quary,(err,rows)=>{
        if(err)res.status(500).json(err);
        res.status(200).json(rows);
    })
});

router.get('/Account/:id',(req,res)=>{
    const ID=req.params.id;
    const quary=`SELECT * FROM Account WHERE ID=${ID};`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).send(err);
        res.status(200).json(rows);
    });
})


router.post('/Sign_in',(req,res)=>{
    const {Username,Password,Email}=req.body;
    const quary=`INSERT INTO Account(Username,Password,Email) VALUES(${Username},${Password},${Email});`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).send(err);
        res.status(200).send('created Account Successful');
    })
})
router.get('/login',(req,res)=>{
    const {Username,Password}=req.body;
    const quary=`SELECT Username,Password FROM Account WHERE Username=${Username} AND Password=${Password};`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).send(err);
        res.status(200).json(rows);
    })
})

router.put('/updateAccount/:id',(req,res)=>{
    const {newUsername,newEmail,newPassword}=req.body;
    const ID=req.params.id;
    const quary=`UPDATE Account 
    SET Username=${newUsername},Email=${newEmail},Password=${newPassword}
    where ID=${ID};`
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).send(err);
        res.status(200).send('done update');
    });
});

router.delete('/account/delete/:id',(req,res)=>{
    const quary=`DELETE FROM Account WHERE ID=${req.params.id}`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).send(err);
        res.status(200).send('delete successful');
    });
});



module.exports=router;


