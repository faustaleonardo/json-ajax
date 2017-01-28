var animalContainer = document.getElementById('animal_info')
var btn_fetch = document.getElementById('btn_fetch');
var pageCounter = 0;

function renderHTML(data){
	var htmlString = "";

	for (var i=0; i<data.length; i++){
		htmlString += "<p class='border_paragraph'>" + data[i].name + "is a " + data[i].species + " that likes to eat " ;
		for (var j=0; j<data[i].foods.likes.length; j++){
			if (j >=1 ){
				htmlString += " and ";
			}
			htmlString += data[i].foods.likes[j];
		}
		htmlString += " and dislikes ";
		for (var j=0; j<data[i].foods.dislikes.length; j++){
			if (j >=1 ){
				htmlString += " and ";
			}
			htmlString += data[i].foods.dislikes[j];
		}
		htmlString += "</p>";
	}

	animalContainer.insertAdjacentHTML('beforeend', htmlString);
}

btn_fetch.addEventListener("click", function(){
	pageCounter++;
	var requestHTTP = new XMLHttpRequest();
	requestHTTP.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

	if(pageCounter > 2){
		btn_fetch.classList.add('hidden');
	}

	//what to do after got the data
	requestHTTP.onload = function(){

		// if we are able to retrieve the data successfully
		if (requestHTTP.status >= 200 && requestHTTP.status < 400){
			// By default browser recognize the data as plain text, so that we need JSON parse to convert it into JSON type data.
			var data = JSON.parse(requestHTTP.responseText);
			renderHTML(data);
		}
		else{
			console.log("We connected to the server, but it returned an error");
		}

	}


	// if user lost internet connection
	requestHTTP.onerror = function(){
		console.log("Connection error");
	}

	requestHTTP.send();	
});

