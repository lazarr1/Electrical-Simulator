from kivy.uix.image import Image
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.behaviors import DragBehavior
from kivy.metrics import dp

from .simulator import Simulator
    

class ComponentGraphic(DragBehavior, Image):

    __width = dp(50)
    __height = dp(100)

    __spawn = (dp(100))

    def __init__(self,src, **kwargs):
        super(ComponentGraphic, self).__init__(**kwargs)
        self.source = src
        # self.pos_hint = None

        self.pos = (dp(220),0)
   
   
    def on_size(self, *args):
        self.size_hint = None, None
        self.size = self.__width, self.__height

    #Moves the dragbox to the image's current position
    def Update(self):
        self.drag_rectangle = self.x, self.y, self.width, self.height
        self.drag_timeout = 10000000
        self.drag_distance = 0


    def on_touch_up(self, touch):
        super(ComponentGraphic,self).on_touch_up(touch)
        self.pos = round(self.x/25) * 25, round(self.y/25) * 25


    def SetDimensions(self, h,w):
        self.size = h,w
        self.__width = w
        self.__height = h



class Component():

    # __name = None
    __graphic = None
    #All components need to exist within the simulator, so on instantiation they are appended to the simulator's list of components
    def __init__(self, src):
        self.__graphic = ComponentGraphic(src)
        Simulator().AddComponents(self)
        # self.__name = name

    def GetGraphic(self):
        return self.__graphic
    
    def Update(self):
        self.__graphic.Update()

    def SetDimensions(self, h,w):
        self.__graphic.SetDimensions(h,w)

    

class Resistor(Component):

    __SRC = "src/images/Resistor.png"

    __WIDTH = dp(100)
    __HEIGHT = dp(10)

    __name = None

    def __init__(self, name):
        super().__init__(self.__src)
        self.__name = name


    
