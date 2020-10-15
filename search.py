import json
import collections

from State import *
from Node import *
from constants import *
from utils import *

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

def dfs(node, depth):
    if depth == DEPTH_LIMIT:
        return False

    nodes[DEPTH_LIMIT].append(node)
    # open(DIRS['DATA']).write(nodes)
    if not valid_state(*node.value):
        node.label='invalid'
        return False

    parent_node = node.parent
    if parent_node:
        while True:
            if node.value[0] == parent_node.value[0] and node.value[1] == parent_node.value[1]:
                node.label='repeated'
                return False
            if parent_node.parent == None:
                break
            parent_node = parent_node.parent

    # print(depth*'\t',node.value[0],node.value[1],depth)
    if valid_solution(*node.value):
        node.label='final'
        global LAST_NODE
        LAST_NODE = node
        return True

    node.label='valid'
    # Do more moves
    for move in MOVES:
        # Do the move
        if node.value[0].num_boats:
            new_node = Node((node.value[0]-move,node.value[1]+move),node)
        else:
            new_node = Node((node.value[0]+move,node.value[1]-move),node)

        new_node.parent = node
        # Check the move
        # nodes.append([node,"valid"])
        result = dfs(new_node,depth+1)
        if result:
            return True
        # else:
        #     nodes.append([node,"repeated"])
            
    return False
DEPTH_LIMIT = 0
solution = False
nodes = collections.defaultdict(list)
LAST_NODE = None
while True:
    DEPTH_LIMIT += 1
    if dfs(INITIAL_NODE,0):
        # print("Solution!!")
        solution = True
        break
    if solution:
        break
parent_node = LAST_NODE
while True:
    # print(parent_node.value[0],parent_node.value[1])
    if parent_node.parent == None:
        break
    parent_node = parent_node.parent

    
# print(nodes[5])
open('data/algorithm-steps.json','w').write(json.dumps(nodes_to_elements(nodes[DEPTH_LIMIT])))
