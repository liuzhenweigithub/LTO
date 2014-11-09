jQuery.fn.showPlaceholder = function(options){
	options = $.extend({
		bindSubmit: true
	}, options || {});
	return this.each(function(){
		var tf = $(this);
		var isIE = jQuery.support.htmlSerialize == false || !('placeholder' in this);
		if( ! tf.attr('placeholder') ) return true;
		if( tf.data('showPlaceholder') ){
			var opt = $.extend(tf.data('showPlaceholder'), options);
			if( tf.val() == '' || tf.val() == tf.attr('placeholder') ){
				if (tf.val() == '' && isIE ){
					tf.val(tf.attr('placeholder'));
				}
			}
			tf.data('showPlaceholder', opt);
			return true;
		}
		if( isIE ){
			var form = tf.closest('form');
			if( form.length ){
				if( options.bindSubmit ){
					form.submit(function(){
						if( tf.val() == tf.attr('placeholder') ){
							tf.val('');
						}
					});
				}
			}
			tf.bind('blur.showPlaceholder', function(){
				var opt = tf.data('showPlaceholder') || options;
				if( tf.val() == '' ){
					tf.val(tf.attr('placeholder'));
				}
			});
			tf.bind('focus.showPlaceholder click.showPlaceholder', function(){
				var opt = tf.data('showPlaceholder') || options;
				if( tf.val() == tf.attr('placeholder') ) tf.val('');
			});
			tf.triggerHandler('blur.showPlaceholder');
		} else {
			if( tf.val() == tf.attr('placeholder') ) tf.val('');
			tf.bind('input.showPlaceholder', function(){
				var opt = tf.data('showPlaceholder') || options;
			});
		}
		tf.data('showPlaceholder', options);
	});
};

$(function(){
	// bind ie placeholder
	$('input:text[placeholder], textarea[placeholder], input:password[placeholder]').showPlaceholder();

	$('#formLogin').on('submit', function(){
		if( $.trim($(':text', this).val()) == '' ){
			alert('Please input your account!');
			return false;
		}
		if( $(':password', this).val() == '' ){
			alert('Please input password!');
			return false;
		}
		return true;
	});
});
