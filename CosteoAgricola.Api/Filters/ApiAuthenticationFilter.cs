using CosteoAgricola.Api.App_Start;
using CosteoAgricola.Core;
using CosteoAgricola.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;

namespace CosteoAgricola.Api.Filters
{
    public class ApiAuthenticationFilter : AuthenticationFilter
    {
        public ApiAuthenticationFilter()
        {
        }

        public ApiAuthenticationFilter(bool isActive)
            : base(isActive)
        {
        }

        protected override bool OnAuthorizeUser(string username, string password, HttpActionContext actionContext)
        {
            bool success = base.OnAuthorizeUser(username, password, actionContext);

            if (!success)
                return success;

            var _userservice = AutofacConfig.Resolve<IUsuarioService>();
            var user = _userservice.GetUsuario(username, password);

            if (user != null)
            {
                Authentication basicAuthenticationIdentity = null;

                if (Thread.CurrentPrincipal.Identity is Authentication)
                {
                    basicAuthenticationIdentity = Thread.CurrentPrincipal.Identity as Authentication;
                    basicAuthenticationIdentity.UserID = user.usuario_id;
                }

                return true;
            }
            else
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, new { errors = "Error usuario no autorizado." });
                return false;
            }
        }
    }
}