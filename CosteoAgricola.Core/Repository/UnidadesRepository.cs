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
    public interface IUnidadesRepository  : IRepositoryBase<UNIDADES>
    {
        UNIDADES GetUnidad(int id);
        UNIDADES GetUnidad(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }
    public class UnidadesRepository : RepositoryBase<UNIDADES>, IUnidadesRepository
    {
        public UnidadesRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public UNIDADES GetUnidad(int id)
        {
            var query = new Sql()
                .Select("*")
                .From("UNIDADES")
                .Where("lower(unidad_id) = @0", id);

            var unidad = this.Context.SingleOrDefault<UNIDADES>(query);

            return unidad;
        }

        public UNIDADES GetUnidad(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("UNIDADES")
              .Where("lower(unidad_desc) = @0", desc.ToLower());

            var unidad = this.Context.SingleOrDefault<UNIDADES>(query);

            return unidad;
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
