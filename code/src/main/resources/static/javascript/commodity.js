var operation = ""
var label_name = ""
var this_column = ""
var this_id = ""

function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/commodity/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
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
        url: '/supplier/queryList',
        data:{
            query: ''
        }
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
        data:{
            type: label_name
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setLabelTable(res.data);
            $('#show-label-modal').modal('show');
        }
        console.log(res)
    })
}

$(function () {
    //刷新
    getList();

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
        for(var i=0;i<=4;i=i+2){
            if(this_arr[i] != ''){
                this_num = this_num + 1
                if(this_str2 == ''){
                    this_str2 = this_arr[i] + "`" + this_arr[i+1]
                }else{
                    this_str2 = this_str2 + "`" + this_arr[i] + "`" + this_arr[i+1]
                }
            }
        }

        var this_arr2 = this_str2.split("`")

        if(this_num == 0){
            $ajax({
                type: 'post',
                url: '/commodity/getList',
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        }else if(this_num == 1){
            $ajax({
                type: 'post',
                url: '/commodity/queryList1',
                data:{
                    column_name1:this_arr[0],
                    condition1:this_arr[1]
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        }else if(this_num == 2){
            $ajax({
                type: 'post',
                url: '/commodity/queryList2',
                data:{
                    column_name1:this_arr[0],
                    condition1:this_arr[1],
                    column_name2:this_arr[2],
                    condition2:this_arr[3],
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        }else if(this_num == 3){
            $ajax({
                type: 'post',
                url: '/commodity/queryList3',
                data:{
                    column_name1:this_arr[0],
                    condition1:this_arr[1],
                    column_name2:this_arr[2],
                    condition2:this_arr[3],
                    column_name3:this_arr[4],
                    condition3:this_arr[5],
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data);
                }
            })
        }




    })

    $("#select-btn2").click(function () {
        var query=$('#query').val()
        $ajax({
            type: 'post',
            url: '/cir_security/preciseQueryList',
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
            url: '/commodity/add',
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
                        this_ajax_url = '/commodity/up1'
                    }else{
                        this_ajax_url = '/commodity/up2'
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

    //添加窗体点击溶解性文本框
    $("#add-solubility").click(function () {
        operation = "添加";
        label_name = "溶解性"
        getLabelList();
    })

    //添加窗体点击外观文本框
    $("#add-appearance").click(function () {
        operation = "添加";
        label_name = "外观"
        getLabelList();
    })

    //添加窗体点击气味文本框
    $("#add-smell").click(function () {
        operation = "添加";
        label_name = "气味"
        getLabelList();
    })

    //添加窗体点击物质标签文本框
    $("#add-substanceLabel").click(function () {
        operation = "添加";
        label_name = "物质标签"
        getLabelList();
    })

    //添加窗体点击功效标签文本框
    $("#add-efficacyLabel").click(function () {
        operation = "添加";
        label_name = "功效标签"
        getLabelList();
    })

    //添加窗体点击原料标签文本框
    $("#add-rawLabel").click(function () {
        operation = "添加";
        label_name = "原料标签"
        getLabelList();
    })


    //修改窗体点击溶解性文本框
    $("#update-solubility").click(function () {
        operation = "修改";
        label_name = "溶解性"
        getLabelList();
    })

    //修改窗体点击外观文本框
    $("#update-appearance").click(function () {
        operation = "修改";
        label_name = "外观"
        getLabelList();
    })

    //修改窗体点击气味文本框
    $("#update-smell").click(function () {
        operation = "修改";
        label_name = "气味"
        getLabelList();
    })

    //修改窗体点击物质标签文本框
    $("#update-substanceLabel").click(function () {
        operation = "修改";
        label_name = "物质标签"
        getLabelList();
    })

    //修改窗体点击功效标签文本框
    $("#update-efficacyLabel").click(function () {
        operation = "修改";
        label_name = "功效标签"
        getLabelList();
    })

    //修改窗体点击原料标签文本框
    $("#update-rawLabel").click(function () {
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
                    if (row.data.label1 != '' && row.data.label1 != null){
                        if(this_str == ''){
                            this_str = row.data.label1
                        }else{
                            this_str = this_str + "、" + row.data.label1
                        }
                    }
                    if (row.data.label2 != '' && row.data.label2 != null){
                        if(this_str == ''){
                            this_str = row.data.label2
                        }else{
                            this_str = this_str + "、" + row.data.label2
                        }
                    }
                    if (row.data.label3 != '' && row.data.label3 != null){
                        if(this_str == ''){
                            this_str = row.data.label3
                        }else{
                            this_str = this_str + "、" + row.data.label3
                        }
                    }
                })
                if(label_name == '溶解性'){
                    $("#add-solubility").val(this_str);
                }else if(label_name == '外观'){
                    $("#add-appearance").val(this_str);
                }else if(label_name == '气味'){
                    $("#add-smell").val(this_str);
                }else if(label_name == '物质标签'){
                    $("#add-substanceLabel").val(this_str);
                }else if(label_name == '功效标签'){
                    $("#add-efficacyLabel").val(this_str);
                }else if(label_name == '原料标签'){
                    $("#add-rawLabel").val(this_str);
                }
                $('#show-label-modal').modal('hide');
            }
            operation = "";
        } else if (operation == "修改") {
            this_str = ''
            let rows = getTableSelection("#show-table-label");
            $.each(rows, function (index, row) {
                if (row.data.label1 != '' && row.data.label1 != null){
                    if(this_str == ''){
                        this_str = row.data.label1
                    }else{
                        this_str = this_str + "、" + row.data.label1
                    }
                }
                if (row.data.label2 != '' && row.data.label2 != null){
                    if(this_str == ''){
                        this_str = row.data.label2
                    }else{
                        this_str = this_str + "、" + row.data.label2
                    }
                }
                if (row.data.label3 != '' && row.data.label3 != null){
                    if(this_str == ''){
                        this_str = row.data.label3
                    }else{
                        this_str = this_str + "、" + row.data.label3
                    }
                }
            })
            if(label_name == '溶解性'){
                $("#update-solubility").val(this_str);
            }else if(label_name == '外观'){
                $("#update-appearance").val(this_str);
            }else if(label_name == '气味'){
                $("#update-smell").val(this_str);
            }else if(label_name == '物质标签'){
                $("#update-substanceLabel").val(this_str);
            }else if(label_name == '功效标签'){
                $("#update-efficacyLabel").val(this_str);
            }else if(label_name == '原料标签'){
                $("#update-rawLabel").val(this_str);
            }
            $('#show-label-modal').modal('hide');
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
                field: 'rawCode',
                title: '原料编码',
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
                field: 'goodsName',
                title: '商品名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'rawSubmissionCode',
                title: '原料报送码',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'productionPlace',
                title: '产地',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'brandName',
                title: '品牌名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'abbreviation',
                title: '供应商简称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'substanceLabel',
                title: '物质标签',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'inciPin',
                title: 'inci中文名称及含量',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'wuliPin',
                title: '物理形态',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'chengbenPin',
                title: '原料成本',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'pdf1',
                title: '目录画册1',
                align: 'left',
                sortable: true,
                width: 300,
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
                field: 'pdf2',
                title: '目录画册2',
                align: 'left',
                sortable: true,
                width: 300,
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
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'productionPlace',
                title: '产地',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'brandName',
                title: '品牌名称',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'website',
                title: '官网网址',
                align: 'left',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return [
                        "<a href=\"" + value + "\">" + value + "</a>"
                    ].join("")
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
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
                    if(value == null || value == ''){
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
                    if(value == null || value == ''){
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
                    if(value == null || value == ''){
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
                    if(value == null || value == ''){
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
                    if(value == null || value == ''){
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
                    if(value == null || value == ''){
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
                    if(value == null || value == ''){
                        value = '-'
                    }
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
                    if(value == null || value == ''){
                        value = '-'
                    }
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
                    if(value == null || value == ''){
                        value = '-'
                    }
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
        url: '/commodity/getFile',
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

function pdf_download2(id){
    $ajax({
        type: 'post',
        url: '/commodity/getFile',
        data: {
            id:id,
        },
    }, false, '', function (res) {
        if(res.data[0].pdf2!='' && res.data[0].pdf2!=null){
            //var file=res.data[0].pdf2Name+getBase64Type(res.data[0].pdf1.split(',')[0]);
            downloadFileByBase64(res.data[0].pdf2Name,res.data[0].pdf2.split(',')[1])
        }
    })
}