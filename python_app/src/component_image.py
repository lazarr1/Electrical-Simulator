from kivy.uix.image import Image
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.behaviors import DragBehavior

class Component():


    def __init__(self, src):
        # self.graphic = ComponentGraphic(src)
        self.graphic = ComponentGraphic("src/images/resistor.png")


    def GetGraphic(self):
        return self.graphic


class ComponentGraphic(FloatLayout):
    image = Image()

    def __init__(self,src, **kwargs):
        super().__init__(**kwargs)
        self.image.source = src

    

    
    



    
