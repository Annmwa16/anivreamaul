/* ==========================================================
   Anniversary Website — script.js
   Vanilla JS, clean & professional.
   ========================================================== */

"use strict";

// ----------------------------------------------------------
// UTILITY HELPERS
// ----------------------------------------------------------

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(function (s) {
    s.classList.remove("active");
  });
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

function hideEl(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

function showEl(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

function normalizeAnswer(str) {
  return str.trim().toLowerCase().replace(/\s+/g, " ");
}

// ----------------------------------------------------------
// SECTION 1: LOADING SCREEN
// ----------------------------------------------------------

(function initLoading() {
  setTimeout(function () {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.classList.add("fade-out");
      setTimeout(function () {
        showScreen("minigame-screen");
        loadingScreen.classList.remove("fade-out");
        loadingScreen.classList.remove("active");
      }, 600);
    }
  }, 3500);
})();

// ----------------------------------------------------------
// SECTION 2: MINIGAME — QUESTION LOGIC
// ----------------------------------------------------------

function checkQ1() {
  const input = document.getElementById("input1");
  const hint = document.getElementById("hint1");
  const answer = normalizeAnswer(input.value);

  const valid = ["16 mei 2025", "16 may 2025"];

  if (valid.includes(answer)) {
    hint.textContent = "";
    hideEl("q1");
    showEl("q2");
    document.getElementById("input2").focus();
  } else {
    hint.style.color = "#e74c3c";
    hint.textContent = "Coba ingat-ingat lagi...";
    input.classList.add("shake");
    setTimeout(function () {
      input.classList.remove("shake");
    }, 400);
  }
}

function checkQ2() {
  const input = document.getElementById("input2");
  const hint = document.getElementById("hint2");
  const answer = normalizeAnswer(input.value);

  const valid = ["07 maret 2007", "7 maret 2007", "07 march 2007", "7 march 2007"];

  if (valid.includes(answer)) {
    hint.textContent = "";
    hideEl("q2");
    showEl("q3");
    document.getElementById("input3").focus();
  } else {
    hint.style.color = "#e74c3c";
    hint.textContent = "Tanggal lahirnya kurang tepat, coba lagi yuk.";
    input.classList.add("shake");
    setTimeout(function () {
      input.classList.remove("shake");
    }, 400);
  }
}

function checkQ3() {
  const input = document.getElementById("input3");
  if (input.value.trim().length >= 1) {
    hideEl("q3");
    showEl("q-success");

    setTimeout(function () {
      triggerPetalTransition(function () {
        showScreen("scrapbook-screen");
      });
    }, 1500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const pairs = [
    { inputId: "input1", fn: checkQ1 },
    { inputId: "input2", fn: checkQ2 },
    { inputId: "input3", fn: checkQ3 },
  ];

  pairs.forEach(function (pair) {
    const el = document.getElementById(pair.inputId);
    if (el) {
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter") pair.fn();
      });
    }
  });
});

// ----------------------------------------------------------
// PETAL TRANSITION
// ----------------------------------------------------------

function triggerPetalTransition(callback) {
  const overlay = document.getElementById("petal-transition");
  const container = document.getElementById("ptPetals");

  if (!overlay || !container) {
    if (callback) callback();
    return;
  }

  container.innerHTML = "";
  var count = 32;
  for (var i = 0; i < count; i++) {
    var p = document.createElement("div");
    p.classList.add("pt-petal");
    p.style.setProperty("--i", i);
    container.appendChild(p);
  }

  overlay.classList.remove("hidden");
  overlay.classList.add("active");

  setTimeout(function () {
    if (callback) callback();
    overlay.classList.remove("active");
    setTimeout(function () {
      overlay.classList.add("hidden");
      container.innerHTML = "";
    }, 700);
  }, 1000);
}

// ----------------------------------------------------------
// SECTION 3: SCRAPBOOK NAVIGATION
// ----------------------------------------------------------

function goToLetter() {
  showScreen("letter-screen");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ----------------------------------------------------------
// SECTION 4: SECRET LETTER — PIN SYSTEM
// ----------------------------------------------------------

var pinInput = "";
var correctPin = "160525";

function pinPress(digit) {
  if (pinInput.length >= 6) return;
  pinInput += digit;
  updateDots();

  if (pinInput.length === 6) {
    setTimeout(pinEnter, 300);
  }
}

function pinClear() {
  if (pinInput.length === 0) return;
  pinInput = pinInput.slice(0, -1);
  updateDots();
  document.getElementById("pinError").textContent = "";
}

function pinEnter() {
  if (pinInput === correctPin) {
    hideEl("pin-section");
    showEl("letter-content");
    startTypewriter();
  } else {
    document.getElementById("pinError").textContent = "PIN salah. Coba lagi.";
    pinInput = "";
    updateDots();
    setTimeout(function () {
      document.getElementById("pinError").textContent = "";
    }, 2000);
  }
}

function updateDots() {
  var dots = document.querySelectorAll("#pinDots .dot");
  dots.forEach(function (dot, index) {
    if (index < pinInput.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}

// ----------------------------------------------------------
// SECTION 5: TYPEWRITER EFFECT
// ----------------------------------------------------------

var typewriterText = "Ga kerasa yaaaa, perjalanan kita udah sampe di titik ini. Akuuu inget banget gimana awalnya kita cumaaaa manggil nama rea aja, masih malu-malu, terus pelan-pelan berubah jadi sayang, jadi bubiee, sampe akhirnya kita punya dunia kecil kita sendiri kayak sekarang. Mamamaciiii ya udah mau bertahan sama aku, cowoo yang mungkin kadang nyebelin suka nyakitin tapi bener-bener sayang banget sama kamu. Makasiiii udah nemenin aku ngelewatin banyak hal. Ingettt gaaaa momen kitaaa ngerjain Ujikom bareng di rumah kamu? Kita begadang, kamu sampe ketiduran jam 11 malem karena saking capeknya... itu momen yang gak bakal aku lupain karena di situ aku sadar betapa hebatnya kamu. Makasiiii juga udah ngerawat Bubu bareng aku, meskipun sekarang Bubu udah gak ada, tapi memori itu tetep jadi salah satu bagian paling manis di hidup aku. Dari zaman kita masih pake seragam sekolah, foto angkatan bareng di hari terakhir, sampe sekarang kita mulai melangkah ke fase yang lebih dewasa, kamu tetep jadi alasan aku buat semangat setiap hari. Bahkan dari awal aku punya laptop ini, foto kamu yang pertama kali ada dan jadi wallpaper-nya, dan itu gak pernah berubah—sama kayak perasaan aku ke kamu. Aku gak tau apa yang bakal terjadi di masa depan nanti, tapi yang aku tau, aku pengen terus bareng-back-sama kamu. Makasih udah jadi pendengar yang baik, makasih udah kasih hadiah-hadiah lucu yang selalu aku simpen, dan makasih udah jadi Andrea yang paling sabar. Happy Anniversary, sayang. Aku sayang kamu lebih dari yang bisa aku tulis di sini. Tetep sama aku terus ya?";

function startTypewriter() {
  var el = document.getElementById("letterTypewriter");
  if (!el) return;

  el.textContent = "";
  var index = 0;
  var speed = 38;

  function type() {
    if (index < typewriterText.length) {
      el.textContent += typewriterText.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 500);
}

// ----------------------------------------------------------
// SECTION 6: REVEAL COUPON
// ----------------------------------------------------------

function revealCoupon() {
  hideEl("giftSection");
  showEl("coupon-section");

  var coupon = document.getElementById("coupon-section");
  if (coupon) {
    setTimeout(function () {
      coupon.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
}