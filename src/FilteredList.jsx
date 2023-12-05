import React, { Component } from 'react'; import {
    Dropdown,
    DropdownButton} from 'react-bootstrap' ;
    import List from './List';
    class FilteredList extends Component {
     constructor(props) {
     super(props);
     // TODO: Add a new key/value pair in the state to keep track of type
     this.state = {
    search: ""
     };
     }

    onSearch = (event) => {
    if (event.target && event.target.value !== undefined) {
        this.setState({ search: event.target.value?.trim().toLowerCase() });
    }
    }
    filterItem = (item) => {
    const nameMatches = item.name.toLowerCase().search(this.state.search) !== -1;
    const typeMatches = this.state.type === "all" || this.state.type === item.type.toLowerCase();
    
    return nameMatches && typeMatches;
    }

    onSelectType = (eventKey, event) => {
        this.setState({ type: eventKey }, () => {
          // After updating the state, trigger the search based on type
          this.onSearch(event);
        });
      }

    render() {
        return (
        <div className="filter-list">
            <h1>Produce Search</h1>
            {/* TODO: Add more menu items with onSelect handlers*/}
            <DropdownButton id="typeDropdown" title={`Type: ${this.state.type}`} onSelect={this.onSelectType}>
                <Dropdown.Menu style={{ display: 'block' }}>
                    <Dropdown.Item eventKey="all">All</Dropdown.Item> 
                    <Dropdown.Item eventKey="fruit">Fruit</Dropdown.Item>
                    <Dropdown.Item eventKey="vegetable">Vegetable</Dropdown.Item>
                </Dropdown.Menu>
            </DropdownButton>
            <input type="text" placeholder="Search" onChange={this.onSearch} />
            <List items={this.props.items.filter(this.filterItem)} />
        </div>
        )};
    }
   
   export default FilteredList;