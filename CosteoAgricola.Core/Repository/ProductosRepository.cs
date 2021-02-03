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
    public interface IProductosRepository : IRepositoryBase<PRODUCTOS>
    {
        PRODUCTOS GetProducto(int id);
        PRODUCTOS GetProducto(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }
    public class ProductosRepository : RepositoryBase<PRODUCTOS>, IProductosRepository
    {
        public ProductosRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public PRODUCTOS GetProducto(int id)
        {
            var query = new Sql()
                .Select("*")
                .From("PRODUCTOS")
                .Where("lower(prod_id) = @0", id);

            var pro = this.Context.SingleOrDefault<PRODUCTOS>(query);

            return pro;
        }

        public PRODUCTOS GetProducto(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("PRODUCTOS")
              .Where("lower(prod_desc) = @0", desc.ToLower());

            var pro = this.Context.SingleOrDefault<PRODUCTOS>(query);

            return pro;
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
    }
