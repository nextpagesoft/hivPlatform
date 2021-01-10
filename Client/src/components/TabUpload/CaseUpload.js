import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Btn from '../Btn';
import UploadProgressBar from '../UploadProgressBar';
import MessageAlert from '../MessageAlert';
import FormatBytes from '../../utilities/FormatBytes';

const userStyles = makeStyles({
  header: {
    width: 142,
    fontWeight: 'bold'
  },
  content: {
    maxWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
});

const CaseUpload = (props) => {
  const { appMgr } = props;
  const classes = userStyles();

  React.useEffect(
    () => {
      appMgr.unbindShinyInputs();
      if (appMgr.shinyReady) {
        Shiny
          .inputBindings.bindingNames['shiny.reactCaseBasedFileInputBinding']
          .binding.subscribe('#caseUploadBtn');
      }
      appMgr.bindShinyInputs();

      return () => appMgr.unbindShinyInputs();
    }
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color='textSecondary'>
          Upload case-based data
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <input style={{ display: 'none' }} id='caseUploadBtn' className='uploadBtn' type='file' />
        <Tooltip title='Select case-based data file'>
          <label htmlFor='caseUploadBtn'>
            <Btn style={{ marginBottom: 6 }}><CloudUploadIcon />&nbsp;Upload data</Btn>
          </label>
        </Tooltip>
        <Typography variant='body2' color='textSecondary'>
          Maximum file size: 70MB<br />
          Supported files types: rds, txt, csv, xls, xlsx (uncompressed and zip archives)
        </Typography>
        <UploadProgressBar progress={appMgr.caseBasedDataMgr.fileUploadProgress} />
        <MessageAlert
          status={appMgr.caseBasedDataMgr.fileUploadStatus}
          msg={appMgr.caseBasedDataMgr.fileUploadMsg}
        />
      </Grid>
      <Grid item xs={9}>
        <Paper style={{ padding: 10 }}>
          <Typography variant='overline'>Uploaded file details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Table>
                <TableBody>
                  <TableRow hover>
                    <TableCell className={classes.header}>File name</TableCell>
                    <TableCell className={classes.content}>{appMgr.caseBasedDataMgr.fileName}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell className={classes.header}>File path</TableCell>
                    <TableCell className={classes.content}>{appMgr.caseBasedDataMgr.filePath}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell className={classes.header}>File size</TableCell>
                    <TableCell className={classes.content}>{FormatBytes(appMgr.caseBasedDataMgr.fileSize)}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell className={classes.header}>File type</TableCell>
                    <TableCell className={classes.content}>{appMgr.caseBasedDataMgr.fileType}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell className={classes.header}>Number of records</TableCell>
                    <TableCell className={classes.content}>{appMgr.caseBasedDataMgr.recordCount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={6}>
              <Table>
                <TableBody>
                  <TableRow hover><TableCell className={classes.header}>Column names</TableCell></TableRow>
                  <TableRow hover><TableCell style={{ whiteSpace: 'normal' }} className={classes.content}>
                    <div style={{ overflow: 'auto', maxHeight: 164 }}>
                      {appMgr.caseBasedDataMgr.columnNamesString}
                    </div>
                  </TableCell></TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(CaseUpload);
