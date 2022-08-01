let file_id = '';
let otherId='';

function getList() {
    var supplier = $.session.get('supplier');
    $('#add-type').val($.session.get('supplier'))
    $ajax({
        type: 'post',
        url: '/supplier/getList',
        data: {
            supplier: supplier,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#supplierTable").colResizable({
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

    $("#add-supplierCode").focus(function (){
        $ajax({
            type: 'post',
            url: '/supplier/getBianma',
        }, false, '', function (res) {
            if (res.code == 200) {
                if (res.data.length>0){
                    var num=res.data[0].supplierCode;
                }
                if (res.data.length=0){
                    $("#add-supplierCode").val("HOYL_0001")
                }else{
                    var len=4;
                    num=parseInt(num.split("_")[1],10)+1
                    num=num.toString();
                    while(num.length<len){
                        num="0"+num;
                    }
                    $("#add-supplierCode").val("HOYL_"+num)
                }
            }
        })
    })

    $("#select-btn").click(function () {
        var supplier = $.session.get('supplier');
        var query = $('#query').val()
        $ajax({
            type: 'post',
            url: '/supplier/queryList',
            data: {
                supplier: supplier,
                query: query
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                $('#add-type').val(supplier)
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
    })

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    })

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        var supplierCode = $('#add-supplierCode').val();
        var type = $('#add-type').val();
        var abbreviation = $('#add-abbreviation').val();
        var supplierName = $('#add-supplierName').val();
        var url = $('#add-url').val();
        var company=$('#add-company').val();
        var pdf1 = "";
        var pdf2 = "";
        $ajax({
            type: 'post',
            url: '/supplier/add',
            data: {
                supplierCode: supplierCode,
                type: type,
                abbreviation: abbreviation,
                supplierName: supplierName,
                url: url,
                pdf1: pdf1,
                pdf2: pdf2,
                company:company,
            },
        }, false, '', function (res) {
            alert(res.msg)
            if (res.code == 200) {
                $('#add-form')[0].reset();
                $('#add-type').val($.session.get('supplier'))
                getList();
                $('#add-close-btn').click();
            }
        })
    })

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#supplierTable')
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
                url: '/supplier/update',
                data: {
                    updateJson: JSON.stringify(params)
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
            let rows = getTableSelection("#supplierTable");
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
                url: '/supplier/delete',
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

    $('#file1').change(function () {
        var file = document.getElementById("file1").files[0];
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
                        type:'供应商',
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
        // $('#file1').trigger('click');

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
                    obj={
                        "otherId":otherId,
                        "type":'供应商',
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

        // var file = document.getElementById("file1").files[0];
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
        //                 type:'供应商',
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
                        var percent = Math.floor(100)+"%"; //已经上传的百分比

                        //console.log("已经上传了："+percent);
                        //显示进度条
                        $("#content").css("width",percent).css("height",20).css("backgroundColor","#33CCFF").css("color","white").html("<b>"+percent+"</b>");
                    }, false); // for handling the progress of the upload
                }
                return myXhr;
            },
        }, false, '', function (res) {
            if (res.data[0].fileName != '' && res.data[0].fileName != null) {
                //显示进度条
                // var percent2=Math.floor(100)+"%";
                // $("#content").css("width",percent2).css("height",20).css("backgroundColor","#33CCFF").css("color","white").html("<b>"+percent2+"</b>");

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
    if ($('#supplierTable').html != '') {
        $('#supplierTable').bootstrapTable('load', data);
    }

    $('#supplierTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover table-bordered',
        idField: 'id',
        pagination: true,
        pageSize : 15,//单页记录数
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
                field: 'supplierCode',
                title: '供应商编码',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }
            // , {
            //     field: 'company',
            //     title: '公司',
            //     align: 'center',
            //     sortable: true,
            //     width: 100,
            //     formatter: function (value, row, index) {
            //         return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
            //     }
            // }
            , {
                field: 'type',
                title: '供应商分类',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'abbreviation',
                title: '供应商简称',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'supplierName',
                title: '供应商名称',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'url',
                title: '公司官网',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    //return '<span id="'+ row.id +'" onclick="javascript:jump('+ row.id +')">' + value + '</span>'
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:jump("+ row.id +")'>"+ value +"</span></div>";
                }
            }, {
                field: '',
                title: '目录画册',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:fileShow(' + row.id + ')" class="btn-xs btn-primary">&nbsp;查看</button> '
                }
            },{
                field: 'brand',
                title: '经营品牌',
                align: 'center',
                sortable: true,
                width: 280,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
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
            type:"供应商",
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

function jump(id) {
    if ($('#'+id).text()!='' && $('#'+id).text()!=null){
        if($('#'+id).text().slice(0,4)!="http"){
            window.open('//'+$('#'+id).text(),"_blank"); //$('#'+id).text();
        }else{
            window.open($('#'+id).text(),"_blank");
        }
    }
}

function dataURLtoBlob(dataurl, name) {//name:文件名
    var mime = name.substring(name.lastIndexOf('.') + 1)//后缀名
    var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function downloadFile(url, name = '默认文件名') {
    var a = document.createElement("a")//创建a标签触发点击下载
    a.setAttribute("href", url)//附上
    a.setAttribute("download", name)
    a.setAttribute("target", "_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}

//主函数
function downloadFileByBase64(name, base64) {
    var myBlob = dataURLtoBlob(base64, name)
    var myUrl = URL.createObjectURL(myBlob)
    downloadFile(myUrl, name)
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

// function convertDataURIToBinary(dataURI){
//     dataURI=dataURI.replace(/[\r\n]/g,'');
//     var raw=window.atob(dataURI);
//     var rawLength=raw.length;
//     var array=new Uint8Array(new ArrayBuffer(rawLength));
//     for(var i=0;i< rawLength;i++){
//         array[i]=raw.charCodeAt(i);
//     }
//     return array;
// }
//
// function showall(url,page,id){
//     PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf){
//         console.log(pdf.numPages);
//         pdf.getPage(page).then(function getPageHelloWorld(page){
//             var scale=1.0;
//             var viewport=page.getViewport(scale);
//             var canvas=document.getElementById(id);
//             var context=canvas.getContext('2d');
//             canvas.height=viewport.height;
//             canvas.width=viewport.width;
//             var renderContext={
//                 canvasContext:context,
//                 viewport:viewport,
//             }
//             page.render(renderContext);
//         })
//     })
// }

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