from kivy.uix.gridlayout import GridLayout
from kivy.metrics import dp
from kivy.graphics.vertex_instructions import Line
from kivy.graphics import Color
from kivy.uix.widget import Widget
from kivy.uix.button import Button

from kivy.uix.scrollview import ScrollView
from kivy.properties import ObjectProperty
from kivy.effects.scroll import ScrollEffect


class Workspace(Widget):
    layout_content=ObjectProperty(None)
    layout = GridLayout(cols=3)
    scroll = ScrollView(size_hint=(1, None))



    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scroll.do_scroll_x = False

        self.scroll.effect_cls = ScrollEffect

        self.layout.size_hint = 1, None

        self.layout.bind(minimum_height=self.layout.setter('height'))
        self.scroll.add_widget(self.layout)
        self.add_widget(self.scroll)
        for i in range(100):
            btn = Button(text=str(i), size_hint_y=None, height=40)
            self.layout.add_widget(btn)


    def on_size(self, *args):
        self.scroll.size = self.width, self.height
        #test

        pass

        

# class Scroll(ScrollView):
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)