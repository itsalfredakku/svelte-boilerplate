<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import {Notifications, acts} from '@tadashi/svelte-notification'
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || "http://192.168.1.16:8080";

  // Get todos from page load
  export let data: PageData;
  let todos = data.todos;

  onMount(() => {
    const form = document.getElementById("todoForm");

    // Add event listener to the form
    form?.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the form from submitting the default way

      // Capture form data
      const formData = new FormData(form as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      try {
        // Send JSON data to the API
        const response = await fetch(`${apiEndpoint}/api/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          console.error("Error submitting form:", response.statusText);
          acts.add({
            message: response.statusText,
            mode: 'error'
          })
        } else {
          // Optionally, fetch updated todos and update the `todos` array
          const newTodo = await response.json().then((data) => data.todo);
          todos = [...todos, newTodo];
          // Clear form input
          (form as HTMLFormElement).reset();
          acts.add({
            message: 'Todo added successfully',
            mode: 'success'
          })
        }
      } catch (error) {
        console.error("Fetch error:", error);
        acts.add({
          message: error,
          mode: 'error'
        })
      }
    });
  });

  // Update todo
  async function updateTodo(id: string, todo: any) {
    await fetch(`${apiEndpoint}/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        content: todo.content,
        completed: todo.completed,
      }),
    }).then((response) => {
      if (!response.ok) {
        console.error("Error updating todo:", response.statusText);
        acts.add({
          message: response.statusText,
          mode: 'error'
        })
      } else {
        acts.add({
          message: 'Todo updated successfully',
          mode: 'success'
        })
      }
    });
  }

  // Delete todo
  async function deleteTodo(id: string) {
    await fetch(`${apiEndpoint}/api/todos/${id}`, { method: "DELETE" }).then((response) => {
      if (!response.ok) {
        console.error("Error deleting todo:", response.statusText);
        acts.add({
          message: response.statusText,
          mode: 'error'
        })
      } else {
        todos = todos.filter((todo) => todo.id?.id?.String !== id);
        acts.add({
          message: 'Todo deleted successfully',
          mode: 'success'
        })
      }
    });
  }
</script>

<Notifications />

<div class="container mx-auto mt-16">
  <h1 class="h1 text-center">Todos</h1>

  <div class="max-w-screen-md mx-auto">
    <form id="todoForm">
      <input
        class="input p-4 my-8"
        name="title"
        type="text"
        placeholder="What needs to be done?"
        autocomplete="off"
      />
    </form>

    <div class="space-y-4">
      {#each todos as todo}
        <div class="flex items-center justify-between p-4 bg-surface-800 rounded-lg gap-4">
          <input
            class="checkbox"
            type="checkbox"
            bind:checked={todo.completed}
            on:change={() => updateTodo(todo.id?.id?.String || "", todo)}
          />
          <input class="input" type="text" bind:value={todo.title} disabled={todo.completed} />

          <div class="flex gap-2">
            <button class="btn variant-filled-secondary" on:click={() => updateTodo(todo.id?.id?.String ?? "", todo)}>
              Update
            </button>
            <button class="btn variant-filled-primary" on:click={() => deleteTodo(todo.id?.id?.String ?? "")}>
              Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
