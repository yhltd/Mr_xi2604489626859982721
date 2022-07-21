var this_id='';
var otherId = '';

function getList() {
    var cosmeticRaw = $.session.get('cosmeticRaw');
    $('#add-productionPlace').val($.session.get('cosmeticRaw'))
    $ajax({
        type: 'post',
        url: '/cosmetic_raw/getList',
        data: {
            production_place: cosmeticRaw,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#menuSettingsTable").colResizable({
                liveDrag:true,
                gripInnerHtml:"<div class='grip'></div>",
                draggingClass:"dragging",
                resizeMode:'fit'
            });
        }
    })
}

$(function () {
    //刷新
    getList();

    $("#add-brandCode").focus(function (){
        $ajax({
            type: 'post',
            url: '/cosmetic_raw/getBianma',
        }, false, '', function (res) {
            if (res.code == 200) {
                if (res.data.length>0){
                    var num=res.data[0].brandCode;
                }
                if (res.data.length=0){
                    $("#add-brandCode").val("HOPZ_0001")
                }else{
                    var len=4;
                    num=parseInt(num.split("_")[1],10)+1
                    num=num.toString();
                    while(num.length<len){
                        num="0"+num;
                    }
                    $("#add-brandCode").val("HOPZ_"+num)
                }
            }
        })
    })

    $("#select-btn").click(function () {
        var query=$('#query').val()
        $ajax({
            type: 'post',
            url: '/cosmetic_raw/queryList',
            data:{
                query:query
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    })

    $("#select-btn2").click(function () {
        var query=$('#query').val()
        $ajax({
            type: 'post',
            url: '/cosmetic_raw/preciseQueryList',
            data:{
                query:query
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    })

    $("#refresh-btn").click(function () {
        getList();
    })

    //点击新增按钮显示弹窗
    $("#add-btn").click(function () {
        $('#add-modal').modal('show');
        $("#add-brandCode").val('');
    })

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    })

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form")
        console.log(params)

        $ajax({
            type: 'post',
            url: '/cosmetic_raw/add',
            data: JSON.stringify({
                addUserInfo: params
            }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8'
        }, false, '', function (res) {
            alert(res.msg)
            if(res.code == 200){
                $('#add-form')[0].reset();
                getList();
                $('#add-close-btn').click();
            }
        })
    })

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#menuSettingsTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
    })

    //修改弹窗点击关闭按钮
    $('#update-close-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    })

    //修改弹窗里点击提交按钮
    $('#update-submit-btn').click(function () {
        var msg = confirm("确认要修改吗？")
        if (msg) {
            let params = formToJson('#update-form');
            $ajax({
                type: 'post',
                url: '/cosmetic_raw/update',
                data: {
                    userInfoJson: JSON.stringify(params)
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    $('#update-close-btn').click();
                    $('#update-modal').modal('hide');
                    getList();
                }
            })
        }
    })

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？")
        if (msg) {
            let rows = getTableSelection("#menuSettingsTable");
            if (rows.length == 0) {
                alert('请选择要删除的数据！')
                return;
            }
            let idList = [];
            $.each(rows, function (index, row) {
                idList.push(row.data.id)
            })
            $ajax({
                type: 'post',
                url: '/cosmetic_raw/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    getList();
                }
            })
        }
    })

    //判断文件名改变
    $('#file').change(function () {
        var file = document.getElementById("file").files[0];
        var fileName = "";
        if (typeof (file) != "undefined") {
            fileName = file.name;
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file);
            oFReader.onloadend = function (oFRevent) {
                file = oFRevent.target.result;
                $ajax({
                    type: 'post',
                    url: '/file_table/add',
                    data: {
                        otherId: otherId,
                        files: file,
                        fileName: fileName,
                        type:'原料品牌',
                    },
                    async : false,
                }, false, '', function (res) {
                    alert(res.msg)
                    fileShow(otherId);
                })
            }
        }
    })

    $('#file-up-btn').click(function () {
        // $('#file').trigger('click');

        var file = document.getElementById("file-1").files
        if(file.length == 0){
            alert('未选择上传文件');
            return;
        }
        var fileName_list = []
        var fileName_num = -1
        for(var i = 0 ; i < file.length;i++){
            var this_file = file[i];
            var fileName = "";
            var obj={};

            if (typeof (this_file) != "undefined") {
                fileName = this_file.name;
                fileName_list.push(
                    fileName
                )
                console.log(fileName_list)
                var oFReader = new FileReader();
                oFReader.readAsDataURL(this_file);
                oFReader.onloadend = function (oFRevent) {
                    this_file = oFRevent.target.result;
                    fileName_num = fileName_num + 1
                    //jsonStr={fileName:fileName_list[fileName_num]};
                    obj={
                        "otherId":otherId,
                        "type":'原料品牌',
                        "fileName": fileName_list[fileName_num],
                        "files": this_file,
                    }

                    $ajax({
                        type: 'post',
                        url: '/file_table/add',
                        data: JSON.stringify({
                            addInfo: obj
                        }),
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        async : true,
                        xhr:function(){
                            var myXhr = $.ajaxSettings.xhr();
                            if(myXhr.upload){ //检查上传的文件是否存在
                                myXhr.upload.addEventListener('progress',function(e){
                                    var loaded = e.loaded; //已经上传大小情况
                                    var total = e.total; //附件总大小
                                    var percent = Math.floor(100*loaded/total)+"%"; //已经上传的百分比
                                    //console.log("已经上传了："+percent);
                                    //显示进度条
                                    $("#content").css("width",percent).css("height",20).css("backgroundColor","#33CCFF").css("color","white").html("<b>"+percent+"</b>");
                                }, false); // for handling the progress of the upload
                            }
                            return myXhr;
                        },
                    }, false, '', function (res) {
                        fileShow(otherId);
                        $("#content").css("width",0).css("height",0).css("margin-top",0).css("backgroundColor","").text("");
                        // fileName_num = fileName_num + 1
                        if (fileName_num == i){
                            alert(res.msg);
                        }
                    })
                }
            }
        }

        // var file = document.getElementById("file").files[0];
        // var fileName = "";
        // if (typeof (file) != "undefined") {
        //     fileName = file.name;
        //     var oFReader = new FileReader();
        //     oFReader.readAsDataURL(file);
        //     oFReader.onloadend = function (oFRevent) {
        //         file = oFRevent.target.result;
        //         $ajax({
        //             type: 'post',
        //             url: '/file_table/add',
        //             data: {
        //                 otherId: otherId,
        //                 files: file,
        //                 fileName: fileName,
        //                 type:'原料品牌',
        //             },
        //             async : false,
        //         }, false, '', function (res) {
        //             alert(res.msg)
        //             fileShow(otherId);
        //         })
        //     }
        // }
    })

    $('#file-down-btn').click(function () {
        let rows = getTableSelection('#show-table-file')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一个文件下载');
            return;
        }
        $ajax({
            type: 'post',
            url: '/file_table/getFile',
            data: {
                id: rows[0].data.id,
            },
            async : false,
        }, false, '', function (res) {
            if (res.data[0].fileName != '' && res.data[0].fileName != null) {
                downloadFileByBase64(res.data[0].fileName, res.data[0].files.split(',')[1])
            }
        })
    })

    $('#file-yulan-btn').click(function () {
        let rows = getTableSelection('#show-table-file')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一个文件预览');
            return;
        }
        if(rows[0].data.fileName.split(".")[1]!='pdf'){
            alert('请选择pdf文件');
            return;
        }
        $ajax({
            type: 'post',
            url: '/file_table/getFile',
            data: {
                id: rows[0].data.id,
            },
            async : true,
            xhr:function(){
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){ //检查上传的文件是否存在
                    myXhr.upload.addEventListener('progress',function(e){
                        var loaded = e.loaded; //已经上传大小情况
                        var total = e.total; //附件总大小
                        var percent = Math.floor(100*loaded/total)+"%"; //已经上传的百分比
                        //console.log("已经上传了："+percent);
                        //显示进度条
                        $("#content").css("width",percent).css("height",20).css("backgroundColor","#33CCFF").css("color","white").html("<b>"+percent+"</b>");
                    }, false); // for handling the progress of the upload
                }
                return myXhr;
            },
        }, false, '', function (res) {
            if (res.data[0].fileName != '' && res.data[0].fileName != null) {
                const blob = this.base64ToBlob(res.data[0].files.split(',')[1]);
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob)
                } else {
                    const fileURL = URL.createObjectURL(blob)
                    window.open(fileURL)
                }
            }
            $("#content").css("width",0).css("height",0).css("margin-top",0).css("backgroundColor","").text("");
        })
    })

    $('#file-delete-btn').click(function () {
        var msg = confirm("确认要删除吗？")
        if (msg) {
            let rows = getTableSelection("#show-table-file");
            if (rows.length == 0) {
                alert('请选择要删除的数据！')
                return;
            }
            let idList = [];
            $.each(rows, function (index, row) {
                idList.push(row.data.id)
            })
            $ajax({
                type: 'post',
                url: '/file_table/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    fileShow(otherId);
                }
            })
        }
    })

    $('#file-close-btn').click(function () {
        $('#show-file-modal').modal('hide');
    })

})

function setTable(data) {
    if ($('#menuSettingsTable').html != '') {
        $('#menuSettingsTable').bootstrapTable('load', data);
    }

    $('#menuSettingsTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover table table-bordered',
        idField: 'id',
        pagination: false,
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        columns: [
            {
                field: '',
                title: '序号',
                align: 'center',
                width: 40,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'brandCode',
                title: '品牌编码',
                align: 'center',
                sortable: true,
                width: 80,
                formatter:function(value, row , index){
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }

            }, {
                field: 'productionPlace',
                title: '产地',
                align: 'center',
                sortable: true,
                width: 80,
                formatter:function(value, row , index){
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'brandName',
                title: '品牌名称',
                align: 'center',
                sortable: true,
                width: 130,
                formatter:function(value, row , index){
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'website',
                title: '官网网址',
                align: 'center',
                sortable: true,
                width: 130,
                formatter:function(value, row , index){
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:goTo("+ row.id +")'>"+ value +"</span></div>";
                }
            }, {
                field: 'company',
                title: '公司',
                align: 'center',
                sortable: true,
                width: 160,
                formatter:function(value, row , index){
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: '',
                title: '目录画册',
                align: 'center',
                sortable: true,
                width: 120,
                formatter:function(value, row , index){
                    return '<button onclick="javascript:fileShow(' + row.id + ')" class="btn-xs btn-primary">&nbsp;查看</button>'
                }
            }
        ],
        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected')
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}


function fileShow(id) {
    $ajax({
        type: 'post',
        url: '/file_table/getList',
        data:{
            otherId:id,
            type:"原料品牌",
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setShowFileTable(res.data);
            $('#show-file-modal').modal('show');
            otherId=id;
        }else{
            return;
        }
        console.log(res)
    })
}

function goTo(id){
    if ($('#'+id).text()!='' && $('#'+id).text()!=null){
        if($('#'+id).text().slice(0,4)!="http"){
            window.open('//'+$('#'+id).text(),"_blank"); //$('#'+id).text();
        }else{
            window.open($('#'+id).text(),"_blank");
        }
    }
}

function up1(value){
    this_id = value
    this_column = '1'
    $('#file').trigger('click');
}

function up2(value){
    this_id = value
    this_column = '2'
    $('#file').trigger('click');
}

function pdf_download1(id){
    $ajax({
        type: 'post',
        url: '/cosmetic_raw/getFile',
        data: {
            id:id,
        },
    }, false, '', function (res) {
        if(res.data[0].pictureAlbum1!='' && res.data[0].pictureAlbum1!=null){
            //var file=res.data[0].pdf2Name+getBase64Type(res.data[0].pdf1.split(',')[0]);
            downloadFileByBase64(res.data[0].pictureAlbum1Name,res.data[0].pictureAlbum1.split(',')[1])
        }
    })
}

function pdf_download2(id){
    $ajax({
        type: 'post',
        url: '/cosmetic_raw/getFile',
        data: {
            id:id,
        },
    }, false, '', function (res) {
        if(res.data[0].pictureAlbum2!='' && res.data[0].pictureAlbum2!=null){
            //var file=res.data[0].pdf2Name+getBase64Type(res.data[0].pdf1.split(',')[0]);
            downloadFileByBase64(res.data[0].pictureAlbum2Name,res.data[0].pictureAlbum2.split(',')[1])
        }
    })
}

function dataURLtoBlob(dataurl,name) {//name:文件名
    var mime = name.substring(name.lastIndexOf('.')+1)//后缀名
    var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
function downloadFile(url,name='默认文件名'){
    var a = document.createElement("a")//创建a标签触发点击下载
    a.setAttribute("href",url)//附上
    a.setAttribute("download",name)
    a.setAttribute("target","_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}
//主函数
function downloadFileByBase64(name,base64){
    var myBlob = dataURLtoBlob(base64,name)
    var myUrl = URL.createObjectURL(myBlob)
    downloadFile(myUrl,name)
}

//获取后缀
function getType(file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1 + 1, index2);
    return type;
}

//根据文件后缀 获取base64前缀不同
function getBase64Type(type) {
    switch (type) {
        case 'data:text/plain;base64':
            return 'txt';
        case 'data:application/msword;base64':
            return 'doc';
        case 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64':
            return 'docx';
        case 'data:application/vnd.ms-excel;base64':
            return 'xls';
        case 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64':
            return 'xlsx';
        case 'data:application/pdf;base64':
            return 'pdf';
        case 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64':
            return 'pptx';
        case 'data:application/vnd.ms-powerpoint;base64':
            return 'ppt';
        case 'data:image/png;base64':
            return 'png';
        case 'data:image/jpeg;base64':
            return 'jpg';
        case 'data:image/gif;base64':
            return 'gif';
        case 'data:image/svg+xml;base64':
            return 'svg';
        case 'data:image/x-icon;base64':
            return 'ico';
        case 'data:image/bmp;base64':
            return 'bmp';
    }
}

function base64ToBlob(code) {
    code = code.replace(/[\n\r]/g, '');
    const raw = window.atob(code);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: 'application/pdf' })
}

function setShowFileTable(data) {
    console.log(data)
    if ($('#show-table-file').html() != '') {
        $('#show-table-file').bootstrapTable('load', data);
        return;
    }
    $('#show-table-file').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        locale: 'zh-CN',
        columns: [
            {
                field: 'id',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'fileName',
                title: '文件名',
                align: 'left',
                sortable: true,
                width: 100
            }
        ],
        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected')
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}