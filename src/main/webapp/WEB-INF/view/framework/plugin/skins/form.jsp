<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/taglib/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>构造演示界面</title>
	<%@ include file="/WEB-INF/view/taglib/header.jsp" %>
	<%@ include file="/WEB-INF/view/taglib/easyui.jsp" %>
	<%@ include file="/WEB-INF/view/taglib/layer.jsp" %>
	<%@ include file="/WEB-INF/view/taglib/uedit.jsp" %>
  </head>
  <body>
 	<div style="position:absolute;top:10px;left:20px;right:20px;bottom:10px;">
        <form id="dataForm" method="post">
			<div class="fitem">
                <label>说明</label>
                <input id="name" name="name" class="easyui-textbox" data-options="required:true,tipPosition:'top'"/>
                <span id="msg-name" class="err-msg"></span>
            </div>
			<div class="fitem">
                <label>页面路径</label>
                <input id="url" name="url" class="easyui-textbox" data-options="required:true,tipPosition:'top'"/>
                <span id="msg-url" class="err-msg"></span>
            </div>
			<div class="fitem">
                <label>页面名</label>
                <input id="main" name="main" class="easyui-textbox" data-options="required:true,tipPosition:'top'"/>
                <span id="msg-main" class="err-msg"></span>
            </div>
            <input id="id" name="id" type="hidden"/>
		</form>
    </div>
    <script type="text/javascript">
	    var loadi,url,index = parent.layer.getFrameIndex(window.name);
	    $(document).ready(function(){
	        var row = parent.$('#dataList').datagrid('getSelected');
	        url = '${ctx}/sys/skins/save';
	        $('#parentId').combotree({
	        	onLoadSuccess: function() {
			        $('#parentId').combotree('setValue', parent.$('#sel_parentId').val());
	        	}
	        });
	        if(row != null) {
	            $('#dataForm').form('load', row);
	    		url = '${ctx}/sys/skins/update';
	        }
	    });
	
	    function submitInfo(){
	        $('#dataForm').form('submit',{
	            url: url,
	            onSubmit: function(param){
	            	if($(this).form('validate')) {
	            		loadi = parent.layer.load(2, {shade: layerLoadShade,time: layerLoadMaxTime});
	            	}
	                return $(this).form('validate');
	            },
	            success: function(data){
	            	parent.layer.close(loadi);
	                cleanErrMsg();
	                var data = eval('(' + data + ')');
	                if (data.success==TRUE){
	            		parent.reloadData();
	                	parent.layer.msg("操作成功！", {offset: 'rb',icon: 6,shift: 8,time: layerMsgTime});
	            		parent.layer.close(index);
	                } else {
	                    renderErrMsg(data.message);
	                }
	            }
	        });
	    }
    </script>
  </body>
</html>
