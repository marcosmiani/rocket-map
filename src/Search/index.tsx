import React from 'react';
import styled from 'styled-components';
import { searchLaunches } from '../Map/state';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'

import { fromActions, toActions } from './state'

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
  const from: string = useSelector((state: RootState) => state.search.from)
  const to: string = useSelector((state: RootState) => state.search.to)

  return (
    <Header>
      <input type="date" name="date-from"
        value={from}
        max={to}
        onChange={(e) => dispatch(fromActions.set(e.target.value))}
      />
      <input type="date" name="date-to"
        value={to}
        min={from}
        onChange={(e) => dispatch(toActions.set(e.target.value))}
      />
      <Button data-testid='search-button' disabled={loading} onClick={() => dispatch(searchLaunches()) }>
        Search
      </Button>
    </Header>
  );
}

export default SearchForm;
