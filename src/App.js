import React, { Component } from 'react';
import GuestList from './guest_list';
import './App.css';

class App extends Component {
    state = {
        isFiltered: false,
        pendingGuest: "",
        guests: [
            {
                name: 'Treasure',
                isConfirmed: false,
                isEditing: false
            },
            {
                name: 'Nic',
                isConfirmed: true,
                isEditing: false
            },
            {
                name: 'Matt K',
                isConfirmed: true,
                isEditing: true
            }
        ]
    }

    toggleGuestPropertyAt = (property, indexToChange) => 
        this.setState({
            guests: this.state.guests.map((guest, index) => {
                if(index === indexToChange) {
                    return {
                        ...guest,
                        [property]: !guest[property]
                    };
                }
                return guest;
            })
        });

    toggleConfirmationAt = index => 
        this.toggleGuestPropertyAt("isConfirmed", index);
    
    toggleEditingAt = index =>
        this.toggleGuestPropertyAt("isEditing", index);    

    setNameAt = (name, indexToChange) => 
        this.setState({
            guests: this.state.guests.map((guest, index) => {
                if(index === indexToChange) {
                    return {
                        ...guest,
                       name
                    };
                }
                return guest;
            })
        });
    
    toggleFilter = () => 
        this.setState({ isFiltered: !this.state.isFiltered })

    getTotalInvited = () => this.state.guests.length;

    hangleNameInput = event => 
        this.setState({
            pendingGuest: event.target.value
        });

    newGuestSubmitHandler = event => {
        event.preventDefault();
        this.setState({ 
            guests: [
                {
                    name: this.state.pendingGuest,
                    isConfirmed: false,
                    isEditing: false
                },
                ...this.state.guests    
            ],
            pendingGuest: ""
        });
        console.log('added guest', this.state.pendingGuest);
    }

    // getAttendingGuests = () =>
    // getUnconfirmedGuests = () =>

    render() {
        return (
            <div className="App">
            <header>
            <h1>RSVP</h1>
            <p>A Treehouse App</p>
            <form onSubmit={this.newGuestSubmitHandler}>
                <input type="text"
                    onChange={this.hangleNameInput} 
                    value={this.state.pendingGuest}
                    placeholder="Invite Someone" />
                <button type="submit"
                    name="submit"
                    value="submit">Submit</button>
            </form>
            </header>
            <div className="main">
            <div>
                <h2>Invitees</h2>
                <label>
                <input 
                    type="checkbox"
                    onChange={this.toggleFilter}
                    checked={this.state.isFiltered}
                    /> Hide those who haven't responded 
                </label>
            </div>
            <table className="counter">
                <tbody>
                <tr>
                    <td>Attending:</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>Unconfirmed:</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td>{this.getTotalInvited()}</td>
                </tr>
                </tbody>
            </table>
            <GuestList 
                guests={this.state.guests}
                toggleConfirmationAt={this.toggleConfirmationAt}
                toggleEditingAt={this.toggleEditingAt}
                setNameAt={this.setNameAt}
                isFiltered={this.state.isFiltered}
            />
            </div>
        </div>
        );
    }
}

export default App;
