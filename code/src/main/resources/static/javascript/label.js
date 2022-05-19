function getList() {
    var type = $.session.get('label');
    $('#add-type').val($.session.get('label'))
    $('#biaoqian').text("当前页："+$.session.get('label'))
    $ajax({
        type: 'post',
        url: '/label/getList',
        data: {
            type: type,
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

    // $("#select-btn").click(function () {
    //     var supplier = $.session.get('supplier');
    //     var query = $('#query').val()
    //     $ajax({
    //         type: 'post',
    //         url: '/supplier/queryList',
    //         data: {
    //             supplier: supplier,
    //             query: query
    //         }
    //     }, false, '', function (res) {
    //         if (res.code == 200) {
    //             $('#add-type').val(supplier)
    //             setTable(res.data);
    //         }
    //     })
    // })

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
        $ajax({
            type: 'post',
            url: '/label/add',
            data: JSON.stringify({
                addInfo: params
            }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8'
        }, false, '', function (res) {
            alert(res.msg)
            if(res.code == 200){
                $('#add-form')[0].reset();
                $('#add-type').val($.session.get('type'))
                getList();
                $('#add-close-btn').click();
            }
        })
    })

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#labelTable')
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
                url: '/label/update',
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
            let rows = getTableSelection("#labelTable");
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
                url: '/label/delete',
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
})

function setTable(data) {
    if ($('#labelTable').html != '') {
        $('#labelTable').bootstrapTable('load', data);
    }

    $('#labelTable').bootstrapTable({
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
                field: 'type',
                title: '分类',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'label1',
                title: '标签1',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                },
                cellStyle: function (value, row, index) {
                    if(row.label1==row.label2 || row.label1==row.label3){
                        return {css: {"background-color": "#f08080"}};
                    }
                    return '';
                }
            }, {
                field: 'label2',
                title: '标签2',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                },
                cellStyle: function (value, row, index) {
                    if(row.label2==row.label1 || row.label2==row.label3){
                        return {css: {"background-color": "#f08080"}};
                    }
                    return '';
                }
            }, {
                field: 'label3',
                title: '标签3',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                },
                cellStyle: function (value, row, index) {
                    if(row.label3==row.label1 || row.label3==row.label2){
                        return {css: {"background-color": "#f08080"}};
                    }
                    return '';
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