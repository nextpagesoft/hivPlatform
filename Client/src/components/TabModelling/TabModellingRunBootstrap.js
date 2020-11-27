import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TabPanel from '../TabPanel';
import Btn from '../Btn';

const ModelRunProgressBar = (props) => {
  const { progress } = props;
  if (progress === null) return null;
  return <LinearProgress color='secondary' variant='determinate' value={progress} />
};


const TabModellingRunBootstrap = props => {
  const { appManager } = props;

  return (
    <TabPanel>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end'>
            <Button size='small' color='primary'>Next step</Button>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Btn disabled={true}><DirectionsRunIcon />&nbsp;Run bootstrap</Btn>
          <Button color='primary' style={{ marginLeft: 20 }}>Cancel</Button>
          <ModelRunProgressBar progress={appManager.bootstrapRunProgress} />
        </Grid>
        <Grid item xs={9}>
          <Paper style={{ padding: 10 }}>
            <Typography variant='overline'>Run log</Typography>
            <pre>
              {appManager.bootstrapRunLog}
            </pre>
          </Paper>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default observer(TabModellingRunBootstrap);