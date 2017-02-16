var app = angular.module("app", []);
app.constant("env",{
    "APIREST": "http://localhost:3000",
    "DOMINIO": "http://pro-gramadores.io"
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
            origen  : "Santiago, Chile"
        },
        {
            nombre  : "Agustín González",
            origen  : "Santiago, Chile"
        },
        {
            nombre  : "Diego Riquelme",
            origen  : "Santiago, Chile"
        },
        {
            nombre  : "Gerardo Calfulef",
            origen  : "Santiago, Chile"
        },
        {
            nombre  : "Andrés Rodríguez",
            origen  : "Santiago, Chile"
        },
        {
            nombre  : "Alexis González",
            origen  : "Corrientes, Argentina"
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
        var Error = function(mensaje){
            $(form).find('i').replaceWith('<i class="fa fa-times" aria-hidden="true"></i>');
            $(form).find('span').html(mensaje).toggle();
            $(form).find('input, h3').addClass('animated fadeInRight');
            $(form).find('button').prop('disabled', false).addClass('animated bounceIn');
            console.log('Error: ' + data);
        }

        var RemoverAnimaciones = function(obj){
            $(obj).find('*').removeClass('fadeOutLeft');
            $(obj).find('*').removeClass('fadeInRight');
            $(obj).find('*').removeClass('bounceIn');
        }

        var form = $('.reg-form');
        RemoverAnimaciones(form);

        $(form).find('i').replaceWith('<i name="icon" class="fa fa-spinner fa-pulse" aria-hidden="true"></i>').toggle(true);
        $(form).find('input, h3').addClass('animated fadeOutLeft');
        $(form).find('button').prop('disabled', true);
        $(form).find('span').toggle(false);

        $http.post(env.APIREST + '/usuarios/registro', $scope.registro)
        .then(function(data){
            if (data != null){
                //Alerta de registro exitoso
                $(form).find('span').html('¡Registrado exitosamente!').toggle();
                console.log('¡Registrado exitosamente!');
            }else{
                //Alerta de error en registro
                RemoverAnimaciones(form);
                Error('¡Ya registrado!'); // No estoy seguro de como evaluar esto aún
                console.log('Error de registro');
            }
        }, function(data){
            //Error general, ej no conección
            RemoverAnimaciones(form);
            Error('¡Oops! Ha ocurrido un error');
        });
    };
});
