import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





export default function MultipleSelect(props) {
   
    function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }
    const names = props.names?props.names:[]
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

 

  return (
    <div>
      <FormControl fullWidth >
        <InputLabel className={props.labelclass} id="demo-multiple-name-label">{props.labelName}</InputLabel>
        <Select
        className={props.class}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          
         value={props.categoriaName}
          onChange={props.handleChangecategoria}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}