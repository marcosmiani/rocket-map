import React, { useState } from "react";
import MapChart from "./Map";

import styled from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { CustomMarker } from './Map/state'
import SearchForm from './Search';

const store = createStore()

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #282c34;
  overflow: hidden;
`

const MarkerDetail = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: black;
  color: white;
`

function App() {
  const [markerDetails, setShowMarkerDetails] = useState<CustomMarker | null>(null)

  return (
    <Provider store={store}>
      <Wrapper>
        <SearchForm />
        <MapChart onSelect={setShowMarkerDetails} />
        {markerDetails && < MarkerDetail>
          {markerDetails.name}
        </MarkerDetail>}
      </Wrapper>
    </Provider>
  );
}

export default App;
