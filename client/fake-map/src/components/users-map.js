import React, {Component} from 'react';

class UsersMap extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    componentDidMount() {
        let markers = []
        let container = document.getElementById('popup');
        let content = document.getElementById('popup-content');
        let closer = document.getElementById('popup-closer');

        const overlay = new window.ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        closer.onclick = () => {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        const baseMapLayer = new window.ol.layer.Tile({
            source: new window.ol.source.OSM()
        });

        const map = new window.ol.Map({
            target: 'map',
            layers: [ baseMapLayer],
            overlays: [overlay],
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

        map.on('singleclick', (evt) => {
            var coordinate = evt.coordinate;

            content.innerText = 'You clicked here'
            overlay.setPosition(coordinate);
        });
    }

    render() {
        return (
            <div>
                <div id="map" />
                <div id="popup" className="ol-popup">
                    <a href="#" id="popup-closer" className="ol-popup-closer"/>
                    <div id="popup-content" />
                </div>
            </div>
        )
    }
}

export default UsersMap;
