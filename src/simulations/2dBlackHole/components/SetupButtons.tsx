import { Stack, Button } from '@mui/material';

interface SetupButtonsProps {
  onSetup1: () => void;
  onSetup2: () => void;
  onSetup3: () => void;
  onSetup4: () => void;
}

export const SetupButtons = ({ onSetup1, onSetup2, onSetup3, onSetup4 }: SetupButtonsProps) => {
  return (
    <div>
      <Stack direction="row" spacing={2} style={{ marginBottom: 12, width: '100%' }}>
        <Button
          variant="outlined"
          onClick={onSetup1}
          style={{ height: 40, flex: 1 }}
        >
          Rays 1
        </Button>
        <Button
          variant="outlined"
          onClick={onSetup2}
          style={{ height: 40, flex: 1 }}
        >
          Rays 2
        </Button>
        <Button
          variant="outlined"
          onClick={onSetup3}
          style={{ height: 40, flex: 1 }}
        >
          Rays 3
        </Button>
        <Button
          variant="outlined"
          onClick={onSetup4}
          style={{ height: 40, flex: 1 }}
        >
          Rays 4
        </Button>
      </Stack>
    </div>
  );
};
