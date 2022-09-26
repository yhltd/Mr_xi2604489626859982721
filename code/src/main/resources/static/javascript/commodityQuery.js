function getList() {
    $ajax({
        type: 'post',
        url: '/commodity/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            //$("#queryTable").bootstrapTable('hideColumn', 'userId');
            $('#queryTable').colResizable({
                liveDrag:true,
                gripInnerHtml:"<div class='grip'></div>",
                draggingClass:"dragging",
                resizeMode:'fit'
            });
        }
    })
}

function getInci(id) {
    $ajax({
        type: 'post',
        url: '/commodity_inci/getListById',
        data: {
            id: id,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setInciTable(res.data);
            $('#show-inci-modal').modal('show');
            //$("#queryTable").bootstrapTable('hideColumn', 'userId');
        }
    })
}

function getPrice(id) {
    $ajax({
        type: 'post',
        url: '/commodity_price/getListById',
        data: {
            id: id,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setPriceTable(res.data);
            $('#show-price-modal').modal('show');
        }
    })
}

$(function () {
    //刷新
    getList();

    $('#select-btn').click(function () {
        var priceMax=$('#priceMax').val();
        var priceMin=$('#priceMin').val();
        var contentMax=$('#contentMax').val();
        var contentMin=$('#contentMin').val();
        var column1=$('#column1').val();
        var condition1=$('#condition1').val();
        var column2=$('#column2').val();
        var condition2=$('#condition2').val();
        var column3=$('#column3').val();
        var condition3=$('#condition3').val();
        var column4=$('#column4').val();
        var condition4=$('#condition4').val();
        var column5=$('#column5').val();
        var condition5=$('#condition5').val();
        var column6=$('#column6').text();
        var condition6=$('#condition6').val();
        if (condition6==""){
            column6="";
        }else{
            column6="pdf1_name`人体功效";
            condition6="人体功效"
        }
        if(priceMax==""){
            priceMax="1000000";
        }
        if(priceMin==""){
            priceMin="-1000000";
        }
        if(contentMax==""){
            contentMax="1000000";
        }
        if(contentMin==""){
            contentMin="-1000000";
        }

        $ajax({
            type: 'post',
            url: '/commodity/query',
            data:{
                priceMax:priceMax,
                priceMin:priceMin,
                contentMax:contentMax,
                contentMin:contentMin,
                column1:column1,
                condition1:condition1,
                column2:column2,
                condition2:condition2,
                column3:column3,
                condition3:condition3,
                column4:column4,
                condition4:condition4,
                column5:column5,
                condition5:condition5,
                column6:column6,
                condition6:condition6,
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    })

    //成本信息关闭按钮
    $("#price-submit-btn").click(function () {
        $('#show-price-modal').modal('hide');
    })

    //INCI信息关闭按钮
    $("#inci-submit-btn").click(function () {
        $('#show-inci-modal').modal('hide');
    })

    //刷新
    $('#refresh-btn').click(function () {
        getList();
    })


    $('#file-up-btn').click(function () {
        // $('#upload-file').trigger('click');
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
                        "type":'原料商品',
                        "fileName": fileName_list[fileName_num],
                        "files": this_file,
                    }
                    $ajax({
                        type: 'post',
                        url: '/file_table/add',
                        data: JSON.stringify({
                            addInfo: obj
                        }),
                        async : true,
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
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


    //判断文件名改变
    $('#upload-file').change(function () {
        var file = document.getElementById("upload-file").files[0];
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
                        type:'原料商品',
                    },
                    async : false,
                }, false, '', function (res) {
                    alert(res.msg)
                    fileShow(otherId);
                })
            }
        }
    })

    //详情弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    })

})

function fileShow(id) {
    $ajax({
        type: 'post',
        url: '/file_table/getList',
        data:{
            otherId:id,
            type:"原料商品",
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


function setTable(data) {
    if ($('#queryTable').html != '') {
        $('#queryTable').bootstrapTable('load', data);
    }

    $('#queryTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover table table-bordered',
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
                field: 'id',
                title: '序号',
                align: 'center',
                width: 75,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'rawCode',
                title: '原料编码',
                align: 'center',
                width: 75,
                formatter: function (value, row, index) {
                    if (row.rawCode != null && row.rawCode != '') {
                        if(row.pdf1 != null && row.pdf1 != ''){
                            return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;color: red;font-weight: bold;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                        }else{
                            return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                        }
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            }, {
                field: 'goodsName',
                title: '商品名称',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.goodsName != null && row.goodsName != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            }, {
                field: 'rawSubmissionCode',
                title: '原料报送码',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.rawSubmissionCode != null && row.rawSubmissionCode != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            }, {
                field: 'productionPlace',
                title: '产地',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.productionPlace != null && row.productionPlace != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            }, {
                field: 'brandName',
                title: '品牌名称',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.brandName != null && row.brandName != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            }, {
                field: 'inciPin',
                title: 'INCI成分信息',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    // return '<button onclick="javascript:getInci(' + row.id + ')" class="btn btn-primary">查看</button>'
                    if (row.inciPin != null && row.inciPin != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:getInci("+ row.id +")'>"+ value +"</span></div>";
                    }else{
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:getInci("+ row.id +")'>"+ "-" +"</span></div>";
                    }

                }
            }, {
                field: 'chengbenPin',
                title: '原料成本信息',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    // return '<button onclick="javascript:getPrice(' + row.id + ')" class="btn btn-primary">查看</button>'
                    if (row.chengbenPin != null && row.chengbenPin != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:getPrice("+ row.id +")'>"+ value +"</span></div>";
                    }else{
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:getPrice("+ row.id +")'>"+ "-" +"</span></div>";
                    }

                }
            }, {
                field: 'addAmount',
                title: '建议添加量',
                align: 'center',
                sortable: true,
                width: 120,
                formatter: function (value, row, index) {
                    if (row.addAmount != null && row.addAmount != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            }, {
                field: 'abbreviation',
                title: '供应商简称',
                align: 'center',
                sortable: true,
                width: 120,
                formatter: function (value, row, index) {
                    if (row.abbreviation != null && row.abbreviation != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            }, {
                field: 'supplierName',
                title: '供应商公司名称',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (row.supplierName != null && row.supplierName != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
                    }
                }
            },
            // {
            //     field: 'solubility',
            //     title: '溶解性',
            //     align: 'center',
            //     sortable: true,
            //     width: 100,
            //     formatter: function (value, row, index) {
            //         if (row.solubility != null && row.solubility != '') {
            //             return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
            //         } else {
            //             return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
            //         }
            //     }
            // }, {
            //     field: 'appearance',
            //     title: '外观',
            //     align: 'center',
            //     sortable: true,
            //     width: 100,
            //     formatter: function (value, row, index) {
            //         if (row.appearance != null && row.appearance != '') {
            //             return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
            //         } else {
            //             return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
            //         }
            //     }
            // }, {
            //     field: 'smell',
            //     title: '气味',
            //     align: 'center',
            //     sortable: true,
            //     width: 100,
            //     formatter: function (value, row, index) {
            //         if (row.smell != null && row.smell != '') {
            //             return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
            //         } else {
            //             return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>-</div>";
            //         }
            //     }
            // },
            {
                field: 'substanceLabel',
                title: '物质标签',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.substanceLabel != null && row.substanceLabel != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>" + value + "</span></div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>-</span></div>";
                    }
                }
            },{
                field: 'solubility',
                title: '物理形态',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.substanceLabel != null && row.substanceLabel != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>" + value + "</span></div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>-</span></div>";
                    }
                }
            }, {
                field: 'efficacyLabel',
                title: '功效标签',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.efficacyLabel != null && row.efficacyLabel != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>" + value + "</span></div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>-</span></div>";
                    }
                }
            }, {
                field: 'rawLabel',
                title: '原料标签',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.rawLabel != null && row.rawLabel != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>" + value + "</span></div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>-</span></div>";
                    }
                }
            }, {
                field: 'patent',
                title: '专利信息',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (row.patent != null && row.patent != '') {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>" + value + "</span></div>";
                    } else {
                        return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span style='width:100%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;'>-</span></div>";
                    }
                }
            }, {
                field: 'performance',
                title: '产品性能',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    console.log(value)
                    var reg = new RegExp("<br><br>","g")
                    let this_value = value.replace(reg,"<br>")
                    console.log(this_value)
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:xiangqingShow1("+ index +")'>"+ this_value +"</span></div>";
                }
            }, {
                field: 'taboo',
                title: '配伍禁忌',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    console.log(value)
                    var reg = new RegExp("<br><br>","g")
                    let this_value = value.replace(reg,"<br>")
                    console.log(this_value)
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='"+ row.id +"' style='text-decoration:underline;' onclick='javascript:xiangqingShow2("+ index +")'>"+ this_value +"</span></div>";
                }
            }
            // , {
            //     field: '',
            //     title: '原料画册',
            //     align: 'center',
            //     sortable: true,
            //     width: 150,
            //     formatter: function (value, row, index) {
            //         if (row.pdf1Name == null || row.pdf1Name == '') {
            //             return ''
            //         } else {
            //             return '<button onclick="javascript:download1(' + row.id + ')" class="btn btn-primary">下载</button>'
            //         }
            //     }
            // }
            , {
                field: '',
                title: '原料画册',
                align: 'center',
                sortable: true,
                width: 120,
                formatter:function(value, row , index){
                    return '<button onclick="javascript:fileShow(' + row.id + ')" class="btn-xs btn-primary">&nbsp;查看</button> '
                }
            }
        ],
    })
}

function xiangqingShow1(index){

    let this_text = ""
    let rows = get_table_list("#queryTable");
    console.log(rows)
    for(let i=0;i<rows.length;i++){
        if(rows[i].index == index){
            this_text = rows[i].data.performance
            var reg = new RegExp("<br><br>","g")
            this_text = this_text.replace(reg,"\n")
            break;
        }
    }


    console.log(this_text)
    $('#add-textBox').val(this_text)

    $('#add-modal').modal('show');


}

function xiangqingShow2(index){

    let this_text = ""
    let rows = get_table_list("#queryTable");
    console.log(rows)
    for(let i=0;i<rows.length;i++){
        if(rows[i].index == index){
            this_text = rows[i].data.taboo
            var reg = new RegExp("<br><br>","g")
            this_text = this_text.replace(reg,"\n")
            break;
        }
    }
    console.log(this_text)
    $('#add-textBox').val(this_text)

    $('#add-modal').modal('show');


}

function get_table_list(tableEl){
    let result = [];
    let tableData = $(tableEl).bootstrapTable('getData');
    $(tableEl + ' tr').each(function (i, tr) {
        let index = $(tr).data('index');
        if (index != undefined)  {
            result.push({
                index: index,
                data: tableData[index]
            })
        }
    })
    return result;
}

function setInciTable(data) {
    console.log(data)
    if ($('#show-table-inci').html() != '') {
        $('#show-table-inci').bootstrapTable('load', data);
        return;
    }
    $('#show-table-inci').bootstrapTable({
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
                field: 'serialNumber',
                title: '序号',
                align: 'center',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'chineseName',
                title: 'INCI名称/中文名称',
                align: 'left',
                sortable: true,
                width: 200,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'englishName',
                title: 'INCI名称/英文名称',
                align: 'left',
                sortable: true,
                width: 200,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'rinsingProducts',
                title: '淋洗类产品最高历史使用量（%）',
                align: 'left',
                sortable: true,
                width: 200,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'residentProducts',
                title: '驻留类产品最高历史使用量（%）',
                align: 'left',
                sortable: true,
                width: 200,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'rawRemarks',
                title: '原料目录备注',
                align: 'left',
                sortable: true,
                width: 130,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'purpose',
                title: '主要使用目的',
                align: 'left',
                sortable: true,
                width: 130,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'riskSubstance',
                title: '是否可能存在安全性风险物质',
                align: 'left',
                sortable: true,
                width: 200,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'safetyRisk',
                title: '安全风险',
                align: 'left',
                sortable: true,
                width: 130,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }
        ],
    })
}

function setPriceTable(data) {
    console.log(data)
    if ($('#show-table-price').html() != '') {
        $('#show-table-price').bootstrapTable('load', data);
        return;
    }
    $('#show-table-price').bootstrapTable({
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
                field: 'unit',
                title: '包装规格/kg',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'price',
                title: '成本/元',
                align: 'left',
                sortable: true,
                width: 100,
            }
        ],
    })
}

function download1(id) {
    $ajax({
        type: 'post',
        url: '/commodity/getFile',
        data: {
            id: id,
        },
    }, false, '', function (res) {
        if (res.data[0].pdf1 != '' && res.data[0].pdf1 != null) {
            downloadFileByBase64(res.data[0].pdf1Name, res.data[0].pdf1.split(',')[1])
        }
    })
}

function download2(id) {
    $ajax({
        type: 'post',
        url: '/commodity/getFile',
        data: {
            id: id,
        },
    }, false, '', function (res) {
        if (res.data[0].pdf2 != '' && res.data[0].pdf2 != null) {
            downloadFileByBase64(res.data[0].pdf2Name, res.data[0].pdf1.split(',')[1])
        }
    })
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