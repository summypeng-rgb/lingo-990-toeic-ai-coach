import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, ArrowLeft, ArrowRight, BarChart3, BookOpenCheck, CalendarDays,
  Check, CheckCircle2, ChevronRight, CircleHelp, Clock3, Flame, Headphones,
  LayoutDashboard, LockKeyhole, Mic, Mic2, MoreHorizontal, Pause, Play,
  RotateCcw, Settings, ShieldCheck, Sparkles, Star, Target, TrendingUp,
  UserRound, Volume2, VolumeX, WandSparkles, X, Zap, MessageCircle, Send,
  Keyboard, Bot, Database, Filter, Lightbulb, Eye, Layers3, Upload,
  Download, Trash2, FileJson, AlertCircle
} from 'lucide-react'
import './styles.css'
import { generatedQuestionBank, youtubeCompanionQuestionIds } from './generatedQuestionBank.js'

const navItems = [
  { id: 'dashboard', label: '學習首頁', icon: LayoutDashboard },
  { id: 'listening', label: '模擬考試', icon: Headphones },
  { id: 'speaking', label: 'AI 口說教練', icon: Mic2 },
  { id: 'bank', label: 'AI 原創題庫', icon: Database },
  { id: 'results', label: '學習分析', icon: BarChart3 },
]

const practiceCards = [
  {
    id: 'listening', eyebrow: 'FULL MOCK TEST', title: '完整模擬考',
    desc: '30 分鐘企業版測驗', meta: '20 題 · L&R', icon: ShieldCheck, tone: 'navy'
  },
  {
    id: 'listening', eyebrow: 'LISTENING', title: '聽力練習',
    desc: 'Part 2–4 情境聽力', meta: '約 15 分鐘', icon: Headphones, tone: 'blue'
  },
  {
    id: 'bank', eyebrow: 'READING', title: '閱讀練習',
    desc: 'Part 5–7 商務閱讀', meta: '約 20 分鐘', icon: BookOpenCheck, tone: 'sand'
  },
  {
    id: 'speaking', eyebrow: 'AI SPEAKING', title: '口說教練',
    desc: '模擬面試與即時回饋', meta: '3 題 · 約 8 分鐘', icon: Mic, tone: 'coral'
  }
]

function App() {
  const [page, setPage] = useState('dashboard')
  const [toast, setToast] = useState('')

  const navigate = (id) => {
    setPage(id === 'reading' ? 'bank' : id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="app-shell">
      <Sidebar page={page} navigate={navigate} />
      <main className="main-canvas">
        <Topbar page={page} setToast={setToast} />
        {page === 'dashboard' && <Dashboard navigate={navigate} setToast={setToast} />}
        {page === 'listening' && <Listening navigate={navigate} />}
        {page === 'speaking' && <Speaking navigate={navigate} />}
        {page === 'bank' && <QuestionBank navigate={navigate} />}
        {page === 'results' && <Results navigate={navigate} />}
      </main>
      {toast && <div className="toast"><CheckCircle2 size={18} />{toast}</div>}
    </div>
  )
}

function Sidebar({ page, navigate }) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => navigate('dashboard')} aria-label="Lingo 990 首頁">
        <span className="brand-mark"><span>99</span><i>0</i></span>
        <span className="brand-name">Lingo <b>990</b></span>
      </button>
      <p className="nav-caption">LEARN</p>
      <nav>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => navigate(id)}>
            <Icon size={19} strokeWidth={1.9} /><span>{label}</span>
          </button>
        ))}
      </nav>
      <p className="nav-caption lower">LIBRARY</p>
      <nav>
        <button className="nav-item" onClick={() => navigate('results')}><RotateCcw size={19}/><span>錯題複習</span><em>12</em></button>
        <button className="nav-item" onClick={() => navigate('results')}><BookOpenCheck size={19}/><span>我的單字庫</span></button>
      </nav>
      <div className="coach-card">
        <div className="coach-orbit"><Sparkles size={22}/></div>
        <b>AI Coach 已就緒</b>
        <p>今天再練 18 分鐘，就能完成目標。</p>
        <button onClick={() => navigate('speaking')}>開始練習 <ArrowRight size={14}/></button>
      </div>
      <button className="profile-mini">
        <span className="avatar">JL</span>
        <span><b>Jamie Lin</b><small>Business plan</small></span>
        <MoreHorizontal size={18}/>
      </button>
    </aside>
  )
}

function Topbar({ page, setToast }) {
  const title = { dashboard: '學習總覽', listening: 'TOEIC Listening Test', speaking: 'AI Speaking Interview', bank: 'AI 原創仿真題庫', results: '能力分析報告' }[page]
  return (
    <header className="topbar">
      <div>
        <p>{page === 'dashboard' ? 'TUESDAY, AUGUST 4' : 'LINGO 990 · TOEIC PREP'}</p>
        <h1>{title}</h1>
      </div>
      <div className="top-actions">
        <button className="device-status" onClick={() => setToast('音訊裝置連線正常')}><span></span><Headphones size={17}/> 音訊正常</button>
        <button className="icon-btn" aria-label="設定"><Settings size={19}/></button>
        <button className="avatar top-avatar">JL</button>
      </div>
    </header>
  )
}

function Dashboard({ navigate, setToast }) {
  return (
    <div className="page dashboard-page">
      <section className="welcome-row">
        <div>
          <h2>早安，Jamie <span>👋</span></h2>
          <p>你的 Part 3 正確率正在上升。今天再完成一組情境題，讓進步延續下去。</p>
        </div>
        <button className="outline-btn" onClick={() => setToast('今日學習計畫已展開')}><CalendarDays size={17}/> 查看今日計畫</button>
      </section>

      <section className="stats-grid">
        <StatCard icon={Target} label="預估 TOEIC 分數" value="785" suffix="/ 990" trend="+35" kind="score" />
        <StatCard icon={Flame} label="連續練習" value="12" suffix="天" trend="本週最佳" kind="streak" />
        <StatCard icon={Clock3} label="今日學習" value="27" suffix="分鐘" trend="目標 45 分" kind="time" />
        <StatCard icon={CalendarDays} label="下次模擬考" value="08/09" suffix="週日" trend="剩下 5 天" kind="date" />
      </section>

      <section className="focus-banner">
        <div className="focus-icon"><WandSparkles size={24}/></div>
        <div className="focus-copy">
          <span>AI COACH · 今日焦點</span>
          <h3>加強 Part 3「地點判斷」</h3>
          <p>近三次正確率 <b>55%</b>。今天安排 10 題，並複習 airport、reservation、departure。</p>
        </div>
        <div className="focus-progress"><b>6<small>/10</small></b><span>已完成</span></div>
        <button onClick={() => navigate('listening')}>繼續練習 <ArrowRight size={16}/></button>
      </section>

      <div className="section-heading">
        <div><span>CHOOSE A SESSION</span><h2>今天想練什麼？</h2></div>
        <button onClick={() => navigate('results')}>查看全部 <ChevronRight size={16}/></button>
      </div>

      <section className="practice-grid">
        {practiceCards.map((card, idx) => <PracticeCard key={idx} {...card} onClick={() => navigate(card.id)} />)}
      </section>

      <section className="dashboard-lower">
        <div className="progress-panel panel">
          <div className="panel-heading"><div><span>WEEKLY PROGRESS</span><h3>本週學習表現</h3></div><button>近 7 天 <ChevronRight size={14}/></button></div>
          <div className="mini-chart" aria-label="本週學習分鐘柱狀圖">
            {[42,65,38,81,55,92,27].map((h, i) => <div key={i} className={i === 5 ? 'peak' : ''}><i style={{height: `${h}%`}}></i><span>{['一','二','三','四','五','六','日'][i]}</span></div>)}
          </div>
          <div className="chart-note"><TrendingUp size={16}/><b>比上週多 24%</b><span>· 保持這個節奏！</span></div>
        </div>
        <div className="upcoming-panel panel">
          <div className="panel-heading"><div><span>NEXT UP</span><h3>即將進行</h3></div><button><MoreHorizontal size={18}/></button></div>
          <div className="exam-date"><div><b>09</b><span>AUG</span></div><p><b>企業 TOEIC 模擬測驗</b><span>Listening + Reading · 30 分鐘</span></p></div>
          <div className="check-row"><Check size={16}/><span>耳機與麥克風測試</span><b>已完成</b></div>
          <button className="dark-btn" onClick={() => navigate('listening')}>進入考場 <ArrowRight size={16}/></button>
        </div>
      </section>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, suffix, trend, kind }) {
  return <article className={`stat-card ${kind}`}>
    <div className="stat-top"><span className="stat-icon"><Icon size={19}/></span><em>{trend}</em></div>
    <p>{label}</p><h3>{value} <small>{suffix}</small></h3>
    {kind === 'score' && <div className="score-track"><i></i></div>}
  </article>
}

function PracticeCard({ eyebrow, title, desc, meta, icon: Icon, tone, onClick }) {
  return <button className={`practice-card ${tone}`} onClick={onClick}>
    <span className="practice-icon"><Icon size={25}/></span>
    <span className="practice-arrow"><ArrowRight size={17}/></span>
    <small>{eyebrow}</small><h3>{title}</h3><p>{desc}</p><em>{meta}</em>
  </button>
}

const questions = [
  { number: 41, text: 'Where most likely are the speakers?', options: ['At a hotel', 'At a restaurant', 'At an airport', 'At an office'], correct: 2 },
  { number: 42, text: 'What problem does the woman mention?', options: ['A delayed departure', 'A missing reservation', 'A damaged suitcase', 'An incorrect receipt'], correct: 0 },
  { number: 43, text: 'What will the man probably do next?', options: ['Call a customer', 'Check the schedule', 'Print a document', 'Speak to a manager'], correct: 1 },
]

const listeningConversation = [
  { speaker: 'A', name: 'Emma', role: 'Traveler', text: 'Excuse me. I thought Flight 718 to Singapore was supposed to board at Gate 21, but the display now says Gate 24.' },
  { speaker: 'B', name: 'James', role: 'Airport staff', text: "That's correct. The gate has changed, and the departure has been delayed by thirty minutes." },
  { speaker: 'A', name: 'Emma', role: 'Traveler', text: 'I see. I have a connecting flight after I arrive. Could you check whether I will still have enough time?' },
  { speaker: 'B', name: 'James', role: 'Airport staff', text: 'Of course. Let me check the updated schedule for you.' },
]

function Listening({ navigate }) {
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeSpeaker, setActiveSpeaker] = useState('')
  const [seconds, setSeconds] = useState(18 * 60 + 45)
  const fallbackAudioRef = useRef(null)
  const question = questions[qIndex]

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => () => {
    window.clearInterval(fallbackAudioRef.current)
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  const playAudio = () => {
    if (playing || progress >= 100) return
    setProgress(2); setPlaying(true); setActiveSpeaker('A')
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const voices = window.speechSynthesis.getVoices().filter(voice => voice.lang?.toLowerCase().startsWith('en'))
      const voiceA = voices.find(voice => /zira|aria|samantha|jenny|female/i.test(voice.name)) || voices[0]
      const voiceB = voices.find(voice => /david|guy|mark|male/i.test(voice.name) && voice !== voiceA) || voices.find(voice => voice !== voiceA) || voices[0]
      let completedLines = 0
      listeningConversation.forEach((line) => {
        const utterance = new SpeechSynthesisUtterance(line.text)
        utterance.lang = 'en-US'; utterance.rate = line.speaker === 'A' ? .93 : .9
        utterance.pitch = line.speaker === 'A' ? 1.08 : .88
        const selectedVoice = line.speaker === 'A' ? voiceA : voiceB
        if (selectedVoice) utterance.voice = selectedVoice
        utterance.onstart = () => setActiveSpeaker(line.speaker)
        let lineFinished = false
        const finishLine = () => {
          if (lineFinished) return
          lineFinished = true; completedLines += 1
          setProgress((completedLines / listeningConversation.length) * 100)
          if (completedLines === listeningConversation.length) {
            setPlaying(false); setActiveSpeaker('')
          }
        }
        utterance.onend = finishLine; utterance.onerror = finishLine
        window.speechSynthesis.speak(utterance)
      })
    } else {
      let fallbackStep = 0
      fallbackAudioRef.current = window.setInterval(() => {
        fallbackStep += 1
        setActiveSpeaker(listeningConversation[fallbackStep % listeningConversation.length].speaker)
        setProgress(Math.min(100, fallbackStep * 5))
        if (fallbackStep >= 20) {
          window.clearInterval(fallbackAudioRef.current)
          setPlaying(false); setActiveSpeaker(''); setProgress(100)
        }
      }, 500)
    }
  }

  const next = () => {
    if (qIndex < questions.length - 1) setQIndex(qIndex + 1)
    else navigate('speaking')
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return <div className="exam-page">
    <div className="exam-meta-bar">
      <button onClick={() => navigate('dashboard')}><ArrowLeft size={17}/> 離開考試</button>
      <div className="part-tag"><Headphones size={16}/> PART 3 · 簡短對話</div>
      <div className="exam-timer"><Clock3 size={17}/><span>剩餘時間</span><b>{mm}:{ss}</b></div>
    </div>
    <div className="test-progress"><i style={{width: `${(question.number/100)*100}%`}}></i></div>
    <section className="exam-stage">
      <div className="audio-side">
        <div className="audio-heading"><span>LISTENING</span><em><LockKeyhole size={14}/> 正式模擬模式</em></div>
        <div className="ai-voice-label"><Sparkles size={14}/> AI DUAL-VOICE SCENARIO</div>
        <div className={`sound-orb ${playing ? 'playing' : ''}`}>
          <span className="orbit one"></span><span className="orbit two"></span>
          <button onClick={playAudio} disabled={playing || progress >= 100} aria-label="播放題目音檔">
            {playing ? <Volume2 size={32}/> : progress >= 100 ? <Check size={32}/> : <Play size={32} fill="currentColor"/>}
          </button>
        </div>
        <div className="audio-label"><b>{playing ? `AI Speaker ${activeSpeaker === 'A' ? 'Emma' : 'James'} is speaking…` : progress >= 100 ? 'AI conversation completed' : 'AI conversation ready'}</b><span>{playing ? '雙人聲線輪流播放 · 播放期間無法暫停' : progress >= 100 ? '正式模式僅能播放一次' : '點擊播放 AI 情境對話'}</span></div>
        <div className="speaker-status" aria-label="AI 對話說話者狀態">
          {listeningConversation.slice(0, 2).map(speaker => <div key={speaker.speaker} className={activeSpeaker === speaker.speaker ? 'active' : ''}>
            <span>{speaker.speaker}</span><p><b>{speaker.name}</b><small>{speaker.role}</small></p>
            <em>{[1,2,3,4].map(bar => <i key={bar}></i>)}</em>
          </div>)}
        </div>
        <div className="audio-progress"><i style={{width: `${progress}%`}}></i></div>
        <div className="wave-bars">
          {Array.from({length: 42}).map((_,i) => <i key={i} style={{height: `${9 + ((i*13)%25)}px`, opacity: progress / 100 > i/42 ? 1 : .25}}></i>)}
        </div>
        <div className="exam-tip"><ShieldCheck size={17}/><p><b>Exam reminder</b><span>請選出最適當的答案。音檔不會顯示在試題本上。</span></p></div>
      </div>
      <div className="question-side">
        <div className="question-kicker"><span>QUESTION {question.number}</span><em>{question.number} / 100</em></div>
        <h2>{question.text}</h2>
        <p className="question-zh">請選擇最適當的答案。</p>
        <div className="answer-list">
          {question.options.map((opt, i) => <button key={opt} className={answers[question.number] === i ? 'selected' : ''} onClick={() => setAnswers({...answers, [question.number]: i})}>
            <span>{String.fromCharCode(65+i)}</span><b>{opt}</b><i>{answers[question.number] === i && <Check size={17}/>}</i>
          </button>)}
        </div>
        <div className="question-actions">
          <button className="flag-btn"><CircleHelp size={17}/> 稍後提醒</button>
          <button className="next-btn" onClick={next} disabled={answers[question.number] === undefined}>{qIndex === questions.length - 1 ? '進入口說測驗' : '下一題'} <ArrowRight size={18}/></button>
        </div>
      </div>
    </section>
    <footer className="exam-footer">
      <div><b>PART 3</b><span>Questions 41–43 refer to the following conversation.</span></div>
      <div className="question-dots">{questions.map((q,i) => <button key={q.number} className={`${i === qIndex ? 'current' : ''} ${answers[q.number] !== undefined ? 'answered' : ''}`} onClick={() => setQIndex(i)}>{q.number}</button>)}</div>
      <div className="legend"><span><i className="done"></i>已作答</span><span><i></i>未作答</span></div>
    </footer>
  </div>
}

function Speaking({ navigate }) {
  const [mode, setMode] = useState('interview')
  const [phase, setPhase] = useState('ready')
  const [time, setTime] = useState(15)
  const [micOk, setMicOk] = useState(false)
  const streamRef = useRef(null)

  useEffect(() => {
    if (!['prep','recording'].includes(phase)) return
    const timer = setInterval(() => setTime(t => {
      if (t <= 1) {
        if (phase === 'prep') { setPhase('recording'); setTime(45); startMic() }
        else { finishRecording() }
        return 0
      }
      return t - 1
    }), 1000)
    return () => clearInterval(timer)
  }, [phase])

  const speakPrompt = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance('Tell me about a project you completed recently. What was your role, and what did you learn?')
      u.lang='en-US'; u.rate=.9; window.speechSynthesis.speak(u)
    }
  }
  const start = () => { speakPrompt(); setPhase('prep'); setTime(15) }
  const startMic = async () => {
    try { streamRef.current = await navigator.mediaDevices.getUserMedia({audio:true}); setMicOk(true) }
    catch { setMicOk(false) }
  }
  const finishRecording = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setPhase('analyzing'); setTimeout(() => navigate('results'), 1600)
  }
  const switchMode = (nextMode) => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setPhase('ready'); setTime(15); setMode(nextMode)
  }
  const phaseLabel = phase === 'ready' ? '準備開始' : phase === 'prep' ? '準備時間' : phase === 'recording' ? '回答時間' : 'AI 正在分析'

  return <div className="speaking-page">
    <div className="speaking-topline">
      <button onClick={() => navigate('dashboard')}><X size={19}/></button>
      <div className="speaking-mode-switch" role="tablist" aria-label="口說模式">
        <button className={mode === 'interview' ? 'active' : ''} onClick={() => switchMode('interview')}><ShieldCheck size={14}/> 模擬面試</button>
        <button className={mode === 'conversation' ? 'active' : ''} onClick={() => switchMode('conversation')}><MessageCircle size={14}/> AI 自由對話</button>
      </div>
      <button className="help-pill"><CircleHelp size={16}/> 操作說明</button>
    </div>
    {mode === 'interview' ? <section className="interview-stage">
      <div className="interviewer-panel">
        <div className="live-pill"><i></i> AI INTERVIEWER</div>
        <div className="avatar-scene">
          <div className="avatar-halo h1"></div><div className="avatar-halo h2"></div>
          <div className="ai-avatar"><div className="hair"></div><div className="face"><i></i><i></i><span></span></div><div className="neck"></div><div className="body"></div></div>
        </div>
        <div className="interviewer-name"><b>Maya</b><span>AI English Interviewer</span></div>
        <div className="speech-caption"><Volume2 size={17}/><p>“Please answer after you hear the beep.”</p></div>
      </div>
      <div className="prompt-panel">
        <div className="prompt-step"><span>QUESTION 1 OF 3</span><div>{[1,2,3].map(i=><i key={i} className={i===1?'active':''}></i>)}</div></div>
        <span className="prompt-category">WORKPLACE EXPERIENCE</span>
        <h1>Tell me about a project you completed recently.</h1>
        <p>What was your role, and what did you learn from the experience?</p>
        <button className="replay-prompt" onClick={speakPrompt}><Volume2 size={18}/> 重聽題目</button>
        <div className={`response-console ${phase}`}>
          <div className="response-head"><span>{phaseLabel}</span><b>{phase === 'ready' ? '00:15' : `00:${String(time).padStart(2,'0')}`}</b></div>
          <div className="response-main">
            <div className={`mic-circle ${phase === 'recording' ? 'active' : ''}`}><Mic size={26}/></div>
            {phase === 'ready' && <div className="ready-copy"><b>準備好後開始作答</b><span>系統將先播放題目，接著提供 15 秒準備時間。</span></div>}
            {phase === 'prep' && <div className="ready-copy"><b>整理你的回答</b><span>提示：role · action · result · learning</span></div>}
            {phase === 'recording' && <div className="recording-wave">{Array.from({length:25}).map((_,i)=><i key={i} style={{animationDelay:`${i*.05}s`}}></i>)}</div>}
            {phase === 'analyzing' && <div className="ready-copy"><b>正在分析你的回答…</b><span>語音、文法、流暢度與回答完整度</span></div>}
          </div>
          {phase === 'recording' && <div className="record-status"><span><i></i>{micOk ? 'Recording' : 'Demo recording'}</span><em>時間到將自動停止</em></div>}
        </div>
        {phase === 'ready' && <button className="start-answer" onClick={start}><Mic size={19}/> 開始口說測驗</button>}
        {phase === 'recording' && <button className="stop-answer" onClick={finishRecording}><span></span> 結束回答</button>}
        {phase === 'prep' && <p className="auto-note"><Clock3 size={15}/> 倒數結束後將自動開啟麥克風</p>}
      </div>
    </section> : <AiConversation />}
  </div>
}

const conversationStarters = [
  { label: '工作經驗', prompt: 'Tell me about a challenge you faced at work recently.' },
  { label: '旅行計畫', prompt: 'Where would you like to travel next, and why?' },
  { label: '日常對話', prompt: 'How has your day been so far?' },
]

function createCoachReply(answer, turn) {
  const text = answer.toLowerCase()
  if (/project|team|work|colleague|manager/.test(text)) {
    return "That sounds like a valuable experience. What was the biggest challenge your team faced, and how did you help solve it?"
  }
  if (/challenge|problem|difficult|hard/.test(text)) {
    return "I see. Can you walk me through the specific steps you took to handle that situation?"
  }
  if (/travel|trip|country|japan|korea|europe/.test(text)) {
    return "That sounds exciting! What would you most like to do there, and who would you travel with?"
  }
  if (/today|morning|afternoon|day/.test(text)) {
    return "Thanks for sharing. What is one thing you would like to accomplish before the end of today?"
  }
  if (/learn|learned|improve|next time/.test(text)) {
    return "That is a thoughtful takeaway. How would you apply what you learned if the same situation happened again?"
  }
  const followUps = [
    "Interesting! Could you give me a specific example to help me understand your point better?",
    "Why was that important to you, and how did it make you feel?",
    "Good explanation. What happened next, and what was the final result?",
  ]
  return followUps[turn % followUps.length]
}

function AiConversation() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi Jamie! I'm Maya. Let's have a relaxed English conversation. How has your day been so far?" }
  ])
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [notice, setNotice] = useState('')
  const recognitionRef = useRef(null)
  const chatScrollRef = useRef(null)

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
  }, [messages, thinking])

  useEffect(() => () => {
    recognitionRef.current?.abort?.()
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'; utterance.rate = .92; utterance.pitch = 1.02
    window.speechSynthesis.speak(utterance)
  }

  const sendMessage = (rawText) => {
    const cleanText = rawText.trim()
    if (!cleanText || thinking) return
    setMessages(current => [...current, { role: 'user', text: cleanText }])
    setInput(''); setNotice(''); setThinking(true)
    const turn = messages.filter(message => message.role === 'user').length
    window.setTimeout(() => {
      const reply = createCoachReply(cleanText, turn)
      setMessages(current => [...current, { role: 'ai', text: reply }])
      setThinking(false); speak(reply)
    }, 850)
  }

  const startListening = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      setNotice('此瀏覽器不支援語音辨識，請改用下方文字輸入。')
      return
    }
    const recognition = new Recognition()
    recognitionRef.current = recognition
    recognition.lang = 'en-US'; recognition.interimResults = true; recognition.continuous = false
    recognition.onstart = () => { setListening(true); setNotice('Listening… Speak in English') }
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map(result => result[0].transcript).join(' ')
      setInput(transcript)
      const finalResult = Array.from(event.results).every(result => result.isFinal)
      if (finalResult) sendMessage(transcript)
    }
    recognition.onerror = (event) => {
      setListening(false)
      setNotice(event.error === 'not-allowed' ? '請允許麥克風權限後再試一次。' : '沒有聽清楚，請再說一次或改用文字輸入。')
    }
    recognition.onend = () => setListening(false)
    recognition.start()
  }

  const chooseStarter = (starter) => {
    setMessages([{ role: 'ai', text: starter.prompt }])
    setNotice(''); setInput(''); speak(starter.prompt)
  }

  return <section className="conversation-stage">
    <aside className="conversation-coach">
      <div className="live-pill"><i></i> LIVE CONVERSATION</div>
      <div className="coach-portrait">
        <div className="ai-avatar"><div className="hair"></div><div className="face"><i></i><i></i><span></span></div><div className="neck"></div><div className="body"></div></div>
      </div>
      <div className="interviewer-name"><b>Maya</b><span>AI English Conversation Coach</span></div>
      <div className="conversation-level"><span><Activity size={15}/> 目前難度</span><b>Business · B2</b></div>
      <div className="topic-picker">
        <span>選擇對話主題</span>
        {conversationStarters.map(starter => <button key={starter.label} onClick={() => chooseStarter(starter)}>{starter.label}<ChevronRight size={14}/></button>)}
      </div>
      <p className="privacy-note"><ShieldCheck size={14}/> 錄音只用於本次口說分析</p>
    </aside>
    <div className="conversation-main">
      <div className="conversation-header">
        <div><span><i></i> AI ONLINE</span><h2>與 Maya 練習英文對話</h2></div>
        <div className="turn-count"><MessageCircle size={16}/><b>{messages.filter(m => m.role === 'user').length}</b><span>輪對話</span></div>
      </div>
      <div className="chat-transcript" aria-live="polite" ref={chatScrollRef}>
        <div className="conversation-hint"><Sparkles size={15}/> Maya 會根據你的回答自然追問；可直接說英文或使用鍵盤輸入。</div>
        {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-row ${message.role}`}>
          <span className="chat-avatar">{message.role === 'ai' ? <Bot size={17}/> : 'JL'}</span>
          <div className="chat-bubble">
            <small>{message.role === 'ai' ? 'MAYA · AI COACH' : 'YOU'}</small>
            <p>{message.text}</p>
            {message.role === 'ai' && <button onClick={() => speak(message.text)} aria-label="播放 AI 回覆"><Volume2 size={14}/></button>}
          </div>
        </div>)}
        {thinking && <div className="chat-row ai"><span className="chat-avatar"><Bot size={17}/></span><div className="chat-bubble thinking"><i></i><i></i><i></i></div></div>}
      </div>
      <div className="conversation-input-area">
        {notice && <p className={`voice-notice ${listening ? 'active' : ''}`}><span></span>{notice}</p>}
        <form onSubmit={(event) => { event.preventDefault(); sendMessage(input) }}>
          <span className="keyboard-icon"><Keyboard size={17}/></span>
          <input value={input} onChange={event => setInput(event.target.value)} placeholder="Type your answer in English…" aria-label="輸入英文回答" disabled={thinking}/>
          <button type="button" className={`voice-button ${listening ? 'listening' : ''}`} onClick={startListening} aria-label="使用麥克風回答"><Mic size={19}/></button>
          <button type="submit" className="send-button" disabled={!input.trim() || thinking} aria-label="送出回答"><Send size={18}/></button>
        </form>
        <div className="input-footer"><span>按麥克風開始說話，辨識完成後會自動送出</span><button onClick={() => { setMessages([{role:'ai', text:"Hi again! What would you like to talk about today?"}]); setNotice('') }}><RotateCcw size={13}/> 重新開始</button></div>
      </div>
    </div>
  </section>
}

const toeicQuestionBank = [
  { id:'p2-01', part:'Part 2', category:'辦公室 · 地點', difficulty:'中階', spoken:'Where should I leave the signed contract?', prompt:'選出最適當的回應。', options:['At the front desk.','It was signed yesterday.','Three copies, please.'], correct:0, explanation:'Where should I… 詢問地點；At the front desk 直接回答文件應放置的位置。', tags:['where 問句','contract','office'] },
  { id:'p2-02', part:'Part 2', category:'財務 · 進度', difficulty:'中階', spoken:"Haven't you sent the invoice yet?", prompt:'選出最適當的回應。', options:['The delivery entrance is over there.',"Not yet—the accounting team is correcting the total.",'I paid in cash.'], correct:1, explanation:'否定疑問句詢問發票是否已寄出；Not yet 加上延遲原因是最自然的回應。', tags:['否定問句','invoice','accounting'] },
  { id:'p2-03', part:'Part 2', category:'設施 · 時間', difficulty:'基礎', spoken:'When will the lobby renovation be completed?', prompt:'選出最適當的回應。', options:['By the end of next month.','The lobby is on the first floor.','Yes, it looks much brighter.'], correct:0, explanation:'When 詢問時間，By the end of next month 提供明確完工期限。', tags:['when 問句','renovation','deadline'] },
  { id:'p2-04', part:'Part 2', category:'會議 · 人物', difficulty:'基礎', spoken:"Who's leading the client presentation?", prompt:'選出最適當的回應。', options:['In the large conference room.','The slides need a few changes.','Ms. Patel from marketing.'], correct:2, explanation:'Who 詢問人物，因此回答行銷部的 Patel 女士最符合問題。', tags:['who 問句','presentation','marketing'] },
  { id:'p2-05', part:'Part 2', category:'行程 · 原因', difficulty:'中階', spoken:'Why was the conference call postponed?', prompt:'選出最適當的回應。', options:['The regional office is closed for a holiday.','About forty-five minutes.','I joined from my laptop.'], correct:0, explanation:'Why 詢問原因；分公司因假日關閉能合理解釋電話會議延期。', tags:['why 問句','postpone','schedule'] },
  { id:'p2-06', part:'Part 2', category:'餐敘 · 請求', difficulty:'基礎', spoken:'Could you reserve a table for lunch?', prompt:'選出最適當的回應。', options:['Lunch was delicious.','Sure. For how many people?','The menu was printed yesterday.'], correct:1, explanation:'Could you… 是禮貌請求；先答應並詢問人數是自然且完整的回應。', tags:['禮貌請求','reservation','restaurant'] },
  {
    id:'p3-01', part:'Part 3', category:'科技 · 系統上線', difficulty:'中階', group:'Conversation A',
    script:[{speaker:'W',text:"The new scheduling platform is supposed to launch on Monday, but several employees still can't log in."},{speaker:'M',text:"I'll send them the updated setup guide this afternoon. If the problem continues, we may need to delay the launch until Wednesday."},{speaker:'W',text:'Please copy the department managers on your message.'}],
    prompt:'What problem does the woman mention?', options:['A meeting room is unavailable.','Some employees cannot access a system.','A training guide has incorrect dates.','The managers missed a presentation.'], correct:1, explanation:'女子指出 several employees still can’t log in，也就是部分員工無法登入系統。', tags:['problem','log in','software']
  },
  {
    id:'p3-02', part:'Part 3', category:'科技 · 系統上線', difficulty:'中階', group:'Conversation A',
    script:[{speaker:'W',text:"The new scheduling platform is supposed to launch on Monday, but several employees still can't log in."},{speaker:'M',text:"I'll send them the updated setup guide this afternoon. If the problem continues, we may need to delay the launch until Wednesday."},{speaker:'W',text:'Please copy the department managers on your message.'}],
    prompt:'What will the man do this afternoon?', options:['Update a calendar.','Meet department managers.','Send a setup guide.','Launch a new platform.'], correct:2, explanation:'男子說 I’ll send them the updated setup guide this afternoon，答案是寄出更新後的設定指南。', tags:['next action','setup guide','email']
  },
  {
    id:'p3-03', part:'Part 3', category:'科技 · 系統上線', difficulty:'進階', group:'Conversation A',
    script:[{speaker:'W',text:"The new scheduling platform is supposed to launch on Monday, but several employees still can't log in."},{speaker:'M',text:"I'll send them the updated setup guide this afternoon. If the problem continues, we may need to delay the launch until Wednesday."},{speaker:'W',text:'Please copy the department managers on your message.'}],
    prompt:'What is suggested about the platform launch?', options:['It may be postponed.','It was approved by all managers.','It will require a new budget.','It has already been completed.'], correct:0, explanation:'若問題持續，可能從星期一延到星期三，暗示上線日可能延後。', tags:['inference','delay','launch']
  },
  {
    id:'p3-04', part:'Part 3', category:'物流 · 展覽', difficulty:'中階', group:'Conversation B',
    script:[{speaker:'W',text:'Three of the display units arrived with cracked screens. The trade show starts Friday.'},{speaker:'M',text:"I've already asked the warehouse to ship replacements by express delivery."},{speaker:'W',text:"Good. I'll contact the event organizer and confirm that our booth setup will start Thursday afternoon."}],
    prompt:'What problem are the speakers discussing?', options:['A booth is too small.','An event date has changed.','Some equipment was damaged.','A delivery address is missing.'], correct:2, explanation:'cracked screens 表示展示設備的螢幕破裂，也就是部分設備在運送時損壞。', tags:['problem','damaged goods','trade show']
  },
  {
    id:'p3-05', part:'Part 3', category:'物流 · 展覽', difficulty:'中階', group:'Conversation B',
    script:[{speaker:'W',text:'Three of the display units arrived with cracked screens. The trade show starts Friday.'},{speaker:'M',text:"I've already asked the warehouse to ship replacements by express delivery."},{speaker:'W',text:"Good. I'll contact the event organizer and confirm that our booth setup will start Thursday afternoon."}],
    prompt:'What has the man asked the warehouse to do?', options:['Repair the original units.','Send replacements quickly.','Change the booth location.','Call the event organizer.'], correct:1, explanation:'ship replacements by express delivery 指以快遞寄送替換品，對應 send replacements quickly。', tags:['paraphrase','express delivery','replacement']
  },
  {
    id:'p3-06', part:'Part 3', category:'物流 · 展覽', difficulty:'中階', group:'Conversation B',
    script:[{speaker:'W',text:'Three of the display units arrived with cracked screens. The trade show starts Friday.'},{speaker:'M',text:"I've already asked the warehouse to ship replacements by express delivery."},{speaker:'W',text:"Good. I'll contact the event organizer and confirm that our booth setup will start Thursday afternoon."}],
    prompt:'What will the woman most likely do next?', options:['Contact the event organizer.','Inspect a warehouse.','Order additional screens.','Prepare an expense report.'], correct:0, explanation:'女子直接說 I’ll contact the event organizer，因此下一步是聯絡活動主辦方。', tags:['next action','organizer','booth setup']
  },
  { id:'p5-01', part:'Part 5', category:'文法 · 介系詞', difficulty:'基礎', prompt:'The quarterly report must be submitted _____ Friday.', options:['by','from','among','during'], correct:0, explanation:'by + 時間點表示「最遲在……之前」，符合報告繳交期限的語意。', tags:['preposition','deadline','by'] },
  { id:'p5-02', part:'Part 5', category:'文法 · 動詞', difficulty:'基礎', prompt:'Employees are encouraged to _____ feedback after each training session.', options:['provide','provider','provided','provision'], correct:0, explanation:'to 後面需要原形動詞，provide feedback 是「提供回饋」的常見搭配。', tags:['verb form','feedback','collocation'] },
  { id:'p5-03', part:'Part 5', category:'字彙 · 形容詞', difficulty:'中階', prompt:'Ms. Chen was promoted because of her _____ leadership during the merger.', options:['exception','exceptional','exceptionally','except'], correct:1, explanation:'空格修飾名詞 leadership，需要形容詞 exceptional，表示「傑出的」。', tags:['word form','leadership','promotion'] },
  { id:'p5-04', part:'Part 5', category:'文法 · 連接語', difficulty:'中階', prompt:'The flight was delayed _____ severe weather near the destination.', options:['because','because of','although','despite of'], correct:1, explanation:'空格後接名詞片語 severe weather，因此使用 because of；because 後須接完整子句。', tags:['because of','weather','preposition'] },
  { id:'p5-05', part:'Part 5', category:'文法 · 主詞一致', difficulty:'進階', prompt:'Neither the manager nor her assistants _____ available when the client called.', options:['was','were','be','has been'], correct:1, explanation:'neither A nor B 的動詞通常與較近主詞一致；assistants 是複數，且 called 為過去式，所以用 were。', tags:['agreement','neither nor','past tense'] },
  { id:'p5-06', part:'Part 5', category:'文法 · 比較級', difficulty:'基礎', prompt:'Our new inventory software is more efficient _____ the previous version.', options:['as','than','then','of'], correct:1, explanation:'more efficient 是比較級，後面以 than 引出比較對象。', tags:['comparative','than','software'] },
  { id:'p5-07', part:'Part 5', category:'文法 · 時間連接詞', difficulty:'中階', prompt:'Applicants should attach a résumé _____ submitting the online form.', options:['before','until','unless','throughout'], correct:0, explanation:'語意為「送出線上表單前附上履歷」，before 後可接動名詞 submitting。', tags:['before','gerund','application'] },
  { id:'p5-08', part:'Part 5', category:'字彙 · 形容詞', difficulty:'中階', prompt:'The café has become increasingly _____ among employees in nearby offices.', options:['popularity','popular','popularly','popularize'], correct:1, explanation:'become 是連綴動詞，後面需要形容詞 popular 作主詞補語；increasingly 修飾該形容詞。', tags:['word form','popular','linking verb'] }
]

const bankFilters = ['全部', 'Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7']
const importedBankKey = 'lingo990-imported-question-bank-v1'

function parseCsv(text) {
  const rows = []
  let row = [], cell = '', quoted = false
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    if (char === '"' && quoted && text[index + 1] === '"') { cell += '"'; index += 1 }
    else if (char === '"') quoted = !quoted
    else if (char === ',' && !quoted) { row.push(cell); cell = '' }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[index + 1] === '\n') index += 1
      row.push(cell); cell = ''
      if (row.some(value => value.trim())) rows.push(row)
      row = []
    } else cell += char
  }
  row.push(cell)
  if (row.some(value => value.trim())) rows.push(row)
  if (rows.length < 2) return []
  const headers = rows[0].map(header => header.trim())
  return rows.slice(1).map(values => Object.fromEntries(headers.map((header,index) => [header, values[index]?.trim() || ''])))
}

function normalizeImportedQuestion(raw, index) {
  const partValue = String(raw.part || '').trim()
  const part = /^part\s*[1-7]$/i.test(partValue) ? `Part ${partValue.match(/[1-7]/)[0]}` : /^[1-7]$/.test(partValue) ? `Part ${partValue}` : ''
  const options = Array.isArray(raw.options)
    ? raw.options.map(String).map(value => value.trim()).filter(Boolean)
    : [raw.optionA, raw.optionB, raw.optionC, raw.optionD].map(value => String(value || '').trim()).filter(Boolean)
  const correctRaw = String(raw.correct ?? '').trim()
  const correct = /^[A-D]$/i.test(correctRaw) ? correctRaw.toUpperCase().charCodeAt(0) - 65 : Number(correctRaw)
  const prompt = String(raw.prompt || '').trim()
  if (!part) throw new Error(`第 ${index + 1} 題：part 必須是 Part 1–Part 7。`)
  if (!prompt) throw new Error(`第 ${index + 1} 題：缺少 prompt 題幹。`)
  if (options.length < 2 || options.length > 4) throw new Error(`第 ${index + 1} 題：需要 2–4 個選項。`)
  if (!Number.isInteger(correct) || correct < 0 || correct >= options.length) throw new Error(`第 ${index + 1} 題：correct 請填 A–D 或從 0 開始的選項序號。`)
  const script = Array.isArray(raw.script) ? raw.script.map(line => ({speaker:String(line.speaker || 'N'),text:String(line.text || '').trim()})).filter(line => line.text) : undefined
  const tags = Array.isArray(raw.tags) ? raw.tags.map(String) : String(raw.tags || '').split('|').map(tag => tag.trim()).filter(Boolean)
  return {
    id:`import-${String(raw.id || `${Date.now()}-${index}`).replace(/[^a-z0-9_-]/gi,'-')}`,
    part, category:String(raw.category || '自訂題庫'), difficulty:String(raw.difficulty || '自訂'),
    prompt, spoken:String(raw.spoken || '').trim() || undefined, script:script?.length ? script : undefined,
    passage:String(raw.passage || '').trim() || undefined, scene:String(raw.scene || '').trim() || undefined,
    options, correct, explanation:String(raw.explanation || '此題尚未提供解析。'), tags, source:'imported'
  }
}

function questionFingerprint(item) {
  const scriptText = Array.isArray(item.script) ? item.script.map(line => line.text || '').join(' ') : ''
  return `${item.part}|${item.prompt}|${item.spoken || ''}|${scriptText}|${item.passage || ''}|${item.scene || ''}`.toLowerCase().replace(/\s+/g,' ')
}

function QuestionBank({ navigate }) {
  const [filter, setFilter] = useState('全部')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [answers, setAnswers] = useState({})
  const [importedQuestions, setImportedQuestions] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(importedBankKey) || '[]')
      return Array.isArray(saved) ? saved : []
    } catch { return [] }
  })
  const [importOpen, setImportOpen] = useState(false)
  const [videoCompanion, setVideoCompanion] = useState(false)
  const [rightsConfirmed, setRightsConfirmed] = useState(false)
  const [importNotice, setImportNotice] = useState(null)
  const fileInputRef = useRef(null)
  const allQuestions = [...toeicQuestionBank, ...generatedQuestionBank, ...importedQuestions]
  const availableFilters = bankFilters.filter(item => item === '全部' || allQuestions.some(questionItem => questionItem.part === item))
  const filtered = videoCompanion
    ? allQuestions.filter(item => youtubeCompanionQuestionIds.includes(item.id))
    : filter === '全部' ? allQuestions : allQuestions.filter(item => item.part === filter)
  const question = filtered[current]
  const indexPageSize = 40
  const indexPage = Math.floor(current / indexPageSize)
  const indexStart = indexPage * indexPageSize
  const indexQuestions = filtered.slice(indexStart, indexStart + indexPageSize)

  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }, [])
  useEffect(() => {
    try { window.localStorage.setItem(importedBankKey, JSON.stringify(importedQuestions)) }
    catch { setImportNotice({type:'error', message:'瀏覽器儲存空間不足，請縮小檔案或改用後端題庫。'}) }
  }, [importedQuestions])

  const changeFilter = (nextFilter) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setVideoCompanion(false); setFilter(nextFilter); setCurrent(0); setSelected(null); setRevealed(false); setTranscriptOpen(false); setPlaying(false)
  }
  const startVideoCompanion = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setVideoCompanion(true); setFilter('全部'); setCurrent(0); setSelected(null); setRevealed(false); setTranscriptOpen(false); setPlaying(false)
  }
  const playAudio = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel(); setPlaying(true)
    const segments = question.script || [{speaker:'N', text:question.spoken || question.prompt}]
    segments.forEach((segment,index) => {
      const utterance = new SpeechSynthesisUtterance(segment.text)
      utterance.lang='en-US'; utterance.rate=.88; utterance.pitch=segment.speaker==='W'?1.12:segment.speaker==='M'?.86:1
      if (index===segments.length-1) utterance.onend=()=>setPlaying(false)
      utterance.onerror=()=>setPlaying(false); window.speechSynthesis.speak(utterance)
    })
  }
  const checkAnswer = () => {
    if (selected === null) return
    setRevealed(true); setAnswers(currentAnswers => ({...currentAnswers,[question.id]:selected===question.correct}))
  }
  const moveQuestion = offset => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setCurrent(index => (index+offset+filtered.length)%filtered.length)
    setSelected(null); setRevealed(false); setTranscriptOpen(false); setPlaying(false)
  }
  const jumpQuestion = questionIndex => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setCurrent(Math.max(0, Math.min(questionIndex, filtered.length - 1)))
    setSelected(null); setRevealed(false); setTranscriptOpen(false); setPlaying(false)
  }
  const transcriptVisible = transcriptOpen || revealed
  const statusClass = optionIndex => {
    if (!revealed) return selected===optionIndex?'selected':''
    if (optionIndex===question.correct) return 'correct'
    if (optionIndex===selected) return 'wrong'
    return ''
  }

  const importFile = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = file.name.toLowerCase().endsWith('.json') ? JSON.parse(text) : parseCsv(text)
      const records = Array.isArray(parsed) ? parsed : parsed.questions
      if (!Array.isArray(records) || !records.length) throw new Error('檔案中找不到可匯入的題目。')
      const normalized = records.map(normalizeImportedQuestion)
      const fingerprints = new Set(allQuestions.map(questionFingerprint))
      const unique = normalized.filter(item => {
        const fingerprint = questionFingerprint(item)
        if (fingerprints.has(fingerprint)) return false
        fingerprints.add(fingerprint); return true
      })
      if (!unique.length) throw new Error('所有題目都已存在，沒有新增內容。')
      setImportedQuestions(currentItems => [...currentItems, ...unique])
      setVideoCompanion(false); setFilter('全部'); setCurrent(0); setSelected(null); setRevealed(false)
      setImportNotice({type:'success', message:`成功匯入 ${unique.length} 題；略過 ${normalized.length - unique.length} 題重複內容。`})
    } catch (error) {
      setImportNotice({type:'error', message:error instanceof Error ? error.message : '檔案格式無法辨識。'})
    } finally { event.target.value = '' }
  }

  const downloadTemplate = () => {
    const template = 'id,part,category,difficulty,prompt,spoken,passage,scene,optionA,optionB,optionC,optionD,correct,explanation,tags\ncustom-001,Part 5,文法 · 動詞,中階,The manager _____ the proposal yesterday.,,,,reviewed,reviews,reviewing,review,A,過去時間 yesterday 搭配過去式 reviewed。,verb form|past tense'
    const url = URL.createObjectURL(new Blob(['\uFEFF', template], {type:'text/csv;charset=utf-8'}))
    const link = document.createElement('a'); link.href = url; link.download = 'lingo990-question-import-template.csv'; link.click(); URL.revokeObjectURL(url)
  }

  const clearImported = () => {
    if (!importedQuestions.length || !window.confirm(`確定移除這個瀏覽器中已匯入的 ${importedQuestions.length} 題嗎？`)) return
    setImportedQuestions([]); setVideoCompanion(false); setFilter('全部'); setCurrent(0); setSelected(null); setRevealed(false)
    setImportNotice({type:'success', message:'已移除所有自行匯入的題目；內建 AI 原創題不受影響。'})
  }

  return <div className="page bank-page">
    <section className="bank-hero">
      <div><span className="original-badge"><Sparkles size={14}/> 364 AI ORIGINAL + LICENSED IMPORT</span><h2>2026 商務情境仿真題庫</h2><p>依 Part 1–7 題型與歷年常見職場情境生成大量原創題；聽力由 AI 朗讀，閱讀提供段落、解析與弱點標籤。</p></div>
      <div className="bank-stats"><span><b>{allQuestions.length}</b><small>題庫總數</small></span><span><b>{toeicQuestionBank.length + generatedQuestionBank.length}</b><small>AI 原創</small></span><span><b>{importedQuestions.length}</b><small>自行匯入</small></span></div>
    </section>
    <section className="youtube-practice-card">
      <div className="youtube-embed"><iframe src="https://www.youtube-nocookie.com/embed/0D-vG9oiOvg" title="TOEIC Listening Practice Test 01 (2026)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>
      <div className="youtube-practice-copy"><span><Play size={13}/> YOUTUBE LISTENING PRACTICE</span><h3>TOEIC Listening Practice Test 01 (2026)</h3><p>影片來源：English With Weup。可直接在播放器完成原影片練習，再進行 Lingo 990 的 30 題原創 Listening 伴讀測驗。</p><div><button onClick={startVideoCompanion}><Headphones size={16}/> 開始 30 題原創伴讀 <ArrowRight size={15}/></button><a href="https://youtu.be/0D-vG9oiOvg" target="_blank" rel="noreferrer">在 YouTube 開啟</a></div><small><LockKeyhole size={13}/> 本站僅嵌入原影片，不重製影片中的考題、音訊或逐字稿。</small></div>
    </section>
    <div className="bank-toolbar">
      <div className="bank-filter"><Filter size={15}/><button className={videoCompanion?'active companion':''} onClick={startVideoCompanion}>影片伴讀<em>{youtubeCompanionQuestionIds.length}</em></button>{availableFilters.map(item=><button key={item} className={!videoCompanion&&filter===item?'active':''} onClick={()=>changeFilter(item)}>{item}<em>{item==='全部'?allQuestions.length:allQuestions.filter(q=>q.part===item).length}</em></button>)}</div>
      <div className="bank-toolbar-actions"><button className="bank-import-btn" onClick={()=>setImportOpen(open=>!open)}><Upload size={16}/> 批次匯入</button><button className="bank-exam-btn" onClick={()=>navigate('listening')}><ShieldCheck size={16}/> 計時模擬考</button></div>
    </div>
    {importOpen&&<section className="bank-import-panel">
      <div className="import-panel-head"><div><span><FileJson size={18}/></span><p><b>匯入自有／授權題庫</b><small>支援 UTF-8 JSON、CSV · Part 1–7 · 自動驗證與排除重複題</small></p></div><button onClick={()=>setImportOpen(false)} aria-label="關閉匯入區"><X size={17}/></button></div>
      <div className="import-guide">
        <div><b>必要欄位</b><code>part, prompt, options / optionA–D, correct</code><span>correct 可填 A–D，或從 0 開始的選項序號。</span></div>
        <div><b>聽力欄位</b><code>spoken</code><span>JSON 亦可使用 script: [{'{'} speaker, text {'}'}] 建立多人對話。</span></div>
        <div><b>閱讀／選填欄位</b><code>passage, scene, category, explanation, tags</code><span>Part 6–7 可填 passage；CSV 的 tags 請以 | 分隔。</span></div>
      </div>
      <label className="rights-confirm"><input type="checkbox" checked={rightsConfirmed} onChange={event=>setRightsConfirmed(event.target.checked)}/><span><b>我確認匯入內容為自有、已獲授權或公開領域資料</b><small>請勿上傳外流正式試題或未取得授權的影片逐字稿。</small></span></label>
      <div className="import-actions"><button onClick={downloadTemplate}><Download size={15}/> 下載 CSV 範本</button><button className="import-primary" disabled={!rightsConfirmed} onClick={()=>fileInputRef.current?.click()}><Upload size={15}/> 選擇 JSON／CSV</button><button className="import-clear" disabled={!importedQuestions.length} onClick={clearImported}><Trash2 size={15}/> 清除已匯入 ({importedQuestions.length})</button></div>
      <input ref={fileInputRef} className="import-file-input" type="file" accept=".json,.csv,application/json,text/csv" onChange={importFile}/>
      {importNotice&&<p className={`import-notice ${importNotice.type}`}><AlertCircle size={15}/>{importNotice.message}</p>}
    </section>}
    <section className="bank-workspace">
      <aside className="bank-index">
        <div className="bank-index-head"><Layers3 size={16}/><span><b>{videoCompanion?'影片原創伴讀':filter}</b><small>{filtered.length} questions</small></span></div>
        <div className="bank-question-grid">{indexQuestions.map((item,index)=>{const actualIndex=indexStart+index;return <button key={item.id} className={`${actualIndex===current?'current':''} ${answers[item.id]===true?'passed':answers[item.id]===false?'failed':''}`} onClick={()=>jumpQuestion(actualIndex)}>{actualIndex+1}</button>})}</div>
        <div className="bank-index-pagination"><button disabled={indexPage===0} onClick={()=>jumpQuestion(indexStart-indexPageSize)}><ArrowLeft size={12}/></button><span>{indexStart+1}–{Math.min(indexStart+indexPageSize,filtered.length)} / {filtered.length}</span><button disabled={indexStart+indexPageSize>=filtered.length} onClick={()=>jumpQuestion(indexStart+indexPageSize)}><ArrowRight size={12}/></button></div>
        <div className="bank-legend"><span><i className="passed"></i>答對</span><span><i className="failed"></i>待複習</span></div>
        <div className="bank-source-note"><LockKeyhole size={15}/><p><b>內容來源</b><span>內建題為 AI 原創；自行匯入內容由使用者確認授權。</span></p></div>
      </aside>
      <article className="bank-question-card">
        <header><div><span>{question.part}</span><b>{question.category}</b>{(videoCompanion||question.group||question.source)&&<em>{videoCompanion?'VIDEO COMPANION':question.group||(question.source==='imported'?'IMPORTED':'AI GENERATED')}</em>}</div><small>{question.difficulty} · QUESTION {current+1} / {filtered.length}</small></header>
        {question.scene&&<div className="bank-scene"><Eye size={18}/><div><span>PHOTO SCENE · 原創情境提示</span><b>{question.scene}</b><small>正式 Part 1 會呈現照片；此題以文字場景協助練習動作與位置描述。</small></div></div>}
        {question.passage&&<div className="bank-reading-passage"><span>{question.part==='Part 6'?'TEXT COMPLETION':'READING MATERIAL'}</span><pre>{question.passage}</pre></div>}
        {(question.spoken||question.script)&&<div className="bank-audio">
          <button className={playing?'playing':''} onClick={playAudio}><span>{playing?<Volume2 size={23}/>:<Play size={22}/>}</span><p><b>{playing?'AI 正在朗讀…':'播放 AI 聽力內容'}</b><small>{question.script?'雙角色英語對話 · 建議先不看逐字稿':question.part==='Part 1'?'四句圖片敘述 · 僅播放一次練習':'美式英語 · TOEIC Question–Response / Talk'}</small></p></button>
          <div className={`mini-wave ${playing?'active':''}`}>{Array.from({length:22}).map((_,index)=><i key={index} style={{height:`${7+(index*7%19)}px`}}></i>)}</div>
          <button className="transcript-toggle" onClick={()=>setTranscriptOpen(open=>!open)}><Eye size={15}/>{transcriptOpen?'隱藏逐字稿':'查看逐字稿'}</button>
        </div>}
        {(question.spoken||question.script)&&transcriptVisible&&<div className="bank-transcript"><span>TRANSCRIPT</span>{question.script?question.script.map((line,index)=><p key={index}><b>{line.speaker}</b>{line.text}</p>):<p><b>Q</b>{question.spoken}</p>}</div>}
        <div className="bank-prompt"><span>QUESTION</span><h3>{question.prompt}</h3></div>
        <div className="bank-options">{question.options.map((option,optionIndex)=><button key={option} disabled={revealed} className={statusClass(optionIndex)} onClick={()=>setSelected(optionIndex)}><span>{String.fromCharCode(65+optionIndex)}</span><b>{option}</b>{revealed&&optionIndex===question.correct&&<Check size={18}/>} {revealed&&optionIndex===selected&&optionIndex!==question.correct&&<X size={18}/>}</button>)}</div>
        {revealed&&<div className={`bank-explanation ${selected===question.correct?'success':'review'}`}><Lightbulb size={19}/><div><b>{selected===question.correct?'答對了！':`正確答案：${String.fromCharCode(65+question.correct)}`}</b><p>{question.explanation}</p><div>{question.tags.map(tag=><span key={tag}>#{tag}</span>)}</div></div></div>}
        <footer><button className="bank-prev" onClick={()=>moveQuestion(-1)}><ArrowLeft size={16}/> 上一題</button>{!revealed?<button className="bank-check" disabled={selected===null} onClick={checkAnswer}>檢查答案 <CheckCircle2 size={16}/></button>:<button className="bank-next" onClick={()=>moveQuestion(1)}>下一題 <ArrowRight size={16}/></button>}</footer>
      </article>
    </section>
  </div>
}

const scoreItems = [
  {name:'發音', en:'Pronunciation', score:78, note:'部分字尾發音可再清楚'},
  {name:'流暢度', en:'Fluency', score:72, note:'減少句中不必要的停頓'},
  {name:'文法', en:'Grammar', score:85, note:'時態掌握得相當穩定'},
  {name:'字彙', en:'Vocabulary', score:74, note:'可加入更精確的動詞'},
]

function Results({ navigate }) {
  const [tab, setTab] = useState('feedback')
  const [playing, setPlaying] = useState(false)
  const playExample = () => {
    setPlaying(true)
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance('Last year, I managed an AI development project with a five-person team. I was responsible for coordinating schedules, resolving issues, and communicating with stakeholders.')
      u.lang='en-US'; u.rate=.85; u.onend=()=>setPlaying(false); window.speechSynthesis.speak(u)
    } else setTimeout(()=>setPlaying(false),2500)
  }
  return <div className="page results-page">
    <section className="result-hero">
      <div>
        <span className="complete-badge"><CheckCircle2 size={15}/> SESSION COMPLETE</span>
        <h2>回答得不錯，Jamie！</h2>
        <p>你的內容完整而且時態使用正確。再加強流暢度與字彙變化，就會更接近高分回答。</p>
        <div className="result-actions"><button onClick={() => navigate('speaking')}><RotateCcw size={17}/> 再答一次</button><button onClick={() => navigate('dashboard')}>回到學習首頁</button></div>
      </div>
      <div className="overall-score"><div className="score-ring"><span><b>79</b><small>/ 100</small></span></div><p><b>整體表現</b><span>GOOD · CEFR B2</span></p><em><TrendingUp size={14}/> +4 from last time</em></div>
    </section>

    <section className="score-breakdown">
      {scoreItems.map(item => <article key={item.name}>
        <div><p><b>{item.name}</b><span>{item.en}</span></p><strong>{item.score}</strong></div>
        <div className="metric-bar"><i style={{width:`${item.score}%`}}></i></div>
        <small>{item.note}</small>
      </article>)}
    </section>

    <div className="analysis-grid">
      <section className="answer-analysis panel">
        <div className="analysis-tabs"><button className={tab==='feedback'?'active':''} onClick={()=>setTab('feedback')}>AI 回饋</button><button className={tab==='details'?'active':''} onClick={()=>setTab('details')}>逐句分析</button><button className={tab==='pronunciation'?'active':''} onClick={()=>setTab('pronunciation')}>發音練習</button></div>
        {tab === 'feedback' && <div className="feedback-body">
          <AnswerBlock label="YOUR ANSWER" title="你的原始回答" type="original">
            I <mark>manage</mark> a project last year, and my team <mark>have</mark> five people. I needed to check the schedule and talk with everyone. Finally we finished it on time.
          </AnswerBlock>
          <AnswerBlock label="AI CORRECTION" title="文法修正版" type="correction">
            I <ins>managed</ins> a project last year, and my team <ins>consisted of</ins> five people. I needed to check the schedule and talk with everyone. Finally, we finished it on time.
          </AnswerBlock>
          <div className="coach-comment"><Sparkles size={20}/><p><b>Coach Maya</b><span>時態要和「last year」一致，因此使用 <strong>managed</strong>。描述團隊組成時，<strong>consisted of</strong> 會比 have 更自然。</span></p></div>
        </div>}
        {tab === 'details' && <div className="detail-list">
          <div><span>01</span><p><b>I managed a project last year.</b><em><CheckCircle2 size={15}/> 時態修正</em></p><strong>92</strong></div>
          <div><span>02</span><p><b>My team consisted of five people.</b><em><WandSparkles size={15}/> 自然度提升</em></p><strong>87</strong></div>
          <div><span>03</span><p><b>Finally, we finished it on time.</b><em><CheckCircle2 size={15}/> 表達正確</em></p><strong>94</strong></div>
        </div>}
        {tab === 'pronunciation' && <div className="pronounce-body"><div className="word-card"><b>managed</b><span>/ˈmæn.ɪdʒd/</span><p>注意字尾 <strong>/dʒd/</strong> 的濁音，不要省略最後的 d。</p><button onClick={playExample}><Volume2 size={17}/> 播放示範</button></div><div className="syllables"><span>man</span><i>·</i><span>aged</span><em>STRESS</em></div></div>}
      </section>
      <aside className="model-answer panel">
        <div className="model-heading"><span><Star size={16} fill="currentColor"/> HIGH-SCORE EXAMPLE</span><h3>更自然的高分回答</h3></div>
        <p>“Last year, I managed an AI development project with a five-person team. I was responsible for coordinating schedules, resolving issues, and communicating with stakeholders.”</p>
        <button className={playing?'playing':''} onClick={playExample}>{playing?<Pause size={18}/>:<Play size={18} fill="currentColor"/>}<span><b>{playing?'播放中…':'播放標準語音'}</b><small>美式英語 · 正常速度</small></span></button>
        <div className="upgrade-list"><b>高分關鍵</b><span><Check size={15}/> 使用具體的職責描述</span><span><Check size={15}/> 加入商務情境字彙</span><span><Check size={15}/> 結構清楚，資訊完整</span></div>
        <button className="save-weak"><BookOpenCheck size={17}/> 儲存到弱點題庫</button>
      </aside>
    </div>
    <section className="next-plan"><div className="plan-spark"><Zap size={20}/></div><div><span>YOUR NEXT STEP</span><h3>AI 已安排下一次練習</h3><p>明天下午 7:30 · 情境應答：專案管理與團隊合作</p></div><button onClick={() => navigate('dashboard')}>查看學習計畫 <ArrowRight size={16}/></button></section>
  </div>
}

function AnswerBlock({label,title,type,children}) {
  return <div className={`answer-block ${type}`}><div><span>{label}</span><b>{title}</b></div><p>{children}</p></div>
}

createRoot(document.getElementById('root')).render(<App />)
