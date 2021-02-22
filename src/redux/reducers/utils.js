export const sortBy = function sortBy(field) {
  return function (a, b) {
        if (a.[field] > b.[field]) { return 1; }
        else if (a.[field] < b.[field]) { return -1; }
        else {
          if (a.[field] > b.[field]) { return 1; }
          if (a.[field] < b.[field]) { return -1; }
          else { return 0; }
        }
      };
}

export const setLinkNum = function setLinkNum(NewState){
  for (var i = 0; i < NewState.length; i++) {
        if (i !== 0 &&
          NewState[i].source === NewState[i - 1].source &&
          NewState[i].target === NewState[i - 1].target) {
          NewState[i].linknum = NewState[i - 1].linknum + 1;
        }
        else { NewState[i].linknum = 1; };
      };
      return NewState
}