import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

function TaskCard({ task, onEdit, onDelete, isDueSoon, onView }) {
  const bgClass = isDueSoon
    ? "bg-red-100 border-red-300"
    : "bg-green-100 border-green-300";

  return (
    <div
      className={`py-2 px-1 sm:p-4 border rounded-xl shadow-sm ${bgClass} flex justify-between items-center gap-3 sm:gap-4`}
    >
      <div className="flex-1 overflow-hidden px-1">
        <h3
          onClick={() => onView(task)}
          className="font-semibold text-base sm:text-lg text-slate-800 mb-1 cursor-pointer"
        >
          {task.title}
        </h3>

        <p className="text-sm text-slate-600 truncate sm:line-clamp-2">
          {task.description}
        </p>

        <p className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
          <span>
            Effort: {task.effort_to_complete_task} day
            {task.effort_to_complete_task > 1 ? "s" : ""}
          </span>
          <span>Due: {task.due_date}</span>
        </p>
      </div>

      <div className="flex flex-col justify-start sm:justify-center sm:items-end gap-3 pt-2 sm:pt-0">
        <button
          onClick={() => onView(task)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          title="View"
        >
          <FiEye className="text-lg" />
        </button>
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          title="Edit"
        >
          <FiEdit2 className="text-lg" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 cursor-pointer"
          title="Delete"
        >
          <FiTrash2 className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
