#pragma checksum "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\Administration\CreateRole.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a1eb4ddbf4a42dca033a3be3925fb5b47c227fe1"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Administration_CreateRole), @"mvc.1.0.view", @"/Views/Administration/CreateRole.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Administration/CreateRole.cshtml", typeof(AspNetCore.Views_Administration_CreateRole))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\_ViewImports.cshtml"
using sc.react.core;

#line default
#line hidden
#line 2 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\_ViewImports.cshtml"
using sc.react.core.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a1eb4ddbf4a42dca033a3be3925fb5b47c227fe1", @"/Views/Administration/CreateRole.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5b3490eed255d82286aac94ab9382eed5bc169f3", @"/Views/_ViewImports.cshtml")]
    public class Views_Administration_CreateRole : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<sc.react.core.Models.CreateRoleViewModel>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 2 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\Administration\CreateRole.cshtml"
  
    ViewBag.Title = "Create New Role";
    Layout = "~/Views/Shared/_LoginLayout.cshtml";

#line default
#line hidden
            BeginContext(148, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 7 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\Administration\CreateRole.cshtml"
 using (Html.BeginForm("CreateRole", "Administration", FormMethod.Post, new { @class = "form-horizontal", role = "form" }))
{
    

#line default
#line hidden
            BeginContext(283, 23, false);
#line 9 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\Administration\CreateRole.cshtml"
Write(Html.AntiForgeryToken());

#line default
#line hidden
            EndContext();
            BeginContext(369, 58, false);
#line 12 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\Administration\CreateRole.cshtml"
Write(Html.ValidationSummary("", new { @class = "text-danger" }));

#line default
#line hidden
            EndContext();
            BeginContext(429, 75, true);
            WriteLiteral("    <div class=\"form-group\">\r\n        <div class=\"col-md-12\">\r\n            ");
            EndContext();
            BeginContext(505, 93, false);
#line 15 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\Administration\CreateRole.cshtml"
       Write(Html.TextBoxFor(m => m.RoleName, new { @class = "form-control", @placeholder = "Role Name" }));

#line default
#line hidden
            EndContext();
            BeginContext(598, 30, true);
            WriteLiteral("\r\n        </div>\r\n    </div>\r\n");
            EndContext();
            BeginContext(634, 182, true);
            WriteLiteral("    <div class=\"form-group\">\r\n        <div class=\"col-md-12\">\r\n            <input type=\"submit\" class=\"btn btn-primary btn-block mb-3\" value=\"Create\" />\r\n        </div>\r\n    </div>\r\n");
            EndContext();
#line 24 "D:\Smaran\Practice\TestNavigator\sc.react.core\Views\Administration\CreateRole.cshtml"
}

#line default
#line hidden
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<sc.react.core.Models.CreateRoleViewModel> Html { get; private set; }
    }
}
#pragma warning restore 1591
