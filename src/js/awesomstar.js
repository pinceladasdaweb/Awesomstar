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
            options = {};
        }

        this.rating   = document.querySelectorAll('.rating');
        this.stars    = document.querySelectorAll('.star');
        this.callback = options.callback || function () {};
        this.endpoint = '../api/rate.php';
        this.defaults = {};

        this.vote();
    };

    Awesomstar.prototype = {
        post: function (path, data, callback) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        var response = '';
                        try {
                            response = JSON.parse(this.responseText);
                        } catch (err) {
                            response = this.responseText;
                        }
                        callback.call(window, response);
                    } else {
                        throw new Error(this.status + " - " + this.statusText);
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
        each: function (els, callback) {
            var i = 0, max = els.length;
            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        set: function () {
            this.each(this.rating, function (rating) {
                var ratingVal = rating.getAttribute('data-rating-val');

                if (!ratingVal || ratingVal === 0) {
                    return;
                }
                rating.querySelectorAll('input')[ratingVal - 1].setAttribute('checked', 'checked');
            });
        },
        vote: function () {
            this.set();

            this.each(this.stars, function (star) {
                star.addEventListener('click', function () {
                    this.defaults = {
                        id: star.parentNode.getAttribute('data-rating-id'),
                        rating: star.getAttribute('value')
                    };

                    star.parentNode.setAttribute('data-rating-val', this.defaults.rating);

                    this.post(this.endpoint, this.param(this.defaults), this.callback);
                }.bind(this), false);
            }.bind(this));
        }
    };

    return Awesomstar;
}));