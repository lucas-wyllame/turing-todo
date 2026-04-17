import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";

type CustomTextFieldProps = {
  label: string;
  height: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TextFieldProps;

export function CustomTextField({
  label,
  height,
  multiline = false,
  rows = 1,
  value,
  required = false,
  onChange,
}: CustomTextFieldProps) {
  return (
    <TextField
      autoFocus
      required={required}
      margin="dense"
      name="taskTitle"
      label={label}
      type="text"
      fullWidth
      variant="outlined"
      rows={rows}
      multiline={multiline}
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
