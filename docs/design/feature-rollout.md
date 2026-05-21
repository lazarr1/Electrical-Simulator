# Circuit Simulator Feature Rollout

## Codebase Summary

- Backend: sparse MNA solver in `src/` and `include/simulator/` with per-device `Stamp()` methods.
- Middle layer: websocket string protocol in `src/router.cpp`, `src/circuithandler.cpp`, and `src/service_handler.cpp`.
- Frontend: DOM and canvas UI in `public/` with `public/components/circuit.js` coordinating component placement, serialization, and oscilloscope updates.

## Cross-Cutting Foundation

### Goal

Move component payloads from a single scalar value to structured JSON parameters so one transport format supports richer devices and a better editor.

### Planned Scope

- `public/components/components.js`
- `public/components/modifyParamsBox.js`
- `public/components/circuit.js`
- `public/components/staticComponent.js`
- `public/components/componentTable.js`
- `public/client/client.js`
- `src/circuithandler.cpp`
- `include/simulator/simulator.h`
- `src/simulator.cpp`

### Pseudocode

```text
component.serialize() -> { type, params }
client.SendCreateMessage(type, paramsJson)
router/circuithandler parse JSON after "Type/"
simulator factory dispatches on type and params keys
```

## Task 1: VCVS

### Model

Ideal voltage-controlled voltage source with 4 pins: control+, control-, out+, out-.

### Planned Scope

- `include/simulator/circuit_element.h`
- `include/simulator/vcvs.h`
- `src/vcvs.cpp`
- `include/simulator/circuit.h`
- `src/circuit.cpp`
- `include/simulator/simulator.h`
- `src/simulator.cpp`
- `src/circuithandler.cpp`
- `public/components/circuit.js`
- `public/components/staticComponent.js`
- `public/style.css`

### Pseudocode

```text
prepareSolver(): allocate one extra MNA row
stamp output source coupling on out+/out-
stamp control relation: Vout = gain * (Vctrl+ - Vctrl-)
```

## Task 2: Better Parameter Editing UI

### Model

Replace the tiny single-input popup with a structured editor panel that renders fields from component schemas.

### Planned Scope

- `public/components/modifyParamsBox.js`
- `public/components/components.js`
- `public/components/staticComponent.js`
- `public/style.css`
- `public/index.html`

### Pseudocode

```text
schema = component.paramSchema
for field in schema:
  render label, input/select, helper text
on save:
  validate numbers and enums
  component.params[field.key] = value
```

## Task 3: AC Frequency Control

### Model

Expose `frequency` as a first-class parameter for AC sources and carry it through the websocket payload into backend source objects.

### Planned Scope

- `include/simulator/ac_voltage_source.h`
- `src/ac_voltage_source.cpp`
- `include/simulator/simulator.h`
- `src/simulator.cpp`
- `src/circuithandler.cpp`
- `public/components/modifyParamsBox.js`
- `public/components/circuit.js`

### Pseudocode

```text
params = { amplitude, frequency, offset? }
CreateACVoltageSource(params)
Stamp() uses amplitude * sin(2*pi*frequency*t)
```

## Task 4: Function Generator

### Model

Time-varying source supporting `sine`, `square`, `triangle`, and `saw` waveforms with amplitude, frequency, offset, phase, and duty cycle.

### Planned Scope

- `include/simulator/function_generator.h`
- `src/function_generator.cpp`
- `include/simulator/circuit_element.h`
- `include/simulator/circuit.h`
- `src/circuit.cpp`
- `include/simulator/simulator.h`
- `src/simulator.cpp`
- `src/circuithandler.cpp`
- `public/components/circuit.js`
- `public/components/staticComponent.js`
- `public/style.css`

### Pseudocode

```text
switch waveform:
  sine -> sin(phase)
  square -> sign(sin) with duty
  triangle -> normalized ramp foldback
  saw -> normalized ramp
voltage = offset + amplitude * waveformValue
stamp as controlled voltage source row
```

## Task 5: Transistors (MOSFET + BJT)

### Model

Use pragmatic behavioral models compatible with the existing linear-per-step solver.

- MOSFETs: gate-controlled channel resistance with threshold-driven switching between `ron` and `roff`.
- BJTs: base-emitter diode plus collector-emitter conductance/current gain approximation.

### Planned Scope

- `include/simulator/diode.h`
- `src/diode.cpp`
- `include/simulator/mosfet.h`
- `src/mosfet.cpp`
- `include/simulator/bjt.h`
- `src/bjt.cpp`
- `include/simulator/simulator.h`
- `src/simulator.cpp`
- `src/circuithandler.cpp`
- `public/components/circuit.js`
- `public/components/staticComponent.js`
- `public/style.css`

### Pseudocode

```text
if nmos and Vgs > Vth:
  channelResistance = ron
else:
  channelResistance = roff
stamp resistor between drain and source

if npn and Vbe > Vbe_on:
  stamp base-emitter diode companion
  stamp collector current ~= beta * Ibe
```

## Task 6: Diodes

### Model

Piecewise-linear diode using `vf`, `ron`, and `roff`, updated from previous-step bias.

### Planned Scope

- `include/simulator/diode.h`
- `src/diode.cpp`
- `include/simulator/simulator.h`
- `src/simulator.cpp`
- `src/circuithandler.cpp`
- `public/components/circuit.js`
- `public/components/staticComponent.js`
- `public/style.css`

### Pseudocode

```text
vd = Va - Vk
if vd >= vf:
  I = (vd - vf) / ron
  stamp conductance 1/ron and current offset for vf
else:
  stamp conductance 1/roff
```

## Task 7: Digital Gates

### Model

Behavioral logic gates that read analog node voltages with a threshold and drive an analog output source between low/high rails.

### Planned Scope

- `include/simulator/digital_gate.h`
- `src/digital_gate.cpp`
- `include/simulator/simulator.h`
- `src/simulator.cpp`
- `src/circuithandler.cpp`
- `public/components/circuit.js`
- `public/components/staticComponent.js`
- `public/style.css`

### Pseudocode

```text
logicInputs = inputs.map(v => v > threshold)
logicOut = evalGate(kind, logicInputs)
targetVoltage = logicOut ? highLevel : lowLevel
stamp output as voltage source between out+ and out-
```

## Task 8: VCCS Placement Snap Fix

### Model

Use per-component placement anchors instead of centering every component by visual width.

### Planned Scope

- `public/components/components.js`
- `public/components/circuit.js`

### Pseudocode

```text
gridX = round(mouseX / 20) * 20
left = gridX - component.gridAnchor.x
top = gridY - component.gridAnchor.y
```

## Task 9: Oscilloscope Node Picker Dropdown

### Model

Replace the always-open multi-select with a dropdown button that opens a checklist panel.

### Planned Scope

- `public/components/oscilloscope.js`
- `public/style.css`

### Pseudocode

```text
button click -> toggle dropdown
render checkbox rows for available nodes
on change -> render traces
close on outside click
```

## Task 10: Node Visibility for Oscilloscope Workflows

### Model

Expose circuit node IDs and correlate selected oscilloscope traces with colored node badges on the canvas.

### Planned Scope

- `public/components/nodes.js`
- `public/components/circuit.js`
- `public/components/oscilloscope.js`
- `public/style.css`

### Pseudocode

```text
UpdateNodes assigns N1..Nn
node badge shows label when scope visible or node selected
selected scope traces push color map back to circuit
node badge border/background adopts trace color
```

## Branching Plan

### Worktree 1: parameter and protocol foundation

- Structured params transport
- New editor UI
- AC frequency plumbing

### Worktree 2: backend device expansion

- VCVS
- Function generator
- Diode, MOSFET, BJT, digital gates

### Worktree 3: placement and oscilloscope polish

- VCCS snap fix
- Oscilloscope dropdown
- Node labeling and trace highlighting

## Notes

- `ollama` is not installed in the current environment, so implementation will be performed directly in worktrees instead of delegating to a local Ollama worker.
- Testing is intentionally deferred per the request, but builds will still be used to catch obvious compile regressions.