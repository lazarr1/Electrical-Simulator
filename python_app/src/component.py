from kivy.uix.image import Image
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.behaviors import DragBehavior
from kivy.metrics import dp
from kivy.clock import Clock

components = []


class Graphics(FloatLayout):
    _FPS = 60
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        Clock.schedule_interval(self.Update, 1/self._FPS)


    def on_size(self, *args):
        pass

    def Update(self, dt):
        self.clear_widgets()

        for iComponent in components:
            iComponent.Update()
            self.add_widget(iComponent)
        
    

class ComponentGraphic(DragBehavior, Image):


    def __init__(self,src, **kwargs):
        super(ComponentGraphic, self).__init__(**kwargs)
        self.source = src


    def on_size(self, *args):
        self.size_hint = None, None
        self.size = self.width, dp(100)


    def Update(self):
        self.drag_rectangle = self.x, self.y, self.width, self.height
        self.drag_timeout = 10000000
        self.drag_distance = 0




class Component():

    def __init__(self, src):
        # self.graphic = ComponentGraphic(src)
        self.graphic = ComponentGraphic("src/images/resistor.png")

    def GetGraphic(self):
        return self.graphic   
    

components.append(ComponentGraphic("src/images/resistor.png"))


    
