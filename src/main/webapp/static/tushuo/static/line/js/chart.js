define(function(require, exports, module) {

    var $ = require('jquery');
    var layui = require('./layui.js');

    module.exports = {
        init: function() {
            // 基于准备好的dom，初始化echarts实例
			chartObj = echarts.init(document.getElementById('main'));
			// 指定图表的配置项和数据
			var chartOptStr = $('#chartOpt').html();
			eval(chartOptStr);
			// 使用刚指定的配置项和数据显示图表。
			this.loadData();
//			chartObj.setOption(chartOpt);
        },
        setOption: function(dom, bol, typ) {
        	if(bol) {
            	var domArr = $(dom).parent().find('div[data-opt]');
        		for(var i=0; i<domArr.length; i++) {
					var obj = domArr[i];
					if($(obj).hasClass('cpt-chkbtn-i-active')) {
						var opt = $(obj).data('opt');
						eval(opt);
						chartObj.setOption(chartOpt);
					}
				}
        		for(var i=0; i<$(dom).parent().find('input[data-opt]').length; i++) {
					var obj = $(dom).parent().find('input[data-opt]')[i];
					var val = $(obj).val();
					var opt = $(obj).data('opt');
					opt = opt.replace('val', val);
					eval(opt);
					chartObj.setOption(chartOpt);
				}
        	} else {
	        	if(typ == 'btn') {
					var opt = $(dom).data('opt');
					console.info(opt);
					eval(opt);
					chartObj.setOption(chartOpt);
	        	} else if(typ == 'ipt') {
					var val = $(dom).val();
					var opt = $(dom).data('opt');
					opt = opt.replace('val', val);
					eval(opt);
					chartObj.setOption(chartOpt);
	        	} else {
					var dsp = $(dom).data('dsp');
	        		eval(dsp);
					chartObj.setOption(chartOpt);
	        	}
        	}
        },
        getSeriesIndex: function(zkey) {
        	var chartSeries = chartOpt.series;
        	for(var i=0; i<chartSeries.length; i++) {
        		if(chartSeries[i].zkey == zkey) {
        			return i;
        		}
        	}
        },
        loadData: function (menu) {
        	var formData = layui.formData();
        	if(!formData) {
        		return false;
        	}
        	$.ajax({
				type: "post",
				url: ctx+'/ks/chartEngine/config',
				data: formData,
				dataType: 'json',
				beforeSend: function(XMLHttpRequest){
				},
				success: function(data, textStatus){
					for(var i=0; i<data.series.length; i++) {
						for(var j=0; j<chartOpt.series.length; j++) {
							if(data.series[i].zkey == chartOpt.series[j].zkey) {
								//data.series[i] = $.extend(true, chartOpt.series[j], data.series[i]);
								$.extend(true, data.series[i], chartOpt.series[j]);
								break;
							}
						}
					}
					delete chartOpt.series;
					$.extend(true, chartOpt, data);
					module.exports.initSeries();
					chartObj.setOption(chartOpt);
					if(menu != null) {
						menu.createSeries(chartOpt.series);
					}
				}
			});
            return true;
        },
        initSeries: function(seriesArr) {
        	for(var i=0; i<chartOpt.series.length; i++) {
        		if(chartOpt.series[i].type==null) {
        			chartOpt.series[i].type = 'line';
        		}
        		if(chartOpt.series[i].stack==null) {
        			chartOpt.series[i].stack = null;
        		}
        	}
        },
        initCode: function () {
        	editor_func = CodeMirror.fromTextArea(
	   			document.getElementById('func'),
	   			{
	   				lineNumbers : true,
	   				matchBrackets : true,
	   				theme : 'ambiance',
	   				indentUnit : 4,
	   				styleActiveLine : true,
	   				lineWrapping : true
	   			});
        	editor_func.setSize('auto', '100%');
        }
    };
});
