  /** 
  * Validacion de Formularios
  *
  * Autor: James Mauricio Martinez Figueroa
  * Email: jmmartif@hotmail.com
  *        jmmartif@tribunetworks.com
  * Version: 1.2
  * Fecha: 20040129
  * Copyright (c) 2004
  * Todos los derechos reservados.
  */
  
  function validacion(campoName, formName){
	// Se reasignan las funciones para el objeto
	  // Funciones de validacion
	  this.validar=validar;
	  this.validarRequerido=validarRequerido;
	  this.validarLongitud=validarLongitud;
	  this.validarNumero=validarNumero;
	  this.validarInteger=validarInteger;
	  this.validarEmail=validarEmail;
	  this.validarRango=validarRango;
	  this.validarFecha=validarFecha;
	  this.validarIgual=validarIgual;
	  this.validarInVector=validarInVector;
	  
	  this.getTipoCampo=getTipoCampo;
	  this.setMensaje=setMensaje;
	  
	  // Funciones para gestionar el acceso al campo por id o nombre
	  this.setObjCampoBy=setObjCampoBy;
	  this.getValor=getValor;
	  this.setValor=setValor;
	  this.setFoco=setFoco;
	  
	  // Funciones para controlar el despliegue de los mensajes de error para un campo
	  this.setDisplayAlert=setDisplayAlert;
	  this.setDisplayFoco=setDisplayFoco;
	  
	  // Definir las funciones para los tipos de validacion
	  this.setE=setE;
	  this.setR=setR;
	  this.setLongMin=setLongMin;
	  this.setLongMax=setLongMax;
	  this.setN=setN;
	  this.setI=setI;
	  this.setF=setF;
	  this.setValMin=setValMin;
	  this.setValMax=setValMax;
	  this.setIgual=setIgual;
	  this.setInVector=setInVector;
	  
	  // Variable que determina si el error se ha visualizado
	  this.displayedErrorCfg=false;
  	  this.displayErrorCfg=displayErrorCfg;
	  this.errorCfg='ERROR DE CONFIGURACION:\nEl objeto de validacion para el campo \n'+formName+'.'+campoName+'\nNo se encuentra bien configurado.'
	  
    // Lo primero que se hace es verificar que el objeto exista ya sea que se valide por nombre o id del campo
	var elemento=getElement(this.campoName);
    if(eval('document.'+formName+'.'+campoName+'===undefined') && !elemento) this.configurado=false;
	else{
	    // Una vez configurado se define que fue correcto
	    this.configurado=true;
		
		// Se definen las variables iniciales del objeto
		this.displayAlert=true; // Define si cuando se realice la validacion desplega el mensaje en alert
		this.displayFoco=true; // Define si cuando se realice la validacion fija el foco en el campo cuando salga error
		this.campoName=campoName; // Nombre del campo para validar
		this.formName=formName; // Nombre del formulario que contiene el campo
		this.objCampoBy='nombre'; // Define si el objeto que se quiere validar se accede por nombre o id
	    
		  // Se definen las variables de la validacion
		  this.mensaje='';
		  this.E=false;
		  
		  this.R=false;
		  this.longMin='x';
		  this.longMax='x';
		  this.lRango=false;
		  
		  this.N=false;
		  this.I=false;
		  this.nRango=false;
		  this.valMin='x';
		  this.valMax='x';
		  
		  this.fFormato='dd/mm/yyyy';
		  
		  this.igual=false;
		  this.igualPrueba='';
		  this.igualMsg='';
		  
		  this.inVector=false;
		  this.inVectorDatos=new Array();
		  
	  } // else
  } // validacion
  
  
  /**
  * Fija por medio de que metodo se accede al campo que se quiere validar, por nombre o id
  */
  function setObjCampoBy(valor){
    if(valor=='id') this.objCampoBy='id';
	else this.objCampoBy='nombre';
  } // setObjCampoBy
  
  
  /**
  * Obtiene el valor de un campo de formulario, verifica por medio de id o por nombre del campo y form
  * Si no se especifica campoName se valida el que tiene el objeto en el momento
  */
  function getValor(campoName){
    if(campoName===undefined) campoName=this.campoName;
	
    if(this.objCampoBy=='nombre'){
      if(!eval('document.'+this.formName+'.'+campoName+'===undefined')){
	    try{return(eval('document.'+this.formName+'.'+campoName+'.value'));}catch(e){return(eval("document."+this.formName+"."+campoName+".value"));}
      } // if
	  else return '';
	} // if
	else{
	  var elemento=getElement(campoName);
	  if(elemento.value) return elemento.value;
	  else return '';
	} // else
  } // getValor
  
  
  /**
  * Fija el valor de un campo de formulario
  */
  function setValor(valor){
    if(this.objCampoBy=='nombre'){
      if(!(this.campoName.length==0 || this.formName.length==0)){
	    try{eval('document.'+this.formName+'.'+this.campoName+'.value=\''+valor+'\'');} catch(e){eval("document."+this.formName+"."+this.campoName+".value=\""+valor+"\"");}
		//try{return(eval('document.'+this.formName+'.'+campoName+'.value'));}catch(e){return(eval("document."+this.formName+"."+campoName+".value"));}
	  } // if
	} // if
	else{
	  var elemento=getElement(this.campoName);
	  elemento.value=valor;
	} // else
  } // setValor
  
  
  /**
  * Fija el foco en un objeto de formulario
  */
  function setFoco(){
    if(this.objCampoBy=='nombre'){
	  eval('document.'+this.formName+'.'+this.campoName+'.select()');
      eval('document.'+this.formName+'.'+this.campoName+'.focus()');
	} // if
	else{
	  var elemento=getElement(this.campoName);
	  elemento.select();
	  elemento.focus();
	} // else
  } // setFoco
  
  
  /**
  * Muestra el mensaje de error solamente una vez
  */
  function displayErrorCfg(){
    if(!this.displayedErrorCfg){
	  alert(this.errorCfg);
	  this.displayedErrorCfg=true;
	} // if
  }
  
  
  /**
  * Determina si cuando se realice la validacion se muestra el mensaje de error en un alert
  * Por defecto se encuentra en true
  */
  function setDisplayAlert(opcion){
    if(opcion!=true || opcion!=false){
      this.displayAlert=opcion;
	} // if
  } // setDisplayAlert
  
  
  /**
  * Determina si cuando se realice la validacion se enfoca el campo en cuestion
  * Por defecto se encuentra en true
  */
  function setDisplayFoco(opcion){
    if(opcion!=true || opcion!=false){
      this.displayFoco=opcion;
	} // if
  } // setDisplayFoco
  
  /**
  * Define si el objeto debe ser validado como requerido
  */
  function setR(){
    this.R=true;
  } // setR
  
  
  /**
  * Define si el objeto debe ser validado como numerico
  */
  function setN(){
    this.N=true;
  } // setN
  
  
  /**
  * Define si el objeto debe ser validado como entero, por defecto se coloca la validacion de numerico
  */
  function setI(){
    this.setN();
    this.I=true;
  } // setI
  
  /**
  * Define si el objeto debe ser validado como e-mail
  */
  function setE(){
    this.E=true;
  } // setE
  
  
  /**
  * Define si el objeto debe ser validado fecha y configura el formato para verificacion
  * Si no se configura correctamente el formato se define como dd/mm/yyyy
  */
  function setF(formato){
    if(formato==='dd-mm-yyyy') this.fFormato='dd-mm-yyyy';
	else if(formato==='dd mm yyyy') this.fFormato='dd mm yyyy';
	else if(formato==='mm/dd/yyyy') this.fFormato='mm/dd/yyyy';
	else if(formato==='mm-dd-yyyy') this.fFormato='mm-dd-yyyy';
	else if(formato==='mm dd yyyy') this.fFormato='mm dd yyyy';
	else this.fFormato='dd/mm/yyyy';
    this.F=true;
  } // setF
  
  
  /**
  * Define el nombre del campo con el que se debe comparar y el mensaje en caso de error
  */
  function setIgual(igualPrueba, igualMsg){
    igualPrueba=trim(igualPrueba);
	igualMsg=trim(igualMsg);
	
	if(igualPrueba=='' || igualPrueba===undefined || igualMsg=='' || igualMsg===undefined){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nEl campo de igual o el mensaje de error\nno se ha configurado correctamente');
	  this.configurado=false;
	  this.displayErrorCfg();
	} // if
	else{
	  // Se recupera el valor del campo y se asigna a la variable
	  var valorT=trim(this.getValor(igualPrueba));
	  if(valorT===undefined) this.igualPrueba='';
	  else this.igualPrueba=valorT;
	  
	  this.igualMsg=igualMsg;
	  this.igual=true;
	}
  } // setIgual
  
  
  /**
  * Define que el campo va a estar en un listado de datos posibles, estos datos se reciben en una cadena
  * separados por | SPLIT
  */
  function setInVector(cadenaDatos, separador){
    cadenaDatos=trim(cadenaDatos);
	separador=trim(separador);
	if(!(separador=='|' || separador=='SPLIT')) separador='';
	
	if(cadenaDatos=='' || cadenaDatos===undefined || separador=='' || separador===undefined){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nLos campos de la lista de validacion\nno se ha configurado correctamente');
	  this.configurado=false;
	  this.displayErrorCfg();
	} // if
	else{
	  // Se parte por el separador y se obtiene un nuevo vector de datos
	  var vectorDatos=cadenaDatos.split(separador);
	  for(var i=0; i<vectorDatos.length; i++) this.inVectorDatos[vectorDatos[i]]=true;
	  this.inVector=true;
	} // else
  } // setInVector
  
  
  /**
  * Recorre todas las opciones de validacion del campo y verifica cada una de ellas, llamando
  * cada funcion con los parametros necesarios
  *
  * La variable this.nRango se fija solamente cuando los valores valMin y valMax se fija correctamente
  * La variable this.N se fija de forma automatica cuando se define un rango de numeros
  */
  function validar(){
    resultado=true;
	
	// Primero se recupera el tipo de objeto y se asigna el valor al objeto para realizar las validaciones
	  // Se recupera el tipo de objeto de formulario
	  this.tipo=trim(this.getTipoCampo());
	  // Se recupera el valor y se le asigna inicialmente
	  valorT=trim(this.getValor());
	  if(valorT===undefined) this.valor='';
	  else this.valor=valorT;
	  // Si el tipo es text se reasigna el valor de nuevo al formulario
	  // REVISION DE LA ASIGNACION DEL VALOR DESPUES DEL TRIM CUANDO TIENE UN '
	  // JAMES
	  if(this.tipo=='text') this.setValor(this.valor);
	  
	// Se inicia el proceso de validacion de acuerdo al orden de requerido, longitud, numerico, etc.
	
    if(resultado && this.R) resultado=this.validarRequerido();
	
	if(resultado && this.lRango) resultado=this.validarLongitud();
	
    if(resultado && this.N) resultado=this.validarNumero();
	
	if(resultado && this.I) resultado=this.validarInteger();

	if(resultado && this.E) resultado=this.validarEmail();

	if(resultado && this.nRango) resultado=this.validarRango();
	
	if(resultado && this.F) resultado=this.validarFecha();
	
	if(resultado && this.igual) resultado=this.validarIgual();
	
	if(resultado && this.inVector) resultado=this.validarInVector();
	
	return resultado;
	
  } // validar
  
  
  /**
  * Valida que el campo sea requerido
  */
  function validarRequerido(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else{
	  if(this.valor==''){
	    if(this.displayAlert) alert('El campo es requerido');
		if(this.displayFoco) this.setFoco();
		return false
	  } // if
	  else return true;
	} // else
  } // validarRequerido
  
  
  /**
  * Valida que el campo sea numerico
  */
  function validarNumero(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else{
	  if(isNaN(this.valor)){
	    if(this.displayAlert) alert('El campo debe ser numerico');
		if(this.displayFoco) this.setFoco();
		return false;
	  } // if
	  else return true;
	} // else
  } // validarNumero
  
  
  /**
  * Valida que el campo sea entero
  */
  function validarInteger(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else{
	  if(isNaN(this.valor)){
	    if(this.displayAlert) alert('El campo debe ser numerico');
		if(this.displayFoco) this.setFoco();
		return false;
	  } // if
	  // Si es numerico pero contiene un . muestra el error
	  else if(this.valor.indexOf('.')>0){
	    if(this.displayAlert) alert('El campo no puede contener decimales');
		if(this.displayFoco) this.setFoco();
		return false
	  } // else if
	  else return true;
	} // else
  } // validarInteger
  
  /**
  * Valida que el campo sea una direccion de email valida
  */
  function validarEmail(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else if(this.valor=='') return true;
	else{
	  resultadoTmp=emailCheck(this.valor);

	  if(!resultadoTmp["validacion"]){
		// Dependiendo del codigo del error se muestra un mensaje
		if(resultadoTmp["errorNo"]==1) mensaje='El campo debe ser un e-mail correcto';
		else if(resultadoTmp["errorNo"]==2) mensaje='El nombre de dominio no es correcto';
		else if(resultadoTmp["errorNo"]==3) mensaje='El nombre de usuario contiene caracteres invalidos';
		else if(resultadoTmp["errorNo"]==4) mensaje='El nombre de dominio contiene caracteres invalidos';
		else mensaje='El campo debe ser un e-mail correcto';
		
	    if(this.displayAlert) alert(mensaje);
		if(this.displayFoco) this.setFoco();
	    return false;
	  } // if
	  else return true;
	} // else
  } // validarEmail
  
  
  /**
  * Valida que el valor del campo se encuentre entre valMax y valMin inclusive
  * Si no se han establecido retorna true
  */
  function validarRango(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else{
	  // Se asegura que el tipo de dato sea numerico para la comparacion
	  valorTmp=parseFloat(this.valor);
	  
	  if(this.valMax!='x'){
	    if (valorTmp>parseFloat(this.valMax)){
	      if(this.displayAlert) alert('El valor es mayor que el permitido.\nValor maximo: '+this.valMax);
		  if(this.displayFoco) this.setFoco();
		  return false;
		} // if
	  } // if valMax
	  
	  if(this.valMinvalMin!='x'){
	    if (valorTmp<parseFloat(this.valMin)){
	      if(this.displayAlert) alert('El valor es menor que el permitido.\nValor minimo: '+this.valMin);
		  if(this.displayFoco) this.setFoco();
		  return false;
		} // if
	  } // if valMax

	  return true;
    } // else
  } // validarRango
  
  
  /**
  * Valida que la longitud del campo se encuentre entre longMax y longMin inclusive
  * Si no se han establecido retorna true
  */
  function validarLongitud(){
//  alert(this.longMax);
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else{
	  if(this.longMax!='x'){
	    if(parseFloat(this.valor.length)>parseFloat(this.longMax)){
	      if(this.displayAlert) alert('La longitud del campo es mayor que la permitida.\nLongitd maxima: '+this.longMax);
		  if(this.displayFoco) this.setFoco();
		  return false;
		} // if
	  } // if longMax
	  
	  if(this.longMin!='x' && this.valor.length!=0){
	    if (parseFloat(this.valor.length)<parseFloat(this.longMin)){
	      if(this.displayAlert) alert('La longitud del campo es menor que la permitida.\nLongitd minima: '+this.longMin);
		  if(this.displayFoco) this.setFoco();
		  return false;
		} // if
	  } // if longMin

	  return true;
    } // else
  } // validarLongitud
  
  
  /**
  * Valida que el valor del campo se encuentre entre valMax y valMin inclusive
  * Si no se han establecido retorna true
  */
  function validarFecha(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	// Si el valor contiene algo se realiza la verificacion, sino se retorna true
	else if(this.valor.length>=1){
		// Se verifica el formato y se valida que sea el correcto
		// Luego se procesa la cadena y se llama la funcion de validacion
		var mensaje='La fecha no es correcta.';
		var infoFecha;
		var validacion=true;
		var fFormatoTmp='';
		var separadorTmp=''
		
		
		// Configuracion de la validacion de la fecha para los formatos ddXmmXyyyy
		if((this.fFormato=='dd/mm/yyyy' || this.fFormato=='dd-mm-yyyy' || this.fFormato=='dd mm yyyy') && this.valor.length!=this.fFormato.length){
			// Validar la longitud de caracteres de la cadena
			mensaje='La fecha debe tener exactamente '+this.fFormato.length+' caracterres.';
			validacion=false;
		} // if
		if(this.fFormato=='dd/mm/yyyy'){fFormatoTmp='ddXmmXyyyy'; separadorTmp='/';} // if
		if(this.fFormato=='dd-mm-yyyy'){fFormatoTmp='ddXmmXyyyy'; separadorTmp='-';} // if
		if(this.fFormato=='dd mm yyyy'){fFormatoTmp='ddXmmXyyyy'; separadorTmp=' ';} // if
		
		
		// Configuracion de la validacion de la fecha para los formatos mmXddXyyyy
		if((this.fFormato=='mm/dd/yyyy' || this.fFormato=='mm-dd-yyyy' || this.fFormato=='mm dd yyyy') && this.valor.length!=this.fFormato.length){
			// Validar la longitud de caracteres de la cadena
			mensaje='La fecha debe tener exactamente '+this.fFormato.length+' caracterres.';
			validacion=false;
		} // if
		if(this.fFormato=='mm/dd/yyyy'){fFormatoTmp='mmXddXyyyy'; separadorTmp='/';} // if
		if(this.fFormato=='mm-dd-yyyy'){fFormatoTmp='mmXddXyyyy'; separadorTmp='-';} // if
		if(this.fFormato=='mm dd yyyy'){fFormatoTmp='mmXddXyyyy'; separadorTmp=' ';} // if
		
		
		// Validacion formato ddXmmXyyyy
		if(fFormatoTmp=='ddXmmXyyyy'){
			infoFecha=this.valor.split(separadorTmp);
			if(validacion && (isNaN(infoFecha[0]) || infoFecha[0].length!=2)){validacion=false; mensaje='El dia contiene caracteres no validos.\nFormato: '+this.fFormato;}
			if(validacion && (isNaN(infoFecha[1]) || infoFecha[1].length!=2)){validacion=false; mensaje='El mes contiene caracteres no validos.\nFormato: '+this.fFormato;}
			if(validacion && (isNaN(infoFecha[2]) || infoFecha[2].length!=4)){validacion=false; mensaje='El anno contiene caracteres no validos.\nFormato: '+this.fFormato;}
			if(validacion) validacion=dateValid(infoFecha[1]+'/'+infoFecha[0]+'/'+infoFecha[2]);
		} // if ddXmmXyyyy
		
		// Validacion formato mmXddXyyyy
		else if(fFormatoTmp=='mmXddXyyyy'){
			infoFecha=this.valor.split(separadorTmp);
			if(validacion && (isNaN(infoFecha[0]) || infoFecha[0].length!=2)){validacion=false; mensaje='El mes contiene caracteres no validos.\nFormato: '+this.fFormato;}
			if(validacion && (isNaN(infoFecha[1]) || infoFecha[1].length!=2)){validacion=false; mensaje='El dia contiene caracteres no validos.\nFormato: '+this.fFormato;}
			if(validacion && (isNaN(infoFecha[2]) || infoFecha[2].length!=4)){validacion=false; mensaje='El anno contiene caracteres no validos.\nFormato: '+this.fFormato;}
			if(validacion) validacion=dateValid(infoFecha[1]+'/'+infoFecha[0]+'/'+infoFecha[2]);
		} // if mmXddXyyyy
		else{
			validacion=false;
			mensaje='ERROR DE CONFIGURACION:\nEl formato para validacion de fecha no esta definido.';
			this.configurado=false;
		} // else
		
		if(validacion) return true;
		else{
		    if(this.displayAlert) alert(mensaje);
			if(this.displayFoco) this.setFoco();
			return false
		} // else
    } // else if
	else return true;
  } // validarFecha
  
  
  /**
  * Valida que el campo sea igual a igualPrueba
  */
  function validarIgual(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else{
	  if(this.igualPrueba!=this.valor){
	    if(this.displayAlert) alert(this.igualMsg);
		if(this.displayFoco) this.setFoco();
		return false
	  } // if
	  else return true;
	} // else
  } // validarIgual
  
  
  /**
  * Valida que el campo se encuentre en un vector de datos
  */
  function validarInVector(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
	else{
	  if(!this.inVectorDatos[this.valor] && this.valor!=''){
	    if(this.displayAlert) alert('El valor no corresponde a ninguno de los valores permitidos');
		if(this.displayFoco) this.setFoco();
		return false
	  } // if
	  else return true;
	} // else
  } // validarInVector
  
  
  /**
  * Estas funciones establecen los valores valMin y valMax para el rango numerico
  * Se verifica que sean numero correctos acordes a valMin y valMax, en el caso que suceda un error
  * de configuracion por ej valMin>valMax sale un mensaje de error y este debe ser corregido en tiempo
  * de programacion
  */
  function setValMin(numerito){
    if(isNaN(numerito)){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nValor minimo no es numerico');
	  this.configurado=false;
	} // if

	else if(isNaN(this.valMin)){
	  // Cuando valMin NO esta configurado
		if(isNaN(this.valMax)){
		  // Cuando no esta asignado valMin
		  this.valMin=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else if(this.valMax>=numerito){
		  // Cuando valMax esta asignado correctamente
		  this.valMin=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else{
		  // Cuando valMax es menor que valMin
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nValor maximo no puede ser menor que el valor minimo');
		  this.configurado=false;
		} // else
	} // else if
	else{
	  // Cuando valMax SI esta configurado
		if(isNaN(this.valMax)){
		  // Cuando no esta asignado valMax
		  this.valMin=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else if(this.valMax>=numerito){
		  // Cuando valMax esta asignado correctamente
		  this.valMin=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else{
		  // Cuando valMax es menor que valMin
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nValor maximo no puede ser menor que el valor minimo');
		  this.configurado=false;
		} // else
	} // else
  } // setValMin
  
  function setValMax(numerito){
    if(isNaN(numerito)){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nValor maximo no es numerico');
	  this.configurado=false;
	} // if

	else if(isNaN(this.valMax)){
	  // Cuando valMax NO esta configurado
		if(isNaN(this.valMin)){
		  // Cuando no esta asignado valMin
		  this.valMax=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else if(numerito>=this.valMin){
		  // Cuando valMin esta asignado correctamente
		  this.valMax=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else{
		  // Cuando valMin es mayor que valMax
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nValor maximo no puede ser menor que el valor minimo');
		  this.configurado=false;
		} // else
	} // else if
	else{
	  // Cuando valMax SI esta configurado
		if(isNaN(this.valMin)){
		  // Cuando no esta asignado valMin
		  this.valMax=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else if(numerito>=this.valMin){
		  // Cuando valMin esta asignado correctamente
		  this.valMax=numerito;
		  this.nRango=true;
		  this.setN();
		} // else if
		else{
		  // Cuando valMin es mayor que valMax
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nValor maximo no puede ser menor que el valor minimo');
		  this.configurado=false;
		} // else
	} // else

  } // setValMax
  
  
  /**
  * Estas funciones establecen los valores longMin y longMax para el rango requerido
  * Se realiza la misma validacion que valMin y valMax, en el caso que suceda un error de configuracion 
  * debe ser corregido en tiempo de programacion
  */
  function setLongMin(numerito){
    // Solo cuando se fija setLongMin se establece que el campo es requerido
	
    if(isNaN(numerito)){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nLongitud minima no es numerico');
	  this.configurado=false;
	} // if
	else if(numerito<1){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nLongitud minima debe ser por lo menos 1');
	  this.configurado=false;
	} // if

	else if(isNaN(this.longMin)){
	  // Cuando longMin NO esta configurado
		if(isNaN(this.longMax)){
		  // Cuando no esta asignado longMin
		  this.longMin=numerito;
		  this.lRango=true;
		  // Si el valor minimo es 1 simplemente se marca el campo como requerido
		  if(numerito==1) this.setR();
		} // else if
		else if(this.longMax>=numerito){
		  // Cuando longMax esta asignado correctamente
		  this.longMin=numerito;
		  this.lRango=true;
		  // Si el valor minimo es 1 simplemente se marca el campo como requerido
		  if(numerito==1) this.setR();
		} // else if
		else{
		  // Cuando longMax es menor que longMin
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nLongitud maxima no puede ser menor que el longitud minima');
		  this.configurado=false;
		} // else
	} // else if
	else{
	  // Cuando longMax SI esta configurado
		if(isNaN(this.longMax)){
		  // Cuando no esta asignado longMax
		  this.longMin=numerito;
		  this.lRango=true;
		  // Si el valor minimo es 1 simplemente se marca el campo como requerido
		  if(numerito==1) this.setR();
		} // else if
		else if(this.longMax>=numerito){
		  // Cuando longMax esta asignado correctamente
		  this.longMin=numerito;
		  this.lRango=true;
		  // Si el valor minimo es 1 simplemente se marca el campo como requerido
		  if(numerito==1) this.setR();
		} // else if
		else{
		  // Cuando longMax es menor que longMin
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nLongitud maxima no puede ser menor que longitud minima');
		  this.configurado=false;
		} // else
	} // else
  } // setLongMin
  
  function setLongMax(numerito){
    if(isNaN(numerito)){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nLongitud maxima no es numerico');
	  this.configurado=false;
	} // if
	else if(numerito<1){
	  // Mensaje que solo debe aparecer en desarrollo
	  this.setFoco();
	  alert('ERROR DE CONFIGURACION:\nLongitud maxima debe ser por lo menos 1');
	  this.configurado=false;
	} // if

	else if(isNaN(this.longMax)){
	  // Cuando longMax NO esta configurado
		if(isNaN(this.longMin)){
		  // Cuando no esta asignado longMin
		  this.longMax=numerito;
		  this.lRango=true;
		} // else if
		else if(numerito>=this.longMin){
		  // Cuando longMin esta asignado correctamente
		  this.longMax=numerito;
		  this.lRango=true;
		} // else if
		else{
		  // Cuando longMin es mayor que longMax
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nLongitud maxima no puede ser menor que longitud minima');
		  this.configurado=false;
		} // else
	} // else if
	else{
	  // Cuando longMax SI esta configurado
		if(isNaN(this.longMin)){
		  // Cuando no esta asignado longMin
		  this.longMax=numerito;
		  this.lRango=true;
		} // else if
		else if(numerito>=this.longMin){
		  // Cuando longMin esta asignado correctamente
		  this.longMax=numerito;
		  this.lRango=true;
		} // else if
		else{
		  // Cuando longMin es mayor que longMax
		  // Mensaje que solo debe aparecer en desarrollo
		  this.setFoco();
		  alert('ERROR DE CONFIGURACION:\nLongitud maxima no puede ser menor que longitud minima');
		  this.configurado=false;
		} // else
	} // else

  } // setLongMax
  
  
  /**
  * Obtiene el tipo del campo de formulario que se quiere validar
  */
  function getTipoCampo(){
    if(!(this.configurado===true)){
	  this.displayErrorCfg();
	  return false;
	} // if
    if(this.objCampoBy=='nombre') return(eval('document.'+this.formName+'.'+this.campoName+'.type'));
	else{
	  var elemento=getElement(this.campoName);
	  if(!elemento.type===undefined) return elemento.type;
	} // else
  } // getTipo
  
  
  /**
  * Fija el mensaje de error en la validacion del campo que ve el usuario
  */
  function setMensaje(mensaje){
    this.mensaje=mensaje;
  } // setMensaje
