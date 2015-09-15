$(function(){

    // for checkbox dropdowns 
    function DropDown(el) {
        this.dd = el;
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = [];
        this.index = [];
        this.initEvents();
    }
  
    DropDown.prototype = {
      initEvents : function() {
          var obj = this;

            obj.dd.on('click', function(event){
                $(this).toggleClass('active');
                console.log('dd clicked')
                event.stopPropagation();
            });

        obj.opts.children('label').on('click',function(event){
            var opt = $(this).parent(),
                chbox = opt.children('input'),
                val = chbox.val(),
                idx = opt.index();

            ($.inArray(val, obj.val) !== -1) ? obj.val.splice( $.inArray(val, obj.val), 1 ) : obj.val.push( val );
            ($.inArray(idx, obj.index) !== -1) ? obj.index.splice( $.inArray(idx, obj.index), 1 ) : obj.index.push( idx );
            });
        },
        getValue : function() {
            return this.val;
        },
        getIndex : function() {
            return this.index;
        }

    }

    $(function() {

        var dd = new DropDown( $('#dd') );

        $(document).click(function() {
            // all dropdowns
            $('.wrapper-dropdown').removeClass('active');
        });

    });

    // for select dropdowns 

    function DropDown2(el) {
        this.dd2 = el;
        this.initEvents();
    };
    
    DropDown2.prototype = {
        initEvents : function() {
            var obj = this;

            obj.dd2.on('click', function(event){
                console.log('dd2 clicked')
            $(this).toggleClass('active');
            event.stopPropagation();
            }); 
        }
    };

    $(function() {

        var dd2 = new DropDown2( $('#dd2') );

        $(document).click(function() {
            // all dropdowns
            console.log('dd2 clicked')
            $('.wrapper-dropdown').removeClass('active');
        });


    });



});