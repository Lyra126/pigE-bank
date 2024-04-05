import React from 'react';
import './Prompt.css'; // Import CSS file for styling

class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pigName: '',
            goalName: '',
        };

        this.onChange = this.onChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSave() {
        const { pigName, goalName } = this.state;

        // Validate pig name length
        if (pigName.length > 20) {
            alert('Pig name cannot be longer than 20 characters.');
            return;
        }

        // Validate goal name length
        if (goalName.length > 20) {
            alert('Goal name cannot be longer than 20 characters.');
            return;
        }

        // If all validations pass, call the onChange callback with the values
        this.props.onChange({ pigName, goalName });
    }

    render() {
        return (
            <div className="prompt-container">
                <div className="prompt-content">
                    <div className="form-group">
                        <label htmlFor="pigName" style={{marginRight: 10}}>New Pig Name: </label>
                        <input
                            type="text"
                            name="pigName"
                            value={this.state.pigName}
                            onChange={this.onChange}
                            className="mm-popup__input"
                            placeholder="Enter pig name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goalName" style={{marginRight: 10}}>New Goal Name: </label>
                        <input
                            type="text"
                            name="goalName"
                            value={this.state.goalName}
                            onChange={this.onChange}
                            className="mm-popup__input"
                            placeholder="Enter goal name"
                            required
                        />
                    </div>
                    <div className="prompt-button-group">
                        <button className="prompt-save-button" style = {{width: 200, backgroundColor: "green"}}onClick={this.handleSave}>Save</button>
                        <button className="prompt-cancel-button" style = {{color: "black"}} onClick={this.props.onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Prompt;
