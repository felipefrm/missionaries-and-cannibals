import json
def nodes_to_dicts(nodes):
    nodes_dicts = []
    edges_dicts = []
    ids = dict(zip(nodes,list(range(len(nodes)))))
    for i, node in enumerate(nodes):
        
        nodes_dicts.append({
            'id': ids[node],
            'caption': ', '.join(list(map(str,node.value))),
            'state_type': node.label,
        })
        if not node.parent:
            nodes_dicts[-1]['root'] = 'true'
        else:
            edges_dicts.append({
                "source": ids[node],
                "target": ids[node.parent],
                'state_type': node.label,
            })
    return nodes_dicts, edges_dicts
        
def dicts_to_graphjson(nodes_dicts, edges_dicts):
    result = """{
"comment": "Missionaries and cannibals",
"nodes": [
"""
    result += (',\n'.join(list(map(json.dumps,nodes_dicts))))
    result += """
],
"edges": [
"""

    result += (',\n'.join(list(map(json.dumps,edges_dicts))))
    
    result += """
]
}"""

    return result
