# from .circuit import CircuitGraphics
from kivy.clock import Clock


#SINGLETON Simulator
class Simulator():
    __components = []
    __circuitGraph = None
    __FPS = 20
    __initialized = False

    def __new__(self):
        """ creates a singleton object, if it is not created,
        or else returns the previous singleton object"""
        if not hasattr(self, 'instance'):
            self.instance = super(Simulator, self).__new__(self)
        return self.instance

    def __init__(self):      
        #Ensures that is only initialised once
        if(self.__initialized): return
        self.__initialized = True

        #Set up the frame update timer
        Clock.schedule_interval(self.Update, 1/self.__FPS)


    def AddComponents(self, Component):
        self.__components.append(Component)

    def RemoveComponent():
        pass

    def Update(self,dt):
        self.__circuitGraph.SetComponents(self.__components)
        if(self.__circuitGraph):
            self.__circuitGraph.Update(dt)

    def SetCircuitGraph(self, graphics):
        self.__circuitGraph = graphics

