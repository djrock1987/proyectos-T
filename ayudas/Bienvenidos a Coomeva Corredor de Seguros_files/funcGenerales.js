/*--------------------------------------------------------------------------------------------------
Todos los derechos reservados.
Está prohibida la reproducción total o parcial, cualquier uso de este script debe ser autorizado
por los autores.

Copyright (c) 2004
   jmmartif@tribunetworks.com jmmartif@hotmail.com
   http://www.tribunetworks.com

--------------------------------------------------------------------------------------------------*/

function desaparecerObj(id){
	obj=getElement(id);
	if(!obj) return;
	
	if(obj.style.display=='none') obj.style.display='';
	else obj.style.display='none';
	return false;
} // desaparecerObj


  /**
  * Obtiene un objeto determinado identificado por su id
  */
  function getElement(e,f){
    if(document.layers){
        f=(f)?f:self;
        if(f.document.layers[e]) return f.document.layers[e];
        for(W=0;i<f.document.layers.length;W++) {
            return(getElement(e,fdocument.layers[W]));
        } // for
    } // if
    if(document.all) return document.all[e];
    return document.getElementById(e);
  } // getElement


/**-------------------------------------------------------------------------------------------------
* FUNCIONES DE CADENAS
-------------------------------------------------------------------------------------------------*/
  
	/**
	* Abre una nueva ventana para presentar informacion
	* El id referencia al objeto para indicar si se abre una nueva ventana o no
	* Los otros datos hacen referencia a tamanno de la ventana
	*/
	function winOpen(url, id, width, height){
		if(!width) width=650;
		if(!height) height=350;
		
		window.open(url,'info'+id,'width='+width+',height='+height+',resizable=yes,scrollbars=yes,locationbar=no,left=80, top=80');
		
		return false;
	} // winOpen

  /**
  * Elimina los espacios sobrantes de una cadena
  */
  function trim(valor){
    if(valor!='' && !(valor===undefined)) return ltrim(rtrim(valor));
  } // trim
  
  
  /**
  * Elimina los espacios a la izquierda de una cadena
  */
  function ltrim(valor){
    if(valor!='' && !(valor===undefined)){
      while(''+valor.charAt(0)==' ') valor=valor.substring(1,valor.length);
      return valor;
	} // if
	else return '';
  } // trim
  
  
  /**
  * Elimina los espacios a la derecha de una cadena
  */
  function rtrim(valor){
    if(valor!='' && !(valor===undefined)){
      while(''+valor.charAt(valor.length-1)==' ') valor=valor.substring(0,valor.length-1);
      return valor;
	} // if
	else return '';
  } // trim
  
  
  
  
/**-------------------------------------------------------------------------------------------------
* FUNCIONES PARA FORMULARIOS
-------------------------------------------------------------------------------------------------*/

  /**
  * Procesa los datos del formulario
  */
  function processLogin(){
	var resultado=true;
	
	if(resultado){
		objValidacion=new validacion('loginUsuario', 'formLogin');
		objValidacion.setR();
		resultado=objValidacion.validar();
	} // if

	if(resultado){
		objValidacion=new validacion('passwdCheck', 'formLogin');
		objValidacion.setR();
		resultado=objValidacion.validar();
	} // if
	
	if(resultado){
	  passwdCheck=getElement("passwdCheck");
	  passwdUsuario=getElement("passwdUsuario");
	  passwdUsuario.value=calcMD5(passwdCheck.value);
	  passwdCheck.value="";
	} // if
	
    return resultado;
  } // loginSx
  
  

  /**
  * Cambia el estilo para un tr recibiendo como opcion over, out o click y se encuentran determinados
  * por la hoja de estilos
  */
  function cambiarEstiloTr(tr, opcion){
    if(opcion=='over'){
      if(tr.getAttribute("id")!='trSelected') tr.setAttribute("id", "trOver");
    } // if
    else if(opcion=='out'){
      if(tr.getAttribute("id")=='trOver') tr.setAttribute("id", "");
    } // else if
    else if(opcion=='click'){
      if(tr.getAttribute("id")!='trSelected') tr.setAttribute("id", "trSelected");
	  else tr.setAttribute("id", "");
    } // else if
  } // cambiarEstiloTr


  /**
  * Genera un iframe para mostrar un contenido especifico, recibe como parametros en id del objeto
  * que lo contiene (puede ser un td o div), la comunidad para ubicar la hoja de estilos y el contenido
  */
  function iframePreview(idParent, comunidad, contenido){
	  
	  var html="<html>\n";
	  html+="<head>\n";
	  html+="<style>\n";
	  html+="html,body { border: 0px; background-color: #FFFFFF;}\n";
	  html+="</style>\n";
	  html+="<style type='text/css'>@import url(disenno/"+comunidad+"/estilos/coomeva.css);</style>";
	  html+="</head>\n";
	  html+="<body>\n";
	  html+=contenido;
	  html+="</body>\n";
	  html+="</html>";
      
	  var iframe = document.createElement("iframe");
	  iframe.style.width="100%";
	  iframe.style.height="250px";

	  // Si el contenido es vacio muestra algo pequenno
	  if(trim(contenido)=="" || trim(contenido)=="<br />") iframe.style.height="30px";
      
	  var textarea = getElement(idParent);
	  textarea.appendChild(iframe);
      
	  var doc = iframe.contentWindow.document;
	  doc.open();
	  doc.write(html);
	  doc.close();
  } // iframePreview


    /**
  * Genera un iframe para mostrar un contenido especifico, recibe como parametros en id del objeto
  * que lo contiene (puede ser un td o div), la comunidad para ubicar la hoja de estilos y el contenido
  */
  function iframeGen(idParent, comunidad, contenido,ancho,alto){
	  var html="<html>\n";
	  html+="<head>\n";
	  html+="<style>\n";
	  html+="html,body { border: 2px; background-color: #FFFFFF;}\n";
	  html+="@import url(disenno/"+comunidad+"/estilos/coomeva.css);\n";
	  html+="</style>\n";
	  html+="</head>\n";
	  html+="<body>\n";
	  html+=contenido;
	  html+="</body>\n";
	  html+="</html>";
      
	  var iframe = document.createElement("iframe");
	  iframe.style.width=ancho;
	  iframe.style.height=alto;
      
	  var textarea = getElement(idParent);
	  textarea.appendChild(iframe);
      
	  var doc = iframe.contentWindow.document;
	  doc.open();
	  doc.write(html);
	  doc.close();
  } // iframePreview

  // funciones para manejo de imagenes en el editor - Holmes Zambrano 


  				function onCancel() {
				  __dlg_close(null);
				  return false;
				};

			      function onOK() {
					  var required = {
						  "f_url": "Debe seleccionar una imagen"
					  };
					  for (var i in required) {
						var el = document.getElementById(i);
						if (!el.value) {
						  alert(required[i]);
						  el.focus();
						  return false;
						}
					  }
					  // pass data back to the calling window
					  var fields = ["f_url", "f_alt", "f_align", "f_border",
									"f_horiz", "f_vert"];
					  var param = new Object();
					  for (var i in fields) {
						var id = fields[i];
						var el = document.getElementById(id);
						param[id] = el.value;
					  }
					  __dlg_close(param);
					  alert('Se insertó la imagen en el editor');
					  window.close();
					  return false;
					};				    
				    
				  
				     function onPreview() {
						  var f_url = document.getElementById("f_url");
						  var url = f_url.value;
						  if (!url) {
							alert("Debe seleccionar una imagen");
							f_url.focus();
							return false;
						  }
						  
						  window.ipreview.location.replace(url);
						  return false;
						};
  
  // Fin funciones para manejo de imagenes en el editor - Holmes Zambrano 


  /**
  * Muestra un mensaje de confirmacion, por defecto tiene el mensaje
  * Desea enviar los datos del formulario?
  */
  function confirmar(mensaje){
    mensaje=trim(mensaje);
    if(mensaje=='' || mensaje===undefined) mensaje='Desea enviar los datos del formulario?';
	return confirm(mensaje);
  } // confirmar
  
  
  
/**-------------------------------------------------------------------------------------------------
* FUNCIONES PARA VALIDACION DE UN E-MAIL
* 
* emailCheck();
* Retorna un vector con los campos de validacion:
* validacion: true - e-mail correcto
*             false - e-mail incorrecto
* errorNo: 1 - Error general de email incorrecto
*          2 - El nombre de dominio no es correcto
*          3 - El nombre de usuario contiene caracteres invalidos
*          4 - El nombre de dominio contiene caracteres invalidos
-------------------------------------------------------------------------------------------------*/


	<!-- This script and many more are available free online at -->
	<!-- The JavaScript Source!! http://javascript.internet.com -->
	
	<!-- V1.1.3: Sandeep V. Tamhankar (stamhankar@hotmail.com) -->
	<!-- Original:  Sandeep V. Tamhankar (stamhankar@hotmail.com) -->
	<!-- Changes:
	/* 1.1.4: Fixed a bug where upper ASCII characters (i.e. accented letters
	international characters) were allowed.
	
	1.1.3: Added the restriction to only accept addresses ending in two
	letters (interpreted to be a country code) or one of the known
	TLDs (com, net, org, edu, int, mil, gov, arpa), including the
	new ones (biz, aero, name, coop, info, pro, museum).  One can
	easily update the list (if ICANN adds even more TLDs in the
	future) by updating the knownDomsPat variable near the
	top of the function.  Also, I added a variable at the top
	of the function that determines whether or not TLDs should be
	checked at all.  This is good if you are using this function
	internally (i.e. intranet site) where hostnames don't have to 
	conform to W3C standards and thus internal organization e-mail
	addresses don't have to either.
	Changed some of the logic so that the function will work properly
	with Netscape 6.
	
	1.1.2: Fixed a bug where trailing . in e-mail address was passing
	(the bug is actually in the weak regexp engine of the browser; I
	simplified the regexps to make it work).
	
	1.1.1: Removed restriction that countries must be preceded by a domain,
	so abc@host.uk is now legal.  However, there's still the 
	restriction that an address must end in a two or three letter
	word.
	
	1.1: Rewrote most of the function to conform more closely to RFC 822.
	
	1.0: Original  */
	// -->
	
	<!-- Begin
	function emailCheck (emailStr) {
	
	/* The following variable tells the rest of the function whether or not
	to verify that the address ends in a two-letter country or well-known
	TLD.  1 means check it, 0 means don't. */
	
	var checkTLD=1;
	
	/* The following is the list of known TLDs that an e-mail address must end with. */
	
	var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
	
	/* The following pattern is used to check if the entered e-mail address
	fits the user@domain format.  It also is used to separate the username
	from the domain. */
	
	var emailPat=/^(.+)@(.+)$/;
	
	/* The following string represents the pattern for matching all special
	characters.  We don't want to allow special characters in the address. 
	These characters include ( ) < > @ , ; : \ " . [ ] */
	
	var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	
	/* The following string represents the range of characters allowed in a 
	username or domainname.  It really states which chars aren't allowed.*/
	
	var validChars="\[^\\s" + specialChars + "\]";
	
	/* The following pattern applies if the "user" is a quoted string (in
	which case, there are no rules about which characters are allowed
	and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
	is a legal e-mail address. */
	
	var quotedUser="(\"[^\"]*\")";
	
	/* The following pattern applies for domains that are IP addresses,
	rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
	e-mail address. NOTE: The square brackets are required. */
	
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	
	/* The following string represents an atom (basically a series of non-special characters.) */
	
	var atom=validChars + '+';
	
	/* The following string represents one word in the typical username.
	For example, in john.doe@somewhere.com, john and doe are words.
	Basically, a word is either an atom or quoted string. */
	
	var word="(" + atom + "|" + quotedUser + ")";
	
	// The following pattern describes the structure of the user
	
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	
	/* The following pattern describes the structure of a normal symbolic
	domain, as opposed to ipDomainPat, shown above. */
	
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
	
	/* Finally, let's start trying to figure out if the supplied address is valid. */
	
	/* Begin with the coarse pattern to simply break up user@domain into
	different pieces that are easy to analyze. */
	
	var matchArray=emailStr.match(emailPat);
	
	if (matchArray==null) {
	
	/* Too many/few @'s or something; basically, this address doesn't
	even fit the general mould of a valid e-mail address. */
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=false;
	  valorR["errorNo"]=1;
	  return valorR;
	
	//alert("Email address seems incorrect (check @ and .'s)");
	//return false;
	
	}
	var user=matchArray[1];
	var domain=matchArray[2];
	
	// Start by checking that only basic ASCII characters are in the strings (0-127).
	
	for (i=0; i<user.length; i++) {
	if (user.charCodeAt(i)>127) {
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=false;
	  valorR["errorNo"]=3;
	  return valorR;
	  
	//alert("Ths username contains invalid characters.");
	//return false;
	
	   }
	}
	for (i=0; i<domain.length; i++) {
	if (domain.charCodeAt(i)>127) {
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=false;
	  valorR["errorNo"]=4;
	  return valorR;
	  
	//alert("Ths domain name contains invalid characters.");
	//return false;
	
	   }
	}
	
	// See if "user" is valid 
	
	if (user.match(userPat)==null) {
	
	// user is not valid
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=false;
	  valorR["errorNo"]=3;
	  return valorR;
	
	//alert("The username doesn't seem to be valid.");
	//return false;
	
	}
	
	/* if the e-mail address is at an IP address (as opposed to a symbolic
	host name) make sure the IP address is valid. */
	
	var IPArray=domain.match(ipDomainPat);
	if (IPArray!=null) {
	
	// this is an IP address
	
	for (var i=1;i<=4;i++) {
	if (IPArray[i]>255) {
	alert("Destination IP address is invalid!");
	return false;
	   }
	}
	return true;
	}
	
	// Domain is symbolic name.  Check if it's valid.
	 
	var atomPat=new RegExp("^" + atom + "$");
	var domArr=domain.split(".");
	var len=domArr.length;
	for (i=0;i<len;i++) {
	if (domArr[i].search(atomPat)==-1) {
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=false;
	  valorR["errorNo"]=2;
	  return valorR;
	  
	//alert("The domain name does not seem to be valid.");
	//return false;
	
	   }
	}
	
	/* domain name seems valid, but now make sure that it ends in a
	known top-level domain (like com, edu, gov) or a two-letter word,
	representing country (uk, nl), and that there's a hostname preceding 
	the domain or country. */
	
	if (checkTLD && domArr[domArr.length-1].length!=2 && 
	domArr[domArr.length-1].search(knownDomsPat)==-1) {
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=false;
	  valorR["errorNo"]=2;
	  return valorR;
	
	//alert("The address must end in a well-known domain or two letter " + "country.");
	//return false;
	
	}
	
	// Make sure there's a host name preceding the domain.
	
	if (len<2) {
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=false;
	  valorR["errorNo"]=2;
	  return valorR;
	  
	//alert("This address is missing a hostname!");
	//return false;
	
	}
	
	// If we've gotten this far, everything's valid!
	
	// 20040114
	// jmmartif@hotmail.com
	// www.tribunetworks.com
	// Modificacion para indicar el error y tipo del mismo
	  valorR=new Array();
	  valorR["validacion"]=true;
	  return valorR;
	  
	//return true;
	
	}
	
	//  End -->
	
	
	
/**-------------------------------------------------------------------------------------------------
* FUNCIONES VALIDACION DE UNA FECHA
-------------------------------------------------------------------------------------------------*/

   function dateValid(objName) {
      var strDate;
      var strDateArray;
      var strDay;
      var strMonth;
      var strYear;
      var intday;
      var intMonth;
      var intYear;
      var booFound = false;
      var datefield = objName;
      var strSeparatorArray = new Array("-"," ","/",".");
      var intElementNr;
      // var err = 0;
      var strMonthArray = new Array(12);
      strMonthArray[0] = "Jan";
      strMonthArray[1] = "Feb";
      strMonthArray[2] = "Mar";
      strMonthArray[3] = "Apr";
      strMonthArray[4] = "May";
      strMonthArray[5] = "Jun";
      strMonthArray[6] = "Jul";
      strMonthArray[7] = "Aug";
      strMonthArray[8] = "Sep";
      strMonthArray[9] = "Oct";
      strMonthArray[10] = "Nov";
      strMonthArray[11] = "Dec";
      
      //strDate = datefield.value;
      strDate = objName;
      
      if (strDate.length < 1) {
         return true;
      }
      for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
         if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) 
         {
            strDateArray = strDate.split(strSeparatorArray[intElementNr]);
            if (strDateArray.length != 3) 
            {
               err = 1;
               return false;
            }
            else 
            {
               strDay = strDateArray[0];
               strMonth = strDateArray[1];
               strYear = strDateArray[2];
            }
            booFound = true;
         }
      }
      if (booFound == false) {
         if (strDate.length>5) {
            strDay = strDate.substr(0, 2);
            strMonth = strDate.substr(2, 2);
            strYear = strDate.substr(4);
         }
      }
      //Adjustment for short years entered
      if (strYear.length == 2) {
         strYear = '20' + strYear;
      }
      strTemp = strDay;
      strDay = strMonth;
      strMonth = strTemp;
      intday = parseInt(strDay, 10);
      if (isNaN(intday)) {
         err = 2;
         return false;
      }
      
      intMonth = parseInt(strMonth, 10);
      if (isNaN(intMonth)) {
         for (i = 0;i<12;i++) {
            if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
               intMonth = i+1;
               strMonth = strMonthArray[i];
               i = 12;
            }
         }
         if (isNaN(intMonth)) {
            err = 3;
            return false;
         }
      }
      intYear = parseInt(strYear, 10);
      if (isNaN(intYear)) {
         err = 4;
         return false;
      }
      if (intMonth>12 || intMonth<1) {
         err = 5;
         return false;
      }
      if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
         err = 6;
         return false;
      }
      if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
         err = 7;
         return false;
      }
      if (intMonth == 2) {
         if (intday < 1) {
            err = 8;
            return false;
         }
         if (LeapYear(intYear) == true) {
            if (intday > 29) {
               err = 9;
               return false;
            }
         }
         else {
            if (intday > 28) {
               err = 10;
               return false;
            }
         }
      }
         return true;
      }

   function LeapYear(intYear) {
      if (intYear % 100 == 0) {
         if (intYear % 400 == 0) { return true; }
      }
      else {
         if ((intYear % 4) == 0) { return true; }
      }
         return false;
      }

////// FUNCIONES PARA VALIDAR QUE LA FECHA DE INCIO Y FINALIZCION DE LA PUB
////// HOLMES 17092004

     /// valida si una fecha de inicio es mayor que la fecha de terminacion
	  function validarFechas(fInicio,fFin){
	  
	   	if(!fFin)return "Correcto";
		// valores para fecha de inicio
		var fInicio_partes = fInicio.split(" ");
		var arrFechaInicio = fInicio_partes[0].split("/");
		var anioInicio = arrFechaInicio[2];
		var mesInicio = arrFechaInicio[1];
		var diaInicio = arrFechaInicio[0];

		// valores para hora de inicio
		var arrHoraMinInicio = fInicio_partes[1].split(":"); 
        var horaInicio = arrHoraMinInicio[0]; 
        var minInicio = arrHoraMinInicio[1]; 
        
		// am/pm
		var AmPmInicio = fInicio_partes[2];

		// valores para fecha de finalizacion
		var fFin_partes = fFin.split(" ");
		var arrFechaFin = fFin_partes[0].split("/");
		var anioFin = arrFechaFin[2];
		var mesFin = arrFechaFin[1];
		var diaFin = arrFechaFin[0];

		// valores para hora de inicio
		var arrHoraMinFin = fFin_partes[1].split(":"); 
        var horaFin = arrHoraMinFin[0]; 
        var minFin = arrHoraMinFin[1]; 

		// am/pm
		var AmPmFin = fFin_partes[2];
        
		/// casos para validacion de fechas
        //1. si el año es diferente (pueda que sea mayor o menor)
        var mensaje = "Correcto";

		if(parseInt(anioInicio,10) >  parseInt(anioFin,10)){
		
		   mensaje = "La fecha de finalización es incorrecta, revise la fecha indicada";
		   return mensaje;
		
		}// if
		
		if(parseInt(anioInicio,10) == parseInt(anioFin,10)){
		   

		   // revision de mes 
		   if(parseInt(mesInicio,10) > parseInt(mesFin,10)){
			   
			   
			   mensaje = "La fecha de finalización es incorrecta, revise la fecha indicada.2";
			   return mensaje;
		   
		   }// if

		   // revision de mes 
		   if(parseInt(mesInicio,10) == parseInt(mesFin,10)){
			   
			   
			   // revision del dia
			   if(parseInt(diaInicio,10) > parseInt(diaFin,10)){
			   
				   mensaje = "La fecha de finalización es incorrecta, revise la fecha indicada..";
				   return mensaje;
			   
			   }// if

			   if(parseInt(diaInicio,10)  == parseInt(diaFin,10)){
			       
				  // revision de la hora
				  var key_horaInicio =  horaInicio + " " + AmPmInicio; 
				  var key_horaFin =  horaFin + " " + AmPmFin; 
                  
				  if(parseInt(processHora(key_horaInicio),10) > parseInt(processHora(key_horaFin),10)){
				   
				    mensaje = "La fecha de finalización es incorrecta, revise la fecha indicada...";
				    return mensaje;
				  
				  }// if

				  if(parseInt(processHora(key_horaInicio),10) == parseInt(processHora(key_horaFin),10)){
				   
				     if(minInicio > minFin){
					 
				        mensaje = "La fecha de finalización es incorrecta, revise la fecha indicada....";
				        return mensaje;

					 }//if
					 else {
						 return mensaje;
					 }//else
				  
				  }//if
			   
			   }// if
			   
		   
		   }// if


		}

		
        return mensaje;


	  }//validaFechas 
	

	function processHora(hora){

	       var horas = new Array();

		   horas['01 AM'] = '01';
   	       horas['02 AM'] = '02';
		   horas['03 AM'] = '03';
		   horas['04 AM'] = '04';
		   horas['05 AM'] = '05';
		   horas['06 AM'] = '06';
		   horas['07 AM'] = '07';
		   horas['08 AM'] = '08';
		   horas['09 AM'] = '09';
		   horas['10 AM'] = '10';
		   horas['11 AM'] = '11';
		   horas['12 AM'] = '00';
		   horas['01 PM'] = '13';
		   horas['02 PM'] = '14';
           horas['03 PM'] = '15';
		   horas['04 PM'] = '16';
		   horas['05 PM'] = '17';
		   horas['06 PM'] = '18';
		   horas['07 PM'] = '19';
		   horas['08 PM'] = '20';
		   horas['09 PM'] = '21';
		   horas['10 PM'] = '22';
		   horas['11 PM'] = '23';
		   horas['12 PM'] = '12';
		   horas['00 AM'] = '00';
		   horas['00 PM'] = '00';

		   return horas[hora];
	   }// function


////// HOLMES 17092004


/**-------------------------------------------------------------------------------------------------
* FUNCIONES PARA MD5
-------------------------------------------------------------------------------------------------*/
/*****************************************************************************
 * md5.js
 *
 * A JavaScript implementation derived from the RSA Data Security, Inc. MD5
 * Message-Digest Algorithm. See http://cw.oaktree.co.uk/site/legal.html for
 * details.
 *
 * Copyright (C) Paul Johnston 1999 - 2000. Distributed under the LGPL.
 *****************************************************************************/

/* to convert strings to a list of ascii values */
var sAscii = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var sAscii = sAscii + "[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

/* convert integer to hex string */
var sHex = "0123456789ABCDEF";
function hex(i)
{
  h = "";
  for(j = 0; j <= 3; j++)
  {
    h += sHex.charAt((i >> (j * 8 + 4)) & 0x0F) +
         sHex.charAt((i >> (j * 8)) & 0x0F);
  }
  return h;
}

/* add, handling overflows correctly */
function add(x, y)
{
  return ((x&0x7FFFFFFF) + (y&0x7FFFFFFF)) ^ (x&0x80000000) ^ (y&0x80000000);
}

/* MD5 rounds functions */
function R1(A, B, C, D, X, S, T)
{
  q = add(add(A, (B & C) | ((~B) & D)), add(X, T));
  return add((q << S) | (q >>> (32 - S)), B);
}

function R2(A, B, C, D, X, S, T)
{
  q = add(add(A, (B & D) | (C & (~D))), add(X, T));
  return add((q << S) | (q >>> (32 - S)), B);
}

function R3(A, B, C, D, X, S, T)
{
  q = add(add(A, B ^ C ^ D), add(X, T));
  return add((q << S) | (q >>> (32 - S)), B);
}

function R4(A, B, C, D, X, S, T)
{
  q = add(add(A, C ^ (B | (~D))), add(X, T));
  return add((q << S) | (q >>> (32 - S)), B);
}

/* main entry point */
function calcMD5(sInp) {

  /* Calculate length in machine words, including padding */
  wLen = (((sInp.length + 8) >> 6) + 1) << 4;
  var X = new Array(wLen);

  /* Convert string to array of words */
  j = 4;
  for (i = 0; (i * 4) < sInp.length; i++)
  {
    X[i] = 0;
    for (j = 0; (j < 4) && ((j + i * 4) < sInp.length); j++)
    {
      X[i] += (sAscii.indexOf(sInp.charAt((i * 4) + j)) + 32) << (j * 8);
    }
  }

  /* Append padding bits and length */
  if (j == 4)
  {
    X[i++] = 0x80;
  }
  else
  {
    X[i - 1] += 0x80 << (j * 8);
  }
  for(; i < wLen; i++) { X[i] = 0; }
  X[wLen - 2] = sInp.length * 8;

  /* hard coded initial values */
  a = 0x67452301;
  b = 0xefcdab89;
  c = 0x98badcfe;
  d = 0x10325476;

  /* Process each 16 word block in turn */
  for (i = 0; i < wLen; i += 16) {
    aO = a;
    bO = b;
    cO = c;
    dO = d;

    a = R1(a, b, c, d, X[i+ 0], 7 , 0xd76aa478);
    d = R1(d, a, b, c, X[i+ 1], 12, 0xe8c7b756);
    c = R1(c, d, a, b, X[i+ 2], 17, 0x242070db);
    b = R1(b, c, d, a, X[i+ 3], 22, 0xc1bdceee);
    a = R1(a, b, c, d, X[i+ 4], 7 , 0xf57c0faf);
    d = R1(d, a, b, c, X[i+ 5], 12, 0x4787c62a);
    c = R1(c, d, a, b, X[i+ 6], 17, 0xa8304613);
    b = R1(b, c, d, a, X[i+ 7], 22, 0xfd469501);
    a = R1(a, b, c, d, X[i+ 8], 7 , 0x698098d8);
    d = R1(d, a, b, c, X[i+ 9], 12, 0x8b44f7af);
    c = R1(c, d, a, b, X[i+10], 17, 0xffff5bb1);
    b = R1(b, c, d, a, X[i+11], 22, 0x895cd7be);
    a = R1(a, b, c, d, X[i+12], 7 , 0x6b901122);
    d = R1(d, a, b, c, X[i+13], 12, 0xfd987193);
    c = R1(c, d, a, b, X[i+14], 17, 0xa679438e);
    b = R1(b, c, d, a, X[i+15], 22, 0x49b40821);

    a = R2(a, b, c, d, X[i+ 1], 5 , 0xf61e2562);
    d = R2(d, a, b, c, X[i+ 6], 9 , 0xc040b340);
    c = R2(c, d, a, b, X[i+11], 14, 0x265e5a51);
    b = R2(b, c, d, a, X[i+ 0], 20, 0xe9b6c7aa);
    a = R2(a, b, c, d, X[i+ 5], 5 , 0xd62f105d);
    d = R2(d, a, b, c, X[i+10], 9 ,  0x2441453);
    c = R2(c, d, a, b, X[i+15], 14, 0xd8a1e681);
    b = R2(b, c, d, a, X[i+ 4], 20, 0xe7d3fbc8);
    a = R2(a, b, c, d, X[i+ 9], 5 , 0x21e1cde6);
    d = R2(d, a, b, c, X[i+14], 9 , 0xc33707d6);
    c = R2(c, d, a, b, X[i+ 3], 14, 0xf4d50d87);
    b = R2(b, c, d, a, X[i+ 8], 20, 0x455a14ed);
    a = R2(a, b, c, d, X[i+13], 5 , 0xa9e3e905);
    d = R2(d, a, b, c, X[i+ 2], 9 , 0xfcefa3f8);
    c = R2(c, d, a, b, X[i+ 7], 14, 0x676f02d9);
    b = R2(b, c, d, a, X[i+12], 20, 0x8d2a4c8a);

    a = R3(a, b, c, d, X[i+ 5], 4 , 0xfffa3942);
    d = R3(d, a, b, c, X[i+ 8], 11, 0x8771f681);
    c = R3(c, d, a, b, X[i+11], 16, 0x6d9d6122);
    b = R3(b, c, d, a, X[i+14], 23, 0xfde5380c);
    a = R3(a, b, c, d, X[i+ 1], 4 , 0xa4beea44);
    d = R3(d, a, b, c, X[i+ 4], 11, 0x4bdecfa9);
    c = R3(c, d, a, b, X[i+ 7], 16, 0xf6bb4b60);
    b = R3(b, c, d, a, X[i+10], 23, 0xbebfbc70);
    a = R3(a, b, c, d, X[i+13], 4 , 0x289b7ec6);
    d = R3(d, a, b, c, X[i+ 0], 11, 0xeaa127fa);
    c = R3(c, d, a, b, X[i+ 3], 16, 0xd4ef3085);
    b = R3(b, c, d, a, X[i+ 6], 23,  0x4881d05);
    a = R3(a, b, c, d, X[i+ 9], 4 , 0xd9d4d039);
    d = R3(d, a, b, c, X[i+12], 11, 0xe6db99e5);
    c = R3(c, d, a, b, X[i+15], 16, 0x1fa27cf8);
    b = R3(b, c, d, a, X[i+ 2], 23, 0xc4ac5665);

    a = R4(a, b, c, d, X[i+ 0], 6 , 0xf4292244);
    d = R4(d, a, b, c, X[i+ 7], 10, 0x432aff97);
    c = R4(c, d, a, b, X[i+14], 15, 0xab9423a7);
    b = R4(b, c, d, a, X[i+ 5], 21, 0xfc93a039);
    a = R4(a, b, c, d, X[i+12], 6 , 0x655b59c3);
    d = R4(d, a, b, c, X[i+ 3], 10, 0x8f0ccc92);
    c = R4(c, d, a, b, X[i+10], 15, 0xffeff47d);
    b = R4(b, c, d, a, X[i+ 1], 21, 0x85845dd1);
    a = R4(a, b, c, d, X[i+ 8], 6 , 0x6fa87e4f);
    d = R4(d, a, b, c, X[i+15], 10, 0xfe2ce6e0);
    c = R4(c, d, a, b, X[i+ 6], 15, 0xa3014314);
    b = R4(b, c, d, a, X[i+13], 21, 0x4e0811a1);
    a = R4(a, b, c, d, X[i+ 4], 6 , 0xf7537e82);
    d = R4(d, a, b, c, X[i+11], 10, 0xbd3af235);
    c = R4(c, d, a, b, X[i+ 2], 15, 0x2ad7d2bb);
    b = R4(b, c, d, a, X[i+ 9], 21, 0xeb86d391);

    a = add(a, aO);
    b = add(b, bO);
    c = add(c, cO);
    d = add(d, dO);
  }
  return hex(a) + hex(b) + hex(c) + hex(d);
}
	function mostrarDivTab1(divName,id){
		var num=0;
		var divVisible=0;
		var t1=0;
		for(var t=1;t1<=0;t++){
			if(document.getElementById(String(divName)+'-'+String(t))){
				if(document.getElementById(String(divName)+'-'+String(t)).style.display=='')
					document.getElementById(String(divName)+'-'+String(t)).style.display='none';
			}
			else
				t1=1;
		}
		if(document.getElementById(String(divName)+'-Hidden')){
			if(document.getElementById(String(divName)+'-'+String(id))) document.getElementById(String(divName)+'-Hidden').innerHTML=document.getElementById(String(divName)+'-'+String(id)).innerHTML;
		}

	}

	
	function cambiarEstiloLi(className,clase,index){
		var cells = document.getElementsByTagName("li"); 
		for (var i = 0; i < cells.length; i++) { 
			if ( cells[i].getAttribute("title") == index) { 
				cells[i].setAttribute("id","");
				// grab the data 
			}
		}
		//className.getAttribute("id");
		className.setAttribute("id",clase+'Sel');

	} // cambiarEstiloTr
	

// 20081226 funcion para poder ejecutar varios window.onload de diferentes modulos o niceMenu
function windowOnload(function1, function2) {
	return function() {
			if (function1) function1();
			if (function2) function2();
		}
} // windowOnload


/*
* Muestra el contenido de una ciudad
*
* @author James Romero <jromero@nexura.com> 20090223
*/
function dspDivCiudadCoomeva(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCali',
		'contenidoMedellin',
		'contenidoBogota',
		'contenidoCafetero',
		'contenidoCaribe',
		'contenidoPalmira',
		'contenidoOtras'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCali',
		'itemMedellin',
		'itemBogota',
		'itemCafetero',
		'itemCaribe',
		'itemPalmira',
		'itemOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivCiudadCoomeva




/*
* Muestra el contenido de una ciudad
*
* @author Hernando Bocanegra <hbocanegra@nexura.com> 20090702
*/
function dspDivCalTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalTaps1',
		'contenidoCalTaps2',
		'contenidoCalTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalCaribe',
		'itemCalPalmira',
		'itemCalOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCalTaps




/*
* Muestra el contenido de una ciudad
*
* @author Hernando Bocanegra <hbocanegra@nexura.com> 20090702
*/
function dspDivMedTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoMedTaps1',
		'contenidoMedTaps2',
		'contenidoMedTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemMedCaribe',
		'itemMedPalmira',
		'itemMedOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivTapsCoomeva




/*
* Muestra el contenido de una ciudad
*
* @author Hernando Bocanegra <hbocanegra@nexura.com> 20090702
*/
function dspDivBogTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoBogTaps1',
		'contenidoBogTaps2',
		'contenidoBogTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemBogCaribe',
		'itemBogPalmira',
		'itemBogOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivBogTaps



/*
* Muestra el contenido de una ciudad
*
* @author Hernando Bocanegra <hbocanegra@nexura.com> 20090702
*/
function dspDivCarTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCarTaps1',
		'contenidoCarTaps2',
		'contenidoCarTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCarCaribe',
		'itemCarPalmira',
		'itemCarOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCarTaps



/*
* Muestra el contenido de una ciudad
*
* @author Hernando Bocanegra <hbocanegra@nexura.com> 20090702
*/
function dspDivCafTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCafTaps1',
		'contenidoCafTaps2',
		'contenidoCafTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCafCaribe',
		'itemCafPalmira',
		'itemCafOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCafTaps



/*
* Muestra el contenido de una ciudad
*
* @author Hernando Bocanegra <hbocanegra@nexura.com> 20090702
*/
function dspDivPalTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoPalTaps1',
		'contenidoPalTaps2',
		'contenidoPalTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemPalCaribe',
		'itemPalPalmira',
		'itemPalOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivPalTaps





/*
* Muestra el contenido de una ciudad
*
* @author Hernando Bocanegra <hbocanegra@nexura.com> 20090702
*/
/*function dspDivSalTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalTaps1',
		'contenidoSalTaps2',
		'contenidoSalTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCaribe',
		'itemSalPalmira',
		'itemSalOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivSalTaps*/

/**************************** Funciones Para Salud ********************************************************/


function dspDivSalTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalTaps1',
		'contenidoSalTaps2',
		'contenidoSalTaps3'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCaribe',
		'itemSalPalmira',
		'itemSalOtras'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivSalTaps


function dspDivSalCuiTapsdn(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalCuiTapsdn1',
		'contenidoSalCuiTapsdn2'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCuiSdn1',
		'itemSalCuiSdn2'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivSalTaps



function dspDivSalCuiTapsN(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalCuiTapsN1',
		'contenidoSalCuiTapsN2'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCuiN1',
		'itemSalCuiN2'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivSalCuiTapsN




function dspDivSalCuiTapsC(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalCuiTapsC1',
		'contenidoSalCuiTapsC2'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCuiC1',
		'itemSalCuiC2'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivSalCuiTapsC



function dspDivSalCuiTapsCen(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalCuiTapsCen1',
		'contenidoSalCuiTapsCen2'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCuiCen1',
		'itemSalCuiCen2'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivSalCuiTapsC



function dspDivSalCuiTapsCar(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalCuiTapsCar1',
		'contenidoSalCuiTapsCar2'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCuiCar1',
		'itemSalCuiCar2'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivSalCuiTapsC




function dspDivSalCuiTapsEje(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoSalCuiTapsEje1',
		'contenidoSalCuiTapsEje2'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemSalCuiEje1',
		'itemSalCuiEje2'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivSalCuiTapsEje



function dspDivCalTapsNYC(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalTapsNYC1',
		'contenidoCalTapsNYC2',
		'contenidoCalTapsNYC3',
		'contenidoCalTapsNYC4',
		'contenidoCalTapsNYC5'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalCred',
		'itemCalCap',
		'itemCalBanem',
		'itemCalBanelec',
		'itemCalNew'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		//var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			//tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			
		} // if
		
	} // if
	
} // dspDivCalTapsNYC



function dspDivUtiNet(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoUtiTaps1',
		'contenidoUtiTaps2',
		'contenidoUtiTaps3',
		'contenidoUtiTaps4'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemUtiNg',
		'itemUtiCns',
		'itemUtiU',
		'itemUtiIo'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivUtiNet




function dspDivCalSubTaps(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalSubTaps4',
		'contenidoCalSubTaps5'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalPt',
		'itemCalPa'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCalSubTaps



function dspDivCalSubTapsUno(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalSubTaps6',
		'contenidoCalSubTaps7'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalPtUno',
		'itemCalPaUno'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCalSubTaps



function dspDivCalSubTapsDos(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalSubTaps8',
		'contenidoCalSubTaps9'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalPtDos',
		'itemCalPaDos'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCalSubTaps



function dspDivCalSubTapsTres(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalSubTaps10',
		'contenidoCalSubTaps11'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalPtTres',
		'itemCalPaTres'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCalSubTaps



function dspDivCalSubTapsCuatro(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalSubTaps12',
		'contenidoCalSubTaps13'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalPtCuatro',
		'itemCalPaCuatro'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCalSubTaps




function dspDivCalSubTapsCinco(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoCalSubTaps14',
		'contenidoCalSubTaps15'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemCalPtCinco',
		'itemCalPaCinco'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivCalSubTaps



function dspDivTurismoNet(
	idContenedorCoomeva,
	idDivCiudadCoomeva
){
	
	var lstCiudadesCoomeva=new Array(
		'contenidoTurTab1',
		'contenidoTurTab2',
		'contenidoTurTab3',
		'contenidoTurTab4'
	);
	
	var lstTabsCiudadesCoomeva=new Array(
		'itemNg',
		'itemCns',
		'itemTv',
		'itemTve'
	);
	
	var divContenedorCoomevaObj=getElement(idContenedorCoomeva);
	
	if(divContenedorCoomevaObj != null){
		var ciudadCoomevaObj=null;
		var tabCiudadCoomevaObj=null;
		var posCiudad=0;
		for(var i=0; i<lstCiudadesCoomeva.length; i++){
			
			ciudadCoomevaObj=getElement(lstCiudadesCoomeva[i]);
			
			if(ciudadCoomevaObj && ciudadCoomevaObj.getAttribute("id")!=divCiudadCoomevaObj){
				if(is_ie()) ciudadCoomevaObj.setAttribute("className","divsOcultar");
				else ciudadCoomevaObj.setAttribute("class","divsOcultar");
				
				tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[i]);
				if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(i+1));
				else tabCiudadCoomevaObj.setAttribute("class","taps"+(i+1));
				
			} // if
			
			if(lstCiudadesCoomeva[i]==idDivCiudadCoomeva){
				posCiudad=i;
			}
		} // for
		
		
		var divCiudadCoomevaObj=getElement(idDivCiudadCoomeva);
		if(divCiudadCoomevaObj){
			
			if(is_ie()) divCiudadCoomevaObj.setAttribute("className","divsMostrar");
			else divCiudadCoomevaObj.setAttribute("class","divsMostrar");
			
			tabCiudadCoomevaObj=getElement(lstTabsCiudadesCoomeva[posCiudad]);
			if(is_ie()) tabCiudadCoomevaObj.setAttribute("className","taps"+(posCiudad+1)+"Sel");
			else tabCiudadCoomevaObj.setAttribute("class","taps"+(posCiudad+1)+"Sel");
		} // if
		
	} // if
	
} // dspDivTurismoNet




function crearDivPublicidad(divPadre){
	
	var divMostrar=0;
	var divPadreObj=getElement(divPadre);
	
	if(divPadreObj){
		
		var string1='';
		var string2='';
		var control=1;
		var firstChildNode='';
		
		firstChildNode=divPadreObj.firstChild;
		
		if(firstChildNode != null){
		
			var node1=firstChildNode;
			
			for (i=0; i<1;){
				string2='';
				if(node1 != null){
					if (node1.nodeName == "DIV"){
						node1.setAttribute("id",divPadre+control);
						node1.style.display='none';
						if(divMostrar == 0){
							if(control == 1) node1.style.display='';
							if(node1.getAttribute("title")) string2=node1.getAttribute("title");
							else string2='Mostrar Panel '+control;
							string1+='<li alt="'+divPadre+control+'" id="'+divPadre+control+'" onClick="pararDIVCont(\''+divPadre+'\');mostrarDIVCont(\''+divPadre+'\','+control+');cambiarEstiloLi(this,\'dspDivPubCont\',\''+divPadre+'\'); return false;"  title="'+divPadre+'"><a href="#" title="'+string2+'">'+control+'<a><\/li>';
						} // if
						else if(divMostrar == control){
							node1.style.display='';
							
							//alert('Nodo:'+divMostrar+'-'+control);
						} // else if
						control++;
					} // if
					node1=node1.nextSibling;
				} // if
				else i=1;
			} // for
			
			if(divMostrar == 0){
				var spanCreate=document.createElement("span");
				spanCreate.setAttribute("title","0");
				spanCreate.setAttribute("alt",String(control-1)+"-1");
				spanCreate.setAttribute("id", divPadre+"Span");
				if(is_ie()) spanCreate.setAttribute("className", "dspDivPubContSpan");
				else spanCreate.setAttribute("class", "dspDivPubContSpan");
				string1+='<li onClick="cambiarEstiloLi(this,\'dspDivPubCont\',\''+divPadre+'\');return false;"  title="'+divPadre+'" class="dspDivPubContLi"><a href="#" title="Detener presentaci&oacute;n" onClick="pararDIVCont(\''+divPadre+'\')"><img src="librerias/media/img/pause.gif" border="0" alt="Detener presentaci&oacute;n" /><\/a><\/li><li onClick="cambiarEstiloLi(this,\'dspDivPubCont\',\''+divPadre+'\');return false;"  title="'+divPadre+'" class="dspDivPubContLi"><a href="#" title="Reanudar presentaci&oacute;n" onClick="reanudarDIVCont(\''+divPadre+'\')"><img src="librerias/media/img/play.gif" border="0" alt="Reanudar presentaci&oacute;n" /><\/a><\/li>';

				spanCreate.innerHTML='<ul class="dspDivPubCont" id="'+divPadre+'">'+string1+'<\/ul>';
				divPadreObj.insertBefore(spanCreate,firstChildNode);
				
				var liSel=buscarAlt(String(divPadre+'1'));
				if(liSel) cambiarEstiloLi(liSel,'dspDivPubCont',String(divPadre));
			
			} // if
		} // if
		
		setInterval("verificaDIVCont('"+divPadre+"')", 7000);
		
	} // if
	
} // crearDivPublicidad

function verificaDIVCont(divPadre){
	
	var divPadreObj=getElement(divPadre+'Span');
	
	if(divPadreObj){
		
		if(divPadreObj.getAttribute('title') && divPadreObj.getAttribute('alt')){
			
			var infoPaneles = divPadreObj.getAttribute('alt');
			var controlPaneles = parseInt(divPadreObj.getAttribute('title'));
			
			if(controlPaneles == 0){
				
				var strIndex=infoPaneles.indexOf('-');
				var numPaneles=parseInt(infoPaneles.substring(0,strIndex));
				var actual=parseInt(infoPaneles.substring(strIndex+1,infoPaneles.length));
				
				actual++;
				if(actual>numPaneles) actual=1;
				divPadreObj.setAttribute('alt',String(numPaneles)+'-'+String(actual));
				//crearDivPublicidad(divPadre,actual);
				var liSel=buscarAlt(String(divPadre+String(actual)));
				if(liSel) cambiarEstiloLi(liSel,'dspDivPubCont',String(divPadre));
				
				mostrarDIVCont(divPadre,actual);
				
			} // if
			
		} // if
		
	} // if
	
	
} // verificaDIVCont

function mostrarDIVCont(divPadre,actual){
	
	var j=1;
	
	for(i=0;i<1;j++){
		liSel=getElement(divPadre+j);
		if(liSel) liSel.style.display='none';
		else i=1;
	} // if
	
	liSel=getElement(divPadre+actual);
	liSel.style.display='';
	
} // mostrarDIVCont

function buscarAlt(index){
	
	var cells = document.getElementsByTagName("li");
	var encontrado=false;
	
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].getAttribute("alt") && cells[i].getAttribute("alt") == index) { 
			encontrado=cells[i];
			i=cells.length+1;
		}
	}
	
	return encontrado;
	
} // cambiarEstiloTr

function pararDIVCont(divPadre){
	
	var divPadreObj=getElement(divPadre+'Span');
	if(divPadreObj) divPadreObj.setAttribute('title','1');

} // pararDIVCont

function reanudarDIVCont(divPadre){
	
	var divPadreObj=getElement(divPadre+'Span');
	if(divPadreObj) divPadreObj.setAttribute('title','0');

} // pararDIVCont

/**
* Verifica si el navegador que utiliza es IE
* jmartinez@nexura.com
* 20070419
*/
function is_ie(){
	if(navigator.appName.match(/microsoft/ig)) return true;
	else return false;
} // is_ie

/**
* Fija un valor de la propiedad css opacity para un objeto
* 
* @param object Objeto a ser modificado
* @param integer valor del opacity de 0 a 100
*  
* @author James Mauricio Martinez <jmartinez@nexura.com> 20080724
*/
function setOpacity(obj, valor){
	if(valor<0) valor=0;
	obj.style.opacity=valor;
	obj.style.MozOpacity=valor;
	obj.style.filter='alpha(opacity=' + (valor*100) + ')';
} // setOpacity

