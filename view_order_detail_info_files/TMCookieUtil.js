var TMCookieUtil=function(){var COOKIE_ID_ARR=["TP","TD","TT","TM","TW","T5D"];var HOST_DOMAIN=".11st.co.kr";var TD_PERIOD=1;var TT_PERIOD=365*10;var TM_PERIOD=TD_PERIOD*30;var TW_PERIOD=TD_PERIOD*7;var TD5_PERIOD=TD_PERIOD*5;var CK_SP="#";var VL_SP="|";String.prototype.stripSharp=function(){return this.replace(/^[\#\s]+|[\#\s]+$/g,"")};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};function isEmpty(param){if(!isNaN(param)){param=param.toString()}if(param==null||param.trim()==""||param.trim()=="undefined"||(typeof param=="undefined")){return true}else{return false}}function getExpireDate(period){var date=new Date();date.setDate(date.getDate()+period);var nextDay=new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);return nextDay.toGMTString()}function createNewCookie(ckIdIndex,newCookieStr){var cookieStr="";var expireDate="";if(!isEmpty(newCookieStr)){cookieStr+=COOKIE_ID_ARR[ckIdIndex]+"="+encodeURIComponent(newCookieStr.stripSharp())+";";if(ckIdIndex==1){expireDate=getExpireDate(TD_PERIOD)}else if(ckIdIndex==2){expireDate=getExpireDate(TT_PERIOD)}else if(ckIdIndex==3){expireDate=getExpireDate(TM_PERIOD)}else if(ckIdIndex==4){expireDate=getExpireDate(TW_PERIOD)}else if(ckIdIndex==5){expireDate=getExpireDate(TD5_PERIOD)}if(!isEmpty(expireDate)){cookieStr+=" expires="+expireDate+";"}cookieStr+=" domain="+HOST_DOMAIN+"; path=/;";document.cookie=cookieStr}else{document.cookie=COOKIE_ID_ARR[ckIdIndex]+"= ; expires="+getExpireDate(-1)+"; domain="+HOST_DOMAIN+"; path=/"}}function getMatchedStr(strArr,searchStr,seperator){if(strArr!=null&&strArr.length>0&&!isEmpty(searchStr)){for(var index=0;index<strArr.length;index++){var tempArr=strArr[index].trim().split(seperator);if(tempArr[0]==searchStr){return decodeURIComponent(tempArr[1].trim())}}}return""}return{add:function(ckIdIndex,cookieName,cookieValue){if(isEmpty(cookieName)){return false}var newCookieArr;if(isEmpty(cookieValue)){var regExsp=new RegExp("\\"+CK_SP,"g");newCookieArr=cookieName.replace(regExSp,"").trim().split(VL_SP)}else{var regExSp=new RegExp("\\"+CK_SP+"|\\"+VL_SP,"g");newCookieArr=[cookieName.replace(regExSp,"").trim(),cookieValue.replace(regExSp,"").trim()]}var classCookieStr="";var newCookieStr="";if(TMCookieUtil.isExistCookie(COOKIE_ID_ARR[ckIdIndex])){classCookieStr=TMCookieUtil.getCookie(COOKIE_ID_ARR[ckIdIndex]);var subCookieArr=classCookieStr.split(CK_SP);for(var index=subCookieArr.length-1;index>=0;index--){if(subCookieArr[index].split(VL_SP)[0]==newCookieArr[0]){subCookieArr.splice(index,1)}}subCookieArr.push(newCookieArr.join(VL_SP));newCookieStr=subCookieArr.join(CK_SP)}else{newCookieStr=newCookieArr.join(VL_SP)}createNewCookie(ckIdIndex,newCookieStr)},clear:function(ckIdIndex){createNewCookie(ckIdIndex,"")},remove:function(ckIdIndex,cookieName){if(isEmpty(cookieName)){return false}var CkCdValues="";var delFlag=false;var classCookies=TMCookieUtil.getCookie(COOKIE_ID_ARR[ckIdIndex]);var subCookies=classCookies.split(CK_SP);if(subCookies!=null&&subCookies.length>0){for(var index=subCookies.length-1;index>=0;index--){if(subCookies[index].split(VL_SP)[0]==cookieName){subCookies.splice(index,1)}}}var splicedCookieStr=subCookies.join(CK_SP);createNewCookie(ckIdIndex,splicedCookieStr);if(!TMCookieUtil.isExist(ckIdIndex,cookieName)){delFlag=true}return delFlag},isExistCookie:function(ckId){if(!isNaN(ckId)){ckId=COOKIE_ID_ARR[ckId]}var cookieArr=document.cookie.split(";");if(cookieArr!=null&&cookieArr.length>0){for(var index=0;index<cookieArr.length;index++){var tempArr=cookieArr[index].trim().split("=");if(tempArr[0]==ckId){return true}}}return false},isExist:function(ckIdIndex,cookieName){if(isEmpty(cookieName)){return false}var classCookieValues=TMCookieUtil.getCookie(COOKIE_ID_ARR[ckIdIndex]);var subCookieArr=classCookieValues.split(CK_SP);if(subCookieArr!=null&&subCookieArr.length>0){for(var index=0;index<subCookieArr.length;index++){if(subCookieArr[index].split(VL_SP)[0]==cookieName){return true}}}return false},getCookie:function(ckId){if(!isNaN(ckId)){ckId=COOKIE_ID_ARR[ckId]}var cookieString="";if(!isEmpty(ckId)){var cookieArr=document.cookie.split(";");cookieString=getMatchedStr(cookieArr,ckId,"=").stripSharp()}return cookieString},getSubCookie:function(ckIdIndex,cookieName){if(isEmpty(cookieName)){return false}var classCookies=TMCookieUtil.getCookie(COOKIE_ID_ARR[ckIdIndex]);var subCookieValue="";var subCookies=classCookies.split(CK_SP);if(subCookies!=null&&subCookies.length>0){for(var index=0;index<subCookies.length;index++){if(subCookies[index].split(VL_SP)[0]==cookieName){var subCookie=subCookies[index].split(VL_SP);if(subCookie.length>1){subCookieValue=subCookie[1];return subCookieValue}}}}return subCookieValue},allShowCookie:function(ckIdIndex){var cookie=TMCookieUtil.getCookie(eval(ckIdIndex));return cookie},setMobileDomain:function(){if(typeof _MOBILE_COOKIE_DOMAIN_!="undefined"){HOST_DOMAIN=_MOBILE_COOKIE_DOMAIN_}else{HOST_DOMAIN="m.11st.co.kr"}COOKIE_ID_ARR=["MP","MD","MT","MM","MW","M5D"]}}}();