/*!

 =========================================================
 * Paper Bootstrap Wizard - v1.0.2
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/paper-bootstrap-wizard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-bootstrap-wizard/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Paper Bootstrap Wizard Functions

   
/**
 * Funcion para cambiar el color de fondo
 * Tiene que recibir el objeto "this"
 */



searchVisible = 0;
transparent = true;

        $(document).ready(function(){

            /*  Activate the tooltips      */
            $('[rel="tooltip"]').tooltip();

            // Code for the Validator
            var $validator = $('.wizard-card form').validate({
        		  rules: {
        		    firstname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    lastname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    email: {
        		      required: true
        		    }
                },
        	});

            // Wizard Initialization
          	$('.wizard-card').bootstrapWizard({
                'tabClass': 'nav nav-pills',
                'nextSelector': '.btn-next',
                'previousSelector': '.btn-previous',

                onNext: function(tab, navigation, index) {
                	var $valid = $('.wizard-card form').valid();
                	if(!$valid) {
                		$validator.focusInvalid();
                		return false;
                	}
                },

                onInit : function(tab, navigation, index){

                  //check number of tabs and fill the entire row
                  var $total = navigation.find('li').length;
                  $width = 80/$total;

                  navigation.find('li').css('width',$width + '%');

                },

                onTabClick : function(tab, navigation, index){

                    var $valid = $('.wizard-card form').valid();

                    if(!$valid){
                        return false;
                    } else{
                        return true;
                    }

                },




                onTabShow: function(tab, navigation, index) {
                    
                    

                    var $total = navigation.find('li').length;
                    var $current = index+1;

                    var $wizard = navigation.closest('.wizard-card');

                  /* FUNCION MOSTRAR BOTON FINALIZAR AL LLEGAR A LAS ULTIMAS OPCIONES CONTENIDO  */
                    if($current >= $total  ) {
                        $($wizard).find('.btn-next').hide();
                        $($wizard).find('.btn-finish').show();
                    } else {
                        $($wizard).find('.btn-next').show();
                        $($wizard).find('.btn-finish').hide();
                    }


              /* FUNCION CANTIDAD DE RECORRIDO EN LA BARRA DE PROCESO  */

                    //update progress
                    var move_distance = 140 / 5;
                    

                    move_distance = move_distance * (index) + move_distance / 7;
                   


                    $wizard.find($('.progress-bar')).css({width:  move_distance + '%'});

                    //e.relatedTarget // previous tab
                    


                    $wizard.find($('.wizard-card .nav-pills li.active a .icon-circle')).addClass('checked');


                }
	        });


          /* FUNCION BARRA DE PROGRESO CONTENIDO  */

                $('[data-toggle="wizard-radio"]').click(function(){
                    wizard = $(this).closest('.wizard-card');
                    wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
                    $(this).addClass('active');
                    $(wizard).find('[type="radio"]').removeAttr('checked');
                    $(this).find('[type="radio"]').attr('checked','true');
                });

                $('[data-toggle="wizard-checkbox"]').click(function(){
                    if( $(this).hasClass('active')){
                        $(this).removeClass('active');
                        $(this).find('[type="checkbox"]').removeAttr('checked');
                    } else {
                        $(this).addClass('active');
                        $(this).find('[type="checkbox"]').attr('checked','true');
                    }
                });

                $('.set-full-height').css('height', 'auto');

            });



        



    /* FUNCION MOSTRAR PROGRESO BARRA DE CONTENIDO  */

        function siguiente(){
        document.getElementById('progreso').style.display = 'block';
        
    }



  /* FUNCION OCULTAR  BOTONES CONTENEDOR */

        function ocultar(){
        document.getElementById('ocultar').style.display = 'none';
        document.getElementById('ocultar2').style.display = 'none';
        
    }

/* FUNCION OCULTAR BARRA DE PROGRESO Y BOTONES CONTENEDOR */
    function ocultartodo(){
        
        document.getElementById('wizard').style.display = 'none';
        document.getElementById('wizard2').style.display = 'none';
        document.getElementById('wizard3').style.display = 'none';
    }




    function refrescar(){
        location.reload();
    }





/* FUNCION SCROLL IMAGEN*/


$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});
