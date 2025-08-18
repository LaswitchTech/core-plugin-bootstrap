builder.add('inputs','switch', class extends builder.InputClass {

    _init(){

        // Execute Parent Init
        super._init();

        // Set Additional Properties
        this._properties.autocomplete = 'off';
    }

    _input(){

        const input = $(document.createElement('div')).addClass('form-control form-check form-switch');
        input.switch = $(document.createElement('input')).attr({
            'id': this._component.id + '-input',
            'class': 'form-check-input',
            'name': this._properties.name,
            'autocomplete': this._properties.autocomplete,
            'type': 'checkbox',
            'role': 'switch',
            // 'style': 'height: 24px;',
        }).appendTo(input);

        // Return Input
        return input;
    }

    val(value = null){
        if(value !== null){
            this._component.input.switch.attr('checked', function(index, attr){ return value});
            this._component.input.switch.attr('value',value);
        }

        return this._component.input.switch.prop('checked');
    }
});

builder.add('components','accordion', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
                accordion: null,
                collapse: null,
                button: null,
            },
            flush: false,
            alwaysOpen: true,
            properties: {
                class: {
                    collapse: null,
                    button: null,
                },
                icon: null,
                title: null,
                content: null,
            },
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'accordion' + this._id,
            'class': 'accordion',
        });
        this._component.id = this._component.attr('id');

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Accordion Class
        if(this._properties.class.accordion){
            this._component.addClass(this._properties.class.accordion);
        }

        // Set Object Flush
        if(this._properties.flush){
            this._component.addClass('accordion-flush');
        }

        // Add Search
        this._builder.Search.add(this._component);
    }

    add(param1 = null, param2 = null){

        // Set Self
        const self = this;

        let options = {};
        let callback = null;

        // Set selector, options, and callback
        [param1, param2].forEach(param => {
            if(param !== null){
                if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        let properties = {};

        // Configure Options
        for(const [key, value] of Object.entries(this._properties.properties)){
            if(typeof properties[key] === 'undefined'){
                properties[key] = value;
            }
        }
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                switch(key){
                    case"class":
                        for(const [section, classes] of Object.entries(value)){
                            if(properties[key][section] != null){
                                properties[key][section] += ' ' + classes;
                            } else {
                                properties[key][section] = classes;
                            }
                        }
                        break;
                    default:
                        properties[key] = value;
                        break;
                }
            }
        }

        // Generate ID
        let id = this._count();

        // Create Collapse
        let collapse = $(document.createElement('div')).attr({
            'id': this._component.id + 'collapse' + id,
            'class': 'accordion-item',
        }).appendTo(this._component);
        collapse.id = collapse.attr('id');

        // Save Properties
        collapse.properties = properties;

        // Create Header
        collapse.header = $(document.createElement('h2')).addClass('accordion-header').appendTo(collapse);
        collapse.header.button = $(document.createElement('button')).attr({
            'id': collapse.id + 'button',
            'class': 'accordion-button collapsed',
            'type': 'button',
            'data-bs-toggle': 'collapse',
            'data-bs-target': '#' + collapse.id + 'collapse',
            'aria-controls': collapse.id + 'collapse',
            'aria-expanded': 'false',
        }).appendTo(collapse.header);

        // Create Icon
        collapse.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + collapse.properties.icon).appendTo(collapse.header.button);

        // Create Title
        collapse.title = $(document.createElement('span')).appendTo(collapse.header.button);

        // Create Collapse
        collapse.collapse = $(document.createElement('div')).attr({
            'id': collapse.id + 'collapse',
            'class': 'accordion-collapse collapse',
            'data-bs-parent': '#' + this._component.id,
        }).appendTo(collapse);
        collapse.collapse.id = collapse.collapse.attr('id');

        // Create Content
        collapse.content = $(document.createElement('div')).addClass('accordion-body').appendTo(collapse.collapse);

        // Set Collapse Class
        if(this._properties.class.collapse){
            collapse.addClass(this._properties.class.collapse);
        }
        if(collapse.properties.class.collapse){
            collapse.addClass(collapse.properties.class.collapse);
        }

        // Set Button Class
        if(this._properties.class.button){
            collapse.header.button.addClass(this._properties.class.button);
        }
        if(collapse.properties.class.button){
            collapse.header.button.addClass(collapse.properties.class.button);
        }

        // Set Always Open
        if(this._properties.alwaysOpen){
            collapse.collapse.attr('data-bs-parent','');
        }

        // Set Icon
        if(collapse.properties.icon == null){
            collapse.icon.remove();
        }

        // Set Title
        if(collapse.properties.title){
            collapse.title.html(collapse.properties.title);
        }

        // Set Content
        if(collapse.properties.content){
            collapse.content.html(collapse.properties.content);
        }

        // Execute Callback
        if(typeof callback === 'function'){
            callback(collapse,this);
        }

        // Set Search
        this._builder.Search.set(collapse);

        // Return collapse
        return collapse;
    }
});

builder.add('components','alert', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
                alert: null,
            },
            color: null,
            dismissible: true,
            icon: null,
            title: null,
            content: null,
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'alert' + this._id,
            'class': 'alert',
        });
        this._component.id = this._component.attr('id');

        // Close Button
        this._component.close = $(document.createElement('button')).attr({
            'class': 'btn-close',
            'type': 'button',
            'data-bs-dismiss': 'alert',
        }).appendTo(this._component);

        // Create Header
        this._component.header = $(document.createElement('h3')).addClass('d-flex align-items-center justify-content-start w-100').appendTo(this._component);

        // Create Icon
        this._component.header.icon = $(document.createElement('i')).addClass('mx-2 fs-1 bi bi-' + this._properties.icon).prependTo(this._component.header);

        // Create Title
        this._component.header.title = $(document.createElement('span')).appendTo(this._component.header);

        // Create Content
        this._component.content = $(document.createElement('p')).addClass('m-0').appendTo(this._component);

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Alert Class
        if(this._properties.class.alert){
            this._component.addClass(this._properties.class.alert);
        }

        // Set Color
        if(this._properties.color){
            this._component.addClass('alert-' + this._properties.color);
        }

        // Set Dismissible
        if(this._properties.dismissible){
            this._component.addClass('alert-dismissible fade show');
        } else {
            this._component.close.addClass('d-none');
        }

        // Set Icon
        if(this._properties.icon === null){
            this._component.header.icon.remove();
        }

        // Set Title
        if(this._properties.title){
            this._component.header.title.text(this._properties.title);
        }

        // Set Content
        if(this._properties.content){
            this._component.content.html(this._properties.content);
        }
    }
});

builder.add('components','badge', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
                badge: null,
                icon: null,
                content: null,
            },
            icon: 'circle',
            color: 'primary',
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'badge' + this._id,
            'class': 'card p-2',
        });
        this._component.id = this._component.attr('id');

        // Create Row
        this._component.row = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center').appendTo(this._component);

        // Create Icon Frame
        this._component.iconFrame = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center rounded text-bg-' + this._properties.color).css({width:'64px',height:'64px'}).appendTo(this._component.row);
        this._component.icon = $(document.createElement('i')).addClass('fs-3 bi bi-' + this._properties.icon).appendTo(this._component.iconFrame);

        // Create Content
        this._component.content = $(document.createElement('div')).addClass('flex-grow-1 d-flex flex-column justify-content-center align-items-start ms-3').appendTo(this._component.row);

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Badge Class
        if(this._properties.class.badge){
            this._component.addClass(this._properties.class.badge);
        }

        // Set Box Icon Frame Class
        if(this._properties.class.icon){
            this._component.iconFrame.addClass(this._properties.class.icon);
        }

        // Set Box Content Class
        if(this._properties.class.content){
            this._component.content.addClass(this._properties.class.content);
        }
    }
});

builder.add('components','blockquote', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
                figure: null,
                blockquote: null,
                figcaption: null,
                cite: null,
            },
            quote: null,
            author: null,
            source: null,
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('figure')).attr({
            'id': 'blockquote' + this._id,
            'class': '',
        });
        this._component.id = this._component.attr('id');

        // Create Blockquote
        this._component.blockquote = $(document.createElement('blockquote')).addClass('blockquote').appendTo(this._component);
        this._component.blockquote.quote = $(document.createElement('p')).appendTo(this._component.blockquote);

        // Create Figcaption
        this._component.figcaption = $(document.createElement('figcaption')).addClass('blockquote-footer').appendTo(this._component.blockquote);
        this._component.figcaption.author = $(document.createElement('span')).appendTo(this._component.figcaption);
        this._component.figcaption.seperator = $(document.createElement('span')).text(' in ').appendTo(this._component.figcaption);
        this._component.figcaption.source = $(document.createElement('cite')).appendTo(this._component.figcaption);

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Figure Class
        if(this._properties.class.figure){
            this._component.addClass(this._properties.class.figure);
        }

        // Set Blockquote Class
        if(this._properties.class.blockquote){
            this._component.blockquote.addClass(this._properties.class.blockquote);
        }

        // Set Figcaption Class
        if(this._properties.class.figcaption){
            this._component.figcaption.addClass(this._properties.class.figcaption);
        }

        // Set Cite Class
        if(this._properties.class.cite){
            this._component.figcaption.source.addClass(this._properties.class.cite);
        }

        // Set Quote
        if(this._properties.quote){
            this._component.blockquote.quote.text(this._properties.quote);
        }

        // Set Author
        if(this._properties.author){
            this._component.figcaption.author.text(this._properties.author);
        }

        // Set Source
        if(this._properties.source){
            this._component.figcaption.source.text(this._properties.source);
        }

        // Hide Figcaption if No Author or Source
        if(!this._properties.author && !this._properties.source){
            this._component.figcaption.addClass('d-none');
        }

        // Hide Seperator if No Author or Source
        if(!this._properties.author || !this._properties.source){
            this._component.figcaption.seperator.addClass('d-none');
        }
    }
});

builder.add('components','card', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
                card: null,
                header: null,
                body: null,
                footer: null,
            },
            icon: null,
            title: null,
            body: null,
            footer: null,
            stretch: false,
            hideHeader: false,
            hideFooter: true,
            close:true,
            fullscreen: true,
            collapse: true,
            collapsed: false,
            callback: {
                close: null,
                fullscreen: null,
            },
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'card' + this._id,
            'class': 'collapse show',
            'style': 'transition: all 400ms ease',
        });
        this._component.id = this._component.attr('id');

        // Create Card
        this._component.card = $(document.createElement('div')).attr({
            'class': 'card',
            'style': 'transition: all 400ms ease',
        }).appendTo(this._component);

        // Create Card Header
        this._component.header = $(document.createElement('div')).addClass('card-header user-select-none').appendTo(this._component.card);

        // Create Card Header Title
        this._component.header.heading = $(document.createElement('h5')).addClass('card-title d-flex justify-content-start align-items-center').appendTo(this._component.header);
        this._component.header.icon = $(document.createElement('i')).addClass('me-1 bi bi-'+this._properties.icon).appendTo(this._component.header.heading);
        this._component.header.title = $(document.createElement('span')).appendTo(this._component.header.heading);

        // Create Card Header Tools
        this._component.tools = $(document.createElement('span')).addClass('card-controls ms-auto d-flex align-items-center').appendTo(this._component.header.heading);
        this._component.tools.collapse = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.tools);
        this._component.tools.collapse.icon = $(document.createElement('i')).addClass('bi-chevron-bar-contract').appendTo(this._component.tools.collapse);
        this._component.tools.fullscreen = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.tools);
        this._component.tools.fullscreen.icon = $(document.createElement('i')).addClass('bi-fullscreen').appendTo(this._component.tools.fullscreen);
        this._component.tools.close = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.tools);
        this._component.tools.close.icon = $(document.createElement('i')).addClass('bi-x-lg').appendTo(this._component.tools.close);

        // Create Card Collapse
        this._component.collapse = $(document.createElement('div')).attr({
            'id': this._component.id + 'collapse',
            'class': 'collapse show',
            'style': 'transition: all 400ms ease',
        }).appendTo(this._component.card);
        this._component.collapse.id = this._component.collapse.attr('id');

        // Create Card Body
        this._component.body = $(document.createElement('div')).attr({
            'class': 'card-body',
            'style': 'transition: all 400ms ease',
        }).html(this._properties.body).appendTo(this._component.collapse);

        // Create Card Footer
        this._component.footer = $(document.createElement('div')).addClass('card-footer').appendTo(this._component.card);

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Card Class
        if(this._properties.class.card){
            this._component.card.addClass(this._properties.class.card);
        }

        // Set Card Header Class
        if(this._properties.class.header){
            this._component.header.addClass(this._properties.class.header);
        }

        // Set Card Body Class
        if(this._properties.class.body){
            this._component.body.addClass(this._properties.class.body);
        }

        // Set Card Footer Class
        if(this._properties.class.footer){
            this._component.footer.addClass(this._properties.class.footer);
        }

        // Configure Card
        if(this._properties.stretch){
            this._component.addClass('h-100');
            this._component.card.addClass('h-100');
            this._component.collapse.addClass('h-100');
            this._component.body.addClass('d-flex h-100 overflow-auto');
        }

        // Configure Card Header
        if(this._properties.icon == null){
            this._component.header.icon.remove();
        }
        if(this._properties.title){
            this._component.header.title.html(this._properties.title);
        }
        if(this._properties.hideHeader){
            this._component.header.addClass('d-none');
        }

        // Configure Card Tools
        // Close Button
        if(this._properties.close){
            this._component.bs = new bootstrap.Collapse(this._component,{toggle:false});
            this._component.tools.close.click(function(){
                self._component.bs.hide();
                self._component.on('hidden.bs.collapse',function(){
                    self._component.remove();
                    if(typeof self._properties.callback.close === 'function'){
                        self._properties.callback.close(self,self._component);
                    }
                });
            });
        } else {
            this._component.tools.close.addClass('d-none');
        }
        // FullScreen Button
        if(this._properties.fullscreen){
            this._component.tools.fullscreen.click(function(){
                if(self._component.tools.fullscreen.icon.hasClass('bi-fullscreen')){
                    self._component.card.appendTo('body');
                    self._component.card.addClass('position-fixed top-0 start-0 vw-100 vh-100 rounded-0').css('z-index', 1050);
                    self._component.body.addClass('h-100');
                    self._component.collapse.addClass('h-100 overflow-auto');
                    self._component.tools.fullscreen.icon.removeClass('bi-fullscreen').addClass('bi-fullscreen-exit');
                    if(self._properties.collapse){
                        self._component.tools.collapse.addClass('d-none');
                    }
                    self._component.card[0].style.setProperty('margin', '0px', 'important');
                    self._component.card[0].style.setProperty('padding', '0px', 'important');
                    self._component.collapse[0].style.setProperty('margin', '0px', 'important');
                    self._component.collapse[0].style.setProperty('padding', '0px', 'important');
                } else {
                    self._component.card.appendTo(self._component);
                    self._component.card.removeClass('position-fixed top-0 start-0 vw-100 vh-100 rounded-0').css('z-index', '');
                    self._component.body.removeClass('h-100');
                    self._component.collapse.removeClass('h-100 overflow-auto');
                    self._component.tools.fullscreen.icon.removeClass('bi-fullscreen-exit').addClass('bi-fullscreen');
                    if(self._properties.collapse){
                        self._component.tools.collapse.removeClass('d-none');
                    }
                    self._component.card[0].style.setProperty('margin', '');
                    self._component.card[0].style.setProperty('padding', '');
                    self._component.collapse[0].style.setProperty('margin', '');
                    self._component.collapse[0].style.setProperty('padding', '');
                }
                if(typeof self._properties.callback.fullscreen === 'function'){
                    self._properties.callback.fullscreen(self,self._component,!self._component.tools.fullscreen.icon.hasClass('bi-fullscreen'));
                }
            });
        } else {
            this._component.tools.fullscreen.addClass('d-none');
        }
        // Collapse Button
        if(this._properties.collapse){
            this._component.collapse.bs = new bootstrap.Collapse(this._component.collapse,{toggle:false});
            this._component.tools.collapse.click(function(){
                if(self._component.tools.collapse.icon.hasClass('bi-chevron-bar-expand')){
                    self._component.collapse.bs.show();
                    self._component.tools.collapse.icon.removeClass('bi-chevron-bar-expand').addClass('bi-chevron-bar-contract');
                    if(self._properties.hideFooter && !self._properties.hideHeader){
                        self._component.header.removeClass('rounded border-0');
                    }
                    if(!self._properties.hideFooter && !self._properties.hideHeader){
                        self._component.footer.removeClass('border-0');
                    }
                } else {
                    self._component.collapse.bs.hide()
                    self._component.tools.collapse.icon.removeClass('bi-chevron-bar-contract').addClass('bi-chevron-bar-expand');
                    if(self._properties.hideFooter && !self._properties.hideHeader){
                        self._component.header.addClass('rounded border-0');
                    }
                    if(!self._properties.hideFooter && !self._properties.hideHeader){
                        self._component.footer.addClass('border-0');
                    }
                }
            });
        } else {
            this._component.tools.collapse.addClass('d-none');
        }
        if(this._properties.collapsed){
            this._component.collapse.removeClass('show');
            this._component.tools.collapse.icon.removeClass('bi-chevron-bar-contract').addClass('bi-chevron-bar-expand');
            if(this._properties.hideFooter && !this._properties.hideHeader){
                this._component.header.addClass('rounded border-0');
            }
            if(!this._properties.hideFooter && !this._properties.hideHeader){
                this._component.footer.addClass('border-0');
            }
        }

        // Configure Card Footer
        if(this._properties.footer){
            this._component.footer.html(this._properties.footer);
        }
        if(this._properties.hideFooter){
            this._component.footer.addClass('d-none');
        }
    }
});

builder.add('components','carousel', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
                carousel: null,
                slide: null,
                inner: null,
                indicators: null,
            },
            fade: false,
            touch: true,
            autoplay: false,
            indicators: false,
            controls: true,
            properties: {
                class: {
                    slide: null,
                    image: null,
                    caption: null,
                },
                interval: null,
                caption: null,
                source: null,
                alt: null,
            },
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'carousel' + this._id,
            'class': 'carousel slide',
        });
        this._component.id = this._component.attr('id');

        // Create Indicators
        if(this._properties.indicators){
            this._component.indicators = $(document.createElement('div')).addClass('carousel-indicators').appendTo(this._component);
        }

        // Create Inner
        this._component.inner = $(document.createElement('div')).addClass('carousel-inner').appendTo(this._component);

        // Create Controls
        this._component.controls = {};
        this._component.controls.previous = $(document.createElement('button')).addClass('carousel-control-prev').attr('type','button').attr('data-bs-target','#' + this._component.id).attr('data-bs-slide','prev').appendTo(this._component);
        this._component.controls.previous.icon = $(document.createElement('span')).addClass('carousel-control-prev-icon').attr('aria-hidden','true').appendTo(this._component.controls.previous);
        this._component.controls.previous.label = $(document.createElement('span')).addClass('visually-hidden').text('Previous').appendTo(this._component.controls.previous);
        this._component.controls.next = $(document.createElement('button')).addClass('carousel-control-next').attr('type','button').attr('data-bs-target','#' + this._component.id).attr('data-bs-slide','next').appendTo(this._component);
        this._component.controls.next.icon = $(document.createElement('span')).addClass('carousel-control-next-icon').attr('aria-hidden','true').appendTo(this._component.controls.next);
        this._component.controls.next.label = $(document.createElement('span')).addClass('visually-hidden').text('Next').appendTo(this._component.controls.next);

        // Set Fade
        if(this._properties.fade){
            this._component.addClass('carousel-fade');
        }

        // Set Touch
        if(!this._properties.touch){
            this._component.attr('data-bs-touch','false');
        }

        // Set Auto Play
        if(this._properties.autoplay){
            this._component.attr('data-bs-ride',this._properties.autoplay);
        }

        // Set Controls
        if(!this._properties.controls){
            this._component.controls.previous.addClass('d-none');
            this._component.controls.next.addClass('d-none');
        }

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Carousel Class
        if(this._properties.class.carousel){
            this._component.addClass(this._properties.class.carousel);
        }

        // Set Inner Class
        if(this._properties.class.inner){
            this._component.inner.addClass(this._properties.class.inner);
        }

        // Set Indicators Class
        if(this._properties.class.indicators){
            this._component.indicators.addClass(this._properties.class.indicators);
        }
    }

    add(param1 = null, param2 = null){

        // Set Self
        const self = this;

        let options = {};
        let callback = null;

        // Set selector, options, and callback
        [param1, param2].forEach(param => {
            if(param !== null){
                if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        let properties = {};

        // Configure Options
        for(const [key, value] of Object.entries(this._properties.properties)){
            if(typeof properties[key] === 'undefined'){
                properties[key] = value;
            }
        }
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                switch(key){
                    case"callback":
                        if(typeof properties[key] !== 'undefined'){
                            for(const [k, v] of Object.entries(value)){
                                if(typeof properties[key][k] !== 'undefined'){
                                    properties[key][k] = v;
                                }
                            }
                        }
                        break;
                    case"class":
                        for(const [section, classes] of Object.entries(value)){
                            if(properties[key][section] != null){
                                properties[key][section] += ' ' + classes;
                            } else {
                                properties[key][section] = classes;
                            }
                        }
                        break;
                    default:
                        properties[key] = value;
                        break;
                }
            }
        }

        // Create Slide
        let slide = $(document.createElement('div')).addClass('carousel-item').appendTo(this._component.inner);

        // Create Image
        slide.image = $(document.createElement('img')).addClass('d-block w-100').attr('src',properties.source).attr('alt',properties.alt).appendTo(slide);

        // Create Caption
        slide.caption = $(document.createElement('div')).addClass('carousel-caption d-none d-md-block').appendTo(slide);

        // Create Indicator
        if(this._properties.indicators){
            slide.indicator = $(document.createElement('button')).attr('type','button').attr('data-bs-target','#' + this._component.id).attr('data-bs-slide-to',this._component.inner.children().length - 1).appendTo(this._component.indicators);
        }

        // Set Interval
        if(properties.interval){
            slide.attr('data-bs-interval',properties.interval);
        }

        // Set Caption
        if(properties.caption){
            slide.caption.removeClass('d-none').html(properties.caption);
        } else {
            slide.caption.remove();
        }

        // Set Slide Class
        if(this._properties.class.slide){
            slide.addClass(this._properties.class.slide);
        }
        if(properties.class.slide){
            slide.addClass(this._properties.class.slide);
        }

        // Set Image Class
        if(properties.class.image){
            slide.image.addClass(this._properties.class.image);
        }

        // Set Caption Class
        if(properties.class.caption){
            slide.caption.addClass(this._properties.class.caption);
        }

        // Set Active
        if(this._component.inner.children().length === 1){
            slide.addClass('active');
            if(this._properties.indicators){
                slide.indicator.addClass('active');
            }
        }

        // Execute Callback
        if(typeof callback === 'function'){
            callback(slide, this);
        }

        // Return
        return this;
    }
});

builder.add('components','dropdown', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
                button: null,
                menu: null,
            },
            icon: null,
            label: null,
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).addClass('dropdown').attr('id','dropdown' + this._id);
        this._component.id = this._component.attr('id');

        // Create Button
        this._component.btn = $(document.createElement('button')).addClass('btn btn-link').attr('type','button').attr('data-bs-toggle','dropdown').attr('aria-expanded','false').appendTo(this._component);
        this._component.btn.icon = $(document.createElement('i')).addClass('bi').appendTo(this._component.btn);
        this._component.btn.label = $(document.createElement('span')).appendTo(this._component.btn);
        this._component.menu = $(document.createElement('ul')).addClass('dropdown-menu').appendTo(this._component);

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Menu Class
        if(this._properties.class.menu){
            this._component.menu.addClass(this._properties.class.menu);
        }

        // Set Button Class
        if(this._properties.class.button){
            this._component.btn.addClass(this._properties.class.button);
        }

        // Set Button Icon
        if(this._properties.icon){
            this._component.btn.icon.addClass('bi-' + this._properties.icon);
        }

        // Set Button Label
        if(this._properties.label){
            this._component.btn.label.text(this._properties.label);
            this._component.btn.icon.addClass('me-1');
        }
    }

    item(param1 = null, param2 = null){

        // Set Self
        const self = this;

        let options = {};
        let callback = null;

        // Set selector, options, and callback
        [param1, param2].forEach(param => {
            if(param !== null){
                if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        let properties = {
            class: {
                item: null, //string
                button: null, //string
                label: null, //string
            },
            link: null, //string
            icon: null, //string
            label: null, //string
            visible: null, //function
            click: function(item,self){}, //function
        };

        // Configure Options
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                switch(key){
                    case"class":
                        for(const [section, classes] of Object.entries(value)){
                            if(properties[key][section] != null){
                                properties[key][section] += ' ' + classes;
                            } else {
                                properties[key][section] = classes;
                            }
                        }
                        break;
                    default:
                        properties[key] = value;
                        break;
                }
            }
        }

        // Create Item
        var item = $(document.createElement('li')).appendTo(this._component.menu);

        // Save Item options
        item.properties = properties;

        // Set Item Link/Button
        if(item.properties.link != null){
            item.btn = $(document.createElement('a')).attr('href',item.properties.link).addClass('dropdown-item').appendTo(item);
        } else {
            item.btn = $(document.createElement('button')).attr('type','button').addClass('dropdown-item').appendTo(item);
        }

        // Set Item Icon
        item.icon = $(document.createElement('i')).addClass('me-1 bi').appendTo(item.btn);
        if(item.properties.icon != null){
            item.icon.addClass('bi-' + item.properties.icon);
        }

        // Set Item Label
        item.label = $(document.createElement('span')).appendTo(item.btn);
        if(item.properties.label != null){
            item.label.text(item.properties.label);
        }

        // Set Item Class
        if(item.properties.class.item){
            item.addClass(item.properties.class.item);
        }

        // Set Button Class
        if(item.properties.class.button){
            item.btn.addClass(item.properties.class.button);
        }

        // Set Label Class
        if(item.properties.class.label){
            item.label.addClass(item.properties.class.label);
        }

        // Set Item Visibility
        if(item.properties.visible !== null){
            if(typeof item.properties.visible === 'function'){
                if(!item.properties.visible()){
                    item.hide();
                }
            } else if(typeof item.properties.visible === 'boolean'){
                if(!item.properties.visible){
                    item.hide();
                }
            }
        }

        // Set Item Click Event
        if(item.properties.click !== null){
            if(typeof item.properties.click === 'function'){
                item.btn.click(function(){
                    item.properties.click(item,self);
                });
            }
        }

        // Execute Callback
        if(typeof callback === 'function'){
            callback(item,this);
        }

        // Return
        return this;
    }

    seperator(){

        // Set Self
        const self = this;

        // Create Seperator
        var seperator = $(document.createElement('li')).appendTo(this._component.menu);
        seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider').appendTo(seperator);

        // Return
        return this;
    }
});

builder.add('components','list', class extends builder.ComponentClass {

    #tools = {};
    #actions = {};
    _items = {};

    _init(){
        this._properties = {
            class: {
                component: null,
                item: null,
            },
            callback: {
                tool: null,
                action: null,
                item: null,
                click: null,
                dblclick: null,
                separator: null,
            },
            icon: null,
            tools:{},
            actions:{},
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('ul')).attr({
            'id': 'list' + this._id,
            'class': 'list-group list-group-flush',
        });
        this._component.id = this._component.attr('id');

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Add List to Search
        this._builder.Search.add(this._component);
    }

    _timeout(){

        // Set Self
        const self = this;

        // Add Tools
        for(var [name, tool] of Object.entries(this._properties.tools)){
            tool.name = name;
            this.tool(tool);
        }

        // Add Actions
        for(var [name, action] of Object.entries(this._properties.actions)){
            action.name = name;
            this.action(action);
        }

        // Generate Tools
        this.#genTools();

        // Generate Actions
        for(var [id, item] of Object.entries(this._items)){
            this.#genActions(item);
        }

        // Remove Tools if none exist
        if(Object.entries(this.#tools).length <= 0){
            if(typeof this._component.tools !== 'undefined'){
                this._component.tools.remove();
            }
        }
    }

    action(options){

        // Configure Options
        let properties = {
            icon: null,
            label: null,
            color: null,
            class: null,
            callback: null,
            format: null,
            name:null,
        };
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                properties[key] = value;
            }
        }

        // Check if Action Name is Set
        if(properties.name == null){
            console.log('List: Action name is required');
            return false;
        }

        // Check if Action Name Exists
        if(typeof this.#actions[properties.name] !== 'undefined'){
            console.log('List: Action "'+properties.name+'" already exists');
            return false;
        }

        // Store Action
        this.#actions[properties.name] = properties;

        // Return Object
        return this;
    }

    tool(options){

        // Configure Options
        let properties = {
            icon: null,
            label: null,
            color: null,
            class: null,
            callback: null,
            format: null,
            name:null,
        };
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                properties[key] = value;
            }
        }

        // Check if Tool Name is Set
        if(properties.name == null){
            console.log('List: Tool name is required');
            return false;
        }

        // Check if Tool Name Exists
        if(typeof this.#tools[properties.name] !== 'undefined'){
            console.log('List: Tool "'+properties.name+'" already exists');
            return false;
        }

        // Store Tool
        this.#tools[properties.name] = properties;

        // Return Object
        return this;
    }

    #genActions(item){

        // Set Self
        const self = this;

        // Check if Item wants actions
        if(!item.properties.actions){
            return false;
        }

        // Create Actions Group
        let actions = $(document.createElement('div')).addClass('flex-shrink-1 mx-1 btn-group pe-3').appendTo(item.container);

        // Create Actions Array Property
        actions.actions = {};

        // Create Actions Button
        for(const [name, properties] of Object.entries(this.#actions)){
            actions.actions[name] = this.#genAction(item, actions, name);
        }

        // Save Actions in Item
        this._items[item.id].actions = actions;

        // Return Actions
        return actions;
    }

    #genAction(item, actions, name){

        // Set Self
        const self = this;

        // Check if Action Name Exists
        if(typeof this.#actions[name] === 'undefined'){
            console.log('List: Action "'+name+'" does not exist');
            return false;
        }

        // Create Action Button
        let action = $(document.createElement('button')).attr({
            'type': 'button',
            'class': 'btn btn-sm btn-light',
            'data-action': name,
        }).appendTo(actions);

        // Save Action Properties
        action.properties = this.#actions[name];

        // Add Action Button Class
        if(action.properties.class){
            action.addClass(action.properties.class);
        }

        // Set Action Button Color
        if(action.properties.color){
            action.removeClass('btn-light').addClass('btn-' + action.properties.color);
        }

        // Add Action Button Icon
        if(action.properties.icon){
            action.icon = $(document.createElement('i')).addClass('bi bi-' + action.properties.icon).appendTo(action);
        }

        // Add Action Button Label
        if(action.properties.label){
            action.label = $(document.createElement('span')).addClass('text-capitalize').html(action.properties.label).appendTo(action)
        }

        // Add Action Button Icon Spacing
        if(action.properties.icon && action.properties.label){
            action.icon.addClass('me-1')
        }

        // Add Action Button Click Event
        action.click(function(){
            if(typeof action.properties.callback === 'function'){
                action.properties.callback(action,item,self);
            }
        });
        if(typeof self._properties.callback.action === 'function'){
            self._properties.callback.action(action,item,self);
        }
        if(typeof action.properties.format === 'function'){
            action.properties.format(action,item,self);
        }

        // Return Action
        return action;
    }

    #genTools(){

        // Set Self
        const self = this;

        // Create Tools Group
        let tools = $(document.createElement('li')).addClass('list-group-item user-select-none').prependTo(this._component);
        tools.flex = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center').appendTo(tools);
        tools.group = $(document.createElement('div')).addClass('btn-group w-100').appendTo(tools.flex);

        // Create Tools Array Property
        tools.tools = {};

        // Create Tools Button
        for(const [name, properties] of Object.entries(this.#tools)){
            tools.tools[name] = this.#genTool(tools, name);
        }

        // Save Tools in Component
        this._component.tools = tools;

        // Return Tools
        return tools;
    }

    #genTool(tools, name){

        // Set Self
        const self = this;

        // Check if Tool Name Exists
        if(typeof this.#tools[name] === 'undefined'){
            console.log('List: Tool "'+name+'" does not exist');
            return false;
        }

        // Create Tool Button
        let tool = $(document.createElement('button')).attr({
            'type': 'button',
            'class': 'btn btn-light',
            'data-action': name,
        }).appendTo(tools.group);

        // Save Tool Properties
        tool.properties = this.#tools[name];

        // Add Tool Button Class
        if(tool.properties.class){
            tool.addClass(tool.properties.class);
        }

        // Add Tool Color
        if(tool.properties.color){
            tool.removeClass('btn-light').addClass('btn-' + tool.properties.color)
        }

        // Add Tool Icon
        if(tool.properties.icon){
            tool.icon = $(document.createElement('i')).addClass('bi bi-' + tool.properties.icon).appendTo(tool)
        }

        // Add Tool Label
        if(tool.properties.label){
            tool.label = $(document.createElement('span')).addClass('text-capitalize').html(tool.properties.label).appendTo(tool)
        }

        // Add Icon Spacing
        if(tool.properties.icon && tool.properties.label){
            tool.icon.addClass('me-1')
        }

        // Add Tool Callback
        tool.click(function(){
            if(typeof tool.properties.callback === 'function'){
                tool.properties.callback(tool, self)
            }
        });

        // Add Callback Function
        if(typeof self._properties.callback.tool === 'function'){
            self._properties.callback.tool(tool, self)
        }
        if(typeof tool.properties.format === 'function'){
            tool.properties.format(tool, self)
        }

        // Return Tool
        return tool;
    }

    get(){
        return this._items;
    }

    add(param1 = null, param2 = null){

        // Set Self
        const self = this;

        let options = {};
        let callback = null;

        // Set selector, options, and callback
        [param1, param2].forEach(param => {
            if(param !== null){
                if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        // Configure Options
        let properties = {
            icon: null,
            tooltip: null,
            class: null,
            field: null,
            click: null,
            dblclick: null,
            actions: true,
        };
        for(const [key, value] of Object.entries(this._properties)){
            switch(key){
                case"callback":
                    for(const [name, opts] of Object.entries(value)){
                        if(typeof this._properties[key][name] !== 'undefined'){
                            this._properties[key][name] = opts;
                        }
                    }
                    break
                default:
                    if(typeof properties[key] !== 'undefined'){
                        properties[key] = value
                    }
                    break
            }
        }
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                properties[key] = value;
            }
        }

        // Create ID
        let id = this._count();

        // Create Item
        let item = $(document.createElement('li')).attr({
            'id': this._component.id + 'item' + id,
            'class': 'list-group-item item user-select-none p-0',
            'style': 'transition: all 300ms ease 0s;',
        }).appendTo(this._component);

        // Save ID
        item.id = item.attr('id');

        // Save Options
        item.properties = properties;

        // Set Tooltip
        if(properties.tooltip){
            item.attr({
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'left',
                'data-bs-title': properties.tooltip,
                'title': properties.tooltip,
            });
            new bootstrap.Tooltip(item);
        }

        // Add Item Row
        item.container = $(document.createElement('div')).addClass('d-flex align-items-center').appendTo(item);

        // Add Item Icon
        if(properties.icon){
            item.container.icon = $(document.createElement('div')).addClass('flex-shrink-1 ps-3 py-2').appendTo(item.container);
            item.icon = $(document.createElement('i')).appendTo(item.container.icon);
            item.icon.addClass('bi bi-' + properties.icon);
        }

        // Add Item Field
        item.field = $(document.createElement('div')).addClass('flex-grow-1 text-break px-1 py-2').appendTo(item.container);

        // Check if Icon Exists
        if(properties.icon){
            item.field.addClass('ps-2');
        }

        // Check if Actions Exist
        if(properties.actions){
            item.field.addClass('pe-0');
        }

        // Add Item Field Content
        if(properties.field){
            item.field.html(properties.field);
        }

        // Add Item Class
        if(this._properties.class.item){
            item.addClass(this._properties.class.item);
        }

        // Add Item Class
        if(item.properties.class){
            item.addClass(item.properties.class);
        }

        // Add Item Click and Double Click Events
        if(typeof item.properties.click === 'function' || typeof item.properties.dblclick === 'function' || typeof self._properties.callback.click === 'function' || typeof self._properties.callback.dblclick === 'function'){

            // Add Item Cursor Pointer
            item.addClass('cursor-pointer')

            // Add Item Hover Effect
            item.hover(function(){
                item.addClass("text-bg-primary");
            }, function(){
                item.removeClass("text-bg-primary");
            });

            // Add Item Click Event
            if(typeof item.field !== 'undefined'){
                item.field.click(function(){
                    if(typeof self._properties.callback.click === 'function'){
                        self._properties.callback.click(item, self);
                    }
                    if(typeof item.properties.click === 'function'){
                        item.properties.click(item, self);
                    }
                });
            }
            if(typeof item.container.icon !== 'undefined'){
                item.container.icon.click(function(){
                    if(typeof self._properties.callback.click === 'function'){
                        self._properties.callback.click(item, self);
                    }
                    if(typeof item.properties.click === 'function'){
                        item.properties.click(item, self);
                    }
                });
            }

            // Add Item Double Click Event
            if(typeof item.field !== 'undefined'){
                item.field.dblclick(function(){
                    if(typeof self._properties.callback.click === 'function'){
                        self._properties.callback.click(item, self);
                    }
                    if(typeof item.properties.click === 'function'){
                        item.properties.click(item, self);
                    }
                });
            }
            if(typeof item.container.icon !== 'undefined'){
                item.icon.dblclick(function(){
                    if(typeof self._properties.callback.click === 'function'){
                        self._properties.callback.click(item, self);
                    }
                    if(typeof item.properties.click === 'function'){
                        item.properties.click(item, self);
                    }
                });
            }
        }

        // Add List Callback
        if(typeof this._properties.callback.item === 'function'){
            this._properties.callback.item(item,self);
        }

        // Execute Callback
        if(typeof callback === 'function'){
            callback(item,self);
        }

        // Check if rounded
        if(this._component.hasClass('rounded') && this._component.find('li').length > 0){
            this._component.find('li').removeClass('rounded rounded-top rounded-bottom');
            if(this._component.find('li').length === 1){
                this._component.find('li').addClass('rounded');
            } else {
                this._component.find('li:first').addClass('rounded-top');
                this._component.find('li:last').addClass('rounded-bottom');
            }
        }

        // Set Item Search
        this._builder.Search.set(item);

        // Save Item
        this._items[item.id] = item;

        // Return Object
        return this;
    }
});

builder.add('components','modal', class extends builder.ComponentClass {

    _ownedBackdrop = null;

    _init(){
        this._properties = {
            class: {
                component: null,
                dialog: null,
                content: null,
                header: null,
                body: null,
                footer: null,
            },
            callback: {
                submit: null,
                cancel: null,
                fullscreen: null,
                close: null,
                load: null,
                onShow: null,
                onShown: null,
                onHide: null,
                onHidden: null,
            },
            color: null,
            onEnter: true,
            close:true,
            fullscreen:true,
            destroy:true,
            icon:null,
            title: null,
            body: null,
            footer: true,
            static: false,
            cancel: true,
            submit: true,
            center: false,
            size: 'none',
        };
    }

    _insert(){

        // Set Self
        const self = this;

        // Check if Selector is Set
        if(this._component && this._selector){

            // Add Class to Selector
            this._selector.addClass('cursor-pointer');

            // Add Event to Selector
            this._selector.click(function(){
                self.toggle();
            });
        }
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div'))
            .attr({
                'id': 'modal' + this._id,
                'class': 'modal fade',
                'tabindex': -1,
            })
            .toggleClass('opacity-0',typeof self._properties.callback.load === 'function')
            .toggleClass('modal-'+self._properties.color,self._properties.color !== null)
            .appendTo('body');
        this._component.id = this._component.attr('id');

        // Create Dialog
        this._component.dialog = $(document.createElement('div')).addClass('modal-dialog').appendTo(this._component);

        // Create Content
        this._component.dialog.content = $(document.createElement('div')).addClass('modal-content').appendTo(this._component.dialog);

        // Create Header
        this._component.dialog.content.header = $(document.createElement('div')).addClass('modal-header').appendTo(this._component.dialog.content);
        this._component.header = this._component.dialog.content.header;

        // Create Title
        this._component.dialog.content.header.title = $(document.createElement('h5')).addClass('modal-title').appendTo(this._component.dialog.content.header);
        this._component.dialog.content.header.title.icon = $(document.createElement('i')).addClass('me-2 bi').appendTo(this._component.dialog.content.header.title);
        this._component.dialog.content.header.title.label = $(document.createElement('span')).appendTo(this._component.dialog.content.header.title);

        // Create Tools
        this._component.dialog.content.header.tools = $(document.createElement('div')).addClass('btn-group').appendTo(this._component.dialog.content.header);

        // Create FullScreen Button
        this._component.dialog.content.header.tools.fullscreen = $(document.createElement('button')).attr('type','button').addClass('btn btn-lg btn-link').html('<i class="bi-fullscreen"></i>').attr('data-bs-toggle','modal-fullscreen').attr('data-bs-target','#' + this._component.id).attr('aria-label','Fullscreen').appendTo(this._component.dialog.content.header.tools);

        // Create Close Button
        this._component.dialog.content.header.tools.close = $(document.createElement('button')).attr('type','button').addClass('btn btn-lg btn-link').html('<i class="bi-x-lg"></i>').attr('data-bs-dismiss','modal').attr('aria-label','Close').appendTo(this._component.dialog.content.header.tools);

        // Create Body
        this._component.dialog.content.body = $(document.createElement('div')).addClass('modal-body').appendTo(this._component.dialog.content);
        this._component.body = this._component.dialog.content.body;

        // Create Footer
        this._component.dialog.content.footer = $(document.createElement('div')).addClass('modal-footer').appendTo(this._component.dialog.content);
        this._component.footer = this._component.dialog.content.footer;

        // Create Cancel Button
        this._component.dialog.content.footer.cancel = $(document.createElement('button'))
            .attr('type','button')
            .addClass('btn btn-lg btn-gray-200')
            .attr('data-bs-dismiss','modal')
            .text(this._builder.Locale.get('Cancel'))
            .appendTo(this._component.dialog.content.footer);

        // Create Submit Button
        this._component.dialog.content.footer.submit = $(document.createElement('button'))
            .attr('type','button')
            .addClass('btn btn-lg')
            .toggleClass('btn-'+self._properties.color,self._properties.color !== null)
            .toggleClass('btn-link',self._properties.color === null)
            .text(this._builder.Locale.get('Submit'))
            .appendTo(this._component.dialog.content.footer);

        // Set Size
        if(this._properties.size != null && typeof this._properties.size === 'string'){
            switch(this._properties.size){
                case"small":
                case"sm":
                    this._component.dialog.addClass('modal-sm')
                    break
                case"default":
                case"none":
                    break
                case"large":
                case"lg":
                    this._component.dialog.addClass('modal-lg')
                    break
                case"extra-large":
                case"xl":
                    this._component.dialog.addClass('modal-xl')
                    break
                case"xxl":
                case"fullscreen":
                    this._component.dialog.addClass('modal-fullscreen')
                    break
            }
        }

        // Set Center
        if(this._properties.center != null && typeof this._properties.center === 'boolean' && this._properties.center){
            this._component.dialog.addClass('modal-dialog-centered');
        }

        // Set Static
        if(this._properties.static != null && typeof this._properties.static === 'boolean' && this._properties.static){
            this._component.attr('data-bs-backdrop','static').attr('data-bs-keyboard',false);
        }

        // Set Icon
        if(this._properties.icon != null){
            this._component.dialog.content.header.title.icon.addClass('bi-' + this._properties.icon);
        } else {
            this._component.dialog.content.header.title.icon.addClass('d-none');
        }

        // Set Title
        if(this._properties.title != null){
            this._component.dialog.content.header.title.label.html(this._properties.title);
        }

        // Set Body
        if(this._properties.body != null){
            this._component.dialog.content.body.html(this._properties.body);
        }

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Dialog Class
        if(this._properties.class.dialog){
            this._component.dialog.addClass(this._properties.class.dialog);
        }

        // Set Content Class
        if(this._properties.class.content){
            this._component.dialog.content.addClass(this._properties.class.content);
        }

        // Set Header Class
        if(this._properties.class.header){
            this._component.dialog.content.header.addClass(this._properties.class.header);
        }

        // Set Body Class
        if(this._properties.class.body){
            this._component.dialog.content.body.addClass(this._properties.class.body);
        }

        // Set Footer Class
        if(this._properties.class.footer){
            this._component.dialog.content.footer.addClass(this._properties.class.footer);
        }

        // Initialize Bootstrap Modal
        this._bootstrap = new bootstrap.Modal(this._component);

        // Destroy
        if(this._properties.destroy){
            this._component.on('hide.bs.modal',function(){
                self._component.remove();
            });
        }

        // onEnter
        if(this._properties.onEnter){
            this._component.on('keypress',function(e){
                if(e.which == 13) {
                    self._component.dialog.content.footer.submit.click();
                }
            });
        }

        // Fullscreen
        if(this._properties.fullscreen){
            this._component.dialog.content.header.tools.fullscreen.click(function(){
                if(self._component.dialog.hasClass('modal-fullscreen')){
                    self._component.dialog.removeClass('modal-fullscreen');
                    self._component.dialog.content.header.tools.fullscreen.html('<i class="bi-fullscreen"></i>');
                } else {
                    self._component.dialog.addClass('modal-fullscreen');
                    self._component.dialog.content.header.tools.fullscreen.html('<i class="bi-fullscreen-exit"></i>');
                }
            });
        } else {
            this._component.dialog.content.header.tools.fullscreen.addClass('d-none');
        }

        // Close
        if(!this._properties.close){
            this._component.dialog.content.header.tools.close.addClass('d-none');
        }

        // Cancel
        if(!this._properties.cancel){
            this._component.dialog.content.footer.cancel.remove();
        }

        // Submit
        if(!this._properties.submit){
            this._component.dialog.content.footer.submit.remove();
        }

        this._component.on('shown.bs.modal', function () {

            // Prefer Bootstrap's internal handle when available (private API)
            const el = self._bootstrap._backdrop?._element || document.querySelector('body > .modal-backdrop:last-of-type');

            if (el) {
                el.classList.add('hide');
                if(typeof self._properties.color === 'string'){
                    el.classList.add('text-' + self._properties.color);
                } else {
                    el.classList.add('text-primary');
                }
                el.dataset.owner = self._component.id;
                self._ownedBackdrop = el;

                // Add support for stacked modals
                const zIndex = window.getComputedStyle(el).zIndex;
                if (zIndex !== 'auto') {
                    self._component.css('zIndex', (parseInt(zIndex) + (10 * $('.modal.show').length)));
                    $(self._ownedBackdrop).css('zIndex', (parseInt(zIndex) + (10 * $('.modal.show').length)) - 5);
                }
            }

            // Check for Load Callback (promise supported)
            if(typeof self._properties.callback.load === 'function'){
                self.spinner(true);
                let ret = self._properties.callback.load(self._component,self);
                if(ret instanceof Promise){
                    ret.then(function(){
                        self.spinner(false);
                    }).catch(function(){
                        self.spinner(false);
                    });
                } else {
                    self.spinner(false);
                }
            }

            // Callback Function on Shown
            if(typeof self._properties.callback.onShown === 'function'){
                self._properties.callback.onShown(self._component,self);
            }
        });

        // Callback Function on Show
        this._component.on('show.bs.modal',function(){
            if(typeof self._properties.callback.onShow === 'function'){
                self._properties.callback.onShow(self._component,self);
            }
        });

        // Callback Function on Hidden
        this._component.on('hidden.bs.modal',function(){
            if(typeof self._properties.callback.onHidden === 'function'){
                self._properties.callback.onHidden(self._component,self);
            }
        });

        // Callback Function on Hide
        this._component.on('hide.bs.modal',function(){
            if(typeof self._properties.callback.onHide === 'function'){
                self._properties.callback.onHide(self._component,self);
            }
        });

        // Callback Function on Close
        if(typeof this._properties.callback.close === 'function'){
            this._component.dialog.content.header.tools.close.click(function(){
                self._properties.callback.close(self._component,self);
            });
        }

        // Callback Function on Fullscreen
        if(typeof this._properties.callback.fullscreen === 'function'){
            this._component.dialog.content.header.tools.fullscreen.click(function(){
                self._properties.callback.fullscreen(self._component,self);
            });
        }

        // Callback Function on Cancel
        if(typeof this._properties.callback.cancel === 'function'){
            this._component.dialog.content.footer.cancel.click(function(){
                self._properties.callback.cancel(self._component,self);
            });
        }

        // Callback Function on Submit
        if(typeof this._properties.callback.submit === 'function'){
            this._component.dialog.content.footer.submit.click(function(){
                self._properties.callback.submit(self._component,self);
            });
        }
    }

    add(param1 = null, param2 = null){

        // Set Self
        const self = this;

        let options = {};
        let callback = null;

        let properties = {
            icon: null,
            label: null,
            color: null,
        };

        // Set options, and callback
        [param1, param2].forEach(param => {
            if(param !== null){
                if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        // Configure Options
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                switch(key){
                    case"class":
                        for(const [section, classes] of Object.entries(value)){
                            if(properties[key][section] != null){
                                properties[key][section] += ' ' + classes;
                            } else {
                                properties[key][section] = classes;
                            }
                        }
                        break;
                    default:
                        properties[key] = value;
                        break;
                }
            }
        }

        // Create Action Button
        let action = $(document.createElement('button')).attr({
            'class': 'btn btn-lg btn-link',
            'type': 'button',
        }).prependTo(this._component.dialog.content.footer);
        action.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + properties.icon).prependTo(action);
        action.label = $(document.createElement('span')).appendTo(action);
        action.properties = properties;

        // Set icon
        if(properties.icon == null){
            action.icon.remove();
        }

        // Set label
        if(properties.label){
            action.label.text(properties.label);
        }

        // Set color
        if(properties.color){
            action.removeClass('btn-link').addClass('btn-' + properties.color);
        }

        // Execute Callback
        if(typeof callback === 'function'){
            callback(action,self._component,self);
        }

        // Return
        return action;
    }

    spinner(state = true){

        // Set Self
        const self = this;

        // Add or Remove Show on the modal
        this._component.removeClass('opacity-0').toggleClass('show', !state);

        // Add or Remove Spinner Overlay
        this._ownedBackdrop?.classList.toggle('hide', !state);

        // Check State
        if(!state){

            // Enable Tooltips
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
                .forEach(tooltip => {
                    new bootstrap.Tooltip(tooltip)
                });
        }
    }

    show(){
        this._bootstrap.show();
    }

    hide(){
        this._bootstrap.hide();
    }

    toggle(){
        this._bootstrap.toggle();
    }
});

builder.add('components','offcanvas', class extends builder.ComponentClass {

    _init(){
        this._properties = {
            class: {
                component: null,
            },
            callback: {
                show: null,
                shown: null,
                hide: null,
                hidden: null,
            },
            icon: null,
            title: null,
            body: null,
            dismissible: true,
            backdrop: true,
            scroll: true,
            color: null,
            side: null,
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'offcanvas' + this._id,
            'class': 'offcanvas',
            'tabindex': -1,
            'data-bs-scroll': this._properties.scroll,
            'data-bs-backdrop': this._properties.backdrop,
        }).prependTo('body');
        this._component.id = this._component.attr('id');

        // Create Header
        this._component.header = $(document.createElement('div')).addClass('offcanvas-header').appendTo(this._component);
        this._component.header.title = $(document.createElement('h5')).addClass('offcanvas-title').appendTo(this._component.header);

        // Create Icon
        this._component.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + this._properties.icon).appendTo(this._component.header.title);

        // Create Title
        this._component.title = $(document.createElement('span')).text(this._properties.title).appendTo(this._component.header.title);

        // Create Close Button
        this._component.close = $(document.createElement('button')).attr({
            'class': 'btn-close',
            'type': 'button',
            'aria-label': 'Close',
            'data-bs-dismiss': 'offcanvas',
        }).appendTo(this._component.header);

        // Create Body
        this._component.body = $(document.createElement('div')).addClass('offcanvas-body').html(this._properties.body).appendTo(this._component);

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Icon
        if(this._properties.icon == null){
            this._component.icon.remove();
        }

        // Set Color
        if(this._properties.color){
            this._component.addClass('text-bg-' + this._properties.color);
        }

        // Set Dismissible
        if(!this._properties.dismissible){
            this._component.close.remove();
        }

        // Set Side
        switch(this._properties.side){
            case"start":
            case"end":
            case"top":
            case"bottom":
                this._component.addClass('offcanvas-' + this._properties.side);
                break;
            default:
                this._component.addClass('offcanvas-end');
                break;
        }

        // Initialize Bootstrap Offcanvas
        this._bootstrap = new bootstrap.Offcanvas(this._component);

        // Set Callbacks
        if(typeof this._properties.callback.show === 'function'){
            this._component.on('show.bs.offcanvas', function(){
                self._properties.callback.show(self,self._component);
            });
        }
        if(typeof this._properties.callback.shown === 'function'){
            this._component.on('shown.bs.offcanvas', function(){
                self._properties.callback.shown(self,self._component);
            });
        }
        if(typeof this._properties.callback.hide === 'function'){
            this._component.on('hide.bs.offcanvas', function(){
                self._properties.callback.hide(self,self._component);
            });
        }
        if(typeof this._properties.callback.hidden === 'function'){
            this._component.on('hidden.bs.offcanvas', function(){
                self._properties.callback.hidden(self,self._component);
            });
        }
    }

    _insert(){

        // Set Self
        const self = this;

        // Check if Selector is Set
        if(this._component && this._selector){

            // Add Class to Selector
            this._selector.addClass('cursor-pointer');

            // Add Event to Selector
            this._selector.click(function(){
                self.toggle();
            });
        }
    }

    bootstrap(){
        return this._bootstrap;
    }

    show(){
        this._bootstrap.show();
    }

    hide(){
        this._bootstrap.hide();
    }

    toggle(){
        this._bootstrap.toggle();
    }
});

builder.add('components','progress', class extends builder.ComponentClass {

    #value = 0;
    #scaleValue = 0;

    _init(){
        this._properties = {
            class: {
                component: null,
                bar: null,
                label: null,
            },
            callback: {
                change: null,
            },
            size: null,
            color: null,
            striped: true,
            animated: true,
            label: null,
            scale: 100,
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr('id','progress' + this._id).addClass('progress');

        // Create Progress Bar
        this._component.bar = $(document.createElement('div')).addClass('progress-bar').appendTo(this._component);
        this._component.bar.label = $(document.createElement('span')).addClass('progress-label').appendTo(this._component.bar);

        // Set Progress Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Set Bar Class
        if(this._properties.class.bar){
            this._component.bar.addClass(this._properties.class.bar);
        }

        // Set Label Class
        if(this._properties.class.label){
            this._component.bar.label.addClass(this._properties.class.label);
        }

        // Set Size
        if(this._properties.size){
            this._component.css({height:this._properties.size});
        }

        // Set Color
        if(this._properties.color){
            this._component.bar.addClass('text-bg-' + this._properties.color);
        }

        // Set Striped
        if(this._properties.striped){
            this._component.bar.addClass('progress-bar-striped');
        }

        // Set Animated
        if(this._properties.animated){
            this._component.bar.addClass('progress-bar-animated');
        }

        // Set Label
        if(this._properties.label){
            this._component.bar.label.html(this._properties.label);
        }
    }

    set(value){

        // Set Scale
        this._component.bar.attr('aria-valuemin',0).attr('aria-valuemax',this._properties.scale);

        // Save Value
        this.#value = value;
        this.#scaleValue = Math.round((value / this._properties.scale) * 100);

        // Set Value
        this._component.bar.css({width:this.#scaleValue + '%'}).attr('aria-valuenow',this.#value);

        // Set Label
        if(this._properties.label){
            this._component.bar.label.html(this._properties.label.replace('{progress}', this.#value).replace('{percent}', this.#scaleValue + '%').replace('{scale}', this._properties.scale));
        }

        // Execute Callback
        if(typeof this._properties.callback.change === 'function'){
            this._properties.callback.change(this);
        }

        // Return Object
        return this;
    }

    get(){

        // Return Value
        return this.#value;
    }

    val(value = null){
        if(value){
            return this.set(value);
        } else {
            return this.get();
        }
    }
});

builder.add('components','tabs', class extends builder.ComponentClass {

    #navbar = null;
    #content = null;
    #tabs = {};
    #id = null;

    _init(){
        this._properties = {
            class: {
                component: null,
                card: null,
                header: null,
                body: null,
                footer: null,
                navbar: null,
                content: null,
            },
            icon: null,
            title: null,
            footer: null,
            stretch: false,
            hideHeader: false,
            hideFooter: true,
            close:true,
            fullscreen: true,
            collapse: true,
            collapsed: false,
            properties: {
                class: {
                    nav: null,
                    tab: null,
                },
                icon: null,
                label: null,
                callback: null,
            },
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Card
        this._component = this._builder.Component('card',this._properties,function(card,component){

            // ID
            self.#id = component.id;

            // Set Card Class
            component.header.title.addClass('d-flex justify-content-start align-items-center');

            // Create Tabs Nav
            self.#navbar = $(document.createElement('div')).addClass('nav').attr('role','tablist').appendTo(component.header.title);

            // If a card title is set, add margin to the left of the tabs
            if(self._properties.title){
                self.#navbar.addClass('ms-2');
            }

            // Set Tabs Nav Class
            if(self._properties.class.navbar){
                self.#navbar.addClass(self._properties.class.navbar);
            }

            // Create Tabs Content
            self.#content = $(document.createElement('div')).addClass('tab-content').appendTo(component.body);

            // Set Tabs Content Class
            if(self._properties.class.content){
                self.#content.addClass(self._properties.class.content);
            }
        });
    }

    add(param1 = null, param2 = null, param3 = null){

        // Set Self
        const self = this;

        let name = null;
        let options = {};
        let callback = null;

        // Set selector, options, and callback
        [param1, param2, param3].forEach(param => {
            if(param !== null){
                if (typeof param === 'string') {
                    name = param;
                } else if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        // Set Properties
        var properties = {};

        // Configure Properties
        for(const [key, value] of Object.entries(this._properties.properties)){
            if(typeof properties[key] === 'undefined'){
                properties[key] = value;
            }
        }

        // Configure Options
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                switch(key){
                    case"class":
                        for(const [section, classes] of Object.entries(value)){
                            if(properties[key][section] != null){
                                properties[key][section] += ' ' + classes;
                            } else {
                                properties[key][section] = classes;
                            }
                        }
                        break;
                    default:
                        properties[key] = value;
                        break;
                }
            }
        }

        // Check if Tab Exists
        if(typeof this.#tabs[name] !== 'undefined'){
            console.log('This Tab Already Exists');
            return false;
        }

        // Create Tab
        var tab = {};

        // Set ID
        tab.id = this._count();

        // Set Properties
        tab.properties = properties;

        // Create Tab Nav
        tab.nav = $(document.createElement('button')).attr({
            'id': this.#id + 'nav' + tab.id,
            'class': 'nav-link',
            'type': 'button',
            'role': 'tab',
            'data-bs-toggle': 'tab',
            'aria-selected': false,
            'data-bs-target': '#' + this.#id + 'tab' + tab.id,
            'aria-controls': this.#id + 'tab' + tab.id,
        }).appendTo(this.#navbar);
        tab.nav.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + properties.icon).appendTo(tab.nav);
        tab.nav.label = $(document.createElement('span')).addClass('text-capitalize').appendTo(tab.nav);

        // Create Tab Content
        tab.tab = $(document.createElement('div')).attr({
            'id': this.#id + 'tab' + tab.id,
            'class': 'tab-pane fade',
            'role': 'tabpanel',
            'aria-labelledby': this.#id + 'nav' + tab.id,
        }).appendTo(this.#content);

        // Set Tab Nav Class
        if(properties.class.nav){
            tab.nav.addClass(properties.class.nav);
        }

        // Set Tab Content Class
        if(properties.class.tab){
            tab.tab.addClass(properties.class.tab);
        }

        // Set Tab Nav Icon
        if(properties.icon == null){
            tab.nav.icon.remove();
        }

        // Set Tab Nav Label
        if(properties.label){
            tab.nav.label.text(properties.label);
        } else {
            tab.nav.label.text(name);
        }

        // Execute Callback
        if(typeof properties.callback === 'function'){
            properties.callback(tab.tab,tab.nav,this);
        }

        // Execute Callback
        if(typeof callback === 'function'){
            callback(tab.tab,tab.nav,this);
        }

        // Set Active Tab
        if(tab.id === 1){

            // Set First Tab as Active
            tab.tab.addClass('show active');

            // Set First Nav as Active
            tab.nav.addClass('active');
        }

        // Save Tab
        this.#tabs[name] = tab;

        // Return Object
        return this;
    }

    outerHTML(){

        // Return Object
        return this._component.outerHTML();
    }
});
