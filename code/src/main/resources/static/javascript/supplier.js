let file_id='';
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
        }
    })
}

$(function () {
    //刷新
    getList();

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
        var pdf =document.getElementById("file1").files[0];
        var pdfName="";
        if (typeof(pdf)!="undefined"){
            pdfName=pdf.name;
            var oFReader= new FileReader();
            oFReader.readAsDataURL(pdf);
            oFReader.onloadend = function (oFRevent) {
                pdf = oFRevent.target.result;
                $ajax({
                    type: 'post',
                    url: '/supplier/upfile1',
                    data: {
                        id:file_id,
                        pdf: pdf,
                        pdfName:pdfName,
                    },
                }, false, '', function (res) {
                    alert(res.msg)
                })
            }
        }
    })

    $('#file2').change(function () {
        var pdf =document.getElementById("file2").files[0];
        var pdfName="";
        if (typeof(pdf)!="undefined"){
            pdfName=pdf.name;
            var oFReader= new FileReader();
            oFReader.readAsDataURL(pdf);
            oFReader.onloadend = function (oFRevent) {
                pdf = oFRevent.target.result;
                $ajax({
                    type: 'post',
                    url: '/supplier/upfile2',
                    data: {
                        id:file_id,
                        pdf: pdf,
                        pdfName:pdfName,
                    },
                }, false, '', function (res) {
                    alert(res.msg)
                })
            }
        }
    })
})

function setTable(data) {
    if ($('#supplierTable').html != '') {
        $('#supplierTable').bootstrapTable('load', data);
    }

    $('#supplierTable').bootstrapTable({
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
                field: 'supplierCode',
                title: '供应商编码',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'type',
                title: '供应商分类',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'abbreviation',
                title: '供应商简称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'supplierName',
                title: '供应商名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'url',
                title: '公司官网',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'pdf1',
                title: '目录画册',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:up1(' + row.id + ')" class="btn btn-primary">上传</button> <button onclick="javascript:down1(' + row.id + ')" class="btn btn-primary">下载</button><input onclick="javascript:change1(' + row.id + ')" type="file" id="Afile'+ row.id +'" hidden="hidden"/>'
                    //return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'pdf2',
                title: '目录画册',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:up2(' + row.id + ')" class="btn btn-primary">上传</button> <button onclick="javascript:down2(' + row.id + ')" class="btn btn-primary">下载</button>'
                    //return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'brand',
                title: '经营品牌',
                align: 'left',
                sortable: true,
                width: 100,
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



function up1(id) {
    file_id=id;
    $('#file1').trigger('click');
}
function up2(id) {
    file_id=id;
    $('#file2').trigger('click');
}

function down1(id) {
    $ajax({
        type: 'post',
        url: '/supplier/getFile',
        data: {
            id:id,
        },
    }, false, '', function (res) {
        if(res.data[0].pdf1!='' && res.data[0].pdf1!=null){
            //var file=res.data[0].pdf2Name+getBase64Type(res.data[0].pdf1.split(',')[0]);
            downloadFileByBase64(res.data[0].pdf1Name,res.data[0].pdf1.split(',')[1])
        }
    })
}

function down2(id) {
    $ajax({
        type: 'post',
        url: '/supplier/getFile',
        data: {
            id:id,
        },
    }, false, '', function (res) {
        if(res.data[0].pdf2!='' && res.data[0].pdf2!=null){
            //var file=res.data[0].pdf2Name+getBase64Type(res.data[0].pdf2.split(',')[0]);
            downloadFileByBase64(res.data[0].pdf2Name,res.data[0].pdf2.split(',')[1])
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