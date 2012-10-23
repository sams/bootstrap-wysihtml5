!function($, wysi) {
    "use strict";
     (function(wysi) {
          var undef;
          wysi.commands.customSpan = {
              exec: function(composer, command, sty) {
                  return wysi.commands.formatInline.exec(composer, 'insertHTML', "span", sty, new RegExp(sty));
              },
              state: function(composer, command, sty) {
                  return wysi.commands.formatInline.state(composer, 'insertHTML', "span", sty, new RegExp(sty));
              },

              value: function() {
                  return undef;
              }
        };
    })(wysi);
    var templates = function(key, locale) {

        var tpl = {
            "font-styles": (function() {
                var tmpl = "<li class='dropdown'>" +
                    "<a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>" +
                    "<i class='icon-font'></i>&nbsp;<span class='current-font'>" + locale.font_styles.normal + "</span>&nbsp;<b class='caret'></b>" +
                    "</a>" +
                    "<ul class='dropdown-menu'>";
                var stylesToRemove = locale.font_styles.remove || [];
                $.each(['normal','h1','h2','h3'], function(idx, key) {
                     if (stylesToRemove.indexOf(key) < 0) {
                       tmpl += "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='" + key + "'>" + locale.font_styles[key] + "</a></li>";
                     }
                });
                locale.font_styles.custom = locale.font_styles.custom || [];
                $.each(locale.font_styles.custom, function(style, displayName) {
                    tmpl += "<li><a data-wysihtml5-command='customSpan' data-wsyihtml5-command-value='" + style + "'>" + displayName + "</a></li>";
                });
                tmpl += "</ul>" +
                "</li>";
                return tmpl;
            })(),
            "emphasis":
                "<li>" +
                  "<div class='btn-group'>" +
                    "<a class='btn' data-wysihtml5-command='bold' title='CTRL+B'>" + locale.emphasis.bold + "</a>" +
                    "<a class='btn' data-wysihtml5-command='italic' title='CTRL+I'>" + locale.emphasis.italic + "</a>" +
                    "<a class='btn' data-wysihtml5-command='underline' title='CTRL+U'>" + locale.emphasis.underline + "</a>" +
                  "</div>" +
                "</li>",

            "lists":
                "<li>" +
                  "<div class='btn-group'>" +
                    "<a class='btn' data-wysihtml5-command='insertUnorderedList' title='" + locale.lists.unordered + "'><i class='icon-list'></i></a>" +
                    "<a class='btn' data-wysihtml5-command='insertOrderedList' title='" + locale.lists.ordered + "'><i class='icon-th-list'></i></a>" +
                    "<a class='btn' data-wysihtml5-command='Outdent' title='" + locale.lists.outdent + "'><i class='icon-indent-right'></i></a>" +
                    "<a class='btn' data-wysihtml5-command='Indent' title='" + locale.lists.indent + "'><i class='icon-indent-left'></i></a>" +
                  "</div>" +
                "</li>",

            "link":
                "<li>" +
                  "<div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'>" +
                    "<div class='modal-header'>" +
                      "<a class='close' data-dismiss='modal'>&times;</a>" +
                      "<h3>" + locale.link.insert + "</h3>" +
                    "</div>" +
                    "<div class='modal-body'>" +
                      "<input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                      "<a href='#' class='btn' data-dismiss='modal'>" + locale.link.cancel + "</a>" +
                      "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.link.insert + "</a>" +
                    "</div>" +
                  "</div>" +
                  "<a class='btn' data-wysihtml5-command='createLink' title='" + locale.link.insert + "'><i class='icon-share'></i></a>" +
                "</li>",

            "image":
                "<li>" +
                  "<div class='bootstrap-wysihtml5-insert-image-modal modal hide fade'>" +
                    "<div class='modal-header'>" +
                      "<a class='close' data-dismiss='modal'>&times;</a>" +
                      //"<div class='input-append'><input value='' placeholder='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge span6' type='url'><span class='add-on'><a href='#' class='bootstrap-wysihtml5-modal-toggle' data-toggle='imageList'><i class='icon-black icon-th-list'></i></a><a href='#' class=' bootstrap-wysihtml5-modal-toggle' data-toggle='imageUpload'><i class='icon-black icon-upload'></i></a><a href='#' class='active bootstrap-wysihtml5-modal-toggle' data-toggle='imageOptions'><i class='icon-black icon-tasks'></i></a></span></div>" +
                      "<ul class='nav nav-tabs'>"+
                        "<li><a href='#images-insert' data-toggle='tab'>" + locale.image.insert + "</a></li>" +
                        "<li><a href='#images-select' data-toggle='tab'>" + locale.image.select + "</a></li>" +
                        "<li><a href='#images-upload' data-toggle='tab'>" + locale.image.upload + "</a></li>" +
                      "</ul>" +
                    "</div>" +
                    "<div class='modal-body'>" +
                      "<div class='tab-content'>" +
                          "<div class='tab-pane active' id='images-insert'>" +
                            "<div class='control-row'><input value='' placeholder='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge span6' type='url'></div>" +
                            "<div class='preview'></div>" +
                            "<div class='control-row'><input placeholder='class' value='' class='bootstrap-wysihtml5-insert-image-class input-mini span6'></div>" +
                            "<div class='control-row'><input placeholder='width' value='' class='bootstrap-wysihtml5-insert-image-width input-mini span2'> x " +
                            "<input placeholder='height' value='' class='bootstrap-wysihtml5-insert-image-height input-mini span2'>" +
                            "<input placeholder='alt' value='' class='bootstrap-wysihtml5-insert-image-alt input-mini span2'></div>" +
                          "</div>" +
                          "<div class='tab-pane imageList' id='images-select'>" +
                            "<table class='table table-condensed table-bordered table-hover pointer'>" +
                            "</table>" +
                          "</div>" +
                          "<div class='tab-pane' id='images-upload'>" +
                            "<form action='"+ defaultOptions.imagesUrl +"' method='post' id='new_image' enctype='multipart/form-data'>" +
                              "<input type='file' name='asset[asset]' />" +
                              "<iframe class='hidden' id='upload-iframe' name='upload-iframe' src=''>" +
                              "</iframe>"+
                            "</form>" +
                          "</div>" +
                      "</div>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                      "<a href='#' class='btn' data-dismiss='modal'>" + locale.image.cancel + "</a>" +
                            "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.image.insert + "</a>" +
                    "</div>" +
                  "</div>" +
                        "<a class='btn' data-wysihtml5-command='insertImage' title='" + locale.image.insert + "'><i class='icon-picture'></i></a>" +
                "</li>",

            "html":
                "<li>" +
                  "<div class='btn-group'>" +
                    "<a class='btn' data-wysihtml5-action='change_view' title='" + locale.html.edit + "'><i class='icon-pencil'></i></a>" +
                  "</div>" +
                "</li>",

            "color":
                "<li class='dropdown'>" +
                  "<a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>" +
                    "<span class='current-color'>" + locale.colours.black + "</span>&nbsp;<b class='caret'></b>" +
                  "</a>" +
                  "<ul class='dropdown-menu'>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='black'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='black'>" + locale.colours.black + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='silver'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='silver'>" + locale.colours.silver + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='gray'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='gray'>" + locale.colours.gray + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='maroon'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='maroon'>" + locale.colours.maroon + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='red'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='red'>" + locale.colours.red + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='purple'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='purple'>" + locale.colours.purple + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='green'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='green'>" + locale.colours.green + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='olive'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='olive'>" + locale.colours.olive + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='navy'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='navy'>" + locale.colours.navy + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='blue'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='blue'>" + locale.colours.blue + "</a></li>" +
                    "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='orange'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='orange'>" + locale.colours.orange + "</a></li>" +
                  "</ul>" +
                "</li>"
        };
        return tpl[key];
    };





    var Wysihtml5 = function(el, options) {
        this.el = el;
        var toolbarOpts = options || defaultOptions
        // add custom classes to the save class list */
        for(var k in toolbarOpts.customStyles) {
            toolbarOpts.parserRules.classes[k] = 1;
        }
        this.configuration = toolbarOpts;
        this.toolbar = this.createToolbar(el, toolbarOpts);
        this.editor =  this.createEditor(options);

        window.editor = this.editor;

        $('iframe.wysihtml5-sandbox').each(function(i, el){
            $(el.contentWindow).off('focus.wysihtml5').on({
                'focus.wysihtml5' : function(){
                    $('li.dropdown').removeClass('open');
                }
            });
        });
    };

    Wysihtml5.prototype = {

        constructor: Wysihtml5,

        createEditor: function(options) {
            options = options || {};
            options.toolbar = this.toolbar[0];

            var editor = new wysi.Editor(this.el[0], options);

            if(options && options.events) {
                for(var eventName in options.events) {
                    editor.on(eventName, options.events[eventName]);
                }
            }
            return editor;
        },

        createToolbar: function(el, options) {

            var self = this;
            var toolbar = $("<ul/>", {
                'class' : "wysihtml5-toolbar well",
                'style': "display:none"
            });


            var culture = options.locale || defaultOptions.locale || "en";
            
            locale[culture].font_styles.custom = options.customStyles;
            locale[culture].font_styles.remove = options.removeStyles;
            
            for(var key in defaultOptions) {

                if(key === 'imagesUrl') {
                    this.getImages();
                }

                var value = false;

                if(options[key] !== undefined) {
                    if(options[key] === true) {
                        value = true;
                    }
                } else {
                    value = defaultOptions[key];
                }
                
                if(key === 'imagesUrl' && typeof options[key] === 'string') {
                    this.getImages(options[key]);
                } else if (key === 'imagesUrl' && typeof value === 'boolean') {}

                if(key === 'uploadInit' && typeof options[key] === 'function') {
                    console.log('--------');
console.log(options[key]);
console.log(typeof options[key]);
                    console.log('--------');
                    options[key]();
                }

                if(value === true) {
                    toolbar.append(templates(key, locale[culture]));

                    if(key === "html") {
                        this.initHtml(toolbar);
                    }

                    if(key === "link") {
                        this.initInsertLink(toolbar);
                    }

                    if(key === "image") {
                        this.initInsertImage(toolbar);
                    }
                }
            }

            if(options.toolbar) {
                for(key in options.toolbar) {
                    toolbar.append(options.toolbar[key]);
                }
            }

            toolbar.find("a[data-wysihtml5-command='formatBlock']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-font').text(el.html());
            });

            toolbar.find("a[data-wysihtml5-command='foreColor']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-color').text(el.html());
            });

            this.el.before(toolbar);

            return toolbar;
        },

        initImageUpload: function() {
            var self = this;
            var form = $('#new_image');
            
            var checkComplete = function(){
                var iframeContents = window.frames['upload-iframe'].document.body.innerHTML
                if (iframeContents == "") {
                    setTimeout(checkComplete, 2000);
                } else {
                    var response = $.parseJSON(iframeContents);
                    var url = response[0].url
                    console.log(url)
                    self.editor.composer.commands.exec("insertImage", url);
                    $('div.progress.upload').remove();
                    $('.bootstrap-wysihtml5-insert-image-modal').modal('hide');
                }
            }

            form.on('change', function() {
                form.attr('target','upload-iframe');
                form.submit();
                form.after('<div class="progress progress-striped active upload"><div class="bar" style="width: 100%;"></div></div>');
                checkComplete();
            });
        },
        
        getImages: function(imageSrcUrl) {
            console.info(this);
            var self = this, items = [], widthHeight = '', thumb = '', del = '';
            $.getJSON(imageSrcUrl, function(data) {
                var items = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        thumb = data[key].thumb_url ? '<img src="'+data[key].thumb_url+'" class="thmb">' : '';
                        del = data[key].delete_url ? '<a href="'+data[key].delete_url+'" data-type="'+data[key].delete_type+'"><i class="icon-remove"></i>' : '';
                        widthHeight = (data[key].widthHeight && parseInt(data[key].widthHeight.length) > 0) ? data[key].widthHeight.join(',') : '';
                        items.push("<tr class='image-url pointer' data-image-url='" + data[key].url + "' data-image-dimensions='" + widthHeight + "'><td>" + thumb + " " + data[key].name + "</td><td class='actions'>" + del + "</td></tr>");
                    }
                }
                $(".imageList table").html(items.join())
                $('.image-url').on('click', function() {
                    //var modal = $('.bootstrap-wysihtml5-insert-image-modal'), dim = [];
                    //var url = $(this).data('image-url')
                    //
                    //modal.find('input.bootstrap-wysihtml5-insert-image-url').val(url)
                    //
                    //if ($(this).data('image-dimensions') !== '') {
                    //    dim = $(this).data('image-dimensions').split(',')
                    //    if (dim.length > 0) {
                    //        modal.find('input.bootstrap-wysihtml5-insert-image-width').val(dim[0])
                    //    } else {
                    //        modal.find('input.bootstrap-wysihtml5-insert-image-width').val('')
                    //    }
                    //    
                    //    if (dim.length > 1) {
                    //        modal.find('input.bootstrap-wysihtml5-insert-image-height').val(dim[1])
                    //    } else {
                    //        modal.find('input.bootstrap-wysihtml5-insert-image-height').val('')
                    //    }
                    //}
                    var modal = $('.bootstrap-wysihtml5-insert-image-modal');
                    var url = $(this).data('image-url');
                    self.editor.composer.commands.exec("insertImage", url);
                    $('.bootstrap-wysihtml5-insert-image-modal').modal('hide');
                })
            });

        },

        initHtml: function(toolbar) {
            var changeViewSelector = "a[data-wysihtml5-action='change_view']";
            toolbar.find(changeViewSelector).click(function(e) {
                toolbar.find('a.btn').not(changeViewSelector).toggleClass('disabled');
            });
        },

        initInsertImage: function(toolbar) {
            var self = this;
            var insertImageModal = toolbar.find('.bootstrap-wysihtml5-insert-image-modal');
            var urlInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-url');
            var widthInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-width');
            var heightInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-height');
            var classInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-class');
            var insertButton = insertImageModal.find('a.btn-primary');
            var initialValue = urlInput.val();

            var insertImage = function() {
                var url = urlInput.val(), width = widthInput.val(), height = heightInput.val(), classStr = classInput.val();
                urlInput.val(initialValue);
                var httpHost = window.location.protocol + "//" + window.location.host
                if (url[0] == '/') {
                    url = httpHost + url
                    console.log(url);
                } else {
                    console.log('url is not absolute');
                    console.log(url[0]);
                }
                self.editor.currentView.element.focus();
                self.editor.composer.commands.exec("insertImage", { 'src': url, 'width': width, 'height': height });
            };

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertImage();
                    insertImageModal.modal('hide');
                }
            });

            insertButton.click(insertImage);
 
            insertImageModal.on('shown', function() {
                urlInput.focus();

                //This inits a couple times, but I'm not sure where it would go. Everywhere else seems to fire before the modal is created.
                self.initImageUpload();
            });

            insertImageModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=insertImage]').click(function() {
                var activeButton = $(this).hasClass("wysihtml5-command-active");

                if (!activeButton) {
                    insertImageModal.modal('show');
                    insertImageModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
                        e.stopPropagation();
                    });
                    return false;
                }
                else {
                    return true;
                }
            });
        },

        initInsertLink: function(toolbar) {
            var self = this;
            var insertLinkModal = toolbar.find('.bootstrap-wysihtml5-insert-link-modal');
            var urlInput = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-url');
            var insertButton = insertLinkModal.find('a.btn-primary');
            var initialValue = urlInput.val();

            var insertLink = function() {
                var url = urlInput.val();
                var httpHost = window.location.protocol + "://" + window.location.host
                if (url[0] == '/') {
                    url = httpHost + url
                }
                urlInput.val(initialValue);
                self.editor.currentView.element.focus();
                self.editor.composer.commands.exec("createLink", {
                    href: url,
                    target: "_blank",
                    rel: "nofollow"
                });
            };
            var pressedEnter = false;

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertLink();
                    insertLinkModal.modal('hide');
                }
            });

            insertButton.click(insertLink);

            insertLinkModal.on('shown', function() {
                urlInput.focus();
            });

            insertLinkModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=createLink]').click(function() {
                var activeButton = $(this).hasClass("wysihtml5-command-active");

                if (!activeButton) {
                    insertLinkModal.appendTo('body').modal('show');
                    insertLinkModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
                        e.stopPropagation();
                    });
                    return false;
                }
                else {
                    return true;
                }
            });
        }
    };

    // these define our public api
    var methods = {
        resetDefaults: function() {
            $.fn.wysihtml5.defaultOptions = $.extend(true, {}, $.fn.wysihtml5.defaultOptionsCache);
        },
        bypassDefaults: function(options) {
            return this.each(function () {
                var $this = $(this);
                $this.data('wysihtml5', new Wysihtml5($this, options));
            });
        },
        shallowExtend: function (options) {
            var settings = $.extend({}, $.fn.wysihtml5.defaultOptions, options || {});
            var that = this;
            return methods.bypassDefaults.apply(that, [settings]);
        },
        deepExtend: function(options) {
            var settings = $.extend(true, {}, $.fn.wysihtml5.defaultOptions, options || {});
            var that = this;
            return methods.bypassDefaults.apply(that, [settings]);
        },
        init: function(options) {
            var that = this;
            return methods.shallowExtend.apply(that, [options]);
        },

    };

    $.fn.wysihtml5 = function ( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.wysihtml5' );
        }
        return false;
    };

    $.fn.wysihtml5.Constructor = Wysihtml5;

    var defaultOptions = $.fn.wysihtml5.defaultOptions = {
        "font-styles": true,
        "color": false,
        "emphasis": true,
        "lists": true,
        "html": false,
        "link": true,
        "image": true,
        //"imagesUrl": false,
        //"uploadUrl": false,
        //"uploadInit": function () {console.log('some upload initialized!');},
        "imagesUrl": '/assets.json',
        events: {},
        customStyles: {},
        removeStyles: [],
        parserRules: {
            classes: {
                // (path_to_project/lib/css/wysiwyg-color.css)
                "wysiwyg-color-silver" : 1,
                "wysiwyg-color-gray" : 1,
                "wysiwyg-color-white" : 1,
                "wysiwyg-color-maroon" : 1,
                "wysiwyg-color-red" : 1,
                "wysiwyg-color-purple" : 1,
                "wysiwyg-color-fuchsia" : 1,
                "wysiwyg-color-green" : 1,
                "wysiwyg-color-lime" : 1,
                "wysiwyg-color-olive" : 1,
                "wysiwyg-color-yellow" : 1,
                "wysiwyg-color-navy" : 1,
                "wysiwyg-color-blue" : 1,
                "wysiwyg-color-teal" : 1,
                "wysiwyg-color-aqua" : 1,
                "wysiwyg-color-orange" : 1,
            },
            tags: {
                "b":  {},
                "i":  {},
                "br": {},
                "ol": {},
                "ul": {},
                "li": {},
                "h1": {},
                "h2": {},
                "h3": {},
                "blockquote": {},
                "u": 1,
                "img": {
                    "check_attributes": {
                        "width": "numbers",
                        "alt": "alt",
                        "src": "url",
                        "height": "numbers"
                    }
                },
                "a":  {
                    set_attributes: {
                        target: "_blank",
                        rel:    "nofollow"
                    },
                    check_attributes: {
                        href:   "url" // important to avoid XSS
                    }
                },
                "span": 1,
                "div": 1
            }
        },
        stylesheets: ["./lib/css/wysiwyg-color.css"], // (path_to_project/lib/css/wysiwyg-color.css)
        locale: "en"
    };

    if (typeof $.fn.wysihtml5.defaultOptionsCache === 'undefined') {
        $.fn.wysihtml5.defaultOptionsCache = $.extend(true, {}, $.fn.wysihtml5.defaultOptions);
    }

    var locale = $.fn.wysihtml5.locale = {
        en: {
            font_styles: {
                normal: "Normal text",
                h1: "Heading 1",
                h2: "Heading 2",
                h3: "Heading 3"
            },
            emphasis: {
                bold: "Bold",
                italic: "Italic",
                underline: "Underline"
            },
            lists: {
                unordered: "Unordered list",
                ordered: "Ordered list",
                outdent: "Outdent",
                indent: "Indent"
            },
            link: {
                insert: "Insert link",
                cancel: "Cancel"
            },
            image: {
                insert: "Insert image",
                select: "Select from library",
                upload: "Upload image",
                cancel: "Cancel"
            },
            html: {
                edit: "Edit HTML"
            },
            colours: {
                black: "Black",
                silver: "Silver",
                gray: "Grey",
                maroon: "Maroon",
                red: "Red",
                purple: "Purple",
                green: "Green",
                olive: "Olive",
                navy: "Navy",
                blue: "Blue",
                orange: "Orange"
            }
        }
    };

}(window.jQuery, window.wysihtml5);
