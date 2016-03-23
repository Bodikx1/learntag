var LearnTag = function () {

    function init(element) {

        this.build = function(type, dataObj) {
            var html = '',
                mProgress = 0;

            switch (type) {
                case '000-display-vocabulary-with-image':
                    var items = '';

                    for(var i=0; i < dataObj.data.length; i++) {
                        items += '<li class="img-item animate">' +
                            '<div class="wrap text-center">' +
                                '<div class="image">' +
                                '<img class="img-responsive" src="' + dataObj.data[i].img + '" alt="' + dataObj.data[i].lang1 + '">' +
                                '</div>' +
                                '<p class="lang1">' + dataObj.data[i].lang1 + '</p>' +
                                '<p class="lang2">' + dataObj.data[i].lang2 + '</p>' +
                                '</div>' +
                                '</li>';

                        if(i === dataObj.data.length-1) {
                            items += '<li class="img-item text-center animate">' +
                                '<div class="continue btn btn-warning">Continue</div>' +
                                '</li>';
                        }
                    }

                    html = '<div class="row text-center"><h2 class="animate">'+dataObj.title+'</h2></div>' +
                    '<div class="row">' +
                    '<div class="col-md-12">' +
                    '<ul class="img-items">' + items + '</ul>' +
                    '</div>' +
                    '</div>';
                    break;
            }

            jQuery(element).append(html);

            setTimeout(function () {
                jQuery('h2.animate').addClass('fadeIn');
            }, 100);

            jQuery('.img-item.animate').each(function (index, value) {
                setTimeout(function () {
                   jQuery(value).addClass('fadeIn');
                }, mProgress*1000);
                mProgress+=2;
            });

            return this;
        };
    }

    if (typeof jQuery !== 'undefined') {
        return new init(arguments[0]);
    } else {
        throw {
            name:        "LearnTag init error",
            message:     "jQuery needed!",
            toString:    function(){return this.name + ": " + this.message;}
        };
    }
};