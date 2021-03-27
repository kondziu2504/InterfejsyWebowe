"use strict";

var toDoList;
var toDoText;

function onLoad()
{
	toDoList = document.getElementById("toDoList");
	toDoText = document.getElementById("toDoText");
	
}

function toggleGray(element)
{
	console.log("toggray");
	let textPart = element.querySelector("span[name='textPart']");
	let datePart = element.querySelector("span[name='datePart']");
	
	if(element.getAttribute("checked") == "false")
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
	if(toDoText.value == "")
		return;

	let htmlListItem = document.createElement("li");
	htmlListItem.setAttribute("onclick", "toggleGray(this)");

	let textPart = document.createElement("span");
	textPart.setAttribute("name", "textPart");
	textPart.appendChild(document.createTextNode(toDoText.value));
	
	let datePart = document.createElement("span");
	datePart.setAttribute("name", "datePart");
	
	let deleteButton = document.createElement("button");
	deleteButton.setAttribute("type", "button");
	deleteButton.innerHTML = "Usuń";
	deleteButton.setAttribute("class", ".btn-danger");
	deleteButton.setAttribute("style", "background-color: red; color: white");
	deleteButton.setAttribute("onclick", "deleteListElement(this)");

	htmlListItem.appendChild(textPart);
	htmlListItem.innerHTML += " ";
	htmlListItem.appendChild(datePart);
	htmlListItem.appendChild(deleteButton);
	htmlListItem.setAttribute("class", "list-group-item");
	htmlListItem.setAttribute("checked", "false");
	
	toDoList.appendChild(htmlListItem);
}


function deleteListElement(button)
{
	$(button).parent().remove();
}