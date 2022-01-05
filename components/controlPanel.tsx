import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';

type ControlPanelProps = {
  refetchData: any;
}

const ControlPanel = ({refetchData}:ControlPanelProps) => {
  // const classes = useStyles()

  return (
    <div 
        style={{
            position: 'fixed',
            left: '2vw',
            bottom: '2vw'}}
        onClick={refetchData}
    >
      <Fab
        color='primary'
        aria-label='refetch data'
        size='small'
      >
        <RefreshIcon />
      </Fab>
    </div>
  );
};

export default ControlPanel;
