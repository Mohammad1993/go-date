const CONFIG = {
  question: "❤️ می‌خوای بریم دیت؟",

  noMessages: [
    "📋 درخواست نه شما ثبت شد و بلافاصله رد شد.",
    "📋 درخواست نه شما ثبت شد و بلافاصله رد شد.",

    "❌ گزینه نه در منطقه شما پشتیبانی نمی‌شود.",
    "❌ گزینه نه در منطقه شما پشتیبانی نمی‌شود.",

    "🚨 هشدار: کاربر به نه گفتن اعتیاد پیدا کرده است!",
    "🚨 هشدار: کاربر به نه گفتن اعتیاد پیدا کرده است!",

    "👀 ما هر دو می‌دونیم آخرش بله رو می‌زنی...",
    "👀 ما هر دو می‌دونیم آخرش بله رو می‌زنی..."
  ],

  finalNoMessage: "🧪 این میزان مقاومت در آزمایشگاه ثبت شد.",

  firstTryYes:
    "⚡ رکورد جدید ثبت شد! حتی یک بار هم روی «نه» کلیک نکردی 😳❤️",

  yesMessages: [
    "🎉 عملیات متقاعدسازی با موفقیت انجام شد!",
    "✅ عالی شد! دکمه نه هم از اول اضافه بود.",
    "🎊 تبریک! شما از مرحله لجبازی عبور کردید."
  ],

  afterYesMessage: "حالا پاتوقمون رو انتخاب کنیم؟ 😎",

  yesFollowMessage:
    "😏 دکمه بله تصمیم گرفته خودش را به شما نزدیک کند..."
};

const places = [
  "☕ کافه آریا",
  "🍕 پیتزا شاپ",
  "🌳 پارک مرکزی",
  "🍦 بستنی ساحل",
  "🎬 سینما شهر"
];

const dates = [
  "📅 امروز",
  "📅 فردا",
  "📅 آخر هفته"
];

const isMobile =
  /Android|iPhone|iPad|iPod|Mobile/i
  .test(navigator.userAgent);

const message = document.getElementById("message");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noCount = 0;

let followActivated = false;
let escapeActivated = false;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let yesX = 0;
let yesY = 0;

let noX = 0;
let noY = 0;

let yesScale = 1;

let selectedPlace = "";
let selectedDate = "";

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("touchmove", (e) => {

  if (e.touches.length > 0) {

    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  }

}, { passive: true });

document.addEventListener("touchstart", (e) => {

  if (e.touches.length > 0) {

    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  }

}, { passive: true });

function randomYesMessage() {

  return CONFIG.yesMessages[
    Math.floor(
      Math.random() *
      CONFIG.yesMessages.length
    )
  ];
}

function startFollowMode() {

  if (followActivated) return;

  followActivated = true;

  const rect =
    yesBtn.getBoundingClientRect();

  yesX = rect.left;
  yesY = rect.top;

  yesBtn.style.position = "fixed";
  yesBtn.style.left = yesX + "px";
  yesBtn.style.top = yesY + "px";
  yesBtn.style.zIndex = "999";
}

function startNoEscapeMode() {

  if (escapeActivated) return;

  escapeActivated = true;

  const rect =
    noBtn.getBoundingClientRect();

  noX = rect.left;
  noY = rect.top;

  noBtn.style.position = "fixed";
  noBtn.style.left = noX + "px";
  noBtn.style.top = noY + "px";
  noBtn.style.zIndex = "999";
}

function followMouse() {

  if (followActivated) {

    const targetX =
      mouseX -
      (yesBtn.offsetWidth / 2);

    const targetY =
      mouseY -
      (yesBtn.offsetHeight / 2);

    const speed =
      isMobile
        ? 0.01
        : 0.015;

    yesX +=
      (targetX - yesX) * speed;

    yesY +=
      (targetY - yesY) * speed;

    yesBtn.style.left =
      yesX + "px";

    yesBtn.style.top =
      yesY + "px";
  }

  requestAnimationFrame(
    followMouse
  );
}

function escapeMouse() {

  if (
    escapeActivated &&
    noCount >= 5 &&
    noCount <= 8
  ) {

    const rect =
      noBtn.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;

    const dx =
      centerX - mouseX;

    const dy =
      centerY - mouseY;

    const distance =
      Math.sqrt(
        dx * dx + dy * dy
      );

    const safeDistance =
      isMobile
        ? 180
        : 120;

    if (distance < safeDistance) {

      const escapeSpeed =
        (safeDistance - distance) *
        (isMobile ? 0.02 : 0.04);

      noX +=
        (dx / Math.max(distance, 1)) *
        escapeSpeed;

      noY +=
        (dy / Math.max(distance, 1)) *
        escapeSpeed;

      const margin =
        isMobile
          ? 50
          : 100;

      noX = Math.max(
        margin,
        Math.min(
          noX,
          window.innerWidth -
          rect.width -
          margin
        )
      );

      noY = Math.max(
        margin,
        Math.min(
          noY,
          window.innerHeight -
          rect.height -
          margin
        )
      );

      noBtn.style.left =
        noX + "px";

      noBtn.style.top =
        noY + "px";
    }
  }

  requestAnimationFrame(
    escapeMouse
  );
}

requestAnimationFrame(
  followMouse
);

requestAnimationFrame(
  escapeMouse
);

function showPlacesScreen() {

  document.body.innerHTML = `
    <div class="container">

      <h2>
        خب 😎
        <br><br>
        حالا پاتوقمون رو انتخاب کنیم...
      </h2>

      <div id="placesContainer"></div>

    </div>
  `;

  const container =
    document.getElementById(
      "placesContainer"
    );

  places.forEach(place => {

    const btn =
      document.createElement(
        "button"
      );

    btn.className =
      "place-card";

    btn.innerText = place;

    btn.addEventListener(
      "click",
      () => {

        selectedPlace = place;

        showDateScreen();
      }
    );

    container.appendChild(btn);
  });
}

function showDateScreen() {

  document.body.innerHTML = `
    <div class="container">

      <h2>
        عالیه ❤️
        <br><br>
        حالا کدوم روز؟
      </h2>

      <div id="datesContainer"></div>

    </div>
  `;

  const container =
    document.getElementById(
      "datesContainer"
    );

  dates.forEach(date => {

    const btn =
      document.createElement(
        "button"
      );

    btn.className =
      "date-card";

    btn.innerText = date;

    btn.addEventListener(
      "click",
      () => {

        selectedDate = date;

        showFinalScreen();
      }
    );

    container.appendChild(btn);
  });
}

function showFinalScreen() {

  document.body.innerHTML = `
    <div
      class="container"
      id="resultCard"
    >

      <h1>
        🎉 درخواست دیت با موفقیت ثبت شد
      </h1>

      <h2>
        📍 پاتوق
      </h2>

      <p>
        ${selectedPlace}
      </p>

      <h2>
        📅 زمان
      </h2>

      <p>
        ${selectedDate}
      </p>

      <button id="screenshotBtn">
        📸 گرفتن اسکرین‌شات یادگاری
      </button>

      <br><br>

      <small>
        ⚠️ ارائه این رسید هنگام مراجعه به پاتوق الزامی است! 😎
      </small>

    </div>
  `;

  document
    .getElementById(
      "screenshotBtn"
    )
    .addEventListener(
      "click",
      () => {

        document
          .getElementById(
            "screenshotBtn"
          )
          .style.display =
          "none";

        alert(
          "📸 حالا از صفحه اسکرین‌شات بگیر 😎"
        );
      }
    );
}

noBtn.addEventListener(
  "click",
  () => {

    noCount++;

    if (noCount <= 8) {

      message.innerText =
        CONFIG.noMessages[
          noCount - 1
        ];
    }

    if (noCount >= 3) {

      const noScale =
        Math.max(
          0.12,
          1 -
          (
            (noCount - 2) *
            0.10
          )
        );

      noBtn.style.transform =
        `scale(${noScale})`;

      yesScale =
        1 +
        (
          (noCount - 2) *
          0.15
        );

      yesBtn.style.transform =
        `scale(${yesScale})`;
    }

    if (noCount === 5) {

      message.innerText =
        CONFIG.yesFollowMessage;

      startFollowMode();
      startNoEscapeMode();
    }

    if (
      noCount >= 5 &&
      noCount <= 8
    ) {

      const margin =
        isMobile
          ? 50
          : 100;

      const maxX =
        window.innerWidth -
        noBtn.offsetWidth -
        margin;

      const maxY =
        window.innerHeight -
        noBtn.offsetHeight -
        margin;

      noX =
        margin +
        Math.random() *
        (maxX - margin);

      noY =
        margin +
        Math.random() *
        (maxY - margin);

      noBtn.style.left =
        noX + "px";

      noBtn.style.top =
        noY + "px";
    }

    if (noCount === 9) {

      message.innerText =
        CONFIG.finalNoMessage;

      noBtn.style.transition =
        "all .8s ease";

      noBtn.style.opacity =
        "0";

      noBtn.style.transform =
        "scale(0) rotate(360deg)";

      setTimeout(
        () => {
          noBtn.remove();
        },
        800
      );
    }
  }
);

yesBtn.addEventListener(
  "click",
  () => {

    if (noCount === 0) {

      message.innerHTML =
        CONFIG.firstTryYes;

    } else {

      message.innerHTML = `
        ${randomYesMessage()}
        <br><br>
        ${CONFIG.afterYesMessage}
      `;
    }

    yesBtn.style.animation =
      "pulse .8s ease";

    setTimeout(
      () => {
        showPlacesScreen();
      },
      2500
    );
  }
);