import React, { use, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface DropdownProps {
    onChange: (selectedOptions: string[]) => void;
    placeholder?: string;
    preSelected: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ onChange, placeholder = 'Select an option', preSelected }) => {
    console.log('Preselected:', preSelected);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(preSelected);

    useEffect(() => {
        setSelectedOptions(preSelected);
    }, [preSelected]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedValues = event.target.value as string[];
        setSelectedOptions(selectedValues);
        onChange(selectedValues);
    };

    return (
        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="dropdown-label">{placeholder}</InputLabel>
            <Select
                labelId="dropdown-label"
                id="dropdown"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                renderValue={(selected) => (selected as string[]).join(', ')}
            >
                <MenuItem value="Plastic">Plastic</MenuItem>
                <MenuItem value="Metal">Metal</MenuItem>
                <MenuItem value="Paper">Paper</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Dropdown;
