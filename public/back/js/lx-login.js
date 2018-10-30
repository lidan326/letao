$(function () {
  /*
 * 1. 进行表单校验配置
 *    校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
 * */
  $("#form").bootstrapValidator({
    //设置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定效验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          // 用以配置 ajax 回调的提示
          callback: {
            message: "用户名不存在"
          }

        }
      },


      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          // 用以配置 ajax 回调的提示
          callback: {
            message: "密码错误"
          }

        }
      },

    }




  });


  /*
* 2. 登录功能
*    表单校验插件会在表单提交时进行校验, 如果希望通过 ajax 提交
*    可以注册表单校验成功事件, 在事件中, 阻止默认的跳转提交, 通过 ajax 进行提交
* */
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    // console.log("阻止了默认的提交");
    $.ajax({
      type: "post",
      data: $("#form").serialize(),
      url: " /employee/employeeLogin",
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "lx-index.html";
        }
        if (info.error === 1000) {
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }
        if (info.error === 1001) {
          // 密码错误
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      }
    })
  })

  /*
  * 3. 重置功能完成
  * */
  $('[type="reset"]').click(function () {
    // 调用实例的方法, 重置校验状态和内容
    // resetForm 传true, 内容和校验状态都重置
    //           不传true, 只重置校验状态
    $('#form').data("bootstrapValidator").resetForm(true);
  })
})
