const makeNumberField = (key, label, unit, value, options = {}) => ({
    key,
    label,
    unit,
    input: 'number',
    step: options.step ?? 'any',
    min: options.min,
    max: options.max,
    help: options.help ?? '',
    value
});

const makeSelectField = (key, label, value, options) => ({
    key,
    label,
    input: 'select',
    options,
    value
});

const COMPONENT_DEFINITIONS = {
    Resistor: {
        type: 'Resistor',
        displayName: 'Resistor',
        terminals: 2,
        params: { resistance: 100 },
        schema: [makeNumberField('resistance', 'Resistance', 'Ohm', 100, { min: 0.000001 })],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    DCCurrent: {
        type: 'DCCurrent',
        displayName: 'DC Current',
        terminals: 2,
        params: { current: 1 },
        schema: [makeNumberField('current', 'Current', 'A', 1)],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    Capacitor: {
        type: 'Capacitor',
        displayName: 'Capacitor',
        terminals: 2,
        params: { capacitance: 0.1 },
        schema: [makeNumberField('capacitance', 'Capacitance', 'F', 0.1, { min: 0.000000000001 })],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    Inductor: {
        type: 'Inductor',
        displayName: 'Inductor',
        terminals: 2,
        params: { inductance: 0.1 },
        schema: [makeNumberField('inductance', 'Inductance', 'H', 0.1, { min: 0.000000001 })],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    VoltageSource: {
        type: 'VoltageSource',
        displayName: 'DC Source',
        terminals: 2,
        params: { voltage: 1 },
        schema: [makeNumberField('voltage', 'Voltage', 'V', 1)],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    ACVoltageSource: {
        type: 'ACVoltageSource',
        displayName: 'AC Source',
        terminals: 2,
        params: { amplitude: 5, frequency: 60, offset: 0, phase: 0 },
        schema: [
            makeNumberField('amplitude', 'Amplitude', 'V', 5),
            makeNumberField('frequency', 'Frequency', 'Hz', 60, { min: 0 }),
            makeNumberField('offset', 'Offset', 'V', 0),
            makeNumberField('phase', 'Phase', 'deg', 0)
        ],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    VCCS: {
        type: 'VCCS',
        displayName: 'VCCS',
        terminals: 4,
        params: { conductance: 1 },
        schema: [makeNumberField('conductance', 'Transconductance', 'S', 1)],
        nodeLayout: [
            { x: 0, y: 0 },
            { x: 0, y: 80 },
            { x: 40, y: 0 },
            { x: 40, y: 80 }
        ],
        gridAnchor: { x: 0, y: 40 }
    },
    VCVS: {
        type: 'VCVS',
        displayName: 'VCVS',
        terminals: 4,
        params: { gain: 2 },
        schema: [makeNumberField('gain', 'Gain', 'V/V', 2)],
        nodeLayout: [
            { x: 0, y: 0 },
            { x: 0, y: 80 },
            { x: 40, y: 0 },
            { x: 40, y: 80 }
        ],
        gridAnchor: { x: 0, y: 40 }
    },
    Ground: {
        type: 'Ground',
        displayName: 'Ground',
        terminals: 1,
        params: {},
        schema: [],
        nodeLayout: [{ x: 20.5, y: 0 }],
        gridAnchor: { x: 20.5, y: 20.5 }
    },
    FunctionGenerator: {
        type: 'FunctionGenerator',
        displayName: 'Function Gen',
        terminals: 2,
        params: { amplitude: 5, frequency: 60, offset: 0, phase: 0, dutyCycle: 0.5, waveform: 'sine' },
        schema: [
            makeSelectField('waveform', 'Waveform', 'sine', [
                { label: 'Sine', value: 'sine' },
                { label: 'Square', value: 'square' },
                { label: 'Triangle', value: 'triangle' },
                { label: 'Saw', value: 'saw' }
            ]),
            makeNumberField('amplitude', 'Amplitude', 'V', 5),
            makeNumberField('frequency', 'Frequency', 'Hz', 60, { min: 0 }),
            makeNumberField('offset', 'Offset', 'V', 0),
            makeNumberField('phase', 'Phase', 'deg', 0),
            makeNumberField('dutyCycle', 'Duty Cycle', '', 0.5, { min: 0.01, max: 0.99 })
        ],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    Diode: {
        type: 'Diode',
        displayName: 'Diode',
        terminals: 2,
        params: { forwardVoltage: 0.7, onResistance: 0.01, offResistance: 1000000000 },
        schema: [
            makeNumberField('forwardVoltage', 'Forward Voltage', 'V', 0.7),
            makeNumberField('onResistance', 'On Resistance', 'Ohm', 0.01, { min: 0.000001 }),
            makeNumberField('offResistance', 'Off Resistance', 'Ohm', 1000000000, { min: 1 })
        ],
        nodeLayout: [{ x: 20.5, y: 0 }, { x: 20.5, y: 80 }],
        gridAnchor: { x: 20.5, y: 40 }
    },
    NMOS: {
        type: 'NMOS',
        displayName: 'NMOS',
        terminals: 3,
        params: { threshold: 2.5, onResistance: 0.05, offResistance: 1000000000 },
        schema: [
            makeNumberField('threshold', 'Threshold', 'V', 2.5),
            makeNumberField('onResistance', 'On Resistance', 'Ohm', 0.05, { min: 0.000001 }),
            makeNumberField('offResistance', 'Off Resistance', 'Ohm', 1000000000, { min: 1 })
        ],
        nodeLayout: [{ x: 0, y: 40 }, { x: 40, y: 0 }, { x: 40, y: 80 }],
        gridAnchor: { x: 0, y: 40 }
    },
    PMOS: {
        type: 'PMOS',
        displayName: 'PMOS',
        terminals: 3,
        params: { threshold: 2.5, onResistance: 0.05, offResistance: 1000000000 },
        schema: [
            makeNumberField('threshold', 'Threshold', 'V', 2.5),
            makeNumberField('onResistance', 'On Resistance', 'Ohm', 0.05, { min: 0.000001 }),
            makeNumberField('offResistance', 'Off Resistance', 'Ohm', 1000000000, { min: 1 })
        ],
        nodeLayout: [{ x: 0, y: 40 }, { x: 40, y: 0 }, { x: 40, y: 80 }],
        gridAnchor: { x: 0, y: 40 }
    },
    NPN: {
        type: 'NPN',
        displayName: 'NPN',
        terminals: 3,
        params: { baseTurnOn: 0.7, transconductance: 2, onResistance: 0.1, offResistance: 1000000000, baseResistance: 1000 },
        schema: [
            makeNumberField('baseTurnOn', 'Base Turn-On', 'V', 0.7),
            makeNumberField('transconductance', 'Transconductance', 'S', 2),
            makeNumberField('onResistance', 'On Resistance', 'Ohm', 0.1),
            makeNumberField('offResistance', 'Off Resistance', 'Ohm', 1000000000),
            makeNumberField('baseResistance', 'Base Resistance', 'Ohm', 1000)
        ],
        nodeLayout: [{ x: 0, y: 40 }, { x: 40, y: 0 }, { x: 40, y: 80 }],
        gridAnchor: { x: 0, y: 40 }
    },
    PNP: {
        type: 'PNP',
        displayName: 'PNP',
        terminals: 3,
        params: { baseTurnOn: 0.7, transconductance: 2, onResistance: 0.1, offResistance: 1000000000, baseResistance: 1000 },
        schema: [
            makeNumberField('baseTurnOn', 'Base Turn-On', 'V', 0.7),
            makeNumberField('transconductance', 'Transconductance', 'S', 2),
            makeNumberField('onResistance', 'On Resistance', 'Ohm', 0.1),
            makeNumberField('offResistance', 'Off Resistance', 'Ohm', 1000000000),
            makeNumberField('baseResistance', 'Base Resistance', 'Ohm', 1000)
        ],
        nodeLayout: [{ x: 0, y: 40 }, { x: 40, y: 0 }, { x: 40, y: 80 }],
        gridAnchor: { x: 0, y: 40 }
    },
    NotGate: {
        type: 'NotGate',
        displayName: 'NOT Gate',
        terminals: 3,
        params: { threshold: 2.5, highLevel: 5, lowLevel: 0 },
        schema: [
            makeNumberField('threshold', 'Threshold', 'V', 2.5),
            makeNumberField('highLevel', 'High Level', 'V', 5),
            makeNumberField('lowLevel', 'Low Level', 'V', 0)
        ],
        nodeLayout: [{ x: 0, y: 40 }, { x: 60, y: 20 }, { x: 60, y: 60 }],
        gridAnchor: { x: 0, y: 40 }
    },
    AndGate: {
        type: 'AndGate',
        displayName: 'AND Gate',
        terminals: 4,
        params: { threshold: 2.5, highLevel: 5, lowLevel: 0 },
        schema: [
            makeNumberField('threshold', 'Threshold', 'V', 2.5),
            makeNumberField('highLevel', 'High Level', 'V', 5),
            makeNumberField('lowLevel', 'Low Level', 'V', 0)
        ],
        nodeLayout: [{ x: 0, y: 20 }, { x: 0, y: 60 }, { x: 60, y: 20 }, { x: 60, y: 60 }],
        gridAnchor: { x: 0, y: 40 }
    },
    OrGate: {
        type: 'OrGate',
        displayName: 'OR Gate',
        terminals: 4,
        params: { threshold: 2.5, highLevel: 5, lowLevel: 0 },
        schema: [
            makeNumberField('threshold', 'Threshold', 'V', 2.5),
            makeNumberField('highLevel', 'High Level', 'V', 5),
            makeNumberField('lowLevel', 'Low Level', 'V', 0)
        ],
        nodeLayout: [{ x: 0, y: 20 }, { x: 0, y: 60 }, { x: 60, y: 20 }, { x: 60, y: 60 }],
        gridAnchor: { x: 0, y: 40 }
    },
    NandGate: {
        type: 'NandGate',
        displayName: 'NAND Gate',
        terminals: 4,
        params: { threshold: 2.5, highLevel: 5, lowLevel: 0 },
        schema: [
            makeNumberField('threshold', 'Threshold', 'V', 2.5),
            makeNumberField('highLevel', 'High Level', 'V', 5),
            makeNumberField('lowLevel', 'Low Level', 'V', 0)
        ],
        nodeLayout: [{ x: 0, y: 20 }, { x: 0, y: 60 }, { x: 60, y: 20 }, { x: 60, y: 60 }],
        gridAnchor: { x: 0, y: 40 }
    }
};

function cloneDefinition(type) {
    const definition = COMPONENT_DEFINITIONS[type];
    if (!definition) {
        throw new Error(`Unknown component type: ${type}`);
    }

    return {
        ...definition,
        params: { ...definition.params },
        schema: definition.schema.map((field) => ({ ...field })),
        nodeLayout: definition.nodeLayout.map((node) => ({ ...node })),
        gridAnchor: definition.gridAnchor ? { ...definition.gridAnchor } : null
    };
}

export { cloneDefinition };