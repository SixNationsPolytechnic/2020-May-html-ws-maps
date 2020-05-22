var newData = JSON.parse(event.data,(key, value) =>
    {
     // console.log("parsing is "+key);
      if (key === 'lat'){
        console.log("lat is "+value);
        lat = value;
      }
      else if (key === 'lng'||key === 'lon'){
        lng = value;
        console.log("lng is "+lng);
      }
      else if (key === 'name'){
        name = value;
        console.log("name is "+name);
      }
    });
    //inside the map init
google.maps.event.addDomListener(document.getElementById('marker_form'), 'submit', function(e) {

   e.preventDefault();//stops the submission of the form from refreshing the page and losing our info     

        // Get lat and lng values from input fields
        var lat = document.getElementById('lat').value;
        var lng = document.getElementById('lng').value;
        var name = document.getElementById('name').value;
        
        // Validate user input as numbers
        lat = (!isNumber(lat) ? 0 : lat);
        lng = (!isNumber(lng) ? 0 : lng);

        // Validate user input as valid lat/lng values
        lat = latRange(lat);
        lng = lngRange(lng);

        // Replace input values
        document.getElementById('lat').value = "";
        document.getElementById('lng').value = "";
        document.getElementById('name').value = "";

        //put the cursor back into the name field
        document.getElementById("name").focus();

        //make a position with form entries
        var newPos = {lat:lat, lng: lng};

        //make the new marker
        var newMarker = new google.maps.Marker({
            position: newPos,
            title: name,
            map: map
        });

        //add the new marker to our list of markers
        markers.push(newMarker);

        //reset the zoom and center the map on all of the locations
        updateMap(map);

        //update the message on the page
        msg.innerHTML = "New marker added: Name:"+name+", lat:"+ mypos.lat+", long: "+ mypos.lng; 


    });

var updateMap = function(mymap){
  
  var bounds = new google.maps.LatLngBounds();

  for(i=0;i<markers.length;i++) {
    bounds.extend(markers[i].getPosition());
  }

  mymap.setCenter(bounds.getCenter());

  mymap.fitBounds(bounds);

}