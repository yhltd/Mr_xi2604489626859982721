var operation = ""
var label_name = ""
var this_column = ""
var this_id = ""

function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/commodity_price/getList',
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

function getCommodityList() {
    $ajax({
        type: 'post',
        url: '/commodity/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setCommodityTable(res.data);
            $('#show-commodity-modal').modal('show');
        }
        console.log(res)
    })
}

function getINCIList() {
    $ajax({
        type: 'post',
        url: '/inci_information/getList',
        data: {
            query: ''
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setINCITable(res.data);
            $('#show-inci-modal').modal('show');
        }
        console.log(res)
    })
}

$(function () {
    //刷新
    getList();

    $("#select-btn").click(function () {
        var query = $('#query').val()
        $ajax({
            type: 'post',
            url: '/commodity_price/queryList',
            data: {
                query: query
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    })

    $("#select-btn2").click(function () {
        var query = $('#query').val()
        $ajax({
            type: 'post',
            url: '/cir_security/preciseQueryList',
            data: {
                query: query
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
        if (checkForm('#add-form')) {
            $ajax({
                type: 'post',
                url: '/commodity_price/add',
                data: JSON.stringify({
                    addUserInfo: params
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg)
                if (res.code == 200) {
                    $('#add-form')[0].reset();
                    getList();
                    $('#add-close-btn').click();
                }
            })
        }
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
            if (checkForm('#update-form')) {
                $ajax({
                    type: 'post',
                    url: '/commodity_price/update',
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
                url: '/commodity_price/delete',
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


    //添加窗体点击选择原料信息按钮
    $("#add-commodity-show").click(function () {
        operation = "添加";
        getCommodityList();
    })

    //修改窗体点击原料信息按钮
    $("#update-commodity-show").click(function () {
        operation = "修改";
        getCommodityList();
    })

    //原料信息关闭按钮
    $("#commodity-close-btn").click(function () {
        $('#show-commodity-modal').modal('hide');
    })

    //原料信息确定按钮
    $("#commodity-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-commodity");
        if (operation == "添加") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-commodity");
                $.each(rows, function (index, row) {
                    $("#add-commodityId").val(row.data.id);
                })
                $('#show-commodity-modal').modal('hide');
            }
            operation = "";
        } else if (operation == "修改") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-essential");
                $.each(rows, function (index, row) {
                    $("#update-commodityId").val(row.data.commodityId);
                })
                $('#show-commodity-modal').modal('hide');
            }
            operation = "";
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
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'rawCode',
                title: '原料编码',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }

            }, {
                field: 'goodsName',
                title: '商品名称',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'rawSubmissionCode',
                title: '原料报送码',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'productionPlace',
                title: '产地',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'brandName',
                title: '品牌名称',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'abbreviation',
                title: '供应商简称',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'supplierName',
                title: '供应商公司名称',
                align: 'center',
                sortable: true,
                width: 130,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'unit',
                title: '规格',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'price',
                title: '成本',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
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

    //上传excel
    $('#uploadexcel-btn').click(function () {
        $('#upload-file').trigger('click');

    })

    //判断文件名改变
    $('#upload-file').change(function () {
        var url = null;
        if ($('#upload-file').val() != '') {
            if ($('#upload-file').val().substr(-5) == '.xlsx') {
                var excel = document.getElementById("upload-file").files[0]
                var oFReader = new FileReader();
                oFReader.readAsDataURL(excel);
                oFReader.onloadend = function (oFRevent) {
                    url = oFRevent.target.result;
                    $ajax({
                        type: 'post',
                        url: '/commodity_price/upload',
                        data: {
                            excel: url
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
                alert("请选择正确的Excel文件！")
                $('#file').val('');
            }
        }
    })
}

function setCommodityTable(data) {
    console.log(data)
    if ($('#show-table-commodity').html() != '') {
        $('#show-table-commodity').bootstrapTable('load', data);
        return;
    }
    $('#show-table-commodity').bootstrapTable({
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
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'rawCode',
                title: '原料编码',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }

            }, {
                field: 'goodsName',
                title: '商品名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'rawSubmissionCode',
                title: '原料报送码',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'productionPlace',
                title: '产地',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'brandName',
                title: '品牌名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'addAmount',
                title: '建议添加量',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'abbreviation',
                title: '供应商简称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'supplierName',
                title: '供应商公司名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'solubility',
                title: '溶解性',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'appearance',
                title: '外观',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'smell',
                title: '气味',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'substanceLabel',
                title: '物质标签',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'efficacyLabel',
                title: '功效标签',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'rawLabel',
                title: '原料标签',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'rawLabel',
                title: '原料标签',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'patent',
                title: '专利信息',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'performance',
                title: '产品性能',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'taboo',
                title: '配伍禁忌',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            },
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
