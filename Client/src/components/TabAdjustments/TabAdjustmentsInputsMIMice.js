import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const TabAdjustmentsInputsMIMice = (props) => {
  const { appMgr } = props;

  const handleMIMiceNimpChange = (e) => appMgr.adjustMgr.setMIMiceNimp(e.target.value);
  const handleMIMiceNimpBlur = (e) =>
    appMgr.adjustMgr.setMIMiceNimp(Math.min(Math.max(e.target.value, 2), 50));

  const handleMIMiceNitChange = (e) => appMgr.adjustMgr.setMIMiceNit(e.target.value);
  const handleMIMiceNitBlur = (e) =>
    appMgr.adjustMgr.setMIMiceNit(Math.min(Math.max(e.target.value, 2), 50));

  const handleMIMiceNsdfChange = (e, value) => appMgr.adjustMgr.setMIMiceNsdf(value);
  const handleMIMiceImputeRDChange = (e, value) => appMgr.adjustMgr.setMIMiceImputeRD(value);
  const handleMIRestoreDefaults = (e) => appMgr.adjustMgr.restoreMIDefaults('mice');

  return (
    <React.Fragment>
      <Typography variant='overline'>Chained Equations - MICE parameters</Typography>
      <form noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label='Number of imputations'
              helperText='Type the number of data sets to input'
              type='number'
              value={appMgr.adjustMgr.miMiceSettings.nimp}
              onChange={handleMIMiceNimpChange}
              onBlur={handleMIMiceNimpBlur}
              fullWidth
              InputProps={{
                inputProps: {
                  min: 2, max: 50
                }
              }}
              sx={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label='Number of mice iterations'
              helperText='Type the number of mice iterations'
              type='number'
              value={appMgr.adjustMgr.miMiceSettings.nit}
              onChange={handleMIMiceNitChange}
              onBlur={handleMIMiceNitBlur}
              fullWidth
              InputProps={{
                inputProps: {
                  min: 2, max: 50
                }
              }}
              sx={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography id="discrete-slider" gutterBottom>
              Number of degrees of freedom for spline of diagnosis calendar year
            </Typography>
            <Slider
              min={3}
              max={5}
              value={appMgr.adjustMgr.miMiceSettings.nsdf}
              onChange={handleMIMiceNsdfChange}
              marks={[{ value: 3, label: 3 }, { value: 4, label: 4 }, { value: 5, label: 5 }]}
            />
          </Grid>
          <Grid item xs={4}>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={appMgr.adjustMgr.miMiceSettings.imputeRD} onChange={handleMIMiceImputeRDChange} name='check' color='primary' />}
                label='Impute reporting delays inputs'
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button color='primary' onClick={handleMIRestoreDefaults}>Restore defaults</Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
};

export default observer(TabAdjustmentsInputsMIMice);
