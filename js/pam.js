var generadoraDeCajonesPAM = function(periodoDeMuestreo,numeroDeMuestras,pulso) {
	
	var data
	=	[]
	,	t
	=	0
	,	z
	=	0;

	for (var i=0; i < numeroDeMuestras; i++) {
		
		data.push(
			{
				amplitud:	(z < pulso.ancho) ? pulso.amplitud : 0 	
			,	tiempo:		t
			}
		)

		if (z >= pulso.periodo)
			z=0;
		else
			z = z + periodoDeMuestreo;

		t = t + periodoDeMuestreo;

	}

	return	data
}

function muestrearPAM (periodoDeMuestreo, numeroDeMuestras, senial, pulso) {

	var moduladora = generadoraDeCajonesPAM(periodoDeMuestreo,numeroDeMuestras,pulso);

	var mensaje = math.eval(senial.mensaje)

	var pam = [];

	var amplitudPAM = 0;

	for (var indice in moduladora) {

		if (moduladora[indice].amplitud >= 0 && amplitudPAM == 0)	
			amplitudPAM = mensaje(moduladora[indice].tiempo,senial.amplitud,senial.frecuencia);
		
		if	(moduladora[indice].amplitud == 0)
			amplitudPAM = 0;

		pam.push(
			{
				amplitud:	amplitudPAM
			,	tiempo:		moduladora[indice].tiempo
			}
		)
	
	}

	graficar('Modulación en Amplitud {PAM}','#graficoSenialPAM',pam)
}