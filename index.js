var app = angular.module("app", []);
app.constant("env",{
    "APIREST": "http://localhost:3000",
    "DOMINIO": "http://pro-gramadores.io",
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
            imagen  : env.RUTAIMAGENPERFIL+"Juan.jpg"
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
                if (response != null){ // Si la API responde
                    if (response.status == 200) {
                        $(form).find('input, button, h3').remove();
                        noty({
                            text        : 'Bienvenido a la comunidad de Pro-Gramadores',
                            type        : 'alert',
                            timeout     :  3000,
                            layout      : 'top',
                            theme       : 'relax'
                        });
                    }else{
                        Error(response.data.error);
                    }
                }
            }, function(data){
                //Error general, ej no conección
                AnimacionError('¡Oops! Ha ocurrido un error!&nbsp', form);
            });
        }
        else{
            AnimacionError('¡Oops! Email con formato invalido!&nbsp', form);
        }
    };
});
