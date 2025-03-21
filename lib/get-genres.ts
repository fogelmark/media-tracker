export async function getGenres() {
  const res = await fetch("http://localhost:3000/api/genres");
  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }
  return res.json();
}
