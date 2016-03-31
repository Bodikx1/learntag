var LearnTag = function () {

    function init(element) {
        var html = '',
            items = '',
            mProgress = 0,
            randQuestion = '',
            randChars = '',
            neededChars = '',
            answerChars = '',
            continueClbFunc = null,
            dataModel = null;
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

                buildQuestion = function (questionText, startsFromChar, countChar) {
                    // reset previous question:
                    jQuery(element).find('input[name="answer"]').off('keyup');
                    jQuery(element).find('ul.rand-chars > li').off('click');
                    jQuery(element).find('.btn.solution').off('click');

                    randChars = '';
                    answerChars = '';
                    neededChars = questionText.substr(startsFromChar, countChar);
                    // reset ends;

                    for(var r=(Math.floor(Math.random() * neededChars.length) + 0), i=0, added=[]; i < neededChars.length; r=Math.floor(Math.random() * neededChars.length) + 0) {
                        if (jQuery.inArray(r, added) === -1) {
                            randChars+= '<li '+ (neededChars[r] === ' ' ? 'style="visibility:hidden;"' : '') +' class="btn">'+neededChars[r]+'</li>';
                            added.push(r);
                            i++;
                        }
                    }

                    jQuery(element).find('.img-item:last-of-type').html(
                        '<div class="input">'+questionText.replace(neededChars, '<input name="answer" value="" style="width:'+(neededChars.length*8)+'px" maxlength="'+neededChars.length+'">')+'</div>' +
                        '<ul class="rand-chars">'+randChars+'</ul>' +
                        '<div class="btn solution">Show solution</div>'
                    );

                    jQuery(element).find('input[name="answer"]').on('keyup', inputType);
                    jQuery(element).find('ul.rand-chars > li').on('click', charClick);
                    jQuery(element).find('.btn.solution').on('click', solutionClick);
                },

                checkAnswer = function (usersAnswer) {
                    if (!jQuery(element).find('.lang2:not([class*="fadeIn"])').length || !usersAnswer.length) {
                        return false;
                    }
                    var answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first().text();
                    if (usersAnswer.length === 1) {
                        return usersAnswer === neededChars[0];
                    } else if (usersAnswer.length > 1) {
                        return neededChars.indexOf(usersAnswer)!==-1;
                    }
                },

                toggleBlurChar = function (char, blurDisable) {
                    if (blurDisable === true) {
                        jQuery(element).find('ul.rand-chars > li:contains("'+char+'")').filter('[class*="blur"]').length
                        && jQuery(element).find('ul.rand-chars > li:contains("'+char+'")').filter('[class*="blur"]').first().removeClass('blur');
                    } else {
                        jQuery(element).find('ul.rand-chars > li:contains("' + char + '")').filter(':not([class*="blur"])').length
                        && jQuery(element).find('ul.rand-chars > li:contains("' + char + '")').filter(':not([class*="blur"])').first().addClass('blur');
                    }
                },

                showToolTip = function (tooltip) {
                    // users answer reset
                    jQuery(element).find('input[name="answer"]').off('keyup');
                    jQuery(element).find('ul.rand-chars > li').off('click');
                    jQuery(element).find('.btn.solution').off('click');
                    // users answer reset ends;

                    var userAnswerInput = jQuery(element).find('input[name="answer"]'),
                        userAnswerWraper = userAnswerInput.parent();

                    userAnswerWraper.append(tooltip);
                    userAnswerWraper.find('.btn.okay').on('click', function (event) {
                        switchQuestion();
                    });
                },

                switchQuestion = function () {
                    answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first();

                    if (!answer) {
                        return;
                    }

                    answer.closest('li').removeClass('non-active');
                    answer.closest('li').prev().addClass('non-active');
                    dataIndex = answer.closest('li').data('index');

                    if (dataIndex) {
                        buildQuestion(dataModel[dataIndex].lang2, dataModel[dataIndex].startsFromChar - 1, dataModel[dataIndex].countChar);
                    } else {
                        jQuery(element).find('.img-item.non-active').removeClass('non-active');
                        jQuery(element).find('input[name="answer"]').closest('li').html('<div class="continue btn btn-warning">Continue</div>');
                        if (continueClbFunc) {
                            jQuery('.btn.continue').on('click', continueClbFunc);
                        }
                    }
                },

                nextQuestion = function () {
                    var userAnswerInput = jQuery(element).find('input[name="answer"]'),
                        userAnswerWraper = userAnswerInput.parent(),
                        answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first(),
                        dataIndex = 0;

                    userAnswerInput.css('background', 'lightgreen');

                    setTimeout(function () {
                        userAnswerInput.css('background', 'none');
                        answer.addClass('fadeIn');

                        setTimeout(answer.closest('li').find('.tooltip').length ? showToolTip.bind(null, answer.closest('li').find('.tooltip')) : switchQuestion, 1000);
                    }, 500);

                    userAnswerWraper.nextUntil('li').hide();
                },

                inputType = function (event) {
                    var self = event.target,
                        answer = jQuery(self).val(),
                        maxLength = parseInt(jQuery(event.target).attr('maxlength')),
                        backsapceKeyPressed = (event.keyCode === 8);


                    backsapceKeyPressed && toggleBlurChar(answerChars[answerChars.length-1], true);
                    answerChars = answer;

                    if (checkAnswer(answer)) {
                        !backsapceKeyPressed && toggleBlurChar(answer[answer.length-1], false);

                        if (answer.length === maxLength) {
                            jQuery(self).prop('readonly', true);
                            nextQuestion();
                        }
                    } else {
                        answerChars = answerChars.slice(0, -1);
                        jQuery(self).val(answerChars);

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
                },

                charClick = function (event) {
                    if (jQuery(event.target).hasClass('blur')) {
                        return;
                    }

                    var self = event.target,
                        answer = jQuery(self).text(),
                        userAnswerInput = jQuery(element).find('input[name="answer"]'),
                        maxLength = jQuery(event.target).parent().children().length;

                    answerChars+= answer;
                    userAnswerInput.val(answerChars);

                    if (checkAnswer(answerChars)) {
                        jQuery(event.target).addClass('blur');
                        userAnswerInput.focus();

                        if (jQuery(event.target).parent().children('.blur').length === maxLength) {
                            userAnswerInput.prop('readonly', true);
                            nextQuestion();
                        }
                    } else {
                        answerChars = answerChars.slice(0, -1);
                        userAnswerInput.val(answerChars);

                        jQuery(userAnswerInput).addClass('error');

                        var animErorFirst = jQuery.Deferred();

                        animateEror(userAnswerInput).done(animErorFirst.resolve);

                        animErorFirst.done(function () {
                            // animate again:
                            animateEror(userAnswerInput);
                        });

                        setTimeout(function () {
                            jQuery(userAnswerInput).removeClass('error');
                        }, 500);
                    }
                },

                solutionClick = function (event) {
                    var answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first().text();

                    for (var i=0; i < answer.length; i++) {
                        jQuery(element).find('ul.rand-chars > li:contains("'+answer[i]+'")').filter(':not([class*="blur"])').first().trigger('click');
                    }
                };

            for(var i=0; i < dataObj.data.length; i++) {
                items += '<li data-index="'+i+'" class="img-item '+ (i !== 0 ? 'non-active' : '') +'">' +
                    '<div class="wrap text-center">' +
                    '<div class="image">' +
                    '<img class="img-responsive" src="' + dataObj.data[i].img + '" alt="' + dataObj.data[i].lang1 + '">' +
                    '</div>' +
                    '<p class="lang1">' + dataObj.data[i].lang1 + '</p>' +
                    '<p class="lang2 animate">' + dataObj.data[i].lang2 + '</p>' +
                    (dataObj.data[i].tooltip ? '<span class="tooltip"><span class="fa fa-info-circle"> info</span> <div class="wnd">' + dataObj.data[i].tooltip + '<br><div style="margin-top: 5px;" class="okay btn btn-warning">OK</div></div></span>' : '') +
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

            dataModel = dataObj.data;
            buildQuestion(dataModel[0].lang2, dataModel[0].startsFromChar-1, dataModel[0].countChar);
        },

            buildModule5 = function (dataObj) {
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

                buildQuestion = function (questionText, startsFromChar, countChar) {
                    // reset previous question:
                    jQuery(element).find('input[name="answer"]').off('keyup');
                    jQuery(element).find('ul.rand-chars > li').off('click');
                    jQuery(element).find('.btn.solution').off('click');

                    randChars = '';
                    answerChars = '';
                    neededChars = questionText.substr(startsFromChar, countChar);
                    // reset ends;

                    for(var r=(Math.floor(Math.random() * neededChars.length) + 0), i=0, added=[]; i < neededChars.length; r=Math.floor(Math.random() * neededChars.length) + 0) {
                        if (jQuery.inArray(r, added) === -1) {
                            randChars+= '<li '+ (neededChars[r] === ' ' ? 'style="visibility:hidden;"' : '') +' class="btn">'+neededChars[r]+'</li>';
                            added.push(r);
                            i++;
                        }
                    }

                    jQuery(element).find('.img-item:last-of-type').html(
                        '<div class="input">'+questionText.replace(neededChars, '<input name="answer" value="" style="width:'+(neededChars.length*8)+'px" maxlength="'+neededChars.length+'">')+'</div>' +
                        '<ul class="rand-chars">'+randChars+'</ul>' +
                        '<div class="btn solution">Show solution</div>'
                    );

                    jQuery(element).find('input[name="answer"]').on('keyup', inputType);
                    jQuery(element).find('ul.rand-chars > li').on('click', charClick);
                    jQuery(element).find('.btn.solution').on('click', solutionClick);
                },

                checkAnswer = function (usersAnswer) {
                    if (!jQuery(element).find('.lang2:not([class*="fadeIn"])').length || !usersAnswer.length) {
                        return false;
                    }
                    var answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first().text();
                    if (usersAnswer.length === 1) {
                        return usersAnswer === neededChars[0];
                    } else if (usersAnswer.length > 1) {
                        return neededChars.indexOf(usersAnswer)!==-1;
                    }
                },

                toggleBlurChar = function (char, blurDisable) {
                    if (blurDisable === true) {
                        jQuery(element).find('ul.rand-chars > li:contains("'+char+'")').filter('[class*="blur"]').length
                        && jQuery(element).find('ul.rand-chars > li:contains("'+char+'")').filter('[class*="blur"]').first().removeClass('blur');
                    } else {
                        jQuery(element).find('ul.rand-chars > li:contains("' + char + '")').filter(':not([class*="blur"])').length
                        && jQuery(element).find('ul.rand-chars > li:contains("' + char + '")').filter(':not([class*="blur"])').first().addClass('blur');
                    }
                },

                showToolTip = function (tooltip) {
                    // users answer reset
                    jQuery(element).find('input[name="answer"]').off('keyup');
                    jQuery(element).find('ul.rand-chars > li').off('click');
                    jQuery(element).find('.btn.solution').off('click');
                    // users answer reset ends;

                    var userAnswerInput = jQuery(element).find('input[name="answer"]'),
                        userAnswerWraper = userAnswerInput.parent();

                    userAnswerWraper.append(tooltip);
                    userAnswerWraper.find('.btn.okay').on('click', function (event) {
                        switchQuestion();
                    });
                },

                switchQuestion = function () {
                    answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first();

                    if (!answer) {
                        return;
                    }

                    answer.closest('li').removeClass('non-active');
                    answer.closest('li').prev().addClass('non-active');
                    dataIndex = answer.closest('li').data('index');

                    if (dataIndex) {
                        buildQuestion(dataModel[dataIndex].lang2, dataModel[dataIndex].startsFromChar - 1, dataModel[dataIndex].countChar);
                    } else {
                        jQuery(element).find('.img-item.non-active').removeClass('non-active');
                        jQuery(element).find('input[name="answer"]').closest('li').html('<div class="continue btn btn-warning">Continue</div>');
                        if (continueClbFunc) {
                            jQuery('.btn.continue').on('click', continueClbFunc);
                        }
                    }
                },

                nextQuestion = function () {
                    var userAnswerInput = jQuery(element).find('input[name="answer"]'),
                        userAnswerWraper = userAnswerInput.parent(),
                        answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first(),
                        dataIndex = 0;

                    userAnswerInput.css('background', 'lightgreen');

                    setTimeout(function () {
                        userAnswerInput.css('background', 'none');
                        answer.addClass('fadeIn');

                        setTimeout(answer.closest('li').find('.tooltip').length ? showToolTip.bind(null, answer.closest('li').find('.tooltip')) : switchQuestion, 1000);
                    }, 500);

                    userAnswerWraper.nextUntil('li').hide();
                },

                inputType = function (event) {
                    var self = event.target,
                        answer = jQuery(self).val(),
                        maxLength = parseInt(jQuery(event.target).attr('maxlength')),
                        backsapceKeyPressed = (event.keyCode === 8);


                    backsapceKeyPressed && toggleBlurChar(answerChars[answerChars.length-1], true);
                    answerChars = answer;

                    if (checkAnswer(answer)) {
                        !backsapceKeyPressed && toggleBlurChar(answer[answer.length-1], false);

                        if (answer.length === maxLength) {
                            jQuery(self).prop('readonly', true);
                            nextQuestion();
                        }
                    } else {
                        answerChars = answerChars.slice(0, -1);
                        jQuery(self).val(answerChars);

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
                },

                charClick = function (event) {
                    if (jQuery(event.target).hasClass('blur')) {
                        return;
                    }

                    var self = event.target,
                        answer = jQuery(self).text(),
                        userAnswerInput = jQuery(element).find('input[name="answer"]'),
                        maxLength = jQuery(event.target).parent().children().length;

                    answerChars+= answer;
                    userAnswerInput.val(answerChars);

                    if (checkAnswer(answerChars)) {
                        jQuery(event.target).addClass('blur');
                        userAnswerInput.focus();

                        if (jQuery(event.target).parent().children('.blur').length === maxLength) {
                            userAnswerInput.prop('readonly', true);
                            nextQuestion();
                        }
                    } else {
                        answerChars = answerChars.slice(0, -1);
                        userAnswerInput.val(answerChars);

                        jQuery(userAnswerInput).addClass('error');

                        var animErorFirst = jQuery.Deferred();

                        animateEror(userAnswerInput).done(animErorFirst.resolve);

                        animErorFirst.done(function () {
                            // animate again:
                            animateEror(userAnswerInput);
                        });

                        setTimeout(function () {
                            jQuery(userAnswerInput).removeClass('error');
                        }, 500);
                    }
                },

                solutionClick = function (event) {
                    var answer = jQuery(element).find('.lang2:not([class*="fadeIn"])').first().text();

                    for (var i=0; i < answer.length; i++) {
                        jQuery(element).find('ul.rand-chars > li:contains("'+answer[i]+'")').filter(':not([class*="blur"])').first().trigger('click');
                    }
                },

                playBtnClick = function (event) {
                    var self = event.target;

                    jQuery('audio')[0].play();
                    jQuery(self).animate({
                        opacity: "0.1"
                    }, 500, "linear", function () {
                        jQuery(self).animate({
                            opacity: "1"
                        }, 500, "linear");
                    });
                };

            for(var i= 0, soundExt=dataObj.data[i].sound.split('.'); i < dataObj.data.length; i++) {
                items += '<li data-index="'+i+'" class="img-item sound '+ (i !== 0 ? 'non-active' : '') +'">' +
                    '<div class="wrap text-center">' +
                    '<div class="image sound">' +
                    '<div class="play-btn"><span class="fa fa-volume-up"><br>play</span></div>' +
                    '<audio controls>' +
                    '<source src="'+dataObj.data[i].sound+'" type="audio/'+soundExt[soundExt.length-1]+'">' +
                    'Your browser does not support the audio element.' +
                    '</audio>' +
                    '</div>' +
                    '<p class="lang2 animate">' + dataObj.data[i].lang2 + '</p>' +
                    (dataObj.data[i].tooltip ? '<span class="tooltip"><span class="fa fa-info-circle"> info</span> <div class="wnd">' + dataObj.data[i].tooltip + '<br><div style="margin-top: 5px;" class="okay btn btn-warning">OK</div></div></span>' : '') +
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

            dataModel = dataObj.data;
            buildQuestion(dataModel[0].lang2, dataModel[0].startsFromChar-1, dataModel[0].countChar);
            jQuery(element).find('.play-btn span').on('click', playBtnClick);
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

                case '004-write-word-from-sound':
                    buildModule5(dataObj);
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