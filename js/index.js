var tr =
	'<tr class="tkv">' +
	'<td>参数</td>' +
	'<td>key:<input class="keys" /></td>' +
	'<td>value:<input class="values"/></td>' +
	'<td> <button class=" btn btn-primary del"  style="border-radius:80px; width: 30px;height: 30px;"><span class="glyphicon glyphicon-remove"></span></button>' +
	'</td>' +
	'</tr>';
var navidx = 0;
$(function() {
	init();
	//添加按钮
	$('#add').on('click', add);
	$('#paramter').on('click', '.del', del);
	$('.submit').on('click', submit);
	$('.nav-item').on('click', liEvent);
	$('#link').on('click', function() {
		window.open("http://192.168.1.188:1682/");
	});
});
/**
 * 初始化
 */
function init() {
	$('.ert').css('display', 'none')

}
/**
 * 添加参数
 */
function add() {
	$('.trdel').before(tr);

}
/**
 * 删除参数
 */
function del() {
	$(this).parent().parent().remove();

}
/**
 * 提交请求
 */
function submit() {

	//http://192.168.1.188:7788/AssemblyOrder.aspx?action=loginuser
	var json = jsondata(navidx),
		URL = $('#URL').val(),
		type = $(this).val();

	if(!chekIsNull(URL)) {
		$('.ert').fadeIn();
		$('#erro').html("接口地址不能为空");
		$('.ert').fadeOut(3000);
		//		var timer = window.setTimeout(function() {
		//			$('.ert').fadeOut();
		//			timer = null;
		//		}, 2000);

		return;
	}
	if(!chekIsNull(json)) {
		$('.ert').fadeIn();
		$('#erro').html("参数不能为空");
		$('.ert').fadeOut(3000);
		//		var timer = window.setTimeout(function() {
		//			$('.ert').css('display', 'none');
		//			timer = null;
		//		}, 2000);

		return;
	}

	console.log(type);
	//console.log(JSON.stringify(json));
	console.log(URL);
	if(type == 0) {
		post(URL, json);
	} else {
		get(URL, json);
	}

	//$('#myModal').modal('hide')//隐藏
}
/**
 * 模态框居中显示
 */
function centerModals() {　　
	$('#myModal').each(function(i) {　　　　
		var $clone = $(this).clone().css('display', 'block').appendTo('body');　　　　
		var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);　　　　
		top = top > 0 ? top : 0;　　　　
		$clone.remove();　　　　
		$(this).find('.modal-content').css("margin-top", top);　　
	});

	//	$('#myModal').on('shown.bs.modal', function (e) {
	//	          // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
	//	          $(this).css('display', 'block');
	//	          var modalHeight=$(window).height() / 2 - $('#youModel .modal-dialog').height() / 2;
	//	          $(this).find('.modal-dialog').css({
	//	              'margin-top': modalHeight
	//	          });
	//	      });

	/*$('#myModal').on('shown.bs.modal', function() {
		var $this = $(this);
		var dialog = $this.find('.modal-dialog');

		//此种方式，在使用动画第一次显示时有问题
		//解决方案，去掉动画fade样式
		var top = ($(window).height() - dialog.height()) / 2;
		dialog.css({
			marginTop: top
		});
	});*/

}
/**
 * post接口
 */
function post(URL, json) {
	console.log(json);
	if(navidx == 1) {
		json = JSON.parse(json);
	}
	$.ajax({
		type: 'POST',
		url: URL,
		data: json,
		datatype: 'json',
		success: function(d) {
			$('.contentData').html(d);
			// $('#myModal').modal('show'); //显示

			$('#myModal').modal('show'); //显示
			centerModals();
			$('.ert').css('display', 'none');
		},
		error: function(x, s, e) {
			$('.ert').fadeIn();
			$('#erro').html(x.status + "->" + "->" + x.readyState + "->" + s + "->" + e);
			$('.ert').fadeOut(3000);
		}
	});
}

/**
 * get方法
 */
function get(URL, json) {
	if(navidx == 1) {
		json = JSON.parse(json);
	}
	$.ajax({
		type: 'GET',
		url: URL,
		data: json,
		datatype: 'json',
		success: function(d) {
			$('.contentData').html(d);
			// $('#myModal').modal('show'); //显示

			$('#myModal').modal('show'); //显示
			centerModals();
			$('.ert').css('display', 'none');
		},
		error: function(x, s, e) {
			$('.ert').fadeIn();
			$('#erro').html(x.status + "->" + x.readyState + "->" + s + "->" + e);
			$('.ert').fadeOut(3000)
		}
	});

}
/**
 * 判定空值
 */
function chekIsNull(value) {
	if(!value && value.length == 0) {
		return false;
	}
	return true;

}

function liEvent() {
	navidx = $(this).attr('data-json');

}

function jsondata(navidx) {
	console.log(navidx);
	var json = {};
	if(navidx == 0) {
		var arr = $('.tkv');
		$.each(arr, function() {
			var key = $(this).find('input.keys').val();
			var value = $(this).find('input.values').val();
			if(chekIsNull(key) && chekIsNull((value))) {
				json[key] = value;
			}

		});
		return json;
	} else if(navidx == 1) {
		return json = $('#jsondata').val().trim();
	}

}