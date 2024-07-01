





namespace TaskManagerAPI.Repositories
{
    public interface ITaskRepository
    {
        Task<Models.Task> AddTask(Models.Task task);
        Task<Models.Task> DeleteTask(int id);
        Task<Models.Task> GetTask(int id);
        Task<IEnumerable<Models.Task>> GetTasks();
        Task<bool> UpdateTask(Models.Task task);
    }
}