// ------- order
//���̾�Toggle
function layerToggle(ele, btn, all){
	var element = document.getElementById(ele);
	element.style.display = (element.style.display != 'none') ? 'none' : 'block';

	if(btn && (element.style.display != 'none')){
		var pos = (document.getElementById(btn)) ? document.getElementById(btn) : btn;
		if(pos){
			var posTop = pos.offsetTop,
				posHeight = pos.offsetHeight;

			if(element.offsetParent !== pos.offsetParent) {
				var posParent = pos.offsetParent;

				while (posParent.offsetParent) {
					posTop += posParent.offsetTop;
					posParent = posParent.offsetParent;
				};

				var elementParent = element.offsetParent;

				while (elementParent.offsetParent) {
					posTop -= elementParent.offsetTop;
					elementParent = elementParent.offsetParent;
				};
			}
			element.style.top = posTop + posHeight +'px';
		}
	}
	if(all && (element.style.display != 'none')){
		classClose(ele, all);
	}
}

//help layer�ݱ�
function helpClose(self){
	self.parentNode.style.display='none';
}

//div����
function divOpen(ele, all){
	var element = document.getElementById(ele);
	element.style.display = 'block';
	if(all){
		classClose(ele, all);
	}
}

//���� class �ݱ�
function classClose(ele, all) {
	if(document.getElementsByClassName){
		var elses = document.getElementsByClassName(all);
	} else {
		var elses = getElementsByClassName(all);
		function getElementsByClassName( className ){
			var regEx = new RegExp('(^| )'+className+'( |$)');
			var nodes = new Array();
			var elements = document.body.getElementsByTagName("*");
			var len = elements.length;
			for(var i=0; i < len ; i++) {
				if(regEx.test(elements[i].className)) {
					nodes.push(elements[i]);
				}
			}
			elements = null;
			return nodes;
		}
	}
	for (var i=0; i < elses.length; i++){
		if((elses[i].style.display != 'none') && (elses[i].id != ele)) {elses[i].style.display = 'none'} ;
	}
}

//������ className�̿�
function moreToggle(ele, btn, className, textOpen, textClose){
	var element = document.getElementById(ele),
		btns = btn;
	if(element.className.lastIndexOf(className) < 0) {
		element.className += " " + className;
		btns.firstChild.nodeValue = textClose;
	} else {
		element.className = element.className.replace(" " + className, "");
		btns.firstChild.nodeValue = textOpen;
	}
}

//���, ��ưclass����
function useToggle(ele, btn, btnClass){
	var element = document.getElementById(ele),
		btns = (document.getElementById(btn)) ? document.getElementById(btn) : btn;

	if(element.style.display != 'none') {
		element.style.display = "none";
		btns.className = btns.className.replace(" " + btnClass, "");
	} else {
		element.style.display = "block";
		btns.className += " " + btnClass;
		//console.log(btnClass);
	}
}

//���̾� Show/Hidden ó��
function displayLayer(id, disp, inn) {
	var obj = document.getElementById(id);
	obj.style.display = disp;

	if(inn){
		var obj=document.getElementById(id);
		var temp_value = obj.innerHTML;
		obj.innerHTML=temp_value;
	}
}