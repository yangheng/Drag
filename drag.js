
(function(window,document,img){
    'use strict';
    var oDrapWrap=document.body;

    var dragLeaveHander=function(ev){
        ev.preventDefault();
    }
    //拖进
    oDrapWrap.addEventListener('dragenter',function(e){

        e.preventDefault();

    },false);
    //脱离
    oDrapWrap.addEventListener('dragleave',dragLeaveHander,false);
    //
    oDrapWrap.addEventListener('dragover',function(e){
        e.preventDefault();
    },false);
    //
    oDrapWrap.addEventListener('drop',function(e){
        dropHander(e);
    },false);
    var dropHander=function(ev){
        ev.preventDefault();
        var fileList=ev.dataTransfer.files,
            filenum=fileList.length;
        if(filenum==0){
            return;
        }
        if(fileList[0].type.indexOf('image')===-1){
            return;
        }
        window.console.log(filenum)
        if(window.URL.createObjectURL){
            img.setAttribute('src',window.URL.createObjectURL(fileList[0]))
            img.onload = function(e) {
                window.URL.revokeObjectURL(this.src);
            }
        }else{
            if(window.webkitURL.createObjectURL){
                img.setAttribute('src',window.URL.createObjectURL(fileList[0]))
                img.onload = function(e) {
                    window.webkitURL.revokeObjectURL(this.src);
                }
            }else{
                var reader=new FileReader();
                reader.readAsDataURL(fileList[0]);
                reader.onload=function(e){
                    var that=this;
                    code=that.result;
                    img.setAttribute('src',that.result);
                }
            }
        }

    }
    //防止默认操作
})(window,document,$('img')[0])