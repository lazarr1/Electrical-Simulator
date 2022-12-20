from kivy.uix.widget import Widget
from kivy.graphics.vertex_instructions import Line
from kivy.graphics import Color

from .background import Background

class Draw(Widget):
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    #Get the gap between lines on the grid from the background
    _GAP = Background().GetGap()

    #On mouse click
    def on_touch_down(self,touch):
        with self.canvas:
            #black
            Color(0,0,0,1)

            #make sure points are on the grids
            x,y = self.RoundPoints(touch.x, touch.y)

            #Add the 
            touch.ud["line"]=Line(points=(x,y))
    #trace line from mouse movement
    def on_touch_move(self,touch):
        with self.canvas:
            #black
            Color(0,0,0,1)
            #make sure points are on the grid
            x,y = self.RoundPoints(touch.x, touch.y)
            touch.ud["line"].points +=(x,y)

    def on_touch_up(self,touch):
        pass


    def RoundPoints(self, x,y):

        x = round(x/self._GAP) * self._GAP
        y = round(y/self._GAP) * self._GAP

        return x, y
