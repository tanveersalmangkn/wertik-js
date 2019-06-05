System.register(["./../../../framework/graphql/getListByPaginationAndFiltersSchema"], function (exports_1, context_1) {
    "use strict";
    var getListByPaginationAndFiltersSchema_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getListByPaginationAndFiltersSchema_1_1) {
                getListByPaginationAndFiltersSchema_1 = getListByPaginationAndFiltersSchema_1_1;
            }
        ],
        execute: function () {
            exports_1("default", "\n\ttype Permission {\n\t\t_id: String\n\t\tid: Int\n\t\taction: String\n\t\tsuccessMessage: String\n\t\tsuccessMessageType: String\n\t\tcreated_by: User\n\t\tcreated_at: String\n\t\tupdated_at: String\n\t}\n\t" + getListByPaginationAndFiltersSchema_1["default"]("Permission") + "\n\tinput PermissionInput {\n\t\t_id: String\n\t\tid: Int\n\t\taction: String\n\t}\n");
        }
    };
});
//# sourceMappingURL=schema.js.map