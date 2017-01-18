(function($){
	var modalTrigger = $('.morph-btn');
	var modalWindow = $('.morph-modal');

	function getElementPosition(trigger) {
		var top = trigger.offset().top - $(window).scrollTop();
		var left = trigger.offset().left;

		return [top, left];
	}

	function evaluateScale(element, position) {
		var scaleY = scaleValue(position[0], element.innerHeight(), $(window).height());
		var scaleX = scaleValue(position[1], element.innerWidth(), $(window).width());

		return [scaleY, scaleX];
	}

	function scaleValue(firstCoordinate, elementDimension, windowDimension) {
		var secondCoordinate = windowDimension - firstCoordinate - elementDimension;
		var maxCoordinate = Math.max(firstCoordinate, secondCoordinate);
		var scaleValue = (maxCoordinate*2 + elementDimension)/elementDimension;

		return Math.ceil(scaleValue*10)/10;
	}

	//listen to the click on the modal trigger buttons
	modalTrigger.on('click', function(event){
		event.preventDefault();
		var selectedModalTrigger = $(this);
		//retrieve the href of trigger
		var modalId = selectedModalTrigger.attr('href');
		var selectedModalWindow = modalWindow.filter(modalId);
		var selectedMorphBg = selectedModalWindow.children('.morph-background');
		//show the modal window
		selectedModalWindow.addClass('open-modal');

		//retrieve the trigger position
		var triggerPosition = getElementPosition(selectedModalTrigger);

		//retrieve scale value
		var scaleValues = evaluateScale(selectedMorphBg, triggerPosition);
		//move and scale selectedMorphBg
		selectedMorphBg.css({
			'top': triggerPosition[0]+'px',
			'left': triggerPosition[1]+'px',
			'transform': 'scaleX(' + scaleValues[1] +') scaleY(' + scaleValues[0] +')',
		}).one('transitionend', function(){
			//wait for the transition to be over -> show modal content
			selectedModalWindow.addClass('modal-visible');
		});
		
	});

	//listen to the click on the close-modal buttons
	modalWindow.on('click', '.close-modal', function(event){
		//get the modal window and morphing background
		var selectedModalWindow = $(this).parent('.morph-modal'); // remeber: this refers to the element we just clicked (close-modal)
		var selectedMorphingBackground = selectedModalWindow.children('.morph-background');

		//hide the modal content
		modalWindow.removeClass('modal-visible');
		//scaleDown morphing background
		selectedMorphingBackground.css({
			'transform': 'scaleX(1) scaleY(1)' //remeber 1 is the default value for the css scale tranfrom
		}).one('transitionend', function(){
			//wait for the transition to be over -> hide modal window
			selectedModalWindow.removeClass('open-modal');
		});
	});
})(jQuery);
