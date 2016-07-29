var newVer = 0, w;
// 资源更新
function updateResources() {
	var _newVer = plus.storage.getItem("_newVer");
	$.ajax({
		url: Common.api + '/resource',
		async: true,
		cache: false,
		method: 'get',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.code == 200) {
				newVer = data.version;
				if(_newVer == null) {
					_newVer = Common.version;
				}
				if(_newVer < newVer) {
					downWgt(data); // 下载升级包
				}
			}
		}
	});
}

// 下载wgt文件
function downWgt(data) {
	mui.confirm("发现新版本，约" + data.size + "，是否更新？", "红旅动漫", ["下次吧", "好哒~"], function(e) {
		if(e.index == 1) {
			w = Common.showWaiting("下载资源...");
			plus.downloader.createDownload(data.url, {
				filename: "_doc/update/"
			}, function(d, status) {
				if(status == 200) {
					installWgt(d.filename); // 安装wgt包
				} else {
					mui.toast("更新失败");
					Common.closeWaiting(w);
				}
				plus.nativeUI.closeWaiting();
			}).start();
		}
	});
}

// 更新应用资源
function installWgt(path) {
	w = Common.showWaiting("更新资源...");
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		plus.storage.setItem("_newVer", newVer);
		setTimeout(function() {
			plus.runtime.restart();
		}, 500);
	}, function(e) {
		Common.closeWaiting(w);
		mui.toast("更新失败");
	});
}