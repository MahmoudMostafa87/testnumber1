const express=require('express');
const sql=require('mssql');

const router=express.Router();

sql.connect({
    database:'resturant',
},(err)=>{
    if(err){console.error('not can connect :',err);
    process.exit(1);        
    }
    console.log('datebase connection');
});


router.get('Account/:id',(req,res)=>{
    const ID=req.params.id;
    const quary=`SELECT * FROM Employee WHERE ID=${ID};`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).json(err);
        res.status(200).json(rows);
    });
});
/*create all api and in custoemer and chef create api */


router.post('/Sign_in',(req,res)=>{
    const {First_name,Last_name,Phone,age}=req.body;
    const quary=`INSERT INTO Employee(First_name,Last_name,PHONE,AGE) VALUES(${First_name},${Last_name},${Phone},${age});`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).json(err);
        res.status(200).json('created Account Successful');
    });
})
router.get('/login',(req,res)=>{
    const {ID}=req.body;
    const quary=`SELECT Firstname,Lastname FROM Employee WHERE ID=${ID};`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).json(err);
        res.status(200).json(rows);
    })
})

router.put('/updateAccount/:id',(req,res)=>{
    const {Phone}=req.body;
    const ID=req.params.id;
    const quary=`UPDATE Employee 
    SET Phone=${Phone}
    where ID=${ID};`
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).json(err);
        res.status(200).json('done update');
    });
});

router.delete('/account/delete/:id',(req,res,next)=>{
    const quary=`DELETE FROM Employee WHERE ID=${req.params.id}`;
    sql.query(quary,(err,rows)=>{
        if(err)return res.status(500).json(err);
        res.status(200).json('delete successful');
    });
});



module.exports=router;
