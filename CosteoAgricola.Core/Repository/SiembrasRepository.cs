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
    public interface ISiembrasRepository : IRepositoryBase<SIEMBRA>
    {
        SIEMBRA GetSiembra(int id);
        SIEMBRA GetSiembra(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }
    public class SiembrasRepository : RepositoryBase<SIEMBRA>, ISiembrasRepository
    {
        public SiembrasRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public SIEMBRA GetSiembra(int id)
        {
            var query = new Sql()
               .Select("*")
               .From("SIEMBRAS")
               .Where("lower(siembra_id) = @0", id);

            var siembra = this.Context.SingleOrDefault<SIEMBRA>(query);

            return siembra;
        }

        public SIEMBRA GetSiembra(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("SIEMBRAS")
              .Where("lower(siembra_descripcion) = @0", desc.ToLower());

            var siembra = this.Context.SingleOrDefault<SIEMBRA>(query);

            return siembra;
        }
        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
