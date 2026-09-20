'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { searchService, SearchItem } from '@/lib/search.service';
import { SearchResults } from './SearchResults';
import { getTranslations } from '@/lib/translations';

interface SearchBarProps {
  locale: 'en' | 'ar';
  onCategorySelect?: (categoryId: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ locale, onCategorySelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isRtl = locale === 'ar';
  const t = getTranslations(locale);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const handler = setTimeout(() => {
      startTransition(async () => {
        const searchResults = await searchService.search(query, locale);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
        setActiveIndex(-1);
      });
    }, 250);

    return () => clearTimeout(handler);
  }, [query, locale]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        handleItemSelect(results[activeIndex]);
      }
    }
  };

  const handleItemSelect = (item: SearchItem) => {
    setIsOpen(false);
    setQuery('');

    if (onCategorySelect) {
      onCategorySelect(item.categoryId);
    }

    const event = new CustomEvent("selectMenuExternal", {
      detail: {
        categoryId: item.categoryId,
        productId: item.type === "product" ? item.id : undefined,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-2xl mx-auto px-4 sm:px-0 z-50"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative flex items-center rounded-full border border-amber-500/30 bg-black/80 px-4 py-2.5 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md transition-all focus-within:border-amber-500 focus-within:shadow-[0_0_25px_rgba(245,158,11,0.25)] md:px-5 md:py-3.5">
        <svg
          className={`h-5 w-5 shrink-0 text-amber-500/70 transition-colors focus-within:text-amber-500 ${isRtl ? 'ml-3' : 'mr-3'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.search.placeholder}
          className={`w-full bg-transparent text-sm font-medium text-amber-100 placeholder-neutral-500 outline-none focus:outline-none md:text-base ${isRtl ? 'text-right' : 'text-left'}`}
          aria-autocomplete="list"
          aria-haspopup="listbox"
        />

        <AnimatePresence>
          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-amber-500 border-t-transparent ${isRtl ? 'mr-3' : 'ml-3'}`}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isPending && query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
              className={`shrink-0 text-neutral-400 hover:text-amber-500 transition-colors ${isRtl ? 'mr-3' : 'ml-3'}`}
              type="button"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute left-0 right-0 w-full z-[999]">
        <SearchResults
          results={results}
          isOpen={isOpen}
          activeIndex={activeIndex}
          locale={locale}
          onSelect={handleItemSelect}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  );
};