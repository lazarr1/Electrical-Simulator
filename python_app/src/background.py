from kivy.uix.widget import Widget
from kivy.metrics import dp
from kivy.graphics.vertex_instructions import Line
from kivy.graphics import Color


class Background(Widget):

    _GREY = 240/255
    _GAP = 25

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    
    def on_size(self, *args):
        with self.canvas:
            Color(self._GREY,self._GREY,self._GREY,1)

            for iHLine in range(0, self.height, self._GAP):
                lwidth = dp(1)
                Line(points=(0, iHLine, self.width, iHLine), width = lwidth)
            

            for iVLine in range(0, self.width, self._GAP):
                lwidth = dp(1)
                Line(points=(iVLine, 0, iVLine, self.height), width = lwidth)
            # for iVLine in range(0, self.height, 5):


