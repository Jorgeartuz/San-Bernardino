import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../lib/constants';
import { ShoppingBag, TrendingUp, Clock, AlertCircle, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pedidosHoy: 0,
    ventasHoy: 0,
    pendientes: 0,
    agotados: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [stockAlerts, setStockAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 1. Obtener Pedidos y Ventas de hoy
      const { data: ordersToday } = await supabase
        .from('orders')
        .select('total, status')
        .gte('created_at', today.toISOString());

      // 2. Obtener Productos Agotados
      const { count: agotadosCount } = await supabase
        .from('menu_items')
        .select('*', { count: 'exact', head: true })
        .eq('available', false);

      // 3. Obtener Pedidos Recientes
      const { data: recent } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // 4. Obtener Alertas de Inventario (Ingredientes bajos)
      const { data: ingredients } = await supabase
        .from('ingredients')
        .select('*')
        .lt('stock_current', 5); // Ejemplo: menos de 5 unidades/kg

      // Procesar Estadísticas
      const totalVentas = ordersToday?.reduce((acc, curr) => acc + Number(curr.total), 0) || 0;
      const pendientesCount = ordersToday?.filter(o => o.status === 'abierta').length || 0;

      setStats({
        pedidosHoy: ordersToday?.length || 0,
        ventasHoy: totalVentas,
        pendientes: pendientesCount,
        agotados: agotadosCount || 0
      });

      setRecentOrders(recent || []);
      setStockAlerts(ingredients || []);

    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-sb-red animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Actualizando cifras...</p>
      </div>
    );
  }

  const kpis = [
    { name: 'Pedidos Hoy', value: stats.pedidosHoy.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Ventas Hoy', value: formatCurrency(stats.ventasHoy), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Pendientes', value: stats.pendientes.toString(), icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Agotados', value: stats.agotados.toString(), icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 1. KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
              <h3 className="text-2xl font-black text-sb-dark tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Pedidos Recientes */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-black text-sb-dark uppercase tracking-tight">Actividad Reciente</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
                <tr>
                  <th className="px-8 py-4">Orden</th>
                  <th className="px-8 py-4">Cliente</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4 font-black text-xs">#{order.order_number}</td>
                    <td className="px-8 py-4 text-sm font-medium text-gray-600">{order.customer_name || 'Cliente Web'}</td>
                    <td className="px-8 py-4 font-black text-sb-dark">{formatCurrency(order.total)}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        order.status === 'abierta' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-gray-400 italic text-sm">No hay pedidos registrados aún.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Alertas de Inventario */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
           <h3 className="text-lg font-black text-sb-dark uppercase tracking-tight mb-8">Alertas de Stock</h3>
           <div className="space-y-6">
              {stockAlerts.length > 0 ? stockAlerts.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-2xl border border-red-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-red-700">{item.name}</span>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-tighter">Bajo nivel</span>
                  </div>
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest">{item.stock_current} {item.unit}</span>
                </div>
              )) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp size={24} />
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Inventario al día</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}