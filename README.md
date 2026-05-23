# Paranoia // SCP-RP

Многостраничный сайт-форум для SCP-RP сервера **Paranoia** на Garry's Mod.

> Содержи. Изолируй. Защити.

## Страницы

- `index.html` — главная: онлайн, активные SCP, лента последних обновлений, терминал
- `rules.html` — регламент Зоны-31 по уровням допуска
- `lore.html` — **«Рабочий стол ОВР»**: сетка папок-операций
- `updates.html` — девблог: обновления, баланс, идеи
- `donate.html` — заглушка под донат-систему с 4 уровнями поддержки

## Структура

```
paranoia-scp/
├── index.html
├── rules.html
├── lore.html
├── updates.html
├── donate.html
├── style.css                            — общие стили
├── nav.js                               — навигация, футер, lightbox, анимации
├── docs/                                — архив отдела внутренних расследований
│   ├── _operation-template.html         — шаблон папки-операции
│   ├── _document-template.html          — шаблон документа
│   └── black-cascade/                   — папка операции
│       ├── index.html                   — список файлов папки
│       ├── zone-65-field-report.html    — первый отчёт
│       └── assets/                      — фото/вложения
│           ├── att-01-aerial-perimeter.png
│           ├── att-02-bodycam-walker.png
│           └── att-03-colossal-ne.png
└── updates/                             — длинные записи девблога
    └── _template.html
```

## Как завести новую операцию (новую папку)

1. Создай папку `docs/<кодовое-имя>/` и `docs/<кодовое-имя>/assets/`.
2. Скопируй `docs/_operation-template.html` → `docs/<кодовое-имя>/index.html`.
3. Замени все `[PLACEHOLDER]` в файле.
4. В `lore.html` добавь карточку папки в сетку:

   ```html
   <a href="docs/<кодовое-имя>/index.html" class="folder">
     <div class="folder__icon"></div>
     <div class="folder__name">КОДОВОЕ ИМЯ</div>
     <div class="folder__meta">N документов · ДД.ММ.ГГГГ</div>
     <span class="folder__status folder__status--active">active</span>
   </a>
   ```

   Статусы: `active` (красный) / `ongoing` (золото) / `closed` (зелёный) / `classified` (серый).

## Как добавить документ в папку операции

1. Скопируй `docs/_document-template.html` в `docs/<папка>/<имя>.html`.
2. Положи фотки в `docs/<папка>/assets/`.
3. Замени `[PLACEHOLDER]` (заголовки, поля шапки, секции).
4. Добавь строку в `<div class="files">` в `index.html` папки.

## Как добавить фотовложение в документ

Внутри `.report-body` вставь:

```html
<div class="photo-gallery">
  <figure class="photo">
    <img src="assets/file.png" alt="alt" />
    <figcaption class="photo__cap">
      <div class="top">
        <span class="id">ATT-01</span>
        <span class="title">короткий заголовок</span>
      </div>
      <div class="meta">источник · ДД.ММ.ГГГГ ЧЧ:ММ UTC · координаты</div>
      <div class="desc">Подробная подпись для следователя.</div>
    </figcaption>
  </figure>
</div>
```

Клик по фото открывает полноэкранный просмотр (lightbox в `nav.js`).

## Как добавить запись в девблог

**Короткая запись** — вставь блок `<article class="update-card">` в начало списка в `updates.html`.

**Развёрнутая запись** — скопируй `updates/_template.html` в новый файл,
например `updates/2026-06-01-launch.html`, и сошлись на него.

## Технически

- Чистый HTML/CSS/JS, без фреймворков и сборки
- Шрифты: Cinzel (заголовки) + Share Tech Mono (интерфейс)
- Палитра: графит `#0c0b09` / `#111009` / `#16140e` + золото `#c9a84c`
- Адаптив: 3 точки перелома (980/760/600)

## Локальный запуск

Просто открой `index.html` в браузере. Для красивых путей лучше через простой сервер:

```bash
python -m http.server 8000
# или
npx serve .
```
