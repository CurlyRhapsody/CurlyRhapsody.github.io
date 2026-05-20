import { Box, Stack, Typography } from '@mui/material';
import { Body1 } from '../../styled/text';

const BALL_COLORS = {
    red: {
      base: '#D9716D',
      gradient: 'radial-gradient(circle at 30% 30%, #F5A9A6 0%, #D9716D 60%, #9E4340 100%)',
      text: '#FFFFFF',
    },
    blue: {
      base: '#4B7185',
      gradient: 'radial-gradient(circle at 30% 30%, #8FAEC2 0%, #4B7185 60%, #2A4554 100%)',
      text: '#FFFFFF',
    },
    green: {
      base: '#8BB16F',
      gradient: 'radial-gradient(circle at 30% 30%, #C3DFAB 0%, #8BB16F 60%, #577A3D 100%)',
      text: '#FFFFFF',
    }
};

const MARK_SIX_COLOR_MAP: { [num: number]: "red" | "blue" | "green" } = {
    1: 'red',   2: 'red',   3: 'blue',  4: 'blue',  5: 'green', 6: 'green',
    7: 'red',   8: 'red',   9: 'blue',  10: 'blue', 11: 'green', 12: 'red',
    13: 'red',  14: 'blue', 15: 'blue', 16: 'green', 17: 'green', 18: 'red',
    19: 'red',  20: 'blue', 21: 'green', 22: 'green', 23: 'red',  24: 'red',
    25: 'blue', 26: 'blue', 27: 'green', 28: 'green', 29: 'red',  30: 'red',
    31: 'blue', 32: 'green', 33: 'green', 34: 'red',  35: 'red',  36: 'blue',
    37: 'blue', 38: 'green', 39: 'green', 40: 'red',  41: 'blue', 42: 'blue',
    43: 'green', 44: 'green', 45: 'red',  46: 'red',  47: 'blue', 48: 'blue',
    49: 'green'
};
  
function getBallColorKey(num: number): "red" | "blue" | "green" {
    return MARK_SIX_COLOR_MAP[num] || 'red';
};

const MarkSixBall = ({ val }: { val: number }) => {
    const colorKey: "red" | "blue" | "green" = getBallColorKey(val);
    const colorScheme = BALL_COLORS[colorKey];

    return (
        <Stack
            sx={{
                width: "3.75rem",
                height: "3.75rem",
                borderRadius: '50%',
                background: colorScheme.gradient,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: '0 0.25rem 0.5rem #0000004D, inset -0.125rem -0.125rem 0.375rem #00000066',
                userSelect: "none",
                position: "relative",
            }}
        >
            {/* Inner white circle backing for the number */}
                <Stack
                    sx={{
                    width: "2.125rem",
                    height: "2.125rem",
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 'inset 0.0625rem 0.0625rem 0.1875rem #00000033',
                    }}
                >
                    <Body1 sx={{ fontWeight: 700, color: '#1A1A1A' }}>{val}</Body1>
                </Stack>
        </Stack>
    );
}

export default MarkSixBall;