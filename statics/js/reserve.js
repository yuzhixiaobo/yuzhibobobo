define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'reserve/index' + location.search,
                    add_url: 'reserve/add',
                    //edit_url: 'reserve/edit',
                    del_url: 'reserve/del',
                    multi_url: 'reserve/multi',
                    import_url: 'reserve/import',
                    table: 'reserve',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                //启用固定列
                fixedColumns: true,
                //固定列数
                fixedRightNumber: 2,
                //列宽
                fixedNumberWidth:100,
                //搜索
                search:false,
                commonSearch:true,
                searchFormVisible:true,
                searchFormTemplate:'mysearch',
                columns: [
                    [
                        {checkbox: true},
                        /*{field: 'id', title: __('Id')},*/
                        {field: 'XTBHtext', title: __('Xtbhtext'), operate: 'LIKE',visible:false},
                        {field: 'nametext', title: __('Nametext'), operate: 'LIKE'},
                        {field: 'studentnotext', title: __('Studentnotext'), operate: 'LIKE'},
                        {field: 'phonetext', title: __('Phonetext'), operate: 'LIKE'},
                        {field: 'reasontext', title: __('Reasontext'), operate: 'LIKE',
                        formatter : function(value, row, index, field){
                            return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='请假原因'>" + value + "</span>";
                        },
                        cellStyle : function(value, row, index, field){
                            return {
                                css: {
                                    "white-space": "nowrap",
                                    "text-overflow": "ellipsis",
                                    "overflow": "hidden",
                                    "max-width":"150px"
                                }
                            };
                        }

                        },
                        {field: 'destinationtext', title: __('Destinationtext'), operate: 'LIKE',
                        formatter : function(value, row, index, field){
                            return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='目的地'>" + value + "</span>";
                        },
                        cellStyle : function(value, row, index, field){
                            return {
                                css: {
                                    "white-space": "nowrap",
                                    "text-overflow": "ellipsis",
                                    "overflow": "hidden",
                                    "max-width":"150px"
                                }
                            };
                        }
                        },
                        {field: 'academytext', title: __('Academytext'), operate: 'LIKE'},
                        {field: 'outtimetext', title: __('Outtimetext'), operate: 'LIKE'},
                        {field: 'backtimetext', title: __('Backtimetext'), operate: 'LIKE'},
                        /*{field: 'picturetext', title: __('Picturetext'), operate: 'LIKE'},
                        {field: 'supporttext', title: __('Supporttext'), operate: 'LIKE'},*/
                        {field: 'ctime', title:"申请时间", operate: 'LIKE'},
                        {field: 'verifier1text', title: "当前状态", operate: 'LIKE',
                        formatter : function(value, row, index, field){
                            if(value=="待审批"){
                                return "<span style='color:#E6A23C;'>" + value + "</span>";
                            }
                            if(value=="审批通过"){
                                return "<span style='color:#67C23A;'>" + value + "</span>";
                            }
                            if(value=="不通过"){
                                return "<span style='color:#F56C6C;'>" + value + "</span>";
                            }
                            if(value=="已取消"){
                                return "<span style='color:#909399;'>" + value + "</span>";
                            }

                        },
                        },
                        /*{field: 'verifier2text', title: __('Verifier2text'), operate: 'LIKE'},
                        {field: 'verifier3text', title: __('Verifier3text'), operate: 'LIKE'},*/
                        /*{field: 'verifier1suggestiontext', title:"审批意见", operate: 'LIKE'},*/

                        /*{field: 'verifier2suggestiontext', title: __('Verifier2suggestiontext'), operate: 'LIKE'},
                        {field: 'verifier3suggestiontext', title: __('Verifier3suggestiontext'), operate: 'LIKE'},*/
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,

                        buttons: [
                            {
                                name: 'zidingyi',
                                text: __('审批'),
                                title: __('审批'),
                                classname: 'btn btn-xs btn-primary btn-dialog',
                                icon: 'fa fa-check',
                                url: 'reserve/myedit',
                                visible: function (row) {
                                    //返回true时按钮显示,返回false隐藏
                                    return true;
                                }
                            }
                        ]




                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },

        myadd: function () {
            Controller.apii.bindevent();
        },

        add: function () {
            Controller.api.bindevent();
        },
        myedit: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        },
        ss:{
            bindevent: function () {
                console.log("会执行这段代码吗?")
                Form.api.bindevent(
                    $("form[role=form]"), function(){
                        alert("预约成功，等待审核");

                    }

                );
            }
        },
        apii:{
            bindevent: function () {
                console.log("会执行这段代码吗?")
                Form.api.bindevent(
                    $("form[role=form]"), function(){
                        alert("预约成功，等待审核");
                        window.history.back();
                    }

                );
            }
        }
    };
    return Controller;
});