import * as React from 'react';
import Popover from '@mui/material/Popover';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Tip } from './css'

export const popoverTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "transparent",
        },
      },
    },
  },
})

export const Pop = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return <>
    <i
      className='icon-question'
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
    </i>
    <ThemeProvider theme={popoverTheme}>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {/* <Typography sx={{ p: 1 }}>I use Popover.</Typography> */}
        <Tip>
          <p style={{ marginBottom: '5px' }}>
            Rule Description:
          </p>
          <p className='item'>
            <strong>1.</strong> Get 4% commision by inviting your friends to purchase and successfully claim NFT.
          </p>
          <p className='item'>
            <strong>2.</strong> Commission withdrawal will open after the end of the current presale.
          </p>
          <p className='item'>
            <strong>3.</strong> USDT withdrawals support BSC address, ICP withdrawals support Dfinity address.
          </p>
          <p className='item'>
            <strong>4.</strong> The minimum amount of withdrawals: USDT ≥ 1U; ICP ≥ 0.1ICP.
          </p>
          <p className='item'>
            <strong>5.</strong> Withdrawal fee: USDT 1U/time; ICP 0.1ICP/time.
          </p>
        </Tip>
      </Popover>
    </ThemeProvider>
  </>
}

export default Pop
