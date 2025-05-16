export const load = () => {
	const ei_questions = [
		'Do you generally prefer being around other people rather than being alone?',
		'Do you find yourself energized after social gatherings?',
		'Do you tend to speak before thinking things through?',
		'Do you enjoy meeting new people on a regular basis?',
		'Do you prefer working in group settings over working alone?',
		'Are you comfortable speaking up in large meetings or groups?',
		'Do you like being the center of attention?',
		'Do you need alone time to recharge after socializing?',
		'Do you prefer thinking through ideas before sharing them?',
		'Do you find it draining to be in social situations for extended periods?',
		'Do you prefer deep one-on-one conversations to large group discussions?',
		'Do you often reflect internally before taking action?'
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
		'Are you more interested in concrete facts and details than abstract theories?',
		'Do you trust experience and practical applications more than theoretical ideas?',
		'Do you focus more on the present reality than future possibilities?',
		'Do you prefer step-by-step instructions over figuring things out along the way?',
		'Are you more practical than imaginative?',
		'Do you prefer established methods over experimental approaches?',
		'Do you value tradition and proven history?',
		'Do you enjoy thinking about possibilities and the big picture?',
		'Do you often find patterns and connections that others miss?',
		'Are you frequently thinking about the future and what could be?',
		'Do you enjoy theoretical discussions and abstract concepts?',
		'Do you prefer innovation over tradition?'
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
		'Do you value objective truth over maintaining social harmony?',
		'When making decisions, do you prioritize logic over personal values?',
		'Are you comfortable with constructive criticism and debates?',
		'Do you prefer analyzing things objectively rather than considering feelings?',
		"Do you find it easy to give honest feedback even if it might hurt someone's feelings?",
		'Do you make decisions based primarily on facts and evidence?',
		'Do you value efficiency over cooperation?',
		"Do you often consider how decisions will affect other people's feelings?",
		'Do you value personal expressions of appreciation?',
		'Is maintaining harmony in a group more important than being right?',
		'Do you make decisions based on what feels right?',
		"Do you empathize strongly with others' struggles?"
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
		'Do you prefer to have a detailed plan rather than being spontaneous?',
		'Does having unfinished business or unresolved decisions bother you?',
		'Do you prefer finishing one project completely before starting another?',
		'Do you like having a structured daily routine?',
		'Do you make to-do lists and schedules regularly?',
		'Do you arrive early or exactly on time for appointments?',
		'Are you stressed by last-minute changes to plans?',
		'Do you like keeping your options open as long as possible?',
		'Do you enjoy adapting to new situations and changes?',
		'Are deadlines more like suggestions to you?',
		'Do you find routines limiting or boring?',
		'Do you prefer flexibility over structure in your work and life?'
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
