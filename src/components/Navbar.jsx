import React from 'react';
import { 
  Binary, 
  ArrowLeftRight, 
  Calculator, 
  BookOpen, 
  HelpCircle, 
  Info, 
  Cpu,
  Layers
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'conversions', label: 'Conversions', icon: ArrowLeftRight },
    { id: 'operations', label: 'Number Operations', icon: Calculator },
    { id: 'representations', label: 'Multi-Base View', icon: Layers },
    { id: 'learn', label: 'Learn Number Systems', icon: BookOpen },
    { id: 'quiz', label: 'Practice Quiz', icon: HelpCircle },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <header className="header-bar">
      <div className="header-inner">
        <div 
          className="brand-section" 
          onClick={() => setActiveTab('conversions')}
          role="button"
          tabIndex={0}
        >
          <div className="brand-icon-box">
            <Binary size={24} />
          </div>
          <div className="brand-text">
            <h1>Number System Toolkit</h1>
            <p>Learn, Convert & Understand Number Systems</p>
          </div>
        </div>

        <nav className="nav-tabs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
