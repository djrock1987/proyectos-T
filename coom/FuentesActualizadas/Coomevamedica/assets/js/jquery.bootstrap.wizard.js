/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.0
 * Requires jQuery v1.3.2 or later
 * Supports Bootstrap 2.2.x, 2.3.x, 3.0
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
var inputUsuario;
var usuario;
var dataCedula;
var dataSarlaft;
var especialidad;
var valorEspecialidad;
var selectEspecialidad;
var selectValor;
var monto;
var montoValida;
var checketTerminos;
var checketDeseoContratar;
Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 }
function valida(e){
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8){
        return true;
    }
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}
function validaLimite(limite){
	var numeroEntero = parseInt(limite.replace("$","").replace(" ","").replace(".","").replace(".","").replace(".",""));
	dataValorInmueble = numeroEntero;
	if(numeroEntero > 1000000000){
		$('#valorInmueble').val('1000000000');
	}
};
function cargaListaValor(){
	var optionEsp = selectEspecialidad.options[selectEspecialidad.selectedIndex];
	seleccionOption = $(arrEspecialidades.records).filter(function (i,n){return n.especialidad===optionEsp.value})[0].grupo;
	if (seleccionOption == 1) {
		$('#valorCober option').remove();
		$('#vigencia input').remove();
		jsonValor1 = jsonValor1;
		for(var x in jsonValor1.records) {									
			$("#valorCober").append('<option value="'+jsonValor1.records[x].Monto + '">' + jsonValor1.records[x].Valor + '</option>');
		};
	}
	if (seleccionOption == 2) {
		$('#valorCober option').remove();
		$('#vigencia input').remove();
		jsonValor2 = jsonValor2;
		for(var x in jsonValor2.records) {
			$("#valorCober").append('<option value="'+jsonValor2.records[x].Monto + '">' + jsonValor2.records[x].Valor + '</option>');
		};
	}
	if (seleccionOption == 3) {
		$('#valorCober option').remove();
		$('#vigencia input').remove();
		jsonValor3 = jsonValor3;
		for(var x in jsonValor3.records) {
			$("#valorCober").append('<option value="'+jsonValor3.records[x].Monto + '">' + jsonValor3.records[x].Valor + '</option>');
		};
	}
	if (seleccionOption == 4) {
		$('#valorCober option').remove();
		$('#vigencia input').remove();
		jsonValor4 = jsonValor4;
		for(var x in jsonValor2.records) {
			$("#valorCober").append('<option value="'+jsonValor4.records[x].Monto + '">' + jsonValor4.records[x].Valor + '</option>');
		};
	}
	if (seleccionOption == 5) {
		$('#valorCober option').remove();
		$('#vigencia input').remove();
		jsonValor5 = jsonValor5;
		for(var x in jsonValor5.records) {
			$("#valorCober").append('<option value="'+jsonValor5.records[x].Monto + '">' + jsonValor5.records[x].Valor + '</option>');
		};
	}
	if (seleccionOption == 6) {
		$('#valorCober option').remove();
		$('#vigencia input').remove();
		jsonValor6 = jsonValor6;
		for(var x in jsonValor6.records) {
			$("#valorCober").append('<option value="'+jsonValor6.records[x].Monto + '">' + jsonValor6.records[x].Valor + '</option>');
		};
	}
	if (seleccionOption == 7) {
		$('#valorCober option').remove();
		$('#vigencia input').remove();
		jsonValor7 = jsonValor7;
		for(var x in jsonValor7.records) {
			$("#valorCober").append('<option value="'+jsonValor7.records[x].Monto + '">' + jsonValor7.records[x].Valor + '</option>');
		};
	}
	selectValor = document.getElementById('valorCober'); 
	selectValor.addEventListener('change',function(){
		var selectOpValor = this.options[selectValor.selectedIndex];
		var valAnual= document.getElementById("valAnual");
		var valMensual= document.getElementById("valMen");
		var valorPolAn=parseFloat(selectOpValor.value.replace("$","").replace(" ","").replace(",","").replace(",","").replace(",",""));
		var valorPolMen=valorPolAn/(12-(((new Date()).getMonth())+1))
		valAnual.innerHTML='$ '+valorPolAn.formatMoney(2,',','.');
		valMensual.innerHTML='$ '+valorPolMen.formatMoney(2,',','.');									
	});
};
;(function($) {
var bootstrapWizardCreate = function(element, options) {
	var element = $(element);
	var obj = this;
	
	// selector skips any 'li' elements that do not contain a child with a tab data-toggle
	var baseItemSelector = 'li:has([data-toggle="tab"])';

	// Merge options with defaults
	var $settings = $.extend({}, $.fn.bootstrapWizard.defaults, options);
	var $activeTab = null;
	var $navigation = null;
	
	this.rebindClick = function(selector, fn)
	{
		selector.unbind('click', fn).bind('click', fn);
	}

	this.fixNavigationButtons = function() {
		// Get the current active tab
		if(!$activeTab.length) {
			// Select first one
			$navigation.find('a:first').tab('show');
			$activeTab = $navigation.find(baseItemSelector + ':first');
		}

		// See if we're currently in the first/last then disable the previous and last buttons
		$($settings.previousSelector, element).toggleClass('disabled', (obj.firstIndex() >= obj.currentIndex()));
		$($settings.nextSelector, element).toggleClass('disabled', (obj.currentIndex() >= obj.navigationLength()));

		// We are unbinding and rebinding to ensure single firing and no double-click errors
		obj.rebindClick($($settings.nextSelector, element), obj.next);
		obj.rebindClick($($settings.previousSelector, element), obj.previous);
		obj.rebindClick($($settings.lastSelector, element), obj.last);
		obj.rebindClick($($settings.firstSelector, element), obj.first);

		if($settings.onTabShow && typeof $settings.onTabShow === 'function' && $settings.onTabShow($activeTab, $navigation, obj.currentIndex())===false){
			return false;
		}
	};

	this.next = function(e) {

		// If we clicked the last then dont activate this
		if(element.hasClass('last')) {
			return false;
		}

		if($settings.onNext && typeof $settings.onNext === 'function' && $settings.onNext($activeTab, $navigation, obj.nextIndex())===false){
			return false;
		}

		// Did we click the last button
		$index = obj.nextIndex();

		switch($index-1){
			case 0:
				inputUsuario = document.getElementsByName("cedula")[0].value;
				usuario = $.getJSON('http://pruebas2017.txt.co/coomeva/ApiREST/Modelos/Usuarios/leeruno.php?cedula='+inputUsuario);
				usuario.done(function(dataListaUser){
					dataCedula = dataListaUser.cedula;
					dataSarlaft = dataListaUser.sarlaft;
					if(inputUsuario.length <= 11){
						if(inputUsuario == dataCedula){
							if( $('#c1').prop('checked') ) {
								if($index > obj.navigationLength()) {
								} else {
									$navigation.find(baseItemSelector + ':eq('+$index+') a').tab('show');
								}
							}else{
								$('.form-control').css('border', '1px solid #10804C');
								$('[for=c1]').addClass('requerido');
							};	
						}else{
							$('.form-control').css('border', '1px solid #d50000');
						};
					};
					
				});
				$('#especialidad option').remove();				
			    	for(var x in arrEspecialidades.records) {
						$("#especialidad").append('<option value="'+arrEspecialidades.records[x].especialidad
							+'">' + arrEspecialidades.records[x].especialidad + '</option>');
					};
					selectEspecialidad = document.getElementById('especialidad'); 

					crearAutoComp('sel');
			break;
			case 1:
				if ($("#especialidad").val() > "0") {
					//montoValida = document.getElementById("inputVigencia").value;
					//montoValida = parseInt(montoValida);
					if (true) {
						if($index > obj.navigationLength()) {
							} else {
									$navigation.find(baseItemSelector + ':eq('+$index+') a').tab('show');
							}
					}else {
					$("#valorCober").css('border', '1px solid #d50000');
					$("#especialidad").css('border', '1px solid #d2d2d2');
					};
				} else {
					$("#especialidad").css('border', '1px solid #d50000');
				};
			break;
			case 2:
				if($index > obj.navigationLength()) {
							} else {
									$navigation.find(baseItemSelector + ':eq('+$index+') a').tab('show');
							}
			break;
			case 3:
				if ($('#c3').is(':checked')) {
					if ($("#c2").is(':checked')) {
							if(dataSarlaft=="1"){
								$('#finalizarReal').prop('href','#finalizar');
								$('#finalizarReal').attr('data-toggle','tab');
								$('#finalizarReal').attr('onclick','ocultar()');
							}
							else if(dataSarlaft=="2"){
								$('#finalizarReal').prop('href','#activar');
								$('#finalizarReal').attr('data-toggle','tab');
								$('#finalizarReal').attr('onclick','ocultar()');
								$('[rel=txtIdentSarlaft]').html('');
								$('[rel=txtIdentSarlaft]').html('Idetificamos que el formulario de SARLAFT<br> asociado a tu documento requiere una <br> actualización.');
								$('[rel=txtPregunta]').html('');
								$('[rel=txtPregunta]').html('¿Cómo quieres actualizar tu formulario?');
								$('[rel=btnAsllama]').html('');
								$('[rel=btnAsllama]').html('Quiero que un asesor me llame <span class="ti-angle-right"></span>');
								$('[rel=btnViaWeb]').html('');
								$('[rel=btnViaWeb]').html('Quiero hacerlo vía web <span class="ti-angle-right"></span>');
								$('[rel=btnDescRecog]').css('display','none');
							}
							else{
								$('#finalizarReal').prop('href','#activar');
								$('#finalizarReal').attr('data-toggle','tab');
								$('#finalizarReal').attr('onclick','ocultar()');
								$('[rel=txtIdentSarlaft]').html('');
								$('[rel=txtIdentSarlaft]').html('Idetificamos que no tienes un formulario de SARLAFT<br> asociado a tu documento de identidad.');
								$('[rel=txtPregunta]').html('');
								$('[rel=txtPregunta]').html('¿Cómo quieres diligenciar, firmar y enviar el formulario?');
								$('[rel=btnAsllama]').html('');
								$('[rel=btnAsllama]').html('Quiero que un asesor me llame <span class="ti-angle-right"></span>');
								$('[rel=btnViaWeb]').html('');
								$('[rel=btnViaWeb]').html('Quiero descargarlo y enviarlo via mail <span class="ti-angle-right"></span>');
								$('[rel=btnDescRecog]').css('display','');
							}
					} else {
						$("[for=c2]").addClass('requerido');
					}
				} else { 
					$("[for=c3]").addClass('requerido');

				}
			break;
		};
	};

	this.previous = function(e) {

		// If we clicked the first then dont activate this
		if(element.hasClass('first')) {
			return false;
		}

		if($settings.onPrevious && typeof $settings.onPrevious === 'function' && $settings.onPrevious($activeTab, $navigation, obj.previousIndex())===false){
			return false;
		}

		$index = obj.previousIndex();
		if($index < 0) {
		} else {
			$navigation.find(baseItemSelector + ':eq('+$index+') a').tab('show');
		}
	};

	this.first = function(e) {
		if($settings.onFirst && typeof $settings.onFirst === 'function' && $settings.onFirst($activeTab, $navigation, obj.firstIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}
		$navigation.find(baseItemSelector + ':eq(0) a').tab('show');

	};
	this.last = function(e) {
		if($settings.onLast && typeof $settings.onLast === 'function' && $settings.onLast($activeTab, $navigation, obj.lastIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}
		$navigation.find(baseItemSelector + ':eq('+obj.navigationLength()+') a').tab('show');
	};
	this.currentIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab);
	};
	this.firstIndex = function() {
		return 0;
	};
	this.lastIndex = function() {
		return obj.navigationLength();
	};
	this.getIndex = function(e) {
		return $navigation.find(baseItemSelector).index(e);
	};
	this.nextIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) + 1;
	};
	this.previousIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) - 1;
	};
	this.navigationLength = function() {
		return $navigation.find(baseItemSelector).length - 1;
	};
	this.activeTab = function() {
		return $activeTab;
	};
	this.nextTab = function() {
		return $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')').length ? $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')') : null;
	};
	this.previousTab = function() {
		if(obj.currentIndex() <= 0) {
			return null;
		}
		return $navigation.find(baseItemSelector + ':eq('+parseInt(obj.currentIndex()-1)+')');
	};
	this.show = function(index) {
		if (isNaN(index)) {
			return element.find(baseItemSelector + ' a[href=#' + index + ']').tab('show');
		}
		else {
			return element.find(baseItemSelector + ':eq(' + index + ') a').tab('show');
		}
	};
	this.disable = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').addClass('disabled');
	};
	this.enable = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').removeClass('disabled');
	};
	this.hide = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').hide();
	};
	this.display = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').show();
	};
	this.remove = function(args) {
		var $index = args[0];
		var $removeTabPane = typeof args[1] != 'undefined' ? args[1] : false;
		var $item = $navigation.find(baseItemSelector + ':eq('+$index+')');

		// Remove the tab pane first if needed
		if($removeTabPane) {
			var $href = $item.find('a').attr('href');
			$($href).remove();
		}

		// Remove menu item
		$item.remove();
	};
	
	var innerTabClick = function (e) {
		// Get the index of the clicked tab
		var clickedIndex = $navigation.find(baseItemSelector).index($(e.currentTarget).parent(baseItemSelector));
		if($settings.onTabClick && typeof $settings.onTabClick === 'function' && $settings.onTabClick($activeTab, $navigation, obj.currentIndex(), clickedIndex)===false){
			return false;
		}
	};
	
	var innerTabShown = function (e) {  // use shown instead of show to help prevent double firing
		$element = $(e.target).parent();
		var nextTab = $navigation.find(baseItemSelector).index($element);

		// If it's disabled then do not change
		if($element.hasClass('disabled')) {
			return false;
		}

		if($settings.onTabChange && typeof $settings.onTabChange === 'function' && $settings.onTabChange($activeTab, $navigation, obj.currentIndex(), nextTab)===false){
				return false;
		}

		$activeTab = $element; // activated tab
		obj.fixNavigationButtons();
	};
	
	this.resetWizard = function() {
		
		// remove the existing handlers
		$('a[data-toggle="tab"]', $navigation).off('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).off('shown shown.bs.tab', innerTabShown);
		
		// reset elements based on current state of the DOM
		$navigation = element.find('ul:first', element);
		$activeTab = $navigation.find(baseItemSelector + '.active', element);
		
		// re-add handlers
		$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
		
		obj.fixNavigationButtons();
	};

	$navigation = element.find('ul:first', element);
	$activeTab = $navigation.find(baseItemSelector + '.active', element);

	if(!$navigation.hasClass($settings.tabClass)) {
		$navigation.addClass($settings.tabClass);
	}

	// Load onInit
	if($settings.onInit && typeof $settings.onInit === 'function'){
		$settings.onInit($activeTab, $navigation, 0);
	}

	// Load onShow
	if($settings.onShow && typeof $settings.onShow === 'function'){
		$settings.onShow($activeTab, $navigation, obj.nextIndex());
	}

	$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);

	// attach to both shown and shown.bs.tab to support Bootstrap versions 2.3.2 and 3.0.0
	$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
};
$.fn.bootstrapWizard = function(options) {
	//expose methods
	if (typeof options == 'string') {
		var args = Array.prototype.slice.call(arguments, 1)
		if(args.length === 1) {
			args.toString();
		}
		return this.data('bootstrapWizard')[options](args);
	}
	return this.each(function(index){
		var element = $(this);
		// Return early if this element already has a plugin instance
		if (element.data('bootstrapWizard')) return;
		// pass options to plugin constructor
		var wizard = new bootstrapWizardCreate(element, options);
		// Store plugin object in this element's data
		element.data('bootstrapWizard', wizard);
		// and then trigger initial change
		wizard.fixNavigationButtons();
	});
};

// expose options
$.fn.bootstrapWizard.defaults = {
	tabClass:         'nav nav-pills',
	nextSelector:     '.wizard li.next',
	previousSelector: '.wizard li.previous',
	firstSelector:    '.wizard li.first',
	lastSelector:     '.wizard li.last',
	onShow:           null,
	onInit:           null,
	onNext:           null,
	onPrevious:       null,
	onLast:           null,
	onFirst:          null,
	onTabChange:      null, 
	onTabClick:       null,
	onTabShow:        null
};

})(jQuery);
