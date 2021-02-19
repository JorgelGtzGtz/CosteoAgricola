using CosteoAgricola.Core.Repository;
using dbconnection;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
    public interface IProductosService
    {
        PRODUCTO GetProducto(int id);
        PRODUCTO GetProducto(string desc);
        List<PRODUCTO> GetProductos();
        List<dynamic> GetProductosFiltro(string nombre = null, string inventariable = null, string estatus = null);
        bool InsertUpdateProducto(PRODUCTO productos, out string Message);
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

        public PRODUCTO GetProducto(int id)
        {
            return _productosRepository.Get(id);
        }

        public PRODUCTO GetProducto(string desc)
        {
            return _productosRepository.GetProducto(desc);
        }

        public List<PRODUCTO> GetProductos()
        {
            return _productosRepository.GetAll("PRODUCTOS").ToList();
        }

        
        public List<dynamic> GetProductosFiltro(string nombre, string inventariable, string estatus)
        {
            string filter = " ";
            string filter2 = " ";
            string filter3 = " ";

            if (inventariable.Equals("false") && estatus.Equals("false") && (string.IsNullOrEmpty(nombre) || !string.IsNullOrEmpty(nombre)))
            {
                inventariable = null;
                estatus = null;
            }

            if (!string.IsNullOrEmpty(nombre))
            {
                filter += " Where " + string.Format("pt.prod_desc like '%{0}%'", nombre);
            }

            if ((!string.IsNullOrEmpty(inventariable)))
            {
                if (!filter.Contains("Where"))
                {

                    filter2 += " Where " + string.Format("pt.prod_inventariable = '{0}'", inventariable);
                }
                else
                {
                    filter2 += "and " + string.Format("pt.prod_inventariable = '{0}'", inventariable);
                }

            }

            if ((!string.IsNullOrEmpty(estatus)))
            {
                if (!filter.Contains("Where") && !filter2.Contains("Where"))
                {
                    filter3 += " Where " + string.Format("pt.prod_status = '{0}'", estatus);
                }
                else
                {
                    filter3 += "and " + string.Format("pt.prod_status = '{0}'", estatus);
                }

            }





            Sql query = new Sql(@"select pt.*, p.unidad_desc as NombreUnidad from  UNIDADES p
                                 inner join PRODUCTOS pt on pt.prod_unidad = p.unidad_id"
                                 + (!string.IsNullOrEmpty(nombre) ? filter : "")
                                 + (!string.IsNullOrEmpty(inventariable) ? filter2 : "")
                                 + (!string.IsNullOrEmpty(estatus) ? filter3 : ""));

            return _productosRepository.GetByDynamicFilter(query);
        }
        
        public bool InsertUpdateProducto(PRODUCTO productos, out string Message)
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
