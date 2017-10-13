import _ from 'lodash';
import '../assets/scss/style.scss';

var $ = require('jquery');

// create global $ and jQuery variables
global.$ = global.jQuery = $;

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

$('.content').append(component());