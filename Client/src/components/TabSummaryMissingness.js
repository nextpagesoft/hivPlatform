import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import MissChart from './MissChart';
import AreaChart from './AreaChart';

const TabSummaryMissingness = (props) => {
  const { appMgr } = props;

  const handleDataSelection = (e) => appMgr.summaryDataMgr.setMissPlotSelection(e.target.value);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant='h6'>
          Missing data summary: key variables
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='body2' color='textSecondary'>
          Percentages of cases for which the information was not available (missing) for one or
          more of the key variables: CD4 count, transmission category, migrant status or age.
        </Typography>
        <FormControl component='fieldset'>
          <RadioGroup
            name='missDataSelection'
            value={appMgr.summaryDataMgr.missPlotSelection}
            onChange={handleDataSelection}
          >
            <FormControlLabel
              value='all'
              control={<Radio color='primary' size='small' />}
              label='All'
            />
            <FormControlLabel
              value='female'
              control={<Radio color='primary' size='small' />}
              label='Female'
            />
            <FormControlLabel
              value='male'
              control={<Radio color='primary' size='small' />}
              label='Male'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={10}>
        <Paper style={{ padding: 10 }}>
          <Grid container>
            <Grid item xs={12}>
              <MissChart
                xCategories={appMgr.summaryDataMgr.missPlotData.plot1.chartCategories}
                data1={appMgr.summaryDataMgr.missPlot1Series}
                data2={appMgr.summaryDataMgr.missPlot2Series}
                data3={appMgr.summaryDataMgr.missPlot3Series}
              />
            </Grid>
            <Grid item xs={12}>
              <AreaChart
                yLabelName='Proportion of missing values'
                xCategories={appMgr.summaryDataMgr.missPlot4Categories}
                data={appMgr.summaryDataMgr.missPlot4Series}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  )
};

export default observer(TabSummaryMissingness);
