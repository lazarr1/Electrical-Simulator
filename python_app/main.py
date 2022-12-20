import kivy
kivy.require('2.1.0')

from kivy.app import App
from kivy.uix.widget import Widget
from src.simulator import Simulator


import src.background
import src.draw
import src.workspace
import src.component
import src.circuit


class MainWidget(Widget):
    pass

class CircuitSim(App):
    pass



if __name__ == "__main__":
    sim = Simulator()



    CircuitSim().run()
