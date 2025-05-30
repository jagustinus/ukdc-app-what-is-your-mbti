export type Answer = {
  answer_yes: string;
  answer_no: string;
};

export interface IQuestionWithAnswer {
  question: string;
  answer: Answer;
}

export interface IRecommendation {
  recommendations: string[];
}

export interface IListQuestions {
  dimension: string;
  questions: IQuestionWithAnswer[];
}

export interface IQuestionsAndRecommendations {
  questions: IListQuestions[];
  recommendations: IRecommendation;
}

export const load = () => {
  const EIQuestionsWithAnswers: IQuestionWithAnswer[] = [
    {
      question: 'Kamu lebih suka rame-rame sama orang lain atau mending sendiri?',
      answer: {
        answer_yes: 'Nongkrong bareng orang itu seru banget',
        answer_no: 'Sendirian lebih nyaman dan tenang'
      }
    },
    {
      question: 'Setelah nongkrong, kamu malah makin semangat atau capek?',
      answer: {
        answer_yes: 'Nongkrong bikin saya makin hidup',
        answer_no: 'Habis sosialisasi malah butuh istirahat'
      }
    },
    {
      question: 'Kamu sering ngomong dulu baru mikir belakangan?',
      answer: {
        answer_yes: 'Iya, suka blak-blakan dulu',
        answer_no: 'Mikir dulu baru ngomong'
      }
    },
    {
      question: 'Ketemu orang baru itu seru atau melelahkan buat kamu?',
      answer: {
        answer_yes: 'Ketemu orang baru itu asik',
        answer_no: 'Capek kalau harus basa-basi'
      }
    },
    {
      question: 'Kerja bareng orang lain lebih asik daripada kerja sendirian gak?',
      answer: {
        answer_yes: 'Teamwork itu seru banget',
        answer_no: 'Mending kerja sendiri, lebih fokus'
      }
    },
    {
      question: 'Kamu pede gak sih ngomong di depan banyak orang?',
      answer: {
        answer_yes: 'Pede banget, suka tampil',
        answer_no: 'Deg-degan parah, gak nyaman'
      }
    },
    {
      question: 'Kamu suka jadi pusat perhatian atau mending lowkey aja?',
      answer: {
        answer_yes: 'Suka disorot dan diperhatikan',
        answer_no: 'Mending jadi background aja'
      }
    },
    {
      question: 'Habis bersosialisasi, kamu butuh waktu sendiri buat recharge gak?',
      answer: {
        answer_yes: 'Gak juga, makin semangat malah',
        answer_no: 'Iya, butuh waktu buat sendiri'
      }
    },
    {
      question: 'Kamu biasanya mikir dulu baru ngomong, atau langsung aja?',
      answer: {
        answer_yes: 'Langsung aja, spontan',
        answer_no: 'Mikir dulu, baru buka suara'
      }
    },
    {
      question: 'Nongkrong lama-lama bikin kamu capek gak sih?',
      answer: {
        answer_yes: 'Enggak, makin betah',
        answer_no: 'Iya, cepat lelah kalau terlalu lama'
      }
    },
    {
      question: 'Kamu lebih suka ngobrol mendalam berdua daripada rame-rame?',
      answer: {
        answer_yes: 'Mending ngobrol berdua yang dalem',
        answer_no: 'Ngobrol rame-rame itu lebih seru'
      }
    },
    {
      question: 'Kamu sering mikir panjang dulu sebelum ngelakuin sesuatu gak?',
      answer: {
        answer_yes: 'Iya, harus mikir dulu',
        answer_no: 'Enggak, jalanin aja dulu'
      }
    }
  ];

  const listExtrovertQuestions: IListQuestions = {
    dimension: 'e',
    questions: randomQuestion(EIQuestionsWithAnswers, 0, 6)
  };

  const listIntrovertQuestions: IListQuestions = {
    dimension: 'i',
    questions: randomQuestion(EIQuestionsWithAnswers, 6, EIQuestionsWithAnswers.length - 1)
  };

  const SNQuestionsWithAnswers: IQuestionWithAnswer[] = [
    {
      question: 'Kamu lebih suka fakta nyata daripada teori-teori gak jelas?',
      answer: {
        answer_yes: 'Fakta dan bukti lebih meyakinkan',
        answer_no: 'Suka mikir ide dan kemungkinan'
      }
    },
    {
      question: 'Pengalaman nyata lebih kamu percaya daripada ide-ide abstrak?',
      answer: {
        answer_yes: 'Bukti nyata itu no debat',
        answer_no: 'Imajinasi dan ide itu penting banget'
      }
    },
    {
      question: 'Kamu lebih fokus ke sekarang atau mikir masa depan mulu?',
      answer: {
        answer_yes: 'Fokus sama yang sekarang aja',
        answer_no: 'Sering mikir jauh ke depan'
      }
    },
    {
      question: 'Kamu suka dikasih petunjuk jelas atau mending coba-coba sendiri?',
      answer: {
        answer_yes: 'Mending dikasih langkah-langkah',
        answer_no: 'Suka eksplor sendiri, lebih menantang'
      }
    },
    {
      question: 'Kamu orangnya realistis atau imajinatif?',
      answer: {
        answer_yes: 'Realistis, yang penting bisa dilakuin',
        answer_no: 'Imajinatif, suka ngide'
      }
    },
    {
      question: 'Kamu lebih percaya cara yang udah terbukti daripada nyobain hal baru?',
      answer: {
        answer_yes: 'Jalan aman aja, yang udah pasti',
        answer_no: 'Coba hal baru seru, gak takut gagal'
      }
    },
    {
      question: 'Kamu mikir tradisi itu penting dan layak dijaga gak?',
      answer: {
        answer_yes: 'Tradisi itu harus dijaga',
        answer_no: 'Tradisi boleh diubah, biar gak bosan'
      }
    },
    {
      question: 'Kamu suka mikir hal-hal “what if” dan kemungkinan di masa depan?',
      answer: {
        answer_yes: 'Jarang mikir terlalu jauh',
        answer_no: 'Sering banget mikir "gimana kalau"'
      }
    },
    {
      question: 'Kamu sering nemu pola tersembunyi yang orang lain gak sadar?',
      answer: {
        answer_yes: 'Jarang, lebih fokus ke yang kelihatan',
        answer_no: 'Iya, suka ngeliat pola-pola kecil'
      }
    },
    {
      question: 'Kamu suka ngebayangin masa depan dan segala kemungkinannya?',
      answer: {
        answer_yes: 'Lebih mikir sekarang aja',
        answer_no: 'Masa depan tuh bikin penasaran'
      }
    },
    {
      question: 'Diskusi soal konsep rumit dan abstrak tuh seru atau pusing?',
      answer: {
        answer_yes: 'Pusing, mending bahas hal nyata',
        answer_no: 'Seru, suka mikir yang dalam-dalam'
      }
    },
    {
      question: 'Inovasi bikin kamu semangat atau malah ngeri?',
      answer: {
        answer_yes: 'Ngeri, takut gagal',
        answer_no: 'Semangat, pengen jadi pelopor'
      }
    }
  ];

  const listSensorQuestions: IListQuestions = {
    dimension: 's',
    questions: randomQuestion(SNQuestionsWithAnswers, 0, 6)
  };

  const listIntuitiveQuestions: IListQuestions = {
    dimension: 'n',
    questions: randomQuestion(SNQuestionsWithAnswers, 6, SNQuestionsWithAnswers.length - 1)
  };

  const TFQuestionsWithAnswers: IQuestionWithAnswer[] = [
    {
      question: 'Buat kamu, kebenaran lebih penting daripada menjaga perasaan orang?',
      answer: {
        answer_yes: 'Jujur itu wajib, meskipun nyakitin',
        answer_no: 'Yang penting gak nyakitin orang'
      }
    },
    {
      question: 'Pas ngambil keputusan, kamu lebih ngandelin logika atau perasaan?',
      answer: {
        answer_yes: 'Pake logika, biar objektif',
        answer_no: 'Pake perasaan, biar adil buat semua'
      }
    },
    {
      question: 'Kamu oke gak kalau dikritik asal membangun?',
      answer: {
        answer_yes: 'Oke, asal jelas tujuannya',
        answer_no: 'Sedikit baper, tapi ngerti maksudnya'
      }
    },
    {
      question: 'Kamu lebih suka mikir secara objektif atau mikirin perasaan orang juga?',
      answer: {
        answer_yes: 'Objektif dulu baru mikirin yang lain',
        answer_no: 'Perasaan orang itu penting dipikirin juga'
      }
    },
    {
      question: 'Kamu berani ngasih feedback jujur walau agak nyakitin?',
      answer: {
        answer_yes: 'Iya, biar cepet berkembang',
        answer_no: 'Gak tega, takut nyakitin'
      }
    },
    {
      question: 'Kamu ambil keputusan berdasarkan fakta atau perasaan?',
      answer: {
        answer_yes: 'Fakta no debat',
        answer_no: 'Perasaan kadang lebih bener'
      }
    },
    {
      question: 'Efisiensi lebih penting daripada kerja sama buat kamu?',
      answer: {
        answer_yes: 'Yang penting cepet dan beres',
        answer_no: 'Tim kompak lebih penting'
      }
    },
    {
      question: 'Kamu sering mikirin gimana keputusanmu bakal ngaruh ke orang lain gak?',
      answer: {
        answer_yes: 'Kadang sih',
        answer_no: 'Sering banget mikirin efek ke orang'
      }
    },
    {
      question: 'Kamu suka banget kalau ada yang apresiasi kamu secara personal?',
      answer: {
        answer_yes: 'Biasa aja',
        answer_no: 'Suka banget kalau diapresiasi'
      }
    },
    {
      question: 'Buat kamu, damai itu lebih penting daripada debat siapa yang bener?',
      answer: {
        answer_yes: 'Yang bener tetap harus disuarakan',
        answer_no: 'Damai lebih penting daripada ribut'
      }
    },
    {
      question: 'Kamu sering ngikutin kata hati gak pas milih sesuatu?',
      answer: {
        answer_yes: 'Jarang, harus logis',
        answer_no: 'Iya, hati gak pernah bohong'
      }
    },
    {
      question: 'Kamu gampang tergerak kalau lihat orang lagi susah?',
      answer: {
        answer_yes: 'Kadang aja',
        answer_no: 'Banget, langsung pengen bantu'
      }
    }
  ];

  const listThinkerQuestions: IListQuestions = {
    dimension: 't',
    questions: randomQuestion(TFQuestionsWithAnswers, 0, 6)
  };

  const listFeelerQuestions: IListQuestions = {
    dimension: 'f',
    questions: randomQuestion(TFQuestionsWithAnswers, 6, TFQuestionsWithAnswers.length - 1)
  };

  const JPQuestionsWithAnswers: IQuestionWithAnswer[] = [
    {
      question: 'Kamu lebih suka punya rencana jelas atau go with the flow aja?',
      answer: {
        answer_yes: 'Harus terencana dong',
        answer_no: 'Santai aja, ngikut arus'
      }
    },
    {
      question: 'Kamu ngerasa gak nyaman kalau ada hal yang belum kelar?',
      answer: {
        answer_yes: 'Gak tenang kalau belum kelar',
        answer_no: 'Biasa aja, bisa nanti'
      }
    },
    {
      question: 'Kamu ngerjain satu hal sampe tuntas dulu baru pindah ke yang lain?',
      answer: {
        answer_yes: 'Harus selesai satu dulu',
        answer_no: 'Bisa lompat-lompat, gak masalah'
      }
    },
    {
      question: 'Kamu suka punya rutinitas harian atau anti banget sama itu?',
      answer: {
        answer_yes: 'Suka, biar teratur',
        answer_no: 'Bosan kalau terlalu gitu-gitu aja'
      }
    },
    {
      question: 'Kamu suka bikin to-do list dan jadwal harian gak?',
      answer: {
        answer_yes: 'Sering banget',
        answer_no: 'Jarang banget'
      }
    },
    {
      question: 'Kamu tipe yang dateng lebih awal atau suka molor?',
      answer: {
        answer_yes: 'Biasanya udah siap lebih awal',
        answer_no: 'Sering ngaret dikit sih'
      }
    },
    {
      question: 'Rencana berubah tiba-tiba tuh bikin kamu stress gak?',
      answer: {
        answer_yes: 'Iya, gak suka dadakan',
        answer_no: 'Enggak, fleksibel aja'
      }
    },
    {
      question: 'Kamu lebih suka semua opsi tetap terbuka atau cepet ambil keputusan?',
      answer: {
        answer_yes: 'Lebih suka ambil keputusan cepet',
        answer_no: 'Pilihan tetap terbuka lebih nyaman'
      }
    },
    {
      question: 'Kamu enjoy gak sih sama perubahan dan hal baru?',
      answer: {
        answer_yes: 'Agak susah adaptasi',
        answer_no: 'Suka tantangan baru'
      }
    },
    {
      question: 'Deadline menurut kamu itu patokan keras atau bisa fleksibel?',
      answer: {
        answer_yes: 'Keras, harus tepat waktu',
        answer_no: 'Fleksibel, bisa diatur'
      }
    },
    {
      question: 'Rutinitas itu ngebantu atau malah bikin kamu bosen?',
      answer: {
        answer_yes: 'Ngebantu banget',
        answer_no: 'Bosen, pengen hal baru'
      }
    },
    {
      question: 'Kamu lebih nyaman kerja fleksibel atau terstruktur?',
      answer: {
        answer_yes: 'Terstruktur dong',
        answer_no: 'Fleksibel lebih asik'
      }
    }
  ];

  const listJudgerQuestions = {
    dimension: 'j',
    questions: randomQuestion(JPQuestionsWithAnswers, 0, 6)
  };

  const listPerceiverQuestions = {
    dimension: 'p',
    questions: randomQuestion(JPQuestionsWithAnswers, 6, JPQuestionsWithAnswers.length - 1)
  };

  const listQuestions = [
    listExtrovertQuestions,
    listIntrovertQuestions,
    listSensorQuestions,
    listIntuitiveQuestions,
    listThinkerQuestions,
    listFeelerQuestions,
    listJudgerQuestions,
    listPerceiverQuestions
  ];

  return {
    questions: listQuestions,
    recommendations: {
      intj: ['Artificial Intelligence', 'Data Science', 'Algorithms', 'Systems Architecture'],
      intp: [
        'Theoretical Computer Science',
        'Research',
        'Programming Language Design',
        'Machine Learning'
      ],
      entj: [
        'IT Project Management',
        'Enterprise Architecture',
        'Systems Analysis',
        'Business Intelligence'
      ],
      entp: [
        'Innovation Research',
        'Technology Entrepreneurship',
        'Systems Design',
        'Emerging Technologies'
      ],
      infj: ['Digital Ethics', 'Information Science', 'UX Research', 'Educational Technology'],
      infp: ['UI/UX design', 'Human-Computer Interaction', 'Game Development', 'Digital media'],
      enfj: [
        'Information Systems Management',
        'Technology Training',
        'Digital Marketing',
        'Knowledge Management'
      ],
      enfp: [
        'Creative Technology',
        'Digital Content Creation',
        'User Experience',
        'Interactive Media'
      ],
      istj: ['Cybersecurity', 'Database Administration', 'Software QA', 'Systems Administration'],
      isfj: ['Data Management', 'IT Support', 'Technical Documentation', 'Digital Librarianship'],
      estj: [
        'IT Operations Management',
        'Information Systems Security',
        'Enterprise Systems',
        'Technical Project Management'
      ],
      esfj: [
        'Customer Relationship Management Systems',
        'IT Service Management',
        'Technical Account Management',
        'Digital Communication'
      ],
      istp: ['Network Engineering', 'Hardware Development', 'Penetration Testing', 'Robotics'],
      isfp: ['Digital Design', 'Web Development', 'Multimedia', 'Mobile App Development'],
      estp: [
        'Technical Sales',
        'Technology Implementation',
        'IT Consultancy',
        'Systems Integration'
      ],
      esfp: [
        'Technology Demonstration',
        'Technical Support',
        'Social Media Technology',
        'Digital Marketing Systems'
      ]
    }
  };
};

const randomQuestion = (
  questions: IQuestionWithAnswer[],
  startSlice = 0,
  endSlice = 0
): IQuestionWithAnswer[] => {
  const questionsAfterSlice = questions.slice(startSlice, endSlice);
  // Fisher-Yates shuffle algorithm to randomize array
  const shuffled = [...questionsAfterSlice];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
