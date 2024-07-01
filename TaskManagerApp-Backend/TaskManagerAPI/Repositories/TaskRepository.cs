using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Models;
using TaskManagerAPI.Data;

namespace TaskManagerAPI.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskContext _context;

        public TaskRepository(TaskContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Models.Task>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<Models.Task> GetTask(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<Models.Task> AddTask(Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> UpdateTask(Models.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Models.Task> DeleteTask(int id)
        {
            Models.Task task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return null;
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }


    }
}
