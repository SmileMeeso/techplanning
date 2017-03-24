/** ��Ʈ ��ٱ��� ���� **/
// ������߰� (��Ʈ ���� ��ȸ��[�����ּҸ� ����])
function insertMartAddress() {
	var param =  "?possibleAddrTypCd=01"
				+ "&afterSendAddrSeqYn=Y"
				+ "&afterSendAddrSeqObjNm=tempSettingMartAddrSeq"
				+ "&afterRedirectUrl=" + encodeURIComponent(document.location.href)
	document.location.href = _MOBILE_URL_ + "/MyPage/shippingInfoAdd.tmall" + param;
}

var getCommaValue = function (n) {
	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');
  	return n;
};
//[�ֹ����� - �ɼ� ] ================================================================================================
/**
 * ������ �ɼ� ����� (������)
 */
function createInputOpt(entOptIdx ,optNm, optNo , selCnt ){
	var inputOptElements = [];
	inputOptElements.push('<li >');
	inputOptElements.push('<div>');
	inputOptElements.push('<input type="hidden" name="optionDispName" value="'+optNm+'"/>');
	inputOptElements.push('<input type="hidden" name="optionDispNo" value="'+ optNo+'"/>');
	inputOptElements.push('<input type="text"   name="optionDispText" id="optionDispText'+entOptIdx+'" onkeyup="_checkTagKeyUp(this);" placeholder="'+optNm+'" />');
	if(selCnt <= 0){
		inputOptElements.push('<input type="hidden" name="optionName" value="'+optNm +'"/>');
		inputOptElements.push('<input type="hidden" name="optionNo" value="'+ optNo +'"/>');
		inputOptElements.push('<input type="hidden"  name="optionText" id="optionText'+entOptIdx +'" value="" />');
	}

	inputOptElements.push('</div>');
	inputOptElements.push('</li>');
	var inputOptLength = jQuery('#ul_productOpt li:not(.opt_slt)').length;
	if(inputOptLength < 1 ){
		jQuery('#ul_productOpt').prepend(inputOptElements.join(''));
	}else{
		var prevInputOpt = jQuery('#ul_productOpt li:not(.opt_slt)')[inputOptLength -1 ];
		jQuery('#ul_productOpt').prepend(inputOptElements.join(''));
	}

	if(selCnt <=0){
		jQuery(function(){
			jQuery("#optionDispText" + entOptIdx).on({
				keyup :  function(){
					jQuery('#optionText' + entOptIdx).val(jQuery(this).val());
				}
			});
			document.getElementById("optionDispText"+ entOptIdx).onchange = function(){
				document.getElementById("optionText" + entOptIdx).value = this.value;
			};
		});
	}
}


var eachOpt = function(){
	function setInitLayer(){
			jQuery(".slt_op" ,"#ul_productOpt").each(function(i){
				var _this = jQuery(this);

				if(i == 0){
					_this.css("display" , "block");
					_this.find(".box").css("display" , "block");
					_this.find('li').removeClass("on");
				}
				layerSetting(_this , i);
			});
	}

	function openLayer( idx){
		var targetObj = jQuery(".slt_op" ,"#ul_productOpt")[idx];
		if(jQuery(targetObj).length > 0){
			layerSetting(targetObj , idx);
		}
	}

	function layerSetting(targetObj , idx){
		var contNm = jQuery(targetObj).find(".box").attr("id");
		optIscroll.getScroll(contNm);
		var layerCnt = jQuery(".slt_op" ,"#ul_productOpt").length;
		jQuery(targetObj).find('.name a').addClass('on');

		jQuery(targetObj).find('.box a').on("click", function(e){
	    	e.preventDefault();
	    	jQuery(targetObj).find('li').removeClass("on");
	    	jQuery(this).parent().addClass("on");
	    	jQuery("#optSelectedNm"+ idx).text(jQuery(this).text());
	    	if(idx >= layerCnt -1 ){
	    		var isDeselectObj =false;
	    		jQuery(".slt_op"  ,"#ul_productOpt").each(function(){
	        		var selectObj = jQuery(this).find("li.on").length;
	        		if(selectObj <= 0){
	        			isDeselectObj = true;
	        		}
	        	});
	    		if(!isDeselectObj){
	    			optLastOptionSelected();
	    		}
	    	}else{
	    		disableOptLayer(idx);
	    		var nextObjId = jQuery(jQuery(".slt_op" , "#ul_productOpt")[idx+1]).find(".box").attr("id");
	    		optionLayerToggle(nextObjId);
	    	}
		});
	}
	return {
		setInitLayer :function(){
			setInitLayer();
		},
		openLayer : function(idx){
			openLayer(idx);
		}
	};
}();
var optSearch = function(){
	var wrapper = null;
	var $list = null;
	var listId = null;
	var listArr =  new Array(100);

	function setWrapper(id){
		wrapper = jQuery("#" + id);
	}
	function setData(idx , data){
		if(typeof(listArr[idx]) == 'undefined' || listArr[idx] == null ){
			listArr[idx] = data;
		}
	}

	function setInitData(idx , data){
		listArr[idx] = data;
	}

	function getListData(idx){
		if(typeof(listArr[idx]) != 'undefined' && listArr[idx] != null ){
			return listArr[idx];
		}else{
			return null;
		}
	}

	function setEvent(){
		jQuery("#optSchTxt").keyup(  function(){
				setTimeout( function() {searchKwd();} , 100);
		});

		jQuery("#optSchTxt").on("click" , function(){
			//callStatAjax('MPA06','MPA0601');
		});

		jQuery("#optSch .sbm").on("click" , function(){
			setTimeout( function() {
				searchKwd();
				var $visibleLayer = jQuery(".box:visible ul" , "#opt_selectList");
				if(jQuery($visibleLayer).find('li').length <= 0){
					jQuery($visibleLayer).html('<li class="none">�˻�� �ش��ϴ� �ɼ��� �����ϴ�.</li>');
				}
			} , 100);

		});
		jQuery("#optSch .del").on("click" , function(){
			resetSearch();
			setTimeout( function() {
				searchKwd();
			} , 100);
		});
	}

	function searchKwd(){
		var $visibleLayer = jQuery(".box:visible ul" , "#opt_selectList");
		if(jQuery($visibleLayer).length <= 0){
			return;
		}

		var currId = jQuery($visibleLayer).attr("id");

		if( typeof(currId) == 'undefined'){
			return;
		}

		var contSeq = _fnOptGetContSeq(currId);

		if(listId != currId ){
			$list = jQuery($visibleLayer).find("li");
			setData(contSeq, $list);
			listId = currId;
		}

		var $kwdList = [];
		var keyword = jQuery("#optSchTxt").val();
		jQuery("#optSelectedNm" + contSeq).text('');

		jQuery($list).each(function(i){
			var _this = this;
			var keyidx = jQuery(_this).find('a').text().toLowerCase().indexOf(keyword.toLowerCase());

			if( keyidx >= 0 ){
				var $text = jQuery(_this).find('a').text();

				var lowerOptions = jQuery(_this).find('a').text().toLowerCase();
				var lowerKeyword = keyword.toLowerCase();

				var idx = lowerOptions.indexOf(lowerKeyword);
				var pre = $text.substr(0,idx);
				var sur = $text.substr(idx+keyword.length,$text.length);
				var orgKeyword = $text.substr(idx,keyword.length);
				var finText = $text;

				if(keyword != ''){
					finText = pre + '<b>' + orgKeyword + '</b>' + sur;
				}

				jQuery(_this).find('a').html(finText);
				$kwdList.push(  _this );
			}
		});
		jQuery($visibleLayer).html($kwdList);
		jQuery($list).removeClass('on');
		if(_selOptTypCd == '02'){
			eachOpt.openLayer(contSeq);
		}else{
			enableOptLayer(contSeq);
		}

	}
	function resetElement(obj ,idx){
		jQuery(obj).html($list);
		enableOptLayer(idx ,'S' , true);
	}

	function resetSearch(){
		jQuery("#optSchTxt").val('');
		var $visibleLayer = jQuery(".box:visible ul" , "#opt_selectList");
		if(jQuery($visibleLayer).length > 0){
			var currId = jQuery($visibleLayer).attr("id");
			var contSeq = _fnOptGetContSeq(currId);
			jQuery("#optSelectedNm" + contSeq).text('');
			jQuery("#optSelect" +contSeq).find('li').removeClass('on');

			if(typeof(_selOptTypCd) != 'undefined' && _selOptTypCd !="02" ){
				optResetOption($visibleLayer, contSeq + 1);
			}
		}
	}

	return {
		setEvent : function(){
			 return setEvent();
		},
		resetElement : function(obj , idx){
			 resetElement(obj , idx);
		},
		setInitData : function(idx , data){
			setInitData(idx , data);
		},
		resetSearch : function(){
			resetSearch();
		},
		searchKwd : function(){
			searchKwd();
		},
		getListData : function(idx){
			return getListData(idx);
		}
	};
}();
function optionLayerToggle(objId){
	jQuery(".box", "#ul_productOpt" ).css("display" ,"none");
	var $openObj = jQuery("#"+objId);
	jQuery($openObj).css("display" ,"block");

	var contSeq = _fnOptGetContSeq(objId);

	if(jQuery($openObj).find('li.none').length > 0){
		jQuery($openObj).find('ul').html('');
	}

	var $link = jQuery(".slt_op .name a").each(function(i){
		if(i == contSeq){
			jQuery(this).addClass('on');
		}else{
			jQuery(this).removeClass('on');
		}
	});

	var element = optSearch.getListData(contSeq);

	if(element != null){
		jQuery(element).find("a").each(function(){
			jQuery(this).text(jQuery(this).text().replace('<b>',''));
			jQuery(this).text(jQuery(this).text().replace('</b>',''));
		});
		jQuery($openObj).find('ul').html(element);
		if(_selOptTypCd == '02'){
			eachOpt.openLayer(contSeq);
		}else{
			enableOptLayer(contSeq , null , true);
		}
	}
	jQuery("#optSchTxt").val('');
	optIscroll.getScroll(objId);
}
var optIscroll = function(){
	var _scrollArr = new Array();

	function setScroll(id){
		var _scrollObjcet = new Object();
		_scrollObjcet[id] = new iScroll(id );
		_scrollArr.push(_scrollObjcet);
		return _scrollObjcet;
	}

	function getScroll(id){
		var isCreated = false;
		for(var i = 0 ; i < _scrollArr.length ; i++){
			Object.keys(_scrollArr[i]).forEach(function(k){
				if(k == id){
					var _scrollObjcet =_scrollArr[i];
					_scrollObjcet[id].refresh();
					_scrollArr[i] = _scrollObjcet;
					isCreated = true;
					return _scrollObjcet;
				}
			});
		}
		if(!isCreated){
			 return setScroll(id);
		}
	}

	return {
		getScroll : function(id){
			 return getScroll(id);
		}

	};
}();

function enableOptLayer(idx ,optType , visible){
	var $layer = jQuery(".slt_op")[idx];
	if(jQuery($layer).length > 0){
		if(!visible){
			jQuery($layer).css("display" , "block");
			jQuery($layer).find(".box").css("display" , "block");
			jQuery($layer).find('li').removeClass("on");
		}

		var contNm = jQuery($layer).find(".box").attr("id");
		var contSeq = '';
		if( typeof(contNm) != 'undefined'){
			contSeq = _fnOptGetContSeq(contNm);
		}
		optIscroll.getScroll(contNm);

		var totalCnt = jQuery(".slt_op").length;
		jQuery($layer).find('.name a').addClass('on');

		jQuery($layer).find('.box a').on("click", function(e){
	    	e.preventDefault();
	    	jQuery($layer).find('li').removeClass("on");
	    	jQuery(this).parent().addClass("on");
	    	jQuery("#optSelectedNm"+ contSeq).text(jQuery(this).text());
	    	if(contSeq == totalCnt - 1){
	    		return;
	    	}
	    	disableOptLayer(idx);
	    });
	}
}
function disableOptLayer(idx){
	var $layer = jQuery(".slt_op")[idx];
	if(jQuery($layer).length > 0){
		jQuery($layer).find(".box").css("display" , "none");
		jQuery($layer).find('.name a').removeClass('on');
	}
}

function _fnOptGetStock(obj, seq){
    if (obj == null) return;
    jQuery('#opt_loading').css("display" , "block");

    var contNm = jQuery(obj).attr("id");;
    var contSeq = _fnOptGetContSeq(contNm);

    var targetObj = jQuery(obj).find("li.on");

    if (contSeq < 0)  return;
    var optArr = "";
	var optArrNm = "";
    if (_selOptCnt > 1)
    {
        var trgtObj;
        for ( var i = 0; i < _selOptCnt; i++)
        {
            trgtObj = jQuery("#optSelect" + i ).find("li.on");

            if (i < _selOptCnt - 1 && jQuery("#optSelectedNm" + i ).text() == "") {
                alert("���� �ɼ��� ���� �������ּ���.");
                optArr = "";
				optArrNm = "";
                break;
            }

            if (jQuery(trgtObj).length > 0){
				optArr = optArr + jQuery(trgtObj).find("a").attr("data-opt_value")+ ",";
				optArrNm = optArrNm + jQuery(trgtObj).find("a").text() +  ",";
            }
        } // end for
    }
    else
    {
        if ( jQuery(targetObj).length > 0 )   {
			optArr = optArr + jQuery(targetObj).find("a").attr("data-opt_value") + ",";
			optArrNm = optArrNm + jQuery(targetObj).find("a").text() + ",";
		}
    }
    // ���ð��� ���� ��� �ʱ�ȭ
    if (optArr == "" ||  jQuery(targetObj).length <= 0)
    {
    	enableOptLoadingLayer();
        return;
    }

    // �ɼ��ߺ� ���� üũ---------------- (�ɼǼ��ÿ��� ����)
    var optArrLst = document.getElementsByName("optArr");
    for ( var i = 0; i < optArrLst.length; i++)
    {
        //�ߺ��� �ʱ�ȭ
        if (optArrLst[i].value == optArr) {
            alert("�̹� ���õǾ� �ִ� �ɼ��Դϴ�.");
            enableOptLoadingLayer();
            return;
        }
    }
    // �ɼǹ��߰�������ǰ ���밡 ���
    if (jQuery(obj).find("li.on").length > 0)  {
		_fnOptGetStockInfoByOptNos(contSeq, optArr, '01', optArrNm);
    }
    enableOptLoadingLayer();
}


function _fnOptGetStockNew(obj, seq){
    if (obj == null) return;
    jQuery('#opt_loading').css("display" , "block");
    var contNm = jQuery(obj).attr("id");;
    var contSeq = _fnOptGetContSeq(contNm);

    var targetObj = jQuery(obj).find("li.on");

    if (contSeq < 0)  return;

    var optArr = "";
	var optArrNm = "";
    if (_selOptCnt+1 > 1)
    {
        var trgtObj;
        for ( var i = 1; i < _selOptCnt+1; i++)
        {
            trgtObj = jQuery("#optSelect" + i ).find("li.on");

            if (i < _selOptCnt - 1 && jQuery("#optSelectedNm" + i ).text() == "") {
                alert("���� �ɼ��� ���� �������ּ���.");
                optArr = "";
				optArrNm = "";
                break;
            }

            if (jQuery(trgtObj).length > 0){
				optArr = optArr + jQuery(trgtObj).find("a").attr("data-opt_value")+ ",";
				optArrNm = optArrNm + jQuery(trgtObj).find("a").text() +  ",";
            }
        } // end for
    }
    else
    {
        if ( jQuery(targetObj).length > 0 )   {
			optArr = optArr + jQuery(targetObj).find("a").attr("data-opt_value") + ",";
			optArrNm = optArrNm + jQuery(targetObj).find("a").text() + ",";
		}
    }

    // ���ð��� ���� ��� �ʱ�ȭ
    if (optArr == "" ||  jQuery(targetObj).length <= 0)
    {
    	enableOptLoadingLayer();
        return;
    }

    // �ɼ��ߺ� ���� üũ---------------- (�ɼǼ��ÿ��� ����)
    var optArrLst = document.getElementsByName("optArr");
    for ( var i = 0; i < optArrLst.length; i++)
    {
        //�ߺ��� �ʱ�ȭ
        if (optArrLst[i].value == optArr) {
            alert("�̹� ���õǾ� �ִ� �ɼ��Դϴ�.");
            enableOptLoadingLayer();
            return;
        }
    }

    // �ɼǹ��߰�������ǰ ���밡 ���
    if (jQuery(obj).find("li.on").length > 0)  {

		_fnOptGetStockInfoByOptNos(contSeq, optArr, '01', optArrNm);
    }
    enableOptLoadingLayer();
}
/**
 * ������ �ɼ� �����
 */
function _fnOptGetStock2(obj, seq){

    if (obj == null) return;
    jQuery('#opt_loading').css("display" , "block");
    var contNm = jQuery(obj).attr("id");
    var contSeq = _fnOptGetContSeq(contNm);

    if (contSeq < 0)  return;

    // �ɼǿ����� Start ��ġ ��ȸ
    var optArr = "";
	var optArrNm = "";
    var seletedCnt = 0;
    if (_selOptCnt >= 1)
    {
    	var isDeselectObj = false;
    	jQuery(".slt_op").each(function(){
    		var selectObj = jQuery(this).find("li.on").length;
    		if(selectObj <= 0){
    			isDeselectObj = true;
    		}
    	});
    	if(isDeselectObj){
    		 enableOptLoadingLayer();
    		return;
    	}
        var trgtObj;
        for ( var i = 0; i < _selOptCnt; i++)
        {
        	 trgtObj = jQuery("#optSelect" + i ).find("li.on");

            if (jQuery(trgtObj).length > 0) {
                seletedCnt++;
                optArr = optArr + jQuery(trgtObj).find('a').attr("data-opt_value") + ",";
				optArrNm = optArrNm + jQuery(trgtObj).find('a').text() + ",";
				curCombiOptArray[contSeq] = jQuery(trgtObj).find('a').attr("data-opt_value");
				curCombiOptNmArray[contSeq] = jQuery(trgtObj).find('a').text();
            }
        } // end for
    }
    else
    {
    	var $trgrObj = jQuery(obj).find("li.on");
        if (jQuery($trgrObj).length > 0) {
        	seletedCnt++;
			optArr = optArr + jQuery($trgrObj).find('a').attr("data-opt_value")+ ",";
			optArrNm = optArrNm +  jQuery($trgrObj).find('a').text() + ",";
			curCombiOptArray[contSeq] = jQuery($trgrObj).find('a').attr("data-opt_value");
			curCombiOptNmArray[contSeq] = jQuery($trgrObj).find('a').text();
		}
    }

    // �ɼ��ߺ� ���� üũ---------------- (�ɼǼ��ÿ��� ����)
	var optArrLst = document.getElementsByName("optArr");
	for ( var i = 0; i < optArrLst.length; i++)
	{
	    //�ߺ��� �ʱ�ȭ
	    if (optArrLst[i].value == optArr) {
	    	alert("�̹� ���õǾ� �ִ� �ɼ��Դϴ�.");
	    	enableOptLoadingLayer();
	        return;
	    }
	}

	var selectedObj = jQuery(obj).find("li.on");
	// �ɼǹ��߰�������ǰ ���밡 ���
	if (jQuery(selectedObj).length > 0 && _selOptCnt == seletedCnt){
		_fnOptGetStockInfoByOptNos(contSeq, optArr, '02', optArrNm);
	}
	 enableOptLoadingLayer();
}
var curCombiOptArray = new Array();
var curCombiOptNmArray = new Array();
/**
 * ������ �ɼ� ����� ���� �ɼ� ����Ʈ �� ����
 */
function _fnOptGetSubOpt(obj, seq, dftOptNo)
{
    if (obj == null) return;
    jQuery('#opt_loading').css("display" , "block");
    if (dftOptNo == undefined) dftOptNo = "";

    var contNm = jQuery(obj).attr("id");
    var contSeq = _fnOptGetContSeq(contNm);

    if (contSeq < 0)  return;

    var optIex = parseInt(contSeq % _selOptCnt);

	var textName = '';

    if (_selOptCnt > 1)
    {
    	var isNotSelected = false;
    	jQuery(".box" ,"#opt_selectList").each(function(idx){
    		if(idx < contSeq ){
    			var selectCnt = jQuery(this).find('li.on').length;
    			if(selectCnt == 0){
    	            isNotSelected = true;
    			}
    		}
    	});
        // ���� �ɼ��� ���õ� ���¿��� ���� �ɼ� ������;
        if (jQuery("#optSelect" + (contSeq + 1)).find('li.on').length > 0  && jQuery(obj).find("li.on").length == 0)
        {
        	optResetOption(obj, contSeq);
            for(var z=contSeq; z<_selOptCnt; z++){
            	curCombiOptArray[z] = "";
            	curCombiOptNmArray[z] = "";
            }
            enableOptLoadingLayer();
            return;
        }
        else if (optIex >= 1 && isNotSelected)
        {
        	alert("���õ� ���� �ɼ��� �����ϴ�. �ɼ��� �� ���� ���ּ���");
            optAllResetOption(obj, contSeq);
            for(var z=0; z<_selOptCnt; z++){
            	curCombiOptArray[z] = "";
            	curCombiOptNmArray[z] = "";
            }
        	enableOptLoadingLayer();
        	return;
        }
        else
        {
            if (optIex == (_selOptCnt - 2))
            {
            	var $selectObj = jQuery(obj).find("li.on");
                if (jQuery($selectObj).length <= 0) {
                	jQuery("#optSelectedNm" +  (contSeq + 1)).text('');
            		jQuery("#optSelect" + (contSeq + 1)).find("li").removeClass("on");
                } else {
                	jQuery("#optSelectedNm" +  (contSeq + 1)).text('');
            		jQuery("#optSelect" + (contSeq + 1)).find("li").removeClass("on");
                    _fnOptGetLastOpt(obj, dftOptNo);
                }
            } else {
            	optResetOption(obj, contSeq+1);
            	var $selectObj = jQuery(obj).find("li.on");
                if (jQuery($selectObj).length <= 0) {
                	enableOptLoadingLayer();
            		return;
            	}

                var optArr = "";

                var trgtObjNm;
                for ( var i = 0; i <= optIex; i++)
                {
                    trgtObjNm =jQuery("#optSelect" + i).find("li.on") ;
                    if (trgtObjNm.length  > 0 ) {
                        optArr = optArr + jQuery(trgtObjNm).find('a').attr("data-opt_value")  + ",";
                    }
                }
                _fnOptGetSubOptAjaxCall(contSeq + 1, _PRDNO, optArr, optIex+2, dftOptNo);
            }
            textName = jQuery("#optSelectedNm" + contSeq).text();
          	textName = textName.replace(/[<>]/gi,"").replace(/[\']/gi,"\'").replace(/\\n/gi, "").replace(/\\r/gi, ""); // �ɼǸ�
          	if(textName.lastIndexOf(" (") > 0){
          		textName = textName.substr(0,textName.lastIndexOf(" ("));
          	}
            curCombiOptArray[contSeq] = jQuery("#optSelect" + (contSeq + 1)).find('li.on').find('a').attr("data-opt_value");
            curCombiOptNmArray[contSeq] = textName;
        }
        enableOptLoadingLayer();
    }
}

function enableOptLoadingLayer(){
	var _viewTime = 350;
	  setTimeout(enableLayer ,_viewTime);
	  function enableLayer( ){
		  jQuery('#opt_loading').css("display" , "none");
	  }
}
/** ���õ� �ɼ� ���� �ʱ�ȭ - �������ΰ�츸 ���� */
function _fnOptReSetOption(obj, contSeq, optType){
	if (_selOptCnt > 1){
		var trgtObj;
		for ( var i = _selOptCnt-1 ; i >= contSeq; i--){
			trgtObj = document.getElementById("optionData" + i);
			if (optType != '02')
				trgtObj.value = "";
			else
				trgtObj.options[0].selected = true;
		} // end for
	}
	else{
		obj.value = "";
	}

	// �ɼ� �� �߰�������ǰ ���� ���밡 ���
	_fnOptCalcOptNAddPrc();
}

function optLastOptionSelected(){
	var $targetEl = jQuery("#opt_selectList");
	jQuery($targetEl).find(".slt_btn").removeClass("on");
	jQuery("#selectOption").css("display","none");

	var selectedOptText =  jQuery("#optList0").find("li.on").find("a").text();
	var selCnt = jQuery(".slt_op").length;
	for(var i = 1 ; i < selCnt ; i++){
		selectedOptText  +=  " / " + jQuery("#optList" + i).find("li.on").find("a").text()  ;
	}
	//��ư�߰�
	selectedOptText += '<span></span>';
	jQuery($targetEl).find(".slt_btn").html(selectedOptText);
}

function optLastOptionRefesh(obj , contSeq){
	jQuery(obj).find('li').removeClass('on');
	jQuery("#optSelectedNm" + contSeq).text('');
	jQuery('.slt_btn' , "#opt_selectList").html('�ɼ��� ������ �ּ���. <span></span>' );
}

function optResetOption(obj, contSeq, optType){
	var resetCnt  = _selOptCnt;
	if(optType == "01"){
		resetCnt = _selOptCnt + 1;
	}
	if (_selOptCnt > 1){
		for ( var i = resetCnt-1 ; i >= contSeq; i--){
			jQuery("#optSelect" + i).find('li').removeClass('on');
			jQuery("#optList" + i).html('');
			jQuery("#optSelectedNm" + i).text('');
			if(jQuery("#optSelect" + i).css('display') != 'none'){
				jQuery("#optSelect" + i).css('display' , 'none');
			}

			optSearch.setInitData(i , null);
		} // end for
	}
	else{
		jQuery(obj).find('li').removeClass('on');
		jQuery("#optSelectedNm" + contSeq).text('');
		if(jQuery("#optSelect" + contSeq).css('display') != 'none'){
			jQuery("#optSelect" + contSeq).css('display' , 'none');
		}
		optSearch.setInitData(0 , null);
	}

	// �ɼ� �� �߰�������ǰ ���� ���밡 ���
	_fnOptCalcOptNAddPrc();
}

function optAllResetOption(obj , optType){
	 if(document.getElementById("totalAmountText")!=null){
	        document.getElementById("totalAmountText").style.display="none";
	 }//end if
	 optResetOption(obj , 1);

	 if(optType != '01' && optType != '02'){
		 jQuery("[name=optArr]").each(function(i){
			jQuery(this).val('');
		 });
		 jQuery("[name=optionStock]").each(function(i){
				jQuery(this).val('');
		 });
		 jQuery("[name=optionStockHid]").each(function(i){
				jQuery(this).val('');
		 });
		 jQuery("[name=optionStckNo]").each(function(i){
				jQuery(this).val('');
		 });
		 jQuery("[name=optionPrc]").each(function(i){
				jQuery(this).val('');
		 });
	    }
	    enableOptLayer(0);
	    // �ɼ� �� �߰�������ǰ ���� ���밡 ���
	   _fnOptCalcOptNAddPrc();
}

// �ɼ� ���� �ʱ�ȭ
function _fnOptReSetAllOption(obj, contSeq, optType)
{
    if(document.getElementById("totalAmountText")!=null){
        document.getElementById("totalAmountText").style.display="none";
    }//end if

    if (_selOptCnt > 1)
    {
        var trgtObj;
        for ( var i = 0; i < _selOptCnt; i++)
        {
            trgtObj = document.getElementById("optionData" + i);
            if (optType != '02')
                trgtObj.value = "";
            else
                trgtObj.options[0].selected = true;

            // ������ ������ ��� ������ selectbox �ʱ�ȭ
            if (i > 0 && i == (_selOptCnt - 1) && optType != '02') {
                trgtObj.length = 1;
            }
        } // end for
    }
    else
    {
        obj.value = "";
    }

    if(optType != '01' && optType != '02'){
	    document.getElementById("optArr" + _setOptionIndex).value = "";
	    document.getElementById("optionStock" + _setOptionIndex).value = "1";
	    document.getElementById("optionStockHid" + _setOptionIndex).value = "";
	    document.getElementById("optionStckNo" + _setOptionIndex).value = "";
	    document.getElementById("optionPrc" + _setOptionIndex).value = "";
    }

    // �ɼ� �� �߰�������ǰ ���� ���밡 ���
    _fnOptCalcOptNAddPrc();
}

var totSumPrice = 0; // ���հ�ݾ�
/**
 * �ɼ� �� �߰�������ǰ ���� ���밡 ���
 */
function _fnOptCalcOptNAddPrc()
{
    // �� ���밡
	var totOptNAddPrice = 0; // �ɼ� & �߰�������ǰ ���밡
    var totOptNAddStock = 0; // �ɼ� & �߰�������ǰ �� ����
    var totOrdPrcAllStr = 0;
    var totOrdPrcAllStrNew = 0;

    var prdSelPrc = Number(document.frmMain.selPrc.value); // ��ǰ����
    var selStatCd = document.frmMain.selStatCd.value; // �ǸŻ����ڵ�



    // �ɼ����밡 ��� =========================(�ɼ� �����)
    if (_selOptCnt > 0){
        var optPrcArr = document.getElementsByName("optionPrc");
        var optStockArr = document.getElementsByName("optionStock");
        var dispOptionPrcArr = document.getElementsByName("dispOptionPrc");
        var optPrc = 0;
        var optStock = 0;
        var trgt;
        for ( var i = 0; i < optPrcArr.length; i++)
        {
            // �ɼ��� ���õ��� ���� ��� �ش� �ɼ� ���� pass
            if (optPrcArr[i].value == "") continue;
            trgt = optPrcArr[i];

            // �ɼ����밡 & �� �������
            optPrc = Number(trgt.value);
            optStock = Number(optStockArr[i].value);
            if(optPrc < 0){ //�ɼ� ������ ���̳ʽ� �̸�
                document.getElementById("minusOptYn").value = "Y";
            }else {
                document.getElementById("minusOptYn").value = "N";
            }


			// ���� ��� (�������, ������ ����)
            totOptNAddPrice = ((optPrc + prdSelPrc) * optStock);
            totOptNAddStock = totOptNAddStock + optStock;

            totOrdPrcAllStr = totOrdPrcAllStr + totOptNAddPrice;
            document.getElementById(dispOptionPrcArr[i].id).innerHTML = (totOptNAddPrice+"").Digit2Comma() + '��';

        }//end for
    }else{
        var prdStock = Number(document.getElementById("optionStock0").value);

        totOptNAddPrice = (prdSelPrc) * prdStock;
        totOptNAddStock = prdStock;

        totOrdPrcAllStr = totOrdPrcAllStr + totOptNAddPrice;
    }//end else


    // �Ѽ���/��ǰ�ݾ� ���� ����

	document.getElementById("addAllSelPrc").value=totOptNAddPrice;
    //totalPrc
	totOrdPrcAllStrNew = totOrdPrcAllStr;
	totOrdPrcAllStr = (totOrdPrcAllStr+'').Digit2Comma()+'��';
	totOrdPrcAllStrNew = (totOrdPrcAllStrNew+'').Digit2Comma();
	if(document.getElementById("catalogYn").value == "Y"){
		document.getElementById("totalPrc").innerHTML ="<span class=\"prc\"><b>"+totOrdPrcAllStrNew+"</b>��</span>";
	}else{
		document.getElementById("totalPrc").innerHTML ="<span>"+totOrdPrcAllStr+"</span>";
	}
    document.getElementById('mwDev_totalCnt').innerHTML = '('+totOptNAddStock+'��)';
	if ((_selOptCnt > 0 && totOptNAddStock != 0) || (_selOptCnt == 0 && totOptNAddStock > 0)) {
		if(document.getElementById("totalAmountText"))	document.getElementById("totalAmountText").style.display="block";
	} else {
		if(document.getElementById("totalAmountText"))	document.getElementById("totalAmountText").style.display="none";
	}

	var foot = document.querySelector('footer');
    if(foot) foot.setAttribute('style','padding-bottom:10px');
    setTimeout(function() {
        var foot = document.querySelector('footer');
        if(foot) foot.setAttribute('style','');
    }, 500);
}


var curClickedOptIndex = 0;
/**
 * �ɼǼ��� & �߰�������ǰ ���� Up&Down
 */
function _fnOptUpDownStockCnt(index, type, upDownCnt, keyupYn){
	var divCntObj;

	if(type == "OPT"){
		divCntObj = document.getElementById("optionStock"+index);
	}
	else if(type == "MULTI_OPT"){
		divCntObj = document.getElementById("optionStock"+index);
	}

	if (divCntObj == null) return;
	if(keyupYn != "Y"){
		if (divCntObj.value == null || divCntObj.value.trim() == "" || Number(divCntObj.value) + upDownCnt < 1) {
			divCntObj.value = 1;
			upDownCnt = 0;
		}
		if(Number(divCntObj.value) + upDownCnt < 1 || Number(divCntObj.value) + upDownCnt > 999){
			divCntObj.value = 999;
			upDownCnt = 0;
		}

		divCntObj.value = Number(divCntObj.value) + upDownCnt;
	} else {
		if(!checkNumber(divCntObj.value)){
            alert("������  1�̻��� ���ڸ� �Է��� �����մϴ�.");

            divCntObj.value = 1; //���� �ʱ�ȭ
        }
	}

	if(type == "OPT"){
		//DO Nothing
	} else if(type == "MULTI_OPT"){
		var newOrdCnt = divCntObj.value;
		if(_selOptCnt > 0) {
			if(funcCheckIsLogin()){
				//_fnOptCuponInfo();
			} else {
				// �ɼǰ� ������
				var prdSelPrc = Number(document.frmMain.selPrc.value); // ��ǰ����
				// �ɼ����밡 & �� �������
				var optionPrcObj = document.getElementById("optionPrc"+index);
				var optPrc = Number(optionPrcObj.value);
				var optStock = Number(divCntObj.value);
				// �����ΰ�
				// ���� ��� (�������, ������ ����)
				var totOptNAddPrice = ((optPrc + prdSelPrc) * optStock) + "";
				document.getElementById("dispOptPrc"+index).innerHTML = totOptNAddPrice.Digit2Comma() + '��';
			}
		}
	}
	// �ɼ� �� �߰�������ǰ ���� ���밡 ���
	_fnOptCalcOptNAddPrc();
}

/**
 * ������ �ɼ� ����Ʈ ��ȸ
 * @param obj        : �������ɼ� SelectBox
 * @param dftOptNo   : �ʱ�� ������ optNo
 */
function _fnOptGetLastOpt(obj, dftOptNo)
{
    if (obj == null) return;
    if (dftOptNo == undefined) dftOptNo = "";
    var prdNo = _PRDNO;


    var contNm = jQuery(obj).attr("id");
    var contSeq = _fnOptGetContSeq(contNm);

    if (contSeq < 0) return;

    // �ɼǿ����� Start ��ġ ��ȸ
    var optArr = "";
    var trgtIdx = contSeq;
    if (_selOptCnt > 1)
    {
        var trgtObj;
        for ( var i = 0; i < (_selOptCnt - 1); i++)
        {
        	trgtObj = jQuery("#optSelect" + i ).find("li.on");
           if (jQuery(trgtObj).length > 0){
   			optArr = optArr + jQuery(trgtObj).find("a").attr("data-opt_value")+ ",";
           }
        }

        trgtIdx = contSeq + 1;
    }
    else
    {
    	var trgtObj = jQuery(obj).find("li.on");
        if ( jQuery(trgtObj).length > 0 )   {
			optArr = optArr + jQuery(trgtObj).find("a").attr("data-opt_value") + ",";
		}
        trgtIdx = contSeq;
    }

    // ������ �ɼ� SelectBox �ʱ�ȭ
    _fnOptGetLastOptAjaxCall(trgtIdx, prdNo, optArr, dftOptNo);
}

// contNm���� ���ڿ��� ����
function _fnOptGetContSeq(contNm)
{
    // XXXXXXXX[seq](Sub)
    var reg = /([0-9]+)/g;
    var seq = contNm.replace(/[^0-9]?/g,'');

    if (isNaN(seq))
        return -1;
    else
        return parseInt(seq);
}

//Byte üũ
function getInputByte(msg, maxLen, frmForm)
{
	var tmpStr;
	var temp=0;
	var onechar;
	var tcount;
	tcount = 0;

	tmpStr = new String(msg);
	temp = tmpStr.length;

	for (k=0;k<temp;k++)
	{
		onechar = tmpStr.charAt(k);
		if (escape(onechar) =='%0D') {
		  tcount++;
		} else if (escape(onechar).length > 4) {
			tcount += 2;
		} else {
			tcount++;
		}

	  	if(tcount>parseInt(maxLen)) {
			tmpStr = tmpStr.substring(0,k);
			frmForm.value = tmpStr;
	  		return false;
	  	}
	}
  	return true;
}
var _isDirectOptSelect = false;
function OptTaggingAlert(){
	 if(typeof(_isOptTagging) != "undefined" && _isOptTagging == true && _isDirectOptSelect == true){
     	if(_selOptCnt < 2){
     		alert("������ �ɼ� ��ǰ�� ��ҽ��ϴ�.");
     	}else if(_selOptCnt >= 2){
     		var optText2 = jQuery(jQuery("#selectOption .slt_op")[1]).find('.name b').text();
     		var optText1 = jQuery(jQuery("#selectOption .slt_op")[0]).find('.name b').text();
     		alert(optText1 +'�ɼ��� �����߽��ϴ�. \n' + optText2 +"�ɼ��� ����ּ���." );
     	}
     }
	 _isDirectOptSelect = false;
}

//��� ���� Ȯ��
function _fnOptGetStockInfoByOptNos(contSeq, mixOptNo, optType, mixOptNm)
{
    var obj = document.getElementById("optList" + contSeq);
	var optNmList = document.getElementById("optNmList").value;
	try{
		// �Է��� üũ
		if(_entOptCnt > 0){
			var optionEntText = document.getElementsByName("optionDispText");
			if(optionEntText!=null && optionEntText!=undefined && optionEntText!='undefined') {
				if(_entOptCnt != optionEntText.length){
					var dispOptionPrcCnt = document.getElementsByName("dispOptionPrc");
					if(!dispOptionPrcCnt) {
						alert("�Է��� �ɼ��� ������ ���� �ʽ��ϴ�.");
						optLastOptionRefesh(obj, contSeq);
						return;
					}
				}
				for(var e=0 ; e<optionEntText.length ; e++){
					if(optionEntText[e].value ==null || optionEntText[e].value.trim() == ""){
						alert("�Է��� �ɼ��� �Էµ��� �ʾҽ��ϴ�. �Է��� �ɼ��� �Է� �� �����ϼ���.");
						optLastOptionRefesh(obj, contSeq);
						return;
					}

					if(!getInputByte(optionEntText[e].value, 200, optionEntText[e])){
						alert("�Է��� �ɼ��� 200Byte�� ���� �� �����ϴ�.\r\n�ʰ��� �κ��� �ڵ����� �����˴ϴ�.");
						optLastOptionRefesh(obj, contSeq);
						return;
					}
				}
			}
		}

	    var _callBack = function(returnVal)
	        {
	            if (returnVal == "FAIL") {
	            	alert("����� ��Ȱ���� �ʽ��ϴ�. ��� �Ŀ� �ٽ� �õ����ּ���."); //���� ����
	            	optResetOption(obj, contSeq);
	                return;
	            }//end if

	            var jsonObj = eval(returnVal);

	            // ��� �� ���� ��� - �ش� �ɼ� ���� �ʱ�ȭ
	            if (jsonObj == null || jsonObj[0] == null)
	            {
	                alert("�ش� �ɼǿ� ��� �����ϴ�.");
	                return;
	            }

	            var chooseOpt = jsonObj[0].mixOptNo;
	            var chooseOptStckQty = jsonObj[0].stckQty;

	            var optQty = 1;

	            if(document.getElementById("optionStock" + contSeq) != null)
	                optQty = document.getElementById("optionStock" + contSeq).value; //�ɼ� �������� ����.

	            if (chooseOpt != null && parseInt(chooseOptStckQty) > 0 && parseInt(optQty) <= parseInt(chooseOptStckQty))
	            {
	            	_fnChangeOptionAfterStckChk(obj, contSeq);
	                document.getElementById("optionStockHid" + (_setMultiOptionIndex-1)).value = chooseOptStckQty;
	                document.getElementById("optionStckNo" + (_setMultiOptionIndex-1)).value = jsonObj[0].prdStckNo;
	                document.getElementById("optionPrc" + (_setMultiOptionIndex-1)).value = jsonObj[0].addPrc;
	                document.getElementById("optArr" + (_setMultiOptionIndex-1)).value = mixOptNo;
	                _fnOptCalcOptNAddPrc();
	                //OptTaggingAlert();

	                //20150709 �������� �������
	               // _fnOptCuponInfo();
	            } else {
	                alert("�ش� �ɼǿ� ��� �����ϴ�.");
	            }
	            document.getElementById("done").value="Y";
	            optLastOptionSelected();
	        };

	        document.getElementById("done").value="N";
	        var url = _MOBILE_URL_+"/Product/getStockInfoByOptNos.jsp";
	        var param = "prdNo=" + _PRDNO + "&mixOptNo=" + mixOptNo + "&selOptCnt=" + document.frmMain.selOptCnt.value +
	      	"&selOptTyp=" + optType + "&optNmList=" + escape(encodeURIComponent(optNmList)) + "&mixOptNm=" + escape(encodeURIComponent(mixOptNm));

			setAjaxAsynch2.contSeq = contSeq;
	        callAjaxAsynch2(url, param, _callBack);

    } catch (e) {
    }

}
//20150709 �������� �������
function _fnOptCuponInfo(){
	try{
		var prdNo 		= Number(document.frmMain.prdNo.value);
		var selMnbdNo	= document.frmMain.selMnbdNo.value;
		var selMthdCd	= document.frmMain.selMthdCd.value;
		var lDispCtgrNo	= document.frmMain.ldispCtgrNo.value;
		var mDispCtgrNo	= document.frmMain.mDispCtgrNo.value;
		var sDispCtgrNo	= document.frmMain.sDispCtgrNo.value;
		var dispCtgrNo	= document.frmMain.dispCtgrNo.value;
		var brd_cd 		= document.frmMain.brd_cd.value;
		var selPrc		= document.frmMain.selPrc.value;
		var soCupnAmt	= document.frmMain.soDscAmt.value;
		var moCupnAmt 	= document.frmMain.moDscAmt.value;

		var _setOptCouponPrc = function(returnVal)
        {
			var jsonObj = JSON.parse(returnVal);
			var jsonDat	= jsonObj.result;

			if(jsonObj.resultCode == "200"){
				for(var i=0; i<jsonDat.length; i++){
					var resultStockNo	= jsonDat[i].STOCK_NO;
					var basicSotckNo	= document.getElementsByName("optionStckNo")[i].value;//$("#optionStckNo"+contSeq).val();
					if(resultStockNo == basicSotckNo){
						document.getElementsByName("cupnIssNo1")[i].value = jsonDat[i].ADD_ISS_CUPN_NO;
						document.getElementsByName("addDscAmt")[i].value = jsonDat[i].ADD_DSC_AMT;
						document.getElementsByName("cupnIssNo2")[i].value = jsonDat[i].BONUS_ISS_CUPN_NO;
						document.getElementsByName("bonusDscAmt")[i].value = jsonDat[i].BONUS_DSC_AMT;
					}
				}
				_fnOptCalcOptNAddPrc();
			}
        };
        var optionParam = "";
        var optionStockArray = document.getElementsByName("optionStock");
        var optionPrcArray	 = document.getElementsByName("optionPrc");
        var optionStckNoArray = document.getElementsByName("optionStckNo");
        for(var i =0; i<optionStckNoArray.length; i++){
        	optionParam += "&optionStock="+optionStockArray[i].value+"&optionPrc="+optionPrcArray[i].value+"&optionStckNo="+optionStckNoArray[i].value;
        }

        var url		= _MOBILE_URL_+"/Product/productOptCupnPrcAjax.tmall";
        var param	= "prdNo="+prdNo+"&selMnbdNo="+selMnbdNo+"&lDispCtgrNo="+lDispCtgrNo+"&mDispCtgrNo="+mDispCtgrNo+"&sDispCtgrNo="+sDispCtgrNo+"&dispCtgrNo="+dispCtgrNo
        			+"&brd_cd="+brd_cd+"&selPrc="+selPrc+"&soCupnAmt="+soCupnAmt+"&moCupnAmt="+moCupnAmt+optionParam+"&by="+Date.now();
        if(funcCheckIsLogin() && optionStckNoArray.length > 0){
        	callAjaxAsynch(url, param, _setOptCouponPrc);
        }
	} catch (e) {
		console.log("_fnOptCuponInfo() : " + e);
	}
}

var setAjaxAsynch2 = {
    contSeq : 0,
    call : function(returnVal) {
    	var obj = document.getElementById("optionData" + this.contSeq);
        if (returnVal == "FAIL") {
	            	alert("����� ��Ȱ���� �ʽ��ϴ�. ��� �Ŀ� �ٽ� �õ����ּ���."); //���� ����
	            	obj.disabled = false;
	                return;
	            }//end if

	            var jsonObj = JSON.parse(returnVal);

	            // ��� �� ���� ��� - �ش� �ɼ� ���� �ʱ�ȭ
	            if (jsonObj == null || jsonObj[0] == null)
	            {
	                alert("�ش� �ɼǿ� ��� �����ϴ�.");
	                obj.disabled = false;
	                return;
	            }

	            var chooseOpt = jsonObj[0].mixOptNo;
	            var chooseOptStckQty = jsonObj[0].stckQty;

	            var optQty = 1;

	            if(document.getElementById("optionStock" + this.contSeq) != null)
	                optQty = document.getElementById("optionStock" + this.contSeq).value; //�ɼ� �������� ����.

	            if (chooseOpt != null && parseInt(chooseOptStckQty) > 0 && parseInt(optQty) <= parseInt(chooseOptStckQty))
	            {
	            	_fnChangeOptionAfterStckChk(obj, this.contSeq);
	                document.getElementById("optionStockHid" + (_setMultiOptionIndex-1)).value = chooseOptStckQty;
	                document.getElementById("optionStckNo" + (_setMultiOptionIndex-1)).value = jsonObj[0].prdStckNo;
	                document.getElementById("optionPrc" + (_setMultiOptionIndex-1)).value = jsonObj[0].addPrc;
	                document.getElementById("optArr" + (_setMultiOptionIndex-1)).value = mixOptNo;
	                _fnOptCalcOptNAddPrc();
	                //OptTaggingAlert();
	            } else {
	                alert("�ش� �ɼǿ� ��� �����ϴ�.");
	            }
	            document.getElementById("done").value="Y";
	            obj.disabled = false;
    },

};

//�񵿱�� AjaxCall
function callAjaxAsynch(url, params, callBack)
{
    var pageRequest = false; // ajax object�� ���� ����.
    if (!pageRequest && typeof XMLHttpRequest != "undefined")
        pageRequest = new XMLHttpRequest();

    if (pageRequest)
    { // pageRequest�� true�� ��츸.
        try
        {
            var isAsynch = true;
            if (params != "")
            {
                pageRequest.open("POST", url, isAsynch);
                pageRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                pageRequest.setRequestHeader("Content-length", params.length);
                pageRequest.setRequestHeader("Connection", "close");

                pageRequest.send(params);
            } else {
                pageRequest.open("GET", url, isAsynch);
                pageRequest.send(null);
            }

            pageRequest.onreadystatechange = function()
            {
                if (pageRequest.readyState == 4) {
                    var returnVal = "FAIL";
                    if (pageRequest.status == 200) {
                        returnVal = pageRequest.responseText;
                    }

                    if (typeof (callBack) == "function") {
                        callBack(returnVal);
                    } else if (typeof (callBack) == "string") {
                        if (callBack != "") {
                            eval(callBack + "('" + returnVal + "')");
                        }
                    }
                }
            };
        }
        catch (e)
        {
            alert(e);
            var returnVal = "FAIL";

            if (typeof (callBack) == "function") {
                callBack(returnVal);
            } else if (typeof (callBack) == "string") {
                if (callBack != "") {
                    eval(callBack + "('" + returnVal + "')");
                }
            }
        }
    }
}
//�񵿱�� AjaxCall
var optCheckStatus = "OK";
function callAjaxAsynch2(url, params, callBack)
{
    //return;
    var pageRequest = false; // ajax object�� ���� ����.
    if (!pageRequest && typeof XMLHttpRequest != "undefined")
        pageRequest = new XMLHttpRequest();
    if (pageRequest)
    { // pageRequest�� true�� ��츸.

        optCheckStatus ="START";
        try
        {
            var isAsynch = true;
            if (params != "")
            {
                pageRequest.open("POST", url, isAsynch);
                pageRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                pageRequest.setRequestHeader("Content-length", params.length);
                pageRequest.setRequestHeader("Connection", "close");

                pageRequest.send(params);
            } else {
                pageRequest.open("GET", url, isAsynch);
                pageRequest.send(null);
            }

            pageRequest.onreadystatechange = function()
            {
                if (pageRequest.readyState == 4) {
                    var returnVal = "FAIL";
                    if (pageRequest.status == 200) {
                        optCheckStatus = "OK";
                        returnVal = pageRequest.responseText;
                        if (typeof (callBack) == "function") {
	                        callBack(returnVal);
	                    } else if (typeof (callBack) == "string") {
	                        if (callBack != "") {
	                            eval(callBack + "('" + returnVal + "')");
	                        }
	                    }
                    } else if (pageRequest.status == 0) {
                    	var ifr;
						if (document.getElementById('appOptionInterface')) {
							ifr = document.getElementById('appOptionInterface');
						} else {
							ifr = document.createElement('iframe');
							ifr.id = 'appOptionInterface';
							ifr.width = 0;
							ifr.height = 0;
							ifr.style.display = 'none';
							document.body.appendChild(ifr);
						}
						ifr.src = url+'?'+params+'&isIframe=true';
                    } else {
                        optCheckStatus = "ING";
                        if (typeof (callBack) == "function") {
	                        callBack(returnVal);
	                    } else if (typeof (callBack) == "string") {
	                        if (callBack != "") {
	                            eval(callBack + "('" + returnVal + "')");
	                        }
	                    }
                    }
                }else{
                    optCheckStatus = "ING";
                }
            };
        }
        catch (e)
        {
            alert(e);
            var returnVal = "FAIL";

            if (typeof (callBack) == "function") {
                callBack(returnVal);
            } else if (typeof (callBack) == "string") {
                if (callBack != "") {
                    eval(callBack + "('" + returnVal + "')");
                }
            }
        }
    }
}
// ��ǰ�� ������ �ɼ� ����� ���� �ǽð� ajax
function _fnOptGetLastOptAjaxCall(idx, prdNo, optNoArr, dftOptNo)
{
    var _hasOption = function(obj)
        {
            if (obj != null && obj.options != null) return true;
            return false;
        };
    var _removeAllOptions = function(obj)
        {
            if (!_hasOption(obj))  return;
        };
    var _addOption = function(obj, text, value)
        {
            if (obj != null ) {
            	var element = '<li><a href=\"#\" data-opt_value=\"'+value+'\">' + text + '</a></li>';
            	return element;
            }
        };
    var _subOptStr = function(optNm, addPrc, stckQty)
        {
            var addStr = "";

            if (addPrc != "0"){
                if(addPrc.length>0){
                    if(addPrc.substring(0,1) == "-"){
                        addStr += " (" + addPrc + "��)";
                    }
                    else{
                        addStr += " (+" + addPrc + "��)";
                    }
                }
            }
            if (stckQty < 1)
                addStr += "/ǰ��";

            var lmtCnt = 46; // 304px ���� �ִ� ���� ���ڼ� (Bytes ����

            if (addStr!="")
                lmtCnt -= addStr.bytes();

            optNm = optNm.replace(/^@#@\[/g, "[");
            if (optNm.bytes() > lmtCnt) {
                return optNm.cutByte(lmtCnt) + addStr;
            } else {
                return optNm + addStr;
            }
        };
    var _setOptLst = function(returnVal)
        {
            if (returnVal == "FAIL") {
                alert("���� ��ְ� �ֽ��ϴ�. �����ͷ� ���� �ּ���.(11���� �¶��� ���� ���� ����)");
                return;
            }

            var jsonObj = eval(returnVal);

            // �ɼ��ʱ�ȭ
            var trgt = document.getElementById("optList" + idx);
            _removeAllOptions(trgt);

            // �ɼǻ���
            var optStr = "";
            var optFinalStr = "";
            for ( var i = 0; jsonObj.infoList != null && i < jsonObj.infoList.length; i++)
            {
                if (jsonObj.infoList[i] != undefined) {
                    optStr = _subOptStr("" + jsonObj.infoList[i].dtlOptNm, "" + jsonObj.infoList[i].addPrc, jsonObj.infoList[i].stckQty);
                    optFinalStr += _addOption(trgt, optStr, jsonObj.infoList[i].optNo);
                }
            }
            jQuery(trgt).html(optFinalStr);
            enableOptLayer(idx);
            if (dftOptNo != "") trgt.value = dftOptNo;
            //OptTaggingAlert();
        };

    var url = _MOBILE_URL_+"/Product/getProductDetailLastOptionList.jsp";
    var param = "prdNo=" + prdNo + "&optNoArr=" + optNoArr + "&selOptCnt=" + document.frmMain.selOptCnt.value;

    callAjaxAsynch(url, param, _setOptLst);
}
// ��ǰ�� ���� �ɼ� List ajax
function _fnOptGetSubOptAjaxCall(idx, prdNo, optNoArr, optLvl, dftOptNo)
{
    var _hasOption = function(obj)
        {
            if (obj != null && obj.options != null) return true;
            return false;
        };
    var _removeAllOptions = function(obj)
        {
            if (!_hasOption(obj))  return;
        };
    var _addOption = function(obj, text, value)
        {
            if (obj != null ) {
            	var element = '<li><a href=\"#\" data-opt_value=\"'+value+'\">' + text + '</a></li>';
            	return element;
            }
        };
    var _setOptLst = function(returnVal)
        {
            if (returnVal == "FAIL") {
            	alert("�ɼ��� �ҷ����� �������� �Ͻ����� ������ �߻��߽��ϴ�. ���ΰ�ħ�Ͻ� �� �̿����ּ���!");
                return;
            }

            var jsonObj = JSON.parse(returnVal);

            // �ɼ��ʱ�ȭ
            var trgt = document.getElementById("optList" + idx);
            _removeAllOptions(trgt);

            // �ɼǻ���
            optFinalStr = "";
            for ( var i = 0; jsonObj.optList != null && i < jsonObj.optList.length; i++)
            {
                if (jsonObj.optList[i] != undefined) {
                	optFinalStr += _addOption(trgt, (""+jsonObj.optList[i].dtlOptNm).replace("@#@[", "["), jsonObj.optList[i].optNo);
                }
            }
            jQuery(trgt).html(optFinalStr);
            enableOptLayer(idx);
            if (dftOptNo != "") trgt.value = dftOptNo;
            //OptTaggingAlert();
        };

    var url = "/MW/api/app/elevenst/product/getProductDetailSubOptionList.tmall";
    var param = "prdNo=" + prdNo    + "&optNo=" + optNoArr + "&selOptCnt=" + optLvl+"&by="+Date.now();
    callAjaxAsynch(url, param, _setOptLst);
}


//[�ֹ����� - �ɼǿ��� ] ==========================================================================================
/**
 * ��ǰ�ɼ� ���� �� ȣ��Ǵ� ���
 */
 function _fnChangeOption(obj, grpSeq, optPrdGrpNm){
 	try{
 		var contNm = obj.id;

 		// ���� ���� ���� ���
 		if (obj.value == "") return;

 		//üũ���� ����ũ �ѹ��� �ٲ� �ʿ�->�ذ�
 	  	var textName = obj.options[obj.selectedIndex].text;
 	  	textName = textName.replace(/[<>]/gi,"").replace(/[\']/gi,"\'").replace(/\\n/gi, "").replace(/\\r/gi, ""); // �ɼǸ�
 	  	if(textName.lastIndexOf(" (") > 0){
 	  		textName = textName.substr(0,textName.lastIndexOf(" ("));
 	  	}
 	  	var optTextNameLst = document.getElementsByName("optTextNameStr");
 	  	var tmpCurCombiOptStr = "";
 	  	for ( var w = 0; w < _selOptCnt-1; w++) {
 	  		tmpObj = document.getElementById("optionData" + w);
 	  		tmpCurCombiOptStr = tmpCurCombiOptStr + "-" + tmpObj.value;
 	  	}

 		for ( var i = 0; i < optTextNameLst.length; i++)
 		{
 			//�ߺ��� �ʱ�ȭ
 			if (optTextNameLst[i].value == tmpCurCombiOptStr+"-"+textName) {
 				return;
 			}
 		}

 		var tempOjb1 = document.createElement("temp");
		tempOjb1.innerHTML = _makeOptionHtml(obj, optPrdGrpNm, _setMultiOptionIndex);
		var newRow1 = tempOjb1.getElementsByTagName("li")[0];
 		var divSelectedOptPrd = document.getElementById("divSelectedOptPrd");
 		divSelectedOptPrd.appendChild(newRow1);
 		_setMultiOptionIndex++;//_setAddPrdIndex++;

 		_fnHanddleOptPrdWrap('MULTI_OPT'); 	//divSelectedOptPrd ��ü�� ���ϵ尡 1�� �̻� ������ divSelectedOptPrd visible, ������ invisible

 		var foot = document.querySelector('footer');
        if(foot) foot.setAttribute('style','padding-bottom:10px');
        setTimeout(function() {
            var foot = document.querySelector('footer');
            if(foot) foot.setAttribute('style','');
        }, 500);

 	} catch (ex) {
 		alert(ex.message);
 	}
 }

 /**
  * ��ǰ�ɼ� ���� �� ȣ��Ǵ� ���
  */
  function _fnChangeOptionAfterStckChk(obj, grpSeq){
  	try{
  		// ���� ���� ���� ���
  		var $trgtObj = jQuery(obj).find("li.on").find("a");
  		if (jQuery($trgtObj).length <= 0) return;

  		//üũ���� ����ũ �ѹ��� �ٲ� �ʿ�->�ذ�
  	  	var textName = jQuery($trgtObj).text();
  	  	textName = textName.replace(/[<>]/gi,"").replace(/[\']/gi,"\'").replace(/\\n/gi, "").replace(/\\r/gi, ""); // �ɼǸ�
  	  	if(textName.lastIndexOf(" (") > 0){
  	  		textName = textName.substr(0,textName.lastIndexOf(" ("));
  	  	}
  	  	var optTextNameLst = document.getElementsByName("optTextNameStr");
  	  	var tmpCurCombiOptStr = "";
  	  	for ( var k = 0; k < _selOptCnt-1; k++) {
  	  		tmpCurCombiOptStr = tmpCurCombiOptStr + "-" + curCombiOptArray[k];
  	  	}
  		for ( var i = 0; i < optTextNameLst.length; i++)
  		{
  			//�ߺ��� �ʱ�ȭ
  			if (optTextNameLst[i].value == tmpCurCombiOptStr+"-"+textName) {
  				return;
  			}
  		}
  		var tempOjb1 = document.createElement("temp");
 		tempOjb1.innerHTML = _makeOptionHtml($trgtObj, "", _setMultiOptionIndex);
 		var newRow1 = tempOjb1.getElementsByTagName("li")[0];
  		var divSelectedOptPrd = document.getElementById("divSelectedOptPrd");
  		divSelectedOptPrd.appendChild(newRow1);
  		_setMultiOptionIndex++;//_setAddPrdIndex++;

  		_fnHanddleOptPrdWrap('MULTI_OPT'); 	//divSelectedOptPrd ��ü�� ���ϵ尡 1�� �̻� ������ divSelectedOptPrd visible, ������ invisible

  		var foot = document.querySelector('footer');
        if(foot) foot.setAttribute('style','padding-bottom:10px');
        setTimeout(function() {
            var foot = document.querySelector('footer');
            if(foot) foot.setAttribute('style','');
        }, 500);

  	} catch (ex) {
 		console.log(ex.message);
 	}
  }

	/**
	 * ������ �ɼ� ����� ���� �ɼ� ����Ʈ �� ���� (��¥�� �߰� 2014-07-07)
	 */
	function _fnOptGetSubOptNew(obj, seq, dftOptNo)
	{
		var optTotalCnt = _selOptCnt + 1;
		if(_selOptCnt < 3 && _selOptCnt == seq-1) {
			_fnOptGetStockNew(obj, seq);
			return;
		}else if(_selOptCnt > 2 && _selOptCnt == seq-1){
			_fnOptGetStockNew2(obj, seq);
			return;
		}
	    if (obj == null) return;

	    jQuery('#opt_loading').css("display" , "block");

	    if (dftOptNo == undefined) dftOptNo = "";

	    var contNm = jQuery(obj).attr("id");
	    var contSeq = _fnOptGetContSeq(contNm);

	    if (contSeq < 0)  {
	    	enableOptLoadingLayer();
	    	return;
	    }

	    var optIex = parseInt(contSeq % _selOptCnt);

	    if (optTotalCnt > 1)
	    {
	    	var isNotSelected = false;
	    	jQuery(".box" ,"#opt_selectList").each(function(idx){
	    		if(idx < contSeq ){
	    			var selectCnt = jQuery(this).find('li.on').length;
	    			if(selectCnt == 0){
	    	            isNotSelected = true;
	    			}
	    		}
	    	});
	        // ���� �ɼ��� ���õ� ���¿��� ���� �ɼ� ������;
	        if (jQuery("#optSelect" + (contSeq + 1)).find('li.on').length > 0  && jQuery(obj).find("li.on").length == 0)
	        {
	        	optResetOption(obj, contSeq ,'01');
	            for(var z=contSeq; z<optTotalCnt; z++){
	            	curCombiOptArray[z] = "";
	            	curCombiOptNmArray[z] = "";
	            }
	            enableOptLoadingLayer();
	            return;
	        }
	        else if (optIex >= 1 && isNotSelected)
	        {
	            alert("���õ� ���� �ɼ��� �����ϴ�. �ɼ��� �� ���� ���ּ���");
	            optResetOption(obj, contSeq , '01');
	            for(var z=0; z<optTotalCnt; z++){
	            	curCombiOptArray[z] = "";
	            	curCombiOptNmArray[z] = "";
	            }
	            enableOptLoadingLayer();
	            return;
	        }
	        else
	        {
	            if (optIex == (optTotalCnt - 2))
	            {
	            	var $selectObj = jQuery(obj).find("li.on");
	                if (jQuery($selectObj).length <= 0) {
	                	jQuery("#optSelectedNm" +  contSeq ).text('');
	            		jQuery("#optSelect" + contSeq ).find("li").removeClass("on");
	                } else {
	                	jQuery("#optSelectedNm" +  (contSeq +1 )).text('');
	            		jQuery("#optSelect" + (contSeq +1)).find("li").removeClass("on");
	                    _fnOptGetLastOptNew(obj, dftOptNo);
	                }
	            } else {
	            	optResetOption(obj, contSeq+1 ,'01');

	                var optArr = "";

	                var trgtObjNm;
	                for ( var i = 1; i <= optIex; i++)
	                {
	                	trgtObjNm =jQuery("#optSelect" + i).find("li.on") ;
	                	 if (trgtObjNm.length  > 0 ) {
	                		 optArr = optArr + jQuery(trgtObjNm).find('a').attr("data-opt_value")  + ",";
	                    }
	                }

					if(_selOptCnt > 2) _fnOptGetSubOptAjaxCall(contSeq + 1, _PRDNO, optArr, optIex+1, dftOptNo);
					else _fnOptGetSubOptAjaxCall(contSeq + 1, _PRDNO, optArr, optIex+2, dftOptNo);

	            }

	          	var textName = jQuery("#optSelectedNm" + contSeq).text();
	          	textName = textName.replace(/[<>]/gi,"").replace(/[\']/gi,"\'").replace(/\\n/gi, "").replace(/\\r/gi, ""); // �ɼǸ�

	          	if(textName.lastIndexOf(" (") > 0){
	          		textName = textName.substr(0,textName.lastIndexOf(" ("));
	          	}

	            curCombiOptArray[contSeq] = jQuery("#optSelect" + contSeq ).find('li.on').find('a').attr("data-opt_value");
	            curCombiOptNmArray[contSeq] = textName;
	        }
	    }
	    enableOptLoadingLayer();
	}

	function _fnOptGetStockNew2(obj, seq){
	    if (obj == null) return;

	    var contNm = jQuery(obj).attr("id");
	    var contSeq = _fnOptGetContSeq(contNm);

	    if (contSeq < 0)  return;

	    var targetObj = jQuery(obj).find("li.on");
	    var optArr = "";
		var optArrNm = "";
	    if (_selOptCnt > 1)
	    {
	        var trgtObj;
	        for ( var i = 1; i < _selOptCnt; i++)
	        {
	        	 trgtObj = jQuery("#optSelect" + i ).find("li.on");

	            if (i < _selOptCnt && jQuery("#optSelectedNm" + i ).text() == "") {
	                alert("���� �ɼ��� ���� �������ּ���");
	                optArr = "";
					optArrNm = "";
	                break;
	            }

	            if (jQuery(trgtObj).length > 0){
					optArr = optArr + jQuery(trgtObj).find("a").attr("data-opt_value")+ ",";
					optArrNm = optArrNm + jQuery(trgtObj).find("a").text() +  ",";
	            }
	        } // end for
	    }
	    else
	    {
	    	 if ( jQuery(targetObj).length > 0 )   {
	 			optArr = optArr + jQuery(targetObj).find("a").attr("data-opt_value") + ",";
	 			optArrNm = optArrNm + jQuery(targetObj).find("a").text() + ",";
	 		}
	    }

	    // ���ð��� ���� ��� �ʱ�ȭ
	    if (optArr == "" ||  jQuery(targetObj).length== "")
	    {
	        return;
	    }

	    // �ɼ��ߺ� ���� üũ---------------- (�ɼǼ��ÿ��� ����)
	    var optArrLst = document.getElementsByName("optArr");
	    for ( var i = 0; i < optArrLst.length; i++)
	    {
	        //�ߺ��� �ʱ�ȭ
	        if (optArrLst[i].value == optArr) {
	            alert("�̹� ���õǾ� �ִ� �ɼ��Դϴ�.");
	            return;
	        }
	    }

	    // �ɼǹ��߰�������ǰ ���밡 ���
	    if (jQuery(obj).find("li.on").length > 0)  {
			_fnOptGetStockInfoByOptNos(contSeq, optArr, '01', optArrNm);
	    }
	}

/**
* ������ �ɼ� ����Ʈ ��ȸ
* @param obj        : �������ɼ� SelectBox
* @param dftOptNo   : �ʱ�� ������ optNo
*/
function _fnOptGetLastOptNew(obj, dftOptNo)
{
  if (obj == null) return;
  if (dftOptNo == undefined) dftOptNo = "";
  var prdNo = _PRDNO;

  var contNm = jQuery(obj).attr("id");

  var contSeq = _fnOptGetContSeq(contNm);

  if (contSeq < 0) return;
  // �ɼǿ����� Start ��ġ ��ȸ
  var optArr = "";
  var trgtIdx = contSeq;
  if ((_selOptCnt+1) > 1)
  {
      var trgtObjNm;
      for ( var i = 1; i < (_selOptCnt + 1); i++)
      {
      	trgtObjNm = jQuery("#optSelect" + i ).find("li.on");
          if (jQuery(trgtObjNm).length > 0){
  			optArr = optArr + jQuery(trgtObjNm).find("a").attr("data-opt_value")+ ",";
          }
      }

      trgtIdx = contSeq + 1;
  }
  else
  {
  	var trgtObj = jQuery(obj).find("li.on");
      if ( jQuery(trgtObj).length > 0 )   {
			optArr = optArr + jQuery(trgtObj).find("a").attr("data-opt_value") + ",";
		}
      trgtIdx = contSeq;
  }

  // ������ �ɼ� SelectBox �ʱ�ȭ
  _fnOptGetLastOptAjaxCall(trgtIdx, prdNo, optArr, dftOptNo);
}

//[�ֹ����� - �߰�������ǰ ] ==========================================================================================



 /**
  * (������)�ɼ� html ����
  */
  function _makeOptionHtml(obj, optionGrpNm, index){
  	var strHtml = new Array();

  	var arrOptionInfo = jQuery(obj).attr("data-opt_value").split(":");
  	var textName = jQuery(obj).text();
  	textName = textName.replace(/[<>]/gi,"").replace(/[\']/gi,"\'").replace(/\\n/gi, "").replace(/\\r/gi, ""); // �ɼǸ�
  	if(textName.lastIndexOf(" (") > 0){
  		textName = textName.substr(0,textName.lastIndexOf(" ("));
  	}
  	optionGrpNm = optionGrpNm.replace(/[<>]/gi,"").replace(/[\']/gi,"\'").replace(/\\n/gi, "").replace(/\\r/gi, ""); // �ɼǱ׷��θ�

  	strHtml.push('<li id="divOptIndex_'+index+'">');

  	var tmpCurCombiOptStr = "";
  	var tmpCurCombiOptNmStr = "";
  	var tmpSelectedText = "";

	var optionTextArr = document.getElementsByName("optionDispText");
	for ( var k = 0; k < _entOptCnt; k++) {
		tmpCurCombiOptNmStr = tmpCurCombiOptNmStr + " / " + optionTextArr[k].value;
	}
	// ��¥�� �ϰ��
	var _dailyOptCnt = _selOptCnt;
	if(_optTypCd=="01") {
		_dailyOptCnt = _dailyOptCnt + 1;
	}

	for ( var w = 0; w < _dailyOptCnt; w++) {
  		tmpObj = jQuery("#optList" + w).find("li.on").find("a");
  		tmpCurCombiOptStr = tmpCurCombiOptStr + "-" + jQuery(tmpObj).attr("data-opt_value");
  		tmpSelectedText = jQuery(tmpObj).text();
  		tmpCurCombiOptNmStr = tmpCurCombiOptNmStr + " / " + tmpSelectedText;
  	}

  	tmpCurCombiOptNmStr = tmpCurCombiOptNmStr.substring(0,3)==" / "?(tmpCurCombiOptNmStr.substring(3, tmpCurCombiOptNmStr.length)):tmpCurCombiOptNmStr;
  	strHtml.push('		<em class="op">'+tmpCurCombiOptNmStr+'</em>');
  	strHtml.push('		<div class=\'num_set\'>');
  	strHtml.push('			<input name="optTextNameStr" 	id="optTextNameStr'+index+'"	type="hidden" value="'+tmpCurCombiOptStr+'-'+textName+'">');

  	strHtml.push('			<input name="optionStckNo" 		id="optionStckNo'+index+'" 		type="hidden" value="">');
  	strHtml.push('			<input name="optionPrc" 		id="optionPrc'+index+'" 		type="hidden" value="">');
  	strHtml.push('			<input name="optionStockHid"	id="optionStockHid'+index+'" 	type="hidden" value="">');
  	strHtml.push('			<input name="optArr" 			id="optArr'+index+'" 			type="hidden" value="">');
  	strHtml.push('			<input name="optPrdNm" type="hidden" value="'+textName+'">');
  	//20150709 �������� �������
  	strHtml.push('			<input name="optionNm" 			id="optionNm'+index+'"			type="hidden" value="'+tmpCurCombiOptNmStr+'">');
  	strHtml.push('			<input name="cupnIssNo1" 		id="cupnIssNo1'+index+'"		type="hidden" value="0">');
  	strHtml.push('			<input name="addDscAmt" 		id="addDscAmt'+index+'"			type="hidden" value="0">');
  	strHtml.push('			<input name="cupnIssNo2" 		id="cupnIssNo2'+index+'"		type="hidden" value="0">');
  	strHtml.push('			<input name="bonusDscAmt" 		id="bonusDscAmt'+index+'"		type="hidden" value="0">');
  	strHtml.push('			<input name="optionStock" 		id="optionStock'+index+'" 	type="tel" value="1" maxlength="3" class="input_new" onkeyup="curClickedOptIndex='+index+'; _fnOptUpDownStockCnt('+index+',\'MULTI_OPT\', 0,\'Y\')" onblur="curClickedOptIndex='+index+'; _fnOptUpDownStockCnt('+index+',\'MULTI_OPT\', 0,\'N\')" onKeypress="if (event.keyCode == 13){ return false;}" onclick="_setNumFocus(this)" maxlength="3" title="���ż���" >');
  	strHtml.push('			<button type="button" class="qty_minus" onclick="curClickedOptIndex='+index+'; _fnOptUpDownStockCnt('+index+',\'MULTI_OPT\', -1,\'N\'); ">-1</button>');
  	strHtml.push('			<button type="button" class="qty_plus" onclick="curClickedOptIndex='+index+'; _fnOptUpDownStockCnt('+index+',\'MULTI_OPT\', 1,\'N\'); ">+1</button>');
  	strHtml.push('			<span class="tx"></span>');

	if(_entOptCnt>0) {	//�Է��� �ɼ��� ������ �� ����/������ �ɼ��� ������ ���
		var tmpOptNmStr =  document.getElementsByName("optionDispName");
		var tmpOptNoStr =  document.getElementsByName("optionDispNo");
		var tmpOptTxtStr =  document.getElementsByName("optionDispText");
		for(var e=0; e<_entOptCnt; e++){
			strHtml.push('<input type="hidden" name="optionName" value="'+tmpOptNmStr[e].value+'"/>');
			strHtml.push('<input type="hidden" name="optionNo" value="'+tmpOptNoStr[e].value+'"/>');
			strHtml.push('<input type="hidden" name="optionText" value="'+tmpOptTxtStr[e].value+'"/>');
		}
	}

  	strHtml.push('		<\/div>');
  	strHtml.push('		<div class=\'prc\'>');
  	strHtml.push('		<span id="dispOptPrc'+index+'" name="dispOptionPrc"></span>');
  	strHtml.push('		<button type="button" class="del" onclick="_fnDelOptPrd('+index+',\'MULTI_OPT\'); ">�ɼǻ���</button>');
  	strHtml.push('		<\/div>');
  	strHtml.push('<\/li>');

  	var strHTMLObj = strHtml.join('');
  	return strHTMLObj;
  }

  /**
   * ���õ� �ɼ� �� ��� ����
   */
   function _fnDelOptPrd(index, type){
   	if(type == "OPT"){
   	}
   	else{
   		if(index==0 && _entOptCnt>0){
   			if(confirm("�����Ͻ� �ɼ��� �����Ͻø� ���ΰ�ħ �˴ϴ�.\n�����Ͻðڽ��ϱ�?")){
   				window.top.location.reload();
   			}else{
   				return;
   			}
   		}
   		var divSelectedAddPrd = document.getElementById("divSelectedOptPrd");
   		var divSetObj = document.getElementById("divOptIndex_"+index);
   		divSelectedAddPrd.removeChild(divSetObj);
   	}
   	_fnHanddleOptPrdWrap(type);
   	//_fnOptCuponInfo();	// ��ǰ üũ

   	// �ɼ� �� �߰�������ǰ ���� ���밡 ���
   	_fnOptCalcOptNAddPrc();
   }


 function _fnHanddleOptAddPrdWrap(type) {
	 if (type == "OPT") {

	 } else {
	 	var divSelectedAddPrd = document.getElementById("divSelectedAddPrd");
	 	var divSelectedOptPrdWrap = document.getElementById("divSelectedOptPrdWrap");
	 	var divSelectedOptPrd = document.getElementById("divSelectedOptPrd");

	 	if (divSelectedAddPrd.childNodes.length > 0) {
	 		divSelectedOptPrdWrap.style.display = "block";
	 	} else {
	 		if (divSelectedOptPrd.childNodes.length <= 0)
	 			divSelectedOptPrdWrap.style.display = "none";
	 	}
	 }
 }
 function _fnHanddleOptPrdWrap(type) {
	 if (type == "OPT") {

	 } else {
	 	var divSelectedOptPrd = document.getElementById("divSelectedOptPrd");
	 	var divSelectedOptPrdWrap = document.getElementById("divSelectedOptPrdWrap");

	 	if (divSelectedOptPrd.childNodes.length > 0) {
	 		divSelectedOptPrdWrap.style.display = "block";
	 	} else {
	 		var divSelectedAddPrd = document.getElementById("divSelectedAddPrd");
	 		if(divSelectedAddPrd.childNodes.length <= 0)
	 			divSelectedOptPrdWrap.style.display = "none";
	 	}
	 }
 }
 /**
 * ���õ� �ɼ� �� ��� ����
 */
 function _fnDelOptAddPrd(index, type){
 	if(type != "OPT"){
 		var divSelectedAddPrd = document.getElementById("divSelectedAddPrd");
 		var divSetObj = document.getElementById("divAddIndex_"+index);
 		divSelectedAddPrd.removeChild(divSetObj);
 	}
 	_fnHanddleOptAddPrdWrap(type);

 	// �ɼ� �� �߰�������ǰ ���� ���밡 ���
 	_fnOptCalcOptNAddPrc();
 }
//[�ֹ����� - ���� ] ==========================================================================================

// �ɼ� �� ���ż���
function _fnOptGetOptTotQty()
{
	var totOptTotQty = 0; 	// �� ���ż���

	// �ɼ����밡 ��� =========================(�ɼ� �����)
	if (_selOptCnt > 0)
	{
		var optPrcArr = document.getElementsByName("optionPrc");
		var optStockArr = document.getElementsByName("optionStock");
		var optStock = 0;

		var trgt;
		for ( var i = 0; i < optPrcArr.length; i++)
		{
			// �ɼ��� ���õ��� ���� ��� �ش� �ɼ� ���� pass
			if (optPrcArr[i].value == "") continue;
			trgt = optPrcArr[i];

			// �ɼ����밡 & �� �������
			optStock = Number(optStockArr[i].value);
			totOptTotQty = totOptTotQty + optStock;
		}
	}
	else
	{
		totOptTotQty = Number(document.getElementById("optionStock0").value);
	}

	// �Ѽ��� ��ȯ
	return totOptTotQty;
}
// ���ż������� �� ��ۺ� ���� ���� üũ
function _fnChkOrderInfo()
{
	var obj = document.frmMain;
	var optTotQty = _fnOptGetOptTotQty(); // �ɼ� ���ż��� �� ��.

	// ���ż��� ���� üũ
	if (_isSelLimitYN == "Y")
	{

		if (optTotQty > _selLimitQty) {
			alert("�ش� ��ǰ�� �ִ뱸�� ���� ����(" + _selLimitQty + "��)�� �ʰ��ϼ̽��ϴ�.");
			return false;
		}

	}

	if (_isSelMinLimitYN == "Y")
	{
		if (optTotQty < _selMinLimitQty) {
			alert("�ش� ��ǰ�� �ּұ��� ���� ������ " + _selMinLimitQty + "���Դϴ�.");
			return false;
		}
	}

	return true;
}

//������ ��ȿ�� üũ
function _fnChkOrderStock(){
	// ��� üũ
	var objStock = document.getElementsByName("optionStock");
	var objStockHid = document.getElementsByName("optionStockHid");
	var entOptText = document.getElementsByName("optionText");

	if (_selOptCnt > 0) // ������ �ɼ� ���� �ټ� �ɼ�
	{
		if(optCheckStatus!="OK"){
			alert("�����Ͻ� �ɼ��� ��� Ȯ�� �� �Դϴ�.[" + optCheckStatus+ "]");
			return false;
		}

		var tmpStock;
		for ( var i = 0; i < objStock.length; i++)
		{
			// ������ �� �Է� �ɼ� ����
			if ((objStock[i].value).trim() == "")
			{
				if (i == 0)
					alert("�ɼ��� �����Ͻ��� �������ּ���.");
				else
					alert("������ �Է����� ���� �ɼ��� ������ ���ּ���.");
				return false;
			}
			tmpStock = parseInt(objStock[i].value);

			// �ɼ��� ���õ��� ���� �ɼ� ���� üũ
			if (tmpStock > 0 && objStockHid[i].value == "") {
				alert("�ɼ��� �������ּ���.");
				return false;
			}

			if (tmpStock > 0 && objStockHid[i].value == "0") {
				alert("��� ���� �ɼ��Դϴ� �ɼ� �缱���� �ֹ� ������ �Է��ϼ���.");
				return false;
			}

			// ������ ��
			if (tmpStock > parseInt(objStockHid[i].value)) {
				alert("�������� " + objStockHid[i].value + "�� ���� �մϴ�. ������ ���Ϸ� ���� ������ �Է����ּ���.");
				return false;
			}

			// �Է��� �ɼ� �Է� ���� üũ
			for ( var j = (_entOptCnt * i); j < (_entOptCnt * i + _entOptCnt); j++) {
				if (tmpStock > 0 && (entOptText[j].value).trim() == '') {
					alert("�Է��� �ɼ��� �Է��ϼ���.");
					entOptText[j].focus();
					return false;
				}

				if(checkSNOString((entOptText[j].value).trim())) {
					alert("�Է��� �ɼǿ� ���������� ���ԵǾ� �־� �ɼǺ����� �Ұ��մϴ�.\n�Է��� �ɼ��� ���������� �ƴ� ��� ������ 1599-0110���� �����ּ���.");
					entOptText[j].focus();
					return false;
				}
			}


		}
	}
	else // ������ �ɼ� ���� ��ǰ ���� ���
	{
		// ��� Ȯ��
		if (objStockHid[0].value == "" || objStockHid[0].value == "0") {
			alert("��� ���� ��ǰ�Դϴ�.");
			return false;
		}

		var tmpStock = parseInt(objStock[0].value);
		// ������ ��
		if (tmpStock > parseInt(objStockHid[0].value)) {
			alert("�������� " + objStockHid[0].value
					+ "�� ���� �մϴ�. ������ ���Ϸ� ���� ������ �Է����ּ���.");
			return false;
		}

		// �Է��� �ɼ� �Է� ���� üũ
		for ( var j = 0; j < _entOptCnt; j++) {
			if (tmpStock > 0 && (entOptText[j].value).trim() == '') {
				alert("�Է��� �ɼ��� �Է��ϼ���.");
				entOptText[j].focus();
				return false;
			}

			if(checkSNOString((entOptText[j].value).trim())) {
				alert("�Է��� �ɼǿ� ���������� ���ԵǾ� �־� �ɼǺ����� �Ұ��մϴ�.\n�Է��� �ɼ��� ���������� �ƴ� ��� ������ 1599-0110���� �����ּ���.");
				entOptText[j].focus();
				return false;
			}
		}

	}

	return true;
}


//��ǰ�� �ֹ����� Parameter ����
function _setPrdOrderParam(obj)
{
	chkMinusOptYn = false;
	var optArr = "";
	var optArrTemp = "";
	var optStckArr = "";
	var optPrcArr = "";
	var addPrdArr = "";
	var cupnIssNo1Str = "";
	var cupnIssNo2Str = "";

	var optDataNo = document.getElementsByName("optionData"); // ������ �ɼ� ��ȣ
	var optTextName = document.getElementsByName("optionName"); // �Է��� �ɼ� ��ȣ
	var optTextNo = document.getElementsByName("optionNo"); // �Է��� �ɼ� ��ȣ
	var optText = document.getElementsByName("optionText"); // �Է��� �ɼ� �Է� ����
	var optStck = document.getElementsByName("optionStock"); // ��� ����
	var optStckNo = document.getElementsByName("optionStckNo"); // ��� ���׹�ȣ
	var optPrc = document.getElementsByName("optionPrc"); // �ɼǰ���
	var optArrNos = document.getElementsByName("optArr"); // �ɼ���ü��������
	// 20150709 ���� ���� �߰�
	var cupnIssNo1s	= document.getElementsByName("cupnIssNo1");	// ����������
	var cupnIssNo2s	= document.getElementsByName("cupnIssNo2");	// ����������

	var selPos = 0;
	var entPos = 0;

	if (_optCnt > 0)
	{
		for ( var k = 0; k < optStck.length; k++)
		{
			// ������ ����
			if(_selOptCnt > 0){
				var tempStr = optArrNos[k].value.replace(/,/g,'_ @=@0_').replace(/:/g,'!=!');
				if(tempStr.indexOf(':') > 0){
					tempStr = tempStr.substring(0,tempStr.indexOf(':'));
				}
				optArrTemp += "0_" + tempStr.substring(0, tempStr.length-2);
			}

			// �Է��� ����
			for ( var i = 0; i < _entOptCnt; i++)
			{
				if (optTextNo[entPos].value != "")
				{
					if (optText[entPos].value != "") { // �Է��� ���� �����
						optArrTemp += "1_" + optTextNo[entPos].value + "_" + optText[entPos].value + "@=@";
					} else { // �Է��� ���� ������
						optArrTemp += "1_" + optTextNo[entPos].value + "_ @=@";
					}

				}
				entPos++;
			}
			optArrTemp += ":=:";

			if (optStck[k].value > 0)
			{
				optArr += optArrTemp;
				// ��� ����
				optStckArr += optStck[k].value + ":=:";
				// �ɼ� ���� ����
				optPrcArr += optPrc[k].value + ":=:";

				try{
					if(tempMinusChkFlag == "Y" && optPrc[k].value < 0) chkMinusOptYn = true;
				}catch(e){}
			}

			optArrTemp = "";
			try{
				if(cupnIssNo1s[k].value != "" && Number(cupnIssNo1s[k].value) > 0){
					cupnIssNo1Str += cupnIssNo1s[k].value + ",";
				} else {
					cupnIssNo1Str += "0,";
				}
				if(cupnIssNo2s[k].value != "" && Number(cupnIssNo2s[k].value) > 0){
					cupnIssNo2Str += cupnIssNo2s[k].value + ",";
				} else {
					cupnIssNo2Str += "0,";
				}
			} catch (e) {
				console.log("set option coupon err : " + e);
			}
		}
		obj.optString.value = optArr;
		obj.optPrcString.value = optPrcArr;
	}
	else // �ɼ� ������
	{
		if (optStck[0].value != "" && parseInt(optStck[0].value) > 0) {
			optStckArr = optStck[0].value + ":=:";
			optPrcArr = optStck[0].value + ":=:";

			try{
				if(tempMinusChkFlag == "Y" && optPrc[0].value < 0) chkMinusOptYn = true;
			}catch(e){}

			try{
				if(cupnIssNo1s[0].value != "" && Number(cupnIssNo1s[0].value) > 0){
					cupnIssNo1Str += cupnIssNo1s[0].value + ",";
				} else {
					cupnIssNo1Str += "0,";
				}
				if(cupnIssNo2s[0].value != "" && Number(cupnIssNo2s[0].value) > 0){
					cupnIssNo2Str += cupnIssNo2s[0].value + ",";
				} else {
					cupnIssNo2Str += "0,";
				}
			} catch (e) {
				console.log("set option coupon err : " + e);
			}
		}
	}
	obj.optQtyString.value = optStckArr;
	obj.optPrcString.value = optPrcArr;
	obj.cupnIssNo1Str.value = cupnIssNo1Str;
	obj.cupnIssNo2Str.value = cupnIssNo2Str;

	return optStckArr;
}



//str��1~9���� ���ڸ� �����ϴ�.
function checkNumber(str) {
    var flag=true;
    if (str.length > 0) {
        for (i = 0; i < str.length; i++) {
            if(str.charAt(0) == '0'){
                flag=false;
            }
            if (str.charAt(i) < '0' || str.charAt(i) > '9') {
                flag=false;
            }
        }
    }
    return flag;
}
function _checkTagKeyUp(obj){

    var objStrip = new RegExp();
    objStrip = /[<>\/!]/gi

    repStr2 = obj.value.replace(objStrip, "");

    if (obj.value != repStr2){
          alert("<, >, /, ! Ư�����ڴ� �Է��� �� �����ϴ�.");
          obj.value = repStr2;
          return false;
    }
    else{
    	objStrip = /[\"]/gi
        obj.value = obj.value.replace(objStrip, "��");
        return true;
    }
}
String.prototype.Digit2Comma = function()
{
	var num = this;
	var argStr = num.trim();
	var rtnStr = "";
	var split1 = "";
	var split2 = "";
	var isMinus = false;

	if (argStr == "") return "";

	if (num < 0) {
		num *= -1;
		argStr = num+"";
		isMinus = true;
	}

	if (argStr.indexOf(".") > 0) {
		split1 = argStr.substring(0, argStr.indexOf("."));
		split2 = argStr.substr(argStr.indexOf("."));
		argStr = split1;
	}

	var commaPos = argStr.length % 3;

	if (commaPos) {
		rtnStr = argStr.substring(0, commaPos);
		if (argStr.length > 3)
			rtnStr += ",";
	} else {
		rtnStr = "";
	}

	for ( var i = commaPos; i < argStr.length; i += 3) {
		rtnStr += argStr.substring(i, i + 3);
		if (i < argStr.length - 3)
			rtnStr += ",";
	}

	if (isMinus)
		rtnStr = "-" + rtnStr;
	return rtnStr + split2;
}

String.prototype.cutByte = function(len, add)
{
	var str = this;
	var dft = (typeof (add) != "undefined") ? add : "..";
	var l = 0;
	for ( var i = 0; i < str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len)
			return str.substring(0, i) + dft;
	}
	return str;
}

String.prototype.bytes = function()
{
	var str = this;
	var l = 0;
	for ( var i = 0; i < str.length; i++)
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
	return l;
}

//���� ��Ŀ���� �� ������ �̵�
function _setNumFocus(obj){
    var id_value=(obj.value).replace(/[^(\d)]/gi,"");
    obj.value=id_value;

    // 0���� ���� ��, 1���� ���� ������ ��ĭ �������� �̵��� ��Ŀ�� ��ġ�� ���մϴ�.
    setRightFocus(obj, 0); // ���������� ��Ŀ���� ��ġ��ŵ�ϴ�.
}
function setRightFocus(pThis, pPos) {
	var lThis;
	lThis = pThis;
	if(typeof pThis == "string") {
	  lThis = document.getElementById(pThis);
	}
	pPos = lThis.value.length-pPos;
	if(lThis.setSelectionRange) {
	  lThis.focus();
	  lThis.setSelectionRange(pPos,pPos);
	}
}

function checkSNOString(str) {
	str = str.replace(/\s/g,'');
	var pattern = /([^\d]|\b)[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[-_]?[1-4][0-9]{6}([^\d]|\b)/;
	return pattern.test(str);
}