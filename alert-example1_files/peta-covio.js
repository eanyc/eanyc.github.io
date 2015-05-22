/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));


function empty( mixed_var ) {

    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, "", "0"];
    for ( i = 0, len = emptyValues.length; i < len; i++ ) {
        if ( mixed_var === emptyValues[i] ) {
            return true;
        }
    }
    if ( typeof mixed_var === "object" ) {
        for ( key in mixed_var ) {
            return false;
        }
        return true;
    }
    return false;
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}

function validate_email( el ) {
    var str = el;
    str  = TrimString( str );
    var filter=/^([\w-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    var testresults;
    if ( filter.test( str ) )
        testresults = true;
    else
        testresults = false;
    return ( testresults );
}

function validateCheckBox( name ) {
    var st = false;
    jQuery( 'input[name="' + name + '"]' ).each( function (  ) {
        if ( jQuery( this ).is( ':checked' ) ) {
            st = true;
        }

    } );
    return st;
}

function validate_atleast_one_required( name ) {
    var st = false;
    jQuery( 'input[name="' + name + '"]' ).each( function (  ) {
        if ( jQuery( this ).val(  ) != '' ) {
            st = true;
        }
    } );
    return st;
}

function validate_dob( ){
     var st = true;
     alert_text = false;
     var day_obj =     jQuery('#dob_day');
     var month_obj = jQuery('#dob_month');
     var year_obj =     jQuery('#dob_year');
     year_obj.removeClass( 'validation_error' );
     month_obj.removeClass( 'validation_error' );
     day_obj.removeClass( 'validation_error' );

     var day =         day_obj.val();
     var month =     month_obj.val();
     var year =     year_obj.val();
     if(  day_obj.hasClass( 'required') && empty( day ) && empty( month ) && empty( year ) ){
        //jQuery('#dob_month').focus(  );
        month_obj.parent(  ).append( '<div class="error-wrapper">' + 'Date of Birth is required' + '</div>' )
        year_obj.addClass( 'validation_error' );
        month_obj.addClass( 'validation_error' );
        day_obj.addClass( 'validation_error' );
        st = false;
         return st;
     }
     else if ( !empty( day ) || !empty( month ) || !empty( year ) ) {  // if anyone is selected it should be valid date
         var dob_val = month+'-'+day+'-'+year;
         if( month == '1' || month == '3' || month == '5' || month == '7' || month == '8' || month == '10' || month == '12')
            var date_regex = /([1-9]|1[012])[-]([1-9]|[12][0-9]|3[01])[-](19|20)\d\d/;
         if( month == '4' || month == '6' || month == '9' || month == '11')
            var date_regex = /([1-9]|1[012])[-]([1-9]|[12][0-9]|3[0])[-](19|20)\d\d/;
          if( month == '2')
            var date_regex = /([1-9]|1[012])[-]([1-9]|[12][0-9])[-](19|20)\d\d/;
         if(!date_regex.test(dob_val)){
             //jQuery('#dob_month').focus(  );
             year_obj.parent(  ).append( '<div class="error-wrapper">' + 'Please enter correct Date of Birth' + '</div>' );
             year_obj.addClass( 'validation_error' );
             month_obj.addClass( 'validation_error' );
             day_obj.addClass( 'validation_error' );
              st = false;
              return st;
         }
     }
    if(month && day && year) {
        // under 13
        var under_13_redirect_url = "http://petakids.com/";
        var under_13_text = "You are too young to participate on this Web site. You will be redirected to PETAKids.com";
        var under_13 = new Date();
        under_13.setFullYear(under_13.getFullYear() - 13);
        var dob = Date.parse(month + ' ' + day + ', ' + year);
        if( ( under_13 - dob ) < 0 ) {
            var alert_text = under_13_text;
            var confirm_first = false;
            var redirect_url = under_13_redirect_url;
            var force_redirect = false; // set to true to bypass alert
            warningType=13;
        }
        if( alert_text ) {
            if(warningType==13){
                 alert(alert_text);
                window.location = redirect_url;
                return false;
            }
        }
    }

    return st;
}
function submit_form_ajax( frmid, advocacy_form_title ) {

    var frm_id  =  '#'+frmid;
    var frmAction = jQuery( frm_id ).attr( 'action' ) ;
    var submit_button = jQuery( frm_id ).data( 'submit_button' );
    var response_target = jQuery( frm_id ).data( 'response_target' ) ;
    var old_submit_label = jQuery( submit_button ).attr( 'value' ) ;

    jQuery( submit_button ).attr( 'disabled','true' ) ;
    jQuery( submit_button ).attr( 'value','Processing...' ) ;

    jQuery.post(frmAction,jQuery( frm_id ).serialize(  ) ,function( data ) {
          jQuery( submit_button ).removeAttr( 'disabled' ) ;
          jQuery( submit_button ).attr( 'value',old_submit_label ) ;
          if( data.status == 'S' ) {
          if( data.redirect != 'NONE' ) {
                if( !empty( data.psp_cookie_expiration_days ) ){ // check the cookie condition before redirection
                  psp_close_reval_cookie(data.psp_cookie_expiration_days,data.post_id);
                }
              //PV3-WP-4985  Do Not Trigger a Form Submission Event If the Next Page Is Convio
             //_gaq.push(['_trackEvent', 'Take Action Form', 'Form Submission', advocacy_form_title]); 
             window.location.href = data.redirect;
          }
          else{
              _gaq.push(['_trackEvent', 'Take Action Form', petaGA_FormAction_Submitted, advocacy_form_title]);
              jQuery( response_target ).show(  )
              jQuery( response_target ).html( data.response );
              jQuery ('#splash_convio_alert').hide();
          }
      } else {
          jQuery( response_target ).show(  )
          jQuery( response_target ).addClass( 'splash-error-submission-faild' )
          jQuery( response_target ).html( data.response )
      }
 },
 'json'
  ) ;
 return false;
}

function validate_mobile_optin( ) {
    var tc_check = jQuery('#tc_mobile_optin');
    var mobile_phone = jQuery('#mobile_phone');;
    if( !empty( mobile_phone.val() ) )
        {
            if( !tc_check.is(':checked') )
            {
                tc_check.focus(  );
                   tc_check.parent(  ).append( '<div class="error-wrapper">' + 'Please remove your phone number from the field above if you do not want to accept text messages from PETA. If you would like to receive messages, please accept the terms and conditions by checking the box above.'+ '</div>' )
                return false;
            }

        }
        if( tc_check.is(':checked'))
        {
            if(mobile_phone.val()=='')
            {
                 mobile_phone.focus(  );
                    mobile_phone.parent(  ).append( '<div class="error-wrapper">' + 'Mobile Number is required'+ '</div>' )
                 mobile_phone.addClass( 'validation_error' );
                 return false;
            }

        }
        return true;
}

validation_state = new Object(  );

function validate_convio_form( frmid ) {
    //return true;
    var st = true;
    jQuery ( '.error-wrapper' ).remove();
    jQuery( '#' + frmid + ' input' ).each( function (  ) {
        if ( !get_field_validation_status( this ) ) {
            if( st ) {
                jQuery( this ).focus(  );
            }

            jQuery( this ).parent(  ).append( '<div class="error-wrapper">' + validation_state.message + '</div>' )
            jQuery( this ).addClass( 'validation_error' );
            st = false;

        }
    } );
    jQuery( '#' + frmid + ' select' ).each( function (  ) {
         if(!jQuery(this).hasClass('date')){
            if ( !get_field_validation_status( this ) ) {
                if( st ) {
                    jQuery( this ).focus(  );
                }

                jQuery( this ).parent(  ).append( '<div class="error-wrapper">' + validation_state.message + '</div>' )
                jQuery( this ).addClass( 'validation_error' );
                st = false;

            }
         }
    } );
    jQuery( '#' + frmid + ' textarea' ).each( function (  ) {
        if ( !get_field_validation_status( this ) ) {
            if( st ) {
                jQuery( this ).focus(  );
            }
            jQuery( this ).parent(  ).append( '<div class="error-wrapper">' + validation_state.message + '</div>' )
            jQuery( this ).addClass( 'validation_error' );
            st = false;

        }
    } );
    if ( !validate_dob () ){
        st = false;
    }
    if( !validate_mobile_optin( ) ){
        st = false;
    }
    if( st ){
        var advocacy_form_title= jQuery('#pca_alert_title').val();
        
        advocacy_form_title= addslashes( advocacy_form_title );
        
        var sec_answer = jQuery('#security_code').val();
        if( !empty( sec_answer ) && st ){
            st = false;
             var t = PCA_URL+'/captcha.php?act=validate&ans='+sec_answer+'&rand='+jQuery('#sch').val();
             var randomh = (new Date).getTime();
             var capt_url = t+'&r'+randomh+'='+randomh;
             jQuery.get( capt_url, function( data ) {
                code = data.code;
                if( data.status == 'S' ){
                    document.getElementById("convio_alert_form").submit();
                } else {
                    jQuery( '#security_code' ).parent(  ).append( '<div class="error-wrapper">' + 'Please enter correct scurity code.' + '</div>' )
                    jQuery( '#security_code' ).addClass( 'validation_error' );
                }
               
                 } ,'json');
        }
        
       
       /*  Store form data in cookie     */
        var cok = { };
        jQuery( '#' + frmid + ' input[type="text"]' ).each( function (  ) {
            if( jQuery(this).hasClass('pca_cookie') ){
                cok[jQuery(this).attr('name')] = TrimString( jQuery(this).val( ) );
            }
            
        });
        jQuery( '#' + frmid + ' select' ).each( function (  ) {
             if( jQuery(this).hasClass('pca_cookie') ){
                cok[jQuery(this).attr('name')] = TrimString( jQuery(this).val( ) );
             }
        });
        cok_s = JSON.stringify(cok);
        jQuery.cookie('pca_form_data_new', cok_s , { expires: 60, path: '/' }) ;
        
        
        
        if ( jQuery( '#' + frmid ).data('ajax_submit') == 'yes'){
            submit_form_ajax ( frmid, advocacy_form_title )
            return false;
        } else if( jQuery('#pca_external_redirect_url').val() == 'Y' ) {
            //PV3-WP-4985  Do Not Trigger a Form Submission Event If the Next Page Is Convio
          // _gaq.push(['_trackEvent','Take Action Form', 'Form Submission', advocacy_form_title]); 
        }

    } else {
        jQuery( '.ca_content_splash_page .field-container').css('height','60px')
    }
    
    return st;
}

function get_field_validation_status( obj ) {
    var obj_val = jQuery( obj ).val( ) ;
    if ( jQuery( obj ).hasClass( 'required' ) && empty( obj_val ) ) {
       // var m = jQuery( obj ).data( 'validation_message' );
        var field_name = jQuery( obj ).data( 'field-name' );
        if ( empty( field_name ) ) {
            m = 'This field is required';
        } else {
            m = field_name+' is required';
        }
        //alert(m)
        st = false;
        validation_state.status = false;
        validation_state.type = 'required';
        validation_state.field_name = jQuery( obj ).attr('name');
        validation_state.message = m;
        return st;
        
    }
    if ( jQuery( obj ).hasClass( 'letters' ) && obj_val != '' ) {
        if ( !obj.value.match(/^[a-zA-Z \. \, \'\s]+$/) ) {
            var m = 'Please use only  Alphabets( A-Z,a-z ), Comma( , ), Dot( . ) and Asterisk( \' ) ';
            st = false;
            validation_state.status = false;
            validation_state.type = 'letters';
            validation_state.message = m;
            return st;

        }
    }
    if ( jQuery( obj ).hasClass( 'numbers' ) && obj_val != '' ) {
        if ( !obj.value.match( /^[0-9\.]+$/ ) ) {
            var m = 'Please enter only numbers';
            st = false;
            validation_state.status = false;
            validation_state.type = 'numbers';
            validation_state.message = m;
            return st;

        }
        
    }
    if ( jQuery( obj ).hasClass( 'zip4' ) && obj_val != '' ) {
        if ( obj.value.length != 9 && obj.value.length != 5 ) {
            var m = 'The zip code must be a numeric 5-digit or 9-digit code';
            st = false;
            validation_state.status = false;
            validation_state.type = 'zip4';
            validation_state.message = m;
            return st;

        }
        
    }
    if ( jQuery( obj ).hasClass( 'email' ) && obj_val != '' ) {
        if ( !validate_email( obj_val ) ) {
            //alert(jQuery( obj ).val(  ))
            var m = 'Enter a valid e-mail address';
            st = false;
            validation_state.status = false;
            validation_state.type = 'email';
            validation_state.message = m;
            return st;
        }
        
    }
    if ( jQuery( obj ).hasClass( 'equal' ) ) {
        var idEq = jQuery( obj ).attr( 'id' );
        idEq = 'equell_' + idEq;
        if ( jQuery( obj ).val(  ) != jQuery( '#' + idEq ).val(  ) ) {
            var m = jQuery( '#' + idEq ).attr( 'title' );
            m = m + ' Not Matched';
            st = false;
            validation_state.status = false;
            validation_state.type = 'equal';
            validation_state.message = m;
            return st;
        }
    }
    if ( jQuery( obj ).hasClass( 'checkbox_required' ) ) {
        var name = jQuery( obj ).attr( 'name' );
        if ( !validateCheckBox( name ) ) {
            var m = jQuery( obj ).attr( 'title' );
            st = false;
            validation_state.status = false;
            validation_state.type = 'checkbox_required';
            validation_state.message = m;
            return st;
        }
    }
    if ( jQuery( obj ).hasClass( 'atleast_one_required' ) ) {
        var name = jQuery( obj ).attr( 'name' );
        if ( !validate_atleast_one_required( name ) ) {
            var m = jQuery( obj ).attr( 'title' );
            st = false;
            validation_state.status = false;
            validation_state.type = 'atleast_one_required';
            validation_state.message = m;
            return st;
        }
    }

    return true;
}

function randomString(length, chars) {
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}


/*Jquery Thermometer Plugin*/


/*
 * jQuery.thermometer - https://github.com/noahcooper/jQuery.thermometer
 * Version: 1.0 (11-AUG-2013)
 * Requires: jQuery v1.6.4+
 *
 * Released under the MIT license.
 * https://github.com/noahcooper/jQuery.thermometer/blob/master/MIT-LICENSE.txt
 */

(function($) {
  $.fn.thermometer = function(options) {
    var settings = $.extend({
      percent: 0,
      orientation: 'horizontal',
      animate: true,
      speed: 1000
    }, options || {});

    return this.each(function() {
      var _percent = $(this).data('percent') || settings.percent,
      _orientation = $(this).data('orientation') || settings.orientation,
      _animate = $(this).data('animate') === false ? false : settings.animate,
      _speed = $(this).data('speed') || settings.speed;

      /* set the orientation */
      _orientation = _orientation.toLowerCase() === 'vertical' ? 'v' : 'h';

      /* set min and max percentage */
      if(isNaN(_percent) || _percent < 0) {
        _percent = 0;
      }
      else if(_percent > 100) {
        _percent = 100;
      }

      /* override the default "slow" duration used by jQuery.animate() */
      if($.type(_speed) === 'string' && _speed.toLowerCase() === 'slow') {
        _speed = 1500;
      }

      $(this).html('<div class="thermometer-outer thermometer-outer-' + _orientation + '">' +
                     '<div class="thermometer-inner thermometer-inner-' + _orientation + '">' +
                     '</div>' +
                   '</div>');

      var initialInnerSize = _animate ? 0 : (_percent + '%');
      if(_orientation === 'v') {
        $(this).find('.thermometer-outer').css('position', 'relative');
        $(this).find('.thermometer-inner').css({
          position: 'absolute',
          bottom: '0',
          height: initialInnerSize
        });
      }
      else {
        $(this).find('.thermometer-inner').css('width', initialInnerSize);
      }

      if(_animate) {
        var animateProperties = {};
        if(_orientation === 'v') {
          animateProperties.height = _percent + '%';
        }
        else {
          animateProperties.width = _percent + '%';
        }
        $(this).find('.thermometer-inner').animate(animateProperties, _speed);
      }
    });
  };
})(jQuery);

function get_browser(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return 'IE '+(tem[1]||'');
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return 'Opera '+tem[1];}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return M[0];
    }

function get_browser_version(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];                                                                                                                         
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1]||'');
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return 'Opera '+tem[1];}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return M[1];
    }

function is_ipad( ){
    if( navigator.userAgent.match(/iPad/i) != null ) {
        return true;
    } 
    return false;
}
/*Contry and State Drop Down*/

function TrimString(sInString) {
  if ( sInString ) {
    sInString = sInString.replace( /^\s+/g, "" );// strip leading
    return sInString.replace( /\s+$/g, "" );// strip trailing
  }
}

// Populates the country selected with the counties from the country list
function pca_populateCountry(defaultCountry,selectbox_id) {
  if ( postCountry != '' ) {
    defaultCountry = postCountry;
  }
  var countryLineArray = country.split('|');  // Split into lines
  if( !document.getElementById(selectbox_id) ){
      return false;
  }
  var selObj = document.getElementById(selectbox_id);
  selObj.options[0] = new Option('Country','');
  selObj.selectedIndex = 0;
  for (var loop = 0; loop < countryLineArray.length - 1; loop++) {
    lineArray = countryLineArray[loop].split(':');
    countryCode  = TrimString(lineArray[0]);
    countryName  = TrimString(lineArray[1]);
    if ( countryCode != '' ) {
      selObj.options[loop + 1] = new Option(countryName, countryCode);
    }
    if ( defaultCountry == countryCode ) {
      selObj.selectedIndex = loop + 1;
    }
  }
}

function pca_populateState(selectbox_country_id,selectbox_state_id) {
    if( !document.getElementById(selectbox_state_id) ) {
        return false;
    }
    if( !document.getElementById(selectbox_country_id) ){
        var country_code = 'United States';
    } else {
        var country_code = document.getElementById(selectbox_country_id).value;
    }
    
  var selObj = document.getElementById(selectbox_state_id);
  var foundState = false;
  // Empty options just in case new drop down is shorter
  if ( selObj.type == 'select-one' ) {
    for (var i = 0; i < selObj.options.length; i++) {
      selObj.options[i] = null;
    }
    selObj.options[0] = new Option('State/Province','');
    selObj.selectedIndex = 0;
  }
  // Populate the drop down with states from the selected country
  var stateLineArray = state.split("|");  // Split into lines
  var optionCntr = 1;
  
  for (var loop = 0; loop < stateLineArray.length; loop++) {
    lineArray = stateLineArray[loop].split(":");
    countryCode  = TrimString(lineArray[0]);
    stateCode    = TrimString(lineArray[1]);
    stateName    = TrimString(lineArray[2]);
  if ( country_code == countryCode && countryCode != '' ) {
    // If it's a input element, change it to a select
      if ( selObj.type == 'text' ) {
        parentObj = document.getElementById(selectbox_state_id).parentNode;
        parentObj.removeChild(selObj);
        var inputSel = document.createElement("SELECT");
        inputSel.setAttribute("name",selObj.getAttribute('name'));
        inputSel.setAttribute("id",selObj.getAttribute('id'));
        inputSel.setAttribute("class",selObj.getAttribute('class'));
        parentObj.appendChild(inputSel) ;
        selObj = document.getElementById(selectbox_state_id);
        selObj.options[0] = new Option('State/Province','');
        selObj.selectedIndex = 0;
      }
      if ( stateCode != '' ) {
        selObj.options[optionCntr] = new Option(stateName, stateCode);
      }
      // See if it's selected from a previous post
      if ( stateCode == postState  ) {
        selObj.selectedIndex = optionCntr;
      }
      foundState = true;
      optionCntr++
    }
  }
  // If the country has no states, change the select to a text box
  if ( ! foundState ) {
    parentObj = document.getElementById(selectbox_state_id).parentNode;
    parentObj.removeChild(selObj);
  // Create the Input Field

    var inputEl = document.createElement("INPUT");
    inputEl.setAttribute("id",selectbox_state_id);
    inputEl.setAttribute("type", 'text');
    inputEl.setAttribute("name", selObj.getAttribute('name'));
    inputEl.setAttribute("class", selObj.getAttribute('class'));
    inputEl.setAttribute("value", 'None');
    inputEl.setAttribute("title", 'State/Province');
    /*var inputEl = document.createElement("Select");
    inputEl.setAttribute("id", selectbox_state_id);
    inputEl.setAttribute("name", "select");*/

//    document.myform.marked.options[document.myform.marked.selectedIndex].value;
    var cou_sel = document.getElementById(selectbox_country_id).selectedIndex;
    for ( var i = 0; i < 1; i++ ){
        var option_element = document.createElement('option');
        if(cou_sel!=0)
        {
            option_element.setAttribute('value', "None");
            option_element.appendChild( document.createTextNode( "None") );
        }
        else
        {
            option_element.setAttribute('value', "None");
            option_element.appendChild( document.createTextNode( "State/Province") );
        }

        if (i == 1){
            option_element.setAttribute("selected", "selected");
        }
        inputEl.appendChild(option_element);
    }

    parentObj.appendChild(inputEl) ;
  }
}

function pca_initCountry(country,selectbox_country_id,selectbox_state_id) {
  pca_populateCountry(country,selectbox_country_id);
  pca_populateState(selectbox_country_id,selectbox_state_id);
}



var postState = '';
var postCountry = '';

// State table
//
// To edit the list, just delete a line or add a line. Order is important.
// The order displayed here is the order it appears on the drop down.
//
var state = '\
United States:AE:Armed Forces Europe|\
United States:AK:Alaska|\
United States:AL:Alabama|\
United States:APO:Army Post Office |\
United States:AR:Arkansas|\
United States:AZ:Arizona|\
United States:CA:California|\
United States:CO:Colorado|\
United States:CT:Connecticut|\
United States:DC:D.C.|\
United States:DE:Delaware|\
United States:FL:Florida|\
United States:FM:Micronesia|\
United States:FPO:Fleet Post Office|\
United States:GA:Georgia|\
United States:GU:Guam|\
United States:HI:Hawaii|\
United States:IA:Iowa|\
United States:ID:Idaho|\
United States:IL:Illinois|\
United States:IN:Indiana|\
United States:KS:Kansas|\
United States:KY:Kentucky|\
United States:LA:Louisiana|\
United States:MA:Massachusetts|\
United States:MD:Maryland|\
United States:ME:Maine|\
United States:MH:Marshall Islands|\
United States:MI:Michigan|\
United States:MN:Minnesota|\
United States:MO:Missouri|\
United States:MP:Marianas|\
United States:MS:Mississippi|\
United States:MT:Montana|\
United States:NC:North Carolina|\
United States:ND:North Dakota|\
United States:NE:Nebraska|\
United States:NH:New Hampshire|\
United States:NJ:New Jersey|\
United States:NM:New Mexico|\
United States:NV:Nevada|\
United States:NY:New York|\
United States:OH:Ohio|\
United States:OK:Oklahoma|\
United States:OR:Oregon|\
United States:PA:Pennsylvania|\
United States:PR:Puerto Rico|\
United States:RI:Rhode Island|\
United States:SC:South Carolina|\
United States:SD:South Dakota|\
United States:TN:Tennessee|\
United States:TX:Texas|\
United States:UT:Utah|\
United States:VA:Virginia|\
United States:VT:Vermont|\
United States:WA:Washington|\
United States:WI:Wisconsin|\
United States:WV:West Virginia|\
United States:WY:Wyoming|\
Canada:AB:Alberta|\
Canada:MB:Manitoba|\
Canada:BC:British Columbia|\
Canada:NB:New Brunswick|\
Canada:NL:Newfoundland and Labrador|\
Canada:NS:Nova Scotia|\
Canada:NT:Northwest Territories|\
Canada:NU:Nunavut|\
Canada:ON:Ontario|\
Canada:PE:Prince Edward Island|\
Canada:QC:Quebec|\
Canada:SK:Saskatchewan|\
Canada:YT:Yukon Territory|\
';

// Country data table
//
// To edit the list, just delete a line or add a line. Order is important.
// The order displayed here is the order it appears on the drop down.
//
var country = '\
Afghanistan:Afghanistan|\
Albania:Albania|\
Algeria:Algeria|\
Andorra:Andorra|\
Angola:Angola|\
Antigua:Antigua|\
Argentina:Argentina|\
Armenia:Armenia|\
Australia:Australia|\
Austria:Austria|\
Azerbaijan:Azerbaijan|\
Azores:Azores|\
Bahamas:Bahamas|\
Bahrain:Bahrain|\
Balearic Islands:Balearic Islands|\
Bangladesh:Bangladesh|\
Barbados:Barbados|\
Barbuda:Barbuda|\
Belarus:Belarus|\
Belgium:Belgium|\
Belize:Belize|\
Benin:Benin|\
Bhutan:Bhutan|\
Bolivia:Bolivia|\
Bosnia And Herzegovina:Bosnia And Herzegovina|\
Botswana:Botswana|\
Brazil:Brazil|\
Brunei:Brunei|\
Bulgaria:Bulgaria|\
Burkina Faso:Burkina Faso|\
Burundi:Burundi|\
Cambodia:Cambodia|\
Cameroon:Cameroon|\
Canada:Canada|\
Canary Island:Canary Island|\
Cape Verde:Cape Verde|\
Central African Republic:Central African Republic|\
Chad:Chad|\
Chile:Chile|\
China:China|\
Colombia:Colombia|\
Comoros:Comoros|\
Congo:Congo|\
Congo, Democratic Republic:Congo, Democratic Republic|\
Corsica:Corsica|\
Costa Rica:Costa Rica|\
Cote dIvoire:Cote dIvoire|\
Croatia:Croatia|\
Cuba:Cuba|\
Cyprus:Cyprus|\
Czech Republic:Czech Republic|\
Denmark:Denmark|\
Djibouti:Djibouti|\
Dominica:Dominica|\
Dominican Republic:Dominican Republic|\
East Timor:East Timor|\
Ecuador:Ecuador|\
Egypt:Egypt|\
El Salvador:El Salvador|\
England:England|\
Equatorial Guinea:Equatorial Guinea|\
Eritrea:Eritrea|\
Estonia:Estonia|\
Ethiopia:Ethiopia|\
Faroe Islands:Faroe Islands|\
Fiji:Fiji|\
Finland:Finland|\
France:France|\
Gabon:Gabon|\
Gambia:Gambia|\
Georgia:Georgia|\
Germany:Germany|\
Ghana:Ghana|\
Gibraltar:Gibraltar|\
Greece:Greece|\
Greenland:Greenland|\
Grenada:Grenada|\
Guatemala:Guatemala|\
Guinea:Guinea|\
Guinea-Bissau:Guinea-Bissau|\
Guyana:Guyana|\
Haiti:Haiti|\
Herzegovina:Herzegovina|\
Honduras:Honduras|\
Hong Kong SAR:Hong Kong SAR|\
Hungary:Hungary|\
Iceland:Iceland|\
India:India|\
Indonesia:Indonesia|\
Iran:Iran|\
Iraq:Iraq|\
Ireland:Ireland|\
Ireland Northern:Ireland Northern|\
Irish Republic:Irish Republic|\
Israel:Israel|\
Italy:Italy|\
Jamaica:Jamaica|\
Japan:Japan|\
Jordan:Jordan|\
Kazakhstan:Kazakhstan|\
Kenya:Kenya|\
Kirghizstan:Kirghizstan|\
KI:Kiribati|\
Korea, North:Korea, North|\
Korea, South:Korea, South|\
Kuwait:Kuwait|\
Kyrgyzstan:Kyrgyzstan|\
Lagos:Lagos|\
Laos:Laos|\
Latvia:Latvia|\
Lebanon:Lebanon|\
Lesotho:Lesotho|\
Liberia:Liberia|\
Libya:Libya|\
Liechtenstein:Liechtenstein|\
Lithuania:Lithuania|\
Luxembourg:Luxembourg|\
Macau SAR:Macau SAR|\
Macedonia:Macedonia|\
Madagascar:Madagascar|\
Madeira:Madeira|\
Malawi:Malawi|\
Malaysia:Malaysia|\
Maldives:Maldives|\
Mali:Mali|\
Malta:Malta|\
Marshall Islands:Marshall Islands|\
Mauritania:Mauritania|\
Mauritius:Mauritius|\
Mexico:Mexico|\
Micronesia:Micronesia|\
Moldova:Moldova|\
Monaco:Monaco|\
Mongolia:Mongolia|\
Morocco:Morocco|\
Mozambique:Mozambique|\
Myanmar:Myanmar|\
Namibia:Namibia|\
Nauru:Nauru|\
Nepal:Nepal|\
Netherlands:Netherlands|\
New Zealand:New Zealand|\
Nicaragua:Nicaragua|\
Niger:Niger|\
Nigeria:Nigeria|\
Norway:Norway|\
Oman:Oman|\
Pakistan:Pakistan|\
Palau:Palau|\
Panama:Panama|\
Papua New Guinea:Papua New Guinea|\
Paraguay:Paraguay|\
Peru:Peru|\
Philippines:Philippines|\
Poland:Poland|\
Portugal:Portugal|\
Qatar:Qatar|\
Romania:Romania|\
Russian:Russian|\
Rwanda:Rwanda|\
Saint Kitts And Nevis:Saint Kitts And Nevis|\
Saint Lucia:Saint Lucia|\
Samoa:Samoa|\
San Marino:San Marino|\
Sao Tome and Principe:Sao Tome and Principe|\
Saudi Arabia:Saudi Arabia|\
Scotland:Scotland|\
Senegal:Senegal|\
Serbia and Montenegro:Serbia and Montenegro|\
Seychelles:Seychelles|\
Sierra Leone:Sierra Leone|\
Singapore:Singapore|\
Slovakia:Slovakia|\
Slovenia:Slovenia|\
Solomon Islands:Solomon Islands|\
Somalia:Somalia|\
South Africa:South Africa|\
Spain:Spain|\
Spitzbergen:Spitzbergen|\
Sri Lanka:Sri Lanka|\
St. Vincent and the Grenadines:St. Vincent and the Grenadines|\
Sudan:Sudan|\
Suriname:Suriname|\
Swaziland:Swaziland|\
Sweden:Sweden|\
Switzerland:Switzerland|\
Syria:Syria|\
Taiwan:Taiwan|\
Tajikistan:Tajikistan|\
Tanzania:Tanzania|\
Thailand:Thailand|\
Tobago:Tobago|\
Togo:Togo|\
Tonga:Tonga|\
Trinidad:Trinidad|\
Tunisia:Tunisia|\
Turkey:Turkey|\
Turkmenistan:Turkmenistan|\
Tuvalu:Tuvalu|\
Uganda:Uganda|\
Ukraine:Ukraine|\
United Arab Emirates:United Arab Emirates|\
United Kingdom:United Kingdom|\
United States:United States|\
United States Virgin Islands:United States Virgin Islands|\
Uruguay:Uruguay|\
Uzbekistan:Uzbekistan|\
Vanuatu:Vanuatu|\
Vatican City:Vatican City|\
Venezuela:Venezuela|\
Vietnam:Vietnam|\
Wales:Wales|\
Western Sahara:Western Sahara|\
YE:Yemen|\
ZM:Zambia|\
ZW:Zimbabwe|\
';

pca_error_code = '';
default_country = 'United States'
jQuery( document ).ready( function (  ) {

    var advocacy_form_title= jQuery('#pca_alert_title').val();
    advocacy_form_title= addslashes( advocacy_form_title );
    _gaq.push(['_trackEvent','Take Action Form', petaGA_FormAction_Initiated , advocacy_form_title]);

    jQuery('.thermometer_goal').thermometer();
    pca_initCountry(default_country,'pca_country','pca_state');
    
    var cok =  jQuery.cookie('pca_form_data_new');
    if( !empty( cok ) ){
        var cok_obj = JSON.parse(cok);
        jQuery.each(cok_obj, function(fieldName, fieldValue) {
            field =  jQuery('input[name="'+fieldName+'"]');
            if( field.hasClass('pca_cookie') ){
                field.val(fieldValue);
            } 
            field =  jQuery('select[name="'+fieldName+'"]');
            if( field.hasClass('pca_cookie') ){
                field.val(fieldValue);
            } 
        })
    }
   
    jQuery('#pca_country').on('change',function(){
        pca_populateState('pca_country','pca_state');
    })

    jQuery('.toggle-content').on('click',function(){
        var target = jQuery(this).data('target');
        jQuery( target ).toggle();
        if( jQuery( target ).css('display')=='none'){
            jQuery(this).html('&#43;')
        } else {
            jQuery(this).html('&#45;')
        }
    })

    jQuery('.tabbed-content').addClass('tabbed-content-inactive');
    jQuery('.tabbed-content').on('click',function(){
        var tab_target = jQuery(this).data('tab_target');

        jQuery('.tabbed-content').removeClass('tabbed-content-active');
        jQuery('.tabbed-content').addClass('tabbed-content-inactive');

        if( jQuery( tab_target ).css('display')=='none'){
            jQuery('.toggle_tab').hide();
            jQuery( tab_target ).show();
            jQuery(this).removeClass('tabbed-content-inactive');
            jQuery(this).addClass('tabbed-content-active');

        } else {
            jQuery( tab_target ).hide();

        }
    })

    jQuery( '#convio_alert_form input' ).each( function (  ) {
        jQuery( this ).on( 'blur', function (  ) {
            jQuery( this ).removeClass( 'validation_error' );
            jQuery( this ).next( '.error-wrapper' ).remove(  );
            if ( !get_field_validation_status( this ) ) {

                //jQuery( this ).focus(  );
                jQuery( this ).parent(  ).append( '<div class="error-wrapper">' + validation_state.message + '</div>' )
                jQuery( this ).addClass( 'validation_error' );
                st = false;
            }

        } )
        

        jQuery( this ).on( 'focus', function (  ) {
            jQuery( this ).removeClass( 'validation_error' );
            jQuery( this ).next( '.error-wrapper' ).remove(  );

        } )
    } )
     jQuery( '#convio_alert_form select' ).each( function (  ) {
        if(!jQuery(this).hasClass('date')) {
            jQuery( this ).on( 'blur', function (  ) {
                jQuery( this ).removeClass( 'validation_error' );
                jQuery( this ).next( '.error-wrapper' ).remove(  );
                if ( !get_field_validation_status( this ) ) {

                    //jQuery( this ).focus(  );
                    jQuery( this ).parent(  ).append( '<div class="error-wrapper">' + validation_state.message + '</div>' )
                    jQuery( this ).addClass( 'validation_error' );
                    st = false;
                }

            } )

            jQuery( this ).on( 'focus', function (  ) {
                jQuery( this ).removeClass( 'validation_error' );
                jQuery( this ).next( '.error-wrapper' ).remove(  );

            } )
        }
    } )
    if( pca_error_code == 'zip4' ){
        jQuery('#zip').parent().append( '<div class="error-wrapper">Please enter correct zip code</div>' );
        jQuery('#zip').addClass( 'validation_error' );
        jQuery('#zip').addClass( 'zip4' );
        jQuery('#zip').addClass( 'numbers' );
    }
    //jQuery('#zip').focus();
    jQuery('#capt_reload').on('click',function() {
        var t = PCA_URL+'/captcha.php?act=capt_image_refrersh';
        var randomh = (new Date).getTime();
        var capt_url = t+'&r'+randomh+'='+randomh;
        jQuery.get( capt_url, function( data ) {
            code = data.code;
            var t =  jQuery('#siimage').attr('src');
            t= updateQueryStringParameter(t,'rand',code)
            var randomh = (new Date).getTime();
            var capt_url = t+'&r'+randomh+'='+randomh;
            jQuery('#siimage').attr('src',capt_url);
            jQuery('#sch').attr('value',code);
        } ,'json');
        
        
    })
} );
