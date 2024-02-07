import axios from "axios";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [task, setTask] = useState([]);

  // Function to handle form input change
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Function to handle form submission
  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post("/api/hello", data);
      console.log(req);
      setData({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to fetch all tasks from the backend
  const getAllTasks = async () => {
    try {
      const req = await axios.get("/api/hello");
      console.log(req);
      setTask(req.data.alltasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Delete The Data
  async function deletedhandler(id) {
    const req = await axios.delete(`/api/hello?id=${id}`);
    console.log(req);
    getAllTasks();
  }
  // Delete The Data

  // Fetch tasks on component mount or when data changes
  useEffect(() => {
    getAllTasks();
  }, [data]);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="w-[50vw] h-[50vh] bg-red-600 my-20 mx-auto rounded-3xl">
        <form
          onSubmit={formHandler}
          className="flex flex-col items-center gap-10 p-10"
        >
          <input
            name="title"
            value={data.title}
            onChange={inputHandler}
            placeholder="Enter Your Task"
            className="py-5 px-10 w-1/2 rounded-10"
            type="text"
          />
          <textarea
            onChange={inputHandler}
            value={data.description}
            name="description"
            placeholder="Enter Your Description"
            className="py-5 px-10 w-1/2 rounded-10"
            type="text"
          />
          <button
            className="bg-[#FF9800] py-5 px-10 rounded-[50px] font-bold"
            type="submit"
          >
            Add Your Task
          </button>
        </form>
      </div>

      {task.map((taskItem, index) => (
        <div key={index}>
          <div className="cards bg-slate-300 p-5  ">
            <div className="py-[10px]flex flex-col ">
              <h3>{taskItem.title}</h3>
              <p>{taskItem.description}</p>
              <button
                className="py-2 px-3 bg-red-800 rounded-[50px]"
                onClick={() => {
                  deletedhandler(taskItem._id);
                }}
              >
                Delete The Task
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
