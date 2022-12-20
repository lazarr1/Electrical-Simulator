from kivy.uix.gridlayout import GridLayout
from kivy.metrics import dp
from kivy.graphics import Color
from kivy.uix.widget import Widget


from kivy.uix.scrollview import ScrollView
from kivy.properties import ObjectProperty
from kivy.effects.scroll import ScrollEffect

from kivy.uix.image import Image
from kivy.uix.behaviors import ButtonBehavior  

from kivy.app import App

from .component import Component




class Workspace(Widget):

    layout_content=ObjectProperty(None)
    layout = GridLayout(cols=3)
    scroll = ScrollView(size_hint=(1, None))

    def __init__(self, **kwargs):
        super().__init__(**kwargs)


        self.scroll.do_scroll_x = False

        #Does not allow scrolling beyond the ScrollView boundaries.
        self.scroll.effect_cls = ScrollEffect

        #Allow scrolling on the grid layout
        self.layout.size_hint = 1, None
        self.layout.bind(minimum_height=self.layout.setter('height'))

        #Add widgets 
        self.scroll.add_widget(self.layout)
        self.add_widget(self.scroll)


        self.layout.add_widget(Tools("src/images/current_source.png"))
        self.layout.add_widget(Tools("src/images/resistor.png"))
        self.layout.add_widget(Tools("src/images/node.png"))




    def on_size(self, *args):
        self.scroll.size = self.width, self.height

    


class Tools(ButtonBehavior, Image):
    
    __src = None

    def __init__(self, src, **kwargs):
        super().__init__(**kwargs)
        self.source = src
        self.__src = src

    def on_size(self, *args):
        self.size_hint = None, None
        self.size = self.width, dp(100)

    def on_press(self):
        Component(self.__src)





  