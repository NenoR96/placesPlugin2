var myapp = angular.module('places2Controller', ['ui.sortable']);

myapp.controller('contentController', function ($scope) {
    let placesTag = 'places', placesId;
    $scope.list = [];
    $scope.sortBy = 'manual'; //TODO: Wire up UI

    let updateSortOrder = function(places, sortBy){
        //Update the sort order to reflect the physical order
        places.forEach(function(element, index){
            element.sort = index;
        });

        buildfire.datastore.save({sortBy, places}, placesTag, function(err){
            if(err){
                console.error(err);
                return;
            }
        });
    };

    buildfire.datastore.get (placesTag, function(err, result){
        if(err){
            console.error('datastore.get error', err);
            return;
        }

        placesId = result.id;

        $scope.list = result.data.places;
        $scope.$apply()
    });

    $scope.sortableOptions = {
        update: function() {

            //Due to buggy nature of "sortable module", a delay is required
            setTimeout(function(){
                let places = angular.copy($scope.list);
                let sortBy = angular.copy($scope.sortBy);
                updateSortOrder(places, sortBy);
            }, 200);
        }
    };

    let input = document.getElementById('pac-input');
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace(),
            address = place.formatted_address,
            geometry = place.geometry,
            coordinates,
            location;

        if (geometry) {
            coordinates = {lng: geometry.location.lng(), lat: geometry.location.lat()};

            location = {title: $scope.title, address: {name: address, lat: coordinates.lat, lng: coordinates.lng}};

            if($scope.list){
                $scope.list.push(location);
            }else{
                $scope.list = [location];
            }

            $scope.title = '';
            $scope.location = '';
            $scope.$apply();

            let places = angular.copy($scope.list);
            let sortBy = angular.copy($scope.sortBy);
            updateSortOrder(places, sortBy);
        }else{
            //TODO: Handle manually entered lat/lng coordinates

            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            //window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });
});