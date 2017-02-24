var app = angular.module("app", []);
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

app.controller('layoutController', function($scope, $http, env){

    var _miembros = [
        {
            nombre  : "Juan Mora",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Juan.jpg",
            redes   : {
                sociales:[
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
            imagen  : env.RUTAIMAGENPERFIL+"Agustin.jpg"
        },
        {
            nombre  : "Diego Riquelme",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Diego.jpg"
        },
        {
            nombre  : "Gerardo Calfulef",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Gerardo.jpg"
        },
        {
            nombre  : "Andrés Rodríguez",
            origen  : "Santiago, Chile",
            imagen  : env.RUTAIMAGENPERFIL+"Andres.jpg"
        },
        {
            nombre  : "Alexis González",
            origen  : "Corrientes, Argentina",
            imagen  : env.RUTAIMAGENPERFIL+"Alexis.jpg"
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
            $(obj).find('i').replaceWith('<i name="icon" class="fa fa-spinner fa-pulse" aria-hidden="true"></i>').toggle(true);
            $(obj).find('input, h3').addClass('animated fadeOutLeft');
            $(obj).find('button').prop('disabled', true);
            $(obj).find('span').toggle(false);
        }

        var AnimacionError = function(mensaje, obj){
            RemoverAnimaciones(obj);
            $(obj).find('i').replaceWith('<i class="fa fa-times" aria-hidden="true"></i>');
            $(obj).find('button span').html(mensaje).toggle(true);
            $(obj).find('input, h3').addClass('animated fadeInRight');
            $(obj).find('button').prop('disabled', false).addClass('animated bounceIn');

            setTimeout(function(){
                $(form).find('span').html("Aprender&nbsp")
                $(form).find('i').replaceWith('<i></i>')
            }, 4000 );
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


});
