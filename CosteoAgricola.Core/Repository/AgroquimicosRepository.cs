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
    public interface IAgroquimicosRepository : IRepositoryBase<AGROQUIMICO>
    {
        AGROQUIMICO GetAgroquimico(int id);
        AGROQUIMICO GetAgroquimico(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }
    public class AgroquimicosRepository : RepositoryBase<AGROQUIMICO>, IAgroquimicosRepository
    {
        public AgroquimicosRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public AGROQUIMICO GetAgroquimico(int id)
        {
            var query = new Sql()
                .Select("*")
                .From("AGROQUIMICOS")
                .Where("lower(agroq_id) = @0", id);

            var agro = this.Context.SingleOrDefault<AGROQUIMICO>(query);

            return agro;
        }

        public AGROQUIMICO GetAgroquimico(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("AGROQUIMICOS")
              .Where("lower(agroq_nomComercial) = @0", desc.ToLower());

            var agro = this.Context.SingleOrDefault<AGROQUIMICO>(query);

            return agro;
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
    }
