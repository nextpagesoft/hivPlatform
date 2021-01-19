import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TabPanel from '../TabPanel';
import Btn from '../Btn';
import IsNull from '../../utilities/IsNull';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
    marginBottom: 10,
    height: 10,
  }
}));

const AdjustmentsRunProgressBar = (props) => {
  const { progress } = props;
  if (IsNull(progress)) return null;

  const classes = useStyles();

  return <LinearProgress color='secondary' className={classes.root}/>
};

const TabAdjustmentsRun = props => {
  const { appMgr } = props;

  const handleRunAdjustBtnClick = () => {
    appMgr.adjustMgr.runAdjustments();
  }

  const handleCancelAdjustBtnClick = () => {
    appMgr.adjustMgr.cancelAdjustments();
  }

  return (
    <TabPanel>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              size='small'
              color='primary'
              disabled
            >
              Next step
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            Case-based data adjustments run
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Btn
            onClick={handleRunAdjustBtnClick}
            disabled={
              !appMgr.adjustMgr.adjustmentSelected ||
              appMgr.adjustMgr.adjustmentsRunInProgress
            }
          >
            <DirectionsRunIcon />&nbsp;Run adjustments
          </Btn>
          <Button
            onClick={handleCancelAdjustBtnClick}
            color='primary'
            style={{ marginLeft: 20 }}
            disabled={!appMgr.adjustMgr.adjustmentsRunInProgress}
          >
            Cancel
          </Button>
          <AdjustmentsRunProgressBar progress={appMgr.adjustMgr.adjustmentsRunProgress} />
        </Grid>
        <Grid item xs={10}>
          <Paper style={{ padding: 10 }}>
            <Typography variant='overline'>Run log</Typography>
            <pre
              dangerouslySetInnerHTML={{ __html: appMgr.adjustMgr.adjustmentsRunLog }}
              style={{ overflowX: 'auto' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default observer(TabAdjustmentsRun);
