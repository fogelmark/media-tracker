import axios from "axios";

export async function getGenres() {
  try {
    const response = await axios.get("http://localhost:3000/api/genres");
    if (response.status !== 200) {
      throw new Error("Failed to fetch genres");
    }
    // setGenres(response.data);
  } catch (error) {
    console.error(error);
  }
}
