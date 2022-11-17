#TO use:

#go into build/
#run cmake ..
#run cmake && make install

cmake_minimum_required(VERSION 3.10)
project(Electrical-Simulator)


set(IS_DEBUG_BUILD CMAKE_BUILD_TYPE STREQUAL "Debug")

# Indication to the code that this is a debug build
if (${IS_DEBUG_BUILD})
    add_compile_definitions(__DEBUG__)
    add_compile_options("-Wall")

endif ()


add_compile_options(-std=c++11)

# Enable group projects in folders
set_property(GLOBAL PROPERTY USE_FOLDERS ON)
set_property(GLOBAL PROPERTY PREDEFINED_TARGETS_FOLDER "cmake")


set(DIVISIBLE_INSTALL_BIN_DIR ${PROJECT_SOURCE_DIR}/bin)
set (CMAKE_RUNTIME_OUTPUT_DIRECTORY build/)


set(CMAKE_CXX_STANDARD 11)

include_directories(
  include
)



# =========================================================


# include_directories(dependencies/libraries/)

set(elec_sim_SOURCES
    # Source files
    src/circuit_element.cpp
    src/circuit.cpp
    src/simulator.cpp
    src/edge.cpp
    src/node.cpp

)

add_library(circ_sim_lib ${elec_sim_SOURCES})

#if ur library ends up including something use this:
# target_link_libraries(major_lib ${catkin_LIBRARIES} ${OpenCV_LIBS})


add_executable(simulator src/main.cpp)
target_link_libraries(simulator circ_sim_lib) 


###################
#BUILD 
install(TARGETS simulator DESTINATION ${DIVISIBLE_INSTALL_BIN_DIR})



