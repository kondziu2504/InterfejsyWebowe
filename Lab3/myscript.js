
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
					<div className="candidates-list" style={{width: "70%", height: "100%", float: "left"}}>
						<label>Wyszukiwanie po tagach:</label>
						<input type="text"/><br/><br/>
						<label>Wyszukiwanie po opisach:</label>
						<input id="desc_search" type="text" onChange={Refresh}/>
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
			<label>Dodawanie nowego studenta</label><br/><br/>
			<label>Imię:</label>
			<input id="addname" type="text"/><br/><br/>
			<label>Opis:</label>
			<input id="adddesc" type="text"/><br/><br/>
			<label>Email:</label>
			<input id="addemail" type="text"/><br/><br/>
			<label>Tagi:</label>
			<input id="addtags" type="text"/><br/><br/>
			<input type="button" value="Dodaj" onClick={AddCandidateFromForm}/>
		</div>
	)
  }
}

var candidates = [{name:"TestName", desc:"TestDesc", email:"TestEmail", tags:"TestTags"}];

function CandidatesList() {
	let arr = [];
	for(var i = 0; i < candidates.length; i++){		
		let search = document.getElementById("desc_search")
			if(search == null || search.value == "" || candidates[i].desc.includes(search))
				arr.push(<CandidateElement key={candidates[i]} candidate={candidates[i]}/>)
	}
	return arr
}

function CandidateElement({candidate}) {
	return (
		<div className="candidates-element">
			{candidate.name}<br/>
			{candidate.desc}<br/>
			{candidate.email}<br/>
			{candidate.tags}
		</div>
	)
}

function AddCandidateFromForm(){
	var candidate = {name:"", desc:"", email:"", tags:[]}
	candidate.name = document.getElementById('addname').value
	candidate.desc = document.getElementById('adddesc').value
	candidate.email = document.getElementById('addemail').value
	candidate.tags = document.getElementById('addtags').value
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
		<div className="candidates-element" style={{width: "30%", height: "100%", float: "left"}}>
			Znaleziono {candidates.length} kandydatów
		</div>
	)
}