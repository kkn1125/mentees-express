import { queryStringToObject } from "../utils/tools";

function useQuery() {
  const query = queryStringToObject(location.search);
  const queries = Object.keys(query).length === 0 ? { page: 1 } : query;
  return queries;
}

export default useQuery;
