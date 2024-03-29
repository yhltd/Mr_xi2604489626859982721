let gongyingshang='';
let yuanliaopinpai=''
let wuzhifenlei='';
let wulixingtai='';

function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/menu_settings/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $('#menuSettingsTable').colResizable({
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

    $("#select-btn").click(function () {
        var query=$('#query').val()
        $ajax({
            type: 'post',
            url: '/menu_settings/queryList',
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
        $ajax({
            type: 'post',
            url: '/menu_settings/add',
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
        gongyingshang=rows[0].data.supplier;
        yuanliaopinpai=rows[0].data.brand;
        wuzhifenlei=rows[0].data.sort;
        wulixingtai=rows[0].data.shape;
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
            console.log(gongyingshang)
            console.log(yuanliaopinpai)
            console.log(wuzhifenlei)
            console.log(wulixingtai)
            console.log(params)
            let new_gongyingshang = params.supplier
            let new_yuanliaopinpai=params.brand
            let new_wuzhifenlei=params.sort
            let new_wulixingtai=params.shape
            let this_id = params.id
            console.log(this_id)
            $ajax({
                type: 'post',
                url: '/menu_settings/update',
                data: {
                    new_gongyingshang : new_gongyingshang,
                    new_yuanliaopinpai : new_yuanliaopinpai,
                    new_wuzhifenlei : new_wuzhifenlei,
                    new_wulixingtai : new_wulixingtai,
                    old_gongyingshang : gongyingshang,
                    old_yuanliaopinpai : yuanliaopinpai,
                    old_wuzhifenlei : wuzhifenlei,
                    old_wulixingtai : wulixingtai,
                    id : this_id,
                },
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
                url: '/menu_settings/delete',
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
    if ($('#menuSettingsTable').html != '') {
        $('#menuSettingsTable').bootstrapTable('load', data);
    }

    $('#menuSettingsTable').bootstrapTable({
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
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'supplier',
                title: '供应商',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if(value == null || value == ''){
                        return undefined;
                    }else{
                        return  value;
                    }
                }
            }, {
                field: 'brand',
                title: '原料品牌',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if(value == null || value == ''){
                        return undefined;
                    }else{
                        return  value;
                    }
                }
            }, {
                field: 'sort',
                title: '物质分类',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if(value == null || value == ''){
                        return undefined;
                    }else{
                        return  value;
                    }
                }
            }, {
                field: 'shape',
                title: '物理形态',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if(value == null || value == ''){
                        return undefined;
                    }else{
                        return  value;
                    }
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