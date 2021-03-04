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
    public interface IIngredientesActivosRepository : IRepositoryBase<INGREDIENTES_ACTIVO>
    {
        INGREDIENTES_ACTIVO GetIngrediente(int id);
        INGREDIENTES_ACTIVO GetIngrediente(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }
    public class IngredientesActivosRepository : RepositoryBase<INGREDIENTES_ACTIVO>, IIngredientesActivosRepository
    {
        public IngredientesActivosRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }

        public INGREDIENTES_ACTIVO GetIngrediente(int id)
        {
            var query = new Sql()
              .Select("*")
              .From("INGREDIENTES_ACTIVO")
              .Where("lower(tipoAgroq_id) = @0", id);

            var ing = this.Context.SingleOrDefault<INGREDIENTES_ACTIVO>(query);

            return ing;
        }

        public INGREDIENTES_ACTIVO GetIngrediente(string desc)
        {
            var query = new Sql()
             .Select("*")
             .From("INGREDIENTES_ACTIVO")
             .Where("lower(tipoAgroq_desc) = @0", desc);

            var ing = this.Context.SingleOrDefault<INGREDIENTES_ACTIVO>(query);

            return ing;
        }
    }
    }
