using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Task>> GetTasks();
        Task<Task> GetTask(double id);
        Task<Task> AddTask(Task task);
        Task DeleteTask(int id);
    }
}
