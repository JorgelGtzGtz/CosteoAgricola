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
    public interface IFertilizantesRepository : IRepositoryBase<FERTILIZANTE>
    {
        FERTILIZANTE GetFertilizante(int id);
        FERTILIZANTE GetFertilizante(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }

    public class FertilizantesRepository : RepositoryBase<FERTILIZANTE>, IFertilizantesRepository
    {
        public FertilizantesRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public FERTILIZANTE GetFertilizante(int id)
        {
            var query = new Sql()
                .Select("*")
                .From("FERTILIZANTES")
                .Where("lower(fert_id) = @0", id);

            var fert = this.Context.SingleOrDefault<FERTILIZANTE>(query);

            return fert;
        }

        public FERTILIZANTE GetFertilizante(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("FERTILIZANTES")
              .Where("lower(fert_desc) = @0", desc.ToLower());

            var fert = this.Context.SingleOrDefault < FERTILIZANTE>(query);

            return fert;
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
