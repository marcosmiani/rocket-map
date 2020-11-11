import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { searchLaunches } from '../Map/state';
import { RootState } from '../store'
import { fromActions, toActions, getDefaultFrom, getDefaultTo } from './state'

const Header = styled.header`
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  border-radius: 2px;
`

const Dates = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const DateInput = styled.input`
  margin: 0 4px;
  height: 25px;
  font-size: 16px;
  width: 180px;
`

const Button = styled.button`
  height: 30px;
  background-color: darkgreen;
  border: 0;
  border-radius: 2px;
  color: white;
  font-size: 16px;
  padding: 0 16px;
  margin: 16px 0;

  &:disabled {
    background-color: darkgray;
  }
`

function SearchForm() {
  const dispatch = useDispatch()
  const loading: boolean = useSelector((state: RootState) => state.map.locations.loading)
  const from: string = useSelector((state: RootState) => state.search.from)
  const to: string = useSelector((state: RootState) => state.search.to)

  return (
    <Header>
      <Dates>
        <DateInput
          data-testid='date-from'
          name="date-from"
          type="date"
          value={from || getDefaultFrom()}
          max={to}
          onChange={(e) => dispatch(fromActions.set(e.target.value))}
        />
        -
        <DateInput
          type="date"
          name="date-to"
          data-testid="date-to"
          value={to || getDefaultTo()}
          min={from}
          onChange={(e) => dispatch(toActions.set(e.target.value))}
        />
      </Dates>
      <Button data-testid='search-button' disabled={loading} onClick={() => dispatch(searchLaunches()) }>
        Search
      </Button>
    </Header>
  );
}

export default SearchForm;
