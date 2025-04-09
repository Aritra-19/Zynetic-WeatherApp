"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CloudSunRain, ChevronDown, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Search from './Search';

const Navbar = ({ onSearch, temperatureUnit, toggleTemperatureUnit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white dark:bg-gray-700'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 dark:text-white text-3xl font-bold'>Weather</h2>
          <CloudSunRain className='text-3xl text-gray-500 dark:text-white'/>
        </div>

        <div className='md:hidden'>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <section className={`md:flex gap-4 items-center transition-all duration-300 ease-in-out
          ${isMenuOpen 
            ? 'flex flex-col absolute top-[80px] left-0 right-0 bg-white dark:bg-gray-700 shadow-md p-4 z-50' 
            : 'hidden md:flex'
          }`}
        >
          {/* Temperature Unit Toggle */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTemperatureUnit}
            className='px-3'
          >
            {temperatureUnit === 'celsius' ? '°C' : '°F'}
          </Button>

          <ThemeToggle />

          <div className="w-full md:w-64">
            <Search onSearch={onSearch} />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
