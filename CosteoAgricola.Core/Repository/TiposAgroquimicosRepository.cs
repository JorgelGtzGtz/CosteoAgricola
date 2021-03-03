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
    public interface ITiposAgroquimicosRepository : IRepositoryBase<TIPO_AGROQUIMICO>
    {
        TIPO_AGROQUIMICO GetTipoAgro(int id);
        TIPO_AGROQUIMICO GetTipoAgro(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }

    public class TiposAgroquimicosRepository : RepositoryBase<TIPO_AGROQUIMICO>, ITiposAgroquimicosRepository
    {
        public TiposAgroquimicosRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }

        public TIPO_AGROQUIMICO GetTipoAgro(int id)
        {
            var query = new Sql()
               .Select("*")
               .From("TIPO_AGROQUIMICO")
               .Where("lower(tipoAgroq_id) = @0", id);

            var agro = this.Context.SingleOrDefault<TIPO_AGROQUIMICO>(query);

            return agro;
        }

        public TIPO_AGROQUIMICO GetTipoAgro(string desc)
        {
            var query = new Sql()
               .Select("*")
               .From("TIPO_AGROQUIMICO")
               .Where("lower(tipoAgroq_desc) = @0", desc);

            var agro = this.Context.SingleOrDefault<TIPO_AGROQUIMICO>(query);

            return agro;
        }
    }
    }
