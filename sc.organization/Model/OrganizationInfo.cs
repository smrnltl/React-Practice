using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sc.organization
{
    public class OrganizationInfo
    {
        public string Id { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public int CountryCode { get; set; }
        public int StateCode { get; set; }
        public int DistrictCode { get; set; }
        public int LocalUnitCode { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string PAN { get; set; }
        public string Username { get; set; }
    }

    public class OrganizationReturnInfo
    {
        public string Id { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public int CountryCode { get; set; }
        public int StateCode { get; set; }
        public int DistrictCode { get; set; }
        public int LocalUnitCode { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string PAN { get; set; }
        public DateTime AddedOn { get; set; }
        public string AddedOnString { get{ return this.AddedOn.ToString("dd MMM, yyyy hh:mm:tt"); } }
    }
}
