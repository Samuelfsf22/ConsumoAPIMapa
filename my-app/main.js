import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { coordernadas } from './js/funcoesBtns';

export const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [-5370514.729357056, -1815697.8224010612],
    zoom: 4,
    maxZoom: 15,
    minZoom: 4
  })
});

map.on('click', (e) =>{
  console.log(e.coordinate)
})