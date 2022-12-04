import React, { Component } from "react";

// import { Stage, Layer, Image } from "react-konva";
// import useImage from "use-image";


import KonvaCanvas from './component/sim.js'

// // the first very simple and recommended way:
// const LionImage = () => {
//   const [image] = useImage("https://konvajs.org/assets/lion.png");
//   return <Image image={image} />;
// };



const App = () => (
  <KonvaCanvas/>
)

export default App;
