;(function(outer){

  /**
	* @Description DeviceInfo�� instance�� device�� ����
	*/
	outer.device = function() {
	  di = new DeviceInfo();
	  di.init();
		return di;
	};
	
	/**
	* @Description ��ɺ� white list
	*/
	device.whiteList = {
		'move' : [
		  {model:"SHV-E160",version:"+2.1"}
		  ,{model:"SHV-E210",version:"+2.1"}
		  ,{model:"SHV-E110",version:"+2.1"}
		  ,{model:"SHV-E120",version:"+2.1"}
		  ,{'model':'iPhone','version':'+3.2'}
		],
		'prd3dSwipe' : [
		  {model:"SHW-M440",version:"+4.0"}
		  ,{model:"SHV-E210",version:"+4.0"}
		  ,{model:"SHV-E300",version:"+4.0"}
		  ,{model:"SHV-E330",version:"+4.0"}
		  ,{model:"SHV-E370",version:"+4.0"}
		  ,{model:"SHV-E250",version:"+4.0"}
		],
		'wowAd' : [
		   {model:"SHW-M250",version:"+3.0"}//������s2
		  ,{model:"SHV-E110",version:"+3.0"}//������s2lte
  		  ,{model:"SHW-M440",version:"+3.0"}//������s3
   		  ,{model:"SHV-E210",version:"+3.0"}//������s3lte
  		  ,{model:"SHV-E300",version:"+3.0"}//������s4
  		  ,{model:"SHV-E160",version:"+3.0"}//�����ó�Ʈ1
  		  ,{model:"SHV-E250",version:"+3.0"}//�����ó�Ʈ2
  		  ,{model:"SM-N900",version:"+3.0"}//�����ó�Ʈ3
  		  ,{model:"SHV-E140",version:"+3.0"}//������tab8.9
  		  ,{model:"SHW-M380",version:"+3.0"}//������tab10.1
   		  ,{model:"IM-A800",version:"+3.0"}//��ī�̺��� lte
   		  ,{model:"LG-SU640",version:"+3.0"}//��Ƽ�ӽ�lte
   		  ,{model:"LG-F180",version:"+3.0"}//��Ƽ�ӽ�G
   		  ,{model:"LG-F240",version:"+3.0"}//��Ƽ�ӽ�G pro
   		  ,{model:"LG-F350",version:"+3.0"}//��Ƽ�ӽ�G pro2
  		],
		'iScroll' : [
		   {model:"SHV-E210S",version:"+3.0"}//��3
		  ,{model:"SHV-E160S",version:"+3.0"}//����Ʈ1
		  ,{model:"SHV-E250S",version:"+3.0"}//����Ʈ2
		  ,{model:"SHV-E330S",version:"+3.0"}//��4 LTE-A
		  ,{model:"SHV-E300S",version:"+3.0"}//��4 LTE
		]
	};
	
	device.phoneInfo = {
		'iphone' : 'iPhone'
		,'ipad' : 'iPad'
		,'android' : 'Android'
		,'galaxyTab89' : 'SHV-E140'
		,'galaxyTab' : 'SHW-M180'
		,'galaxyTab2' : 'SHW-M380'
		,'galaxyK' : 'SHW-M130K'
		,'galaxyU' : 'SHW-M130L'
		,'galaxyS' : 'SHW-M110'
		,'galaxyS2' : 'SHW-M250'
		,'galaxyS2LTE' : 'SHV-E110'
		,'galaxyS2HD' : 'SHV-E120'
		,'galaxyS3' : 'SHW-M440'
		,'galaxyS3LTE' : 'SHV-E210'
		,'galaxyS4' : 'SHV-E300'
		,'galaxyS4LTEA' : 'SHV-E330'
		,'galaxyS4MINI' : 'SHV-E370'
		,'galaxyNote' : 'SHV-E160'
		,'galaxyNote2' : 'SHV-E250'
		,'galaxyNote3' : 'SM-N900'
		,'galaxyNexus' : 'Galaxy Nexus'
		,'galaxyNexus5' : 'Nexus 5'
		,'galaxyNexus7' : 'Nexus 7'
	    ,'optimusLTE' : 'LG-SU640'
	    ,'vegaLTE' : 'IM-A800'
	    ,'optimusG' : 'LG-F180'
	    ,'optimusGpro2' : 'LG-F350'
	    ,'optimusGpro' : 'LG-F240'
	};
	
	/**
	* @Description DeviceInfo �ʱ�ȭ
	*/
	outer.DeviceInfo = function() {
		this._userAgent = navigator.userAgent;
		this._info = {};
	};
	
	/**
	* @Description userAgent ���� �˻� �Լ�
	*/
	DeviceInfo.prototype.f = function(s,h) {
	  return ((this._userAgent||"").indexOf(s) > -1);
	};
	
	/**
	* @Description DeviceInfo ������ �Լ�
	*/
	DeviceInfo.prototype.init = function() {
	    for(var i in device.phoneInfo){
	      this._info[i] = this.f(device.phoneInfo[i]);
	    }    
	    
	    this._info.version = '';
	    this._info.name = '';
	    this._info.model = '';
	    
	    var ar = null;
	    if(this._info.iphone || this._info.ipad){
	        ar = this._userAgent.match(/OS\s([\d|\_]+\s)/i);              
	        if(ar !== null&& ar.length > 1){
	            this._info.version = ar[1];         
	        }       
	    } else if(this._info.android){
	        ar = this._userAgent.match(/Android\s([^\;]*)/i);
	        if(ar !== null&& ar.length > 1){
	            this._info.version = ar[1];
	        }   
	    }
	    this._info.version = this._info.version.replace(/\_/g,'.');
	
	    for(var x in this._info){
	        if (typeof this._info[x] == "boolean" && this._info[x] && this._info.hasOwnProperty(x)) {
	            this._info.name = x;
	            this._info.model = device.phoneInfo[x];
	        }
	    }
	    this._info.bChrome = this._info.android && (this.f('CrMo') || this.f('Chrome'));
	};
	
	/**
	* @Description Device ������ ���� ��ü�� ��ȯ
	*/
	DeviceInfo.prototype.getInfo = function() {
	  return this._info;
	};
	
	/**
	* @Description javascript��� �������� üũ\n����� �𵨸� üũ, ���� version���� Ȯ�� ����
	* @Param (String) external js��
	* @Return (Boolean) ���� ���� ����
	*/
	DeviceInfo.prototype.able = function(funcName) {
		try {
		  function t(s) {
			  return s.replace(/^\s\s*/,'').replace(/\s\s*$/,'');
		  }
		    var thisModel = t(this._info.model);
		    var thisVersion = t(this._info.version);
			list = device.whiteList[funcName] || [];
			
			function c(s, t) {
			  if (s.indexOf('+') > -1) {
			    var ver = s.substring(1,s.length);		    
			    var sL = ver.split('.');
			    var tL = t.split('.');
			    
			    for(var i in tL) {
			      if (sL[i]) {
	  		      if (tL[i] > sL[i]) {
	  		        return true;
	  		      } else if (tL[i] < sL[i]) {
	  		        return false;
	  		      }
			      }
			    }
			    if (sL.length > tL.length) {
			      return false;
			    }
			    return true;
			  } else {
			    return s == t;
			  }
			}
			for(var i in list) {
				if ( (thisModel||'') == list[i].model ) {
				  if( c(list[i].version, (thisVersion||'')) ) {
				   return true;
				  }
				}
			}
			return false;
		}catch(e) {
			return false;
		}
	};
	
})(this);