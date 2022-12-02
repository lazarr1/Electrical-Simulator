import React, { Component } from "react";
import { Stage, Layer, Image } from "react-konva";
import URLImage from "./images.js";

import resistor from './images/resistor.png'
import current_source from './images/current_source.png'

const KonvaCanvas = () => {

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <URLImage src={current_source} x={150} width = {100} height = {80} />
        </Layer>
        <Layer>
            <URLImage src = {resistor} x={15} width = {100} height = {150}/>  
        </Layer>
      </Stage>
    );

}


export default KonvaCanvas;