import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const OriginGroupingRow = (props) => {
  const { i, isSelected, originGroup:el, appManager } = props;

  const unusedFullRegionsOfOrigin = appManager.unusedFullRegionsOfOrigin;
  const menuItems = el.FullRegionsOfOrigin.concat(unusedFullRegionsOfOrigin);

  const handleGroupedRegionOfOriginChange = e => {
    appManager.setGroupedRegionOfOrigin(i, e.target.value);
  };

  const handleFullRegionsOfOriginChange = e => {
    appManager.setFullRegionsOfOrigin(i, e.target.value);
  };

  console.log(i, isSelected);

  return (
    <TableRow hover role='checkbox'>
      <TableCell padding='checkbox'>
        <Checkbox
          inputProps={{ 'aria-labelledby': `labelId${i}` }}
          color='primary'
          checked={isSelected}
        />
      </TableCell>
      <TableCell id={`labelId${i}`} scope='row' padding='none'>
        <Input
          style={{ width: '100%', fontSize: '0.75rem' }}
          value={el.GroupedRegionOfOrigin}
          onChange={handleGroupedRegionOfOriginChange}
        />
      </TableCell>
      <TableCell style={{ padding: '4px 16px 0px 16px', maxWidth: 300 }}>
        <Select
          multiple
          renderValue={selected => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map(value => (
                <Chip key={value} label={value} style={{ margin: 2 }} />
              ))}
            </div>
          )}
          value={el.FullRegionsOfOrigin}
          style={{ width: '100%', fontSize: '0.75rem' }}
          onChange={handleFullRegionsOfOriginChange}
          disableUnderline
        >
          {
            menuItems.map((el2, j) => (
              <MenuItem key={j} value={el2} dense>{el2}</MenuItem>
            ))
          }
        </Select>
      </TableCell>
      <TableCell align='right'>{el.GroupedRegionOfOriginCount}</TableCell>
    </TableRow>
  )
};

export default observer(OriginGroupingRow);