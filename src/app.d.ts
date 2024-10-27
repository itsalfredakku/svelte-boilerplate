// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

interface Id {
  tb: string,
  id: {
    String: string;
  }
}


interface Todo {
  id?: Id;
  title: string;
  content?: string;
  completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface User {
  id?: Id;
  name: string;
  email: string;
  // password: string;
  created_at?: string;
  updated_at?: string;
}

interface Role {
  id?: Id;
  name: string;
  created_at?: string;
  updated_at?: string;
}