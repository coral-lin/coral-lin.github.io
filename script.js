document.addEventListener('DOMContentLoaded', () => {
  // 前端只負責顯示與互動，不直接碰資料庫。
  // 真正的資料來源會透過 API 回傳，這裡先用假資料 API 取代。
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const browserLocale = navigator.language || navigator.languages?.[0] || 'zh-Hant';
  const supportedLocales = Object.keys(window.siteContent?.texts || {});
  const preferredLocale = supportedLocales.includes(browserLocale)
    ? browserLocale
    : supportedLocales.includes('zh-Hant')
      ? 'zh-Hant'
      : supportedLocales[0];

  let currentLocale = preferredLocale;
  let content = window.siteContent?.texts?.[currentLocale] || window.siteContent?.texts?.['zh-Hant'];

  const panel = document.querySelector('.detail-panel');
  const panelTitle = document.getElementById('panel-title');
  const panelText = document.getElementById('panel-text');
  const panelList = document.getElementById('panel-list');
  const panelLabel = document.getElementById('panel-label');
  const diagramCenterTitle = document.querySelector('[data-role="core-value"]');
  const diagramCoreLabel = document.querySelector('[data-role="core-label"]');
  const segments = document.querySelectorAll('.segment-arc');
  const focusLabels = document.querySelectorAll('[data-role="label"]');
  const contactApiUrl = 'https://script.google.com/macros/s/AKfycbwDIv72NvyRqUI8Szu-lcW8AC2xUBh2T2A9gv_ZBnkBRKU34QHX7nlBEfPFA0NYUPA/exec';
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const fallbackFocusItems = window.siteContent?.texts?.['zh-Hant']?.focus || [
    {
      title: '先搞清楚',
      text: '先看現象、確認條件、找出問題範圍，不急著下結論，先把「到底發生什麼事」弄清楚。',
      list: ['看現象', '確認條件', '找出問題範圍', '不急著下結論']
    },
    {
      title: '去處理',
      text: '自己能處理就處理，不會就查資料、問人、找工具，重點是知道怎麼把問題往前推。',
      list: ['先自行處理', '查資料與工具', '問人或參考案例', '往前推進問題']
    },
    {
      title: '驗證／留下',
      text: '處理完不是就算結束，而是重新確認結果；如果問題解決，就把過程留下來，讓下一次遇到類似問題時不用從零開始。',
      list: ['重新確認結果', '保留處理方式', '建立可重複流程', '解決後再遇下一題']
    }
  ];

  function renderIntro() {
    const introContainer = document.getElementById('intro-content');
    if (!introContainer || !content?.intro) return;

    introContainer.innerHTML = `
      <span class="eyebrow">${escapeHtml(content.intro.badge)}</span>
      <h1>${escapeHtml(content.intro.name)}</h1>
      <a
        class="eyebrow company-link"
        href="${escapeHtml(content.intro.companyUrl)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="前往${escapeHtml(content.intro.company)}官網"
      >
        ${escapeHtml(content.intro.company)}
      </a>
      <p>${escapeHtml(content.intro.summary || '')}</p>
    `;
  }

  function renderStaticContent() {
    const ui = content?.ui;
    if (!ui) return;

    const textTargets = [
      [document.querySelector('#experience .section-header h2'), ui.experienceTitle],
      [document.querySelector('#experience .section-header p'), ui.experienceDescription],
      [document.querySelector('#skills .section-header h2'), ui.skillsTitle],
      [document.querySelector('#skills .section-header p'), ui.skillsDescription],
      [document.getElementById('footer-rights'), ui.footerRights]
    ];

    textTargets.forEach(([element, text]) => {
      if (element && text) element.textContent = text;
    });

    const languageSwitcher = document.querySelector('.lang-switcher');
    const portraitCard = document.querySelector('.portrait-card');
    const portraitImage = document.querySelector('.portrait-image');
    const diagramShell = document.querySelector('.diagram-shell');
    const contactSection = document.getElementById('contact');
    const modalCloseButton = document.querySelector('.modal-close');

    if (languageSwitcher) languageSwitcher.setAttribute('aria-label', ui.languageSwitcherLabel);
    if (portraitCard) portraitCard.setAttribute('aria-label', ui.portraitLabel);
    if (portraitImage) portraitImage.setAttribute('alt', ui.portraitAlt);
    if (diagramShell) diagramShell.setAttribute('aria-label', ui.diagramLabel);
    if (contactSection) contactSection.setAttribute('aria-label', ui.contactSectionLabel);
    if (modalCloseButton) modalCloseButton.setAttribute('aria-label', ui.modalCloseLabel);
  }

  function updatePageMeta(localeKey) {
    const pageMeta = window.siteContent?.texts?.[localeKey]?.meta;
    const titleTag = document.querySelector('title');
    const descriptionTag = document.querySelector('meta[name="description"]');

    if (titleTag && pageMeta?.title) {
      titleTag.textContent = pageMeta.title;
    }

    if (descriptionTag && pageMeta?.description) {
      descriptionTag.setAttribute('content', pageMeta.description);
    }
  }

  function setLanguage(locale) {
    const localeKey = supportedLocales.includes(locale) ? locale : 'zh-Hant';
    currentLocale = localeKey;
    content = window.siteContent?.texts?.[localeKey] || window.siteContent?.texts?.['zh-Hant'];

    document.documentElement.lang = localeKey === 'en' ? 'en' : localeKey === 'ja' ? 'ja' : 'zh-Hant';
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === localeKey);
    });

    updatePageMeta(localeKey);
    renderStaticContent();
    renderIntro();
    renderExperience();
    renderSkills();
    renderContactForm();
    renderFloatingContactButton();
    renderFooter();
    applyLocaleContent(localeKey);
    hidePanel();
  }

  function renderExperience() {
    const container = document.getElementById('experience-list');
    if (!container || !content?.experience) return;

    container.innerHTML = content.experience
      .map((item, index) => {
        const isLastItem = index === content.experience.length - 1;
        const shouldOpen = typeof item.open === 'boolean' ? item.open : isLastItem;
        const isOpen = shouldOpen ? 'open' : '';
        const featuredClass = isLastItem ? 'timeline-item featured' : 'timeline-item';

        const highlightTag = isLastItem ? '<span class="highlight-tag">目前職務</span>' : '';

        return `
          <details class="${featuredClass}" ${isOpen}>
            <summary>
              <span class="dot"></span>
              <span class="year">${escapeHtml(item.year)}</span>
              <span class="role">${escapeHtml(item.role)}</span>
            </summary>
            <div class="timeline-body">
              ${highlightTag}
              <h3>${escapeHtml(item.title)}</h3>
              <h4>${escapeHtml(item.company)}</h4>
              <p>${escapeHtml(item.description)}</p>
            </div>
          </details>
        `;
      })
      .join('');
  }

  function renderSkills() {
    const container = document.getElementById('skills-grid');
    if (!container || !content?.skills) return;

    container.innerHTML = content.skills
      .map(
        (item) => `
          <article class="skill-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </article>
        `
      )
      .join('');
  }

  function renderContactForm() {
    const titleEl = document.getElementById('contact-title');
    const fieldsContainer = document.getElementById('contact-fields');
    const submitButton = document.getElementById('contact-submit');
    if (!titleEl || !fieldsContainer || !submitButton || !content?.modal) return;

    titleEl.textContent = content.modal.title;
    submitButton.textContent = content.modal.submitLabel;

    fieldsContainer.innerHTML = content.modal.fields
      .map((field) => {
        if (field.type === 'textarea') {
          return `
            <label>
              ${escapeHtml(field.label)}
              <textarea name="${escapeHtml(field.name)}" autocomplete="off" rows="5" placeholder="${escapeHtml(field.placeholder)}" ${field.required ? 'required' : ''}></textarea>
            </label>
         `;
        }

        if (field.type === 'select') {
          return `
            <label>
              ${escapeHtml(field.label)}
              <select name="${escapeHtml(field.name)}" ${field.required ? 'required' : ''}>
                <option value="" selected disabled>${escapeHtml(field.placeholder)}</option>
                ${(field.options || []).map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join('')}
              </select>
            </label>
          `;
        }

        return `
         <label>
            ${escapeHtml(field.label)}
            <input type="${escapeHtml(field.type)}" name="${escapeHtml(field.name)}" autocomplete="${field.name === 'name' ? 'name' : field.name === 'email' ? 'email' : 'off'}" placeholder="${escapeHtml(field.placeholder)}" ${field.required ? 'required' : ''} />
         </label>
       `;
      })
      .join('');
  }

  function renderFloatingContactButton() {
    const floatingContactButton = document.querySelector('.floating-contact-button');
    const floatingContactText = document.querySelector('.floating-contact-text');
    const label = content?.modal?.triggerLabel;

    if (!floatingContactButton || !floatingContactText || !label) return;

    floatingContactText.textContent = label;
    floatingContactButton.setAttribute('aria-label', label);
  }

  function renderFooter() {
    const footerName = document.getElementById('footer-name');
    if (footerName && content?.footer) {
      footerName.textContent = content.footer.name;
    }
  }

  function applyLocaleContent(locale) {
    const localeKey = window.siteContent?.texts?.[locale] ? locale : 'zh-Hant';
    const pageContent = window.siteContent?.texts?.[localeKey];

    if (!pageContent) return;

    if (diagramCoreLabel) {
      diagramCoreLabel.textContent = pageContent.coreLabel;
    }

    if (panelLabel) {
      panelLabel.textContent = pageContent.focusPanelLabel || 'Current Focus';
    }

    pageContent.focus.forEach((item, index) => {
      const segment = segments[index];
      const label = focusLabels[index];
      if (!segment || !label) return;

      segment.dataset.title = item.title;
      segment.dataset.text = item.text;
      segment.dataset.list = item.list.join(',');
      label.textContent = item.title;
    });
  }

  function applyFocusItems(items) {
    segments.forEach((segment, index) => {
      const item = items[index];
      if (!item) return;

      segment.dataset.title = item.title;
      segment.dataset.text = item.text;
      segment.dataset.list = item.list.join(',');
    });

    hidePanel();
  }

  // 先從假資料 API 取得 focus 區塊內容；若當前是直接開啟檔案或後端未啟動，則改用本地預設資料。
  async function loadFocusData() {
    const isFileProtocol = window.location.protocol === 'file:';

    if (isFileProtocol) {
      applyFocusItems(fallbackFocusItems);
      }
      return;
    }
  applyFocusItems(fallbackFocusItems);

  function setFocusState(activeSegment) {
    segments.forEach((item) => {
      const isCurrent = item === activeSegment;
      item.classList.toggle('is-active', isCurrent);
      item.classList.toggle('is-dimmed', Boolean(activeSegment) && !isCurrent);
    });

    if (diagramCenterTitle) {
      const nextTitle = activeSegment ? (activeSegment.dataset.title || '') : '';
      diagramCenterTitle.textContent = nextTitle;
      diagramCenterTitle.parentElement?.classList.toggle('is-visible', Boolean(activeSegment));
    }
  }

  function updatePanel(segment) {
    if (!segment) return;

    const title = segment.dataset.title || '';
    const text = segment.dataset.text || '內容說明';
    const list = (segment.dataset.list || '').split(',').map((item) => item.trim()).filter(Boolean);

    if (panelTitle) panelTitle.textContent = title;
    if (panelText) panelText.textContent = text;
    if (panelList) {
      panelList.replaceChildren();
      list.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        panelList.appendChild(li);
      });
    }
    if (diagramCenterTitle) {
      diagramCenterTitle.textContent = title || '';
      diagramCenterTitle.parentElement?.classList.toggle('is-visible', Boolean(title));
    }
    if (panel) panel.classList.add('visible');
  }

  function hidePanel() {
    if (panel) panel.classList.remove('visible');
    if (diagramCenterTitle) {
      diagramCenterTitle.textContent = '';
      diagramCenterTitle.parentElement?.classList.remove('is-visible');
    }
  }

  segments.forEach((segment) => {
    segment.addEventListener('mouseenter', () => {
      setFocusState(segment);
      updatePanel(segment);
    });

    segment.addEventListener('focus', () => {
      setFocusState(segment);
      updatePanel(segment);
    });

    segment.addEventListener('mouseleave', () => {
      if (document.activeElement !== segment) {
        setFocusState(null);
        hidePanel();
      }
    });

    segment.addEventListener('blur', () => {
      setFocusState(null);
      hidePanel();
    });

    segment.setAttribute('tabindex', '0');
  });

  // ===== 聯絡表單 modal 互動 =====
  // 這段是最簡版的前端表單：點擊按鈕後開啟 modal，提交時送出 JSON 到後端 API。
  const modal = document.getElementById('contact-modal');
  const openButtons = document.querySelectorAll('.contact-trigger, .floating-contact-button');
  const closeButton = document.querySelector('.modal-close');
  const backdrop = document.querySelector('.modal-backdrop');
  const contactForm = document.getElementById('contact-form');

  function openModal() {
    if (modal) {
      modal.classList.add('is-open');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('is-open');
    }
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', openModal);
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // 提交表單時先做前端基本驗證，之後再發送到後端 API。
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const payload = {
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        message: String(formData.get('message') || '').trim(),
        reason: String(formData.get('why') || '').trim()
      };

      const sanitizedName = payload.name.replace(/[<>]/g, '').slice(0, 100);
      const sanitizedEmail = payload.email.replace(/[<>]/g, '').slice(0, 254);
      const sanitizedMessage = payload.message.replace(/[<>]/g, '').slice(0, 1000);
      const sanitizedReason = payload.reason.replace(/[<>]/g, '').slice(0, 100);

      if (!sanitizedName || !sanitizedEmail || !sanitizedMessage || !sanitizedReason) {
        alert('請完整填寫姓名、電子郵件與訊息內容。');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(sanitizedEmail)) {
        alert('請輸入有效的電子郵件格式。');
        return;
      }

      const safePayload = {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        reason: sanitizedReason
      };

      try {
        const formData = new FormData();
              formData.append('name', sanitizedName);
              formData.append('email', sanitizedEmail);
              formData.append('reason', sanitizedReason);
              formData.append('message', sanitizedMessage);

        const tempForm = document.createElement('form');
              tempForm.method = 'POST';
              tempForm.action = contactApiUrl;
              tempForm.target = '_self';
              tempForm.style.display = 'none';

         formData.forEach((value, key) => {
           const input = document.createElement('input');
                 input.type = 'hidden';
                 input.name = key;
                 input.value = value;
                  tempForm.appendChild(input);
  });

  document.body.appendChild(tempForm);
  tempForm.submit();
  tempForm.remove();

  alert('感謝你的訊息，我們已收到。');
  contactForm.reset();
  closeModal();
} catch (error) {
  console.error('送出表單時發生錯誤：', error);
  alert('表單送出失敗，請稍後再試。');
}
    });
  }

  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });

  updatePageMeta(currentLocale);
  renderStaticContent();
  renderIntro();
  renderExperience();
  renderSkills();
  renderContactForm();
  renderFloatingContactButton();
  renderFooter();

  // 先載入 API data，再套用本地語系內容，最後還原初始狀態。
  applyLocaleContent(currentLocale);
  loadFocusData();
  setFocusState(null);
});
