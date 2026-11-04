// ===== 文字 / Texts (Japanese and English) =====
const texts = {
  ja: {
    title: "🌸 スケジュール管理 🌸", formTitle: "予定を入れる",
    labelTitle: "タイトル", labelDate: "日付", labelStart: "はじまる時間",
    labelEnd: "おわる時間", labelCat: "カテゴリー",
    study: "学習", work: "仕事", private: "プライベート",
    add: "追加", save: "保存", cancel: "キャンセル",
    viewTitle: "日付をえらぶ・さがす", phTitle: "例：英語の宿題", phSearch: "キーワードでさがす",
    empty: "予定がありません", edit: "編集", del: "削除",
    errTitle: "タイトルを入力してください", errTime: "時間がまちがっています",
    overlap: "⚠ ほかの予定と時間がかさなっています"
  },
  en: {
    title: "🌸 Schedule Manager 🌸", formTitle: "Add a schedule",
    labelTitle: "Title", labelDate: "Date", labelStart: "Start time",
    labelEnd: "End time", labelCat: "Category",
    study: "Study", work: "Work", private: "Private",
    add: "Add", save: "Save", cancel: "Cancel",
    viewTitle: "Choose a date / Search", phTitle: "e.g. English homework", phSearch: "Search by keyword",
    empty: "No schedules", edit: "Edit", del: "Delete",
    errTitle: "Please enter a title", errTime: "The time is wrong",
    overlap: "⚠ This overlaps with another schedule"
  }
};

// ===== データ / Data =====
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
let lang = localStorage.getItem("lang") || "ja";
let editId = null; // null = adding, a number = editing that schedule

// 今日の日付 (YYYY-MM-DD) / today's date
function todayString() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + day;
}

function saveData() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

// ===== 言語切りかえ / Language switch =====
function applyLanguage() {
  const t = texts[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t[el.dataset.i18n];
  });
  document.querySelectorAll("[data-ph]").forEach(function (el) {
    el.placeholder = t[el.dataset.ph];
  });
  document.getElementById("saveBtn").textContent = editId === null ? t.add : t.save;
  document.getElementById("btnJa").classList.toggle("active", lang === "ja");
  document.getElementById("btnEn").classList.toggle("active", lang === "en");
  document.getElementById("message").textContent = "";
  render();
}

function setLanguage(newLang) {
  lang = newLang;
  localStorage.setItem("lang", lang);
  applyLanguage();
}

// ===== メッセージ / Message =====
function showMessage(text, type) {
  const box = document.getElementById("message");
  box.textContent = text;
  box.className = type; // "error" or "warn"
}

// ===== 重なりチェック / Overlap check =====
function hasOverlap(date, start, end) {
  return schedules.some(function (s) {
    return s.id !== editId && s.date === date && start < s.end && end > s.start;
  });
}

// ===== 表示 / Show the list =====
function render() {
  const t = texts[lang];
  const selectedDate = document.getElementById("viewDate").value;
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  // 選んだ日付だけ + キーワード / selected date only + keyword
  const list = schedules.filter(function (s) {
    return s.date === selectedDate && s.title.toLowerCase().includes(keyword);
  });
  // 早い時間じゅん / earliest time first
  list.sort(function (a, b) {
    return a.start.localeCompare(b.start);
  });

  const ul = document.getElementById("list");
  ul.innerHTML = "";
  document.getElementById("emptyMsg").hidden = list.length > 0;

  list.forEach(function (s) {
    const li = document.createElement("li");
    li.className = s.category; // color by category

    const time = document.createElement("div");
    time.className = "time";
    time.textContent = s.start + " 〜 " + s.end;

    const title = document.createElement("strong");
    title.textContent = s.title;

    const cat = document.createElement("div");
    cat.className = "cat";
    cat.textContent = t[s.category];

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "small-btn";
    editBtn.textContent = t.edit;
    editBtn.addEventListener("click", function () { startEdit(s.id); });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "small-btn";
    delBtn.textContent = t.del;
    delBtn.addEventListener("click", function () { deleteSchedule(s.id); });

    li.append(time, title, cat, editBtn, delBtn);
    ul.appendChild(li);
  });
}

// ===== 追加・保存 / Add or save =====
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const t = texts[lang];
  const title = document.getElementById("titleInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const start = document.getElementById("startInput").value;
  const end = document.getElementById("endInput").value;
  const category = document.getElementById("catInput").value;

  if (title === "") { showMessage(t.errTitle, "error"); return; }
  if (start >= end) { showMessage(t.errTime, "error"); return; }

  const overlapped = hasOverlap(date, start, end);

  if (editId === null) {
    schedules.push({ id: Date.now(), title: title, date: date, start: start, end: end, category: category });
  } else {
    const s = schedules.find(function (item) { return item.id === editId; });
    s.title = title; s.date = date; s.start = start; s.end = end; s.category = category;
  }
  saveData();

  resetForm();
  showMessage(overlapped ? t.overlap : "", "warn");
  document.getElementById("viewDate").value = date; // show the saved day
  render();
});

// ===== 編集 / Edit =====
function startEdit(id) {
  const s = schedules.find(function (item) { return item.id === id; });
  editId = id;
  document.getElementById("titleInput").value = s.title;
  document.getElementById("dateInput").value = s.date;
  document.getElementById("startInput").value = s.start;
  document.getElementById("endInput").value = s.end;
  document.getElementById("catInput").value = s.category;
  document.getElementById("cancelBtn").hidden = false;
  document.getElementById("saveBtn").textContent = texts[lang].save;
  window.scrollTo(0, 0);
}

function resetForm() {
  editId = null;
  document.getElementById("form").reset();
  document.getElementById("dateInput").value = document.getElementById("viewDate").value;
  document.getElementById("cancelBtn").hidden = true;
  document.getElementById("saveBtn").textContent = texts[lang].add;
  showMessage("", "");
}

// ===== 削除 / Delete =====
function deleteSchedule(id) {
  schedules = schedules.filter(function (s) { return s.id !== id; });
  saveData();
  if (editId === id) { resetForm(); }
  render();
}

// ===== ボタンとイベント / Events =====
document.getElementById("cancelBtn").addEventListener("click", resetForm);
document.getElementById("btnJa").addEventListener("click", function () { setLanguage("ja"); });
document.getElementById("btnEn").addEventListener("click", function () { setLanguage("en"); });
document.getElementById("viewDate").addEventListener("change", render);
document.getElementById("searchInput").addEventListener("input", render);

// ===== スタート / Start =====
document.getElementById("viewDate").value = todayString();
document.getElementById("dateInput").value = todayString();
applyLanguage();
