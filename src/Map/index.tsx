import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';
import { useSelector } from 'react-redux'
import { CustomMarker } from './state'
import { RootState } from '../store'
import styled from "styled-components";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface MarkerPointProps {
  marker: CustomMarker
  onSelect: Function
}

const StyledMarker = styled(Marker)`
  cursor: pointer;
`

const MarkerPoint = ({marker, onSelect}: MarkerPointProps) => {
  const { name, coordinates } = marker

  return (
    <StyledMarker
      key={name}
      coordinates={coordinates}
      onClick={() => onSelect(marker)}
    >
      <circle r={8} fill="#F00" stroke="#fff" strokeWidth={2} />
    </StyledMarker>
  )
}

const MapChart = ({ onSelect }: { onSelect: Function }) => {
  const points: Array<CustomMarker> = useSelector((state: RootState) => state.map.locations.items)
  const loading: boolean = useSelector((state: RootState) => state.map.locations.loading)

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
        }
      </Geographies>
      {!loading && points.map((marker) => (
        <MarkerPoint
          key={marker.name}
          marker={marker}
          onSelect={onSelect}
        />
      ))}
    </ComposableMap>
  );
};

export default MapChart;
