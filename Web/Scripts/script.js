var appInsights = window.appInsights || function (config) {
	function r(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } }
	var t = { config: config }, u = document, e = window, o = 'script', s = u.createElement(o), i, f; for (s.src = config.url || '//az416426.vo.msecnd.net/scripts/a/ai.0.js', u.getElementsByTagName(o)[0].parentNode.appendChild(s), t.cookie = u.cookie, t.queue = [], i = ['Event', 'Exception', 'Metric', 'PageView', 'Trace', 'Ajax']; i.length;)r('track' + i.pop()); return r('setAuthenticatedUserContext'), r('clearAuthenticatedUserContext'), config.disableExceptionTracking || (i = 'onerror', r('_' + i), f = e[i], e[i] = function (config, r, u, e, o) { var s = f && f(config, r, u, e, o); return s !== !0 && t['_' + i](config, r, u, e, o), s }), t
}({
	instrumentationKey: '44438517-e81d-4eef-936e-7c8a8db0d270'
});

window.appInsights = appInsights;
appInsights.trackPageView();
    
$("#companyIdSubmit").click(function () {
        var $orders = $('#orders');
        var $companyId = $('#companyId').val();
        $.ajax({
            'url': '/api/order',
            'type': 'GET',
            'data': { id: $companyId},
            'success': function (data) {


                if (data.length>0) {
                    var $orderList = $('<ul/>');

                    $.each(data,
                        function (i) {
                            var $li = $('<li/>').text(this.Description + ' (Total: $' + this.OrderTotal + ')')
                                .appendTo($orderList);

                            var $productList = $('<ul/>');

                            $.each(this.OrderProducts, function (j) {
                                var $li2 = $('<li/>').text(this.Product.Name + ' (' + this.Quantity + ' @@ $' + this.Price + '/ea)')
                                    .appendTo($productList);
                            });

                            $productList.appendTo($li);
                        });

                    $orders.html($orderList);
                }
                else {

                    var $noData = $("<p class='no-data'/>").text("Oops: Looks like we couldn't find orders for your company");
                    $orders.html($noData);
                }
            }
        });
    });