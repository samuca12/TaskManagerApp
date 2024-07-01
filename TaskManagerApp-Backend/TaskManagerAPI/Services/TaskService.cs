using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerAPI.Models;
using TaskManagerAPI.Repositories;

namespace TaskManagerAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<IEnumerable<Models.Task>> GetTasks()
        {
            return await _taskRepository.GetTasks();
        }

        public async Task<Models.Task> GetTask(int id)
        {
            return await _taskRepository.GetTask(id);
        }

        public async Task<Models.Task> AddTask(Models.Task task)
        {
            if (string.IsNullOrEmpty(task.Title))
                throw new ArgumentException("Title cannot be null or empty");

            return await _taskRepository.AddTask(task);
        }

        public async Task<Models.Task> DeleteTask(int id)
        {
            return await _taskRepository.DeleteTask(id);
        }
        public async Task<bool> UpdateTask(Models.Task model,int id)
        {
            model.Id = id;
            return await _taskRepository.UpdateTask(model);
        }


    }
}
