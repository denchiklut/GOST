import React, {Component} from 'react';

class UsersMap extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    componentDidMount() {
        let markers = []

        const baseMapLayer = new window.ol.layer.Tile({
            source: new window.ol.source.OSM()
        });

        const map = new window.ol.Map({
            target: 'map',
            layers: [ baseMapLayer],
            view: new window.ol.View({
                center: window.ol.proj.fromLonLat([-89.935242, 45.730610]),
                zoom: 4
            })
        });

        this.props.data.map(user => {
            //Adding a marker on the map
            const marker = new window.ol.Feature({
                geometry: new window.ol.geom.Point(
                    window.ol.proj.fromLonLat([user.geometry.coordinates[0], user.geometry.coordinates[1]])
                ),
            });

            marker.setStyle(new window.ol.style.Style({
                image: new window.ol.style.Icon(({
                    color: user.properties.color,
                    crossOrigin: 'anonymous',
                    src: 'img/dot.png'
                }))
            }));
            markers.push(marker)
        })

        const vectorSource = new window.ol.source.Vector({
            features: [...markers]
        });

        const markerVectorLayer = new window.ol.layer.Vector({
            source: vectorSource,
        });

        map.addLayer(markerVectorLayer);
    }

    render() {
        return  <div id="map" />
    }
}

export default UsersMap;
