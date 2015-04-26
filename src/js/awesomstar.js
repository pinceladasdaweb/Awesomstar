/*jslint browser: true*/
/*global define, module, exports*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Awesomstar = factory();
    }
}(this, function () {
    'use strict';

    var Awesomstar = function () {
        if (!this || !(this instanceof Awesomstar)) {
            return new Awesomstar();
        }

        this.rating   = document.querySelectorAll('.rating');
        this.stars    = document.querySelectorAll('.star');
        this.endpoint = '../api/rate.php';
        this.defaults = {};

        this.vote();
    };

    Awesomstar.init = function () {
        return new Awesomstar();
    };

    Awesomstar.prototype = {
        post: function (path, data, callback) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status > 400) {
                        throw new Error(this.status + " - " + this.statusText);
                    }
                }
            };
            xhttp.send(data);
            xhttp = null;
        },
        param: function (obj) {
            var encodedString = '',
                prop;

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (encodedString.length > 0) {
                        encodedString += '&';
                    }
                    encodedString += encodeURI(prop + '=' + obj[prop]);
                }
            }

            return encodedString;
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

                    this.post(this.endpoint, this.param(this.defaults));
                }.bind(this));
            }.bind(this));
        }
    };

    return Awesomstar;
}));