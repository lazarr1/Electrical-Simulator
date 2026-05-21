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
    Ground: {
        type: 'Ground',
        displayName: 'Ground',
        terminals: 1,
        params: {},
        schema: [],
        nodeLayout: [{ x: 20.5, y: 0 }],
        gridAnchor: { x: 20.5, y: 20.5 }
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