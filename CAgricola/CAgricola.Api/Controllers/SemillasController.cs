using dbconnection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CAgricola.Api.Controllers
{
    [Route("api/Semillas")]
    public class SemillasController : ApiController
    {
        dbconnectionDB DB = new dbconnectionDB();
        [HttpPost]
        public void Post(int id, string desc,int unidad,int tipo_ins, int upm, float pm,string variedad,int costo,float existencia,bool status,bool inven,string obs)
        {
            DB.Query<SEMILLA>("INSERT INTO SEMILLAS(sem_ID,sem_desc,sem_unidad,tipo_insumo,sem_upm,sem_pm,sem_variedad,sem_costoProm,sem_existencia,sem_status,sem_inventariable,sem_obs)" +
                "VALUES("+id+","+desc+","+unidad+","+tipo_ins+","+upm+","+pm+","+variedad+","+costo+","+existencia+","+status+","+inven+","+obs+")");
        }
    }
}
