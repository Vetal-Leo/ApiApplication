
var app = angular.module('apiApplication', []);

app.controller('statisticCtrl', function ($scope, $http) {

    //Getting all statistics.
    function GetStatistic() {
        $http({
            method: 'GET',
            url: '/api/statistic',
            contentType: "application/json",
        }).then(function success(response) {
            statistics = response.data;
            var rows = "";
            $.each(statistics, function (index, statistic) {
                //adding items to a table.
                rows += row(statistic);
            })
            $(".statistictable").append(rows);
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
