import type { PageLoad } from "./$types";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || "http://localhost:8080"
export const load: PageLoad = async () => {
  return {
    todos: (await fetch(`${apiEndpoint}/api/todos`).then((res) => {
      return res.json().then((data) => {
        return data.todos;
      });
    })) as Todo[]
  };
};
