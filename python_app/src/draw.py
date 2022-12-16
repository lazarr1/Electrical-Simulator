from kivy.uix.widget import Widget
from kivy.graphics.vertex_instructions import Line
from kivy.graphics import Color



class Draw(Widget):
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    

    def on_touch_down(self,touch):
        with self.canvas:
            Color(0,0,0,1)
            touch.ud["line"]=Line(points=(touch.x,touch.y))
    def on_touch_move(self,touch):
        with self.canvas:
            Color(0,0,0,1)
            touch.ud["line"].points +=(touch.x,touch.y)
    def on_touch_up(self,touch):
        print("released mouse",touch)