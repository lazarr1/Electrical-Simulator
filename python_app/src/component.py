from kivy.uix.image import Image
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.behaviors import DragBehavior
from kivy.metrics import dp

    

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
        self.graphic = ComponentGraphic(src)


    def GetGraphic(self):
        return self.graphic
    



    
