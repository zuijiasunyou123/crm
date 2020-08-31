
//登录功能
$(".submit").click(async function(){
    let account =$(".userName").val().trim()
    let password =$(".userPass").val().trim()

    if (account == ""|| password ==""){
        return alert("账号密码不能为空~")
    }
    
    password = md5(password)


  /*   axios.post("/user/login",{
        account,
        password
    }).then(res=>{
         if(parseInt(res.code)===0){
        alert ('ok')
        window.location.href="index.html"
        return
    }
    alert("用户名密码出错了")
    }).catch(reason=>{
        console.log(reason);
    }) */


   /*  try{
        let res =await axios.post("/user/login",{account,password})
    }catch(e){
        console.log(e);
    } */


      let res =await axios.post("/user/login",{account,password})
    //console.log(res);
    if(parseInt(res.code)===0){
        alert ('ok')
        window.location.href="index.html"
        return
    }
    alert("用户名密码出错了") 
})