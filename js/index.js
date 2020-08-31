init()
let $navList=$(".navBox>a")
let $itemBox =null
let $plan = $.Callbacks()
$plan.add((_, baseInfo) => {
    $(".baseBox>span").html(`你好,${baseInfo.name || ''}`)
    $(".baseBox>a").click(async function () {
        let result = await axios.get("/user/signout")
        if (result.code == 0) {
            window.location.href = "login.html"
            return
        }
        alert("网络不给力，稍后再试")
    })
})
$plan.add((power) => {
    let str =``
    if (power.includes("userhandle")) {
         str += `
        <ol class="itemBox" text="员工管理">
				<h3><i class="iconfont icon-yuangong"></i>员工管理</h3>
				<dl class="item">
					<dd>
						<a href="./page/userlist.html" target="iframeBox">员工列表</a>
					</dd>
					<dd>
						<a href="./page/useradd.html" target="iframeBox">新增员工</a>
					</dd>
				</dl>
			</ol>
        `
    }
    if (power.includes("departhandle")) {
         str += `
        <ol class="itemBox" text="部门管理">
				<h3><i class="iconfont icon-laoban"></i>部门管理</h3>
				<dl class="item">
					<dd>
						<a href="./page/departmentlist.html " target="iframeBox">部门列表</a>
					</dd>
					<dd>
						<a href="./page/departmentadd.html" target="iframeBox">新增部门</a>
					</dd>
				</dl>
			</ol>
        `
    }
    if (power.includes("jobhandle")) {
        str += `
        <ol class="itemBox" text="职务管理">
				<h3><i class="iconfont icon-zhiwuguanli"></i>职务管理</h3>
				<dl class="item">
					<dd>
						<a href="./page/joblist.html" target="iframeBox">职务列表</a>
					</dd>
					<dd>
						<a href="./page/jobadd.html" target="iframeBox">新增职务</a>
					</dd>
				</dl>
			</ol>
		
        `
    }
    if (power.includes("customerall")) {
        str += `
        <ol class="itemBox" text="客户管理">
				<h3><i class="iconfont icon-kehuguanli"></i>客户管理</h3>
				<dl class="item">
					<dd>
						<a href="./page/customerlist.html" target="iframeBox">我的客户</a>
					</dd>
					<dd>
						<a href="./page/customerlist.html" target="iframeBox">全部客户</a>
					</dd>
					<dd>
						<a href="./page/customeradd.html" target="iframeBox">新增客户</a>
					</dd>
				</dl>
			</ol>
        `
    }
$(".menuBox").html(str)
$itemBox =$(".menuBox").find(".itemBox")

})
function initGroup(index){
   
    let $group1 =$itemBox.filter((_,item)=>{
        let text = $(item).attr("text")
        return text ==="客户管理"
    });
    let $group2 =$itemBox.filter((_,item)=>{
        let text = $(item).attr("text")
        return /^(员工管理|部门管理|职务管理)/.test(text)
    })

    if(index==0){
        $group1.css("display","block")
        $group2.css("display","none")
    }else if(index ==1){
        $group1.css("display","none")
        $group2.css("display","block")
    } 
}

$plan.add(power=>{

    let initIndex = power.includes("customerall") ? 0 : 1
    $navList.eq(initIndex).addClass("active").siblings().removeClass("active")
    initGroup(initIndex)


    $navList.click(function(){
        let index =$(this).index()
        let text =$(this).html().trim()
        if((text == "客户管理")&& !/customerall/.test(power) || ((text =="组织结构")&& !/(userhandle|departhandle|jobhandle)/.test(power))){
            alert("没有权限访问！")
            return
        }
        if(index == initIndex) return
        $(this).addClass("active").siblings().removeClass("active")
        initGroup(index)
        initIndex = index
    })
})

$plan.add(power=>{
    let url ="./page/customerlist.html"
    if(power.includes("customerall")){
        $(".iframeBox").attr("src",url)
    }
})



async function init() {
    let result = await axios.get("/user/login")
    if (result.code != 0) {
        alert("你还没有登录，请先登录吧~")
        window.location.href = "login.html"
        return
    }
    let [power, baseInfo] = await axios.all([
        axios.get("/user/power"),
        axios.get("/user/info")
    ])
    baseInfo.code == 0 ? baseInfo = baseInfo.data : null
    power.code == 0 ? power = power.power : null

    $plan.fire(power, baseInfo)
}

