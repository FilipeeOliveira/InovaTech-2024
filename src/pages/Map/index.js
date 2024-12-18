import React from "react";
import { Marker } from "react-native-maps";
import { Linking, View, Image } from "react-native";

import { Container, MapContainer } from "./MapStyles";

import customMarkerIcon from "../../../assets/fire-icon.png";

function Map() {
  const points = [
    { latitude: -3.0941363, longitude: -60.0252695 },
    { latitude: -3.1043615, longitude: -60.0145238 },
    { latitude: -2.9997657, longitude: -60.0049856 },
    { latitude: -3.012489969576139, longitude: -60.06852374425434 },
    { latitude: -3.0813608232112975, longitude: -60.00545582840806 },
  ];

  const handleOpenNavigationApp = (latitude, longitude) => {
    const iosUrl = `maps://app?saddr=Current%20Location&daddr=${latitude},${longitude}`;
    const androidUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.canOpenURL(iosUrl).then((supported) => {
      if (supported) {
        Linking.openURL(iosUrl);
      } else {
        Linking.openURL(androidUrl);
      }
    });
  };

  return (
    <Container>
      <MapContainer
        initialRegion={{
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            title={`Point ${index + 1}`}
            onPress={() =>
              handleOpenNavigationApp(point.latitude, point.longitude)
            }
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={customMarkerIcon}
                style={{ width: 32, height: 32 }} // Ajuste de tamanho
                resizeMode="contain"
              />
            </View>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
}

export default Map;
