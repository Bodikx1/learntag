var LearnTag = function () {

    function init(element) {
        var html = '',
            items = '',
            mProgress = 0,
            randQuestion = '',
            continueClbFunc = null;
        // private vars ends;

        var buildModule1 = function (dataObj) {

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

            jQuery(element).html(html);

            setTimeout(function () {
                jQuery('h2.animate').addClass('fadeIn');
            }, 100);

            jQuery('.img-item.animate').each(function (index, value) {
                setTimeout(function () {
                    jQuery(value).addClass('fadeIn');
                }, mProgress*1000);
                mProgress+=2;
            });
        },

            buildModule2 = function (dataObj) {
            var animateEror = function (self) {
                    var anim1 = $.Deferred(),
                        anim2 = $.Deferred();

                    jQuery(self).find('.image').animate({
                        marginRight: "-15px"
                    }, 50, "linear", anim1.resolve);

                    anim1.done(function() {
                        jQuery(self).find('.image').animate({
                            marginRight: "15px"
                        }, 50, "linear", anim2.resolve);
                    });

                    anim2.done(function() {
                        jQuery(self).find('.image').animate({
                            marginRight: "0px"
                        }, 50, "linear");
                    });

                    return $.when(anim1, anim2);
                },

                itemClick = function (event) {
                    // if have no non-answered questions exit function:
                    if (jQuery(element).find('.img-item:last-of-type .continue').length) {
                        return;
                    }

                    var self = this,
                        currQuestion = jQuery(element).find('.img-item:last-of-type div'),
                        currQuestionParent = currQuestion.parent(),
                        currAnswer = jQuery(self).find('.lang2');

                    if (currAnswer.text() === currQuestion.text()) {

                        jQuery(self).addClass('success');
                        currAnswer.addClass('fadeIn');
                        currQuestion.parent().hide().html('');

                        setTimeout(function () {
                            jQuery(self).removeClass('success');
                            // show next question
                            setTimeout(function () {
                                var leftQuestions = jQuery(element).find('.img-item .lang2:not([class*="fadeIn"])');
                                randQuestion = jQuery(leftQuestions[(Math.floor(Math.random() * leftQuestions.length) + 0)]).text();
                                if (randQuestion !== '') {
                                    currQuestionParent.html('<div class="question">' + randQuestion + '</div>').show();
                                } else {
                                    currQuestionParent.html('<div class="continue btn btn-warning">Continue</div>').show();
                                    if (continueClbFunc) {
                                        $('.btn.continue').on('click', continueClbFunc);
                                    }
                                }
                            }, 1000);
                        }, 500);

                    } else {

                        jQuery(self).addClass('error');

                        var animErorFirst = $.Deferred();

                        animateEror(self).done(animErorFirst.resolve);

                        animErorFirst.done(function () {
                            // animate again:
                            animateEror(self);
                        });

                        setTimeout(function () {
                            jQuery(self).removeClass('error');
                        }, 500);
                    }
                };

            for(var i=0; i < dataObj.data.length; i++) {
                items += '<li class="img-item hover">' +
                    '<div class="wrap text-center">' +
                    '<div class="image">' +
                    '<img class="img-responsive" src="' + dataObj.data[i].img + '" alt="' + dataObj.data[i].lang1 + '">' +
                    '</div>' +
                    '<p class="lang1">' + dataObj.data[i].lang1 + '</p>' +
                    '<p class="lang2 animate">' + dataObj.data[i].lang2 + '</p>' +
                    '</div>' +
                    '</li>';

                if(i === dataObj.data.length-1) {
                    items += '<li class="img-item text-center">' +
                        '</li>';
                }
            }

            html = '<div class="row text-center"><h2>'+dataObj.title+'</h2></div>' +
                '<div class="row">' +
                '<div class="col-md-12">' +
                '<ul class="img-items">' + items + '</ul>' +
                '</div>' +
                '</div>';

            jQuery(element).html(html);
            randQuestion = jQuery(element).find('.img-item:nth-of-type('+(Math.floor(Math.random() * 4) + 1)+') .lang2').text();
            jQuery(element).find('.img-item:last-of-type').html('<div class="question">'+randQuestion+'</div>');
            jQuery(element).find('.img-item:not(:last-of-type)').on('click', itemClick);
        },

            buildModule3 = function (dataObj) {
            var animateEror = function (self) {
                    var anim1 = $.Deferred(),
                        anim2 = $.Deferred();

                    jQuery(self).find('.image').animate({
                        marginRight: "-15px"
                    }, 50, "linear", anim1.resolve);

                    anim1.done(function() {
                        jQuery(self).find('.image').animate({
                            marginRight: "15px"
                        }, 50, "linear", anim2.resolve);
                    });

                    anim2.done(function() {
                        jQuery(self).find('.image').animate({
                            marginRight: "0px"
                        }, 50, "linear");
                    });

                    return $.when(anim1, anim2);
                },

                itemClick = function (event) {
                    // if have no non-answered questions exit function:
                    if (jQuery(element).find('.img-item:last-of-type .continue').length) {
                        return;
                    }

                    var self = this,
                        currQuestion = jQuery(element).find('.img-item:last-of-type div'),
                        currQuestionParent = currQuestion.parent(),
                        currAnswer = jQuery(self).find('.lang2');

                    if (currAnswer.text() === currQuestion.text()) {

                        jQuery(self).addClass('success');
                        currAnswer.addClass('fadeIn');
                        currQuestion.parent().hide().html('');

                        setTimeout(function () {
                            jQuery(self).removeClass('success');
                            // show next question
                            setTimeout(function () {
                                var leftQuestions = jQuery(element).find('.img-item .lang2:not([class*="fadeIn"])');
                                randQuestion = jQuery(leftQuestions[(Math.floor(Math.random() * leftQuestions.length) + 0)]).text();
                                if (randQuestion !== '') {
                                    currQuestionParent.html('<div class="question">' + randQuestion + '</div>').show();
                                } else {
                                    currQuestionParent.html('<div class="continue btn btn-warning">Continue</div>').show();
                                    if (continueClbFunc) {
                                        $('.btn.continue').on('click', continueClbFunc);
                                    }
                                }
                            }, 1000);
                        }, 500);

                    } else {

                        jQuery(self).addClass('error');

                        var animErorFirst = $.Deferred();

                        animateEror(self).done(animErorFirst.resolve);

                        animErorFirst.done(function () {
                            // animate again:
                            animateEror(self);
                        });

                        setTimeout(function () {
                            jQuery(self).removeClass('error');
                        }, 500);
                    }
                };

            for(var i=0; i < dataObj.data.length; i++) {
                items += '<li class="img-item hover">' +
                    '<div class="wrap text-center">' +
                    '<div class="image">' +
                    '<img class="img-responsive" src="' + dataObj.data[i].img + '" alt="' + dataObj.data[i].lang1 + '">' +
                    '</div>' +
                    '<p class="lang1">' + dataObj.data[i].lang1 + '</p>' +
                    '<p class="lang2 animate">' + dataObj.data[i].lang2 + '</p>' +
                    '</div>' +
                    '</li>';

                if(i === dataObj.data.length-1) {
                    items += '<li class="img-item text-center">' +
                        '</li>';
                }
            }

            html = '<div class="row text-center"><h2>'+dataObj.title+'</h2></div>' +
                '<div class="row">' +
                '<div class="col-xs-6">' +
                '<ul class="left-items">' + items + '</ul>' +
                '</div>' +
                '<div class="col-xs-6">' +
                '<ul class="right-items">' + items + '</ul>' +
                '</div>' +
                '</div>';

            jQuery(element).html(html);
            randQuestion = jQuery(element).find('.img-item:nth-of-type('+(Math.floor(Math.random() * 4) + 1)+') .lang2').text();
            jQuery(element).find('.img-item:last-of-type').html('<div class="question">'+randQuestion+'</div>');
            jQuery(element).find('.img-item:not(:last-of-type)').on('click', itemClick);
        };
        // private methods ends;

        this.build = function(type, dataObj) {

            if(typeof arguments[2] === 'function') {
                continueClbFunc = arguments[2];
            }

            switch (type) {
                case '000-display-vocabulary-with-image':
                    buildModule1(dataObj);
                    break;

                case '001-match-vocabulary-1-with-image':
                    buildModule2(dataObj);
                    break;

                case '002-match-vocabulary-n-wo-image':
                    buildModule3(dataObj);
                    break;
            }

            if (continueClbFunc) {
                $('.btn.continue').on('click', continueClbFunc);
            }

            return this;
        };
        // public methods ends;
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