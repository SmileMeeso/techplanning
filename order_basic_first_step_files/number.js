/**
 * <pre>
 * NumberCheck
 * ������� ����Ѵ�.
 * </pre>
 * @param field form.element
 * @param error_msg ���� message
 * @return boolean
 */
function isNumber(field, error_msg){
	var val = field.value;

	if(checkDigitOnly(val, false) ) {
		return true;
	} else {
		if(error_msg.length > 0) {
			alert(error_msg);
			field.focus();
			field.select();
		}
		return false;
	}
}


/**
 * <pre>
 * NumberCheck
 * ������� ����Ѵ�.
 * </pre>
 * @param field form.element
 * @param error_msg ���� message
 * @return boolean
 */
function isCurrencyNumber(field, error_msg){
	var val = toNormalNum(field.value);

	if(checkDigitOnly(val, false) ) {

		return true;
	} else {
		if(error_msg.length > 0) {
			alert(error_msg);
			field.focus();
			field.select();
		}
		return false;
	}
}



/**
 * <pre>
 * �������� �ƴ���  �˻��Ѵ�.
 * �˻��� ���� "" �� ��� true�� �����ϰ� ������, space�μ��� true�� ������ �ȴ�.
 * </pre>
 * @param digitChar �˻��� string
 * @param space ""�� �� ��뿩��(true||false)
 * @return boolean
 */
function checkDigitOnly( digitChar, space ) {
	if(!space){
		if ( digitChar == null || digitChar=='' ){
    		return false ;
    	}
	}
	for(var i=0;i<digitChar.length;i++){
    	var c=digitChar.charCodeAt(i);
       	if( !(  0x30 <= c && c <= 0x39 ) ) {
       		return false ;
       	}
     }

    return true ;
}

/**
 * <pre>
 * ���ڳ� ���ڿ��� ��ȭ(Money) �������� �����.( ��ǥ(,) ��´ٴ� �Ҹ�.. )
 * &lt;input type="text" name="test" value="" onkeyup="this.value=toCurrency(this.value);"&gt;
 * or
 * var num = toCurrency(document.form[0].text.value);
 * </pre>
 * @param	amount	"1234567"
 * @return	currencyString "1,234,567"
 */
function toCurrency(amount){
	if(typeof amount == "number"){
		amount = amount + "";
	}
	var data = amount.split('.');
	var sign = "";

	var firstChar = data[0].substr(0,1);
	if(firstChar == "-"){
		sign = firstChar;
		data[0] = data[0].substring(1, data[0].length);
	}

	data[0] = data[0].replace(/\D/g,"");
	if(data.length > 1){
		data[1] = data[1].replace(/\D/g,"");
	}

	firstChar = data[0].substr(0,1);

	//0���� �����ϴ� ���ڵ� ó��
	if(firstChar == "0"){
		if(data.length == 1){
			return sign + parseFloat(data[0]);
		}
	}

	var comma = new RegExp('([0-9])([0-9][0-9][0-9][,.])');

	data[0] += '.';
	do {
		data[0] = data[0].replace(comma, '$1,$2');
	} while (comma.test(data[0]));

	if (data.length > 1) {
		return sign + data.join('');
	} else {
		return sign + data[0].split('.')[0];
	}
}

/**
 * <pre>
 * ���ڳ� ���ڿ��� ��ȭ(Money) �������� �����.( ��ǥ(,) ��´ٴ� �Ҹ�.. )
 * ��, ����� ����Ѵ�.
 * &lt;input type="text" name="test" value="" onkeyup="this.value=toCurrency(this.value);"&gt;
 * or
 * var num = toCurrency(document.form[0].text.value);
 * </pre>
 * @param	amount	"1234567"
 * @return	currencyString "1,234,567"
 * @see #toCurrency(amount)
 */
function toCurrencyPositive(amount){
	var firstChar = amount.substr(0,1);
	if(firstChar == "-"){
		amount = amount.substring(1, amount.length);
	}
	return toCurrency(amount);
}

/**
 * �־��� ��(val)�� �Ҽ������� num�ڸ������� �ݿø��Ѱ��� �����Ѵ�.
 *
 * @param val �ݿø��� ��
 * @param num �ݿø��� �ڸ���
 * @return number
 */
function round(val, num){
	val = val * Math.pow(10, num - 1);
	val = Math.round(val);
	val = val / Math.pow(10, num - 1);
	return val;
}

/**
 * ,�� �ִ� ���ڸ� ������ ���ڷ� �ٲ��ش�. (+), (-) ���
 *
 * @param num
 * @return number
 */
function toNormalNum( num ) {
	if (num=='0') {
	  return '0' ;
	} else {
    num = num.replace(/,/g, '');
    var args = Number(num);
	return args;
	}
}

/**
 * ���ڰ� �ش� ������ ������� �˻�
 * ����� ���� �޼����� �����ְ� true�� �����Ѵ�.
 *
 * @param field form.element
 * @param min int �ּҰ�
 * @param max int �ִ밪
 * @param error_msg string ���� �޼���
 * @return boolean
 */
function isOutOfNumericRange(field, min, max, error_msg) {
	if(field.value < min || field.value > max) {
		alert(error_msg);
		field.focus();
		field.select();
		return true;
	}
	return false;
}


/**
 * author : papillon212
 *
 * type="text" �� ���ڰ��� �Է°���
 * onkeyup="checkNumberOnly(this,1,event)" onblur="checkNumberOnly(this,1,event)"
 *
 * obj�� �ش� object
 * default_value�� �⺻��
 * @param id : element �̸�
 */
function checkNumberOnly(obj, default_value, event){
	var str = obj.value;
	var set_value = "";

	var key_code = event.keyCode;

	if(key_code == 0x10 || (key_code >= 0x25 && key_code <= 0x28) || (0x30 <= key_code && key_code <= 0x39) || (0x60 <= key_code && key_code <= 0x69)){ //shift�� ����Ű�� ����Ű�϶� ����
		return;
	}

	for(var i=0;i<str.length;i++){
		var c = str.charCodeAt(i);
		if( 0x30 <= c && c <= 0x39 ){
			set_value += str.charAt(i);
		}
	}

	if(set_value == ""){
		set_value = default_value+"";
	}

	obj.value = set_value;
}

/**
 * type="text" �� ���ڰ��� �Է°���
 * onKeyUp="javascript: checkNum(this, this.value);">
 * @param obj
 * @param value
 * @return
 */

function checkNum(obj, value) {

    var regExp = /[^0-9]+/g;

    if(regExp.test(value)) {

        alert("'����' �� �Է� �����մϴ�.");

        var returnStr = "";

        for(i = 0; i < value.length; i++) {
            if(value.charAt(i) >= '0' && value.charAt(i) <= '9') {
                returnStr += value.charAt(i);
            }
        }

        obj.value = returnStr;
        obj.focus();
    }
}
