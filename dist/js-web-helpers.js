'use strict';

var querystring = {
    getByName: function getByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};

var forms = {
    queryStringToForm: function queryStringToForm(inputSelector) {
        $(inputSelector).each(function () {
            var name = $(this).attr('name');
            var val = querystring.getByName(name);
            $('input[name="' + name + '"]').val(val);
        });
    }
};

var index = {
    forms: forms,
    querystring: querystring
};

module.exports = index;
