
/**
 * Afterlight Tabs provider
 * Turns an area with articles and a ul.nav in to tabified content
 *
 * @constructor
 * @class Tabs
 *
 * @param {String} selector The tabs container
 */
function AfterlightTabs( selector ) {
	"use strict";

	var self = this,
		$container = jQuery,
		$articles = jQuery,
		$nav = jQuery;


	this.bindEvents = function() {
		$nav.on("click", "a", this.navHandler);
	};


	/**
	 * Handle the navigation of the tabs
	 *
	 * @param {Event} e
	 */
	this.navHandler = function(e) {
		var $this = $(this),
			$new;

		e.preventDefault();

		$new = $container.find($this.attr("href"));

		self.hide( $articles );

		self.show( $new );

		self.activate( $this.closest("li") );
	};


	/**
	 * Sets a nav item to active
	 *
	 * @param {jQuery} $el jQuery list item
	 */
	this.activate = function( $el ) {

		$nav.find(".active").removeClass("active");

		$el.addClass("active");

	};


	/**
	 * Applies some UI CSS Classes to the main elements.
	 *
	 */
	this.applyUIClasses = function() {
		$container.addClass("afterlight-tabs");
		$nav.addClass("afterlight-tabs-nav");
		$articles.addClass("afterlight-tabs-panel");
	};

	/**
	 * Toggles the UI state of an element to hidden
	 *
	 * @param {jQuery} el the jQuery element to be hidden
	 */
	this.hide = function( $el ) {
		$el.removeClass("afterlight-tabs-show").addClass("afterlight-tabs-hide");
	};


	/**
	 * Toggles the UI state of an element to visible
	 *
	 * @param {jQuery} $el the jQuery element to be visible
	 */
	this.show = function( $el ) {
		$el.removeClass("afterlight-tabs-hide").addClass("afterlight-tabs-show");
	};


	/**
	 * Initialize class
	 *
	 */
	this.init = function() {

		$container = $(selector);
		$articles = $container.find("article");
		$nav = $container.find("> ul.nav");

		this.applyUIClasses();

		if ($nav.find(".active").length > 0) {
			this.hide( $articles );
			this.show( $( $nav.find(".active a").attr("href") ) );
		}
		else {
			this.hide( $articles.not(":first") );
			this.activate( $nav.find("li:first") );
		}

		this.bindEvents();
	};


	//for sanity
	if (this instanceof AfterlightTabs){
		this.init();
		return this;
	}
	else {
		return new AfterlightTabs(selector);
	}

}
