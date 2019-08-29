using System;

namespace sc.module
{
    public class ModuleInfo
    {
        public int Id { get; set; }

        public string ModuleName { get; set; }

        public string ModuleCode { get; set; }

        public bool CanView { get; set; }

        public bool CanAdd { get; set; }

        public bool CanEdit { get; set; }

        public bool CanDelete { get; set; }

        public bool CanPrint { get; set; }

        public bool CanExport { get; set; }

        public bool CanImport { get; set; }

        public bool CanMessage { get; set; }
    }

    public class ModuleInfoList
    {
        public int Id { get; set; }

        public string ModuleName { get; set; }

        public string ModuleCode { get; set; }

        public bool CanView { get; set; }

        public bool CanAdd { get; set; }

        public bool CanEdit { get; set; }

        public bool CanDelete { get; set; }

        public bool CanPrint { get; set; }

        public bool CanExport { get; set; }

        public bool CanImport { get; set; }

        public bool CanMessage { get; set; }
        public bool Add { get; set; }
        public bool View { get; set; }

        public bool Edit { get; set; }

        public bool Delete { get; set; }

        public bool Print { get; set; }

        public bool Export { get; set; }

        public bool Import { get; set; }

        public bool Message { get; set; }
    }
}
