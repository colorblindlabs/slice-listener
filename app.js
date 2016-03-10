var app = angular.module('SliceListener', ['ui.materialize', 'pusher-angular'])
    .factory("service", ['$http', function($http) {
        var obj = {};
        obj.getAllOrders = function() {
            return $http.get('http://api.sliceapp.co:6588/get/orders');
        };
        obj.getOrder = function(number) {
            return $http.get('http://api.sliceapp.co:6588/get/order?id=' + number);
            //return $http.get('http://localhost:8080/admin/order/details?phone=' + phone + '&u=' + number);
        };
        return obj;
    }])
    .controller('ctrl', function($window, $scope, $rootScope, $pusher, service) {
        // Pusher notification /////////////////////
        var client = new Pusher('b7b402b4f6325e3561ed');
        var pusher = $pusher(client);
        var my_channel = pusher.subscribe('test_channel');
        my_channel.bind('my_event',
            function(push_data) {
                // show tooltip
                var $toastContent = $('<span>Incoming new order #' + push_data.message + '...</span>');
                Materialize.toast($toastContent, 5000);

                // save new order on scope
                $rootScope.order = push_data.data;

                // Printing handler goes here
                console.log(push_data.data);
                // -- codes ---
            }
        );
        // eof pusher notification //////////////////

        // INITIAL LOAD ORDERS 
        $rootScope.allOrders = [];
    });
