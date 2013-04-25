// Russell Gaspard
// Project 2
// Visual Frameworks - VFW 1304
// Mobile Development
// Full Sail University


//Wait until the page DOM content has loaded
window.addEventListener("DOMContentLoaded", function(){

	//Element Selection Function
	function id(id){
		var thisElement = document.getElementById(id);
		return thisElement;
	}

	//Build Instrument Selector
	function makePrimaryList(){
		var theForm = document.forms[0];
		var pSelect = id("pSelect");
		var newSelect = document.createElement('select');
		newSelect.setAttribute("id", "primary");
		for(var i=0, j=pInstrument.length; i<j; i++){
			var newOption = document.createElement('option');
			var text = pInstrument[i];
			newOption.setAttribute("value", text);
			newOption.innerHTML = text;
			newSelect.appendChild(newOption);
		};
		pSelect.appendChild(newSelect);
	};
	
	//find which checkboxes are checked
	function getAllInstruments(){
		var checks = document.forms[0].all;
		var instruments = ["All Instruments:"];
		for(var i=0, j=checks.length; i<j; i++){
			if(checks[i].checked){
				instruments.push(checks[i].value);
			}
		}
		return instruments;
	}
	
	function controlToggle(x){
		switch(x){
			case "on":
				id("theForm").style.display = "none";
				id("clearDataLink").style.display = "inline";
				id("displayDataLink").style.display = "none";
				id("addAnother").style.display = "inline";
				break;
			case "off":
				id("theForm").style.display = "block";
				id("clearDataLink").style.display = "inline";
				id("displayDataLink").style.display = "inline";
				id("addAnother").style.display = "none";
				id("musicians").style.display = "none";
				break;
			default:
				return false;
		}
	
	}
	
	function saveData(){
		var randomID = Math.floor(Math.random()*100000);
		//Compile form data into an object - properties include array with label and value.
		var entry			={};

			entry.fname		= ["First Name:", id("fname").value];	
			entry.lname		= ["Last Name:", id("lname").value];
			entry.phone		= ["Phone:", id("phone").value];	
			entry.email		= ["Email:", id("email").value];			
			entry.primary	= ["Primary Instrument:", id("primary").value];
			entry.all		= getAllInstruments();			
			entry.rating	= ["Rating:", id("rating").value];
			entry.lgig		= ["Last Gig:", id("lgig").value];
			entry.notes		= ["Notes:", id("notes").value];
		//Save into localStorage
		localStorage.setItem(randomID, JSON.stringify(entry));
		console.log(randomID + " " + JSON.stringify(entry));
		alert("Musician Data Saved");	
	};
	
	function displayData(){
		if(localStorage.length === 0){
			alert("No musician data has been saved.");
		}else{
			controlToggle("on");
		}
		var newDiv =document.createElement("div");
		newDiv.setAttribute("id","musicians");
		newList =document.createElement("ul");
		newDiv.appendChild(newList);
		document.body.appendChild(newDiv);
		id("musicians").style.display = "block";
		for(i=0, j=localStorage.length; i<j; i++){
			newItem = document.createElement("li");
			newList.appendChild(newItem);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var data = JSON.parse(value);
			var newSubList = document.createElement("ul");
			newItem.appendChild(newSubList);
			for(var n in data){
				var newSubItem = document.createElement("li");
				newSubList.appendChild(newSubItem);
				var subText = "";
				for(var x=0, y=data[n].length; x<y; x++){
					subText = subText + data[n][x] + " ";
				}
				newSubItem.innerHTML = subText;
			}
		}
	}
	
	function clearData(){
		if(localStorage.length === 0){
			alert("No musician data has been saved.");
		}else{
			localStorage.clear();
			alert("All Musicians Deleted");
			window.location.reload();
			return false;
		}
	}
	
	//Primary Instrument Values
	var pInstrument = [" -Primary Instrument- ","Guitar", "Bass", "Drums", "Keys", "Vocals", "Other"];
	var instruments;
	makePrimaryList();

	//Get Relevant Click Events
	var displayDataLink = id("displayDataLink");
	displayDataLink.addEventListener("click", displayData);
	
	var clearDataLink = id("clearDataLink");
	clearDataLink.addEventListener("click", clearData);

	var storeDataButton = id("submit");
	storeDataButton.addEventListener("click", saveData);	

	//var addAnother = id("addAnother");
	//addAnother.addEventListener("click", alert("hello"));	

});



