$(function () {

	$('button').on('click', function(){

		$('.graf svg').remove();


		var tiempoTotal
		=	parseFloat($('#tiempoDeMuestra').val())
		,	numeroDeMuestras
		=	20000
		,	periodoDeMuestreo
		=	tiempoTotal/numeroDeMuestras
		,	senialMensaje
		=	{
				mensaje:	'm(t,A,f)='+$('#senialMensaje').val()
			,	amplitud:	parseFloat($('#amplitudSenial').val())
			,	frecuencia:	parseFloat($('#frecuenciaSenial').val())
			}
		,	pulsoModulador
		=	{
				amplitud:		parseFloat($('#amplitudModuladora').val())
			,	numeroPeriodos:	parseInt($('#numeroDePeriodos').val())
			,	periodo:		parseFloat($('#periodoModuladora').val())
			,	ancho:			parseFloat($('#anchoModuladora').val())
			}

		muestrearSenial(
			periodoDeMuestreo
		,	numeroDeMuestras
		,	senialMensaje
		)
		
		muestrearPAM(
			periodoDeMuestreo
		,	numeroDeMuestras
		,	senialMensaje
		,	pulsoModulador
		);
		
	});

	$('button').click()

})