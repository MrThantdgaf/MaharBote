import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { dictionaries } from './i18n'
import heroBanner from './img/A_glowing_ancient_bronze_mirror_202606051303.webp'
import mandalaArt from './img/Epic_fantasy_graphic_design_for_202606042225.webp'
import manuscriptStudy from './img/Quiet_scene_of_an_old_202606051313.webp'
import ritualTable from './img/A_cinematic,_low-light_photograph_of_202606051144.webp'
import lacquerDetail from './img/Close-up_of_a_traditional_Burmese_202606051317.webp'
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

const NAV_ITEMS = [
  { id: 'home', icon: 'home' },
  { id: 'calculator', icon: 'calculator' },
  { id: 'tradition', icon: 'book' },
  { id: 'developer', icon: 'user' },
]

function buildDateString(year, month, day) {
  const cleanYear = year.trim()
  const cleanMonth = month.trim()
  const cleanDay = day.trim()

  if (cleanYear.length < 4 || !cleanMonth || !cleanDay) return ''

  return [
    cleanYear.padStart(4, '0'),
    cleanMonth.padStart(2, '0'),
    cleanDay.padStart(2, '0'),
  ].join('-')
}

function App() {
  const [language, setLanguage] = useState('my')
  const [theme, setTheme] = useState('dark')
  const [calendarType, setCalendarType] = useState('english')
  const [englishYear, setEnglishYear] = useState('')
  const [englishMonth, setEnglishMonth] = useState('')
  const [englishDay, setEnglishDay] = useState('')
  const [manualMyanmarYear, setManualMyanmarYear] = useState('')
  const [manualWeekday, setManualWeekday] = useState('')
  const [submittedCalculation, setSubmittedCalculation] = useState(null)
  const [isReadingOpen, setIsReadingOpen] = useState(false)
  const [isReadingClosing, setIsReadingClosing] = useState(false)
  const [isBubbleHinted, setIsBubbleHinted] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const closeTimerRef = useRef(null)
  const hintTimerRef = useRef(null)
  const autoOpenedKeyRef = useRef('')

  const t = dictionaries[language]
  const isEnglishCalendar = calendarType === 'english'
  const englishDob = buildDateString(englishYear, englishMonth, englishDay)
  const hasManualYear = Number(manualMyanmarYear) >= 1000
  const hasManualWeekday = manualWeekday !== ''
  const convertedMyanmarYear = getMyanmarYearFromGregorian(englishDob)
  const canCalculate = isEnglishCalendar
    ? Boolean(englishDob && convertedMyanmarYear)
    : hasManualYear && hasManualWeekday
  const activeMyanmarYear = submittedCalculation?.myanmarYear ?? null
  const activeWeekday = submittedCalculation?.weekday ?? null
  const hasInput = Boolean(submittedCalculation)

  const result = useMemo(
    () => hasInput ? calculateMahabote({ myanmarYear: activeMyanmarYear, weekday: activeWeekday }) : null,
    [activeMyanmarYear, activeWeekday, hasInput],
  )
  const houseReading = result ? t.houseReadings[result.birthHouse] : null
  const resultKey = result ? `${activeMyanmarYear}-${activeWeekday}-${result.birthHouse}` : ''

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
  }, [])

  // Scroll spy
  useEffect(() => {
    const sections = ['home', 'calculator', 'tradition', 'developer']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function openReading() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
    setIsBubbleHinted(false)
    setIsReadingClosing(false)
    setIsReadingOpen(true)
  }

  function closeReading() {
    if (!isReadingOpen || isReadingClosing) return
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
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
    }, 200)
  }

  function handleCalculate() {
    if (!canCalculate) return

    const nextCalculation = isEnglishCalendar
      ? {
          myanmarYear: convertedMyanmarYear,
          weekday: getWeekdayFromGregorian(englishDob),
        }
      : {
          myanmarYear: Number(manualMyanmarYear),
          weekday: Number(manualWeekday),
        }

    autoOpenedKeyRef.current = resultKey
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
    setSubmittedCalculation(nextCalculation)
    setIsBubbleHinted(false)
    setIsReadingClosing(false)
    setIsReadingOpen(true)
  }

  return (
    <div className={`app ${theme}`} lang={language}>
      {/* Sidebar Nav */}
      <nav className="sideNav" aria-label="Site navigation">
        <div className="sideNavLogo">
          <span className="navLogoGlyph">✦</span>
        </div>
        <ul className="navList">
          {NAV_ITEMS.map(({ id, icon }) => {
            const label = t.nav[id]
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`navItem ${activeNav === id ? 'active' : ''}`}
                  aria-label={label}
                  title={label}
                >
                  <svg className="navIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {icon === 'home' && <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></>}
                    {icon === 'calculator' && <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4M8 18h2"/></>}
                    {icon === 'book' && <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>}
                    {icon === 'user' && <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
                  </svg>
                  <span className="navLabel">{label}</span>
                </a>
              </li>
            )
          })}
        </ul>
        <div className="navBottom">
          <button
            type="button"
            className="themeBtn"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            aria-label={t.toggleTheme}
            title={theme === 'light' ? t.dark : t.light}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {theme === 'light'
                ? <><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></>
                : <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Main scroll area */}
      <main className="mainScroll">

        {/* ── HERO ── */}
        <section className="heroSection" id="home">
          <img className="heroBg" src={heroBanner} alt="" />
          <div className="heroOverlay" />
          <div className="heroContent">
            <span className="heroEyebrow">{t.heroEyebrow}</span>
            <h1 className="heroTitle" lang={language}>{t.appName}</h1>
            <p className="heroSub">{t.subtitle}</p>
            <a href="#calculator" className="heroCta">
              <span>{t.beginCalculation}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          {/* Language selector */}
          <div className="heroLangPill">
            <button type="button" className={language === 'my' ? 'active' : ''} onClick={() => setLanguage('my')}>မြန်မာ</button>
            <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          </div>
          {/* Scroll indicator */}
          <div className="scrollIndicator">
            <div className="scrollDot" />
          </div>
        </section>

        {/* ── CALCULATOR ── */}
        <section className="calcSection" id="calculator">
          <div className="calcBg">
            <img src={mandalaArt} alt="" />
          </div>
          <div className="calcInner">

            {/* Left: Input Panel */}
            <aside className="inputCard">
              <div className="cardEyebrow">
                <span className="dot" />
                {t.calendar}
              </div>

              <div className="segControl">
                <button type="button" className={isEnglishCalendar ? 'seg active' : 'seg'} onClick={() => setCalendarType('english')}>
                  {t.englishCalendar}
                </button>
                <button type="button" className={!isEnglishCalendar ? 'seg active' : 'seg'} onClick={() => setCalendarType('myanmar')}>
                  {t.myanmarCalendar}
                </button>
              </div>

              {isEnglishCalendar ? (
                <label className="inputField">
                  <span className="fieldLabel">{t.englishDob}</span>
                  <div className="dateParts">
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="9999"
                      placeholder={t.yearPlaceholder}
                      aria-label={t.yearPlaceholder}
                      value={englishYear}
                      onChange={e => setEnglishYear(e.target.value)}
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="12"
                      placeholder={t.monthPlaceholder}
                      aria-label={t.monthPlaceholder}
                      value={englishMonth}
                      onChange={e => setEnglishMonth(e.target.value)}
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="31"
                      placeholder={t.dayPlaceholder}
                      aria-label={t.dayPlaceholder}
                      value={englishDay}
                      onChange={e => setEnglishDay(e.target.value)}
                    />
                  </div>
                </label>
              ) : (
                <>
                  <label className="inputField">
                    <span className="fieldLabel">{t.myanmarYear}</span>
                    <input type="number" min="1" value={manualMyanmarYear} onChange={e => setManualMyanmarYear(e.target.value)} />
                  </label>
                  <label className="inputField">
                    <span className="fieldLabel">{t.weekday}</span>
                    <select value={manualWeekday} onChange={e => setManualWeekday(e.target.value)}>
                      <option value="">{t.selectWeekday}</option>
                      {weekdayOptions.map(opt => (
                        <option value={opt.value} key={opt.token}>
                          {t.weekdays[opt.value]} — {t.tokens[opt.token]} ({opt.digit})
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              <button
                type="button"
                className="calculateBtn"
                onClick={handleCalculate}
                disabled={!canCalculate}
              >
                {t.calculate}
              </button>

              {hasInput && (
                <div className="factsRow">
                  <div className="factItem">
                    <span>{t.myanmarYear}</span>
                    <strong>{activeMyanmarYear || '—'}</strong>
                  </div>
                  <div className="factItem">
                    <span>{t.weekday}</span>
                    <strong>{t.weekdays[activeWeekday] || '—'}</strong>
                  </div>
                </div>
              )}

              {isEnglishCalendar && hasInput && (
                <div className="convertNote">
                  {t.convertedYear}: <strong>{convertedMyanmarYear || '—'}</strong>
                </div>
              )}
            </aside>

            {/* Center: Grid Panel */}
            <div className="gridCard">
              <div className="gridHeader">
                <div>
                  <div className="cardEyebrow"><span className="dot" />{t.fixedHouses}</div>
                  <h2 className="gridTitle">{t.result}</h2>
                </div>
                {result && (
                  <div className="remainderBadge">
                    <span>{t.remainder}</span>
                    <strong>{result.remainder}</strong>
                  </div>
                )}
              </div>
              <MahaboteGrid result={result} t={t} />
            </div>

            {/* Right: Summary Panel */}
            <aside className="summaryCard">
              {result ? (
                <>
                  <div className="cardEyebrow"><span className="dot" />{t.yourHouse}</div>
                  <h2 className="summaryHouse">{t.houses[result.birthHouse]}</h2>
                  <div className="bigNumber">
                    <span className="bigDigit">{result.birthDigit}</span>
                    <span className="bigToken">{t.tokens[result.birthToken]}</span>
                  </div>
                  <div className="summaryDetails">
                    <div className="detailRow">
                      <span>{t.birthNumber}</span>
                      <strong>{result.birthDigit} {t.tokens[result.birthToken]}</strong>
                    </div>
                    <div className="detailRow">
                      <span>{t.placement}</span>
                      <strong className="placementSeq">
                        {result.sequence.map(tk => t.tokens[tk]).join(' · ')}
                      </strong>
                    </div>
                  </div>
                  {houseReading && (
                    <button
                      type="button"
                      className={`readingBtn ${isBubbleHinted ? 'hinted' : ''}`}
                      onClick={openReading}
                    >
                      <svg className="readingBtnIcon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {t.houseReading}
                    </button>
                  )}
                </>
              ) : hasInput ? (
                <p className="emptyMsg">{t.noResult}</p>
              ) : (
                <div className="emptyState">
                  <div className="emptyGlyph">✦</div>
                  <p>{t.readyState}</p>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* ── READING MODAL ── */}
        {houseReading && isReadingOpen && (
          <div
            className={`readingOverlay ${isReadingClosing ? 'closing' : ''}`}
            role="presentation"
            onClick={closeReading}
          >
            <div
              className={`readingSheet ${isReadingClosing ? 'closing' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="reading-title"
              onClick={e => e.stopPropagation()}
            >
              <button type="button" className="sheetClose" onClick={closeReading} aria-label={t.close}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="sheetHead">
                <span className="sheetEyebrow">{t.houseReading}</span>
                <h2 className="sheetTitle" id="reading-title">{t.houses[result.birthHouse]}</h2>
              </div>
              <div className="readingCards">
                <article className="readCard">
                  <div className="readCardIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="5"/><path d="M3 21v-1a7 7 0 0114 0v1"/></svg>
                  </div>
                  <h3>{t.personality}</h3>
                  <p>{houseReading.personality}</p>
                </article>
                <article className="readCard">
                  <div className="readCardIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <h3>{t.futureHint}</h3>
                  <p>{houseReading.future}</p>
                </article>
                <article className="readCard playful">
                  <div className="readCardIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
                  </div>
                  <h3>{t.playfulNote}</h3>
                  <p>{houseReading.note}</p>
                </article>
              </div>
            </div>
          </div>
        )}

        {/* ── TRADITION ── */}
        <section className="traditionSection" id="tradition">
          <div className="tradHeader">
            <span className="sectionEyebrow">{t.traditionEyebrow}</span>
            <h2 className="sectionTitle">{t.traditionTitle}</h2>
          </div>

          <div className="tradGrid">
            <article className="tradMain">
              <img src={manuscriptStudy} alt="Traditional Burmese manuscript study" />
              <div className="tradMainContent">
                <h3>{t.traditionMainTitle}</h3>
                <p>{t.traditionMainText}</p>
              </div>
            </article>

            <div className="tradStack">
              <article className="tradCard">
                <img src={ritualTable} alt="Candlelit Burmese astrology table" />
                <div className="tradCardContent">
                  <span className="tradCardNum">01</span>
                  <h3>{t.calculate}</h3>
                  <p>{t.calculateText}</p>
                </div>
              </article>
              <article className="tradCard">
                <img src={lacquerDetail} alt="Traditional Burmese lacquer detail" />
                <div className="tradCardContent">
                  <span className="tradCardNum">02</span>
                  <h3>{t.reflect}</h3>
                  <p>{t.reflectText}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="siteFooter" id="developer">
          <div className="footerTop">
            <div className="footerBrand">
              <span className="footerGlyph">✦</span>
              <span className="footerBrandName">{t.footerBrand}</span>
            </div>
            <nav className="footerNav" aria-label="Footer navigation">
              {NAV_ITEMS.map(({ id }) => (
                <a key={id} href={`#${id}`}>{t.nav[id]}</a>
              ))}
            </nav>
          </div>

          <div className="footerDivider" />

          <div className="footerMid">
            <div className="footerDev">
              <span className="footerDevLabel">Developer</span>
              <h3 className="footerDevName">Thant Lwin Maung</h3>
              <span className="footerDevLocation">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M12 21C12 21 5 13.5 5 8a7 7 0 0114 0c0 5.5-7 13-7 13z"/><circle cx="12" cy="8" r="2.5"/></svg>
                {t.developerLocation}
              </span>
            </div>

            <div className="footerContact">
              <a href="https://www.thantlwinmaung.tech" target="_blank" rel="noreferrer" className="footerLink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                www.thantlwinmaung.tech
              </a>
              <a href="mailto:thantlwinmaungofficial@gmail.com" className="footerLink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                thantlwinmaungofficial@gmail.com
              </a>
            </div>

            <div className="footerDisclaimer">
              <p>{t.disclaimer}</p>
            </div>
          </div>

          <div className="footerDivider" />

          <div className="footerBottom">
            <span className="footerCopy">© {new Date().getFullYear()} Thant Lwin Maung. {t.rights}</span>
          </div>
        </footer>

      </main>
    </div>
  )
}

function MahaboteGrid({ result, t }) {
  return (
    <div className="mahaboteGrid">
      {gridOrder.map((key) => {
        if (key.startsWith('empty')) {
          return <div className="emptyCell" key={key}><span>✦</span></div>
        }
        const item = result?.houses[key]
        const isBirthHouse = result?.birthHouse === key
        return (
          <article
            key={key}
            className={`houseCell ${isBirthHouse ? 'selected' : ''}`}
            style={{ gridRow: houseLayout[key].row, gridColumn: houseLayout[key].col }}
          >
            <span className="houseName">{t.houses[key]}</span>
            {item && (
              <div className="houseVal">
                <strong>{item.digit}</strong>
                <span>{t.tokens[item.token]}</span>
              </div>
            )}
            {isBirthHouse && <div className="houseGlow" />}
          </article>
        )
      })}
    </div>
  )
}

export default App
