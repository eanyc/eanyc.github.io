/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
;(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

;(function($) {
	var $this;
	
	// Grab variables passed via wp_localize_script
	window.PETA_Variables = Class.extend(window.PETA_Variables);
	
	// Create classs with properties inherited from PETA_Variables
	window.PETA_Utility_Functions = PETA_Variables.extend({
		/* -----------------------------------------------------
		   Variables
		   ----------------------------------------------------- */
		
		// Faux-constants for easy cookies / timeouts / intervals
		SECOND_IN_MS : 1000,
		MINUTE_IN_MS : this.SECOND_IN_MS * 60,
		HOUR_IN_MS   : this.MINUTE_IN_MS * 60,
		DAY_IN_MS    : this.HOUR_IN_MS   * 24,
		MONTH_IN_MS  : this.DAY_IN_MS    * 30,
		YEAR_IN_MS   : this.DAY_IN_MS    * 365,
		
		/* -----------------------------------------------------
		   Functions
		   ----------------------------------------------------- */
		
		init : function() {
			// Store reference to "this"
			$this = this;
			
			$(function() {
				$this.onReady();
			});
		},
		
		onReady : function() {
			// $this.log('PETA Utility Functions :: peta-utility-functions.js - onReady');
		},
		
		log : function(message) {
			// debug is set automatically in PETA_Variables
			// based on the value of WP_DEBUG
			if (!$this.debug || !window.console) {
				return;
			}
			
			console.log(message);
		},
		
		getCookie : function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return null;
		},
		
		setCookie : function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		},
		
		deleteCookie : function(name) {
			createCookie(name, "", -1);
		},
		
		// --------------------------------------------------
		// WARNING: THESE DON'T WORK YET
		// I copied them over from another project unmodified
		// TODO: Fix these so they work
		// ---------------------------------------------------
		ajaxRequest: function(ajaxData, callbacks, args) {
			var self = $(this);
			var defaults = {
				callbacks : {
					complete : function(data) {
				
					},
					ok : function(data) {
						if (args.reloadPage) {
							if (data.message) { 
								bootbox.alert(data.message, function() {
									window.location.reload();
								});
							} else {
								window.location.reload();
							}
					 
						} else {
							var alertData = data.message ? data.message : data.messages;
							if (args.showAlertsFor.ok) {
								$.pcs.showAlert(alertData, 'info');
							} else {
								console.log(alertData);
							}
						}
					},
					warning : function(data) {
						var alertData = data.warnings ? data.warnings : data.warning;
						if (args.showAlertsFor.warning) {
							$.pcs.showAlert(alertData, 'warning');
						} else {
							console.warn(alertData);
						}
					},
					error : function(data) {
						var alertData = data.errors ? data.errors : data.error;
						if (args.showAlertsFor.error) {
							$.pcs.showAlert(alertData, 'error');
						} else {
							console.error(alertData);
						}
					},
				},
				args : {
					method : 'POST',
					url : 'processes.php',
					reloadPage : false,
					showAlertsFor : {
						debug : false,
						complete : false,
						ok : true,
						warning : true,
						error : true,
					}
				},
			};
	
			if (callbacks) {
				callbacks = $.extend({}, defaults.callbacks, callbacks);
			} else {
				callbacks = defaults.callbacks;
			}
			if (args) {
				args = $.extend({}, defaults.args, args);
			} else {
				args = defaults.args;
			}
	
			$.ajax({
				type: args.method,
				url: args.url,
				data: ajaxData,
			}).done(function(data) {
				if (data.debug) {
					if (args.showAlertsFor.debug) {
						$.pcs.showAlert(data.debug);
					} else {
						console.log(data.debug);
					}
				}
		
				if ($.isFunction(callbacks.complete)) {
					callbacks.complete.call({}, data);
				}
		
				if (data.status) {
					if ($.isFunction(callbacks[data.status])) {
						callbacks[data.status].call({}, data);
					}
				}
		
				if (data.redirect_url) {
					window.location = data.redirect_url;
					return false;
				}
		
				/*
				var alertStatus = data.status;
				var alertData = data.message || data.messages;
				var logFunction = console.log;
		
				switch (alertStatus) {
					case 'warning' :
						alertData = data.warning || data.warnings;
						logFunction = console.warn;
					break;
					case 'error' :
						alertData = data.error || data.errors;
						logFunction = console.error;
					break;
				}
		
				if (args.showAlertsFor[alertStatus]) {
					$.pcs.showAlert(alertData, alertStatus);
				} else {
					console.log(alertData);
				}
				*/
			}).fail(function() {
				console.error('AJAX Request Failed');
			});
		},
		showAlert: function(messages, type, args, callback) {
			if (!messages) {
				return false;
			}
	
			if (!type) {
				type = 'info';
			}
	
			if ($.type(messages) == 'string') {
				messages = [messages];
			}
	
			if ($.type(messages) != 'array') {
				return false;
			}
	
			if (window.bootbox) {
				if (!args) {
					args = {
						title : type,
						buttonText : 'OK'
					};
				}
		
				if (!callback) {
					callback = function() {};
				}
		
				var messageHTML = '';
				$.each(messages, function(index, value) {
					messageHTML = messageHTML + '<p>' + value + '</p>';
				});
		
				var btnClass = 'btn-' + type;
				switch (type) {
					case 'ok' :
						btnClass = 'btn-info';
					break;
					case 'error' :
						btnClass = 'btn-danger';
					break;
				}
		
				var modal = bootbox.alert(messageHTML, callback);
				modal.addClass('modal-' + type)
					.find('.btn-primary')
					.text(args.buttonText)
					.removeClass('btn-info btn-success btn-warning btn-danger')
					.addClass(btnClass);
		
				var modalHeader = modal.find('.modal-header');
				if (!modalHeader.length) {
					modalHeader = modal.prepend('<div class="modal-header"> \
						<h4 class="modal-title">Notice</h4> \
					</div>');
				}
				if (modalHeader.length) {
					modalHeader.find('.modal-title').text(args.title);
				}
			} else {
				switch (type) {
					case 'info' :
						console.log('Info Alert: ' + messages);
					break;
					case 'success' :
						console.log('Success Alert: ' + messages);
					break;
					case 'warning' :
						console.warn('Warning Alert: ' + messages);
					break;
					case 'error' :
						console.error('Error Alert: ' + messages);
					break;
				}
			}
		},
		showInfoAlert: function(messages) {
			$.pcs.showAlert(messages, 'info');
		},
		showSuccessAlert: function(messages) {
			$.pcs.showAlert(messages, 'success');
		},
		showWarningAlert: function(warnings) {
			$.pcs.showAlert(warnings, 'warning');
		},
		showErrorAlert: function(errors) {
			$.pcs.showAlert(errors, 'error');
		},
	});
})(jQuery);