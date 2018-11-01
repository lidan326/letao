$(function () {
  var currentPage=1;
  var pageSize=5;
  var currentId;
  var isDelete;
  render();
  function render(){
    $.ajax({
      data: {
        page: currentPage,
        size: pageSize,
  
      },
      type: 'get',
      url: '/user/queryUser',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        // 通过模板引擎渲染
        // var htmlStr= template("模板id","数据对象")
        var htmlStr = template("tmp", info);
        // 渲染到页面中
        $('tbody').html(htmlStr);
  
  
        //配置分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log(page);
            
            currentPage=page;
            render();
          }
        });
      }
    });
  }

  //禁用按钮
  $('tbody').on('click','.btn',function(){
    // console.log("点击事件");
    $('#userModal').modal('show');
    currentId=$(this).parent().data("id");
    isDelete=$(this).hasClass('btn-danger')?0:1;
    
  });

  // 点击模态框确定按钮, 进行修改用户状态
  $('#submitBtn').click(function(){
    // console.log(currentId);
    // console.log(isDelete);
    
    //发送ajax请求
    $.ajax({
      type:"post",
      url:'/user/updateUser',
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        console.log(info);
       // 关闭模态框
       $('#userModal').modal("hide");

       // 页面重新渲染当前页
       render();
        
      }
    })

  })

})