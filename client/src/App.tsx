import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [leads, setLeads] = useState<any[]>([]);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] =
    useState('');

  const [activeTab, setActiveTab] =
    useState('dashboard');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'New',
    source: 'Website',
  });

  const token = localStorage.getItem('token');

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        `https://gigflow-backend-vi1g.onrender.com/api/leads?search=${search}&status=${statusFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const createLead = async () => {
    try {
      if (
        !formData.name ||
        !formData.email
      ) {
        alert('Please fill all fields');
        return;
      }

      await axios.post(
        'https://gigflow-backend-vi1g.onrender.com/api/leads',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();

      setFormData({
        name: '',
        email: '',
        status: 'New',
        source: 'Website',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await axios.put(
        `https://gigflow-backend-vi1g.onrender.com/api/leads/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this lead?'
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://gigflow-backend-vi1g.onrender.com/api/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter]);

  const totalLeads = leads.length;

  const qualifiedLeads = leads.filter(
    (l) => l.status === 'Qualified'
  ).length;

  const contactedLeads = leads.filter(
    (l) => l.status === 'Contacted'
  ).length;

  const conversionRate =
    totalLeads > 0
      ? (
          (qualifiedLeads / totalLeads) *
          100
        ).toFixed(1)
      : 0;

  const getStatusColor = (
    status: string
  ) => {
    if (status === 'New')
      return 'bg-blue-400';

    if (status === 'Contacted')
      return 'bg-yellow-400';

    if (status === 'Qualified')
      return 'bg-green-400';

    if (status === 'Lost')
      return 'bg-red-400';

    return 'bg-gray-400';
  };

  return (
    <div className='min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white'>
      <div className='w-64 bg-[#111827] p-6 hidden md:block border-r border-gray-800'>
        <h1 className='text-3xl font-bold mb-10 text-cyan-400'>
          GigFlow
        </h1>

        <div className='space-y-5 text-gray-300'>
          <div
            onClick={() =>
              setActiveTab('dashboard')
            }
            className={`cursor-pointer transition hover:text-cyan-400 ${
              activeTab === 'dashboard'
                ? 'text-cyan-400'
                : ''
            }`}
          >
            Dashboard
          </div>

          <div
            onClick={() =>
              setActiveTab('leads')
            }
            className={`cursor-pointer transition hover:text-cyan-400 ${
              activeTab === 'leads'
                ? 'text-cyan-400'
                : ''
            }`}
          >
            Leads
          </div>

          <div
            onClick={() =>
              setActiveTab('analytics')
            }
            className={`cursor-pointer transition hover:text-cyan-400 ${
              activeTab === 'analytics'
                ? 'text-cyan-400'
                : ''
            }`}
          >
            Analytics
          </div>

          <div
            onClick={() =>
              setActiveTab('settings')
            }
            className={`cursor-pointer transition hover:text-cyan-400 ${
              activeTab === 'settings'
                ? 'text-cyan-400'
                : ''
            }`}
          >
            Settings
          </div>
        </div>
      </div>

      <div className='flex-1 p-6 md:p-10 overflow-auto'>
        <div className='flex justify-between items-center mb-10'>
          <div>
            <h1 className='text-4xl font-bold'>
              <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                Smart Leads Dashboard
              </span>
            </h1>

            <p className='text-gray-400 mt-2'>
              Manage and track your
              sales pipeline
            </p>
          </div>

          <div className='bg-cyan-500 px-5 py-2 rounded-full font-semibold shadow-lg'>
            Sales Admin
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className='relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 p-10 rounded-3xl shadow-2xl mb-10 hover:scale-[1.01] transition duration-300'>
              <div className='absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>

              <div className='relative z-10'>
                <h2 className='text-5xl font-extrabold mb-5 leading-tight'>
                  SMART CRM for <br />
                  Modern Sales Teams 
                </h2>

                <p className='text-lg text-white/80 max-w-2xl mb-8'>
                  Track leads, monitor
                  conversions, manage
                  sales pipelines, and
                  grow your business
                  faster with GigFlow.
                </p>

                <div className='flex gap-5 flex-wrap'>
                  <button
                    onClick={() =>
                      setActiveTab(
                        'leads'
                      )
                    }
                    className='bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition'
                  >
                    Manage Leads
                  </button>

                  <button className='border border-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition'>
                    View Analytics
                  </button>
                </div>
              </div>
            </div>

            <div className='grid md:grid-cols-3 gap-5 mb-10'>
              <div className='bg-[#1e293b] p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300'>
                <p className='text-gray-400'>
                  Active Sales Agents
                </p>

                <h2 className='text-4xl font-bold mt-2'>
                  12
                </h2>
              </div>

              <div className='bg-[#1e293b] p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300'>
                <p className='text-gray-400'>
                  Monthly Revenue
                </p>

                <h2 className='text-4xl font-bold mt-2'>
                  ₹1.2L
                </h2>
              </div>

              <div className='bg-[#1e293b] p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300'>
                <p className='text-gray-400'>
                  Pipeline Growth
                </p>

                <h2 className='text-4xl font-bold mt-2 text-green-400'>
                  +28%
                </h2>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-10'>
              <div className='bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300'>
                <h2 className='text-lg'>
                  Total Leads
                </h2>

                <p className='text-4xl font-bold mt-3'>
                  {totalLeads}
                </p>
              </div>

              <div className='bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300'>
                <h2 className='text-lg'>
                  Contacted
                </h2>

                <p className='text-4xl font-bold mt-3'>
                  {contactedLeads}
                </p>
              </div>

              <div className='bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300'>
                <h2 className='text-lg'>
                  Qualified
                </h2>

                <p className='text-4xl font-bold mt-3'>
                  {qualifiedLeads}
                </p>
              </div>

              <div className='bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300'>
                <h2 className='text-lg'>
                  Conversion Rate
                </h2>

                <p className='text-4xl font-bold mt-3'>
                  {conversionRate}%
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'leads' && (
          <>
            <div className='bg-[#1e293b] p-6 rounded-2xl shadow-xl mb-10'>
              <h2 className='text-2xl font-bold mb-5'>
                Create New Lead
              </h2>

              <div className='grid md:grid-cols-5 gap-4'>
                <input
                  type='text'
                  placeholder='Lead Name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className='bg-[#334155] p-3 rounded-xl outline-none'
                />

                <input
                  type='email'
                  placeholder='Lead Email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className='bg-[#334155] p-3 rounded-xl outline-none'
                />

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className='bg-[#334155] p-3 rounded-xl outline-none'
                >
                  <option>New</option>
                  <option>
                    Contacted
                  </option>
                  <option>
                    Qualified
                  </option>
                  <option>Lost</option>
                </select>

                <select
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      source: e.target.value,
                    })
                  }
                  className='bg-[#334155] p-3 rounded-xl outline-none'
                >
                  <option>Website</option>
                  <option>Instagram</option>
                  <option>Referral</option>
                </select>

                <button
                  onClick={createLead}
                  className='bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition'
                >
                  Add Lead
                </button>
              </div>
            </div>

            <div className='flex flex-wrap gap-4 mb-8'>
              <input
                type='text'
                placeholder='Search Leads'
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className='bg-[#1e293b] px-5 py-3 rounded-xl outline-none'
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className='bg-[#1e293b] px-5 py-3 rounded-xl outline-none'
              >
                <option value=''>
                  All Leads
                </option>

                <option value='New'>
                  New
                </option>

                <option value='Contacted'>
                  Contacted
                </option>

                <option value='Qualified'>
                  Qualified
                </option>

                <option value='Lost'>
                  Lost
                </option>
              </select>
            </div>

            <div className='bg-[#1e293b] rounded-2xl overflow-hidden shadow-xl'>
              <table className='w-full'>
                <thead className='bg-[#0f172a]'>
                  <tr>
                    <th className='p-5 text-left'>
                      Name
                    </th>

                    <th className='p-5 text-left'>
                      Email
                    </th>

                    <th className='p-5 text-left'>
                      Status
                    </th>

                    <th className='p-5 text-left'>
                      Source
                    </th>

                    <th className='p-5 text-left'>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {leads.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className='text-center p-10 text-gray-400'
                      >
                        No Leads Found 🚫
                      </td>
                    </tr>
                  )}

                  {leads.map((lead: any) => (
                    <tr
                      key={lead._id}
                      className='border-b border-gray-700 hover:bg-[#334155] transition'
                    >
                      <td className='p-5'>
                        {lead.name}
                      </td>

                      <td className='p-5 text-gray-300'>
                        {lead.email}
                      </td>

                      <td className='p-5'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(
                              lead.status
                            )}`}
                          ></div>

                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateStatus(
                                lead._id,
                                e.target.value
                              )
                            }
                            className='bg-[#334155] px-3 py-2 rounded-lg outline-none'
                          >
                            <option>
                              New
                            </option>

                            <option>
                              Contacted
                            </option>

                            <option>
                              Qualified
                            </option>

                            <option>
                              Lost
                            </option>
                          </select>
                        </div>
                      </td>

                      <td className='p-5'>
                        {lead.source}
                      </td>

                      <td className='p-5'>
                        <button
                          onClick={() =>
                            deleteLead(
                              lead._id
                            )
                          }
                          className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className='bg-[#1e293b] p-10 rounded-2xl text-center'>
            <h2 className='text-3xl font-bold mb-5'>
              Analytics Coming Soon
            </h2>

            <p className='text-gray-400'>
              Future charts and sales
              insights will appear
              here.
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className='bg-[#1e293b] p-10 rounded-2xl text-center'>
            <h2 className='text-3xl font-bold mb-5'>
              Settings
            </h2>

            <p className='text-gray-400'>
              User profile and CRM
              preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;