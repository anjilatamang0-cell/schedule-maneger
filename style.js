body {
  margin: 0;
  padding: 16px;
  background: #fff5f8;
  font-family: "Hiragino Maru Gothic ProN", "Meiryo", sans-serif;
  font-size: 16px;
  color: #6b4a55;
}

.app { max-width: 480px; margin: 0 auto; }

h1 { text-align: center; color: #e86a9a; margin: 8px 0 16px; }
h2 { font-size: 18px; color: #e86a9a; margin: 0 0 12px; }
h2::before { content: "🌸 "; }

.lang { text-align: right; }
.lang-btn {
  border: 2px solid #f7a8c4;
  background: #fff;
  color: #e86a9a;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}
.lang-btn.active { background: #f7a8c4; color: #fff; }

.card {
  background: #fff;
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(232, 106, 154, 0.2);
}

label { display: block; margin-bottom: 10px; font-size: 14px; }
.row { display: flex; gap: 10px; }
.row label { flex: 1; }

input, select {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 4px;
  padding: 10px 14px;
  border: 2px solid #fbd0df;
  border-radius: 20px;
  font-size: 16px;
  background: #fffafc;
}
#viewDate, #searchInput { margin-bottom: 10px; }

.main-btn, .sub-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 6px;
}
.main-btn {
  background: linear-gradient(135deg, #ff9ec0, #f06a9b);
  color: #fff;
  box-shadow: 0 3px 8px rgba(240, 106, 155, 0.4);
}
.sub-btn { background: #fde4ee; color: #e86a9a; }

#message { min-height: 20px; margin: 4px 0; font-size: 14px; }
#message.error { color: #d6336c; }
#message.warn { color: #e08a00; }

ul { list-style: none; padding: 0; margin: 0; }
li {
  border-left: 8px solid #ccc;
  background: #fffafc;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
li.study { border-left-color: #4aa8f0; background: #e3f2ff; }
li.work { border-left-color: #f5a030; background: #fff0d9; }
li.private { border-left-color: #f06a9b; background: #ffe1ec; }
.time { font-size: 14px; color: #888; }
.cat {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 13px;
  color: #fff;
}
li.study .cat { background: #4aa8f0; }
li.work .cat { background: #f5a030; }
li.private .cat { background: #f06a9b; }
.small-btn {
  border: none;
  border-radius: 14px;
  padding: 6px 12px;
  margin: 6px 6px 0 0;
  background: #fde4ee;
  color: #e86a9a;
  cursor: pointer;
}

#emptyMsg { text-align: center; color: #c9a0b0; }

@media (max-width: 480px) {
  body { padding: 10px; }
  .row { flex-direction: column; gap: 0; }
}
