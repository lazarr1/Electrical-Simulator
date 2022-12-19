from kivy.uix.image import Image
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.behaviors import DragBehavior
from kivy.metrics import dp

from .simulator import Simulator
    

class ComponentGraphic(DragBehavior, Image):


    def __init__(self,src, **kwargs):
        super(ComponentGraphic, self).__init__(**kwargs)
        self.source = src


    def on_size(self, *args):
        self.size_hint = None, None
        self.size = self.width, dp(100)

    #Moves the dragbox to the image's current position
    def Update(self):
        self.drag_rectangle = self.x, self.y, self.width, self.height
        self.drag_timeout = 10000000
        self.drag_distance = 0



class Component():

    graphic = None
    #All components need to exist within the simulator, so on instantiation they are appended to the simulator's list of components
    def __init__(self, src):
        self.graphic = ComponentGraphic(src)
        Simulator().AddComponents(self)


    def GetGraphic(self):
        return self.graphic
    
    def Update(self):
        self.graphic.Update()
    



    
