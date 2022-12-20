from kivy.uix.floatlayout import FloatLayout
from kivy.clock import Clock
from .simulator import Simulator


class CircuitGraphics(FloatLayout):
    _FPS = 60
    _components = []

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        #inform the simulator of the graphical interface
        sim = Simulator()
        sim.SetCircuitGraph(self)

    def on_size(self, *args):
        pass

    def SetComponents(self, components):
        self._components = components

    def Update(self, dt):
        self.clear_widgets()

        for iComponent in self._components:
            iComponent.Update()
            self.add_widget(iComponent.GetGraphic()) 