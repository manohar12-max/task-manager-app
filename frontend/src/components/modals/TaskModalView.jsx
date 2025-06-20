import React from 'react';
import { FaTimes } from 'react-icons/fa';
import {
  MdTitle,
  MdOutlineDescription,
  MdAccessTimeFilled,
  MdCalendarToday,
} from 'react-icons/md';

function TaskViewModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-6 sm:p-8 relative animate-fade-in">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-xl"
        >
          <FaTimes />
        </button>

        <div className="flex items-center justify-center gap-2 mb-6">
          <MdOutlineDescription className="text-indigo-600 text-2xl" />
          <h2 className="text-2xl font-bold text-indigo-700">Task Details</h2>
        </div>

        <div className="space-y-5 text-slate-800 text-sm sm:text-base">
         
          <div className="flex items-start sm:items-center gap-4">
            <MdTitle className="text-blue-500 text-xl sm:text-2xl" />
            <div>
              <h3 className="font-semibold">Title</h3>
              <p className="text-slate-700 break-words">{task.title}</p>
            </div>
          </div>

        
          <div className="flex items-start gap-4">
            <MdOutlineDescription className="text-green-500 text-xl sm:text-2xl mt-1" />
            <div className="w-full">
              <h3 className="font-semibold mb-1">Description</h3>
              <div className="border rounded-md p-3 bg-slate-50  max-h-50 overflow-y-auto text-slate-700 text-sm ">
               <p>
                 {task.description || 'No description provided.'}
               </p>
              </div>
            </div>
          </div>

         
          <div className="flex items-start sm:items-center gap-4">
            <MdAccessTimeFilled className="text-purple-500 text-xl sm:text-2xl" />
            <div>
              <h3 className="font-semibold">Effort to Complete</h3>
              <p>{task.effort_to_complete_task} day(s)</p>
            </div>
          </div>

      
          <div className="flex items-start sm:items-center gap-4">
            <MdCalendarToday className="text-orange-500 text-xl sm:text-2xl" />
            <div>
              <h3 className="font-semibold">Due Date</h3>
              <p>{task.due_date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskViewModal;
