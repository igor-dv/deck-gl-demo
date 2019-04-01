import React from 'react';
import DeckGL, { IconLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const pngSource = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png';

const icon2 = {
    url: pngSource,
    height: 300,
    width: 300,
};

function randomEntities(numberOfItems) {
    const entities = [];

    for (let i = 0; i < numberOfItems; i++) {
        const x = Math.random() * 360 - 180;
        const y = Math.random() * 180 - 90;
        const coordinates = [x, y];

        entities.push({ coordinates });
    }

    return entities;
}

export class Map extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            viewPort: {
                latitude: 49.254,
                longitude: -123.13,
                zoom: 2,
                maxZoom: 16,
                pitch: 0,
                bearing: 0,
            },
            mapStyle: {
                version: 8,
                sources: {
                    osm: {
                        type: 'raster',
                        tiles: ['a', 'b', 'c'].map(sub => `https://${sub}.tile.openstreetmap.org/{z}/{x}/{y}.png`),
                    },
                },
                layers: [
                    {
                        id: 'osm',
                        source: 'osm',
                        type: 'raster',
                    },
                ],
            }
        };
    }

    componentDidMount() {
        setInterval(() => {
            let { entities } = this.state;
    
            if (!entities) {
                entities = randomEntities(200);
            } else {
                entities = [...entities, ...randomEntities(1)];
            }
    
            this.setState({
                entities,
                testLayes: [new IconLayer({
                    id: 'test',
                    pickable: true,
                    wrapLongitude: true,
                    getPosition: item => item.coordinates,
                    data: entities,
                    getIcon: () => icon2,
                    sizeScale: 100,
                    getSize: 1,
                })],
            });
        }, 1000);
    }

    render() {
        const { mapStyle, viewPort, testLayes = [] } = this.state;

        return (
            <DeckGL
                controller
                width="100%"
                height="100%"
                initialViewState={viewPort}
                layers={testLayes}
            >
                {mapStyle && (
                    <StaticMap
                        reuseMaps
                        preventStyleDiffing
                        mapStyle={mapStyle}
                    />
                )}
            </DeckGL>
        );
    }
}
