const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('home',{Document:'hallo in my page'});
});

module.exports=router;