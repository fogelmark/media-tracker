export const handleSubmit = async (values: any) => {
  try {
    console.log("Sending request with values:", values); // Logga vad som skickas

    const response = await fetch("/api/books/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    console.log("Response status:", response.status); // Logga statuskoden

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData); // Logga error från backend
      throw new Error(errorData.error || "Something went wrong");
    }

    console.log("Book added successfully!");
  } catch (error) {
    console.error("Request failed:", error);
  }
};

