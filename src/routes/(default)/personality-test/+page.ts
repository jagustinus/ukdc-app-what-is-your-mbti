export const load = () => {
	const ei_questions = [
		'Apakah Anda umumnya lebih suka berada di sekitar orang lain daripada sendirian?',
		'Apakah Anda merasa berenergi setelah menghadiri acara sosial?',
		'Apakah Anda cenderung berbicara sebelum memikirkan sesuatu dengan matang?',
		'Apakah Anda senang bertemu orang baru secara rutin?',
		'Apakah Anda lebih suka bekerja dalam kelompok daripada bekerja sendiri?',
		'Apakah Anda merasa nyaman berbicara di hadapan banyak orang atau kelompok besar?',
		'Apakah Anda suka menjadi pusat perhatian?',
		'Apakah Anda membutuhkan waktu sendiri untuk mengisi ulang energi setelah bersosialisasi?',
		'Apakah Anda lebih suka memikirkan ide terlebih dahulu sebelum membagikannya?',
		'Apakah Anda merasa lelah jika berada dalam situasi sosial dalam waktu lama?',
		'Apakah Anda lebih suka percakapan mendalam satu lawan satu daripada diskusi kelompok besar?',
		'Apakah Anda sering merenung secara internal sebelum bertindak?'
	];

	const list_e_questions = {
		dimension: 'e',
		questions: randomQuestion(ei_questions, 0, 6)
	};

	const list_i_questions = {
		dimension: 'i',
		questions: randomQuestion(ei_questions, 6, 12)
	};

	const sn_questions = [
		'Apakah Anda lebih tertarik pada fakta dan detail konkret daripada teori abstrak?',
		'Apakah Anda lebih mempercayai pengalaman dan penerapan praktis daripada gagasan teoretis?',
		'Apakah Anda lebih fokus pada kenyataan saat ini daripada kemungkinan di masa depan?',
		'Apakah Anda lebih suka petunjuk langkah demi langkah daripada mencari tahu sendiri?',
		'Apakah Anda lebih bersifat praktis daripada imajinatif?',
		'Apakah Anda lebih suka metode yang sudah terbukti daripada pendekatan eksperimental?',
		'Apakah Anda menghargai tradisi dan sejarah yang sudah terbukti?',
		'Apakah Anda senang memikirkan kemungkinan dan gambaran besar?',
		'Apakah Anda sering menemukan pola dan hubungan yang tidak disadari orang lain?',
		'Apakah Anda sering memikirkan masa depan dan apa yang mungkin terjadi?',
		'Apakah Anda senang berdiskusi tentang konsep teoretis dan abstrak?',
		'Apakah Anda lebih suka inovasi daripada tradisi?'
	];

	const list_s_questions = {
		dimension: 's',
		questions: randomQuestion(sn_questions, 0, 6)
	};

	const list_n_questions = {
		dimension: 'n',
		questions: randomQuestion(sn_questions, 6, 12)
	};

	const tf_questions = [
		'Apakah Anda lebih menghargai kebenaran objektif daripada menjaga keharmonisan sosial?',
		'Dalam mengambil keputusan, apakah Anda lebih mengutamakan logika daripada nilai pribadi?',
		'Apakah Anda nyaman menerima kritik membangun dan perdebatan?',
		'Apakah Anda lebih suka menganalisis sesuatu secara objektif daripada mempertimbangkan perasaan?',
		'Apakah Anda mudah memberikan umpan balik jujur meskipun bisa menyakiti perasaan orang lain?',
		'Apakah Anda membuat keputusan terutama berdasarkan fakta dan bukti?',
		'Apakah Anda lebih menghargai efisiensi daripada kerja sama?',
		'Apakah Anda sering mempertimbangkan bagaimana keputusan akan memengaruhi perasaan orang lain?',
		'Apakah Anda menghargai ungkapan apresiasi secara pribadi?',
		'Apakah menjaga keharmonisan dalam kelompok lebih penting daripada menjadi benar?',
		'Apakah Anda membuat keputusan berdasarkan apa yang terasa benar?',
		'Apakah Anda sangat berempati terhadap kesulitan orang lain?'
	];

	const list_t_questions = {
		dimension: 't',
		questions: randomQuestion(tf_questions, 0, 6)
	};

	const list_f_questions = {
		dimension: 'f',
		questions: randomQuestion(tf_questions, 6, 12)
	};

	const jp_questions = [
		'Apakah Anda lebih suka memiliki rencana terperinci daripada bersikap spontan?',
		'Apakah Anda merasa terganggu jika ada urusan yang belum selesai atau keputusan yang belum diambil?',
		'Apakah Anda lebih suka menyelesaikan satu proyek sepenuhnya sebelum memulai yang lain?',
		'Apakah Anda senang memiliki rutinitas harian yang terstruktur?',
		'Apakah Anda sering membuat daftar tugas dan jadwal secara teratur?',
		'Apakah Anda datang lebih awal atau tepat waktu untuk janji temu?',
		'Apakah Anda merasa stres jika ada perubahan mendadak pada rencana?',
		'Apakah Anda suka menjaga pilihan tetap terbuka selama mungkin?',
		'Apakah Anda senang beradaptasi dengan situasi dan perubahan baru?',
		'Apakah tenggat waktu bagi Anda lebih seperti saran daripada aturan?',
		'Apakah Anda merasa rutinitas itu membatasi atau membosankan?',
		'Apakah Anda lebih suka fleksibilitas daripada struktur dalam pekerjaan dan kehidupan Anda?'
	];

	const list_j_questions = {
		dimension: 'j',
		questions: randomQuestion(jp_questions, 0, 6)
	};

	const list_p_questions = {
		dimension: 'p',
		questions: randomQuestion(jp_questions, 6, 12)
	};

	const list_questions = [
		list_e_questions,
		list_i_questions,
		list_s_questions,
		list_n_questions,
		list_t_questions,
		list_f_questions,
		list_j_questions,
		list_p_questions
	];

	return {
		questions: list_questions,
		recommendations: {
			intj: ['artificial intelligence', 'data science', 'algorithms', 'systems architecture'],
			intp: [
				'theoretical computer science',
				'research',
				'programming language design',
				'machine learning'
			],
			entj: [
				'it project management',
				'enterprise architecture',
				'systems analysis',
				'business intelligence'
			],
			entp: [
				'innovation research',
				'technology entrepreneurship',
				'systems design',
				'emerging technologies'
			],

			infj: ['digital ethics', 'information science', 'ux research', 'educational technology'],
			infp: ['ui/ux design', 'human-computer interaction', 'game development', 'digital media'],
			enfj: [
				'information systems management',
				'technology training',
				'digital marketing',
				'knowledge management'
			],
			enfp: [
				'creative technology',
				'digital content creation',
				'user experience',
				'interactive media'
			],

			istj: ['cybersecurity', 'database administration', 'software qa', 'systems administration'],
			isfj: ['data management', 'it support', 'technical documentation', 'digital librarianship'],
			estj: [
				'it operations management',
				'information systems security',
				'enterprise systems',
				'technical project management'
			],
			esfj: [
				'customer relationship management systems',
				'it service management',
				'technical account management',
				'digital communication'
			],

			istp: ['network engineering', 'hardware development', 'penetration testing', 'robotics'],
			isfp: ['digital design', 'web development', 'multimedia', 'mobile app development'],
			estp: [
				'technical sales',
				'technology implementation',
				'it consultancy',
				'systems integration'
			],
			esfp: [
				'technology demonstration',
				'technical support',
				'social media technology',
				'digital marketing systems'
			]
		}
	};
};

const randomQuestion = (questions: string[], startSlice = 0, endSlice = 0): string[] => {
	const questionsAfterSlice = questions.slice(startSlice, endSlice);
	// Fisher-Yates shuffle algorithm to randomize array
	const shuffled = [...questionsAfterSlice];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
};
