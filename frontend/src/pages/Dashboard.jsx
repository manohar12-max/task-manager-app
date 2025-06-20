import React, { useEffect, useState } from "react";
import api from "../services/api";
import dayjs from "dayjs";
import TaskCard from "../components/TaskCard";
import TaskModalForm from "../components/modals/TaskModalForm";
import TaskModalView from "../components/modals/TaskModalView";
import { FaSpinner, FaPlus, FaFileExport } from "react-icons/fa";
import { toast } from "react-toastify"; 
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formModalMode, setFormModalMode] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);
  const now = dayjs();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      toast.error("Error fetching tasks")
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      toast.error("Error deleting task")
      console.error("Error deleting task:", err);
    }
  };

  const handleExport = async () => {
    if (!tasks.length) {
      alert("No tasks to export.");
      return;
    }
    try {
      const res = await api.get("/tasks/export/", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  const openCreateModal = () => {
    setCurrentTask(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setFormModalMode("edit");
    setIsFormModalOpen(true);
  };

  const openViewModal = (task) => {
    setViewTask(task);
    setIsViewModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (formModalMode === "edit") {
        const res= await api.put(`/tasks/${currentTask.id}/`, formData);
       if(res.data){
        toast.success("Task updated successfully")
       }

      } else {
        const res=await api.post("/tasks/", formData);
         console.log(res.data)
           if(res.data){
        toast.success("Task created successfully")
       }
      }
      fetchTasks();
    } catch (err) {
      toast.error("Error creating task")
      console.error("Error submitting task:", err);
    }
    setIsFormModalOpen(false);
    setCurrentTask(null);
  };

  const highPriorityTasks = tasks.filter(
    (task) => dayjs(task.due_date).diff(now, "day") <= 1
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-slate-100 py-6 px-1 flex flex-col">
      <div className="max-w-5xl w-full mx-auto bg-white shadow-lg rounded-xl p-6 flex-grow overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="sm:text-3xl text-xl font-bold text-slate-800  text-center sm:text-left">
            Task Dashboard
          </h1>

          <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
            <button
              onClick={openCreateModal}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-1 sm:px-4 py-2 rounded transition flex items-center justify-between"
            >
              <FaPlus className="inline mr-1 text-sm sm:text-xl" />{" "}
              <span className="text-sm sm:text-xl">New Task</span>
            </button>
            <button
              onClick={handleExport}
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-1 sm:px-4 py-2 rounded transition flex items-center justify-between"
            >
              <FaFileExport className="inline mr-1 text-sm sm:text-xl" />{" "}
              <span className=" text-sm sm:text-xl">
                Export <span className="hidden md:inline-block">to Excel</span>
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="text-blue-500 animate-spin text-4xl" />
          </div>
        ) : (
          <>
            {highPriorityTasks.length > 0 && (
              <div className="mb-8">
                <h2 className="sm:text-xl text-lg font-bold text-red-600 mb-2">
                  ⚠️ Due Soon
                </h2>
                <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                  {highPriorityTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isDueSoon
                      onEdit={() => openEditModal(task)}
                      onDelete={() => handleDelete(task.id)}
                      onView={() => openViewModal(task)}
                    />
                  ))}
                </div>
              </div>
            )}

            {tasks.length > 0 ? (
              <div className="space-y-3">
                <h2 className="sm:text-xl text-lg font-bold text-slate-700 mb-3">
                  All Tasks
                </h2>
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isDueSoon={dayjs(task.due_date).diff(now, "day") <= 1}
                    onEdit={() => openEditModal(task)}
                    onDelete={() => handleDelete(task.id)}
                    onView={() => openViewModal(task)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500">
                <p className="text-lg">You don’t have any tasks yet.</p>
                <button
                  onClick={openCreateModal}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Add Your First Task
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <TaskModalView
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={viewTask}
      />
      <TaskModalForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={currentTask}
        mode={formModalMode}
      />
    </div>
  );
}

export default Dashboard;
