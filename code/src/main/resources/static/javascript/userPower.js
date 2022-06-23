let operation="";
function getList() {
    $('#query').val("");
    $ajax({
        type: 'post',
        url: '/user_power/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#userPowerTable").bootstrapTable('hideColumn', 'userId');
            $("#userPowerTable").colResizable({
                liveDrag:true,
                gripInnerHtml:"<div class='grip'></div>",
                draggingClass:"dragging",
                resizeMode:'fit'
            });
        }
    })
}

function getUserList() {
    $ajax({
        type: 'post',
        url: '/user/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setShowUserTable(res.data);
            $('#show-user-modal').modal('show');
        }
        console.log(res)
    })
}

$(function () {
    //刷新
    getList();

    $('#select-btn').click(function () {
        var username = $('#query').val();
        $ajax({
            type: 'post',
            url: '/user_power/queryList',
            data:{
                username:username
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
                $("#userPowerTable").bootstrapTable('hideColumn', 'userId');
            }
        })
    })

    $("#refresh-btn").click(function () {
        getList();
    })

    //添加窗体点击选择基本信息按钮
    $("#add-user-show").click(function () {
        operation = "添加";
        getUserList();
    })

    //修改窗体点击选择基本信息按钮
    $("#update-user-show").click(function () {
        operation = "修改";
        getUserList();
    })

    //基本信息关闭按钮
    $("#user-close-btn").click(function () {
        $('#show-user-modal').modal('hide');
    })

    //基本信息确定按钮
    $("#user-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-user");
        if (operation == "添加") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-user");
                $.each(rows, function (index, row) {
                    $("#userId").val(row.data.id);
                    $("#add-username").val(row.data.username);
                })
                $('#show-user-modal').modal('hide');
            }
            operation = "";
        } else if (operation == "修改") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-user");
                $.each(rows, function (index, row) {
                    $("#update-userId").val(row.data.id);
                    $("#update-username").val(row.data.username);
                })
                $('#show-user-modal').modal('hide');
            }
            operation = "";
        }
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
        if (checkForm('#add-form')) {
            $ajax({
                type: 'post',
                url: '/user_power/add',
                data: JSON.stringify({
                    addInfo: params
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
        }
    })

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#userPowerTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改');
            return;
        }
        $('#update-modal').modal('show');
        //setForm(rows[0].data, '#update-form');
        $('#id').val(rows[0].data.id);
        $('#update-userId').val(rows[0].data.userId)
        $('#update-username').val(rows[0].data.username)
        $('#update-viewName').val(rows[0].data.viewName)
        $("#update-zeng").find("option[value = '" + rows[0].data.zeng + "']").attr("selected", "selected");
        $('#update-shan').find("option[value = '" + rows[0].data.shan + "']").attr("selected", "selected");
        $('#update-gai').find("option[value = '" + rows[0].data.gai + "']").attr("selected", "selected");
        $('#update-cha').find("option[value = '" + rows[0].data.cha + "']").attr("selected", "selected");
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
            if (checkForm('#update-form')) {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/user_power/update',
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
        }
    })

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？")
        if (msg) {
            let rows = getTableSelection("#userPowerTable");
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
                url: '/user_power/delete',
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
    if ($('#userPowerTable').html != '') {
        $('#userPowerTable').bootstrapTable('load', data);
    }

    $('#userPowerTable').bootstrapTable({
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
                field: 'id',
                title: '序号',
                align: 'center',
                width: 75,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },{
                field: 'userId',
                title: '序号',
                align: 'center',
                width: 75,
            },{
                field: 'username',
                title: '用户名',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'viewName',
                title: '模块',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'zeng',
                title: '增',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shan',
                title: '删',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'gai',
                title: '改',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'cha',
                title: '查',
                align: 'center',
                sortable: true,
                width: 100,
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

function setShowUserTable(data) {
    console.log(data)
    if ($('#show-table-user').html() != '') {
        $('#show-table-user').bootstrapTable('load', data);
        return;
    }
    $('#show-table-user').bootstrapTable({
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
                field: 'username',
                title: '用户名',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'password',
                title: '密码',
                align: 'left',
                sortable: true,
                width: 100,
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


