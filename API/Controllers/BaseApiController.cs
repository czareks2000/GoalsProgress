using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{   
    [ApiController]
    [Route("api")]
    public class BaseApiController : ControllerBase
    {
        private DataContext _context;
        protected DataContext Context => _context ??= 
            HttpContext.RequestServices.GetService<DataContext>();
    }
}