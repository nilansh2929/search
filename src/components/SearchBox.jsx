import React , {Component} from 'react';

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected : "",
			selectedIndex : 0
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	componentWillUnMount() {
  		window.removeEventListener('keydown', this.handleKeyDown.bind(this));
	}

	componentDidUpdate() {

	}

	handleKeyDown(e) {
		const {data} = this.props;
		const {selected, selectedIndex} = this.state;

		if (e.keyCode == 40) {
			if (!selected.length || selectedIndex ==  data.length-1) {
				this.refs.searchBox.scrollTop = 0;
				this.setState({
					selected : data[0].id,
					selectedIndex : 0
				})
			} else {
				this.refs.searchBox.scrollTop+=90;
				this.setState((prevState,props) => ({
					selected : data[prevState.selectedIndex+1].id ,
					selectedIndex : prevState.selectedIndex + 1
				}));
			}
		} else if (e.keyCode == 38) {
			if (selectedIndex > 0) {
				this.refs.searchBox.scrollTop -=90;
				this.setState((prevState,props) => ({
					selected : data[prevState.selectedIndex-1].id ,
					selectedIndex : prevState.selectedIndex - 1
				}));
			}
		}
	}

	handleMouseEnter(user_id,index) {
		this.setState({
			selected : user_id,
			selectedIndex : index
		})
	}

	handleMouseLeave() {
		this.setState({
			user : "",
			selectedIndex : 0
		})
	}

	checkInput(text) {
		const {input} = this.props;
		let sameText = text;
		var index = sameText.toLowerCase().indexOf(input.toLowerCase());
		if (index > -1) {
			const fnewText = text.substr(0,index);
			const enewText = text.substr(index + input.length, text.length-1);
			let newTextJsx = <span>{fnewText}<span className='blue_span'>{input}</span>{enewText} </span>;
			return newTextJsx;
		} else {
			return text;
		} 
	}

	renderBox() {
		const {data} = this.props;
		const {selected} = this.state;
		if (data.length === 0) {
			return (
				<div>
					<h3> No Results found </h3>
				</div>
			)
		} else {
			let dataRows = data.map((user,index) => {
				
					let items = user.items.map((item,index) => {
						return (
							<li key = {index}> {item}</li>
						)
					})
					return (
						<div className = {(selected == user.id ? "selected " : "") + "user_details"}
							key = {user.id} 
							onMouseEnter = {(e) => this.handleMouseEnter(user.id,index,e)}
							onMouseLeave = {(e) => this.handleMouseLeave(e)}
							>
							<h4> {this.checkInput(user.id)}</h4>
							<div className="user_name"> {this.checkInput(user.name)} </div>
							<div className="user_address"> {this.checkInput(user.address)} </div>
							<div className="user_pincode"> {this.checkInput(user.pincode)} </div>
							<div className="user_items"> <ul> {items} </ul></div>

						</div>
					)
				});

			return dataRows;
		}

	}

	render() {
		const {input} = this.props;
		return(
			input && (<div className="search_box" ref="searchBox">
				{this.renderBox()}
			</div>)
		)
	}
}

export default SearchBox;