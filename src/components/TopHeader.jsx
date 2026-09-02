import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, ChevronDown, X } from 'lucide-react';
import { ALERTS, CASES, searchCases } from '../data/mockData';
import NotificationDropdown from './NotificationDropdown';
import UserProfileDropdown from './UserProfileDropdown';

function SearchResults({ results, onSelect, onClose }) {
  if (results.length === 0) return null;
  return (
    <div className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-50" style={{
      background: '#0A1422',
      border: '1px solid rgba(34,211,238,0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    }}>
      <div className="px-3 py-2 text-xs font-bold text-slate-600 tracking-wider uppercase" style={{
        borderBottom: '1px solid rgba(34,211,238,0.08)',
      }}>
        Search Results ({results.length})
      </div>
      {results.map(c => (
        <button
          key={c.id}
          className="w-full text-left px-4 py-3 hover:bg-cyan-400/5 transition-colors flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(34,211,238,0.05)' }}
          onClick={() => { onSelect(c); onClose(); }}
        >
          <div>
            <div className="text-sm font-bold text-slate-200">{c.id}</div>
            <div className="text-xs text-slate-500">{c.type} · {c.location} · {c.linkedAccount}</div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded font-bold ${
            c.risk === 'HIGH' ? 'risk-badge-high' :
            c.risk === 'MEDIUM' ? 'risk-badge-medium' : 'risk-badge-low'
          }`}>
            {c.risk}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function TopHeader({ onCaseSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = ALERTS.filter(a => !a.acknowledged).length;

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchCases(searchQuery));
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 flex-shrink-0" style={{
      background: '#070E1A',
      borderBottom: '1px solid rgba(34,211,238,0.08)',
      height: 64,
    }}>
      {/* Title */}
      <div>
        <h1 className="text-lg font-black text-white tracking-tight leading-none">Command Center</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time intelligence. Smarter intervention.</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              className="input-field pl-8 pr-4 py-2 text-xs"
              style={{ width: 260 }}
              placeholder="Search case, account, phone, location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSearch(true)}
            />
            {searchQuery && (
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                onClick={() => { setSearchQuery(''); setShowSearch(false); }}>
                <X size={12} />
              </button>
            )}
          </div>
          {showSearch && (
            <SearchResults
              results={searchResults}
              onSelect={onCaseSelect}
              onClose={() => setShowSearch(false)}
            />
          )}
        </div>

        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button
            id="notif-btn"
            className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.1)' }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={16} className="text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#EF4444', color: '#fff', fontSize: 9 }}>
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationDropdown
              alerts={ALERTS}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* Settings */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.1)' }}
        >
          <Settings size={16} className="text-slate-400" />
        </button>

        <UserProfileDropdown />
      </div>
    </header>
  );
}
