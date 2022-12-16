from kivy.uix.widget import Widget
from kivy.graphics.vertex_instructions import Line


class Draw(Widget):
    def on_touch_down(self,touch):
        with self.canvas:
            touch.ud["line"]=Line(points=(touch.x,touch.y))
    def on_touch_move(self,touch):
        with self.canvas:
            touch.ud["line"].points +=(touch.x,touch.y)
    def on_touch_up(self,touch):
        print("released mouse",touch)