 (function($) {
  luminateExtend({
    apiKey: 'p3taRocks', 
    path: {
      nonsecure: 'http://www2.peta.org/site/',  
      secure: 'https://secure.peta.org/site/'
    }
  });
 luminateExtend.api({
  api: 'cons', 
  data: 'method=getUser', 
  requestType: 'POST', 
  requiresAuth: true, 
  callback: {
    success: function(response) {
      $.each(response.getConsResponse, function(fieldName, fieldValue) {
          
        if($.type(fieldValue) === 'object') {
          $.each(fieldValue, function(childFieldName, childFieldValue) {
            $('[data-field="' + fieldName + '.' + childFieldName + '"]').val(childFieldValue);
          });
        }
        else {
          $('[data-field="' + fieldName + '"]').val(fieldValue);
        }
      });
      jQuery('#sessioncookie').val(luminateExtend.global.sessionCookie)
      jQuery('#authtoken').val(luminateExtend.global.auth.token)
    },
    error : function(response) {
        jQuery('#sessioncookie').val(luminateExtend.global.sessionCookie)
        jQuery('#authtoken').val(luminateExtend.global.auth.token)
    },
  }
});
})(jQuery);