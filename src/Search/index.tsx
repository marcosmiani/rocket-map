import React from 'react';
import styled from 'styled-components';
import { searchLaunches } from '../Map/state';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'

const Header = styled.header`
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Button = styled.button`
  height: 25px;
  background-color: darkgreen;
  border: 0;
  border-radius: 4px;
  color: white;
`

function SearchForm() {
  const dispatch = useDispatch()
  const loading: boolean = useSelector((state: RootState) => state.map.locations.loading)
  return (
    <Header>
      <Button data-testid='search-button' disabled={loading} onClick={() => dispatch(searchLaunches()) }>
        Search
      </Button>
    </Header>
  );
}

export default SearchForm;
