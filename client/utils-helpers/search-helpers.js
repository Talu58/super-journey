export function removeDuplicates(list) {
  let result = [];
  list.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
  for (let i = 0; i < list.length; i++) {
    if (result.length === 0) {
      result.push(list[i]);
    } else if (result[result.length-1].created_at !== list[i].created_at) {
      result.push(list[i]);
    }
  }
  return result;
}