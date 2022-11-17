cmake_minimum_required(VERSION 3.10)

# Enable group projects in folders
set_property(GLOBAL PROPERTY USE_FOLDERS ON)
set_property(GLOBAL PROPERTY PREDEFINED_TARGETS_FOLDER "cmake")

project(Electrical-Simulator)

set(CMAKE_CXX_STANDARD 11)
# set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_CURRENT_SOURCE_DIR}/cmake/")

# if (CMAKE_SIZEOF_VOID_P EQUAL 8)
#     set(TARGET_ARCHITECTURE x64)
# else()
#     set(TARGET_ARCHITECTURE x86)
# endif()




# =========================================================


include_directories(dependencies/libraries/)

add_library(delta-core STATIC
    # Source files
    src/CircuitElement.cpp


    # Include files
    include/simulator/CircuitElement.h

)




# add_subdirectory(physics)
# add_subdirectory(engines)
# add_subdirectory(demos)
