import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import { ToggleButton } from 'primereact/togglebutton';
export default function VentanaDetalles({ data }) {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    return (
        <div>
            <h5>Basic</h5>
                <ToggleButton checked={checked1} onChange={(e) => setChecked1(e.value)} onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" />
           <Knob value={25}  />
        </div>
    )

}