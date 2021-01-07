
using dbconnection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CAgricola.Api.Controllers
{
    public class UnidadesController : ApiController
    {
        dbconnectionDB DB = new dbconnectionDB();

        [HttpGet]
        public IEnumerable<UNIDADES> Get()
        {

            var listado = DB.Query<UNIDADES>("SELECT * FROM UNIDADES");
            return listado;
        }

        [HttpGet]
        public IEnumerable<UNIDADES> Get(int id)
        {

            var unidad = DB.Query<UNIDADES>("SELECT * FROM UNIDADES  WHERE  unidad_id = "+id);

            return unidad;
        }

    }

}
