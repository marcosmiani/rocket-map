import React from "react";
import styled from 'styled-components';
import { CustomMarker } from '../Map/state'

const Name = styled.div`
  display: block;
  font-weight: 800;
  padding-bottom: 8px;
`

const Agencies = styled.div`
  display: block;
`

const Agency = styled.div`
  display: block;
  padding-left: 16px;
`

const MarkerDetail = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: white;
  color: black;
  min-width: 150px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 4px;
`

function Details({ markerDetails }: {markerDetails: CustomMarker}) {
  return (
    <MarkerDetail>
      <Name>{markerDetails.name}</Name>
      <Agencies>
        Agencies:
        {markerDetails.agencies.map((agency: {id: number, name: string}) => (
          <Agency key={agency.id}>{agency.name}</Agency>
        ))}
      </Agencies>
    </MarkerDetail>
  );
}

export default Details;
