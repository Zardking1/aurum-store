import React, { useState, useEffect } from 'react';
import '../styles/DigitalClock.css';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [timezones, setTimezones] = useState([
    { name: 'New York', timezone: 'America/New_York', offset: -5 },
    { name: 'London', timezone: 'Europe/London', offset: 0 },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', offset: 9 },
    { name: 'Sydney', timezone: 'Australia/Sydney', offset: 10 },
  ]);
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTimezone, setNewTimezone] = useState('');

  const commonTimezones = [
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Chicago', timezone: 'America/Chicago' },
    { name: 'Denver', timezone: 'America/Denver' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Delhi', timezone: 'Asia/Kolkata' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Auckland', timezone: 'Pacific/Auckland' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, timezone) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      return formatter.format(date);
    } catch (error) {
      return '--:--:--';
    }
  };

  const formatDate = (date, timezone) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return formatter.format(date);
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatDayOfWeek = (date, timezone) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
      });
      return formatter.format(date);
    } catch (error) {
      return '';
    }
  };

  const addTimezone = () => {
    if (newTimezone) {
      const selected = commonTimezones.find(tz => tz.timezone === newTimezone);
      if (selected && !timezones.find(t => t.timezone === newTimezone)) {
        setTimezones([...timezones, selected]);
        setNewTimezone('');
        setShowAddForm(false);
      }
    }
  };

  const removeTimezone = (timezone) => {
    if (timezones.length > 1) {
      const updated = timezones.filter(t => t.timezone !== timezone);
      setTimezones(updated);
      if (selectedTimezone === timezone) {
        setSelectedTimezone(updated[0].timezone);
      }
    }
  };

  const selectedTz = timezones.find(tz => tz.timezone === selectedTimezone) || timezones[0];

  return (
    <div className="clock-container">
      <div className="clock-main">
        <h1>🕐 World Clock</h1>

        {/* Primary Clock Display */}
        <div className="primary-clock">
          <div className="clock-display">
            <div className="time-display">{formatTime(time, selectedTz.timezone)}</div>
            <div className="date-display">
              <span className="day-of-week">{formatDayOfWeek(time, selectedTz.timezone)}</span>
              <span className="date">{formatDate(time, selectedTz.timezone)}</span>
            </div>
          </div>
          <div className="timezone-name">{selectedTz.name}</div>
        </div>

        {/* Timezone Grid */}
        <div className="timezones-grid">
          <h2>Timezones</h2>
          <div className="grid">
            {timezones.map((tz) => (
              <div
                key={tz.timezone}
                className={`timezone-card ${selectedTimezone === tz.timezone ? 'active' : ''}`}
                onClick={() => setSelectedTimezone(tz.timezone)}
              >
                <div className="tz-header">
                  <h3>{tz.name}</h3>
                  {timezones.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTimezone(tz.timezone);
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="tz-time">{formatTime(time, tz.timezone)}</div>
                <div className="tz-date">{formatDate(time, tz.timezone).split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Timezone Section */}
        <div className="add-timezone-section">
          {!showAddForm ? (
            <button
              className="btn-add-timezone"
              onClick={() => setShowAddForm(true)}
            >
              + Add Timezone
            </button>
          ) : (
            <div className="add-form">
              <select
                value={newTimezone}
                onChange={(e) => setNewTimezone(e.target.value)}
                className="timezone-select"
              >
                <option value="">Select a timezone...</option>
                {commonTimezones.map(tz => (
                  <option
                    key={tz.timezone}
                    value={tz.timezone}
                    disabled={timezones.find(t => t.timezone === tz.timezone)}
                  >
                    {tz.name}
                  </option>
                ))}
              </select>
              <div className="form-buttons">
                <button
                  className="btn-confirm"
                  onClick={addTimezone}
                  disabled={!newTimezone}
                >
                  Add
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTimezone('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Local Time */}
        <div className="local-time-section">
          <h3>Your Local Time</h3>
          <div className="local-time">
            <div className="local-clock-display">{time.toLocaleTimeString()}</div>
            <div className="local-date">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;