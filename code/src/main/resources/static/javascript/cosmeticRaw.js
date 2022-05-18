var this_id=''
var this_column = ''
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
        }
    })
}

$(function () {
    //刷新
    getList();

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
        var url = null;
        var id = this_id
        var pdfName= ""
        console.log(id)
        if ($('#file').val() != '') {
            if ($('#file').val().substr(-4) == '.pdf') {
                var excel = document.getElementById("file").files[0]
                pdfName = excel.name;
                var oFReader = new FileReader();
                oFReader.readAsDataURL(excel);
                oFReader.onloadend = function (oFRevent) {
                    url = oFRevent.target.result;
                    var this_ajax_url
                    if(this_column == '1'){
                        this_ajax_url = '/cosmetic_raw/up1'
                    }else{
                        this_ajax_url = '/cosmetic_raw/up2'
                    }
                    $ajax({
                        type: 'post',
                        url: this_ajax_url,
                        data: {
                            query: url,
                            id:id,
                            pdfName:pdfName
                        },
                    }, false, '', function (res) {
                        $('#file').val('');
                        alert(res.msg);
                        if (res.code == 200) {
                            getList();
                        }
                    })
                }
            } else {
                alert("请选择正确的pdf文件！")
                $('#file').val('');
            }
        }
    })

})

function setTable(data) {
    if ($('#menuSettingsTable').html != '') {
        $('#menuSettingsTable').bootstrapTable('load', data);
    }

    $('#menuSettingsTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: false,
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        columns: [
            {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'brandCode',
                title: '品牌编码',
                align: 'center',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }

            }, {
                field: 'productionPlace',
                title: '产地',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'brandName',
                title: '品牌名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'website',
                title: '官网网址',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    return [
                        "<a href=\"" + value + "\">" + value + "</a>"
                    ].join("")
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'pictureAlbum1',
                title: '目录画册1',
                align: 'left',
                sortable: true,
                width: 200,
                formatter:function(value, row , index){
                    if(value != '' && value != null){
                        value = "<button id=\"pdf_upload\" onclick=\"javascript:pdf_download1(" + row.id + ")\" data-id=\"" + row.id + "\" class=\"btn btn-primary\">\n" +
                            "            <i class=\"bi bi-arrow-up-square\"></i>\n" +
                            "            下载pdf\n" +
                            "        </button>" +
                            "<button id=\"pdf_update1\"  onclick=\"javascript:up1(" + row.id + ")\" data-id=\"" + row.id + "\" class=\"btn btn-primary\" style=\"margin-left: 20px\">\n" +
                            "            <i class=\"bi bi-arrow-up-square\"></i>\n" +
                            "            上传pdf\n" +
                            "        </button>"
                    }else{
                        value = "<button id=\"pdf_update1\" onclick=\"javascript:up1(" + row.id + ")\" data-id=\"" + row.id + "\" class=\"btn btn-primary\" >\n" +
                            "            <i class=\"bi bi-arrow-up-square\"></i>\n" +
                            "            上传pdf\n" +
                            "        </button>"
                    }
                    return value
                }
            }, {
                field: 'pictureAlbum2',
                title: '目录画册2',
                align: 'left',
                sortable: true,
                width: 200,
                formatter:function(value, row , index){
                    if(value != '' && value != null){
                        value = "<button id=\"pdf_upload\" onclick=\"javascript:pdf_download2(" + row.id + ")\"  data-id=\"" + row.id + "\" class=\"btn btn-primary\">\n" +
                        "            <i class=\"bi bi-arrow-up-square\"></i>\n" +
                        "            下载pdf\n" +
                        "        </button>" +
                                "<button id=\"pdf_update2\" onclick=\"javascript:up2(" + row.id + ")\" data-id=\"" + row.id + "\" class=\"btn btn-primary\" style=\"margin-left: 20px\">\n" +
                        "            <i class=\"bi bi-arrow-up-square\"></i>\n" +
                        "            上传pdf\n" +
                        "        </button>"
                    }else{
                        value = "<button id=\"pdf_update2\" onclick=\"javascript:up2(" + row.id + ")\" onclick=\"javascript:up2(" + row.id + ")\" data-id=\"" + row.id + "\" class=\"btn btn-primary\" >\n" +
                            "            <i class=\"bi bi-arrow-up-square\"></i>\n" +
                            "            上传pdf\n" +
                            "        </button>"
                    }
                    return value
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

function goTo(value){
    window.location.href=value
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

