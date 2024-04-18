import React, { useEffect, useRef, useState } from "react";
import deleteIcon from "../../../public/delete-bin-7-line.svg";

function Home() {
  const nameRef = useRef();
  const categoryRef = useRef();
  const authorRef = useRef();
  const ratingRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  const [books, setBooks] = useState([]);

  function handleClick() {
    const newBook = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      author: authorRef.current.value,
      rating: ratingRef.current.value,
      about: aboutRef.current.value,
    };

    const newBooks = [...books, newBook];

    localStorage.setItem("books", JSON.stringify(newBooks));

    setBooks(newBooks);

    nameRef.current.value = "";
    categoryRef.current.value = "";
    authorRef.current.value = "";
    ratingRef.current.value = "";
    aboutRef.current.value = "";
  }

  function deleteBook(index) {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1); 

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  }
  return (
    <>
      <div className="rounded-xl bg-white-800 text-[#000] font-medium">
        <h1 className="font-serif font-bold text-[34px] text-center">Your information</h1>
        <div className="flex  mb-8 gap-4 p-4">
          <input
            type="text"
            placeholder="Name"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-slate-800	ml-2 mb-2"
            ref={nameRef}
          />
          <input
            type="text"
            placeholder="Last name"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-slate-800	ml-2 mb-2"
            ref={categoryRef}
          />
          <input
            type="number"
            placeholder="+998"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-slate-800	ml-2 mb-2"
            ref={authorRef}
          />
          <input
            type="text"
            placeholder="steet"
            className="input w-full max-w-xs bg-transparent border-solid border-2 border-slate-800	ml-2 mb-2"
            ref={aboutRef}
          />
          <button className="btn-circle btn-success text-white bg-slate-600 w-40" onClick={handleClick}>
            +
          </button>
        </div>
        <div className="my-6 border-2 border-slate-900 bg-zinc-300 rounded-lg p-6 flex gap-10 flex-wrap justify-center ">
          {books.map((item, index) => (
            <div key={index} className="card w-80 bg-gray-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  {item.name}
                  <div className="rounded-lg px-2 badge-secondary">
                    {item.category}
                  </div>
                </h2>
                <p>{item.about}</p>
                <div className="flex justify-between">
                  <img
                    className="w-8 cursor-pointer"
                    src={deleteIcon}
                    alt=""
                    onClick={() => deleteBook(index)}
                  />
                  <div className="card-actions justify-end">
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
