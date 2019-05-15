define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

	var Controller = {
		index: function () {
			// 初始化表格参数配置
			Table.api.init({
				extend: {
					index_url: 'tablemake/index',
					add_url: 'tablemake/add',
					edit_url: 'tablemake/edit',
					del_url: 'tablemake/del',
					multi_url: 'tablemake/multi',
					table: 'tablemake_tables',
				}
			});
			var table = $("#table");

			// 初始化表格
			table.bootstrapTable({
				url: $.fn.bootstrapTable.defaults.extend.index_url,
				pk: 'id',
				sortName: 'weigh',
				columns: [
					[
						{checkbox: true},
						{field: 'id', title: __('Id')},
						{field: 'name', title: "模型名称"},
						{field: 'table', title: "模型表名", formatter: function (value, row, index) {
								return '' + value;
							}},
						{field: 'desc', title: "模型描述"},
						{field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', formatter: Table.api.formatter.datetime},
						{
							field: 'operate',
							title: __('Operate'),
							buttons: [
								{
									name: 'fields',
									title: "字段管理",
									text: "字段管理",
									extend: "data-area='[\"\90%\"\,\"\90%\"\]'",
									url: 'tablemake/fields',
									icon: 'fa fa-table',
									classname: 'btn btn-info btn-xs btn-execute btn-dialog'
								},
										/*
										 {
										 name: 'tableedit',
										 text: __(''),
										 title: "编辑模型",
										 //extend: "data-area='[\"\70%\"\,\"\70%\"\]'",
										 url: 'tablemake/edit',
										 icon: 'fa fa-pencil',
										 classname: 'btn btn-xs btn-success  btn-execute  btn-dialog',
										 //classname: 'btn btn-xs btn-success btn-editone  btn-dialog',
										 //classname: 'btn btn-info btn-xs btn-execute btn-dialog'
										 },
										 
										 {
										 name: 'tabledel',
										 text: __(''),
										 title: __('删除表'),
										 classname: 'btn btn-xs btn-danger  btn-magic  btn-ajax',
										 //classname: 'btn btn-xs btn-success btn-magic btn-ajax',
										 //classname: 'btn btn-info btn-xs btn-execute btn-dialog',
										 icon: 'fa fa-trash',
										 url: 'tablemake/del',
										 refresh:true,
										 confirm: '删除表之前，可先删除控制器对应菜单，再根据表删除CRUD；表删除后不可恢复，表内数据也会丢失！',
										 callback : function (data, ret) {
										 console.log("hello1");
										 console.log(data, ret);
										 },
										 success: function (data, ret) {
										 console.log("hello2");
										 console.log(data, ret);
										 Layer.alert(ret.msg + ",返回数据：" + JSON.stringify(data));
										 //如果需要阻止成功提示，则必须使用return false;
										 //return false;
										 },
										 error: function (data, ret) {
										 console.log(data, ret);
										 Layer.alert(ret.msg);
										 return false;
										 }
										 },*/
							],
							table: table,
							events: Table.api.events.operate,
							formatter: Table.api.formatter.operate
						}
						//{field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
					]
				]
			});

			// 绑定TAB事件
			$('.panel-heading a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				var field = $(this).closest("ul").data("field");
				var value = $(this).data("value");
				var options = table.bootstrapTable('getOptions');
				options.pageNumber = 1;
				options.queryParams = function (params) {
					var filter = {};
					if (value !== '') {
						filter[field] = value;
					}
					params.filter = JSON.stringify(filter);
					return params;
				};
				table.bootstrapTable('refresh', {});
				return false;
			});

			// 为表格绑定事件
			Table.api.bindevent(table);
		},
		add: function () {
			Controller.api.bindevent();
		},
		edit: function () {
			Controller.api.bindevent();
		},
		api: {
			bindevent: function () {
				Form.api.bindevent($("form[role=form]"));
			}},
		fields: function (data) {
			// 初始化表格参数配置
			//console.log(ids)
			var ids = $("#assign-data-ids").val();

			Table.api.init({
				extend: {
					index_url: 'tablemake/fields/ids/' + ids,
					add_url: 'tablemake/field_add/mid/' + ids,
					edit_url: 'tablemake/field_edit',
					del_url: 'tablemake/field_del',
					table: 'tablemake_fields',
				}
			});

			var table = $("#table");
			// 初始化表格
			table.bootstrapTable({
				url: $.fn.bootstrapTable.defaults.extend.index_url,
				pk: 'id',
				sortName: 'weigh',
				columns: [
					[
						{checkbox: true},
						{field: 'id', title: __('Id')},
						{field: 'mid', title: '模型ID'},
						{field: 'title', title: "字段标题 "},
						{field: 'field', title: "字段名称"},
						{field: 'type', title: "字段类型"},
						{field: 'length', title: "字段长度"},
						{field: 'default', title: "默认值"},
						{field: 'comment', title: "备注说明"},
						{field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', formatter: Table.api.formatter.datetime},
						{
							field: 'operate',
							title: __('Operate'),
							table: table,
							events: Table.api.events.operate,
							formatter: Table.api.formatter.operate
						}
						//{field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
					]
				]
			});

			// 绑定TAB事件
			$('.panel-heading a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				var field = $(this).closest("ul").data("field");
				var value = $(this).data("value");
				var options = table.bootstrapTable('getOptions');
				options.pageNumber = 1;
				options.queryParams = function (params) {
					var filter = {};
					if (value !== '') {
						filter[field] = value;
					}
					params.filter = JSON.stringify(filter);
					return params;
				};
				table.bootstrapTable('refresh', {});
				return false;
			});
			// 为表格绑定事件
			Table.api.bindevent(table);
		},
		field_add: function () {
			Controller.api.bindevent();
			$(".field-category").on("click", function (e) {
				var _value = $(this).val();
				var required = $(this).attr("data-required");
				var required_list = required.split(",");
				$("#field-suffix").val("");
				$("#field-type").val("");
				$(".form-input").hide();
				$(".form-input input").attr("disabled", "disabled");
				$(".form-input input").attr("readonly", "readonly");
				for (let value of required_list) {
					$(".form-input-" + value).show();
					$(".form-input-" + value + " input").attr("disabled", false);
					$(".form-input-" + value + " input").attr("readonly", false);
				}
			});
			$(".form-selection").on("change", function (e) {
				var _value = $(this).val();

				if (_value == "list-enum" || _value == "list-set" || _value == "data-enum" || _value == "data-set" || _value == "enum" || _value == "set") {
					$(".form-input-comment").show();
					$(".form-input-comment input").attr("disabled", false);
					$(".form-input-comment input").attr("readonly", false);
				} else {
					$(".form-input-comment").hide();
					$(".form-input-comment input").attr("disabled", "disabled");
					$(".form-input-comment input").attr("readonly", "readonly");
				}
			});

			$("#field-suffix").on("change", function (e) {
				var _value = $(this).val();
				if (_value == "content") {
					$("#row-length").attr("disabled", "disabled");
					$("#row-default").attr("disabled", "disabled");
				} else {
					$("#row-length").attr("disabled", false);
					$("#row-default").attr("disabled", false);
				}
			});
			$("#field-type").on("change", function (e) {
				var _value = $(this).val();
				if (_value == "text" || _value == "datetime" || _value == "date" || _value == "year" || _value == "timestamp") {
					$("#row-length").attr("disabled", "disabled");
					$("#row-default").attr("disabled", "disabled");
				} else {
					$("#row-length").attr("disabled", false);
					$("#row-default").attr("disabled", false);
				}
			});
			$(".field-category:checked").click();
		},
		field_edit: function () {

			Controller.api.bindevent();
			$(".field-category").on("click", function (e) {
				var _value = $(this).val();
				var required = $(this).attr("data-required");
				var required_list = required.split(",");
				$(".form-input").hide();
				$(".form-input input").attr("disabled", "disabled");
				$(".form-input input").attr("readonly", "readonly");
				for (let value of required_list) {
					$(".form-input-" + value).show();
					$(".form-input-" + value + " input").attr("disabled", false);
					$(".form-input-" + value + " input").attr("readonly", false);
				}

				//初始化键值对选项
				var suffix_value = $("#field-suffix").val();
				var type_value = $("#field-type").val();
				if (suffix_value == "list-enum" || suffix_value == "list-set" || suffix_value == "data-enum" || suffix_value == "data-set" || type_value == "enum" || type_value == "set") {
					$(".form-input-comment").show();
					$(".form-input-comment input").attr("disabled", false);
					$(".form-input-comment input").attr("readonly", false);
				} else {
					$(".form-input-comment").hide();
					$(".form-input-comment input").attr("disabled", "disabled");
					$(".form-input-comment input").attr("readonly", "readonly");
				}

				//后缀选项
				if (suffix_value == "content") {
					$("#row-length").attr("disabled", "disabled");
					$("#row-default").attr("disabled", "disabled");
				} else {
					$("#row-length").attr("disabled", false);
					$("#row-default").attr("disabled", false);
				}

				//类型选项
				
				if (type_value == "text" || type_value == "datetime" || type_value == "date" || type_value == "year" || type_value == "timestamp") {
					$("#row-length").attr("disabled", "disabled");
					$("#row-default").attr("disabled", "disabled");
				} else {
					$("#row-length").attr("disabled", false);
					$("#row-default").attr("disabled", false);
				}

			});
			$(".form-selection").on("change", function (e) {
				var _value = $(this).val();

				if (_value == "list-enum" || _value == "list-set" || _value == "data-enum" || _value == "data-set" || _value == "enum" || _value == "set") {
					$(".form-input-comment").show();
					$(".form-input-comment input").attr("disabled", false);
					$(".form-input-comment input").attr("readonly", false);
				} else {
					$(".form-input-comment").hide();
					$(".form-input-comment input").attr("disabled", "disabled");
					$(".form-input-comment input").attr("readonly", "readonly");
				}
			});

			$("#field-suffix").on("change", function (e) {
				var _value = $(this).val();
				if (_value == "content") {
					$("#row-length").attr("disabled", "disabled");
					$("#row-default").attr("disabled", "disabled");
				} else {
					$("#row-length").attr("disabled", false);
					$("#row-default").attr("disabled", false);
				}
			});
			$("#field-type").on("change", function (e) {
				var _value = $(this).val();
				if (_value == "text" || _value == "datetime" || _value == "date" || _value == "year" || _value == "timestamp") {
					$("#row-length").attr("disabled", "disabled");
					$("#row-default").attr("disabled", "disabled");
				} else {
					$("#row-length").attr("disabled", false);
					$("#row-default").attr("disabled", false);
				}
			});
			$(".field-category:checked").click();
		},
	};
	return Controller;
});