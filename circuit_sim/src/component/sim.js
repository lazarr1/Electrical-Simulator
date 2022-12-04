import React, { Component, useState, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import {URLImage, ImageToolbox} from "./images.js";

import resistor from './images/resistor.png'
import current_source from './images/current_source.png'





const KonvaCanvas = () => {
  const [components, setComponents] = useState([]);

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>

          {components.map(eachComponent => {
            console.log("test");
            return <URLImage
              key = {eachComponent.key}
              src = {eachComponent.src}
              x={eachComponent.x}
              y = {100}
              width={eachComponent.width}
              height = {eachComponent.height}
            />
            })}
            
        </Layer>
        <Layer>
            <ImageToolbox src = {resistor} x={15} width = {100} height = {150} items={components} update={setComponents}/>  
            <ImageToolbox src={current_source} x={150} width = {100} height = {80} items={components} update={setComponents}/>
        </Layer>
      </Stage>
    );

}


export default KonvaCanvas;