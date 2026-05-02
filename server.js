const express = require('express');
const app = express();

let questState = { current: 0, completed: false };

const questMessages = [
  { text: "ВВЕДИТЕ ВАШ ВОЗРАСТ (НАПРИМЕР:18):", answer: "30" },
  { text: "🚗 Какая машина сейчас у тебя?", answer: "мазда" },
{ text: "Имя вашего любимого человека(Жена/Муж)", answer: "Юля" },
{ text: "Имя вашего ребенка", answer: "Василиса" },
{ text: "📅 Какой сейчас год?", answer: "2026" },
{ text: "Сколько струн у балалайки?", answer: "3" },
{ text: "Имя вашего любимого начальника", answer: "Сергей Викторович" },
{ text: "В какой стране, недавно обнаружили комаров?", answer: "Исландия" },
{ text: "Что принадлежит тебе, но чаще это используют другие?", answer: "Имя" },
{ text: "Что можно держать правой рукой, но нельзя левой?", answer: "Левую руку" },
{ text: "Что становится больше, если его поставить вверх ногами?", answer: "Число 6" }
];


app.use(express.json());
app.use(express.static('public'));

app.get('/status', (req, res) => {
  res.json({ quest: questState.current, completed: questState.completed });
});

app.post('/submit', (req, res) => {
  const { answer } = req.body;
  const idx = questState.current;
  if (idx < questMessages.length) {
    const correct = questMessages[idx].answer;
    if (answer.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim()) {
      questState.current++;
      console.log(`✅ Квест ${idx+1} пройден!`);
      if (questState.current >= questMessages.length) {
        questState.completed = true;
        console.log("🎉 ВСЕ КВЕСТЫ ПРОЙДЕНЫ!");
      }
      res.json({ success: true, nextQuest: questState.current, completed: questState.completed });
    } else {
      res.json({ success: false, message: "Неверно, попробуй ещё!" });
    }
  } else {
    res.json({ success: false, message: "Квесты уже завершены!" });
  }
});

// ========== СБРОС (РАБОТАЕТ И POST, И GET) ==========
app.post('/reset', (req, res) => {
  questState = { current: 0, completed: false };
  console.log("🔄 Квест сброшен (POST)!");
  res.json({ success: true });
});

app.get('/reset', (req, res) => {
  questState = { current: 0, completed: false };
  console.log("🔄 Квест сброшен (GET)!");
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
