export const load = async () => {
	// We're only providing the recommendations, the questions will be loaded from the user's uploaded CSV
	return {
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
		},
		questions: [] // Empty array as we'll be using user-uploaded questions
	};
};
