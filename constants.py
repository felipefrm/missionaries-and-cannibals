from State import *
from Node import *
from pathlib import Path
INITIAL_NODE = Node(State(3,3,1))
FINAL_STATE = State(0,0,0)

MOVES = [
    State(2,0,1),
    State(1,0,1),
    State(0,1,1),
    State(0,2,1),
    State(1,1,1),
]

DIRS = {'DATA': 'data/'}
for d in DIRS.values():
    Path(d).mkdir(parents=True, exist_ok=True)

