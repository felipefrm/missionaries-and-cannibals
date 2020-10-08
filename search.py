from State import *
from Node import *

def valid_state(initial_margin,final_margin):
    if (initial_margin.num_missionaries < initial_margin.num_cannibals and initial_margin.num_missionaries) or \
       (final_margin.num_missionaries < final_margin.num_cannibals and final_margin.num_missionaries) or \
       initial_margin.num_missionaries < 0 or \
       final_margin.num_missionaries < 0 or \
       initial_margin.num_cannibals < 0 or \
       final_margin.num_cannibals < 0:
        return False
    else:
        return True

def valid_solution(initial_margin,final_margin):
    if final_margin == FINAL_STATE:
        return True
    return False

def do_move(node, move, depth):
    if depth == DEPTH_LIMIT:
        return False
    # if not valid_state(initial_margin, final_margin):
    #     print(initial_margin, final_margin)
    #     return False
    # if valid_solution(initial_margin,final_margin):
    #     return True
    # Do the move
    # print(initial_margin, final_margin, move)
    if node.value[0].num_boats:
        new_node = Node((node.value[0]-move,node.value[1]+move),node)
    else:
        new_node = Node((node.value[0]+move,node.value[1]-move),node)
        # new_initial_margin, new_final_margin = initial_margin+move,final_margin-move
    # print

    # Check the move
    if not valid_state(*new_node.value):
        return False
    print(depth*'\t',new_node.value[0],new_node.value[1],depth)
    if valid_solution(*new_node.value):
        # print(new_initial_margin, new_final_margin)
        global LAST_NODE
        LAST_NODE = new_node
        return True

    parent_node = node.parent
    if parent_node:
        while True:
            if new_node.value[0] == parent_node.value[0] and new_node.value[1] == parent_node.value[1]:
                return False
            if parent_node.parent == None:
                break
            parent_node = parent_node.parent
    # Do more moves
    for move in moves:
        result = do_move(new_node,move,depth+1)
        if result:
            return True
    return False

initial_node = Node((State(3,3,1),State(0,0,0)))

FINAL_STATE = State(3,3,1)
moves = [
    State(2,0,1),
    State(1,0,1),
    State(0,1,1),
    State(0,2,1),
    State(1,1,1),
]
search_space = {}
DEPTH_LIMIT = 0
solution = False
LAST_NODE = None
while True:
    DEPTH_LIMIT += 1
    for move in moves:
        if do_move(initial_node,move,0):
            print("Solution!!")
            solution = True
            break
    if solution:
        break

parent_node = LAST_NODE
while True:
    print(parent_node.value[0],parent_node.value[1])
    if parent_node.parent == None:
        break
    parent_node = parent_node.parent
