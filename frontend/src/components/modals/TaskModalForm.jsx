import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function TaskModalForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  mode = "",
}) {
  console.log(mode);
  console.log(initialData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [effort, setEffort] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      console.log(initialData)
      if (mode === "edit" && initialData) {
        setTitle(initialData.title || "");
        setDescription(initialData.description || "");
        setEffort(initialData.effort_to_complete_task || "");
        setDueDate(initialData.due_date || "");
      } else {
        setTitle("");
        setDescription("");
        setEffort("");
        setDueDate("");
      }
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !dueDate || !description || !effort || !dueDate) {
      toast.warn("Please fill all the fields.");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      effort_to_complete_task: Number(effort),
      due_date: dueDate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Edit Task" : "Create Task"}
        </h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
        </div>

        <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Effort (days)
            </label>
            <input
              type="number"
              min="1"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={effort}
              onChange={(e) => setEffort(e.target.value)}
              required={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date *</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required={true}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            {mode === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModalForm;
