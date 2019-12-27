import React from 'react';
import FlexView from 'react-flexview';
import './Dropdown.css';

function Dropdown(props) {

    // console.log('current value: ' + props.value);

    return (
        <FlexView>
            <label htmlFor={props.label}>{props.label}</label>

            <select name={props.label} id={props.label} value={props.value} onChange={(event) => {
                console.log(props.label + ' updated to ' + event.target.value);
                props.onChange(event.target.value);
                }}>
                {props.values.map((value, index) => <option key={value} value={value}>{value}</option>)}
            </select>
        </FlexView>
    );
}

export default Dropdown;
