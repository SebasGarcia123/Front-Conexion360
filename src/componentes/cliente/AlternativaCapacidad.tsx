import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
} from '@mui/material'

interface AlternativaCapacidadProps {
    value: string[]
    onChange: (valores: string[]) => void
}

export default function AlternativaCapacidad({
    value,
    onChange,
}: AlternativaCapacidadProps) {
    const capacityOptions = ['1', 'Entre 2 y 15', 'Entre 16 y 30', 'Más de 30']

    const handleToggle = (range: string) => {
        let updated: string[]

        if (value.includes(range)) {
            updated = value.filter((r) => r !== range)
        } else {
            updated = [...value, range]
        }

        onChange(updated) // 👈 devolvemos al padre
    }

    return (
        <FormControl sx={{ margin: 2 }}>
            <FormLabel sx={{ marginBottom: 1 }}>Capacidad</FormLabel>

            {capacityOptions.map((range) => (
                <FormControlLabel
                    key={range}
                    control={
                        <Checkbox
                            checked={value.includes(range)}
                            onChange={() => handleToggle(range)}
                        />
                    }
                    label={range}
                />
            ))}
        </FormControl>
    )
}
