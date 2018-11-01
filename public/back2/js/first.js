$(function () {
  var currentPage = 1;
  var pageSize = 5;
  // 1. 发送ajax请求数据, 进行渲染
  render();
  function render() {
    $.ajax({
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('firstTpl', info);
        $('tbody').html(htmlStr);
        //进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          // 绑定页码点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })

      }
    });
  };

  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
  });

  // 3. 表单校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置需要校验的字段
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  });

  // 4. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        // 关闭模态框
        $('#addModal').modal('hide');
        // 页面重新渲染第1页
        currenPage = 1;
        render();
        // 调用 resetForm 进行重置
        // resetForm(true) 传 true 表示内容和校验状态都重置
        $('#form').data('bootstrapValidator').resetForm(true);
      }
    })
  })




});