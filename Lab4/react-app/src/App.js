import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
			<>
				<Router>
					<div>		
						<nav>
							<div className="grid-container">
								<Link to="/InterfejsyWebowe/" >
									<div className="grid-item">
											Strona domowa
									</div>
								</Link>
								<Link to="/InterfejsyWebowe/search-student" >
									<div className="grid-item">
											Wyszukaj studenta
									</div>
								</Link>
								<Link to="/InterfejsyWebowe/add-student">
									<div className="grid-item">
										Dodaj studenta
									</div>
								</Link>
								<Link to="/InterfejsyWebowe/search-group">
									<div className="grid-item">
										Wyszukaj grupę
									</div>
								</Link>
								<Link to="/InterfejsyWebowe/add-group">
									<div className="grid-item">
										Dodaj grupę
									</div>
								</Link>
							</div>
						</nav>
						<Switch>
							<Route exact path="/InterfejsyWebowe/">
								<Home />
							</Route>
							<Route path="/InterfejsyWebowe/search-student">
								<SearchStudentPanel />
							</Route>
							<Route path="/InterfejsyWebowe/add-student">
								<AddStudentPanel />
							</Route>
							<Route path="/InterfejsyWebowe/search-group">
								<SearchGroupPanel />
							</Route>
							<Route path="/InterfejsyWebowe/add-group">
								<AddGroupPanel />
							</Route>
						</Switch>
					</div>
				</Router>
			</>
		);
}

class Home extends React.Component {
	render() {
		return (
			<>
				<div className="main-panel" style={{padding: "50px"}}>
					<img className="center" style={{width: "20%"}} src="home.png" alt="Image"/>
					<h1 style={{textAlign: "center"}}>Strona domowa</h1>
				</div>
			</>
		)
	}
}

class StudentSearchBar extends React.Component {
	render() {
		return (
			<>
				<div style={{height: 100}}>
					<div className="search-bar">
						<div className="search-field">
							<label>Wyszukiwanie po tagach:</label>
							<input id="tags_search" type="text" onChange={Refresh}/><br/>
						</div>
						<div className="search-field">
							<label>Wyszukiwanie po opisach:</label>
							<input id="desc_search" type="text" onChange={Refresh}/>
						</div>
					</div>		
					<StudentSearchResult />
				</div>
			</>
		)
	}
}

class GroupSearchBar extends React.Component {
	render() {
		return (
			<>
				<div style={{height: 100}}>
					<div className="search-bar">
						<div className="search-field">
							<label>Wyszukiwanie po tagach:</label>
							<input id="tags_search" type="text" onChange={Refresh}/><br/>
						</div>
						<div className="search-field">
							<label>Wyszukiwanie po opisach:</label>
							<input id="desc_search" type="text" onChange={Refresh}/>
						</div>
					</div>		
					<GroupSearchResult />
				</div>
			</>
		)
	}
}

class SearchStudentPanel extends React.Component {
	render() {
		return (
			<div className="main-panel">
				<StudentSearchBar />
				<CandidatesList />
			</div>	
		)
	}		
}

class SearchGroupPanel extends React.Component {
	render() {
		return (
			<div className="main-panel">
				<GroupSearchBar />
				<GroupsList />
			</div>	
		)
	}		
}
 
class AddStudentPanel extends React.Component {
  render() {
    return (
		<div className="add-panel">
			<div>
				<label style={{fontWeight: "bold"}}>Dodawanie nowego studenta</label><br/>
				<div className="add-panel-inputbox add-panel-field">
					<label className="input-label">Imię:</label>
					<input className="input-field" id="addname" type="text"/><br/>
				</div>
				<div className="add-panel-inputbox add-panel-field">
					<label className="input-label">Opis:</label>
					<input className="input-field"  id="adddesc" type="text"/><br/>
				</div>
				<div className="add-panel-inputbox add-panel-field">
					<label className="input-label">Email:</label>
					<input className="input-field"  id="addemail" type="text"/><br/>
				</div>
				<div className="add-panel-inputbox add-panel-field">
					<label className="input-label">Tagi:</label>
					<input className="input-field"  id="addtags" type="text"/><br/>
				</div>
			</div>
			<div style={{clear: "both"}}>
				<input c style={{width: "100%"}} type="button" value="Dodaj" onClick={AddCandidateFromForm}/>
			</div>		
		</div>
	)
  }
}

class AddGroupPanel extends React.Component {
  render() {
    return (
		<div className="add-panel">
			<div>
				<label style={{fontWeight: "bold"}}>Dodawanie nowej grupy</label><br/>
				<div className="add-panel-inputbox add-panel-field">
					<label className="input-label">Nazwa:</label>
					<input className="input-field" id="addnamegroup" type="text"/><br/>
				</div>
				<div className="add-panel-inputbox add-panel-field">
					<label className="input-label">Opis:</label>
					<input className="input-field"  id="adddescgroup" type="text"/><br/>
				</div>
				<div className="add-panel-inputbox add-panel-field">
					<label className="input-label">Tagi:</label>
					<input className="input-field"  id="addtagsgroup" type="text"/><br/>
				</div>
			</div>
			<div style={{clear: "both"}}>
				<input c style={{width: "100%"}} type="button" value="Dodaj" onClick={AddGroupFromForm}/>
			</div>		
		</div>
	)
  }
}

var candidates = [
	{name:"Arek Architekt", desc:"Arek jest świetnym architektem, lubi projektować systemy", email:"arek@architekt.com", tags:"docker, AWS, kubernetes, scrum"},
	{name:"Dagmara Dockerka", desc:"Lubi Dockera", email:"dagmara@dockerka.com", tags:"Docker"},
	{name:"Renata Reakcyjna", desc:"Lubi Reacta", email:"renata@reakcyjna.com", tags:"React, CSS, JavaScript"}
];

var groups = [
	{name:"Fanatycy Dockera", desc:"Poszukujemny fanatyków Dockera", tags:"Docker, CSS"},
	{name:"Reaktywni", desc:"Poszukujemny fanatyków Reacta", tags:"React, JavaScript"}
];

function CandidatesList() {
	let arr = [];
	let filteredCandidates = FilteredCandidates()
	for(var i = 0; i < filteredCandidates.length; i++){		
		arr.push(<CandidateElement key={i} candidate={filteredCandidates[i]}/>)	
	}
	return <div className="candidates-list"> {arr} </div>
}

function GroupsList() {
	let arr = [];
	let filteredGroups = FilteredGroups()
	for(var i = 0; i < filteredGroups.length; i++){		
		arr.push(<GroupElement key={i} group={filteredGroups[i]}/>)	
	}
	return <div className="candidates-list"> {arr} </div>
}

function FilteredGroups(){
	let filteredGroups = []
	let search = document.getElementById("desc_search")
	let tags_search = document.getElementById("tags_search")
	let tags = []
	if(tags_search != null)
		tags = tags_search.value.split(" ")
	for(var i = 0; i < groups.length; i++){
		let matches_tags = true
		for(var j = 0; j < tags.length; j++){
			if(!groups[i].tags.toLowerCase().includes(tags[j].toLowerCase())){
				matches_tags = false
				break
			}
		}
		
		if(matches_tags == false)
			continue
		
		if(search == null || search.value == "" || candidates[i].desc.toLowerCase().includes(search.value.toLowerCase())){
			filteredGroups.push(groups[i])	
		}
	}
	return filteredGroups
}

function FilteredCandidates(){
	let filteredCandidates = []
	let search = document.getElementById("desc_search")
	let tags_search = document.getElementById("tags_search")
	let tags = []
	if(tags_search != null)
		tags = tags_search.value.split(" ")
	for(var i = 0; i < candidates.length; i++){
		let matches_tags = true
		for(var j = 0; j < tags.length; j++){
			if(!candidates[i].tags.toLowerCase().includes(tags[j].toLowerCase())){
				matches_tags = false
				break
			}
		}
		
		if(matches_tags == false)
			continue
		
		if(search == null || search.value == "" || candidates[i].desc.toLowerCase().includes(search.value.toLowerCase())){
			filteredCandidates.push(candidates[i])	
		}
	}
	return filteredCandidates
}

function CandidateElement({candidate}) {
	return (
		<div className="candidate-element">
			<div style={{ float: "left"}}>
				 <img style={{height: "100px", marginRight: "20px" }} src="avatar.png" alt="Image"/>
			</div>
			<div style={{ float: "left"}}>
				{candidate.name}<br/>
				{candidate.desc}<br/>
				{candidate.email}<br/>
				{candidate.tags}
			</div>
		</div>
	)
}

function GroupElement({group}) {
	return (
		<div className="candidate-element">
			<div style={{ float: "left"}}>
				 <img style={{height: "100px", marginRight: "20px" }} src="groupavatar.png" alt="Image"/>
			</div>
			<div style={{ float: "left"}}>
				{group.name}<br/>
				{group.desc}<br/>
				{group.tags}
			</div>
		</div>
	)
}

function AddCandidateFromForm(){
	var candidate = {name:"", desc:"", email:"", tags:[]}
	candidate.name = document.getElementById('addname').value
	candidate.desc = document.getElementById('adddesc').value
	candidate.email = document.getElementById('addemail').value
	candidate.tags = document.getElementById('addtags').value
	if(candidate.name == "" || candidate.desc == "" || candidate.email == "" || candidate.tags == "")
		return
	candidates.push(candidate);
	Refresh()
}

function AddGroupFromForm(){
	var group = {name:"", desc:"", tags:[]}
	group.name = document.getElementById('addnamegroup').value
	group.desc = document.getElementById('adddescgroup').value
	group.tags = document.getElementById('addtagsgroup').value
	if(group.name == "" || group.desc == "" || group.tags == "")
		return
	groups.push(group);
	Refresh()
}

function Refresh(){
	ReactDOM.render(
		<App />,
        document.getElementById('root')		
    );
}

function StudentSearchResult(){
		return (
		<div className="search-result">
			<h3>Znaleziono {FilteredCandidates().length} kandydatów</h3>
		</div>
	)
}

function GroupSearchResult(){
		return (
		<div className="search-result">
			<h3>Znaleziono {FilteredGroups().length} grupy</h3>
		</div>
	)
}

export default App;
