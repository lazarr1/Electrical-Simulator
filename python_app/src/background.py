from kivy.uix.widget import Widget
from kivy.metrics import dp
from kivy.graphics.vertex_instructions import Line
from kivy.graphics import Color


class Background(Widget):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    
    def on_size(self, *args):
        with self.canvas:
            Color(240/255,240/255,240/255,1)

            for iHLine in range(0, self.height, 25):
                lwidth = dp(1)
                Line(points=(0, iHLine, self.width, iHLine), width = lwidth)
            

            for iVLine in range(0, self.width, 25):
                lwidth = dp(1)
                Line(points=(iVLine, 0, iVLine, self.height), width = lwidth)
            # for iVLine in range(0, self.height, 5):


