import type { PageLoad } from "./$types";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || "https://rust-svelte-api.devstroop.com"
export const load: PageLoad = async () => {
  return {
    todos: (await fetch(`${apiEndpoint}/api/todos`).then((data: any) => {
      console.log(data);
      return data.todos.json();
    })) as Todo[]
  };
};
