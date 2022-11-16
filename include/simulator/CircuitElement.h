#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H


namespace Circuit
{
    // struct Reactance{
    //     double resistance;
    //     double impedance;
    // };


    struct PassiveImpedance{
        double _resistance;
        double _capacitance;
        double _inductance;
    }


} // namespace circuit


//Abstract class defining the basic functionality of a circuit element
class CPassiveElement{
    public:

        void GetImpedance();

        virtual void Appl



    private:

        //All circuit elements have these properties
        Circuit::PassiveImpedance _impedance;


}




#endif