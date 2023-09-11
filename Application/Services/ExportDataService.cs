using System.Globalization;
using System.IO.Compression;
using Application.Dto;
using Application.Interfaces;
using AutoMapper;
using CsvHelper;
using CsvHelper.Configuration;
using Domain.Enums;
using Persistence.Interfaces;

namespace Application.Services
{
    public class ExportDataService : IExportDataService
    {
        private readonly IUserAccessor _userAccessor;
        private readonly IGoalsRepository _goalsRepository;
        private readonly IMapper _mapper;

        public ExportDataService(
            IUserAccessor userAccessor,
            IGoalsRepository goalsRepository,
            IMapper mapper
        )
        {
            _userAccessor = userAccessor;
            _goalsRepository = goalsRepository;
            _mapper = mapper;
        }

        public async Task<MemoryStream> GenerateZip()
        {
            var allUserGoals = await _goalsRepository.GetAllAsync(_userAccessor.GetUserEmail());
            
            var userGoals = allUserGoals.FindAll(g => g.Status != GoalStatus.Deleted);
            var userProgresses =  userGoals.SelectMany(g => g.Progresses).ToList();
            var userCategories = userGoals.SelectMany(g => g.Categories).ToList();

            // Creating Dto objects (with fields as they will be in the csv file) 
            var goalsCsvDto = _mapper.Map<List<GoalCsvDto>>(userGoals);
            var progressesCsvDto = _mapper.Map<List<ProgressCsvDto>>(userProgresses);
            var categoriesCsvDto = _mapper.Map<List<CategoryCsvDto>>(userCategories);

            // Creating a ZIP archive in memory
            using var memoryStream = new MemoryStream();
            using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
            {
                // Adding the goals.csv file to the archive
                var goalsCsvEntry = archive.CreateEntry("goals.csv");
                using (var writer = new StreamWriter(goalsCsvEntry.Open()))
                using (var csv = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    csv.WriteRecords(goalsCsvDto);
                }
                
                // Adding the progresses.csv file to the archive
                var progressesCsvEntry = archive.CreateEntry("progresses.csv");
                using (var writer = new StreamWriter(progressesCsvEntry.Open()))
                using (var csv = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    csv.WriteRecords(progressesCsvDto);
                }

                // Adding the categories.csv file to the archive
                var categoriesCsvEntry = archive.CreateEntry("categories.csv");
                using (var writer = new StreamWriter(categoriesCsvEntry.Open()))
                using (var csv = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    csv.WriteRecords(categoriesCsvDto);
                }
            }

            // Returning a MemoryStream object containing the ZIP archive
            return memoryStream;
        }
    }
}