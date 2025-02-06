import { BarChart2, TrendingUp, Users, Package } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Disaster Response Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Disasters</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <BarChart2 className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Response Time</p>
              <p className="text-2xl font-bold">18.5m</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">People Assisted</p>
              <p className="text-2xl font-bold">2,847</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Supply Usage</p>
              <p className="text-2xl font-bold">76%</p>
            </div>
            <Package className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Disaster Type Distribution</h2>
          <div className="space-y-4">
            {[
              { type: 'Earthquake', count: 5, percentage: 40 },
              { type: 'Flood', count: 3, percentage: 25 },
              { type: 'Hurricane', count: 2, percentage: 20 },
              { type: 'Wildfire', count: 2, percentage: 15 }
            ].map(item => (
              <div key={item.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.type}</span>
                  <span className="text-gray-600">{item.count} incidents</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Response Efficiency</h2>
          <div className="space-y-4">
            {[
              { metric: 'Initial Response', value: '92%', trend: 'up' },
              { metric: 'Resource Allocation', value: '87%', trend: 'up' },
              { metric: 'Communication', value: '95%', trend: 'up' },
              { metric: 'Recovery Rate', value: '89%', trend: 'up' }
            ].map(item => (
              <div key={item.metric} className="flex items-center justify-between">
                <span className="text-gray-600">{item.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{item.value}</span>
                  <TrendingUp className={`h-4 w-4 ${
                    item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}