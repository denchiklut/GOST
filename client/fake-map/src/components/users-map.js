import React, {Component} from 'react';

class UsersMap extends Component {

    map
    content
    userImg
    overlay

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    updateCoordinate = (user) => {
        var coord = window.ol.proj.fromLonLat([user.geometry.coordinates[0], user.geometry.coordinates[1]])

        this.userImg.setAttribute("src", user.properties.avatar)
        this.content.innerText =  user.properties.userName +': '+ user.properties.email;
        this.overlay.setPosition(coord);

        this.map.getView().setZoom(5);
        this.map.getView().setCenter(window.ol.proj.fromLonLat([...coord], 'EPSG:4326', 'EPSG:3857'))
    }

    componentDidMount() {
        let markers = []
        let container = document.getElementById('popup');
        this.content = document.getElementById('popup-content');
        this.userImg = document.getElementById('popImg');
        let closer = document.getElementById('popup-closer');

       this.overlay = new window.ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        closer.onclick = () => {
            this.overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        const baseMapLayer = new window.ol.layer.Tile({
            source: new window.ol.source.OSM()
        });

            this.map = new window.ol.Map({
            target: 'map',
            layers: [ baseMapLayer],
            overlays: [this.overlay],
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
                userName: user.properties.userName,
                userEmail: user.properties.email,
                userAvatar: user.properties.avatar,
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

        this.map.addLayer(markerVectorLayer);

        this.map.on("click", (evt) => {
            this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {

                let userData = feature.getProperties();
                let coord = userData.geometry.flatCoordinates;

                this.userImg.setAttribute("src", userData.userAvatar)
                this.content.innerText =  userData.userName +': '+ userData.userEmail;
                this.overlay.setPosition(coord);
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        this.updateCoordinate(nextProps.zoom)
    }

    render() {
        return (
            <div>
                <div id="map" />
                <div id="popup" className="ol-popup">
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/larrybolt/128.jpg" alt="user" id="popImg"/>
                    <a href="#" id="popup-closer" className="ol-popup-closer"/>
                    <div id="popup-content" />
                </div>
            </div>
        )
    }
}

export default UsersMap;
