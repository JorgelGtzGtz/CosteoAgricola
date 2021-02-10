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
    public interface ILotesRepository : IRepositoryBase<LOTE>
    {
        LOTE GetLote(int id);
        LOTE GetLote(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }

    public class LotesRepository : RepositoryBase<LOTE>, ILotesRepository
    {
        public LotesRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public LOTE GetLote(int id)
        {
            var query = new Sql()
                .Select("*")
                .From("LOTES")
                .Where("lower(lote_ID) = @0", id);

            var item = this.Context.SingleOrDefault<LOTE>(query);

            return item;
        }

        public LOTE GetLote(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("LOTES")
              .Where("lower(lote_descripcion) = @0", desc.ToLower());

            var item = this.Context.SingleOrDefault<LOTE>(query);

            return item;
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
