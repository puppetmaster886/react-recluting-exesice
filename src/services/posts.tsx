export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
