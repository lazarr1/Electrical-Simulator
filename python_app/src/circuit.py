from kivy.uix.floatlayout import FloatLayout
from kivy.clock import Clock



class CircuitGraphics(FloatLayout):
    _FPS = 60
    _components = []
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        Clock.schedule_interval(self.Update, 1/self._FPS)


    def on_size(self, *args):
        pass

    def SetComponents(self, components):
        self._components = components

    def Update(self, dt):
        self.clear_widgets()

        for iComponent in self._components:
            iComponent.Update()
            self.add_widget(iComponent.GetGraphic()) 