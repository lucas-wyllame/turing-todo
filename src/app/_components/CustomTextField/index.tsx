import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";

type CustomTextFieldProps = {
  label: string;
  height: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TextFieldProps;

export function CustomTextField({ label, height, multiline = false, rows = 1, value, onChange }: CustomTextFieldProps) {
  return (
    <TextField
      autoFocus
      required
      margin="dense"
      // id="name"
      name="taskTitle"
      label={label}
      type="text"
      fullWidth
      variant="outlined"
      rows={rows}
      multiline={multiline}
      // className="mt-2 mb-1"
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          className: `${height} before:mb-[5px] after:mb-[5px]`,
        },
      }}
    />
  );
}
