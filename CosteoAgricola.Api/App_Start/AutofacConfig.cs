using Autofac;
using Autofac.Core;
using Autofac.Integration.WebApi;
using CosteoAgricola.Core.Factories;
using CosteoAgricola.Core.Repository;
using CosteoAgricola.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace CosteoAgricola.Api.App_Start
{
    public class AutofacConfig
    {

        public static IContainer Container;
        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<DbFactory>().As<IDbFactory>().AsImplementedInterfaces();
            builder.RegisterType<AccesosRepository>().As<IAccesosRepository>().AsImplementedInterfaces();
            builder.RegisterType<AccesosTipoUsuarioRepository>().As<IAccesosTipoUsuarioRepository>().AsImplementedInterfaces();
            builder.RegisterType<TipoUsuarioRepository>().As<ITipoUsuarioRepository>().AsImplementedInterfaces();
            builder.RegisterType<UsuarioRepository>().As<IUsuarioRepository>().AsImplementedInterfaces();
            builder.RegisterType<SemillasRepository>().As<ISemillasRepository>().AsImplementedInterfaces();
            builder.RegisterType<UnidadesRepository>().As<IUnidadesRepository>().AsImplementedInterfaces();
            builder.RegisterType<FertilizantesRepository>().As<IFertilizantesRepository>().AsImplementedInterfaces();
            builder.RegisterType<AgroquimicosRepository>().As<IAgroquimicosRepository>().AsImplementedInterfaces();
            builder.RegisterType<ProductosRepository>().As<IProductosRepository>().AsImplementedInterfaces();
            builder.RegisterType<LotesRepository>().As<ILotesRepository>().AsImplementedInterfaces();
            builder.RegisterType<TiposUnidadesRepository>().As<ITiposUnidadesRepository>().AsImplementedInterfaces();


            builder.RegisterType<ListaCombosService>().As<IListaCombosService>().AsImplementedInterfaces();
            builder.RegisterType<TipoUsuarioService>().As<ITipoUsuarioService>().AsImplementedInterfaces();
            builder.RegisterType<UsuarioService>().As<IUsuarioService>().AsImplementedInterfaces();
            builder.RegisterType<SemillasService>().As<ISemillasService>().AsImplementedInterfaces();
            builder.RegisterType<UnidadesService>().As<IUnidadesService>().AsImplementedInterfaces();
            builder.RegisterType<FertilizantesService>().As<IFertilizantesService>().AsImplementedInterfaces();
            builder.RegisterType<AgroquimicosService>().As<IAgroquimicoService>().AsImplementedInterfaces();
            builder.RegisterType<ProductosService>().As<IProductosService>().AsImplementedInterfaces();
            builder.RegisterType<LotesService>().As<ILotesService>().AsImplementedInterfaces();
            builder.RegisterType<TipoUnidadesService>().As<ITipoUnidadesService>().AsImplementedInterfaces();


            Container = builder.Build();

            return Container;
        }

        public static T Resolve<T>()
        {
            if (Container == null)
            {
                throw new Exception("AutofacConfig hasn't been Initialize!");
            }

            return Container.Resolve<T>(new Parameter[0]);
        }
    }
}