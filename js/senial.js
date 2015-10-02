function muestrearSenial (frecuenciaDeMuestreo, numeroDeMuestras, senial) {

	var muestreo
	=	[]
	,	t
	=	0
	,	mensaje
	=	math.eval(senial.mensaje)

	for (var i=0; i < numeroDeMuestras; i++) {
		
		muestreo.push(
			{
				amplitud:	mensaje(t,senial.amplitud,senial.frecuencia)	
			,	tiempo:		t
			}
		)

		t = t + frecuenciaDeMuestreo;

	}
	
	graficar('Señal Mensaje {m(t)}','#graficoSenialMensaje',muestreo)
}