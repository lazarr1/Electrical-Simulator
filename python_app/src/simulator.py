from circuit import CircuitGraphics

class Simulator():
    _components = []
    _circuitGraph = CircuitGraphics()
    
    def Run(self):
        self._circuitGraph.SetComponents(self._components)

    def AddComponents(self, Component):
        self._components.append(Component)

    def RemoveComponent():
        pass
