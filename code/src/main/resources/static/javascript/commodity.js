var operation = ""
var label_name = ""
var this_column = ""
var this_id = ""
var commodity_id = ""


//禁用回车键
$(window).keydown( function(e) {
    var key = window.event?e.keyCode:e.which;
    if(key.toString() == "13"){
        return false;
    }
});




function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/commodity/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#menuSettingsTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
        }
    })
}

function getCosmeticRawList() {
    $ajax({
        type: 'post',
        url: '/cosmetic_raw/getList2',
    }, false, '', function (res) {
        if (res.code == 200) {
            setCosmeticRawTable(res.data);
            $('#show-essential-modal').modal('show');
        }
        console.log(res)
    })
}

function getSupplierList() {
    $ajax({
        type: 'post',
        url: '/supplier/getAllList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setSupplierTable(res.data);
            $('#show-supplier-modal').modal('show');
        }
        console.log(res)
    })
}

function getLabelList() {
    $ajax({
        type: 'post',
        url: '/label/getList',
        data: {
            type: label_name
        }
    }, false, '', function (res) {
        // if (res.code == 200) {
        //     setLabelTable(res.data);
        //     $('#show-label-modal').modal('show');
        // }
        if (res.code == 200) {
            if (label_name == "功效标签") {
                if ($('#add-efficacyLabel').val() != "") {
                    var arr = $('#add-efficacyLabel').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }
            }
            if (label_name == "功效标签") {
                if ($('#update-efficacyLabel').val() != "") {
                    var arr = $('#update-efficacyLabel').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }
            }
            if (label_name == "原料标签") {
                if ($('#add-rawLabel').val() != "") {
                    var arr = $('#add-rawLabel').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }
            }
            if (label_name == "原料标签") {
                if ($('#update-rawLabel').val() != "") {
                    var arr = $('#update-rawLabel').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }
            }

            $('#show-label-modal').modal('show');
        }
        console.log(res)
    })
}

function getWuZhi() {
    $ajax({
        type: 'post',
        url: '/label/getListByWuZhi',
    }, false, '', function (res) {
        if (res.code == 200) {

            if (label_name == "物质标签") {
                if ($('#add-substanceLabel').val() != "" ) {
                    var arr = $('#add-substanceLabel').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }

            }
            if (label_name == "物质标签") {
                if ($('#update-substanceLabel').val() != "") {
                    var arr = $('#update-substanceLabel').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }

            }

            $('#show-label-modal').modal('show');
        }
        console.log(res)
    })
}

$("#select").click(function () {
    var item4=""
    $ajax({
        type: 'post',
        url: '/label/getListByWuLi',
        data: {
            label1_a: label1_a
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setLabelTable(res.data);
            $('#show-label-modal').modal('show');
            $("#add-solubility-label").bootstrapTable('hideColumn', 'id');

        }
        console.log(res)
    })

    // $ajax({
    //     type: 'post',
    //     url: '/menu_settings/getMenuSettings',
    // }, false, '', function (res) {
    //     if (res.code == 200) {
    //         for (var i = 0; i < res.data.length; i++) {
    //            // if (res.data[i].sort != '') {
    //            //      item3 = " <a class=\"dropdown-item\" data-src=\"label.html\">" + res.data[i].sort + "</a>"
    //            //      $("#wuzhi").append(item3);
    //            //  }
    //            if (res.data[i].sort != '') {
    //                 item4 = "<option value=\"" + res.data[i].sort + "\">" + res.data[i].sort + "</option>"
    //                 $("#add-type").append(item4);
    //            }
    //         }
    //
    //     }
    // })
})

function getWuLi() {
    $ajax({
        type: 'post',
        url: '/label/getListByWuLi',
    }, false, '', function (res) {
        if (res.code == 200) {
            if (label_name == "溶解性") {
                if ($('#add-solubility').val() != "") {
                    var arr = $('#add-solubility').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }
            }
            if (label_name == "溶解性") {
                if ($('#update-solubility').val() != "") {
                    var arr = $('#update-solubility').val().split("、")
                    var item = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (arr.indexOf(res.data[i].label1) == -1) {
                            item.push({
                                id: res.data[i].id,
                                type: res.data[i].type,
                                label1: res.data[i].label1,
                            })
                        }
                    }
                    setLabelTable(item);
                } else {
                    setLabelTable(res.data);
                }
            }

            $('#show-label-modal').modal('show');
        }
        console.log(res)
    })
}

$(function () {
    //刷新
    getList();

    // $(document).ready(function () {
    //     var item1 = '';
    //     var item2 = '';
    //     var item3 = '';
    //     var item4 = '';
    //     $ajax({
    //         type: 'post',
    //         url: '/menu_settings/getMenuSettings',
    //     }, false, '', function (res) {
    //         if (res.code == 200) {
    //             for (var i = 0; i < res.data.length; i++) {
    //                 if (res.data[i].sort != '') {
    //                     item4 = "<option value=\"" + res.data[i].sort + "\">" + res.data[i].sort + "</option>"
    //                     $("#add-type").append(item4);
    //                 }
    //             }
    //
    //             for (var i = 0; i < res.data.length; i++) {
    //                 if (res.data[i].shape != '') {
    //                     item4 = "<option value=\"" + res.data[i].shape + "\">" + res.data[i].shape + "</option>"
    //                     $("#add-type").append(item4);
    //                 }
    //             }
    //             var label = "功效标签";
    //             item4 = "<option value=\"" + label + "\">" + label + "</option>"
    //             $("#add-type").append(item4);
    //             label = "原料标签";
    //             item4 = "<option value=\"" + label + "\">" + label + "</option>"
    //             $("#add-type").append(item4);
    //         }
    //     })
    // });





    $("#add-rawCode").focus(function () {
        $ajax({
            type: 'post',
            url: '/commodity/getBianma',
        }, false, '', function (res) {
            if (res.code == 200) {
                if (res.data.length > 0) {
                    var num = res.data[0].rawCode;
                }
                if (res.data.length == 0) {
                    $("#add-rawCode").val("HOYL_0001")
                } else {
                    var len = 4;
                    num = parseInt(num.split("_")[1], 10) + 1
                    num = num.toString();
                    while (num.length < len) {
                        num = "0" + num;
                    }
                    $("#add-rawCode").val("HOYL_" + num)
                }
            }
        })
    })

    $("#select-btn").click(function () {
        var column_name1 = $('#column_name1').val()
        var condition1 = $('#condition1').val()
        var column_name2 = $('#column_name2').val()
        var condition2 = $('#condition2').val()
        var column_name3 = $('#column_name3').val()
        var condition3 = $('#condition3').val()

        var this_str = column_name1 + "`" + condition1 + "`" + column_name2 + "`" + condition2 + "`" + column_name3 + "`" + condition3

        var this_arr = this_str.split("`")

        var this_num = 0
        var this_str2 = ''
        for (var i = 0; i <= 4; i = i + 2) {
            if (this_arr[i] != '') {
                this_num = this_num + 1
                if (this_str2 == '') {
                    this_str2 = this_arr[i] + "`" + this_arr[i + 1]
                } else {
                    this_str2 = this_str2 + "`" + this_arr[i] + "`" + this_arr[i + 1]
                }
            }
        }

        var this_arr2 = this_str2.split("`")

        if (this_num == 0) {
            $ajax({
                type: 'post',
                url: '/commodity/getList',
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        } else if (this_num == 1) {
            $ajax({
                type: 'post',
                url: '/commodity/queryList1',
                data: {
                    column_name1: this_arr[0],
                    condition1: this_arr[1]
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        } else if (this_num == 2) {
            $ajax({
                type: 'post',
                url: '/commodity/queryList2',
                data: {
                    column_name1: this_arr[0],
                    condition1: this_arr[1],
                    column_name2: this_arr[2],
                    condition2: this_arr[3],
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        } else if (this_num == 3) {
            $ajax({
                type: 'post',
                url: '/commodity/queryList3',
                data: {
                    column_name1: this_arr[0],
                    condition1: this_arr[1],
                    column_name2: this_arr[2],
                    condition2: this_arr[3],
                    column_name3: this_arr[4],
                    condition3: this_arr[5],
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        }


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
        $("#add-rawCode").val('');
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
                url: '/commodity/add',
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

    $("#add-reset-btn").click(function () {
        $('#add-form')[0].reset();
    })

    $("#update-reset-btn").click(function () {
        $('#update-form')[0].reset();
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
        console.log(rows[0].data)
        setTextArea(rows[0].data, '#update-form');

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
                    url: '/commodity/update',
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
                url: '/commodity/delete',
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

    //上传excel

    $('#upload-btn').click(function () {
        $('#file').trigger('click');

    })

    //判断文件名改变
    $('#file').change(function () {
        var url = null;
        if ($('#file').val() != '') {
            if ($('#file').val().substr(-5) == '.xlsx') {
                var excel = document.getElementById("file").files[0]
                var oFReader = new FileReader();
                oFReader.readAsDataURL(excel);
                oFReader.onloadend = function (oFRevent) {
                    url = oFRevent.target.result;
                    $ajax({
                        type: 'post',
                        url: '/commodity/upload',
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

    //添加窗体点击产地文本框
    $("#add-productionPlace").click(function () {
        operation = "添加";
        getCosmeticRawList();
    })

    //修改窗体点击产地文本框
    $("#update-productionPlace").click(function () {
        operation = "修改";
        getCosmeticRawList();
    })

    //基本信息关闭按钮
    $("#essential-close-btn").click(function () {
        $('#show-essential-modal').modal('hide');
    })

    //基本信息确定按钮
    $("#essential-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-essential");
        if (operation == "添加") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-essential");
                $.each(rows, function (index, row) {
                    $("#add-productionPlace").val(row.data.productionPlace);
                    $("#add-brandName").val(row.data.brandName);
                })
                $('#show-essential-modal').modal('hide');
            }
            operation = "";
        } else if (operation == "修改") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-essential");
                $.each(rows, function (index, row) {
                    $("#update-productionPlace").val(row.data.productionPlace);
                    $("#update-brandName").val(row.data.brandName);
                })
                $('#show-essential-modal').modal('hide');
            }
            operation = "";
        }
    })

    //添加窗体点击点击供应商文本框
    $("#add-abbreviation").click(function () {
        operation = "添加";
        getSupplierList();
    })

    //修改窗体点击点击供应商文本框
    $("#update-abbreviation").click(function () {
        operation = "修改";
        getSupplierList();
    })

    //供应商信息关闭按钮
    $("#supplier-close-btn").click(function () {
        $('#show-supplier-modal').modal('hide');
    })

    //供应商信息确定按钮
    $("#supplier-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-supplier");
        if (operation == "添加") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-supplier");
                $.each(rows, function (index, row) {
                    $("#eiId").val(row.data.id);
                    $("#add-abbreviation").val(row.data.abbreviation);
                    $("#add-supplierName").val(row.data.supplierName);
                })
                $('#show-supplier-modal').modal('hide');
            }
            operation = "";
        } else if (operation == "修改") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-supplier");
                $.each(rows, function (index, row) {
                    $("#update-abbreviation").val(row.data.abbreviation);
                    $("#update-supplierName").val(row.data.supplierName);
                })
                $('#show-supplier-modal').modal('hide');
            }
            operation = "";
        }
    })

    //添加窗体点击物理文本框
    $("#add-solubility-label").click(function () {
        operation = "添加";
        label_name = "溶解性"

        $('#add-type').empty();
        //document.getElementById("add-type").options.selectedIndex = 0
        // $("#add-type").selectpicker('refresh');

        getWuLi();
        $('#select-btn5').click(function () {
            var label1 = $("#label1_a").val()
            var arr = label1.split(",");
            var arrr = []

            for (var i = 0; i < arr.length; i++) {
                arrr[i] = arr[i]
            }
            $ajax({
                type: 'post',
                url: '/label/getListByWuLiwuli',
                data: {
                    arrr: arrr,
                    arrrType: 0,
                    time: new Date().getTime()
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setLabelTable(res.data);
                }
                console.log(res)
            })
        })
        var item4 = '';
        $ajax({
            type: 'post',
            url: '/menu_settings/getMenuSettings',
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].shape != '') {
                        item4 = " <option value=\"" + res.data[i].shape + "\">" + res.data[i].shape + "</option>"
                        $("#add-type").append(item4);
                    }
                }
            }
        })
    })

    // //添加窗体点击外观文本框
    // $("#add-appearance").click(function () {
    //     operation = "添加";
    //     label_name = "外观"
    //     getWuZhi();
    // })

    // //添加窗体点击气味文本框
    // $("#add-smell").click(function () {
    //     operation = "添加";
    //     label_name = "气味"
    //     getLabelList();
    // })

    //添加窗体点击物质标签文本框
    $("#add-substanceLabel-label").click(function () {
        operation = "添加";
        label_name = "物质标签"
        getWuZhi();
        // $ajax({
        //     type: 'post',
        //     url: '/label/wuzhiList',
        // }, false, '', function (res) {
        //     if (res.code == 200) {
        //         setLabelTable(res.data);
        //         $('#show-label-modal').modal('show');
        //     }
        //     console.log(res)
        // })
        $('#add-type').empty();
        var item3 = '';
        $ajax({
            type: 'post',
            url: '/menu_settings/getMenuSettings',
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].sort != '') {
                        item3 = " <option value=\"" + res.data[i].sort + "\">" + res.data[i].sort + "</option>"
                        $("#add-type").append(item3);
                    }
                }
            }
        })

    })

    //添加窗体点击功效标签文本框
    $("#add-efficacyLabel-label").click(function () {
        operation = "添加";
        label_name = "功效标签"
        getLabelList();
        $('#add-type').empty();
        var item2 = '';
        $ajax({
            type: 'post',
            url: '/commodity/getList',
        }, false, '', function (res) {
            if (res.code == 200) {
                item2 = " <option value=\"" + "功效标签" + "\">" + "功效标签" + "</option>"
                $("#add-type").append(item2);
            }
        })
    })

    //添加窗体点击原料标签文本框
    $("#add-rawLabel-label").click(function () {
        operation = "添加";
        label_name = "原料标签"
        getLabelList();
        $('#add-type').empty();
        var item1 = '';
        $ajax({
            type: 'post',
            url: '/commodity/getList',
        }, false, '', function (res) {
            if (res.code == 200) {
                item1 = " <option value=\"" + "原料标签" + "\">" + "原料标签" + "</option>"
                $("#add-type").append(item1);
            }
        })
    })
// //修改窗体点击外观文本框
    // $("#update-appearance").click(function () {
    //     operation = "修改";
    //     label_name = "外观"
    //     getLabelList();
    // })
    //
    // //修改窗体点击气味文本框
    // $("#update-smell").click(function () {
    //     operation = "修改";
    //     label_name = "气味"
    //     getLabelList();
    // })

    //修改窗体点击物理文本框
    $("#update-solubility-label").click(function () {
        operation = "修改";
        label_name = "溶解性"
        getWuLi();
    })
    //修改窗体点击物质标签文本框
    $("#update-substanceLabel-label").click(function () {
        operation = "修改";
        label_name = "物质标签"
        getWuZhi();
    })
    //修改窗体点击功效标签文本框
    $("#update-efficacyLabel-label").click(function () {
        operation = "修改";
        label_name = "功效标签"
        getLabelList();
    })
    //修改窗体点击原料标签文本框
    $("#update-rawLabel-label").click(function () {
        operation = "修改";
        label_name = "原料标签"
        getLabelList();
    })


    //标签信息关闭按钮
    $("#label-close-btn").click(function () {
        $('#show-label-modal').modal('hide');
    })

    //标签信息确定按钮
    $("#label-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-label");
        if (operation == "添加") {
            if (rows.length == 0) {
                alert('请选择一条数据');
                return;
            } else {
                this_str = ''
                let rows = getTableSelection("#show-table-label");
                $.each(rows, function (index, row) {
                    if (row.data.label1 != '' && row.data.label1 != null) {
                        if (this_str == '') {
                            this_str = row.data.label1
                        } else {
                            this_str = this_str + "、" + row.data.label1
                        }
                    }
                    if (row.data.label2 != '' && row.data.label2 != null) {
                        if (this_str == '') {
                            this_str = row.data.label2
                        } else {
                            this_str = this_str + "、" + row.data.label2
                        }
                    }
                    if (row.data.label3 != '' && row.data.label3 != null) {
                        if (this_str == '') {
                            this_str = row.data.label3
                        } else {
                            this_str = this_str + "、" + row.data.label3
                        }
                    }
                })
                if (label_name == '溶解性') {
                    if ($("#add-solubility").val() == "") {
                        $("#add-solubility").val(this_str);
                    } else {
                        $("#add-solubility").val($("#add-solubility").val() + "、" + this_str);
                    }
                } else if (label_name == '外观') {
                    if ($("#add-appearance").val() == "") {
                        $("#add-appearance").val(this_str);
                    } else {
                        $("#add-appearance").val($("#add-appearance").val() + "、" + this_str);
                    }
                } else if (label_name == '气味') {
                    if ($("#add-smell").val() == "") {
                        $("#add-smell").val(this_str);
                    } else {
                        $("#add-smell").val($("#add-smell").val() + "、" + this_str);
                    }
                } else if (label_name == '物质标签') {
                    if ($("#add-substanceLabel").val() == "") {
                        $("#add-substanceLabel").val(this_str);
                    } else {
                        $("#add-substanceLabel").val($("#add-substanceLabel").val() + "、" + this_str);
                    }
                } else if (label_name == '功效标签') {
                    if ($("#add-efficacyLabel").val() == "") {
                        $("#add-efficacyLabel").val(this_str);
                    } else {
                        $("#add-efficacyLabel").val($("#add-efficacyLabel").val() + "、" + this_str);
                    }
                } else if (label_name == '原料标签') {
                    if ($("#add-rawLabel").val() == "") {
                        $("#add-rawLabel").val(this_str);
                    } else {
                        $("#add-rawLabel").val($("#add-rawLabel").val() + "、" + this_str);
                    }
                }
                $('#show-label-modal').modal('hide');
            }
            operation = "";
        } else if (operation == "修改") {
            this_str = ''
            let rows = getTableSelection("#show-table-label");
            $.each(rows, function (index, row) {
                if (row.data.label1 != '' && row.data.label1 != null) {
                    if (this_str == '') {
                        this_str = row.data.label1
                    } else {
                        this_str = this_str + "、" + row.data.label1
                    }
                }
                if (row.data.label2 != '' && row.data.label2 != null) {
                    if (this_str == '') {
                        this_str = row.data.label2
                    } else {
                        this_str = this_str + "、" + row.data.label2
                    }
                }
                if (row.data.label3 != '' && row.data.label3 != null) {
                    if (this_str == '') {
                        this_str = row.data.label3
                    } else {
                        this_str = this_str + "、" + row.data.label3
                    }
                }
            })

            if (label_name == '溶解性') {
                if ($("#update-solubility").val() == "") {
                    $("#update-solubility").val(this_str);
                } else {
                    $("#update-solubility").val($("#update-solubility").val() + "、" + this_str);
                }
            } else if (label_name == '外观') {
                if ($("#update-appearance").val() == "") {
                    $("#update-appearance").val(this_str);
                } else {
                    $("#update-appearance").val($("#update-appearance").val() + "、" + this_str);
                }
            } else if (label_name == '气味') {
                if ($("#update-smell").val() == "") {
                    $("#update-smell").val(this_str);
                } else {
                    $("#update-smell").val($("#update-smell").val() + "、" + this_str);
                }
            } else if (label_name == '物质标签') {
                if ($("#update-substanceLabel").val() == "") {
                    $("#update-substanceLabel").val(this_str);
                } else {
                    $("#update-substanceLabel").val($("#update-substanceLabel").val() + "、" + this_str);
                }
            } else if (label_name == '功效标签') {
                if ($("#update-efficacyLabel").val() == "") {
                    $("#update-efficacyLabel").val(this_str);
                } else {
                    $("#update-efficacyLabel").val($("#update-efficacyLabel").val() + "、" + this_str);
                }
            } else if (label_name == '原料标签') {
                if ($("#update-rawLabel").val() == "") {
                    $("#update-rawLabel").val(this_str);
                } else {
                    $("#update-rawLabel").val($("#update-rawLabel").val() + "、" + this_str);
                }
            }
            $('#show-label-modal').modal('hide');
        }
    })

    //上传excel
    $('#uploadexcel-btn').click(function () {
        $('#file').trigger('click');

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
                        type: '原料商品',
                    },
                    async: false,
                }, false, '', function (res) {
                    alert(res.msg)
                    fileShow(otherId);
                })
            }
        }
    })

    $('#file-up-btn').click(function () {
        var file = document.getElementById("file-1").files
        if (file.length == 0) {
            alert('未选择上传文件');
            return;
        }
        var fileName_list = []
        var fileName_num = -1
        for (var i = 0; i < file.length; i++) {
            var this_file = file[i];
            var fileName = "";
            var obj = {};

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
                    obj = {
                        "otherId": otherId,
                        "type": '原料商品',
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
                        async: true,
                        xhr: function () {
                            var myXhr = $.ajaxSettings.xhr();
                            if (myXhr.upload) { //检查上传的文件是否存在
                                myXhr.upload.addEventListener('progress', function (e) {
                                    var loaded = e.loaded; //已经上传大小情况
                                    var total = e.total; //附件总大小
                                    var percent = Math.floor(100 * loaded / total) + "%"; //已经上传的百分比
                                    //console.log("已经上传了："+percent);
                                    //显示进度条
                                    $("#content").css("width", percent).css("height", 20).css("backgroundColor", "#33CCFF").css("color", "white").html("<b>" + percent + "</b>");
                                }, false); // for handling the progress of the upload
                            }
                            return myXhr;
                        },
                    }, false, '', function (res) {
                        fileShow(otherId);
                        $("#content").css("width", 0).css("height", 0).css("margin-top", 0).css("backgroundColor", "").text("");
                        // fileName_num = fileName_num + 1
                        if (fileName_num == i) {
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
            async: false,
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
        if (rows[0].data.fileName.split(".")[1] != 'pdf') {
            alert('请选择pdf文件');
            return;
        }
        $ajax({
            type: 'post',
            url: '/file_table/getFile',
            data: {
                id: rows[0].data.id,
            },
            async: true,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { //检查上传的文件是否存在
                    myXhr.upload.addEventListener('progress', function (e) {
                        var loaded = e.loaded; //已经上传大小情况
                        var total = e.total; //附件总大小
                        var percent = Math.floor(100 * loaded / total) + "%"; //已经上传的百分比
                        //console.log("已经上传了："+percent);
                        //显示进度条
                        $("#content").css("width", percent).css("height", 20).css("backgroundColor", "#33CCFF").css("color", "white").html("<b>" + percent + "</b>");
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
            $("#content").css("width", 0).css("height", 0).css("margin-top", 0).css("backgroundColor", "").text("");
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

    //选择INCI数据关闭按钮
    $("#inci-close-btn").click(function () {
        $('#show-inci-modal').modal('hide');
    })

    $("#inci-submit-btn2").click(function () {
        $('#add-inci-luru').modal('show');
    })

    // $('#add-inci-submit-btn2').click(function () {
    //     var inci = ('#inci-chn').val().replace("，", ",")
    //     var arr = inci.split(",")
    //
    // })

    //inci新增
    $("#inci-submit-btn").click(function () {

        $('#add-inci-modal').modal('show');
        // $ajax({
        //     type: 'post',
        //     url: '/inci_information/getList',
        //     data:{
        //         query: ''
        //     }
        // }, false, '', function (res) {
        //     if (res.code == 200) {
        //         setINCIAddTable(res.data);
        //         $("#add-table-inci").bootstrapTable('hideColumn', 'id');
        //
        //     }
        //     console.log(res)
        // })

        $("#select-btn1").click(function () {
            var chineseName_a = $("#chineseName_a").val()
            var englishName_a = $("#englishName_a").val()
            $ajax({
                type: 'post',
                url: '/inci_information/getlistobscure',
                data: {
                    chineseName_a: chineseName_a,
                    englishName_a: englishName_a
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setINCIAddTable(res.data);
                    $("#select-btn1").bootstrapTable('hideColumn', 'id');
                }
                console.log(res)
            })
        })
        $("#select-btn2").click(function () {
            var chineseName_a = $("#chineseName_a").val()
            var englishName_a = $("#englishName_a").val()
            $ajax({
                type: 'post',
                url: '/inci_information/getlistprecision',
                data: {
                    chineseName_a: chineseName_a,
                    englishName_a: englishName_a
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setINCIAddTable(res.data);
                    $("#select-btn2").bootstrapTable('hideColumn', 'id');
                }
                console.log(res)
            })
        })


    })

    //新增INCI数据关闭按钮
    $("#add-inci-close-btn").click(function () {
        $('#add-inci-modal').modal('hide');
    })
    //INCI信息中文关闭
    $("#add-inci-close-btn2").click(function () {
        $('#add-inci-luru').modal('hide');
    })
    //INCI信息中文确定
    $("#add-inci-submit-btn2").click(function () {
        // let rows = getTableSelection("#menuSettingsTable");
        var id= commodity_id;

        var inci_chn=$('#inci-chn').val();
        var inci_chn1=$('#inci-chn1').val();
        var inci_chn2=$('#inci-chn2').val();
        $ajax({
            type: 'post',
            url: '/commodity_inci/incichn',
            data: {
                inci_chn: inci_chn,
                inci_chn1: inci_chn1,
                inci_chn2: inci_chn2,
                id:id,
            }
        }, false, '', function (res) {
            if(res.code==200){
                alert(res.msg);
                $('#add-inci-luru').modal('hide');
                $ajax({
                    type: 'post',
                    url: '/commodity_inci/getListById',
                    data: {
                        id: commodity_id,
                    }
                }, false, '', function (res) {
                    if (res.code == 200) {
                        setINCITable(res.data);
                        $("#show-table-inci").bootstrapTable('hideColumn', 'id');
                        $('#add-inci-luru').modal('show');
                    } else {
                        return;
                    }
                    console.log(res)
                })
                getList();
            }
        })
        //alert('添加成功！')



    })

    //新增INCI数据确定按钮
    $("#add-inci-submit-btn").click(function () {
        let rows = getRows("#add-table-inci");
        if (rows.length == 0) {
            alert('请选择要保存的数据！')
            return;
        }
        $.each(rows, function (index, row) {
            $ajax({
                type: 'post',
                url: '/commodity_inci/insert',
                data: {
                    commodityId: commodity_id,
                    cas: row.cas,
                    content: row.content,
                    inciId: row.data.id,
                }
            }, false, '', function (res) {

            })
        })
        alert('添加成功！')

        $('#add-inci-modal').modal('hide');
        $ajax({
            type: 'post',
            url: '/commodity_inci/getListById',
            data: {
                id: commodity_id,
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setINCITable(res.data);
                $("#show-table-inci").bootstrapTable('hideColumn', 'id');
                $('#show-inci-modal').modal('show');
            } else {
                return;
            }
            console.log(res)
        })
        getList();

    })

    //点击删除按钮
    $('#inci-delete-btn').click(function () {
        var msg = confirm("确认要删除吗？")
        if (msg) {
            let rows = getTableSelection("#show-table-inci");
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
                url: '/commodity_inci/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    $ajax({
                        type: 'post',
                        url: '/commodity_inci/getListById',
                        data: {
                            id: commodity_id,
                        }
                    }, false, '', function (res) {
                        if (res.code == 200) {
                            setINCITable(res.data);
                            $("#show-table-inci").bootstrapTable('hideColumn', 'id');
                            $('#show-inci-modal').modal('show');
                        } else {
                            return;
                        }
                        console.log(res)
                    })
                }
            })
        }
        getList();
    })

    //新增标签
    $('#label-add-btn').click(function () {
        $('#add-modal-label').modal('show');
        gosearch();
    })

    //新增标签窗体关闭
    $('#add-close-btn-label').click(function () {
        $('#add-modal-label').modal('hide');
    })
    //CDialog::OnOk()
    //点击提交按钮

    function gosearch() {
        if (window.event.keyCode == 13) {
            search();
            return false;
        }
    }

    $('#add-submit-btn-label').click(function () {
        let params = formToJson("#add-form-label")
        let type = $('#add-type').val();
        let label1 = params.label1
        console.log(type + ' ' + label1)
        console.log(params)
        label1 = label1.split(',')
        console.log(label1)
        let this_params = []
        if (label1.length > 1) {
            for (let i = 0; i < label1.length; i++) {
                let this_params = {type: type, label1: label1[i]}
                $ajax({
                    type: 'post',
                    url: '/label/add',
                    data: JSON.stringify({
                        addInfo: this_params
                    }),
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    if (res.code == 200) {
                        if (i == label1.length - 1) {
                            alert(res.msg)
                            $('#add-form-label')[0].reset();
                            $('#add-type-label').val($.session.get
                            ('type'))
                            if (label_name != "物质标签") {
                                getLabelList();
                            } else {
                                $ajax({
                                    type: 'post',
                                    url: '/label/wuzhiList',
                                }, false, '', function (res) {
                                    if (res.code == 200) {
                                        setLabelTable(res.data);
                                        $('#show-label-modal').modal
                                        ('show');
                                    }
                                    console.log(res)
                                })
                            }
                        }
                    }
                })
            }
        } else {
            this_params = params
            $ajax({
                type: 'post',
                url: '/label/add',
                data: JSON.stringify({
                    addInfo: this_params
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg)
                if (res.code == 200) {
                    $('#add-form-label')[0].reset();
                    if (label_name != "物质标签") {
                        getLabelList();
                    } else {
                        $ajax({
                            type: 'post',
                            url: '/label/wuzhiList',
                        }, false, '', function (res) {
                            if (res.code == 200) {
                                setLabelTable(res.data);
                                $('#show-label-modal').modal('show');
                            }
                            console.log(res)
                        })
                    }
                }
            })
        }
    })

})

function fileShow(id) {
    $ajax({
        type: 'post',
        url: '/file_table/getList',
        data: {
            otherId: id,
            type: "原料商品",
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setShowFileTable(res.data);
            $('#show-file-modal').modal('show');
            otherId = id;
        } else {
            return;
        }
        console.log(res)
    })
}

function inciShow(id) {
    $ajax({
        type: 'post',
        url: '/commodity_inci/getListById',
        data: {
            id: id,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setINCITable(res.data);
            $("#show-table-inci").bootstrapTable('hideColumn', 'id');
            $('#show-inci-modal').modal('show');
            commodity_id = id;
        } else {
            return;
        }
        console.log(res)
    })

}

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
        pageSize: 15,//单页记录数
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
                width: 120,
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
                width: 80,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'inciPin',
                title: 'INCI中文名称及含量',
                align: 'center',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    // return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='" + row.id + "' style='text-decoration:underline;' onclick='javascript:inciShow(" + row.id + ")'>" + value + "</span></div>";
                }
            }, {
                field: 'chengbenPin',
                title: '原料成本',
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
                width: 130,
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
                width: 90,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'substanceLabel',
                title: '物质标签',
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
                field: 'solubility',
                title: '物理形态',
                align: 'center',
                sortable: true,
                width: 180,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: '',
                title: '目录画册',
                align: 'center',
                sortable: true,
                width: 120,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:fileShow(' + row.id + ')" class="btn-xs btn-primary">&nbsp;查看</button> '
                }
            }
            // ,{
            //     field: '',
            //     title: 'INCI信息',
            //     align: 'center',
            //     sortable: true,
            //     width: 200,
            //     formatter:function(value, row , index){
            //         return '<button onclick="javascript:inciShow(' + row.id + ')" class="btn btn-primary"><i class="bi bi-search"></i>&nbsp;查看</button> '
            //     }
            // },
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

function setCosmeticRawTable(data) {
    console.log(data)
    if ($('#show-table-essential').html() != '') {
        $('#show-table-essential').bootstrapTable('load', data);
        return;
    }
    $('#show-table-essential').bootstrapTable({
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
                field: 'brandCode',
                title: '品牌编码',
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
                field: 'website',
                title: '官网网址',
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

function setSupplierTable(data) {
    console.log(data)
    if ($('#show-table-supplier').html() != '') {
        $('#show-table-supplier').bootstrapTable('load', data);
        return;
    }
    $('#show-table-supplier').bootstrapTable({
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
                field: 'supplierCode',
                title: '供应商编码',
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
                field: 'type',
                title: '供应商分类',
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
                title: '供应商名称',
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
                field: 'url',
                title: '公司官网',
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


function setLabelTable(data) {
    console.log(data)
    if ($('#show-table-label').html() != '') {
        $('#show-table-label').bootstrapTable('load', data);
        return;
    }
    $('#show-table-label').bootstrapTable({
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
                field: 'type',
                title: '分类',
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
                field: 'label1',
                title: '标签1',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                },
                cellStyle: function (value, row, index) {
                    if (row.label1 == row.label2 || row.label1 == row.label3) {
                        return {css: {"background-color": "#f08080"}};
                    }
                    return '';
                }
            }
            // , {
            //     field: 'label2',
            //     title: '标签2',
            //     align: 'left',
            //     sortable: true,
            //     width: 100,
            //     formatter: function (value, row, index) {
            //         if(value == null || value == ''){
            //             value = '-'
            //         }
            //         return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
            //     },
            //     cellStyle: function (value, row, index) {
            //         if(row.label2==row.label1 || row.label2==row.label3){
            //             return {css: {"background-color": "#f08080"}};
            //         }
            //         return '';
            //     }
            // }, {
            //     field: 'label3',
            //     title: '标签3',
            //     align: 'left',
            //     sortable: true,
            //     width: 100,
            //     formatter: function (value, row, index) {
            //         if(value == null || value == ''){
            //             value = '-'
            //         }
            //         return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
            //     },
            //     cellStyle: function (value, row, index) {
            //         if(row.label3==row.label1 || row.label3==row.label2){
            //             return {css: {"background-color": "#f08080"}};
            //         }
            //         return '';
            //     }
            // }
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
    return new Blob([uInt8Array], {type: 'application/pdf'})
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

function setINCITable(data) {
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
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'chineseName',
                title: 'INCI名称/中文名称',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'englishName',
                title: 'INCI名称/英文名称',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'cas',
                title: 'CAS',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'content',
                title: '成分含量',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "%</div>";
                }
            }, {
                field: 'rinsingProducts',
                title: '淋洗类产品最高历史使用量（%）',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "%</div>";
                }
            }, {
                field: 'residentProducts',
                title: '驻留类产品最高历史使用量（%）',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "%</div>";
                }
            }, {
                field: 'rawRemarks',
                title: '原料目录备注',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'purpose',
                title: '主要使用目的',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'riskSubstance',
                title: '是否可能存在安全性风险物质',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'safetyRisk',
                title: '安全风险',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'safetyAssessment',
                title: 'CIR安全评估',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'id',
                title: 'id',
                align: 'left',
                sortable: true,
                width: 200,
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

function setINCIAddTable(data) {
    console.log(data)
    if ($('#add-table-inci').html() != '') {
        $('#add-table-inci').bootstrapTable('load', data);
        return;
    }
    $('#add-table-inci').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        // search: true,
        // searchAlign: 'left',
        clickToSelect: true,
        locale: 'zh-CN',
        columns: [
            {
                field: 'cas',
                title: 'CAS',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    return '<input type="text" class="form-control" />'
                }
            }, {
                field: 'content',
                title: '成分含量',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    return '<input type="number" class="form-control" />'
                }
            }, {
                field: 'serialNumber',
                title: '序号',
                align: 'center',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'chineseName',
                title: 'INCI名称/中文名称',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'englishName',
                title: 'INCI名称/英文名称',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'rinsingProducts',
                title: '淋洗类产品最高历史使用量（%）',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'residentProducts',
                title: '驻留类产品最高历史使用量（%）',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'rawRemarks',
                title: '原料目录备注',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'purpose',
                title: '主要使用目的',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'riskSubstance',
                title: '是否可能存在安全性风险物质',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'safetyRisk',
                title: '安全风险',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    if (value == null || value == '') {
                        value = '-'
                    }
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'>" + value + "</div>";
                }
            }, {
                field: 'id',
                title: 'id',
                align: 'left',
                sortable: true,
                width: 200,
                formatter: function (value, row, index) {
                    return index + 1;
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

function getRows(tableEl) {
    let result = [];
    let tableData = $(tableEl).bootstrapTable('getData');
    $(tableEl + ' tr').each(function (i, tr) {
        let cas = $(tr).children().first().children().val();
        let content = $(tr).children().eq(1).children().val();
        let index = $(tr).data('index');
        if (index != undefined) {
            if ($(tr).hasClass('selected')) {
                result.push({
                    index: index,
                    data: tableData[index],
                    cas: cas,
                    content: content
                })
            }
        }
    })
    return result;
}