namespace Application.Interfaces
{
    public interface IExportDataService
    {
        Task<MemoryStream> GenerateZip();
    }
}