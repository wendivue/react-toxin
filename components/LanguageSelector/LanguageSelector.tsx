import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Transition } from 'react-transition-group';

import { AmericanFlag } from '@/Icons/AmericanFlag';
import { RussianFlag } from '@/Icons/RussianFlag';
import { FrenchFlag } from '@/Icons/FrenchFlag';

import { TransitionStyles } from '@/Header/MenuItem/types';
import styles from './LanguageSelector.module.scss';
import { LanguageItem } from './LanguageItem';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation('common');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const languageSelectorRef = useRef<HTMLDivElement>(null);

  const handleSwitcherClick = useCallback((): void => {
    setIsPanelOpen((currentIsPanelOpen) => !currentIsPanelOpen);
  }, []);

  const handleDocumentClick = useCallback((event: MouseEvent): void => {
    if (languageSelectorRef.current === null) return;

    if (event.composedPath().includes(languageSelectorRef.current)) return;

    setIsPanelOpen(false);
  }, []);

  const languages: Record<string, { flag: JSX.Element; name: string }> = {
    en: {
      flag: <AmericanFlag />,
      name: 'English',
    },
    ru: {
      flag: <RussianFlag />,
      name: 'Русский',
    },
    fr: {
      flag: <FrenchFlag />,
      name: 'Français',
    },
  };

  const panelTransitionDuration = 100;
  const panelTransitionStyles: TransitionStyles = {
    entering: { opacity: 0, display: 'block' },
    entered: { opacity: 1, display: 'block' },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: 'none' },
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div className={styles.LanguageSelector} ref={languageSelectorRef}>
      <button
        className={styles.Switcher}
        onClick={handleSwitcherClick}
        type="button"
      >
        {languages[i18n.language].flag}
      </button>

      <Transition in={isPanelOpen} timeout={panelTransitionDuration}>
        {(state: string) => (
          <div
            style={{
              transition: `opacity ${panelTransitionDuration}ms ease-out`,
              ...panelTransitionStyles[state],
            }}
            className={styles.LanguagesPanel}
          >
            {Object.keys(languages).map((languageKey) => {
              return (
                <LanguageItem
                  languageName={languages[languageKey].name}
                  shortLanguageName={languageKey}
                  flag={languages[languageKey].flag}
                  key={languageKey}
                />
              );
            })}
          </div>
        )}
      </Transition>
    </div>
  );
};

export { LanguageSelector };
