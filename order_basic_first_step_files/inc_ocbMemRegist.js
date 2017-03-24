
var popOcbRegistAgr = {
    id : null,
    conScroll : null,
    memType : null,
    callback : null,
    pathTypCd : "00",
    handled : false,
    open : function() {
        var args = arguments;

        this.checkOcbMemTypeAjax();
        mwUI.layerPop(args[0], null, null, 'no');
        this.id = args[0];
        this.callback = args[1];
        switch(args.length){
            case 3 :
                this.pathTypCd = args[2];
                console.log(args[2]);
                break;
        }

    },
    checkOcbMemTypeAjax : function(){
        jQuery.ajax({
            url: 'https://m.11st.co.kr/MW/Member/checkOcbMemType.tmall',
            async: false,
            dataType: 'jsonp',
            jsonp : 'callback',
            success: function(res) {

                if(res.result === 'SUCCESS'){
                    popOcbRegistAgr.memType = res.memType;
                    popOcbRegistAgr.viewMemTypeText();
                } else {
                    alert("�ؿܼ���, ����11����(�̸�������,�ܱ��ε�Ϲ�ȣ) ȸ���� OKĳ���� ����� �Ұ��մϴ�.");
                    popOcbRegistAgr.close('popOkagree');
                    return;
                }

            }
        });
    },
    register : function(id){

        if(this.handled == false){

            this.handled = true;

            jQuery.ajax({
                url: 'https://m.11st.co.kr/MW/Member/registOcbMember.tmall',
                async:false,
                data: {'pathTypCd':this.pathTypCd},
                dataType: 'jsonp',
                jsonp : 'callback',
                success: function(res) {
                    if(res.result === 'SUCCESS'){
                        alert("OKĳ���� ����� �Ϸ�Ǿ� OKĳ���� �� ���������� ����/����� �����մϴ�.�ڼ��� ������ ����11����>OKĳ������ Ȯ�����ּ���.");
                        if(typeof popOcbRegistAgr.callback === 'function'){
                            popOcbRegistAgr.callback();
                        }

                    }else{
                        alert(res.resultMsg);
                    }

                },
                error : function(request, status, error ){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    alert("�ý��� ������ �����Ͽ����ϴ�. ��� �� �ٽ� �õ����ֽñ� �ٶ��ϴ�.")
                },
                complete : function(){
                    popOcbRegistAgr.handled = false;
                    popOcbRegistAgr.close(id);
                }

            });

        }


    },
    viewMemTypeText : function(){

        var revType = (this.memType === 'PRIVATE') ? 'ENTERPRISE' : 'PRIVATE';

        var memTypediv = $('#okmemType_'+this.memType);
        var revTypediv = $('#okmemType_'+revType);

        memTypediv.show();
        revTypediv.hide();

        var memPrivateAgreeText = $('#okagree02');
        if(this.memType === 'PRIVATE') {
            memPrivateAgreeText.show();
        } else {
            memPrivateAgreeText.hide();
        }

    },
    close : function(id) {
        this.agrClose();
        mwUI.layerPopClose(id);
    },
    toggle : function(low_id) {
        var $self = $('#' + low_id),
            con_id = $self.find('.law_con').attr('id'),
            iScrollOption = {
                scrollY: true,
                scrollbars: true,
                preventDefaultException: {tagName:/.*/},
                tab: true
            };

        if($self.hasClass('open') !== true){
            this.agrClose();

            //�ش�������
            $self.addClass('open');
            $self.find('.btn_v').text('�����ݱ�'); // ���� 2016-12-23
            this.conScroll = new IScroll('#' + con_id, iScrollOption);
            mwUI.posCenter(this.id);
        } else{
            $self.removeClass('open');
            $self.find('.btn_v').text('��������'); // ���� 2016-12-23
            this.conScroll.destroy();
            this.conScroll = null;
            mwUI.posCenter(this.id);
        }
    },
    agrClose : function() {
        //���µ� ��� �ݱ�
        $('#' + this.id).find('.law.open').removeClass('open').find('.btn_v').text('��������'); // ���� 2016-12-23
        if(this.conScroll != null){
            this.conScroll.destroy();
            this.conScroll = null;
        }
    },
    agrTab : function(self) {
        mwUI.tabClick(self);
        this.conScroll.refresh();
    }
}
