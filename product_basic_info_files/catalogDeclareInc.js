var CtlgDeclare = {
	ctlgVar : null,
	$popBtn: $('#ctlgDeclareBtn'),
	$popCloseBtn: $('#ctlgDeclareCloseBtn'),
	$procBtn: $('#ctlgDeclareProcBtn'),
	isProcess : false,
	init: function(ctlgVar) {
		this.ctlgVar = ctlgVar;
		this.setHandler();
	},
	initData: function() {
		$('input:checkbox[name="dclTypCd"]:checked').removeAttr('checked');
		$('#dclCont').val('');
		$('#emailRcvYn').removeAttr('checked');
	},
	setHandler: function() {
		var _this = this;
		this.$popBtn.on('click', function() {
			if( _this.ctlgVar.Common.isLogin === 'true' ) {
				_this.initData();
				mwUI.layerPopTop('popDeclare');
				$('html, body').animate({scrollTop : 0}, 400);
			} else {
				document.location.href = _this.ctlgVar.Const.SK_HTTP_SSL_CONTEXT_URL + '/Login/login.tmall?returnURL=' + encodeURIComponent(encodeURIComponent(document.location.href));
			}
		});
		
		this.$popCloseBtn.on('click', function() {
			_this.close();
			return false;
		});
		
		this.$procBtn.on('click', function() {
			_this.submit();
			return false;
		});
	},
	bytelength: function(str) {
		var i, ch;
		var len = str.length;
		for (i = 0; i < str.length; i++) {
			ch = str.substr(i,1).charCodeAt(0);
			if (ch > 127) { len++; }
		}
		return len;
	},
	close: function() {
		mwUI.layerPopClose('popDeclare');
	},
	submit: function() {
		var _this = this;
		
		if( $('input:checkbox[name="dclTypCd"]').is(':checked') === false ) {
			alert('�Ű� ������ 1�� �̻� ������ �ּ���.');
			return;
		}
		
		var $dclContObj = $('#dclCont');
		
		if( _this.bytelength($dclContObj.val()) > 1000 ) {
			alert('�ѱ� ���� 500�� ���� �Է� �����մϴ�.');
			$dclContObj.focus();
			return;
		}
		
		var dclTypCdStr = [];
		
		$('input:checkbox[name="dclTypCd"]:checked').each(function() {
			dclTypCdStr.push($(this).val());
		});
		
		if( _this.isProcess ) {
			alert('ó�� ���Դϴ�.');
			return;
		}
		
		var paramData = {
			'ctlgNo' : _this.ctlgVar.catalogNo
			, 'dclTypCdStr' : dclTypCdStr.join(',')
			, 'dclCont' : encodeURIComponent($dclContObj.val())
			, 'emailRcvYn' : $('#emailRcvYn').is(':checked') ? 'Y' : 'N'
		};
		
		$.ajax({
			url: _this.ctlgVar.Const.SK_HTTP_CONTEXT_URL + '/Catalog/catalogDeclareRegister.tmall'
			,dataType : 'json'
			,data : paramData
			,type : 'post'
			,async : true
			,success : function(json){
				_this.isProcess = false;
				if( json.RESULT_CODE == 'SUCCESS' ) {
					alert('���ݺ� �Ű� ���� "����"�Ǿ����ϴ�.\n������ ������ �ǰ� ���� �帮��, �Ű� ���� Ȯ�� �� ���� ���� ���� ��ġ�� �� �ֵ��� �ϰڽ��ϴ�.');
					_this.close();
				} else if( json.RESULT_CODE == 'ERROR' && json.ERROR_MSG != null && json.ERROR_MSG != '' ) {
					alert(json.ERROR_MSG);
				} else {
					alert('ó�� �� ������ �߻��Ͽ����ϴ�.');
				}
			}
			,error:function(xhr, status, err){
				_this.isProcess = false;
				alert('ó�� �� ������ �߻��Ͽ����ϴ�.');
			}
		});
	}
};