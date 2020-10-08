# digraph nome {
#     "(3,3,1),(0,0,0)" -> "(3,3,1),(0,0,0)";
#     "(3,3,1),(0,0,0)" -> "(3,3,1),(0,0,0)";
#     "(3,3,1),(0,0,0)" -> "(3,3,1),(0,0,0)";
#     "(3,3,1),(0,0,0)" -> "(3,3,1),(0,0,0)";
#     "(3,3,1),(0,0,0)" -> "(3,3,1),(0,0,0)";
# }
class State:

    def __init__(self, num_missionaries, num_cannibals, num_boats):
        self.num_missionaries = num_missionaries
        self.num_cannibals = num_cannibals
        self.num_boats = num_boats

    def __str__(self):
        return f'({self.num_missionaries}, {self.num_cannibals}, {self.num_boats})'

    def __sub__(self,other):
        return State(\
              self.num_missionaries - other.num_missionaries,\
              self.num_cannibals - other.num_cannibals,\
              self.num_boats - other.num_boats,\
              )

    def __add__(self,other):
        return State(\
              self.num_missionaries + other.num_missionaries,\
              self.num_cannibals + other.num_cannibals,\
              self.num_boats + other.num_boats,\
              )

    def __eq__(self,other):
        for (k1,v1), (k2,v2) in zip(self.__dict__.items(),other.__dict__.items()):
            # print(k1,v1,k2,v2)
            # if k1!=k2:
            #     raise SystemExit("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            if v1!=v2:
                return False
        return True
    