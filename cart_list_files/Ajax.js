/**
	�ۼ��� : 2007-02-06
	�۾��� : �̵�ȯ
	��  �� : Ajax
*/

var Ajax = { xmlRequest:null };

Ajax.initRequest = function(){
	// 2008.03.10
	// ie ������ ����ʿ� ���� �ѱ۱��� ���� �߻� �Ʒ� �ҽ� ��� �Ұ�
	/*
	var tempRequest;
	try{
		tempRequest = new ActiveXObject('Msxml2.XMLHTTP')
	}catch(e){
		try{
			tempRequest = new ActiveXObject('Microsoft.XMLHTTP');
		}catch(e2){
			try{
				tempRequest = new XMLHttpRequest();
			}catch(e3){
				tempRequest = false;
			}
		}
	}*/
	Ajax.xmlRequest = Ajax.getXmlHttpRequest();
}

Ajax.getXmlHttpRequest = function(){

	var tryThese = [function () { return new ActiveXObject('Microsoft.XMLHTTP'); },
					function () { return new XMLHttpRequest(); },
                    function () { return new ActiveXObject('Msxml2.XMLHTTP'); },
                    function () { return new ActiveXObject('Msxml2.XMLHTTP.7.0'); },
                    function () { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); },
                    function () { return new ActiveXObject('Msxml2.XMLHTTP.5.0'); },
                    function () { return new ActiveXObject('Msxml2.XMLHTTP.4.0'); },
                    function () { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); },
                    function () { throw new Exception('Your browser does not support XMLHttpRequest'); },
                   ];

	for (var i = 0; i < tryThese.length; i++){

		XMLHttp = tryThese[i];
		var func = tryThese[i];

		try {

			return func();
		} catch (e) {}
	}
}

Ajax.initRequest();

Ajax.checkBrowser = function(){
	var name = navigator.appName;
	var version = navigator.appVersion;
	var IE  = (name.indexOf("Explorer") > -1) ? true : false;
	var Opera = (name.indexOf("Opera") > -1) ? true : false;
	var Mozilla = (name.indexOf("Netscape") > -1) ? true : false;
	var Safari = (name.indexOf("Safari") > -1) ? true : false;

	return {name:name, version: version, IE:IE, Opera:Opera, Mozilla:Mozilla, Safari:Safari};
}

Ajax.broweser = Ajax.checkBrowser();

Ajax.callBack = function(xmlReq, return_type, callBack){
	if(return_type == "xml"){
		callBack(xmlReq.responseXml);
	}else{
		callBack(xmlReq.responseText);
	}
}

Ajax.send = function(send_info){
	var xmlReq = Ajax.xmlRequest;

	if(send_info.param != null && send_info.param != ""){
		send_info.param = send_info.param;

		if(send_info.method.toUpperCase() == 'GET'){
			send_info.url += "?" + send_info.param + "&time_cache=" + (new Date()).getTime();
			send_info.param = ''; // �Ķ���͸� ����.
		}else{
			send_info.url += "?time_cache=" + (new Date()).getTime();
		}
	}

	xmlReq.open(send_info.method, send_info.url, send_info.async);

	var contentTypeUrlenc = "application/x-www-form-urlencoded; charset=UTF-8";

	if(!Ajax.broweser.Opera){
		xmlReq.setRequestHeader("Content-Type", contentTypeUrlenc);
	}else{
		if((typeof xmlReq.setRequestHeader) == "function")
			xmlReq.setRequestHeader("Content-Type", contentTypeUrlenc);
	}

	if(Ajax.broweser.Opera || Ajax.broweser.Safari || Ajax.broweser.Mozilla){
		xmlReq.onload = function (){
							Ajax.callBack(xmlReq, send_info.return_type, send_info.callBack);
						};
	}else{
		xmlReq.onreadystatechange = function(){
							if(xmlReq.readyState == 4)
								Ajax.callBack(xmlReq, send_info.return_type, send_info.callBack);
						};
	}

	xmlReq.send(send_info.param);
}

/**
 * XmlHttpRequest�� ���� ���
 * url : ȣ���� url
 * method : ���۹��
 * param : &�� �� �Ķ���� ����, ������ �Ķ���� ������ ""�� �Ѵ�.
 * async : �񵿱��� - true, false
 * cb_func : �ݹ���� - functionŸ�� �״�� �Ѱ��ش�. �ݹ������ ���ڴ� ��ȯ���� �ް� ��
 * return_type : �ݹ���ǿ��� ���� ������ Ÿ�� text �Ǵ� xml
 * ��簪�� �ݵ�� �������ش�.
 */
function fn_getValueByAjax(url, method, param, async, cb_func, return_type){
	Ajax.send({
		url:url,
		method:method,
		param:param,
		async:async,
		callBack:cb_func,
		return_type:return_type
	});
}

/**
 * @param urlString event url
 * @param cbFunction ȣ�� ����� ���� function��.
 */
function fn_doAjax(urlString, cbFunction) {
    if ( urlString == "" ) {
        alert("URL string is empty...");
        return false;
    }

    $.ajax({
        url: urlString,
        cache : false,
        context: document.body,
        success: function(msg){
            if ( cbFunction != "" ) {
                eval(cbFunction+'('+msg+')');
            }
        },
        error: function(){
            if ( cbFunction != "" )
                eval(cbFunction+'()');
        }
    });
}

