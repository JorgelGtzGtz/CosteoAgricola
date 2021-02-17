using CosteoAgricola.Core.Factories;
using dbconnection;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Repository
{
    public interface ITiposUnidadesRepository : IRepositoryBase<UNIDAD_TIPO>
    {
        UNIDAD_TIPO GetUnidadTipo(int id);
        UNIDAD_TIPO GetUnidadTipo(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }

        public class TiposUnidadesRepository : RepositoryBase<UNIDAD_TIPO>, ITiposUnidadesRepository
    { 
        public TiposUnidadesRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public UNIDAD_TIPO GetUnidadTipo(int id)
        {
            var query = new Sql()
               .Select("*")
               .From("UNIDAD_TIPO")
               .Where("lower(unidTipo_id) = @0", id);

            var unidadTipo = this.Context.SingleOrDefault<UNIDAD_TIPO>(query);

            return unidadTipo;
        }

        public UNIDAD_TIPO GetUnidadTipo(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("UNIDAD_TIPO")
              .Where("lower(unidTipo_desc) = @0", desc.ToLower());

            var unidadTipo = this.Context.SingleOrDefault<UNIDAD_TIPO>(query);

            return unidadTipo;
        }
        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
