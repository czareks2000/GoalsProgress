using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api")]
    public class DataController : ControllerBase
    {
        private readonly IExportDataService _exportDataService;
        public DataController(IExportDataService exportDataService)
        {
            _exportDataService = exportDataService;
        }

        [Authorize]
        [HttpGet("download-zip")]
        public async Task<IActionResult> DownloadDataZip()
        {   
            try
            {
                var zipArchive = await _exportDataService.GenerateZip();

                return File(zipArchive.ToArray(), "application/zip", "goalsprogress.zip");
            }
            catch (Exception)
            {
                return StatusCode(500, $"An error occurred during generating zip file");
            }
        }
    }
}