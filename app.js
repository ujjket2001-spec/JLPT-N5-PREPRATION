// Tab Switching Logic
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Tracker Logic with LocalStorage
let progress = localStorage.getItem('jlpt_progress') ? parseInt(localStorage.getItem('jlpt_progress')) : 0;

function updateProgress(val) {
    progress = Math.min(100, progress + val);
    localStorage.setItem('jlpt_progress', progress);
    renderProgress();
}

function resetProgress() {
    progress = 0;
    localStorage.setItem('jlpt_progress', progress);
    renderProgress();
}

function renderProgress() {
    const bar = document.getElementById('progress-bar');
    bar.style.width = progress + '%';
    bar.innerText = progress + '%';
}
renderProgress();

// Data Source based on provided PDFs
const kanjiData = [
    { id: 1, kanji: "日", meaning: "Day/Sun", reading: "にち・ひ", example: "毎日 (Mainichi)", hinglish: "Har din" },
    { id: 2, kanji: "一", meaning: "One", reading: "いち・ひとつ", example: "一つ (Hitotsu)", hinglish: "Ek" },
    { id: 3, kanji: "二", meaning: "Two", reading: "に・ふたつ", example: "二つ (Futatsu)", hinglish: "Do" },
    { id: 4, kanji: "三", meaning: "Three", reading: "さん・みっつ", example: "三つ (Mittsu)", hinglish: "Teen" },
    { id: 5, kanji: "四", meaning: "Four", reading: "よん・し・よっつ", example: "四つ (Yottsu)", hinglish: "Chaar" },
    { id: 100, kanji: "行", meaning: "Go", reading: "いく・こう", example: "行く (Iku)", hinglish: "Jaana" },
    { id: 101, kanji: "来", meaning: "Come", reading: "くる・らい", example: "来る (Kuru)", hinglish: "Aana" },
    { id: 102, kanji: "見", meaning: "See/Look", reading: "みる・みえる", example: "見る (Miru)", hinglish: "Dekhna" }
];

const vocabData = [
    { lesson: "Lesson 1", word: "わたし", romaji: "Watashi", meaning: "I / Main" },
    { lesson: "Lesson 1", word: "ぎんこういん", romaji: "Ginkouin", meaning: "Bank employee" },
    { lesson: "Lesson 2", word: "これ", romaji: "Kore", meaning: "This" },
    { lesson: "Lesson 2", word: "じしょ", romaji: "Jisho", meaning: "Dictionary" },
    { lesson: "Lesson 3", word: "ここ", romaji: "Koko", meaning: "Here" },
    { lesson: "Lesson 4", word: "いま", romaji: "Ima", meaning: "Now" }
];

const grammarData = [
    { lesson: "Lesson 1", pattern: "[Noun A] wa [Noun B] desu", desc: "A is B (e.g., Watashi wa Miku desu)." },
    { lesson: "Lesson 2", pattern: "Kore / Sore / Are", desc: "Demonstrative pronouns for objects close, far from speaker/listener." },
    { lesson: "Lesson 3", pattern: "Koko / Soko / Asoko", desc: "Indicating locations and places." },
    { lesson: "Lesson 4", pattern: "[Time] ni [Verb]", desc: "Expressing specific time when an action takes place." },
    { lesson: "Lesson 5", pattern: "[Place] e ikimasu", desc: "Going towards a direction/place." }
];

const renshuuData = [
    { lesson: "Lesson 1", content: "Renshuu A, B, C & Mondai practice sets covering self-introductions and 'desu / ja arimasen'." },
    { lesson: "Lesson 2", content: "Demonstratives (kono, sono, ano) and identifying ownership with 'no'." },
    { lesson: "Lesson 3", content: "Location markers and asking prices (いくらですか)." },
    { lesson: "Lesson 4", content: "Time expressions, starting/ending hours (~kara ~made)." },
    { lesson: "Lesson 5", content: "Particles like 'de' (by means of) and 'to' (with someone)." }
];

// Render Functions
function displayKanji(data) {
    const container = document.getElementById('kanjiContainer');
    container.innerHTML = data.map(k => `
        <div class="card">
            <h3>${k.kanji} (${k.meaning})</h3>
            <p><strong>Reading:</strong> ${k.reading}</p>
            <p><strong>Example:</strong> ${k.example}</p>
            <p><strong>Hinglish:</strong> ${k.hinglish}</p>
        </div>
    `).join('');
}

function displayVocab(data) {
    const container = document.getElementById('vocabContainer');
    container.innerHTML = data.map(v => `
        <div class="card">
            <h4>${v.lesson}: ${v.word} (${v.romaji})</h4>
            <p>Meaning: ${v.meaning}</p>
        </div>
    `).join('');
}

function displayGrammar() {
    const container = document.getElementById('grammarContainer');
    container.innerHTML = grammarData.map(g => `
        <div class="card">
            <h3>${g.lesson}</h3>
            <p><strong>Pattern:</strong> ${g.pattern}</p>
            <p><strong>Usage:</strong> ${g.desc}</p>
        </div>
    `).join('');
}

function displayRenshuu() {
    const container = document.getElementById('renshuuContainer');
    container.innerHTML = renshuuData.map(r => `
        <div class="card">
            <h3>${r.lesson} Exercises</h3>
            <p>${r.content}</p>
        </div>
    `).join('');
}

// Search Filters
function filterKanji() {
    const query = document.getElementById('kanjiSearch').value.toLowerCase();
    const filtered = kanjiData.filter(k => 
        k.meaning.toLowerCase().includes(query) || 
        k.hinglish.toLowerCase().includes(query) || 
        k.reading.toLowerCase().includes(query) ||
        k.kanji.includes(query)
    );
    displayKanji(filtered);
}

function filterVocab() {
    const query = document.getElementById('vocabSearch').value.toLowerCase();
    const filtered = vocabData.filter(v => 
        v.word.toLowerCase().includes(query) || 
        v.romaji.toLowerCase().includes(query) || 
        v.meaning.toLowerCase().includes(query)
    );
    displayVocab(filtered);
}

// Initial Load
displayKanji(kanjiData);
displayVocab(vocabData);
displayGrammar();
displayRenshuu();
      
