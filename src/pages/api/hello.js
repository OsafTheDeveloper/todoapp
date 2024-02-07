import databaseConnection from "@/DB/dbConnection";
import Todo from "@/Models/todo";
databaseConnection();
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const alltasks = await Todo.find();
        res.send({
          mesaage: "All Users",
          success: true,
          alltasks,
        });
      } catch (error) {
        console.log(error);
        res.send({
          message: "SomeThing Went Wrong",
          success: false,
        });
      }

      break;

    case "POST":
      try {
        const createdtask = await Todo.create(req.body);
        res.send({
          mesaage: "All Users",
          success: true,
          createdtask,
        });
      } catch (error) {
        console.log(error);
        res.send({
          message: "SomeThing Went Wrong",
          success: false,
        });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        console.log(id);
        const deletedTask = await Todo.findByIdAndDelete(id);
        res.send({
          mesaage: " Task Deleted ",
          success: true,
          deletedTask,
        });
      } catch (error) {
        console.log(error);
        res.send({
          message: "SomeThing Went Wrong",
          success: false,
        });
      }
      break;
  }
}
