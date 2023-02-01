
from abc import ABC, abstractmethod


from kivy.uix.image import Image
from kivy.uix.button import Button  

from kivy.metrics import dp
from kivy.graphics import Color


class Component(ABC):

    __src = 0
    __width = 0
    __height = 0

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.source = self.__src

    

class Resistor(Image):
    __src = "src/images/resistor.png"
    __width = 1024 #pixels
    __height = 384 # pixels

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.source = self.__src

    def on_size(self, *args):
        self.size_hint = None, None
        self.size = self.width, dp(100)


    def SetPosition(self,x,y):
        self.pos_hint = None, None
        self.x = x
        self.y = y

        print(self.pos)

class CurrentSource(Image):
    __src = "src/images/CurrentSource.png"
    __width = 1024 #pixels
    __height = 384 # pixels

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.source = self.__src



class Tools(Button):

    __type = None

    def __init__(self, type:Component,**kwargs) -> None:
        super().__init__(**kwargs)
        self.__type = type
        self.add_widget(type)

        #invisible
        # self.background_color = [0,0,0,0]


    def on_size(self, *args):
        self.size_hint = None, None
        self.size = self.width, dp(150)
        self.__type.SetPosition(self.x, self.y)


    def on_press(self):

        print(self.pos)
        print(self.y)
        print("test")
        # Component(self.__type)

    

