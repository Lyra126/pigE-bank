import React from 'react';
import './Prompt.css'; // Import CSS file for styling

class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pigName: '',
            goalName: '',
            goalAmount: ''
        };

        this.onChange = this.onChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSave() {
        const { pigName, goalName, goalAmount } = this.state;

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

        // Validate goal amount
        const amount = parseFloat(goalAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Goal amount must be a decimal larger than 0.');
            return;
        }

        // If all validations pass, call the onChange callback with the values
        this.props.onChange({ pigName, goalName, goalAmount });
    }

    render() {
        return (
            <div className="prompt-container">
                <div className="prompt-content">
                    <div className="form-group">
                        <label htmlFor="pigName">Pig Name:</label>
                        <input
                            type="text"
                            name="pigName"
                            value={this.state.pigName}
                            onChange={this.onChange}
                            className="mm-popup__input"
                            placeholder="Enter pig name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goalName">Goal Name:</label>
                        <input
                            type="text"
                            name="goalName"
                            value={this.state.goalName}
                            onChange={this.onChange}
                            className="mm-popup__input"
                            placeholder="Enter goal name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goalAmount">Goal Amount:</label>
                        <input
                            type="number"
                            name="goalAmount"
                            value={this.state.goalAmount}
                            onChange={this.onChange}
                            className="mm-popup__input"
                            placeholder="Enter goal amount"
                        />
                    </div>
                    <div className="button-group">
                        <button className="prompt-button" onClick={this.handleSave}>Save</button>
                        <button className="prompt-button" onClick={this.props.onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Prompt;
