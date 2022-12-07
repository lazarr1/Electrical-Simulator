#TO use:

#go into build/
#run cmake ..
#run cmake && make install

cmake_minimum_required(VERSION 3.10)
project(Circuit-Simulator)


set(IS_DEBUG_BUILD CMAKE_BUILD_TYPE STREQUAL "Debug")
# set(IS_TIME_BUILD CMAKE_BUILD_TYPE STREQUAL "Timing")


# Indication to the code that this is a debug build
if (${IS_DEBUG_BUILD})
    add_compile_definitions(__DEBUG__)
    add_compile_options("-Wall")

    # Add to the code that this is a time
    if (${IS_TIME_BUILD})
      add_compile_definitions(__TIMER__)
    endif ()
endif ()







add_compile_options(-std=c++11)

# Enable group projects in folders
set_property(GLOBAL PROPERTY USE_FOLDERS ON)
set_property(GLOBAL PROPERTY PREDEFINED_TARGETS_FOLDER "cmake")


set(DIVISIBLE_INSTALL_BIN_DIR ${PROJECT_SOURCE_DIR}/bin)
set (CMAKE_RUNTIME_OUTPUT_DIRECTORY build/)


set(CMAKE_CXX_STANDARD 11)

FIND_PACKAGE( Boost 1.80 COMPONENTS program_options REQUIRED )

include_directories(
  include
  ${Boost_INCLUDE_DIR}
)



# =========================================================


# include_directories(dependencies/libraries/)

set(elec_sim_SOURCES
    # Source files
    src/circuit_element.cpp
    src/circuit.cpp
    src/simulator.cpp
    src/node.cpp
    src/circuit_solver.cpp
    src/current_source.cpp
    src/capacitor.cpp
    src/inductor.cpp
    src/vccs.cpp

)

add_library(circ_sim_lib ${elec_sim_SOURCES})

#if ur library ends up including something use this:
# target_link_libraries(major_lib ${catkin_LIBRARIES} ${OpenCV_LIBS})


add_executable(simulator src/main.cpp)
target_link_libraries(simulator circ_sim_lib ${Boost_LIBRARIES}) 


###################
#BUILD 
install(TARGETS simulator DESTINATION ${DIVISIBLE_INSTALL_BIN_DIR} )



