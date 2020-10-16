def nodes_to_elements(nodes):

    colors =         {    "invalid": {
                'color': "#b80b22",
                # borderColor: "#b80b22",
            },
            "repeated":{
                'color': "#e8e517",
                # borderColor: "#e8e517",
            },
            "valid": {
                'color': "#0da312",
                # borderColor: "#0da312",
            },
            "final": {
                'color': "#172ce8",
                # borderColor: "#172ce8",
            }}
    ids = dict(zip(nodes,list(range(len(nodes)))))
    elements = []
    for i, node in enumerate(nodes):
        
        elements.append({
            'data':{
                'id': ids[node],
                'label':str(node.value),
                'state_type': node.label,
                'color': colors[node.label]['color'],
            }
            # 'caption': ', '.join(list(map(str,node.value))),
        })
        if not node.parent:
            elements[-1]['root'] = 'true'
        else:
            elements.append({
                'data':{
                "source": ids[node.parent],
                "target": ids[node],
                'color': colors[node.label]['color'],
                }
                # 'state_type': node.label,
            })
    return elements
