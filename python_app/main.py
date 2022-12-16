import kivy
kivy.require('2.1.0')

from kivy.app import App
from kivy.uix.widget import Widget


import src.background
import src.draw
import src.workspace


class MainWidget(Widget):
    pass

class CircuitSim(App):
    pass



if __name__ == "__main__":
    CircuitSim().run()