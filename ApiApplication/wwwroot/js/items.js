
var app = angular.module('apiApplication', []);

app.controller('itemsCtrl', function ($scope, $http) {

    //Getting all items.
    function GetItems() {
        $http({
            method: 'GET',
            url: '/api/items',
            contentType: "application/json",
        }).then(function success(response) {
            items = response.data;
            var rows = "";
            $.each(items, function (index, item) {
                //adding items to a table.
                rows += row(item);
            })
            $(".itemtable").append(rows);
        });
    }

    //Adding item
    function CreateItem(itemname, itemtype) {
        $http({
            method: 'POST',
            url: '/api/items',
            contentType: "application/json",
            data: JSON.stringify({
                ItemName: itemname,
                ItemType: itemtype
            }),
        }).then(function success(response) {
            item = response.data;
            reset();
            $(".itemtable").append(row(item));
        });
    }

    //Getting one item from the database.
    function GetItem(id) {
        $http({
            method: 'GET',
            url: '/api/items/' + id,
            contentType: "application/json",
        }).then(function success(response) {
            item = response.data;
            var form = document.forms["itemForm"];
            form.elements["id"].value = item.id;
            form.elements["itemname"].value = item.itemName;
            form.elements["itemtype"].value = item.itemType;
        });
    }

    //Changes items.
    function EditItem(itemid, itemname, itemtype) {
        $http({
            method: 'Put',
            url: '/api/items',
            contentType: "application/json",
            data: JSON.stringify({
                id: itemid,
                ItemName: itemname,
                ItemType: itemtype
            }),
        }).then(function success(response) {
            item = response.data;
            reset();
            $("tr[data-rowid='" + item.id + "']").replaceWith(row(item));
        });
    }

    // Delete item.
    function DeleteItem(id) {
        $http({
            method: 'DELETE',
            url: '/api/items/' + id,
            contentType: "application/json",
        }).then(function success(response) {
            item = response.data;
            $("tr[data-rowid='" + item.id + "']").remove();
        });
    }


    //Row for table.
    var row = function (item) {
        return "<tr data-rowid='" + item.id + "'><td>" + item.itemName + "</td>" +
            "<td>" + item.itemType + "</td>" +
            "<td><a class='editLink' data-id='" + item.id + "'>edit</a>  " +
            "<a class='removeLink' data-id='" + item.id + "'>delete</a></td></tr>";
    }

    // Form submission.
    $("form").submit(function (e) {
        e.preventDefault();
        var id = this.elements["id"].value;
        var itemname = this.elements["itemname"].value;
        var itemtype = this.elements["itemtype"].value;
        if (id == 0)
            CreateItem(itemname, itemtype);
        else
            EditItem(id, itemname, itemtype);
    });

    // Сlick edit.
    $("body").on("click", ".editLink", function () {
        var id = $(this).data("id");
        GetItem(id);
    })

    // Сlick delete.
    $("body").on("click", ".removeLink", function () {
        var id = $(this).data("id");
        DeleteItem(id);
    })

    // Dropping a form.
    function reset() {
        var form = document.forms["itemForm"];
        form.reset();
        form.elements["id"].value = 0;
    }

    //Getting items.
    GetItems()
});

