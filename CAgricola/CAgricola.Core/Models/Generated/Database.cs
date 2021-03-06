




















// This file was automatically generated by the PetaPoco T4 Template
// Do not make changes directly to this file - edit the template instead
// 
// The following connection settings were used to generate this file
// 
//     Connection String Name: `dbconnection`
//     Provider:               `System.Data.SqlClient`
//     Connection String:      `Data Source=198.38.83.33;Initial Catalog=hiram74_costeoagricola;Persist Security Info=True;User ID=hiram74_residencias;Password=Admin123!`
//     Schema:                 ``
//     Include Views:          `False`



using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PetaPoco;

namespace dbconnection
{

	public partial class dbconnectionDB : Database
	{
		public dbconnectionDB() 
			: base("dbconnection")
		{
			CommonConstruct();
		}

		public dbconnectionDB(string connectionStringName) 
			: base(connectionStringName)
		{
			CommonConstruct();
		}
		
		partial void CommonConstruct();
		
		public interface IFactory
		{
			dbconnectionDB GetInstance();
		}
		
		public static IFactory Factory { get; set; }
        public static dbconnectionDB GetInstance()
        {
			if (_instance!=null)
				return _instance;
				
			if (Factory!=null)
				return Factory.GetInstance();
			else
				return new dbconnectionDB();
        }

		[ThreadStatic] static dbconnectionDB _instance;
		
		public override void OnBeginTransaction()
		{
			if (_instance==null)
				_instance=this;
		}
		
		public override void OnEndTransaction()
		{
			if (_instance==this)
				_instance=null;
		}
        

		public class Record<T> where T:new()
		{
			public static dbconnectionDB repo { get { return dbconnectionDB.GetInstance(); } }
			public bool IsNew() { return repo.IsNew(this); }
			public object Insert() { return repo.Insert(this); }

			public void Save() { repo.Save(this); }
			public int Update() { return repo.Update(this); }

			public int Update(IEnumerable<string> columns) { return repo.Update(this, columns); }
			public static int Update(string sql, params object[] args) { return repo.Update<T>(sql, args); }
			public static int Update(Sql sql) { return repo.Update<T>(sql); }
			public int Delete() { return repo.Delete(this); }
			public static int Delete(string sql, params object[] args) { return repo.Delete<T>(sql, args); }
			public static int Delete(Sql sql) { return repo.Delete<T>(sql); }
			public static int Delete(object primaryKey) { return repo.Delete<T>(primaryKey); }
			public static bool Exists(object primaryKey) { return repo.Exists<T>(primaryKey); }
			public static bool Exists(string sql, params object[] args) { return repo.Exists<T>(sql, args); }
			public static T SingleOrDefault(object primaryKey) { return repo.SingleOrDefault<T>(primaryKey); }
			public static T SingleOrDefault(string sql, params object[] args) { return repo.SingleOrDefault<T>(sql, args); }
			public static T SingleOrDefault(Sql sql) { return repo.SingleOrDefault<T>(sql); }
			public static T FirstOrDefault(string sql, params object[] args) { return repo.FirstOrDefault<T>(sql, args); }
			public static T FirstOrDefault(Sql sql) { return repo.FirstOrDefault<T>(sql); }
			public static T Single(object primaryKey) { return repo.Single<T>(primaryKey); }
			public static T Single(string sql, params object[] args) { return repo.Single<T>(sql, args); }
			public static T Single(Sql sql) { return repo.Single<T>(sql); }
			public static T First(string sql, params object[] args) { return repo.First<T>(sql, args); }
			public static T First(Sql sql) { return repo.First<T>(sql); }
			public static List<T> Fetch(string sql, params object[] args) { return repo.Fetch<T>(sql, args); }
			public static List<T> Fetch(Sql sql) { return repo.Fetch<T>(sql); }
			public static List<T> Fetch(long page, long itemsPerPage, string sql, params object[] args) { return repo.Fetch<T>(page, itemsPerPage, sql, args); }
			public static List<T> Fetch(long page, long itemsPerPage, Sql sql) { return repo.Fetch<T>(page, itemsPerPage, sql); }
			public static List<T> SkipTake(long skip, long take, string sql, params object[] args) { return repo.SkipTake<T>(skip, take, sql, args); }
			public static List<T> SkipTake(long skip, long take, Sql sql) { return repo.SkipTake<T>(skip, take, sql); }
			public static Page<T> Page(long page, long itemsPerPage, string sql, params object[] args) { return repo.Page<T>(page, itemsPerPage, sql, args); }
			public static Page<T> Page(long page, long itemsPerPage, Sql sql) { return repo.Page<T>(page, itemsPerPage, sql); }
			public static IEnumerable<T> Query(string sql, params object[] args) { return repo.Query<T>(sql, args); }
			public static IEnumerable<T> Query(Sql sql) { return repo.Query<T>(sql); }

		}

	}
	



    

	[TableName("dbo.sysdiagrams")]



	[PrimaryKey("diagram_id")]




	[ExplicitColumns]

    public partial class sysdiagram : dbconnectionDB.Record<sysdiagram>  
    {



		[Column] public string name { get; set; }





		[Column] public int principal_id { get; set; }





		[Column] public int diagram_id { get; set; }





		[Column] public int? version { get; set; }





		[Column] public byte[] definition { get; set; }



	}

    

	[TableName("hiram74_residencias.AGROQUIMICOS")]



	[PrimaryKey("agrog_id")]




	[ExplicitColumns]

    public partial class AGROQUIMICO : dbconnectionDB.Record<AGROQUIMICO>  
    {



		[Column] public int agrog_id { get; set; }





		[Column] public string agroq_nomComercial { get; set; }





		[Column] public int? tipo_insumo { get; set; }





		[Column] public int? agroq_estado { get; set; }





		[Column] public int? agroq_tipo { get; set; }





		[Column] public int? agroq_formulacion { get; set; }





		[Column] public int? agroq_unidad { get; set; }





		[Column] public string agroq_descInertes { get; set; }





		[Column] public double? agroq_concInertes { get; set; }





		[Column] public string agroq_registro { get; set; }





		[Column] public int? agroq_reentrada { get; set; }





		[Column] public int? agroq_unidadReent { get; set; }





		[Column] public int? agroq_intervSeg { get; set; }





		[Column] public int? agroq_unidadSeg { get; set; }





		[Column] public decimal? agroq_costoProm { get; set; }





		[Column] public double? agroq_existencia { get; set; }





		[Column] public bool? agroq_status { get; set; }





		[Column] public bool? agroq_inventariable { get; set; }





		[Column] public string agroq_obs { get; set; }



	}

    

	[TableName("hiram74_residencias.DETALLE_AGROQUIMICOS")]



	[PrimaryKey("detAgroq_ID")]




	[ExplicitColumns]

    public partial class DETALLE_AGROQUIMICO : dbconnectionDB.Record<DETALLE_AGROQUIMICO>  
    {



		[Column] public int detAgroq_ID { get; set; }





		[Column] public int? agrog_id { get; set; }





		[Column] public int? ingredAct_id { get; set; }





		[Column] public double? detAgroq_concent { get; set; }





		[Column] public int? unidad_ID { get; set; }





		[Column] public bool? detAgroq_status { get; set; }



	}

    

	[TableName("hiram74_residencias.EMPRESA")]



	[PrimaryKey("emp_id")]




	[ExplicitColumns]

    public partial class EMPRESA : dbconnectionDB.Record<EMPRESA>  
    {



		[Column] public int emp_id { get; set; }





		[Column] public string emp_nombre { get; set; }





		[Column] public decimal? emp_totalHect { get; set; }



	}

    

	[TableName("hiram74_residencias.FERTILIZANTES")]



	[PrimaryKey("fert_id")]




	[ExplicitColumns]

    public partial class FERTILIZANTE : dbconnectionDB.Record<FERTILIZANTE>  
    {



		[Column] public int fert_id { get; set; }





		[Column] public string fert_desc { get; set; }





		[Column] public int? tipo_insumo { get; set; }





		[Column] public int? fert_estado { get; set; }





		[Column] public string fert_funcion { get; set; }





		[Column] public double? fert_N { get; set; }





		[Column] public double? fert_P { get; set; }





		[Column] public double? fert_K { get; set; }





		[Column] public double? fert_S { get; set; }





		[Column] public string fert_otrasComp { get; set; }





		[Column] public int? fert_unidad { get; set; }





		[Column] public decimal? fert_costoProm { get; set; }





		[Column] public double? fert_existencia { get; set; }





		[Column] public bool? fert_status { get; set; }





		[Column] public bool? fert_inventariable { get; set; }





		[Column] public string fert_obs { get; set; }



	}

    

	[TableName("hiram74_residencias.INGREDIENTES_ACTIVOS")]



	[PrimaryKey("ingredAct_id")]




	[ExplicitColumns]

    public partial class INGREDIENTES_ACTIVO : dbconnectionDB.Record<INGREDIENTES_ACTIVO>  
    {



		[Column] public int ingredAct_id { get; set; }





		[Column] public string ingredAct_desc { get; set; }





		[Column] public int? unidad_ID { get; set; }





		[Column] public bool? ingredAct_status { get; set; }



	}

    

	[TableName("hiram74_residencias.LOTES")]



	[PrimaryKey("lote_ID")]




	[ExplicitColumns]

    public partial class LOTE : dbconnectionDB.Record<LOTE>  
    {



		[Column] public int lote_ID { get; set; }





		[Column] public string lote_descripcion { get; set; }





		[Column] public decimal? lote_superficie { get; set; }





		[Column] public bool? lote_status { get; set; }





		[Column] public string lote_ubicación { get; set; }





		[Column] public string lote_obs { get; set; }



	}

    

	[TableName("hiram74_residencias.PROCESOS_PERMISOS")]



	[PrimaryKey("procesoPermiso_id")]




	[ExplicitColumns]

    public partial class PROCESOS_PERMISO : dbconnectionDB.Record<PROCESOS_PERMISO>  
    {



		[Column] public int procesoPermiso_id { get; set; }





		[Column] public string procesoPermiso_des { get; set; }



	}

    

	[TableName("hiram74_residencias.PRODUCTOS")]



	[PrimaryKey("prod_id")]




	[ExplicitColumns]

    public partial class PRODUCTO : dbconnectionDB.Record<PRODUCTO>  
    {



		[Column] public int prod_id { get; set; }





		[Column] public string prod_desc { get; set; }





		[Column] public int? tipo_insumo { get; set; }





		[Column] public int? prod_unidad { get; set; }





		[Column] public decimal? prod_costoProm { get; set; }





		[Column] public double? prod_existencia { get; set; }





		[Column] public bool? prod_costeo { get; set; }





		[Column] public bool? prod_status { get; set; }





		[Column] public bool? prod_inventariable { get; set; }





		[Column] public string prod_obs { get; set; }



	}

    

	[TableName("hiram74_residencias.SEMILLAS")]



	[PrimaryKey("sem_ID")]




	[ExplicitColumns]

    public partial class SEMILLA : dbconnectionDB.Record<SEMILLA>  
    {



		[Column] public int sem_ID { get; set; }





		[Column] public string sem_desc { get; set; }





		[Column] public int? sem_unidad { get; set; }





		[Column] public int? tipo_insumo { get; set; }





		[Column] public int? sem_upm { get; set; }





		[Column] public double? sem_pm { get; set; }





		[Column] public string sem_variedad { get; set; }





		[Column] public decimal? sem_costoProm { get; set; }





		[Column] public double? sem_existencia { get; set; }





		[Column] public bool? sem_status { get; set; }





		[Column] public bool? sem_inventariable { get; set; }





		[Column] public string sem_obs { get; set; }



	}

    

	[TableName("hiram74_residencias.TIPO_AGROQUIMICO")]



	[PrimaryKey("tipoAgroq_id")]




	[ExplicitColumns]

    public partial class TIPO_AGROQUIMICO : dbconnectionDB.Record<TIPO_AGROQUIMICO>  
    {



		[Column] public int tipoAgroq_id { get; set; }





		[Column] public string tipoAgroq_desc { get; set; }





		[Column] public string tipoAgroq_funcion { get; set; }





		[Column] public bool? tipoAgroq_status { get; set; }



	}

    

	[TableName("hiram74_residencias.TIPO_USUARIO")]



	[PrimaryKey("tipoUsuario_id")]




	[ExplicitColumns]

    public partial class TIPO_USUARIO : dbconnectionDB.Record<TIPO_USUARIO>  
    {



		[Column] public int tipoUsuario_id { get; set; }





		[Column] public string tipoUsuario_desc { get; set; }





		[Column] public bool? tipoUsuario_status { get; set; }



	}

    

	[TableName("hiram74_residencias.UNIDAD_TIPO")]



	[PrimaryKey("unidTipo_id")]




	[ExplicitColumns]

    public partial class UNIDAD_TIPO : dbconnectionDB.Record<UNIDAD_TIPO>  
    {



		[Column] public int unidTipo_id { get; set; }





		[Column] public string unidTipo_desc { get; set; }





		[Column] public bool? unidadTipo_status { get; set; }



	}

    

	[TableName("hiram74_residencias.UNIDADES")]



	[PrimaryKey("unidad_id")]




	[ExplicitColumns]

    public partial class UNIDADES : dbconnectionDB.Record<UNIDADES>
    {



		[Column] public int unidad_id { get; set; }





		[Column] public string unidad_desc { get; set; }





		[Column] public string unidad_abrev { get; set; }





		[Column] public bool? unidad_status { get; set; }





		[Column] public int? unidad_tipo { get; set; }



	}

    

	[TableName("hiram74_residencias.USUARIO")]



	[PrimaryKey("usuario_id")]




	[ExplicitColumns]

    public partial class USUARIO : dbconnectionDB.Record<USUARIO>  
    {



		[Column] public int usuario_id { get; set; }





		[Column] public int? emp_id { get; set; }





		[Column] public string usuario_nom { get; set; }





		[Column] public string usuario_correo { get; set; }





		[Column] public string usuario_telefono { get; set; }





		[Column] public string usuario_genero { get; set; }





		[Column] public int? tipoUsuario_id { get; set; }





		[Column] public string usuario_login { get; set; }





		[Column] public string usuario_password { get; set; }





		[Column] public bool? usuario_status { get; set; }



	}


}
