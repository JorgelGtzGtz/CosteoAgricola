using dbconnection;
using CosteoAgricola.Core.Entities;
using CosteoAgricola.Core.Factories;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Repository
{
    public interface IUsuarioRepository : IRepositoryBase<USUARIO>
    {
        List<dynamic> GetByDynamicFilter(Sql sql);
        USUARIO GetUsuario(string usr, string password);
        USUARIO GetUsuario(string usr);
    }

    public class UsuarioRepository : RepositoryBase<USUARIO>, IUsuarioRepository
    {
        public UsuarioRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public USUARIO GetUsuario(string usr, string password)
        {
            var query = new Sql()
                .Select("*")
                .From("USUARIO")
                .Where("lower(usuario_login) = @0 and usuario_password = @1", usr.ToLower(), password);

            var user = this.Context.SingleOrDefault<USUARIO>(query);

            return user;
        }

        public USUARIO GetUsuario(string usr)
        {
            var query = new Sql()
                .Select("*")
                .From("USUARIO")
                .Where("lower(usuario_login) = @0", usr.ToLower());

            var user = this.Context.SingleOrDefault<USUARIO>(query);

            return user;
        }

        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
