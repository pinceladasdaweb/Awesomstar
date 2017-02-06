/*jslint browser: true, debug: true*/
/*global define, module, exports*/
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Awesomstar = factory();
    }
}(this, function () {
    'use strict';

    var Awesomstar = function (options) {
        if (!options) {
            console.log('%c Missing options', 'background: red; color: white');
            return;
        }

        this.rating   = document.querySelectorAll('.rating');
        this.stars    = document.querySelectorAll('.star');
        this.callback = options.callback || function () {};
        this.endpoint = options.endpoint;
        this.defaults = {};

        if (!this.endpoint) {
            console.warn('Awesomstar: Please pass a valid endpoint')
            return;
        }

        this.vote();
    };

    Awesomstar.prototype = {
        post: function (path, data, success, failure) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                        var response = JSON.parse(this.responseText);

                        success.call(this, response);
                    } else {
                        failure.call(this, this.responseText);
                    }
                }
            };
            xhttp.send(data);
            xhttp = null;
        },
        param: function (data) {
            var params = typeof data === 'string' ? data : Object.keys(data).map(
                function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); }
            ).join('&');

            return params;
        },
        set: function () {
            Array.prototype.map.call(this.rating, function (rating) {
                var ratingVal = rating.getAttribute('data-rating-val');

                if (!ratingVal || ratingVal === 0) {
                    return;
                }
                rating.querySelectorAll('input')[ratingVal - 1].setAttribute('checked', 'checked');
            });
        },
        vote: function () {
            this.set();

            Array.prototype.map.call(this.stars, function (star) {
                star.addEventListener('click', function () {
                    this.defaults = {
                        id: star.parentNode.getAttribute('data-rating-id'),
                        rating: star.getAttribute('value')
                    };

                    star.parentNode.setAttribute('data-rating-val', this.defaults.rating);

                    this.post(this.endpoint, this.param(this.defaults), this.callback, this.fail);
                }.bind(this), false);
            }.bind(this));
        },
        fail: function (err) {
            console.log(err);
        }
    };

    return Awesomstar;
}));