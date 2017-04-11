export function removeDuplicates(list) {
  let result = [];
  list.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  for (let i = 0; i < list.length; i++) {
    if (result.length === 0) {
      result.push(list[i]);
    } else if (result[result.length-1].created_at !== list[i].created_at) {
      result.push(list[i]);
    }
  }
  return result;
};

export function searchProjects(searchPull, word) {
  let result = [];
  const lowerCaseWord = word.toLowerCase();
  for (let i = 0; i < searchPull.length; i++) {
    if (searchPull[i].title.toLowerCase().indexOf(lowerCaseWord) !== -1 || searchPull[i].description.toLowerCase().indexOf(lowerCaseWord) !== -1) {
      result.push(searchPull[i]);
    }
  }
  return result;
}
