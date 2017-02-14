var app = angular.module("app", []);
app.constant("env",{
    "APIREST": "http://localhost:3000",
    "DOMINIO": "http://pro-gramadores.io"
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

    $scope.finishRepeatMiembros =  finishedRepeat(){
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
        $http.post(env.APIREST + '/usuarios/registro', $scope.registro)
        .then(function(data){
            if (data != null){
                //Alerta de registro exitoso
                console.log('Registrado exitosamente');
            }else{
                //Alerta de error en registro
                console.log('Error de registro: ' + data);
            }
        }, function(data){
            //Manejo de errores
            console.log('Error: ' + data);
        });
    };
});
