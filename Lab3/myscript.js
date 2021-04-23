
class App extends React.Component {
	render() {
		return (
			<>
			
				<MainPanel />
				<AddPanel />
			</>
		)
	}		
}

class SearchBar extends React.Component {
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
					<SearchResult />
				</div>
			</>
		)
	}
}

class MainPanel extends React.Component {
	render() {
		return (
			<div className="main-panel">
				<SearchBar />
				<CandidatesList />
			</div>	
		)
	}		
}
 
class AddPanel extends React.Component {
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

var candidates = [
	{name:"Arek Architekt", desc:"Arek jest świetnym architektem, lubi projektować systemy", email:"arek@architekt.com", tags:"docker, AWS, kubernetes, scrum"},
	{name:"Dagmara Dockerka", desc:"Lubi Dockera", email:"dagmara@dockerka.com", tags:"Docker"},
	{name:"Renata Reakcyjna", desc:"Lubi Reacta", email:"renata@reakcyjna.com", tags:"React, CSS, JavaScript"}
];
var found_candidates_count = 0

function CandidatesList() {
	let arr = [];
	let filteredCandidates = FilteredCandidates()
	for(var i = 0; i < filteredCandidates.length; i++){		
		arr.push(<CandidateElement key={i} candidate={filteredCandidates[i]}/>)	
	}
	return <div className="candidates-list"> {arr} </div>
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
				 <img style={{height: "100px", marginRight: "20px" }} src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png" alt="Image"/>
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

function Refresh(){
	ReactDOM.render(
		<App />,
        document.getElementById('root')		
    );
}

function SearchResult(){
		return (
		<div className="search-result">
			<h3>Znaleziono {FilteredCandidates().length} kandydatów</h3>
		</div>
	)
}