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
          onChange={(event) => props.onChange(event.target.checked)} />
      </FlexView>
    );
};

export default Switch;