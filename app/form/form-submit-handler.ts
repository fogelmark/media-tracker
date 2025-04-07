export const handleSubmit = async (values: any): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("/api/books/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.error || "Something went wrong",
      };
    }

    return {
      success: true,
      message: "Book added successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
};