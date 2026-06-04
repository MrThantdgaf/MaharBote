import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { dictionaries } from './i18n'
import heroBanner from './img/A_cinematic_website_hero_banner_202606042216.webp'
import mandalaArt from './img/Epic_fantasy_graphic_design_for_202606042225.webp'
import {
  calculateMahabote,
  getMyanmarYearFromGregorian,
  getWeekdayFromGregorian,
  houseLayout,
  weekdayOptions,
} from './utils/mahaboteCalculator'

const gridOrder = [
  'emptyLeft',
  'adipati',
  'emptyRight',
  'atun',
  'thike',
  'yaza',
  'marana',
  'binga',
  'puti',
]

function App() {
  const [language, setLanguage] = useState('my')
  const [theme, setTheme] = useState('light')
  const [calendarType, setCalendarType] = useState('english')
  const [englishDob, setEnglishDob] = useState('')
  const [manualMyanmarYear, setManualMyanmarYear] = useState('')
  const [manualWeekday, setManualWeekday] = useState('')
  const [isReadingOpen, setIsReadingOpen] = useState(false)
  const [isReadingClosing, setIsReadingClosing] = useState(false)
  const [isBubbleHinted, setIsBubbleHinted] = useState(false)
  const closeTimerRef = useRef(null)
  const hintTimerRef = useRef(null)
  const autoOpenedKeyRef = useRef('')

  const t = dictionaries[language]
  const isEnglishCalendar = calendarType === 'english'
  const hasManualYear = Number(manualMyanmarYear) >= 1000
  const hasManualWeekday = manualWeekday !== ''
  const convertedMyanmarYear = getMyanmarYearFromGregorian(englishDob)
  const activeMyanmarYear = isEnglishCalendar
    ? convertedMyanmarYear
    : Number(manualMyanmarYear)
  const activeWeekday = isEnglishCalendar
    ? getWeekdayFromGregorian(englishDob)
    : Number(manualWeekday)
  const hasInput = isEnglishCalendar
    ? Boolean(englishDob)
    : hasManualYear && hasManualWeekday

  const result = useMemo(
    () =>
      hasInput
        ? calculateMahabote({
            myanmarYear: activeMyanmarYear,
            weekday: activeWeekday,
          })
        : null,
    [activeMyanmarYear, activeWeekday, hasInput],
  )
  const houseReading = result ? t.houseReadings[result.birthHouse] : null
  const resultKey = result
    ? `${activeMyanmarYear}-${activeWeekday}-${result.birthHouse}`
    : ''

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    if (!houseReading || !resultKey) {
      setIsReadingOpen(false)
      setIsReadingClosing(false)
      autoOpenedKeyRef.current = ''
      return
    }

    if (autoOpenedKeyRef.current !== resultKey) {
      autoOpenedKeyRef.current = resultKey
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
      setIsReadingClosing(false)
      setIsReadingOpen(true)
    }
  }, [houseReading, resultKey])

  function openReading() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current)
    }
    setIsBubbleHinted(false)
    setIsReadingClosing(false)
    setIsReadingOpen(true)
  }

  function closeReading() {
    if (!isReadingOpen || isReadingClosing) return

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    setIsReadingClosing(true)
    closeTimerRef.current = setTimeout(() => {
      setIsReadingOpen(false)
      setIsReadingClosing(false)
      setIsBubbleHinted(true)
      closeTimerRef.current = null
      hintTimerRef.current = setTimeout(() => {
        setIsBubbleHinted(false)
        hintTimerRef.current = null
      }, 900)
    }, 180)
  }

  return (
    <main className={`app ${theme}`} lang={language}>
      <section className="workspace">
        <section className="heroShell">
          <img className="heroImage" src={heroBanner} alt="" />
          <div className="heroVeil" />

        <header className="topbar">
          <div className="heroCopy">
            <p className="eyebrow">Astrology Calculator</p>
            <h1>{t.appName}</h1>
            <p className="subtitle">{t.subtitle}</p>
          </div>

          <div className="actions">
            {/* Language Toggle Group */}
            <div className="toggleGroup">
              <button
                type="button"
                className={`toggleBtn ${language === 'my' ? 'active' : ''}`}
                onClick={() => setLanguage('my')}
                aria-label="မြန်မာဘာသာ"
              >
                မြန်မာ
              </button>
              <button
                type="button"
                className={`toggleBtn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-label="English"
              >
                English
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              className="themeToggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={theme === 'light' ? t.dark : t.light}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </header>
        </section>

        <section className="content">
          <aside className="inputPanel">
            <h2>{t.calendar}</h2>

            <div className="segmented">
              <button
                type="button"
                className={isEnglishCalendar ? 'active' : ''}
                onClick={() => setCalendarType('english')}
              >
                {t.englishCalendar}
              </button>
              <button
                type="button"
                className={!isEnglishCalendar ? 'active' : ''}
                onClick={() => setCalendarType('myanmar')}
              >
                {t.myanmarCalendar}
              </button>
            </div>

            {isEnglishCalendar ? (
              <label className="field">
                <span>{t.englishDob}</span>
                <input
                  type="date"
                  value={englishDob}
                  onChange={(event) => setEnglishDob(event.target.value)}
                />
              </label>
            ) : (
              <>
                <label className="field">
                  <span>{t.myanmarYear}</span>
                  <input
                    type="number"
                    min="1"
                    value={manualMyanmarYear}
                    onChange={(event) => setManualMyanmarYear(event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>{t.weekday}</span>
                  <select
                    value={manualWeekday}
                    onChange={(event) => setManualWeekday(event.target.value)}
                  >
                    <option value="">{t.selectWeekday}</option>
                    {weekdayOptions.map((option) => (
                      <option value={option.value} key={option.token}>
                        {t.weekdays[option.value]} - {t.tokens[option.token]} (
                        {option.digit})
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}

            {hasInput && (
              <div className="facts">
                <div>
                  <span>{t.myanmarYear}</span>
                  <strong>{activeMyanmarYear || '-'}</strong>
                </div>
                <div>
                  <span>{t.weekday}</span>
                  <strong>{t.weekdays[activeWeekday] || '-'}</strong>
                </div>
              </div>
            )}

            {isEnglishCalendar && hasInput && (
              <p className="note">
                {t.convertedYear}: {convertedMyanmarYear || '-'}
              </p>
            )}
          </aside>

          <section className="boardPanel">
            <img className="boardArtwork" src={mandalaArt} alt="" />
            <div className="sectionHeader">
              <div>
                <p className="eyebrow">{t.fixedHouses}</p>
                <h2>{t.result}</h2>
              </div>
              {result && (
                <span className="badge">
                  {t.remainder}: {result.remainder}
                </span>
              )}
            </div>

            <MahaboteGrid result={result} t={t} />
          </section>

          <aside className="summaryPanel">
            {result ? (
              <>
                <p className="eyebrow">{t.yourHouse}</p>
                <h2>{t.houses[result.birthHouse]}</h2>
                <div className="resultNumber">
                  <span>{result.birthDigit}</span>
                  <strong>{t.tokens[result.birthToken]}</strong>
                </div>
                <dl>
                  <div>
                    <dt>{t.birthNumber}</dt>
                    <dd>
                      {result.birthDigit} {t.tokens[result.birthToken]}
                    </dd>
                  </div>
                  <div>
                    <dt>{t.placement}</dt>
                    <dd>
                      {result.sequence.map((token) => t.tokens[token]).join(' - ')}
                    </dd>
                  </div>
                </dl>
                {houseReading && (
                  <button
                    type="button"
                    className={`readingCardButton ${
                      isBubbleHinted ? 'hinted' : ''
                    }`}
                    onClick={openReading}
                  >
                    <span>✦</span>
                    <strong>{t.houseReading}</strong>
                  </button>
                )}
              </>
            ) : hasInput ? (
              <p>{t.noResult}</p>
            ) : (
              <p className="emptyState">{t.readyState}</p>
            )}
          </aside>

          {houseReading && (
            <>
              {isReadingOpen && (
                <div
                  className={`readingOverlay ${isReadingClosing ? 'closing' : ''}`}
                  role="presentation"
                  onClick={closeReading}
                >
                  <section
                    className={`readingDialog ${
                      isReadingClosing ? 'closing' : ''
                    }`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="reading-title"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="closeReading"
                      onClick={closeReading}
                      aria-label="Close"
                    >
                      ×
                    </button>

                    <div className="sectionHeader">
                      <div>
                        <p className="dialogKicker">{t.houseReading}</p>
                        <h2 className="dialogHouseName" id="reading-title">
                          {t.houses[result.birthHouse]}
                        </h2>
                      </div>
                    </div>

                    <div className="readingList">
                      <article>
                        <h3>{t.personality}</h3>
                        <p>{houseReading.personality}</p>
                      </article>
                      <article>
                        <h3>{t.futureHint}</h3>
                        <p>{houseReading.future}</p>
                      </article>
                      <article className="playfulNote">
                        <h3>{t.playfulNote}</h3>
                        <p>{houseReading.note}</p>
                      </article>
                    </div>
                  </section>
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </main>
  )
}

function MahaboteGrid({ result, t }) {
  return (
    <div className="mahaboteGrid">
      {gridOrder.map((key) => {
        if (key.startsWith('empty')) {
          return <div className="emptyCell" key={key} />
        }

        const item = result?.houses[key]
        const isBirthHouse = result?.birthHouse === key

        return (
          <article
            className={`houseCell ${isBirthHouse ? 'selected' : ''}`}
            style={{
              gridRow: houseLayout[key].row,
              gridColumn: houseLayout[key].col,
            }}
            key={key}
          >
            <span className="houseName">{t.houses[key]}</span>
            {item && (
              <div className="houseValue">
                <strong>{item.digit}</strong>
                <span>{t.tokens[item.token]}</span>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default App
