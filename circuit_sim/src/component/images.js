import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import resistor from './images/resistor.png'



import current_source from './images/current_source.png'



//This will be images on the map stage, the toolbox images must be static

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
export class URLImage extends React.Component {
    state = {
      image: null
    };
    componentDidMount() {
      this.loadImage();
    }
    componentDidUpdate(oldProps) {
      if (oldProps.src !== this.props.src) {
        this.loadImage();
      }
    }
    componentWillUnmount() {
      this.image.removeEventListener("load", this.handleLoad);
    }
    loadImage() {
      // save to "this" to remove "load" handler on unmount
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener("load", this.handleLoad);
    }
    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.setState({
        image: this.image
      });
      // if you keep same image object during source updates
      // you will have to update layer manually:
      // this.imageNode.getLayer().batchDraw();
    };

    handleClick = () => {
        console.log("test");
        <URLImage src={current_source} x={150} width = {100} height = {80} />
    }

    render() {
      return (
        <Image
          x={this.props.x}
          y={this.props.y}
          width={this.props.height}
          height={this.props.width}
          image={this.state.image}
          draggable
          onClick={this.handleClick}
          ref={(node) => {
            this.imageNode = node;
          }}
        />
      );
    }
}


export class ImageToolbox extends URLImage{
    handleClick = () => {

      var img = {
        // key : img,
        src : this.props.src,
        x : this.props.x,
        y : 100,
        width : this.props.width,
        height : this.props.height
      }



      var items = this.props.items;

      this.props.update(prevComponents => {
        return [...prevComponents, img];
      });

    }

    render() {
        return (
          <Image
            x={this.props.x}
            y={this.props.y}
            width={this.props.height}
            height={this.props.width}
            image={this.state.image}
            onClick={this.handleClick}
            ref={(node) => {
              this.imageNode = node;
            }}
          />
        );
      }
}

export default URLImage

