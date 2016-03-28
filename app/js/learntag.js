var LearnTag = function () {

    function init(element) {
        var html = '',
            items = '',
            mProgress = 0,
            randQuestion = '',
            randChars = '',
            neededChars = '',
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
                        var anim1 = jQuery.Deferred(),
                            anim2 = jQuery.Deferred();

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

                        return jQuery.when(anim1, anim2);
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
                                            jQuery('.btn.continue').on('click', continueClbFunc);
                                        }
                                    }
                                }, 1000);
                            }, 500);

                        } else {

                            jQuery(self).addClass('error');

                            var animErorFirst = jQuery.Deferred();

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
                    var anim1 = jQuery.Deferred(),
                        anim2 = jQuery.Deferred();

                    jQuery(self).find('.wrap:nth-of-type(2)').css({
                        position: 'relative'
                    }).animate({
                        right: "-15px"
                    }, 50, "linear", anim1.resolve);

                    anim1.done(function() {
                        jQuery(self).find('.wrap:nth-of-type(2)').css({
                            position: 'relative'
                        }).animate({
                            right: "15px"
                        }, 50, "linear", anim2.resolve);
                    });

                    anim2.done(function() {
                        jQuery(self).find('.wrap:nth-of-type(2)').css({
                            position: 'initial'
                        }).animate({
                            right: "0px"
                        }, 50, "linear");
                    });

                    return jQuery.when(anim1, anim2);
                },

                itemClick = function (event) {
                    // if have no non-answered questions exit function:
                    if (!jQuery(element).find('.left-item.non-answered').length) {
                        return;
                    }

                    var self = this,
                        currQuestion = jQuery(this).find('.lang1'),
                        currAnswer = jQuery(jQuery(element).find('.left-item.non-answered')[0]).find('.lang1'),
                        currAnswerPos = currAnswer.parent().offset();

                    if (currAnswer.text() === currQuestion.text()) {
                        if (!jQuery(self).hasClass('success')) {
                            jQuery(self).addClass('success');

                            currQuestion.parent().css({
                                position: 'relative'
                            }).animate({
                                top: currAnswerPos.top - currQuestion.parent().offset().top,
                                left: currAnswerPos.left - currQuestion.parent().offset().left
                            }, 250, "linear", function () {
                                currQuestion.parent().hide();
                                currAnswer.closest('li').removeClass('non-answered');

                                if (!jQuery(element).find('.left-item.non-answered').length) {
                                    jQuery(element).find('.col-sm-6:nth-of-type(2)').hide();
                                    jQuery(element).find('.col-sm-6').removeClass('col-sm-6').addClass('col-sm-12 animateAll');
                                    jQuery(element).append('<div class="row text-center"><div class="continue btn btn-warning">Continue</div></div>');
                                    if (continueClbFunc) {
                                        jQuery('.btn.continue').on('click', continueClbFunc);
                                    }
                                }
                            });
                        }
                    } else {

                        jQuery(self).addClass('error');

                        var animErorFirst = jQuery.Deferred();

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

            items += '<div class="col-sm-6"><ul class="left-items">';

            for(var i=0; i < dataObj.data.length; i++) {
                items += '<li class="left-item non-answered">' +
                    '<div class="wrap"><div class="lang2">' +dataObj.data[i].lang2+ '</div></div>' +
                    '<div class="wrap"><div class="lang1">' +dataObj.data[i].lang1+ '</div></div>' +
                    '</li>';
            }

            items += '</ul></div>';

            items += '<div class="col-sm-6"><ul class="right-items">';

            for(var r=(Math.floor(Math.random() * dataObj.data.length) + 0), i=0, added=[]; i < dataObj.data.length; r=Math.floor(Math.random() * dataObj.data.length) + 0) {
                if (jQuery.inArray(r, added) === -1) {
                    items += '<li class="right-item hover">' +
                        '<div class="wrap"><div class="lang2">' + dataObj.data[r].lang2 + '</div></div>' +
                        '<div class="wrap"><div class="lang1">' + dataObj.data[r].lang1 + '</div></div>' +
                        '</li>';
                    added.push(r);
                    i++;
                }
            }

            items += '</ul></div>';

            html = '<div class="row text-center"><h2>'+dataObj.title+'</h2></div>' +
                '<div class="row">' + items + '</div>';

            jQuery(element).html(html);
            jQuery(element).find('.right-item').on('click', itemClick);
            },

            buildModule4 = function (dataObj) {
            var animateEror = function (self) {
                    var anim1 = jQuery.Deferred(),
                        anim2 = jQuery.Deferred();

                    jQuery(self).animate({
                        marginRight: "-15px"
                    }, 50, "linear", anim1.resolve);

                    anim1.done(function() {
                        jQuery(self).animate({
                            marginRight: "15px"
                        }, 50, "linear", anim2.resolve);
                    });

                    anim2.done(function() {
                        jQuery(self).animate({
                            marginRight: "0px"
                        }, 50, "linear");
                    });

                    return jQuery.when(anim1, anim2);
                },

                checkAnswer = function (usersAnswer) {
                    if (!jQuery(element).find('.lang2:not([class*="fadeIn"])').length || !usersAnswer.length) {
                        return false;
                    }
                    var answer = jQuery(jQuery(element).find('.lang2:not([class*="fadeIn"])')[0]).text();
                    if (usersAnswer.length === 1) {
                        return answer[0] === usersAnswer[0];
                    } else if (usersAnswer.length > 1) {
                        return answer.indexOf(usersAnswer)!==-1;
                    }
                },

                inputType = function (event) {
                    var self = event.target,
                        answer = jQuery(self).val(),
                        maxLength = parseInt(jQuery(event.target).attr('maxlength'));

                    if (checkAnswer(answer)) {
                        if (answer.length === maxLength) {

                        }
                    } else {
                        jQuery(self).addClass('error');

                        var animErorFirst = jQuery.Deferred();

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
                items += '<li class="img-item">' +
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
            neededChars = dataObj.data[0].lang2.substr(dataObj.data[0].startsFromChar-1, dataObj.data[0].countChar);
            for (var i=0; i < neededChars.length; i++) {
                randChars+= '<li>'+neededChars[i]+'</li>';
            }
            jQuery(element).find('.img-item:last-of-type').html(
                '<div class="input"><input name="answer" value="" maxlength="'+neededChars.length+'">'+dataObj.data[0].lang2.replace(neededChars, '')+'</div>' +
                '<ul class="rand-chars">'+randChars+'</ul>' +
                '<div class="btn solution">Show solution</div>'
            );
            jQuery(element).find('input[name="answer"]').on('keyup', inputType);
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

                case '003-write-vocabulary-with-image':
                    buildModule4(dataObj);
                    break;
            }

            if (continueClbFunc) {
                jQuery('.btn.continue').length && jQuery('.btn.continue').on('click', continueClbFunc);
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