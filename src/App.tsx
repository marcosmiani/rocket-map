import React, { useState } from "react";
import MapChart from "./Map";

import styled from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { CustomMarker } from './Map/state'
import SearchForm from './Search';
import MarkerDetail from './Details';

const store = createStore()

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #282c34;
  overflow: hidden;
`


function App() {
  const [markerDetails, setShowMarkerDetails] = useState<CustomMarker | null>(null)

  return (
    <Provider store={store}>
      <Wrapper>
        <SearchForm />
        <MapChart onSelect={setShowMarkerDetails} />
        {markerDetails && < MarkerDetail markerDetails={markerDetails} />}
      </Wrapper>
    </Provider>
  );
}

export default App;
