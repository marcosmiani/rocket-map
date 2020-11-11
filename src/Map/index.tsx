import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
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


const LoadingOverlay = styled.div`
  cursor: wait;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingMessage = styled.div`
  color: white;
  font-size: 16px;
`

const StyledMarker = styled(Marker)`
  cursor: pointer;
`

const MainMap = styled(ComposableMap)`
  margin-top: 100px;
  max-height: calc(100vh - 200px);
`

const MarkerPoint = ({marker, onSelect}: MarkerPointProps) => {
  const { name, coordinates } = marker

  return (
    <StyledMarker
      key={name}
      coordinates={coordinates}
      onClick={() => onSelect(marker)}
    >
      <circle r={4} fill="#F00" stroke="#fff" strokeWidth={2} />
    </StyledMarker>
  )
}

const MapChart = ({ onSelect }: { onSelect: Function }) => {
  const points: Array<CustomMarker> = useSelector((state: RootState) => state.map.locations.items)
  const loading: boolean = useSelector((state: RootState) => state.map.locations.loading)

  return (
    <>
      <MainMap data-testid='map'>
        <ZoomableGroup zoom={1}>
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
        </ZoomableGroup>
      </MainMap>
      {loading && <LoadingOverlay>
        <LoadingMessage>
          Loading data...
        </LoadingMessage>
      </LoadingOverlay>}
    </>
  );
};

export default MapChart;
