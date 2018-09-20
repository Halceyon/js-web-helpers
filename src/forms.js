
import querystring from './querystring';

export default {
    queryStringToForm: (inputSelector) => {
        $(inputSelector).each(function () {
            var name = $(this).attr('name');
            var val = querystring.getByName(name);
            $('input[name="' + name + '"]').val(val);
            console.log(val);            
        });
    }
}
