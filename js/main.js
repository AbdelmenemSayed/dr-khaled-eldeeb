/**
 * Dr. Khaled Eldeeb - Dental Implant Landing Page Scripts
 * Includes:
 * 1. Interactive Implant Candidacy Quiz
 * 2. Before & After Touch/Mouse Slider
 * 3. FAQ Accordion
 * 4. Booking Dialog & WhatsApp Smart Routing
 * 5. Mobile Navigation & Header Scroll
 */

// Clinic Default WhatsApp & Phone Config (Can be changed anytime)
const CLINIC_CONFIG = {
  phoneDisplay: "01028123446",
  whatsappNumber: "201028123446", // International format without +
  doctorName: "د. خالد الديب",
  clinicLocation: "الإسكندرية"
};

document.addEventListener("DOMContentLoaded", () => {
  initQuiz();
  initBeforeAfterSlider();
  initFaqAccordion();
  initBookingModal();
  initHeaderAndNav();
  initForms();
});

/* ==========================================================================
   1. Interactive Implant Candidacy Quiz (حاسبة ملائمة الزراعة)
   ========================================================================== */
function initQuiz() {
  const quizSteps = [
    {
      step: 1,
      question: "ما هو عدد الأسنان المراد تعويضها بزراعة الأسنان؟",
      options: [
        { title: "سن أو ضرس واحد فقط", desc: "فقدان مفرد يحتاج لتعويض للحفاظ على عظام الفك", value: "single_tooth" },
        { title: "عدة أسنان متفرقة أو متجاورة", desc: "فقدان في أكثر من مكان بالفم", value: "multiple_teeth" },
        { title: "فك كامل (علوي أو سفلي) أو كامل الأسنان", desc: "ترغب في التخلص من التركيبات المتحركة واستعادة أسنان ثابتة", value: "full_arch" }
      ]
    },
    {
      step: 2,
      question: "منذ متى تم خلع السن أو فقدانه؟",
      options: [
        { title: "السن مكسور أو متخلخل ولم يُخلع بعد", desc: "فرصة مثالية لإجراء الزراعة الفورية في نفس الجلسة", value: "not_extracted" },
        { title: "تم الخلع حديثاً (أقل من 3 إلى 6 أشهر)", desc: "كثافة العظم تكون ممتازة ونسبة الاندماج سريعة", value: "recent" },
        { title: "تم الخلع منذ فترة طويلة (أكثر من سنة)", desc: "قد نقوم بفحص سماكة العظم ثلاثياً بالأشعة المقطعية لضمان الثبات", value: "long_ago" }
      ]
    },
    {
      step: 3,
      question: "هل تعاني من أي من الحالات الصحية التالية؟",
      options: [
        { title: "صحة عامة ممتازة ولا أعاني من أمراض مزمنة", desc: "نسبة نجاح الزراعة تتجاوز 99% بإذن الله", value: "healthy" },
        { title: "أعاني من السكري ولكن بنسبة منتظمة أو ضغط دم", desc: "الزراعة آمنة تماماً مع بروتوكول التثبيت والمتابعة الطبية", value: "controlled_chronic" },
        { title: "مدخن (سجائر أو فيب)", desc: "تتم الزراعة بنجاح مع اتباع تعليمات خاصة لفترة الالتئام", value: "smoker" }
      ]
    }
  ];

  let currentStepIndex = 0;
  const answers = {};

  const stepContainer = document.getElementById("quizStepContainer");
  const resultContainer = document.getElementById("quizResultCard");
  const progressBar = document.getElementById("quizProgressBar");
  const prevBtn = document.getElementById("quizPrevBtn");
  const nextBtn = document.getElementById("quizNextBtn");

  if (!stepContainer) return;

  function renderStep(index) {
    const currentQ = quizSteps[index];
    progressBar.style.width = `${((index + 1) / quizSteps.length) * 100}%`;

    stepContainer.innerHTML = `
      <div class="quiz-step-header">
        <span class="quiz-step-indicator">السؤال ${index + 1} من ${quizSteps.length}</span>
      </div>
      <h3 class="quiz-step-question">${currentQ.question}</h3>
      <div class="quiz-options-grid">
        ${currentQ.options.map(opt => `
          <div class="quiz-option-card ${answers[index] === opt.value ? 'selected' : ''}" data-value="${opt.value}">
            <div class="option-radio-circle"></div>
            <div class="option-text-group">
              <span class="option-title">${opt.title}</span>
              <span class="option-desc">${opt.desc}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    // Bind option click
    stepContainer.querySelectorAll(".quiz-option-card").forEach(card => {
      card.addEventListener("click", () => {
        stepContainer.querySelectorAll(".quiz-option-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        answers[index] = card.getAttribute("data-value");
        nextBtn.removeAttribute("disabled");
      });
    });

    // Control buttons state
    prevBtn.style.display = index === 0 ? "none" : "inline-flex";
    nextBtn.textContent = index === quizSteps.length - 1 ? "عرض نتيجة التقييم الطبية ✦" : "التالي 🠐";
    nextBtn.disabled = !answers[index];
  }

  nextBtn.addEventListener("click", () => {
    if (!answers[currentStepIndex]) return;

    if (currentStepIndex < quizSteps.length - 1) {
      currentStepIndex++;
      renderStep(currentStepIndex);
    } else {
      showResult();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderStep(currentStepIndex);
    }
  });

  function showResult() {
    stepContainer.style.display = "none";
    document.querySelector(".quiz-nav-btns").style.display = "none";
    progressBar.style.width = "100%";
    resultContainer.style.display = "block";

    let solutionTitle = "زراعة الأسنان الرقمية الموجهة (3D Guided Implant)";
    let solutionDetails = "بناءً على إجاباتك، حالتك مرشحة بقوة لاستعادة الأسنان المفقودة باستخدام تقنية الزراعة الموجهة بالكمبيوتر بدون شق جراحي وبدون ألم.";
    let benefits = [
      "تثبيت فائق الدقة بدون غرز جراحية في جلسة واحدة",
      "إمكانية تركيب سن مؤقت للمظهر الجمالي فوراً",
      "غرسات تيتانيوم أصلية معتمدة مع ضمان معتمد"
    ];

    if (answers[0] === "full_arch") {
      solutionTitle = "تقنية الفك الكامل الثابت (All-on-4 / All-on-6)";
      solutionDetails = "حالتك تناسب تماماً تقنية تعويض الفك الكامل، حيث يتم تثبيت جسر كامل دائم وثابت على 4 أو 6 غرسات فقط دون الحاجة لأطقم متحركة محرجة.";
      benefits = [
        "استعادة قدرة المضغ والابتسام الطبيعية 100%",
        "توفير كبير في التكلفة مقارنة بزراعة كل سن على حدة",
        "ثبات قوي ودائم لمدى الحياة"
      ];
    } else if (answers[1] === "not_extracted") {
      solutionTitle = "الزراعة الفورية في نفس اليوم (Same-Day Teeth)";
      solutionDetails = "بما أن السن لم يُخلع بعد، يمكنك الاستفادة من بروتوكول الزراعة الفورية: خلع السن المتهالك وتثبيت الغرسة وتاج الزيركون المؤقت في نفس الموعد.";
      benefits = [
        "جلسة واحدة بدلاً من زيارات متعددة",
        "الحفاظ على أنسجة اللثة والجمالية الطبيعية",
        "تجنب انحسار العظم بعد الخلع"
      ];
    }

    const resultBox = document.getElementById("quizResultContent");
    resultBox.innerHTML = `
      <div class="result-badge-icon">
        <svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="result-title">تهانينا! أنت مؤهل بنسبة تفوق 98% لزراعة الأسنان</h3>
      <div class="result-box">
        <h4 class="result-summary-heading">البروتوكول الطبي المقترح لك: ${solutionTitle}</h4>
        <p class="result-summary-text">${solutionDetails}</p>
        <ul class="result-benefits-list">
          ${benefits.map(b => `
            <li>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${b}</span>
            </li>
          `).join("")}
        </ul>
      </div>
      <button id="sendQuizToWhatsappBtn" class="btn btn-whatsapp btn-lg" style="width: 100%;">
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
        </svg>
        إرسال تقرير حالتي لـ د. خالد الديب لحجز كشف فوري
      </button>
    `;

    document.getElementById("sendQuizToWhatsappBtn").addEventListener("click", () => {
      const q1Answers = { single_tooth: "سن واحد", multiple_teeth: "عدة أسنان", full_arch: "فك كامل" };
      const q2Answers = { not_extracted: "لم يُخلع بعد", recent: "حديثاً (أقل من 6 أشهر)", long_ago: "منذ فترة طويلة" };
      const q3Answers = { healthy: "صحة جيدة", controlled_chronic: "سكري/ضغط منتظم", smoker: "مدخن" };

      const message = `السلام عليكم دكتور خالد الديب، قمت باختبار تقييم زراعة الأسنان في موقعكم وأرغب بحجز موعد استشارة:
• الحالة: تعويض ${q1Answers[answers[0]] || "أسنان"}
• موعد الفقدان: ${q2Answers[answers[1]] || "غير محدد"}
• الحالة الصحية: ${q3Answers[answers[2]] || "سليم"}
• البروتوكول المقترح: ${solutionTitle}
يرجى تأكيد أقرب موعد للكشف وفحص الأشعة.`;

      const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // Initial render
  renderStep(0);
}

/* ==========================================================================
   2. Interactive Before & After Touch/Mouse Slider (مقارنة الحالات)
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById("beforeAfterViewer");
  const afterBox = document.getElementById("baAfterImage");
  const divider = document.getElementById("baDivider");
  const handle = document.getElementById("baHandle");

  if (!container || !afterBox || !divider || !handle) return;

  let isSliding = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    // Constrain within 5% to 95%
    percentage = Math.max(5, Math.min(95, percentage));

    afterBox.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
    divider.style.left = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  container.addEventListener("mousedown", (e) => {
    isSliding = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    isSliding = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isSliding) return;
    updateSliderPosition(e.clientX);
  });

  // Touch Events (Mobile)
  container.addEventListener("touchstart", (e) => {
    isSliding = true;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isSliding = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isSliding) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* ==========================================================================
   3. FAQ Accordion (الأسئلة الشائعة)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer-content");

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherAns = otherItem.querySelector(".faq-answer-content");
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + 30 + "px";
      }
    });
  });
}

/* ==========================================================================
   4. Booking Dialog & WhatsApp Smart Routing (المودال ونموذج الحجز)
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  const openButtons = document.querySelectorAll(".open-booking-modal-btn");
  const closeButton = document.getElementById("closeBookingModalBtn");

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.showModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.close();
    });
  }

  // Light dismiss on backdrop click
  modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
}

/* ==========================================================================
   5. Mobile Navigation & Header Scroll
   ========================================================================== */
function initHeaderAndNav() {
  const header = document.querySelector(".header");
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isVisible = navLinks.style.display === "flex";
      navLinks.style.display = isVisible ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.background = "#0b132b";
      navLinks.style.padding = "24px";
      navLinks.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = "none";
        }
      });
    });
  }
}

/* ==========================================================================
   6. Form Submissions to WhatsApp
   ========================================================================== */
function initForms() {
  // Main Consultation Form
  const consultationForm = document.getElementById("consultationForm");
  if (consultationForm) {
    consultationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("patientName")?.value.trim() || "";
      const phone = document.getElementById("patientPhone")?.value.trim() || "";
      const service = document.getElementById("patientService")?.value || "زراعة أسنان";
      const notes = document.getElementById("patientNotes")?.value.trim() || "";

      if (!name || !phone) {
        alert("يرجى إدخال الاسم ورقم الهاتف للتواصل معك");
        return;
      }

      const message = `مرحباً دكتور خالد الديب، أود حجز كشف استشارة لزراعة الأسنان:
• الاسم: ${name}
• رقم الهاتف: ${phone}
• الخدمة المطلوبة: ${service}
${notes ? `• ملاحظات إضافية: ${notes}` : ""}`;

      const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      // Feedback
      alert("جاري تحويلك إلى واتساب العيادة لتأكيد الحجز وموعد الكشف مباشرة!");
      consultationForm.reset();
    });
  }

  // Modal Booking Form
  const modalForm = document.getElementById("modalBookingForm");
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("modalPatientName")?.value.trim() || "";
      const phone = document.getElementById("modalPatientPhone")?.value.trim() || "";
      const service = document.getElementById("modalPatientService")?.value || "زراعة أسنان";

      if (!name || !phone) {
        alert("يرجى إدخال الاسم ورقم الهاتف");
        return;
      }

      const message = `طلب حجز استشارة عاجل مع دكتور خالد الديب:
• الاسم: ${name}
• الهاتف: ${phone}
• الحالة/الخدمة: ${service}`;

      const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      document.getElementById("bookingModal")?.close();
      modalForm.reset();
    });
  }
}
