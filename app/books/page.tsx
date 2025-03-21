import BookForm from "./book-form/book-form";

export default function Page() {
  // const [genres, setGenres] = useState<{ _id: string; name: string }[]>([]);


  // TODO - Move this to an API route (see open-api.ts)
  // const fetchGenres = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/genres");
  //     if (response.status !== 200) {
  //       throw new Error("Failed to fetch genres");
  //     }
  //     setGenres(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchGenres();
  // }, []);



  return (
    <div className="flex justify-center">
      <BookForm />
    </div>
  );
}
