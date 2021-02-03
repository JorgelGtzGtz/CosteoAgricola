using CosteoAgricola.Core.Repository;
using dbconnection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
    public interface IProductosService
    {
        PRODUCTOS GetProducto(int id);
        PRODUCTOS GetProducto(string desc);
        List<PRODUCTOS> GetProductos();
        // List<dynamic> GetUnidadesFiltro(string activo = null);
        bool InsertUpdateProducto(PRODUCTOS productos, out string Message);
        bool EliminarProducto(int id, out string Message);
    }
    public class ProductosService : IProductosService
    {
        private readonly IProductosRepository _productosRepository;

        public ProductosService(IProductosRepository productosRepository)
        {
            _productosRepository = productosRepository;
        }
        public bool EliminarProducto(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var pro = _productosRepository.Get(id);

                _productosRepository.Remove(pro);

                Message = "Producto eliminado " + pro.prod_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Producto No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public PRODUCTOS GetProducto(int id)
        {
            return _productosRepository.Get(id);
        }

        public PRODUCTOS GetProducto(string desc)
        {
            return _productosRepository.GetProducto(desc);
        }

        public List<PRODUCTOS> GetProductos()
        {
            return _productosRepository.GetAll("PRODUCTOS").ToList();
        }

        /*
        public List<dynamic> GetUnidadesFiltro(string activo = null)
        {
            string filter = " Where ";

            if (!string.IsNullOrEmpty(activo))
            {
                filter += string.Format("p.sem_status like '%{0}%'", activo);
            }

            Sql query = new Sql(@"select p.*, pt.sem_desc as NombreSemilla from SEMILLAS p
                                   on pt.sem_status = true" + (!string.IsNullOrEmpty(activo) ? filter : ""));
            return _unidadesRepository.GetByDynamicFilter(query);
        }
        */
        public bool InsertUpdateProducto(PRODUCTOS productos, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _productosRepository.InsertOrUpdate<int>(productos);

                Message = "Producto guardado " + productos.prod_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Producto No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }
    }
    }
