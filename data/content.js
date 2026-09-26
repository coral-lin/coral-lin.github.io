window.siteContent = {
  locale: 'zh-Hant',
  texts: {
    'zh-Hant': {
      meta: {
        title: '個人履歷',
        description: '個人履歷網站，包含自我介紹、職涯軸、技能與作品的靜態展示。'
      },
      intro: {
        badge: '網管工程師',
        name: 'Coral Lin',
        company: '信業科技股份有限公司',
        companyUrl: 'https://www.sinew.com.tw',
        summary: '電子與測試背景出發，持續往 Network／Infrastructure 發展的 IT 工作者'
      },
      coreLabel: '核心準則',
      focusPanelLabel: '目前重點',
      focus: [
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
      ],
      experience: [
        {
          year: '2004',
          role: '助理工程師',
          title: '助理工程師',
          company: '協X電機股份有限公司',
          description: '協尋供應商、處理訂貨與索樣、雕刻 PCB 電路，維護雕刻機台及其控制電腦，並負責樣品手焊維修與測試。',
          open: false
        },
        {
          year: '2010',
          role: '助理工程師',
          title: '助理工程師',
          company: '信業科技股份有限公司',
          description: '負責產品後端功能驗證測試、硬體測試、手焊電子產品、系統圖片繪製，以及首次採用零配件測試。',
          open: false
        },
        {
          year: '2025',
          role: '網管工程師',
          title: '網管工程師',
          company: '信業科技股份有限公司',
          description: '負責公司內部網路、伺服器、Firewall、Switch、VPN、AP 與 Mail Server 等基礎設備的維運與故障排查。\n監控 Linux Server、系統 Log、磁碟容量與備份狀態。\n處理使用者端連線與系統問題，確認現象後進行追蹤、修正與再驗證。\n同時協助既有系統與 PHP 應用程式的維護與優化。',
          open: true
        }
      ],
      skills: [
        {
          title: 'Network',
          description: 'TCP/IP、Firewall、Switch、VPN、Wireshark、Network Troubleshooting'
        },
        {
          title: 'Linux & Server',
          description: 'Linux、SSH、Server Monitoring、Log Analysis、Backup'
        },
        {
          title: 'Mail Server',
          description: 'SMTP、Postfix、Dovecot、Mail Troubleshooting'
        },
        {
          title: 'Hardware',
          description: 'Electronics、Hardware Troubleshooting、Circuit Diagram、Multimeter'
        },
        {
          title: 'Testing & QA',
          description: 'Gray-box Testing、Test Planning、Bug Reproduction、Problem Verification'
        },
        {
          title: 'Web & Full-Stack',
          description: 'HTML、CSS、JavaScript、React、Node.js、Express、REST API、SQLite'
        }
      ],
      learning: {
                  title:'目前正努力學習的方向',
                  lead: '我不一定一開始就知道答案，但我知道怎麼開始找。',
                  description: '目前正從既有的電子、RD 測試與 MIS 經驗出發，持續往 Network／Infrastructure 發展，同時學習 Full-Stack 技術，透過實際專案把學到的東西做出來、驗證，再留下可以重複使用的方法。'
                },
      modal: {
        triggerLabel: '聯絡我',
        title: '聯絡我 ',
        submitLabel: '送出',
        fields: [
          { label: '姓名', name: 'name', type: 'text', placeholder: '請輸入你的姓名', required: true },
          { label: '電子郵件', name: 'email', type: 'email', placeholder: '請輸入電子郵件', required: true },
          { label: '留言內容', name: 'message', type: 'textarea', placeholder: '請輸入你的需求或問題', required: true },
          {
            label: '聯絡事由',
            name: 'why',
            type: 'select',
            placeholder: '請選擇',
            required: true,
            options: ['工作機會', '網路／MIS 技術交流', '專案合作', '網站內容詢問', '其他']
          },
          ]
      },
      ui: {
        languageSwitcherLabel: '語言切換',
        portraitLabel: '個人照片',
        portraitAlt: 'Coral Lin 的頭像',
        diagramLabel: '三大圓形循環導向圖示',
        experienceTitle: '職涯經歷',
        experienceDescription: '點擊年份可展開詳細內容',
        skillsTitle: '技能分類',
        skillsDescription: '每張卡片對應一個方面的專業能力',
        contactSectionLabel: '聯絡區預留位置',
        modalCloseLabel: '關閉表單',
        footerRights: '保留所有權利。'
      },
      footer: {
        name: 'Coral Lin'
      }
    },
    en: {
      meta: {
        title: 'Resume',
        description: 'Personal resume website featuring introduction, career timeline, skills, and portfolio highlights.'
      },
      intro: {
        badge: 'Network & Infrastructure Engineer',
        name: 'Coral Lin',
        company: 'Sinew Technology Co., Ltd.',
        companyUrl: 'https://www.sinew.com.tw',
        summary: 'Focused on network, server, mail systems, and IT operations management with strong troubleshooting, monitoring, and system optimization skills.'
      },
      coreLabel: 'Core Principles',
      focusPanelLabel: 'Current Focus',
      focus: [
        {
          title: 'Clarify First',
          text: 'Observe the symptoms, confirm the conditions, and define the problem boundary before jumping to conclusions.',
          list: ['Observe', 'Confirm conditions', 'Define scope', 'Avoid assumptions']
        },
        {
          title: 'Act on It',
          text: 'Solve what you can, then research, ask for help, or find the right tools to move the issue forward.',
          list: ['Solve directly', 'Research tools', 'Ask for input', 'Push forward']
        },
        {
          title: 'Verify & Keep Notes',
          text: 'Do not stop after fixing the issue; verify the result and document the process for future cases.',
          list: ['Verify result', 'Keep methods', 'Create repeatable flow', 'Prepare for next issue']
        }
      ],
      experience: [
        {
          year: '2004',
          role: 'Assistant Engineer',
          title: 'Assistant Engineer',
          company: 'Cooperation X Electric Co., Ltd.',
          description: 'Sourced suppliers, managed ordering and sample requests, processed PCB circuit fabrication, maintained engraving machines and their control computers, and handled sample soldering repairs and testing.',
          open: false
        },
        {
          year: '2010',
          role: 'Assistant Engineer',
          title: 'Assistant Engineer',
          company: 'Sinew Technology Co., Ltd.',
          description: 'Responsible for backend functional verification testing, hardware testing, hand-soldering of electronic products, system image preparation, and first-use component testing.',
          open: false
        },
        {
          year: '2025',
          role: 'Network Administrator',
          title: 'Network Administrator',
          company: 'Sinew Technology Co., Ltd.',
          description: 'Managed internal network, server, firewall, switch, VPN, AP, and Mail Server operations.\nMonitored Linux servers, system logs, disk usage, and backup status.\nResolved user-side connectivity and system issues through investigation, fix, and re-verification.\nSupported maintenance and optimization of existing systems and PHP applications.',
          open: true
        }
      ],
      skills: [
        {
          title: 'Network',
          description: 'TCP/IP, Firewall, Switch, VPN, Wireshark, Network Troubleshooting'
        },
        {
          title: 'Linux & Server',
          description: 'Linux, SSH, Server Monitoring, Log Analysis, Backup'
        },
        {
          title: 'Mail Server',
          description: 'SMTP, Postfix, Dovecot, Mail Troubleshooting'
        },
        {
          title: 'Hardware',
          description: 'Electronics, Hardware Troubleshooting, Circuit Diagram, Multimeter'
        },
        {
          title: 'Testing & QA',
          description: 'Gray-box Testing, Test Planning, Bug Reproduction, Problem Verification'
        },
        {
          title: 'Web & Full-Stack',
          description: 'HTML, CSS, JavaScript, React, Node.js, Express, REST API, SQLite'
        }
      ],
      learning: {
      title: 'Where I’m Heading',
      lead: 'I may not always know the answer at the start, but I know how to begin looking for it.',
      description: 'Building on my background in electronics, RD testing, and MIS, I am continuing to develop toward Network / Infrastructure while also learning Full-Stack technologies. I use practical projects to turn what I learn into working results, verify them, and document reusable methods.'
      },
      modal: {
        triggerLabel: 'Contact Me',
        title: 'Contact / Collaboration',
        submitLabel: 'Submit',
        fields: [
          { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name', required: true },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
          { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Tell us about your project or request', required: true },
          {
            label: 'Reason for Contact',
            name: 'why',
            type: 'select',
            placeholder: 'Please select',
            required: true,
            options: ['Job Opportunities', 'Network / MIS Technical Exchange', 'Project Collaboration', 'Website Content Inquiry', 'Other']
          },
        ]
      },
      ui: {
        languageSwitcherLabel: 'Language switcher',
        portraitLabel: 'Profile photo',
        portraitAlt: 'Portrait of Coral Lin',
        diagramLabel: 'Three-part circular workflow diagram',
        experienceTitle: 'Career Timeline',
        experienceDescription: 'Select a year to view the details.',
        skillsTitle: 'Skills',
        skillsDescription: 'Each card represents an area of professional expertise.',
        contactSectionLabel: 'Contact section placeholder',
        modalCloseLabel: 'Close form',
        footerRights: 'All rights reserved.'
      },
      footer: {
        name: 'Coral Lin'
      }
    },
    ja: {
      meta: {
        title: '職務経歴書',
        description: '自己紹介、経歴、スキル、ポートフォリオを紹介する個人履歴サイトです。'
      },
      intro: {
        badge: 'ネットワーク＆インフラエンジニア',
        name: 'Coral Lin',
        company: '信業科技株式会社',
        companyUrl: 'https://www.sinew.com.tw',
        summary: 'ネットワーク、サーバー、メールシステム、IT運用管理に注力し、障害対応、監視、システム最適化の実務を持っています。'
      },
      coreLabel: '基本方針',
      focusPanelLabel: '現在の重点',
      focus: [
        {
          title: 'まず整理',
          text: '現象を見て、条件を確認し、問題の範囲を明確にしてから結論を急ぎません。',
          list: ['現象を見る', '条件を確認', '範囲を特定', '結論を急がない']
        },
        {
          title: '対応する',
          text: '自分でできることは先に対応し、わからない時は資料や人に聞いて、問題を前に進めます。',
          list: ['自分で対応', '資料を調べる', '人に相談', '前進させる']
        },
        {
          title: '検証して残す',
          text: '修正した後に結果を再確認し、解決策を記録して次回に活かします。',
          list: ['結果を確認', '方法を残す', '再現可能な流れを作る', '次の課題に備える']
        }
      ],
      experience: [
        {
          year: '2004',
          role: 'アシスタントエンジニア',
          title: 'アシスタントエンジニア',
          company: '協X電機株式会社',
          description: 'サプライヤーの探索、発注・サンプル依頼の対応、PCB回路の加工、 engraving 機器と制御用コンピューターの保守、サンプルのはんだ付け修理およびテストを担当しました。',
          open: false
        },
        {
          year: '2010',
          role: 'アシスタントエンジニア',
          title: 'アシスタントエンジニア',
          company: '信業科技株式会社',
          description: '製品のバックエンド機能検証テスト、ハードウェアテスト、電子機器の手はんだ作業、システム画像作成、初採用部品のテストを担当しました。',
          open: false
        },
        {
          year: '2025',
          role: 'ネットワーク管理者',
          title: 'ネットワーク管理者',
          company: '信業科技株式会社',
          description: '社内のネットワーク、サーバー、Firewall、Switch、VPN、AP、Mail Server などの基盤設備を保守し、障害対応を行いました。\nLinux Server、システムログ、ディスク容量、バックアップ状況を監視しました。\n利用者側の接続やシステム障害を確認し、調査・修正・再検証を実施しました。\n既存システムと PHP アプリケーションの保守・改善にも携わっています。',
          open: true
        }
      ],
      skills: [
        {
          title: 'Network',
          description: 'TCP/IP、Firewall、Switch、VPN、Wireshark、ネットワーク障害対応'
        },
        {
          title: 'Linux & Server',
          description: 'Linux、SSH、サーバー監視、ログ分析、バックアップ'
        },
        {
          title: 'Mail Server',
          description: 'SMTP、Postfix、Dovecot、メール障害対応'
        },
        {
          title: 'Hardware',
          description: '電子回路、ハードウェア障害対応、回路図、マルチメータ'
        },
        {
          title: 'Testing & QA',
          description: 'グレーボックステスト、テスト計画、再現確認、問題検証'
        },
        {
          title: 'Web & Full-Stack',
          description: 'HTML、CSS、JavaScript、React、Node.js、Express、REST API、SQLite'
        }
      ],
      learning: {
       title: '現在の学習方針',
       lead: '最初から答えが分かっているとは限りません。でも、どうやって探し始めるかは分かっています。',
       description: 'これまでの電子技術、RDテスト、MISの経験を基盤に、Network / Infrastructure の分野へ継続して取り組みながら、Full-Stack 技術も学んでいます。実際のプロジェクトを通して、学んだことを形にし、検証し、繰り返し使える方法として残していくことを大切にしています。'
      },
      modal: {
        triggerLabel: 'お問い合わせ',
        title: 'お問い合わせ / ご相談',
        submitLabel: '送信',
        fields: [
          { label: '氏名', name: 'name', type: 'text', placeholder: 'お名前を入力してください', required: true },
          { label: 'メールアドレス', name: 'email', type: 'email', placeholder: 'メールアドレスを入力してください', required: true },
          { label: 'メッセージ', name: 'message', type: 'textarea', placeholder: 'ご要望やご質問を入力してください', required: true },
          {
            label: 'お問い合わせ内容',
            name: 'why',
            type: 'select',
            placeholder: '選択してください',
            required: true,
            options: ['仕事の機会', 'ネットワーク／MIS 技術交流', 'プロジェクト協力', 'サイト内容についてのお問い合わせ', 'その他']
          },
        ]
      },
      ui: {
        languageSwitcherLabel: '言語切替',
        portraitLabel: 'プロフィール写真',
        portraitAlt: 'Coral Lin のプロフィール写真',
        diagramLabel: '3つの円で構成された仕事の進め方の図',
        experienceTitle: '職務経歴',
        experienceDescription: '年をクリックすると詳細を確認できます。',
        skillsTitle: 'スキル',
        skillsDescription: '各カードは専門スキルの領域を表しています。',
        contactSectionLabel: 'お問い合わせセクションのプレースホルダー',
        modalCloseLabel: 'フォームを閉じる',
        footerRights: 'All rights reserved.'
      },
      footer: {
        name: 'Coral Lin'
      }
    }
  }
};
