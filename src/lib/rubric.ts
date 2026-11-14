// CDIO Standards v2.0 with customized rubrics (CDIO Initiative, 8 December 2010).
// Parsed verbatim from CDIOStdsRubricsv2.0_2010Dec8.doc supplied by the researcher.
// Source: http://www.cdio.org

export interface RubricStandard {
  n: number;
  title: string;
  statement: string;
  description: string;
  rationale: string;
  /** levels[0] … levels[5] = criteria for scale 0 … 5 */
  levels: string[];
}

export const RUBRIC_SOURCE = "CDIO Standards v2.0 with customized rubrics (8 December 2010)";

export const GENERAL_RUBRIC: string[] = [
  "There is no documented plan or activity related to the standard.",
  "There is an awareness of need to adopt the standard and a process is in place to address it.",
  "There is a plan in place to address the standard.",
  "Implementation of the plan to address the standard is underway across the program components and constituents.",
  "There is documented evidence of the full implementation and impact of the standard across program components and constituents.",
  "Evidence related to the standard is regularly reviewed and used to make improvements."
];

export const RUBRIC: RubricStandard[] = [
  {
    "n": 1,
    "title": "The Context",
    "statement": "Adoption of the principle that product, process, and system lifecycle development and deployment -- Conceiving, Designing, Implementing and Operating -- are the context for engineering education",
    "description": "A CDIO program is based on the principle that product, process, and system lifecycle development and deployment are the appropriate context for engineering education. Conceiving--Designing--Implementing--Operating is a model of the entire product, process, and system lifecycle. The Conceive stage includes defining customer needs; considering technology, enterprise strategy, and regulations; and, developing conceptual, technical, and business plans. The Design stage focuses on creating the design, that is, the plans, drawings, and algorithms that describe what will be implemented. The Implement stage refers to the transformation of the design into the product, process, or system, including manufacturing, coding, testing and validation. The final stage, Operate, uses the implemented product or process to deliver the intended value, including maintaining, evolving and retiring the system. The product, process, and system lifecycle is considered the context for engineering education in that it is part of the cultural framework, or environment, in which technical knowledge and other skills are taught, practiced and learned. The principle is adopted by a program when there is explicit agreement of faculty to transition to a CDIO program, and support from program leaders to sustain reform initiatives.",
    "rationale": "Beginning engineers should be able to Conceive--Design--Implement--Operate complex value-added engineering products, processes, and systems in modern team-based environments. They should be able to participate in engineering processes, contribute to the development of engineering products, and do so while working to professional standards in any organization. This is the essence of the engineering profession.",
    "levels": [
      "There is no plan to adopt the principle that CDIO is the context of engineering education for the program.",
      "The need to adopt the principle that CDIO is the context of engineering education is recognized and a process to address it has been initiated.",
      "There is an explicit plan to transition to a CDIO context for the engineering program.",
      "CDIO is adopted as the context for the engineering program and is implemented in one or more years of the program.",
      "There is documented evidence that the CDIO principle is the context of the engineering program and is fully implemented.",
      "Evaluation groups recognize that CDIO is the context of the engineering program and use this principle as a guide for continuous improvement."
    ]
  },
  {
    "n": 2,
    "title": "Learning Outcomes",
    "statement": "Specific, detailed learning outcomes for personal and interpersonal skills, and product, process, and system building skills, as well as disciplinary knowledge, consistent with program goals and validated by program stakeholders",
    "description": "The knowledge, skills, and attitudes intended as a result of engineering education, that is, the learning outcomes, are codified in the CDIO Syllabus. These learning outcomes detail what students should know and be able to do at the conclusion of their engineering programs. In addition to learning outcomes for technical disciplinary knowledge (Section 1), the CDIO Syllabus specifies learning outcomes as personal and interpersonal skills, and product, process, and system building. Personal learning outcomes (Section 2) focus on individual students' cognitive and affective development, for example, engineering reasoning and problem solving, experimentation and knowledge discovery, system thinking, creative thinking, critical thinking, and professional ethics. Interpersonal learning outcomes (Section 3) focus on individual and group interactions, such as, teamwork, leadership, communication, and communication in foreign languages. Product, process, and system building skills (Section 4) focus on conceiving, designing, implementing, and operating systems in enterprise, business, and societal contexts. Learning outcomes are reviewed and validated by key stakeholders, that is, groups who share an interest in the graduates of engineering programs, for consistency with program goals and relevance to engineering practice. Programs are encouraged to customize the CDIO Syllabus to their respective programs. In addition, stakeholders help to determine the expected level of proficiency, or standard of achievement, for each learning outcome.",
    "rationale": "Setting specific learning outcomes helps to ensure that students acquire the appropriate foundation for their future. Professional engineering organizations and industry representatives identified key attributes of beginning engineers both in technical and professional areas. Moreover, many evaluation and accreditation bodies expect engineering programs to identify program outcomes in terms of their graduates' knowledge, skills, and attitudes.",
    "levels": [
      "There are no explicit program learning outcomes that cover knowledge, personal and interpersonal skills, and product, process and system building skills.",
      "The need to create or modify program learning outcomes is recognized and such a process has been initiated.",
      "A plan to incorporate explicit statements of program learning outcomes is established.",
      "Program learning outcomes are validated with key program stakeholders, including faculty, students, alumni, and industry representatives.",
      "Program learning outcomes are aligned with institutional vision and mission, and levels of proficiency are set for each outcome.",
      "Evaluation groups regularly review and revise program learning outcomes, based on changes in stakeholder needs."
    ]
  },
  {
    "n": 3,
    "title": "Integrated Curriculum",
    "statement": "A curriculum designed with mutually supporting disciplinary courses, with an explicit plan to integrate personal and interpersonal skills, and product, process, and system building skills",
    "description": "An integrated curriculum includes learning experiences that lead to the acquisition of personal and interpersonal skills, and product, process, and system building skills (Standard 2), interwoven with the learning of disciplinary knowledge and its application in professional engineering. Disciplinary courses are mutually supporting when they make explicit connections among related and supporting content and learning outcomes. An explicit plan identifies ways in which the integration of skills and multidisciplinary connections are to be made, for example, by mapping the specified learning outcomes to courses and co-curricular activities that make up the curriculum.",
    "rationale": "The teaching of personal, interpersonal, and professional skills, and product, process, and system building skills should not be considered an addition to an already full curriculum, but an integral part of it. To reach the intended learning outcomes in disciplinary knowledge and skills, the curriculum and learning experiences have to make dual use of available time. Faculty play an active role in designing the integrated curriculum by suggesting appropriate disciplinary linkages, as well as opportunities to address specific skills in their respective teaching areas.",
    "levels": [
      "There is no integration of skills or mutually supporting disciplines in the program.",
      "The need to analyze the curriculum is recognized and initial mapping of disciplinary and skills learning outcomes is underway.",
      "A curriculum plan that integrates disciplinary learning, personal, interpersonal, product, process, and system building skills is approved by appropriate groups.",
      "Personal, interpersonal, product, process, and system building skills are integrated into one or more years in the curriculum.",
      "There is evidence that personal, interpersonal, product, process, and system building skills are addressed in all courses responsible for their implementation.",
      "Stakeholders regularly review the integrated curriculum and make recommendations and adjustments as needed."
    ]
  },
  {
    "n": 4,
    "title": "Introduction to Engineering",
    "statement": "An introductory course that provides the framework for engineering practice in product, process, and system building, and introduces essential personal and interpersonal skills",
    "description": "The introductory course, usually one of the first required courses in a program, provides a framework for the practice of engineering. This framework is a broad outline of the tasks and responsibilities of an engineer, and the use of disciplinary knowledge in executing those tasks. Students engage in the practice of engineering through problem solving and simple design exercises, individually and in teams. The course also includes personal and interpersonal skills knowledge, skills, and attitudes that are essential at the start of a program to prepare students for more advanced product, process, and system building experiences. For example, students can participate in small team exercises to prepare them for larger development teams.",
    "rationale": "Introductory courses aim to stimulate students' interest in, and strengthen their motivation for, the field of engineering by focusing on the application of relevant core engineering disciplines. Students usually select engineering programs because they want to build things, and introductory courses can capitalize on this interest. In addition, introductory courses provide an early start to the development of the essential skills described in the CDIO Syllabus.",
    "levels": [
      "There is no introductory engineering course that provides a framework for practice and introduces key skills.",
      "The need for an introductory course that provides the framework for engineering practice is recognized and a process to address that need has been initiated.",
      "A plan for an introductory engineering course introducing a framework for practice has been approved.",
      "An introductory course that includes engineering learning experiences and introduces essential personal and interpersonal skills has been implemented.",
      "There is documented evidence that students have achieved the intended learning outcomes of the introductory engineering course.",
      "The introductory course is regularly evaluated and revised, based on feedback from students, instructors, and other stakeholders."
    ]
  },
  {
    "n": 5,
    "title": "Design-Implement Experiences",
    "statement": "A curriculum that includes two or more design-implement experiences, including one at a basic level and one at an advanced level",
    "description": "The term design-implement experience denotes a range of engineering activities central to the process of developing new products and systems. Included are all of the activities described in Standard One at the Design and Implement stages, plus appropriate aspects of conceptual design from the Conceive stage. Students develop product, process, and system building skills, as well as the ability to apply engineering science, in design-implement experiences integrated into the curriculum. Design-implement experiences are considered basic or advanced in terms of their scope, complexity, and sequence in the program. For example, simpler products and systems are included earlier in the program, while more complex design-implement experiences appear in later courses designed to help students integrate knowledge and skills acquired in preceding courses and learning activities. Opportunities to conceive, design, implement, and operate products, processes, and systems may also be included in required co-curricular activities, for example, undergraduate research projects and internships.",
    "rationale": "Design-implement experiences are structured and sequenced to promote early success in engineering practice. Iteration of design-implement experiences and increasing levels of design complexity reinforce students' understanding of the product, process, and system development process. Design-implement experiences also provide a solid foundation upon which to build deeper conceptual understanding of disciplinary skills. The emphasis on building products and implementing processes in real-world contexts gives students opportunities to make connections between the technical content they are learning and their professional and career interests.",
    "levels": [
      "There are no design-implement experiences in the engineering program.",
      "A needs analysis has been conducted to identify opportunities to include design-implement experiences in the curriculum.",
      "There is a plan to develop a design-implement experience at a basic and advanced level.",
      "At least two design-implement experiences of increasing complexity are being implemented.",
      "There is documented evidence that students have achieved the intended learning outcomes of the design-implement experiences.",
      "The design-implement experiences are regularly evaluated and revised, based on feedback from students, instructors, and other stakeholders."
    ]
  },
  {
    "n": 6,
    "title": "Engineering Workspaces",
    "statement": "Engineering workspaces and laboratories that support and encourage hands-on learning of product, process, and system building, disciplinary knowledge, and social learning",
    "description": "The physical learning environment includes traditional learning spaces, for example, classrooms, lecture halls, and seminar rooms, as well as engineering workspaces and laboratories. Workspaces and laboratories support the learning of product, process, and system building skills concurrently with disciplinary knowledge. They emphasize hands-on learning in which students are directly engaged in their own learning, and provide opportunities for social learning, that is, settings where students can learn from each other and interact with several groups. The creation of new workspaces, or remodeling of existing laboratories, will vary with the size of the program and resources of the institution.",
    "rationale": "Workspaces and other learning environments that support hands-on learning are fundamental resources for learning to design, implement, and operate products, processes, and systems. Students who have access to modern engineering tools, software, and laboratories have opportunities to develop the knowledge, skills, and attitudes that support product, process, and system building competencies. These competencies are best developed in workspaces that are student-centered, user-friendly, accessible, and interactive.",
    "levels": [
      "Engineering workspaces are inadequate or inappropriate to support and encourage hands-on skills, knowledge, and social learning.",
      "The need for engineering workspaces to support hands-on, knowledge, and skills activities is recognized and a process to address the need has been initiated.",
      "Plans to remodel or build additional engineering workspaces have been approved by the appropriate bodies.",
      "Plans are being implemented and some new or remodeled spaces are in use.",
      "Engineering workspaces fully support all components of hands-on, knowledge, and skills learning.",
      "Evaluation groups regularly review the impact and effectiveness of workspaces on learning and provide recommendations for improving them."
    ]
  },
  {
    "n": 7,
    "title": "Integrated Learning Experiences",
    "statement": "Integrated learning experiences that lead to the acquisition of disciplinary knowledge, as well as personal and interpersonal skills, and product, process, and system building skills",
    "description": "Integrated learning experiences are pedagogical approaches that foster the learning of disciplinary knowledge simultaneously with personal and interpersonal skills, and product, process, and system building skills. They incorporate professional engineering issues in contexts where they coexist with disciplinary issues. For example, students might consider the analysis of a product, the design of the product, and the social responsibility of the designer of the product, all in one exercise. Industrial partners, alumni, and other key stakeholders are often helpful in providing examples of such exercises.",
    "rationale": "The curriculum design and learning outcomes, prescribed in Standards 2 and 3 respectively, can be realized only if there are corresponding pedagogical approaches that make dual use of student learning time. Furthermore, it is important that students recognize engineering faculty as role models of professional engineers, instructing them in disciplinary knowledge, personal and interpersonal skills, and product, process, and system building skills. With integrated learning experiences, faculty can be more effective in helping students apply disciplinary knowledge to engineering practice and better prepare them to meet the demands of the engineering profession.",
    "levels": [
      "There is no evidence of integrated learning of disciplines and skills.",
      "Course plans have been benchmarked with respect to the integrated curriculum plan.",
      "Course plans with learning outcomes and activities that integrate personal and interpersonal skills with disciplinary knowledge has been approved.",
      "Integrated learning experiences are implemented in courses across the curriculum.",
      "There is evidence of the impact of integrated learning experiences across the curriculum.",
      "Courses are regularly evaluated and revised regarding their integration of learning outcomes and activities."
    ]
  },
  {
    "n": 8,
    "title": "Active Learning",
    "statement": "Teaching and learning based on active experiential learning methods",
    "description": "Active learning methods engage students directly in thinking and problem solving activities. There is less emphasis on passive transmission of information, and more on engaging students in manipulating, applying, analyzing, and evaluating ideas. Active learning in lecture-based courses can include such methods as partner and small-group discussions, demonstrations, debates, concept questions, and feedback from students about what they are learning. Active learning is considered experiential when students take on roles that simulate professional engineering practice, for example, design-implement projects, simulations, and case studies.",
    "rationale": "By engaging students in thinking about concepts, particularly new ideas, and requiring them to make an overt response, students not only learn more, they recognize for themselves what and how they learn. This process helps to increase students' motivation to achieve program learning outcomes and form habits of lifelong learning. With active learning methods, instructors can help students make connections among key concepts and facilitate the application of this knowledge to new settings.",
    "levels": [
      "There is no evidence of active experiential learning methods.",
      "There is an awareness of the benefits of active learning, and benchmarking of active learning methods in the curriculum is in process.",
      "There is a plan to include active learning methods in courses across the curriculum.",
      "Active learning methods are being implemented across the curriculum.",
      "There is documented evidence of the impact of active learning methods on student learning.",
      "Evaluation groups regularly review the impact of active learning methods and make recommendations for continuous improvement."
    ]
  },
  {
    "n": 9,
    "title": "Enhancement of Faculty Competence",
    "statement": "Actions that enhance faculty competence in personal and interpersonal skills, and product, process, and system building skills",
    "description": "CDIO programs provide support for the collective engineering faculty to improve its competence in the personal and interpersonal skills, and product, process, and system building skills described in Standard 2. These skills are developed best in contexts of professional engineering practice. The nature and scope of faculty development vary with the resources and intentions of different programs and institutions. Examples of actions that enhance faculty competence include: professional leave to work in industry, partnerships with industry colleagues in research and education projects, inclusion of engineering practice as a criterion for hiring and promotion, and appropriate professional development experiences at the university.",
    "rationale": "If engineering faculty are expected to teach a curriculum of personal and interpersonal skills, and product, process, and system building skills integrated with disciplinary knowledge, as described in Standards 3, 4, 5, and 7, they as a group need to be competent in those skills. Engineering professors tend to be experts in the research and knowledge base of their respective disciplines, with only limited experience in the practice of engineering in business and industrial settings. Moreover, the rapid pace of technological innovation requires continuous updating of engineering skills. The collective faculty needs to enhance its engineering knowledge and skills so that it can provide relevant examples to students and also serve as individual role models of contemporary engineers.",
    "levels": [
      "There are no programs or practices to enhance faculty competence in personal, interpersonal, product, process, and system building skills.",
      "A benchmarking study and needs analysis of faculty competence has been conducted.",
      "There is a systematic plan of faculty development in personal, interpersonal, product, process, and system building skills.",
      "The collective faculty participates in faculty development in personal, interpersonal, product, process, and system building skills.",
      "There is evidence that the collective faculty is competent in personal, interpersonal, product, process, and system building skills.",
      "Faculty competence in personal, interpersonal, product, process, and system building skills is regularly evaluated and updated where appropriate."
    ]
  },
  {
    "n": 10,
    "title": "Enhancement of Faculty Teaching Competence",
    "statement": "Actions that enhance faculty competence in providing integrated learning experiences, in using active experiential learning methods, and in assessing student learning",
    "description": "A CDIO program provides support for faculty to improve their competence in integrated learning experiences (Standard 7), active and experiential learning (Standard 8), and assessing student learning (Standard 11). The nature and scope of faculty development practices will vary with programs and institutions. Examples of actions that enhance faculty competence include: support for faculty participation in university and external faculty development programs, forums for sharing ideas and best practices, and emphasis in performance reviews and hiring on effective teaching methods.",
    "rationale": "If faculty members are expected to teach and assess in new ways, as described in Standards 7, 8, and 11, they need opportunities to develop and improve these competencies. Many universities have faculty development programs and services that might be eager to collaborate with faculty in CDIO programs. In addition, if CDIO programs want to emphasize the importance of teaching, learning, and assessment, they must commit adequate resources for faculty development in these areas.",
    "levels": [
      "There are no programs or practices to enhance faculty teaching competence.",
      "A benchmarking study and needs analysis of faculty teaching competence has been conducted.",
      "There is a systematic plan of faculty development in teaching, learning, and assessment methods.",
      "Faculty members participate in faculty development in teaching, learning, and assessment methods.",
      "There is evidence that the collective faculty is competent in teaching, learning, and assessment methods.",
      "Faculty competence in teaching, learning, and assessment methods is regularly evaluated and updated where appropriate."
    ]
  },
  {
    "n": 11,
    "title": "Learning Assessment",
    "statement": "Assessment of student learning in personal and interpersonal skills, and product, process, and system building skills, as well as in disciplinary knowledge",
    "description": "Assessment of student learning is the measure of the extent to which each student achieves specified learning outcomes. Instructors usually conduct this assessment within their respective courses. Effective learning assessment uses a variety of methods matched appropriately to learning outcomes that address disciplinary knowledge, as well as personal and interpersonal skills, and product, process, and system building skills, as described in Standard 2. These methods may include written and oral tests, observations of student performance, rating scales, student reflections, journals, portfolios, and peer and self-assessment.",
    "rationale": "If we value personal and interpersonal skills, and product, process, and system building skills, and incorporate them into curriculum and learning experiences, then we must have effective assessment processes for measuring them. Different categories of learning outcomes require different assessment methods. For example, learning outcomes related to disciplinary knowledge may be assessed with oral and written tests, while those related to design-implement skills may be better measured with recorded observations. Using a variety of assessment methods accommodates a broader range of learning styles, and increases the reliability and validity of the assessment data. As a result, determinations of students' achievement of the intended learning outcomes can be made with greater confidence.",
    "levels": [
      "Learning assessment methods are inadequate or inappropriate.",
      "The need for the improvement of learning assessment methods is recognized and benchmarking of their current use is in process.",
      "There is a plan to incorporate learning assessment methods across the curriculum.",
      "Learning assessment methods are implemented across the curriculum.",
      "Learning assessment methods are used effectively in courses across the curriculum.",
      "Evaluation groups regularly review the use of learning assessment methods and make recommendations for continuous improvement."
    ]
  },
  {
    "n": 12,
    "title": "Program Evaluation",
    "statement": "A system that evaluates programs against these twelve standards, and provides feedback to students, faculty, and other stakeholders for the purposes of continuous improvement",
    "description": "Program evaluation is a judgment of the overall value of a program based on evidence of a program's progress toward attaining its goals. A CDIO program should be evaluated relative to these 12 CDIO Standards. Evidence of overall program value can be collected with course evaluations, instructor reflections, entry and exit interviews, reports of external reviewers, and follow-up studies with graduates and employers. The evidence can be regularly reported back to instructors, students, program administrators, alumni, and other key stakeholders. This feedback forms the basis of decisions about the program and its plans for continuous improvement.",
    "rationale": "A key function of program evaluation is to determine the program's effectiveness and efficiency in reaching its intended goals. Evidence collected during the program evaluation process also serves as the basis of continuous program improvement. For example, if in an exit interview, a majority of students reported that they were not able to meet some specific learning outcome, a plan could be initiated to identify root causes and implement changes. Moreover, many external evaluators and accreditation bodies require regular and consistent program evaluation.",
    "levels": [
      "Program evaluation is inadequate or inconsistent.",
      "The need for program evaluation is recognized and benchmarking of evaluation methods is in process.",
      "A program evaluation plan exists.",
      "Program evaluation methods are being implemented across the program to gather data from students, faculty, program leaders, alumni, and other stakeholders.",
      "Program evaluation methods are being used effectively with all stakeholder groups.",
      "Systematic and continuous improvement is based on program evaluation results from multiple sources and gathered by multiple methods."
    ]
  }
];

export const rubricFor = (n: number) => RUBRIC[n - 1];
