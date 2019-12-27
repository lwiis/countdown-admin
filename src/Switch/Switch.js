import React from 'react';
import FlexView from 'react-flexview';
import Toggle from 'react-toggle';
import "react-toggle/style.css"
import './Switch.css';

const Switch = (props) => {    
    return (
      <FlexView>
        <label htmlFor='Running'>{props.label}</label>&nbsp;
        <Toggle
          id={props.label}
          checked={props.value}
          onChange={(event) => {
            console.log(props.label + ' updated to ' + event.target.checked);
            props.onChange(event.target.checked);
            }} />
      </FlexView>
    );
};

export default Switch;