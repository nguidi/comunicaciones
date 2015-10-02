var generadoraDeCajonesPWM = function(periodoDeMuestreo,numeroDeMuestras,amplitud,periodo,ancho) {
	var data
	=	[]
	,	t
	=	0
	,	z
	=	0;

	for (var i=0; i < numeroDeMuestras; i++) {
		
		data.push(
			{
				amplitud:	(z < ancho) ? amplitud : 0 	
			,	tiempo:		t
			}
		)

		if (z == periodo)
			z=0;
		else
			z++;

		t = t + periodoDeMuestreo;

	}

	return	data
}

function muestrearPWM (periodoDeMuestreo, numeroDeMuestras, senial, cajonera) {

	var moduladora = generadoraDeCajonesPWM(periodoDeMuestreo,numeroDeMuestras,cajonera.amplitud,cajonera.periodo,cajonera.ancho);

	var mensaje = math.eval(senial.mensaje)

	var pam = [];

	for (var indice in moduladora) {

		if (moduladora[indice].amplitud != 0)
			pam.push(
				{
					amplitud:	mensaje(moduladora[indice].tiempo,senial.amplitud,senial.frecuencia)
				,	tiempo:		moduladora[indice].tiempo
				}
			)
		else
			pam.push(moduladora[indice])
	
	}

	graficar('Modulación en Amplitud {PAM}','#graficoSenialPAM',pam)
}