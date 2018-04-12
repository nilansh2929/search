import React , {Component} from 'react';
import SearchBox from './SearchBox';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchVal : ""
		}
	}

	componentDidMount() {
		window.addEventListener('click', this.handleClick.bind(this));
	}

	componentWillUnMount() {
  		window.removeEventListener('click', this.handleKeyDown.bind(this));
	}

	handleClick(e) {
		var dom = document.getElementsByClassName('search_box')[0];
		if (dom) {
			if (!dom.contains(e.target))
		    {
		        this.setState({
		        	searchVal : ""
		        })
		    }
		}
		
	}

	handleChange(event) {
		this.setState({
			searchVal : event.target.value
		})
	}

	render() {
		const {searchVal} = this.state;
		const {data} = this.props;

		let dataRows = data.filter((user,index) => {
			var total_string = user.id.toLowerCase() + " " + user.name.toLowerCase() + " " + user.address.toLowerCase() +
			" " + user.pincode.toLowerCase() + " ";
			total_string += user.items.map((item) => {
					return item.toLowerCase() + " ";
				})
			if (searchVal && total_string.indexOf(searchVal.toLowerCase()) > -1) {
				return user;
			}
		});
		return(
			<div className="search_div">
				<label > Search  
				<input 
					value = {searchVal}
					type = "text"
					onChange = {(e) => this.handleChange(e)}
					className = "search_input"
					placeholder = "Search users by ID, address, name, etc.."
				/>
				</label>
				<SearchBox input = {searchVal} data = {dataRows}/>

			</div>
		)
	}
}

export default Search;