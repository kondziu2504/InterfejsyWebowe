"use strict";

var toDoList;
var toDoText;

var trash = null;

function onLoad()
{
	toDoList = document.getElementById("toDoList");
	toDoText = document.getElementById("toDoText");
	
}

$(document).ready(function(){
	$(".open").on("click", function() {	
		$(".popup-overlay, .popup-content").addClass("active");
	});

	$(".closeYes").on("click", function() {
		$(".popup-overlay, .popup-content").removeClass("active");
		trash = $(".deleteListElement").parent().get(0);
		$(".deleteListElement").parent().remove();
		$(".undoButton").prop("disabled", false);
	});
	
	$(".closeNo").on("click", function() {
		$(".popup-overlay, .popup-content").removeClass("active");
		$(".deleteListElement").removeClass("deleteListElement");
	});
	
	$(".undoButton").prop("disabled", true);
	
	$(".undoButton").on("click", function() {
		if(trash != null)
		{		
			let delButton = $(trash).find(".delete-button").get(0);
			console.log(delButton);
	
			toDoList.appendChild(trash);
			$(delButton).on("click", function() {	
				$(".popup-overlay, .popup-content").addClass("active");
				$(delButton).addClass("deleteListElement");
			});
			$(delButton).removeClass("deleteListElement");
			
			$(".undoButton").prop("disabled", true);
			
			trash = null;
		}
	});
})	


function crossOut(element)
{
	console.log("toggray");
	let textPart = element.querySelector("span[name='textPart']");
	let datePart = element.querySelector("span[name='datePart']");
	
	if(element.getAttribute("checked") === "false")
	{
		textPart.style.color = "DarkGrey";
		textPart.style.setProperty("text-decoration", "line-through")
		datePart.innerHTML = (new Date()).toLocaleDateString();
		
		element.setAttribute("checked", true);
	}
	else
	{
		textPart.style.color = "Black";
		textPart.style.setProperty("text-decoration", "none")
		datePart.innerHTML = "";
		
		element.setAttribute("checked", false);
	}
	
}

function ListElement(value)
{
	this.value = value;
	this.date = null;
}

function addToList()
{
	if(toDoText.value === "")
		return;

	let htmlListItem = document.createElement("li");

	let textPart = document.createElement("span");
	textPart.setAttribute("name", "textPart");
	textPart.appendChild(document.createTextNode(toDoText.value));
	textPart.setAttribute("onclick", "crossOut(this.parentElement)");
	
	let datePart = document.createElement("span");
	datePart.setAttribute("name", "datePart");
	
	let deleteButton = document.createElement("button");
	deleteButton.setAttribute("type", "button");
	deleteButton.innerHTML = "Usuń";
	deleteButton.setAttribute("class", ".btn-danger open");
	deleteButton.classList.add("delete-button");

	htmlListItem.appendChild(textPart);
	htmlListItem.innerHTML += " ";
	htmlListItem.appendChild(datePart);
	htmlListItem.appendChild(deleteButton);
	htmlListItem.setAttribute("class", "list-group-item");
	htmlListItem.setAttribute("checked", "false");
	
	toDoList.appendChild(htmlListItem);
	
	$(deleteButton).on("click", function() {	
		$(".popup-overlay, .popup-content").addClass("active");
		$(deleteButton).addClass("deleteListElement");
	});
}
