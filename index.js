var app = angular.module("app", ['ui.rCalendar']);

app.constant("env",{
    "APIREST": "http://localhost:3000",
    "DOMINIO": "http://localhost",
    "RUTAIMAGENPERFIL" : "images/Integrantes/"
});

app.directive("onRepeatEnd", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.onRepeatEnd);
            }
        }
    };
});

app.controller('layoutController', function($scope, $http, env, $location, $sce){

    var token = "";
    var url = "";

    if ($location.search().AceptaSuscripcion) {
        token = $location.search().AceptaSuscripcion;
        url = env.APIREST + '/usuarios/suscripcion/';
    }else if ($location.search().AnulaSuscripcion) {
        token = $location.search().AnulaSuscripcion;
        url = env.APIREST + '/usuarios/cancelasuscripcion/';
    }

    console.log(token);

    if (token) {

        $scope.suscripcion = true;

        $http.post(url,{"codigo":token})
        .then(function(response) {

            noty({
                text        : response.data.mensaje,
                type        : 'alert',
                timeout     :  10000,
                layout      : 'top',
                theme       : 'relax'
            });

            $scope.mensajeSuscripcion =  $sce.trustAsHtml(
            '<div class="infoPanel animated fadeInLeft">' +
            '<a href="https://github.com/pgramadores"><i class="fa fa-github" aria-hidden="true"></i>&nbsp;&nbsp;Github</a><br>' +
            '<a href="https://facebook.com/pgramadores"><i class="fa fa-facebook-official" aria-hidden="true"></i>&nbsp;&nbsp;Facebook</a><br>' +
            '<a href="https://plus.google.com/+ProgramadoresBlogspotpgramadores"><i class="fa fa-google-plus" aria-hidden="true"></i>&nbsp;Google +</a><br>' +
            '<a href="https://twitter.com/pgramadores"><i class="fa fa-twitter" aria-hidden="true"></i>&nbsp;&nbsp;Twitter</a><br>' +
            '<a href="https://www.youtube.com/user/pgramadores"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp;&nbsp;Youtube</a><br>' +
            '<a href="https://www.meetup.com/pgramadores/"><i class="fa fa-meetup" aria-hidden="true"></i>&nbsp;&nbsp;Meetup</a><br>'+
            '</div>');

        },function(error) {
            $scope.mensajeSuscripcion = $sce.trustAsHtml("<span style='color:#fff;'>Error:"+response.data.mensaje+"</span>");
        });

    }

    var _miembros = [
        {
            nombre  : "Juan Mora",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Juan.jpg",
            redes   : {
                sociales:[
                    {
                        nombre : "github",
                        url    : "https://github.com/raicerk",
                        icono  : "fa-github"
                    },
                    {
                        nombre : "facebook",
                        url    : "https://facebook.com/raicerk",
                        icono  : "fa-facebook"
                    },
                    {
                        nombre : "linkedin",
                        url    : "https://cl.linkedin.com/in/juanvalentinmoraruiz",
                        icono  : "fa-linkedin"
                    },
                    {
                        nombre : "twitter",
                        url    : "https://twitter.com/raicerk",
                        icono  : "fa-twitter"
                    }
                ]
            }
        },
        {
            nombre  : "Agustín González",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Agustin.jpg",
            redes   : {
                sociales:[
                    {
                        nombre : "linkedin",
                        url    : "https://cl.linkedin.com/in/agustín-gonzález-murúa-b6180798",
                        icono  : "fa-linkedin"
                    },
                    {
                        nombre : "github",
                        url    : "https://github.com/JuicyFandango",
                        icono  : "fa-github"
                    }
                ]
            }
        },
        {
            nombre  : "Diego Riquelme",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Diego.jpg"
        },
        {
            nombre  : "Andrés Rodríguez",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Andres.jpg",
            redes   : {
                sociales:[
                    {
                        nombre : "facebook",
                        url    : "https://facebook.com/andresmanuel.rodriguezdiaz",
                        icono  : "fa-facebook"
                    },
                    {
                        nombre : "linkedin",
                        url    : "http://www.linkedin.com/in/andres-rodriguez-diaz-2229b9100",
                        icono  : "fa-linkedin"
                    }
                ]
            }
        },
        {
            nombre  : "Alexis González",
            origen  : "Corrientes, Argentina",
            imagen  : env.RUTAIMAGENPERFIL+"Alexis.jpg"
        },
        {
            nombre  : "Claudia Olivares",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Claudia.jpg",
            redes   : {
                sociales:[
                    {
                        nombre : "facebook",
                        url    : "https://m.facebook.com/la.kau",
                        icono  : "fa-facebook"
                    },
                    {
                        nombre : "linkedin",
                        url    : "https://cl.linkedin.com/in/claudia-olivares-aravena-987967137",
                        icono  : "fa-linkedin"
                    }
                ]
            }
        },
        {
            nombre  : "Giannina Giannecchini",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Giannina.jpg",
            redes   : {
                sociales:[
                    {
                        nombre : "linkedin",
                        url    : "https://www.linkedin.com/in/giannina-gianini-6962476b/",
                        icono  : "fa-linkedin"
                    }
                ]
            }
        },{
            nombre  : "Bernardo Machuca",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Bernardo.jpg",
            redes   : {
                sociales: [
                    {
                        nombre : "facebook",
                        url    : "https://www.facebook.com/masterlechuga",
                        icono  : "fa-facebook"
                    }
                ]
            }
        }
    ]
    //Shuffle de miembros
    for (i = _miembros.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = _miembros[i - 1];
        _miembros[i - 1] = _miembros[j];
        _miembros[j] = x;
    }

    $scope.finishRepeatMiembros =  function() {
        $('.flexslider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav: true,
            animationLoop: false,
            itemWidth: 210,
            itemMargin: 30,
            minItems: 2,
            maxItems: 5,
            move: 1
        });
    }

    $scope.Miembros = _miembros;

    $scope.Registrar = function(){

        var RemoverAnimaciones = function(obj){
            $(obj).find('*').removeClass('fadeOutLeft');
            $(obj).find('*').removeClass('fadeInRight');
            $(obj).find('*').removeClass('bounceIn');
        }

        var AnimacionSalida = function(obj){
            RemoverAnimaciones(obj);
            $(obj).find('i:first').replaceWith('<i name="icon" class="fa fa-spinner fa-pulse" aria-hidden="true"></i>').toggle(true);
            $(obj).find('input, h3').addClass('animated fadeOutLeft');
            $(obj).find('button').prop('disabled', true);
            $(obj).find('span').toggle(false);
        }

        var AnimacionError = function(mensaje, obj){
            RemoverAnimaciones(obj);
            $(obj).find('i:first').replaceWith('<i class="fa fa-times" aria-hidden="true"></i>');
            $(obj).find('button span').html(mensaje).toggle(true);
            $(obj).find('input, h3').addClass('animated fadeInRight');
            $(obj).find('button').addClass('animated bounceIn');

            setTimeout(function(){
                $(obj).find('button').prop('disabled', false).addClass('animated bounceIn');
                $(form).find('span').html("Aprender&nbsp");
                $(form).find('i:first').replaceWith('<i></i>');
            }, 2000 );
        }

        var form = $('.reg-form');
        //regex validador de mail
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test($scope.registro.correo)){
            AnimacionSalida(form);
            $http.post(env.APIREST + '/usuarios/registro', $scope.registro)
            .then(function(response){
                console.log(response);
                $(form).find('button').addClass('animated fadeOutRight');
                setTimeout(function () {
                    RemoverAnimaciones(form);
                    $(form).html('<h3 class="animated fadeInLeft">Síguenos en nuestras redes sociales</h3>' +
                    '<div class="infoPanel animated fadeInLeft">' +
                    '<a href="https://github.com/pgramadores"><i class="fa fa-github" aria-hidden="true"></i>&nbsp;&nbsp;Github</a><br>' +
                    '<a href="https://facebook.com/pgramadores"><i class="fa fa-facebook-official" aria-hidden="true"></i>&nbsp;&nbsp;Facebook</a><br>' +
                    '<a href="https://plus.google.com/+ProgramadoresBlogspotpgramadores"><i class="fa fa-google-plus" aria-hidden="true"></i>&nbsp;Google +</a><br>' +
                    '<a href="https://twitter.com/pgramadores"><i class="fa fa-twitter" aria-hidden="true"></i>&nbsp;&nbsp;Twitter</a><br>' +
                    '<a href="https://www.youtube.com/user/pgramadores"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp;&nbsp;Youtube</a><br>' +
                    '<a href="https://www.meetup.com/pgramadores/"><i class="fa fa-meetup" aria-hidden="true"></i>&nbsp;&nbsp;Meetup</a><br>'+
                    '</div>');
                }, 400);
                $(form).find('input, button, h3').remove();
                noty({
                    text        : 'Bienvenido a la comunidad de Pro-Gramadores',
                    type        : 'alert',
                    timeout     :  5000,
                    layout      : 'top',
                    theme       : 'relax'
                });
            }, function(response){

                console.log(response);
                if(response.status == 400)
                AnimacionError('¡Oops! El correo ingresado ya esta registrado!&nbsp', form);
                else
                AnimacionError('¡Oops! Ha ocurrido un error!&nbsp', form);
            });
        }
        else{
            AnimacionError('¡Oops! Email con formato invalido!&nbsp', form);
        }
    };


    var eventos = [{
      title : "Evento muy pro",
      startTime : "2017-05-21T19:19:00.000Z",
      endTime: "2017-05-21T21:14:00.000Z",
      allDay: false
    }];

    $scope.changeMode = function (mode) {
        $scope.mode = mode;
    };

    $scope.today = function () {
        $scope.currentDate = new Date();
    };

    $scope.isToday = function () {
        var today = new Date(),
          currentCalendarDate = new Date($scope.currentDate);

        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.loadEvents = function () {
        $scope.eventSource = eventos;
    };

    $scope.onEventSelected = function (event) {
        $scope.event = event;
    };

    $scope.onTimeSelected = function (selectedTime, events) {
        console.log('Selected time: ' + selectedTime + ' hasEvents: ' + (events !== undefined && events.length !== 0));
    };

});
