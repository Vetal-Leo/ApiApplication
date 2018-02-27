
var app = angular.module('apiApplication', []);

//There are rows of the table.
var rows;
app.controller('statisticCtrl', function ($scope, $http) {

    //Getting all statistics.
    function GetStatistic() {
        $http({
            method: 'GET',
            url: '/api/statistic',
            contentType: "application/json",
        }).then(function success(response) {
            items = response.data;
            rows = "";
            var count = 0;
            $.each(items, function (index, item) {
                //adding items to a table.
                rows += row(item);
                count++;
            })
            $(".statistictable").append(rows);
            Pagination(3, "#statisticcontent", "#statisticControls", "fist");
        });
    }

    //Row for table.
    var row = function (statistic) {
        return "<tr><td>" + statistic.itemType + "</td>" +
            "<td>" + statistic.count + "</td></tr>";
    }

    //Getting Statistics.
    GetStatistic();
});
