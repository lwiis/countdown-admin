import React from 'react';
import FlexView from 'react-flexview';
import Slider from 'react-input-slider';
import './CustomSlider.css';

function CustomSlider(props) {

    return (
        <FlexView column>
            <label>{props.label} ({props.value})</label>
            <Slider
                axis="x"
                xmax={30}
                xmin={20}
                xstep={1}
                x={props.value}
                onChange={({x})=>{
                    console.log(props.label + ' updated to ' + x);
                    props.onChange(x);
                }}
            />
        </FlexView>
    );
}

export default CustomSlider;
