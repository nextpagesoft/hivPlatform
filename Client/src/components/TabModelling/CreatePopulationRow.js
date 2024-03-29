import React from 'react';
import { observer } from 'mobx-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import FormatPercentage from '../../utilities/FormatPercentage';
import PercentageToShade from '../../utilities/PercentageToShade';

const CreatePopulationRow = (props) => {
  const { i, isSelected, onSelectClick, population: el, appMgr } = props;

  const handleStrataChange = e => {
    appMgr.popMgr.setPopulationVariables(i, e.target.value);
  };

  return (
    <TableRow hover role='checkbox'>
      <TableCell padding='checkbox' sx={{ verticalAlign: 'top' }}>
        <Checkbox
          inputProps={{ 'aria-labelledby': `labelId${i}` }}
          color='primary'
          checked={isSelected}
          onClick={onSelectClick}
        />
      </TableCell>
      <TableCell sx={{ padding: '4px 16px 0px 16px', maxWidth: '300px', verticalAlign: 'top' }}>
        <Select
          multiple
          renderValue={selected => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map(value => (
                <Chip key={value} label={value} sx={{ margin: '2px' }} color='secondary' />
              ))}
            </div>
          )}
          value={el.variables}
          style={{ width: '100%', fontSize: '0.75rem' }}
          onChange={handleStrataChange}
        >
          {
            appMgr.popMgr.availableVariables.map((el2, j) => (
              <MenuItem key={j} value={el2.Name} dense>{`${el2.Name} (${el2.Code})`}</MenuItem>
            ))
          }
        </Select>
      </TableCell>
      <TableCell>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {el.strata.map((el2) => (
            <Chip
              key={el2.Combination}
              label={`${el2.Combination} (${FormatPercentage(el2.Perc)})`}
              style={{
                margin: 2,
                backgroundColor: `${PercentageToShade(el2.Perc, 214)}`
              }}
            />
          ))}
        </div>
      </TableCell>
    </TableRow>
  )
};

export default observer(CreatePopulationRow);
