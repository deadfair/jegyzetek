import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Attribution, defaults as defaultControls} from 'ol/control';


const attribution = new Attribution({  // const small = map.getSize()[0] < 600; 
  collapsible: false,                  // attribution.setCollapsible(small);  attribution.setCollapsed(small); // visszaugrik ha resize re tesszük 
});

const view = new View({   // const view = map.getView();   view.setZoom(3);
  center: [0, 0],
  zoom: 3,                // const zoom = view.getZoom();
  maxZoom: 18,
  minZoom: 1,
  rotation
});

const source = new VectorSource({           // const feature = source.getFeatures()[0]; const polygon = feature.getGeometry();
  url: 'data/geojson/switzerland.geojson',  // const feature = source.getFeatures()[1]; const point = feature.getGeometry();
  format: new GeoJSON(),                    // view.fit((polygon | point), {padding: [170, 50, 30, 150]}, minResolution?: 50); // odaugrik ezekkel a paddingokkal
});                                         // const size = map.getSize(); view.centerOn(point.getCoordinates(), size, [570, 500]); // odaugrik arra a koordinátára

const vectorLayer = new VectorLayer({
  source,
  style: {
    'fill-color': 'rgba(255, 255, 255, 0.6)',
    'stroke-width': 1,
    'stroke-color': '#319FD3',
    'circle-radius': 5,
    'circle-fill-color': 'rgba(255, 255, 255, 0.6)',
    'circle-stroke-width': 1,
    'circle-stroke-color': '#319FD3',
  },
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorLayer     
  ],
  controls: defaultControls({attribution: false}).extend([attribution]),
  target: 'map', // id ahova
  view
});


{/* <a class="skiplink" href="#map">Go to map</a>
<div id="map" class="map" tabindex="0"></div>
*/}









// kihagyva : 
// Animated GIF
