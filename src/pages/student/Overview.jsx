import { useEffect, useState } from 'react'
import { Edit, Download, Trash2, Shield, Bell, Calendar, ExternalLink, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { skillOptions, studyTimeOptions, languageOptions } from '../../mock/user'
import { get } from '../../services/api'

export default function Overview() {
  const defaultUser = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    avatar: '',
    consentGiven: false,
    uiLanguage: 'en',
    emailNotifications: false,
    smsNotifications: false,
    testReminders: false,
    classReminders: false,
    progressReminders: false,
    twoFactorEnabled: false,
    studyTime: 'morning',
    skillFocus: [],
    linkedServices: { apeuni: false, googleCalendar: false },
    loginHistory: [],
  }
  const [user, setUser] = useState(defaultUser)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false })
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    nationality: user.nationality
  })
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [profile, logins, skills] = await Promise.all([
          get('/api/user/profile'),
          get('/api/user/login-history'),
          get('/api/user/skills'),
        ])
        if (!mounted) return
        const mappedProfile = {
          name: profile?.name || '',
          email: profile?.email || '',
          phone: profile?.phone || '',
          dateOfBirth: profile?.date_of_birth ? new Date(profile.date_of_birth).toISOString().slice(0,10) : '',
          nationality: profile?.nationality || '',
          avatar: profile?.avatar || '',
          consentGiven: !!profile?.consent_given,
          uiLanguage: profile?.ui_language || 'en',
          emailNotifications: !!profile?.email_notifications,
          smsNotifications: !!profile?.sms_notifications,
          testReminders: !!profile?.test_reminders,
          classReminders: !!profile?.class_reminders,
          progressReminders: !!profile?.progress_reminders,
          twoFactorEnabled: !!profile?.two_factor_enabled,
        }
        const mappedLogins = Array.isArray(logins)
          ? logins.map(l => ({
              id: l.id,
              date: l.date ? new Date(l.date).toLocaleString() : '',
              ip: l.ip || '',
              device: l.device || '',
            }))
          : []
        const mappedSkills = Array.isArray(skills) ? skills.map(s => s.value).filter(Boolean) : []
        const merged = {
          ...defaultUser,
          ...mappedProfile,
          loginHistory: mappedLogins,
          skillFocus: mappedSkills,
        }
        setUser(merged)
        setEditForm({
          name: merged.name,
          email: merged.email,
          phone: merged.phone,
          dateOfBirth: merged.dateOfBirth,
          nationality: merged.nationality,
        })
      } catch (err) {
        console.error('Failed to load profile:', err)
        toast.error('Không tải được dữ liệu hồ sơ từ API')
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setUser({ ...user, ...editForm })
    setEditModalOpen(false)
    toast.success('Profile updated successfully!')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('New passwords do not match!')
      return
    }
    setPasswordForm({ current: '', new: '', confirm: '' })
    setChangePasswordOpen(false)
    toast.success('Password changed successfully!')
  }

  const handleDownloadData = () => {
    toast.success('Data download started! Check your downloads folder.')
  }

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false)
    toast.success('Account deletion request submitted!')
  }

  const handleToggle = (field) => {
    setUser({ ...user, [field]: !user[field] })
    toast.success(`${field} ${!user[field] ? 'enabled' : 'disabled'}`)
  }

  const handleSkillFocusChange = (skill) => {
    const newSkillFocus = user.skillFocus.includes(skill)
      ? user.skillFocus.filter(s => s !== skill)
      : [...user.skillFocus, skill]
    setUser({ ...user, skillFocus: newSkillFocus })
  }

  const handleConnectService = (service) => {
    setUser({
      ...user,
      linkedServices: {
        ...user.linkedServices,
        [service]: !user.linkedServices[service]
      }
    })
    toast.success(`${service} ${!user.linkedServices[service] ? 'connected' : 'disconnected'}!`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Overview</h1>
      
      {/* Personal Profile */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Profile</h2>
          <button
            onClick={() => setEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
          >
            <Edit size={16} />
            Edit
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              <span className="text-gray-900 dark:text-white">{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Date of Birth:</span>
              <span className="text-gray-900 dark:text-white">{user.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Nationality:</span>
              <span className="text-gray-900 dark:text-white">{user.nationality}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Data */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy & Data</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Data Consent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow us to use your data for improving services</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.consentGiven}
                onChange={() => handleToggle('consentGiven')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 dark:peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand"></div>
            </label>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleDownloadData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Download size={16} />
              Download My Data
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>
        </div>
      </section>

      {/* Account Settings */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h2>
        <div className="space-y-6">
          {/* Change Password */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Password</h3>
              <button
                onClick={() => setChangePasswordOpen(true)}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* 2FA Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.twoFactorEnabled}
                onChange={() => handleToggle('twoFactorEnabled')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 dark:peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand"></div>
            </label>
          </div>

          {/* Login History */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Login History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Date</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">IP Address</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Device</th>
                  </tr>
                </thead>
                <tbody>
                  {user.loginHistory.map((login) => (
                    <tr key={login.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 text-gray-900 dark:text-white">{login.date}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{login.ip}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{login.device}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Preferences */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Learning Preferences</h2>
        <div className="space-y-6">
          {/* Skill Focus */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Skill Focus</h3>
            <div className="grid grid-cols-2 gap-3">
              {skillOptions.map((skill) => (
                <label key={skill.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.skillFocus.includes(skill.value)}
                    onChange={() => handleSkillFocusChange(skill.value)}
                    className="rounded border-gray-300 text-brand focus:ring-brand"
                  />
                  <span className="text-gray-900 dark:text-white">{skill.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Study Time */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Preferred Study Time</h3>
            <div className="space-y-2">
              {studyTimeOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="studyTime"
                    value={option.value}
                    checked={user.studyTime === option.value}
                    onChange={(e) => setUser({ ...user, studyTime: e.target.value })}
                    className="text-brand focus:ring-brand"
                  />
                  <span className="text-gray-900 dark:text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* UI Language */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">UI Language</h3>
            <select
              value={user.uiLanguage}
              onChange={(e) => setUser({ ...user, uiLanguage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
            >
              {languageOptions.map((lang) => (
                <option key={lang.id} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Linked Services */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Linked Services</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <ExternalLink size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">APEUni</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect your APEUni account for enhanced features</p>
              </div>
            </div>
            <button
              onClick={() => handleConnectService('apeuni')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                user.linkedServices.apeuni
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30'
                  : 'bg-brand text-white hover:bg-brand/90'
              }`}
            >
              {user.linkedServices.apeuni ? 'Disconnect' : 'Connect'}
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Google Calendar</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sync your study schedule with Google Calendar</p>
              </div>
            </div>
            <button
              onClick={() => handleConnectService('googleCalendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                user.linkedServices.googleCalendar
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30'
                  : 'bg-brand text-white hover:bg-brand/90'
              }`}
            >
              {user.linkedServices.googleCalendar ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
        <div className="space-y-6">
          {/* Notification Methods */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Notification Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Email Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 dark:peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">SMS Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.smsNotifications}
                    onChange={() => handleToggle('smsNotifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 dark:peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Reminder Types */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Reminder Types</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.testReminders}
                  onChange={() => handleToggle('testReminders')}
                  className="rounded border-gray-300 text-brand focus:ring-brand"
                />
                <span className="text-gray-900 dark:text-white">Test Reminders</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.classReminders}
                  onChange={() => handleToggle('classReminders')}
                  className="rounded border-gray-300 text-brand focus:ring-brand"
                />
                <span className="text-gray-900 dark:text-white">Class Reminders</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.progressReminders}
                  onChange={() => handleToggle('progressReminders')}
                  className="rounded border-gray-300 text-brand focus:ring-brand"
                />
                <span className="text-gray-900 dark:text-white">Progress Reminders</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={editForm.dateOfBirth}
                  onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nationality</label>
                <input
                  type="text"
                  value={editForm.nationality}
                  onChange={(e) => setEditForm({ ...editForm, nationality: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-brand"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setChangePasswordOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <Trash2 size={20} className="text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete Account</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}