import React from 'react';
import FlexView from 'react-flexview';
import './Dropdown.css';

function Dropdown(props) {

    // console.log('current value: ' + props.value);

    return (
        <FlexView>
            <label htmlFor={props.label}>{props.label}</label>

            <select name={props.label} id={props.label} value={props.value} onChange={(event) => props.onChange(event.target.value)}>
                {/* <option value="main">main</option>
                <option value="hack">hack</option>
                <option value="countdown">countdown</option>
                <option value="temperature">temperature</option>
                <option value="code">code</option>
                <option value="win">win</option> */}
                {props.values.map((value, index) => <option key={value} value={value}>{value}</option>)}
            </select>
        </FlexView>
    );
}

export default Dropdown;
