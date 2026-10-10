import {
  Subject,
  Exam,
  StudyTask,
  StudyNote,
  QuizQuestion,
  InterviewQuestion,
  CodingProblem,
  StudySessionLog,
} from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'aptitude',
    name: 'Quantitative Aptitude',
    code: 'CSE-APT101',
    category: 'Placement & Aptitude',
    icon: 'Calculator',
    description: 'Essential numerical ability, arithmetic, algebra, and data interpretation for campus placement drives and competitive exams.',
    credits: 3,
    targetExamDate: '2026-11-15',
    accentColor: 'indigo',
    units: [
      { id: 'apt-u1', title: 'Unit 1: Number Systems, HCF & LCM', topics: ['Divisibility rules', 'Unit digit calculation', 'Remainders & Euler theorem', 'HCF and LCM models'], completed: true },
      { id: 'apt-u2', title: 'Unit 2: Time, Speed & Distance', topics: ['Average speed', 'Relative speed & trains', 'Boats and streams', 'Races and circular tracks'], completed: true },
      { id: 'apt-u3', title: 'Unit 3: Time & Work, Pipes & Cisterns', topics: ['Efficiency ratio method', 'Alternate day work', 'Man-Day formula (M1D1H1)', 'Negative work/leakage'], completed: false },
      { id: 'apt-u4', title: 'Unit 4: Percentages, Profit & Loss', topics: ['Percentage change & successive', 'Cost price vs Selling price', 'Marked price & discounts', 'Faulty balance weights'], completed: false },
      { id: 'apt-u5', title: 'Unit 5: Permutation, Combination & Probability', topics: ['Fundamental counting principle', 'Arrangements with repetitions', 'Selection models', 'Conditional probability & Bayes theorem'], completed: false },
    ],
    keyCheatSheet: [
      {
        title: 'Time & Work Shortcut',
        items: [
          'If A does work in x days and B in y days, together = (x * y) / (x + y) days.',
          'Efficiency is inversely proportional to time taken when work is constant.',
          'Chain Rule: (M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2.',
        ],
      },
      {
        title: 'Speed, Time & Distance',
        items: [
          'Average Speed for equal distance = (2 * S1 * S2) / (S1 + S2).',
          'Converting km/h to m/s: multiply by 5/18. Converting m/s to km/h: multiply by 18/5.',
          'Trains passing each other: Relative speed = S1 + S2 (opposite direction) or |S1 - S2| (same direction).',
        ],
      },
    ],
  },
  {
    id: 'reasoning',
    name: 'Logical Reasoning',
    code: 'CSE-LR102',
    category: 'Placement & Aptitude',
    icon: 'Brain',
    description: 'Analytical thinking, pattern recognition, syllogisms, seating arrangements, and critical deduction for technical screening tests.',
    credits: 3,
    targetExamDate: '2026-11-18',
    accentColor: 'violet',
    units: [
      { id: 'lr-u1', title: 'Unit 1: Syllogisms & Deductive Logic', topics: ['Venn diagram method', 'Some / All / No statements', 'Possibility cases', 'Either-Or conditions'], completed: true },
      { id: 'lr-u2', title: 'Unit 2: Blood Relations & Direction Sense', topics: ['Coded blood relations', 'Family tree diagrams', 'Angle turns & shadows', 'Shortest distance pythagoras'], completed: true },
      { id: 'lr-u3', title: 'Unit 3: Seating Arrangements & Puzzles', topics: ['Linear row arrangements', 'Circular table (inward/outward)', 'Floor puzzles', 'Box stack sequencing'], completed: false },
      { id: 'lr-u4', title: 'Unit 4: Coding-Decoding & Series', topics: ['Letter shifting patterns', 'Matrix coding', 'Number & alphanumeric series', 'Analogy & odd-one-out'], completed: false },
      { id: 'lr-u5', title: 'Unit 5: Critical Reasoning', topics: ['Statement and assumptions', 'Cause and effect', 'Course of action', 'Strengthening/weakening arguments'], completed: false },
    ],
    keyCheatSheet: [
      {
        title: 'Syllogism Rules',
        items: [
          'All A are B + All B are C -> All A are C.',
          'Some + Some gives no definite conclusion.',
          'Negative statements cannot yield positive definite conclusions.',
        ],
      },
      {
        title: 'Direction Sense & Angles',
        items: [
          'Clockwise = right turn; Counter-clockwise = left turn.',
          'At sunrise, shadows fall to the West. At sunset, shadows fall to the East. At 12 noon, no shadow.',
        ],
      },
    ],
  },
  {
    id: 'english',
    name: 'Verbal Ability & English',
    code: 'CSE-ENG103',
    category: 'Placement & Aptitude',
    icon: 'BookOpen',
    description: 'Grammar mechanics, vocabulary in context, reading comprehension, and error spotting for MNC corporate assessments.',
    credits: 2,
    targetExamDate: '2026-11-20',
    accentColor: 'emerald',
    units: [
      { id: 'eng-u1', title: 'Unit 1: Grammar & Sentence Correction', topics: ['Subject-Verb agreement', 'Tenses and conditionals', 'Modifiers and parallelism', 'Prepositions and idioms'], completed: true },
      { id: 'eng-u2', title: 'Unit 2: Vocabulary & Word Power', topics: ['High-frequency GRE words', 'Synonyms and antonyms', 'Contextual root words', 'One-word substitutions'], completed: false },
      { id: 'eng-u3', title: 'Unit 3: Reading Comprehension', topics: ['Main idea extraction', 'Inference vs stated fact', 'Author tone analysis', 'Speed reading techniques'], completed: false },
      { id: 'eng-u4', title: 'Unit 4: Para Jumbles & Sentence Completion', topics: ['Pronoun antecedent links', 'Chronological and transition markers', 'Blank fill collocations', 'Sentence rearrangement'], completed: false },
    ],
    keyCheatSheet: [
      {
        title: 'Subject-Verb Agreement Traps',
        items: [
          'Phrases like "along with", "as well as", "together with" do not change the number of the subject.',
          'Neither... nor / Either... or: Verb agrees with the subject closest to it.',
          '"Each", "Everyone", "Neither of" take singular verbs.',
        ],
      },
      {
        title: 'Para-Jumble Linkers',
        items: [
          'Acronym rule: Full name always precedes the abbreviated form (e.g., World Health Organization before WHO).',
          'Noun before pronoun: Sentences introducing the noun come before sentences with "He", "They", "It".',
        ],
      },
    ],
  },
  {
    id: 'programming',
    name: 'Programming & Data Structures',
    code: 'CSE-CS201',
    category: 'Core CS',
    icon: 'Code2',
    description: 'Core programming foundations (C/C++, Java, Python), OOP paradigms, memory pointers, DSA, and algorithmic complexity.',
    credits: 4,
    targetExamDate: '2026-12-05',
    accentColor: 'blue',
    units: [
      { id: 'prog-u1', title: 'Unit 1: Complexity & Arrays', topics: ['Big-O, Big-Omega, Big-Theta', 'Master Theorem for recurrences', 'Two-pointer technique & sliding window', 'Prefix sum arrays'], completed: true },
      { id: 'prog-u2', title: 'Unit 2: Linked Lists, Stacks & Queues', topics: ['Singly and doubly linked lists', 'Fast/slow pointer cycle detection', 'Monotonic stack problems', 'Circular queue and Deque'], completed: true },
      { id: 'prog-u3', title: 'Unit 3: Trees & Binary Search Trees', topics: ['Tree traversals (In, Pre, Post, Level-order)', 'Lowest Common Ancestor (LCA)', 'BST search/insert/delete', 'Height-balanced AVL trees'], completed: false },
      { id: 'prog-u4', title: 'Unit 4: Graphs & Traversals', topics: ['BFS and DFS algorithms', 'Dijkstra shortest path', 'Kruskal and Prim MST', 'Topological sort (Kahn algorithm)'], completed: false },
      { id: 'prog-u5', title: 'Unit 5: OOP Concepts & System Principles', topics: ['Encapsulation & Abstraction', 'Polymorphism (compile vs runtime)', 'Inheritance models & diamond problem', 'Virtual functions & vtable'], completed: false },
    ],
    keyCheatSheet: [
      {
        title: 'Time Complexity Milestones',
        items: [
          'Binary Search: O(log n) time, O(1) space.',
          'Merge Sort & QuickSort: O(n log n) average. QuickSort worst O(n^2).',
          'Hash Map operations: O(1) average lookup/insert.',
          'Floyd Cycle Finding: O(n) time, O(1) space.',
        ],
      },
      {
        title: 'OOP Core Pillars',
        items: [
          'Abstraction: Hiding internal implementation and showing only functionality (interfaces/abstract classes).',
          'Polymorphism: Method overloading (compile-time) vs Method overriding (runtime using virtual tables).',
        ],
      },
    ],
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    code: 'CSE-CS301',
    category: 'Core CS',
    icon: 'Database',
    description: 'Relational model, advanced SQL querying, functional dependencies, schema normalization, ACID transactions, and indexing.',
    credits: 4,
    targetExamDate: '2026-12-10',
    accentColor: 'cyan',
    units: [
      { id: 'dbms-u1', title: 'Unit 1: Relational Model & ER Diagrams', topics: ['Entities, attributes, relationships', 'Cardinality and participation', 'Relational algebra operators', 'Integrity constraints & keys'], completed: true },
      { id: 'dbms-u2', title: 'Unit 2: SQL & Subqueries', topics: ['DDL, DML, DQL syntax', 'GROUP BY, HAVING, and Aggregates', 'Inner, Left, Right, Full Outer Joins', 'Correlated subqueries and CTEs'], completed: true },
      { id: 'dbms-u3', title: 'Unit 3: Normalization & Functional Dependency', topics: ['Armstrong axioms', '1NF, 2NF, 3NF conditions', 'Boyce-Codd Normal Form (BCNF)', 'Lossless decomposition & dependency preservation'], completed: false },
      { id: 'dbms-u4', title: 'Unit 4: Transactions & Concurrency Control', topics: ['ACID properties explained', 'Conflict serializability & precedence graph', 'Two-Phase Locking (2PL)', 'Timestamp ordering protocol & deadlocks'], completed: false },
      { id: 'dbms-u5', title: 'Unit 5: Storage & Indexing', topics: ['File organizations & hashing', 'B-Trees and B+ Trees mechanics', 'Clustered vs Non-clustered indexing', 'Query evaluation plans'], completed: false },
    ],
    keyCheatSheet: [
      {
        title: 'Normalization Quick Rules',
        items: [
          '1NF: Atomic attribute values only (no repeating groups/multivalued attributes).',
          '2NF: 1NF + No partial dependency (every non-prime attribute fully depends on entire candidate key).',
          '3NF: 2NF + No transitive dependency (for X -> Y, X is super key OR Y is prime attribute).',
          'BCNF: For every functional dependency X -> Y, X must be a super key.',
        ],
      },
      {
        title: 'ACID Properties',
        items: [
          'Atomicity: All-or-nothing execution (managed by Recovery Manager / WAL log).',
          'Consistency: Preserves database invariants before and after.',
          'Isolation: Concurrent transactions execute as if sequential (Concurrency Control Manager).',
          'Durability: Committed updates survive system crashes (Non-volatile log flush).',
        ],
      },
    ],
  },
  {
    id: 'os',
    name: 'Operating Systems',
    code: 'CSE-CS302',
    category: 'Core CS',
    icon: 'Cpu',
    description: 'Process management, CPU scheduling, thread synchronization, deadlocks, virtual memory management, and file system architectures.',
    credits: 4,
    targetExamDate: '2026-12-14',
    accentColor: 'amber',
    units: [
      { id: 'os-u1', title: 'Unit 1: Process & Thread Management', topics: ['Process states & PCB structure', 'Fork() system call behavior', 'User vs Kernel level threads', 'Context switching overhead'], completed: true },
      { id: 'os-u2', title: 'Unit 2: CPU Scheduling Algorithms', topics: ['FCFS, SJF (Preemptive SRTF)', 'Round Robin (quantum tradeoffs)', 'Priority scheduling & starvation', 'Multi-level feedback queues'], completed: true },
      { id: 'os-u3', title: 'Unit 3: Synchronization & Deadlocks', topics: ['Race conditions & Critical section', 'Peterson solution & Semaphores', '4 Coffman conditions for deadlock', 'Bankers Algorithm & Deadlock avoidance'], completed: false },
      { id: 'os-u4', title: 'Unit 4: Memory Management & Paging', topics: ['Contiguous allocation & Fragmentation', 'Paging hardware & TLB miss handling', 'Inverted and multi-level page tables', 'Segmentation architecture'], completed: false },
      { id: 'os-u5', title: 'Unit 5: Virtual Memory & Page Replacement', topics: ['Demand paging & Page fault handler', 'FIFO, Optimal, and LRU replacement', 'Thrashing & Working set model', 'Belady anomaly in FIFO'], completed: false },
    ],
    keyCheatSheet: [
      {
        title: 'Deadlock 4 Coffman Conditions',
        items: [
          '1. Mutual Exclusion: At least one non-shareable resource.',
          '2. Hold and Wait: Process holds resource while requesting others.',
          '3. No Preemption: Resources cannot be forcibly revoked.',
          '4. Circular Wait: Closed loop chain of processes waiting on each other.',
        ],
      },
      {
        title: 'Memory Formulae',
        items: [
          'Physical Address = Frame Number * Frame Size + Offset.',
          'Effective Memory Access Time (EMAT) = Hit_ratio * (TLB_time + Mem_time) + (1 - Hit_ratio) * (TLB_time + 2 * Mem_time).',
          'Belady Anomaly: Occurs in FIFO where increasing page frames causes MORE page faults.',
        ],
      },
    ],
  },
  {
    id: 'data-mining',
    name: 'Data Mining & Warehousing',
    code: 'CSE-CS401',
    category: 'Advanced CS',
    icon: 'Network',
    description: 'Knowledge Discovery in Databases (KDD), data preprocessing, association rule mining (Apriori), classification, and clustering.',
    credits: 3,
    targetExamDate: '2026-12-18',
    accentColor: 'rose',
    units: [
      { id: 'dm-u1', title: 'Unit 1: KDD Process & Data Preprocessing', topics: ['Data cleaning (handling missing/noisy values)', 'Data integration & transformation', 'Data reduction (PCA, wavelets)', 'Data discretization & binning'], completed: true },
      { id: 'dm-u2', title: 'Unit 2: Data Warehousing & OLAP', topics: ['MOLAP, ROLAP, and HOLAP architectures', 'Star schema vs Snowflake schema vs Fact constellation', 'OLAP operations (Roll-up, Drill-down, Slice, Dice, Pivot)', 'ETL pipeline design'], completed: false },
      { id: 'dm-u3', title: 'Unit 3: Association Rule Mining', topics: ['Frequent itemset generation', 'Apriori algorithm & downward closure property', 'FP-Growth tree construction without candidate generation', 'Support, Confidence, and Lift metrics'], completed: false },
      { id: 'dm-u4', title: 'Unit 4: Classification Algorithms', topics: ['Decision Tree induction (ID3, C4.5, CART)', 'Information Gain & Gini Impurity', 'Naive Bayes classification', 'Evaluation metrics (ROC, AUC, F1-Score)'], completed: false },
      { id: 'dm-u5', title: 'Unit 5: Clustering & Outlier Detection', topics: ['Partitioning methods (k-Means, k-Medoids)', 'Hierarchical clustering (AGNES, DIANA)', 'Density-based clustering (DBSCAN)', 'Distance metrics (Euclidean, Manhattan, Cosine)'], completed: false },
    ],
    keyCheatSheet: [
      {
        title: 'Association Rule Metrics',
        items: [
          'Support(A -> B) = Count(A U B) / Total Transactions.',
          'Confidence(A -> B) = Count(A U B) / Count(A).',
          'Lift(A -> B) = Confidence(A -> B) / Support(B). (Lift > 1 implies positive correlation).',
        ],
      },
      {
        title: 'Data Warehouse Schemas',
        items: [
          'Star Schema: Central fact table connected directly to denormalized dimension tables.',
          'Snowflake Schema: Normalized dimension tables, reduces redundancy but requires extra joins.',
        ],
      },
    ],
  },
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    title: 'Mid-Semester Theory Examination: DBMS & OS',
    subjectId: 'dbms',
    examDate: '2026-10-24',
    time: '10:00 AM - 1:00 PM',
    venueOrMode: 'Department Hall 302 / Offline',
    syllabusCovered: 'DBMS Units 1-3 (ER, SQL, Normalization) & OS Units 1-3 (Scheduling, Sync, Deadlocks)',
    targetScore: 90,
    status: 'upcoming',
  },
  {
    id: 'exam-2',
    title: 'TCS National Qualifier Test (NQT) - Placement Drive',
    subjectId: 'all',
    examDate: '2026-11-08',
    time: '09:30 AM - 12:30 PM',
    venueOrMode: 'Online Proctor / TCS iON Center',
    syllabusCovered: 'Aptitude, Logical Reasoning, Verbal Ability, Hands-on Coding (2 problems)',
    targetScore: 85,
    status: 'upcoming',
  },
  {
    id: 'exam-3',
    title: 'End-Semester Final: Operating Systems & Data Mining',
    subjectId: 'os',
    examDate: '2026-12-14',
    time: '02:00 PM - 5:00 PM',
    venueOrMode: 'Main Exam Auditorium',
    syllabusCovered: 'All 5 Units of OS and Data Mining syllabus',
    targetScore: 92,
    status: 'upcoming',
  },
  {
    id: 'exam-4',
    title: 'GATE CSE 2027 Full-Length Mock Test 1',
    subjectId: 'all',
    examDate: '2026-12-28',
    time: '09:00 AM - 12:00 PM',
    venueOrMode: 'Virtual Computer-Based Test (CBT)',
    syllabusCovered: 'Complete Computer Science & Engineering syllabus',
    targetScore: 78,
    status: 'upcoming',
  },
];

export const INITIAL_TASKS: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Master BCNF & 3NF Lossless Decomposition proofs',
    subjectId: 'dbms',
    deadline: '2026-10-12',
    priority: 'high',
    status: 'in_progress',
    estimatedHours: 2.5,
    description: 'Solve 10 university previous-year questions on finding candidate keys and checking dependency preservation.',
  },
  {
    id: 'task-2',
    title: 'Simulate Banker Algorithm with resource-allocation graphs',
    subjectId: 'os',
    deadline: '2026-10-14',
    priority: 'high',
    status: 'pending',
    estimatedHours: 2.0,
    description: 'Understand safe sequence calculation, request-matrix equations, and Peterson algorithm code.',
  },
  {
    id: 'task-3',
    title: 'Practice 20 Time & Work problems (Man-Day & Pipes)',
    subjectId: 'aptitude',
    deadline: '2026-10-15',
    priority: 'medium',
    status: 'pending',
    estimatedHours: 1.5,
    description: 'Focus on alternate days and negative pipe work for upcoming campus placement tests.',
  },
  {
    id: 'task-4',
    title: 'Implement Detect & Remove Loop in Linked List (Floyd Cycle)',
    subjectId: 'programming',
    deadline: '2026-10-16',
    priority: 'high',
    status: 'pending',
    estimatedHours: 2.0,
    description: 'Write both C++ and Python implementations, review mathematical proof for meeting point.',
  },
  {
    id: 'task-5',
    title: 'Review Syllogisms Possibility Cases & Venn diagrams',
    subjectId: 'reasoning',
    deadline: '2026-10-18',
    priority: 'medium',
    status: 'completed',
    completedAt: '2026-10-09',
    estimatedHours: 1.5,
    description: 'Completed 25 questions from RS Aggarwal and TCS previous papers.',
  },
  {
    id: 'task-6',
    title: 'Trace Apriori Algorithm candidate itemset generation step-by-step',
    subjectId: 'data-mining',
    deadline: '2026-10-20',
    priority: 'medium',
    status: 'pending',
    estimatedHours: 2.0,
    description: 'Compute support and confidence for candidate sets L1, C2, L2, C3 on a sample transaction table.',
  },
  {
    id: 'task-7',
    title: 'Grammar Brushup: Subject-Verb agreement & Modifiers',
    subjectId: 'english',
    deadline: '2026-10-22',
    priority: 'low',
    status: 'pending',
    estimatedHours: 1.0,
    description: 'Review 30 common corporate test error spotting rules.',
  },
];

export const INITIAL_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    title: 'DBMS Normalization: 1NF to BCNF in a Nutshell',
    subjectId: 'dbms',
    tags: ['normalization', 'cheatsheet', 'exam-favorite'],
    isPinned: true,
    createdAt: '2026-10-02',
    updatedAt: '2026-10-08',
    content: `### Normalization Hierarchy
1. **1NF**: Atomic values only. No composite or multivalued attributes in columns.
2. **2NF**: In 1NF + No Partial Dependency.
   - Every non-prime attribute must depend on the WHOLE candidate key, not a proper subset of it.
3. **3NF**: In 2NF + No Transitive Dependency.
   - For every non-trivial FD X -> Y:
     - Either X is a Super Key, OR
     - Y is a Prime Attribute (member of any candidate key).
4. **BCNF (Boyce-Codd)**:
   - For EVERY non-trivial FD X -> Y, X MUST be a Super Key.
   - Stricter than 3NF. Always guarantees lossless decomposition, but does NOT always preserve dependencies.

### Candidate Key Finding Algorithm
- Take attribute closure (Attr)+ using Armstrong Axioms.
- If (Attr)+ contains all attributes of relation R, then Attr is a Super Key.
- If no proper subset of Attr can derive all attributes, Attr is a Candidate Key!`,
  },
  {
    id: 'note-2',
    title: 'Operating Systems: CPU Scheduling & Deadlock Coffman Conditions',
    subjectId: 'os',
    tags: ['scheduling', 'deadlock', 'gate'],
    isPinned: true,
    createdAt: '2026-10-04',
    updatedAt: '2026-10-09',
    content: `### CPU Scheduling Comparisons
- **SJF (Shortest Job First)**: Optimal for minimal average waiting time.
  - Preemptive variant is SRTF (Shortest Remaining Time First).
  - Can cause starvation for longer burst jobs.
- **Round Robin**: Time quantum 'q'.
  - If q is very large -> behaves like FCFS.
  - If q is very small -> excessive context switching overhead. Rule of thumb: 80% CPU bursts should be shorter than q.

### The 4 Coffman Deadlock Conditions
Deadlock occurs if and ONLY if all 4 conditions hold simultaneously:
1. **Mutual Exclusion**: Resources cannot be shared.
2. **Hold and Wait**: Process holding resources requests others.
3. **No Preemption**: System cannot forcibly take resources away.
4. **Circular Wait**: P0 waits for P1, P1 waits for P2 ... Pn waits for P0.

*To prevent deadlocks*: Deny ANY ONE of these 4 conditions! (e.g., Resource Ordering denies Circular Wait).`,
  },
  {
    id: 'note-3',
    title: 'Quantitative Aptitude: Time, Work & Speed Shortcuts',
    subjectId: 'aptitude',
    tags: ['shortcuts', 'placement', 'formulae'],
    isPinned: false,
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
    content: `### LCM Method for Work
- Assign total work as LCM of individual times.
- Calculate daily efficiency = Total Work / Individual Days.
- Example: A takes 12 days, B takes 15 days.
  - LCM(12, 15) = 60 units of work.
  - A efficiency = 60/12 = 5 units/day.
  - B efficiency = 60/15 = 4 units/day.
  - Together = 5 + 4 = 9 units/day.
  - Total days = 60 / 9 = 20/3 = 6.67 days.

### Relative Speed Rules
- Opposite direction: Speed_rel = S1 + S2
- Same direction: Speed_rel = |S1 - S2|
- Train crossing a pole: Distance = Length of train.
- Train crossing a platform/bridge: Distance = Length of train + Length of platform.`,
  },
  {
    id: 'note-4',
    title: 'Data Mining: Apriori vs FP-Growth & OLAP Operations',
    subjectId: 'data-mining',
    tags: ['kdd', 'apriori', 'olap'],
    isPinned: false,
    createdAt: '2026-10-07',
    updatedAt: '2026-10-07',
    content: `### Apriori Downward Closure Property
- If an itemset is frequent, all of its subsets must also be frequent.
- Conversely: If any subset is infrequent, the superset CANNOT be frequent (prune it!).
- Bottleneck: Generates many candidate itemsets and requires multiple full database scans.

### FP-Growth Advantage
- Compresses database into a compact FP-Tree.
- Mines frequent patterns without candidate generation using divide-and-conquer.

### OLAP 5 Core Operations
1. **Roll-up**: Climb up hierarchy (e.g., Day -> Month -> Quarter -> Year).
2. **Drill-down**: Reverse of roll-up, step down to finer detail.
3. **Slice**: Perform a selection on ONE dimension (e.g., Year = 2026).
4. **Dice**: Define a sub-cube by selecting TWO or more dimensions.
5. **Pivot / Rotate**: Rotate data axes in view to provide alternate 2D/3D presentation.`,
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // DBMS
  {
    id: 'q-dbms-1',
    subjectId: 'dbms',
    topic: 'Normalization',
    difficulty: 'medium',
    question: 'A relation R with attributes (A, B, C, D) has functional dependencies: A -> B, B -> C, C -> D, and D -> A. What is the highest normal form satisfied by R?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctAnswerIndex: 3,
    explanation: 'Since A -> B -> C -> D -> A forms a full cycle, every single attribute (A, B, C, D) is a candidate key. For every functional dependency X -> Y, the left-hand side X is a candidate key (hence super key). Thus, it satisfies BCNF.',
  },
  {
    id: 'q-dbms-2',
    subjectId: 'dbms',
    topic: 'ACID Properties & Transactions',
    difficulty: 'easy',
    question: 'Which component of a Database Management System ensures the "Durability" property of ACID transactions?',
    options: ['Query Optimizer', 'Concurrency Control Manager', 'Recovery Manager (Write-Ahead Logging)', 'Buffer Pool Manager'],
    correctAnswerIndex: 2,
    explanation: 'The Recovery Manager, together with the Write-Ahead Log (WAL), guarantees Durability by ensuring that all committed transactions survive system failures and power outages.',
  },
  {
    id: 'q-dbms-3',
    subjectId: 'dbms',
    topic: 'SQL Queries',
    difficulty: 'medium',
    question: 'In SQL, what is the key difference between the WHERE clause and the HAVING clause?',
    options: [
      'WHERE applies to aggregate functions; HAVING applies to individual rows',
      'WHERE filters rows before grouping; HAVING filters groups after GROUP BY aggregation',
      'WHERE is used only with SELECT; HAVING is used with UPDATE and DELETE',
      'There is no functional difference; they are interchangeable aliases',
    ],
    correctAnswerIndex: 1,
    explanation: 'WHERE filters rows before aggregation occurs. HAVING is evaluated after the GROUP BY clause to filter aggregate result sets (e.g., HAVING COUNT(*) > 5).',
  },

  // Operating Systems
  {
    id: 'q-os-1',
    subjectId: 'os',
    topic: 'Memory Management',
    difficulty: 'medium',
    question: 'What is Belady\'s Anomaly in operating systems page replacement algorithms?',
    options: [
      'LRU algorithm consumes twice as much memory as FIFO',
      'Increasing the number of page frames causes more page faults under FIFO',
      'Thrashing occurs when CPU utilization reaches 100%',
      'Page table lookups bypass the TLB during recursive calls',
    ],
    correctAnswerIndex: 1,
    explanation: 'Belady\'s Anomaly describes the phenomenon where increasing the number of physical frames allocated to a process results in an INCREASE in page faults. It can occur in FIFO, but never in stack-based algorithms like LRU or Optimal.',
  },
  {
    id: 'q-os-2',
    subjectId: 'os',
    topic: 'Deadlocks',
    difficulty: 'easy',
    question: 'Which of the following is NOT one of the four Coffman conditions necessary for deadlock?',
    options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption by High Priority', 'Circular Wait'],
    correctAnswerIndex: 2,
    explanation: 'The condition is "NO Preemption". Resources cannot be forcibly seized from a holding process until it releases them voluntarily. Preemption actually helps break deadlocks!',
  },
  {
    id: 'q-os-3',
    subjectId: 'os',
    topic: 'CPU Scheduling',
    difficulty: 'hard',
    question: 'In Round Robin CPU scheduling, if the time quantum is chosen to be extremely large (larger than the longest CPU burst), the algorithm degenerates to:',
    options: ['Shortest Job First (SJF)', 'First-Come, First-Served (FCFS)', 'Priority Scheduling', 'Multilevel Feedback Queue'],
    correctAnswerIndex: 1,
    explanation: 'When the time quantum exceeds any job\'s burst duration, every process executes to completion without being interrupted by a timer interrupt, behaving identically to FCFS.',
  },

  // Programming & DSA
  {
    id: 'q-prog-1',
    subjectId: 'programming',
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'What is the time complexity of detecting a cycle in a singly linked list with N nodes using Floyd\'s Cycle-Finding Algorithm (fast and slow pointers)?',
    options: ['O(log N) time, O(1) space', 'O(N) time, O(1) space', 'O(N) time, O(N) space', 'O(N log N) time, O(1) space'],
    correctAnswerIndex: 1,
    explanation: 'Floyd\'s Tortoise and Hare algorithm traverses the list with two pointers. The relative speed difference is 1 node per step, so they meet in at most O(N) steps with O(1) auxiliary space.',
  },
  {
    id: 'q-prog-2',
    subjectId: 'programming',
    topic: 'OOP Concepts',
    difficulty: 'easy',
    question: 'Which OOP mechanism allows a subclass to provide a specific implementation of a method that is already provided by its parent class?',
    options: ['Method Overloading', 'Method Overriding', 'Data Encapsulation', 'Dynamic Casting'],
    correctAnswerIndex: 1,
    explanation: 'Method Overriding is runtime polymorphism where a child class overrides a method inherited from its parent class with the exact same signature.',
  },
  {
    id: 'q-prog-3',
    subjectId: 'programming',
    topic: 'Trees',
    difficulty: 'medium',
    question: 'In a Binary Search Tree (BST), which tree traversal produces keys in non-decreasing sorted order?',
    options: ['Pre-order (Root-Left-Right)', 'In-order (Left-Root-Right)', 'Post-order (Left-Right-Root)', 'Level-order (BFS)'],
    correctAnswerIndex: 1,
    explanation: 'An in-order traversal (Left subtree -> Root -> Right subtree) on a valid BST always visits nodes in ascending sorted sequence.',
  },

  // Quantitative Aptitude
  {
    id: 'q-apt-1',
    subjectId: 'aptitude',
    topic: 'Time & Work',
    difficulty: 'medium',
    question: 'A can complete a piece of work in 12 days, and B can complete it in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    options: ['4/9', '5/9', '7/18', '11/18'],
    correctAnswerIndex: 0,
    explanation: 'In 1 day, together they do (1/12 + 1/18) = (3 + 2)/36 = 5/36 of the work. In 4 days, they do 4 * (5/36) = 20/36 = 5/9 of the work. Remaining work = 1 - 5/9 = 4/9.',
  },
  {
    id: 'q-apt-2',
    subjectId: 'aptitude',
    topic: 'Speed & Distance',
    difficulty: 'easy',
    question: 'A train 150 meters long passes an electric telegraph pole in 10 seconds. What is the speed of the train in km/h?',
    options: ['45 km/h', '54 km/h', '60 km/h', '72 km/h'],
    correctAnswerIndex: 1,
    explanation: 'Speed = Distance / Time = 150m / 10s = 15 m/s. Converting m/s to km/h: 15 * (18 / 5) = 3 * 18 = 54 km/h.',
  },
  {
    id: 'q-apt-3',
    subjectId: 'aptitude',
    topic: 'Profit & Loss',
    difficulty: 'medium',
    question: 'An article is sold at a 20% profit. If both the cost price and selling price were $100 less, the profit would be 25%. What is the original cost price?',
    options: ['$500', '$600', '$750', '$800'],
    correctAnswerIndex: 0,
    explanation: 'Let CP = x. SP = 1.2x. New CP = x - 100, New SP = 1.2x - 100. New profit is 25%, so New SP = 1.25 * (New CP) => 1.2x - 100 = 1.25(x - 100) = 1.25x - 125 => 0.05x = 25 => x = $500.',
  },

  // Logical Reasoning
  {
    id: 'q-lr-1',
    subjectId: 'reasoning',
    topic: 'Syllogisms',
    difficulty: 'medium',
    question: 'Statements: "All cars are vehicles. No vehicle is an airplane." Conclusions: I. No car is an airplane. II. Some vehicles are cars.',
    options: ['Only I follows', 'Only II follows', 'Neither I nor II follows', 'Both I and II follow'],
    correctAnswerIndex: 3,
    explanation: 'Since cars are completely inside the set of vehicles, and vehicles have zero intersection with airplanes, cars cannot intersect airplanes (I follows). Since all cars are vehicles, some vehicles are certainly cars (II follows). Both follow.',
  },
  {
    id: 'q-lr-2',
    subjectId: 'reasoning',
    topic: 'Direction Sense',
    difficulty: 'easy',
    question: 'Rohan walks 20m North, turns right and walks 30m, turns right again and walks 20m. How far and in what direction is he from his starting point?',
    options: ['30m East', '30m West', '40m North', '50m North-East'],
    correctAnswerIndex: 0,
    explanation: 'Moving North 20m, then East 30m, then South 20m returns him to the same horizontal line. He is exactly 30 meters East of his origin.',
  },

  // Verbal Ability
  {
    id: 'q-eng-1',
    subjectId: 'english',
    topic: 'Subject-Verb Agreement',
    difficulty: 'easy',
    question: 'Choose the grammatically correct sentence:',
    options: [
      'The director, along with his team members, are attending the symposium.',
      'The director, along with his team members, is attending the symposium.',
      'The director, along with his team members, have been attending the symposium.',
      'The director, along with his team members, were attending the symposium.',
    ],
    correctAnswerIndex: 1,
    explanation: 'Phrases introduced by "along with", "together with", or "as well as" are parenthetical and do not alter the grammatical number of the subject. The subject is "The director" (singular), requiring "is attending".',
  },
  {
    id: 'q-eng-2',
    subjectId: 'english',
    topic: 'Vocabulary',
    difficulty: 'medium',
    question: 'What is the closest synonym for the word "EPHEMERAL"?',
    options: ['Enduring', 'Transient', 'Obsolete', 'Resilient'],
    correctAnswerIndex: 1,
    explanation: '"Ephemeral" means lasting for a very short time; fleeting or transient. (Enduring and resilient are antonyms).',
  },

  // Data Mining
  {
    id: 'q-dm-1',
    subjectId: 'data-mining',
    topic: 'Association Rule Mining',
    difficulty: 'medium',
    question: 'In a transaction database of 100 transactions, itemset {Milk, Bread} appears in 20 transactions, and {Milk} appears in 40 transactions. What is the confidence of the rule {Milk} -> {Bread}?',
    options: ['20%', '40%', '50%', '80%'],
    correctAnswerIndex: 2,
    explanation: 'Confidence({Milk} -> {Bread}) = Support({Milk, Bread}) / Support({Milk}) = 20 / 40 = 0.50 or 50%.',
  },
  {
    id: 'q-dm-2',
    subjectId: 'data-mining',
    topic: 'Data Warehousing',
    difficulty: 'easy',
    question: 'Which dimensional modeling schema in a data warehouse normalizes dimension tables into multiple related sub-tables?',
    options: ['Star Schema', 'Snowflake Schema', 'Fact Constellation Schema', 'Galaxy Schema'],
    correctAnswerIndex: 1,
    explanation: 'A Snowflake schema normalizes dimension tables into multiple related tables, resembling a snowflake structure, saving storage space at the cost of additional join operations.',
  },
  {
    id: 'q-dm-3',
    subjectId: 'data-mining',
    topic: 'Clustering',
    difficulty: 'medium',
    question: 'Which clustering algorithm requires pre-specifying the parameter k (number of clusters) and is sensitive to outliers and initial centroid placement?',
    options: ['DBSCAN', 'Hierarchical Agglomerative', 'k-Means Clustering', 'OPTICS'],
    correctAnswerIndex: 2,
    explanation: 'k-Means requires setting k in advance, calculates centroids based on mean positions (which makes it sensitive to extreme outliers), and can converge to local optima depending on initial seeds.',
  },
];

export const INITIAL_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-1',
    subjectId: 'dbms',
    topic: 'Indexing & B-Trees',
    question: 'Why do relational databases use B+ Trees instead of Binary Search Trees (BST) or Hash Indexes for table indexing?',
    difficulty: 'hard',
    companies: ['Amazon', 'Microsoft', 'Google', 'Oracle'],
    answerGuide: `1. **Disk I/O Minimization**: B+ Trees have a high branching factor (fan-out of 100-1000). A tree of millions of rows has a height of only 3 or 4, requiring minimal disk reads. BSTs are deep, causing excessive random disk seeks.
2. **Range Queries**: In B+ Trees, all actual data pointers are located strictly in the leaf nodes, which are linked in a continuous doubly-linked list. Range queries (e.g. \`WHERE age BETWEEN 20 AND 30\`) simply find the first leaf node and traverse sequentially. Hash indexes cannot do range scans at all.
3. **Predictable Performance**: B+ Trees remain balanced after every insert/delete, guaranteeing O(log_B N) search time.`,
    keyTakeaways: [
      'B+ Tree leaves are linked sequentially for fast O(1) range traversal.',
      'High fan-out keeps tree height <= 4, minimizing disk I/O.',
      'Hash indexing is O(1) for exact equality, but useless for range queries or sorting.',
    ],
    mastered: false,
    bookmarked: true,
  },
  {
    id: 'iq-2',
    subjectId: 'os',
    topic: 'Virtual Memory & Thrashing',
    question: 'What is Thrashing in an Operating System? How does the OS detect and prevent it?',
    difficulty: 'medium',
    companies: ['TCS', 'Infosys', 'Cognizant', 'Qualcomm'],
    answerGuide: `1. **Definition**: Thrashing occurs when a computer spends more time paging (swapping pages between RAM and disk) than executing actual instructions.
2. **Cause**: The sum of working set sizes of all active processes exceeds the total physical memory available. A process page-faults, requests a page, replaces another active page, which immediately page-faults as well.
3. **Prevention**:
   - **Working Set Model**: The OS tracks the working set size WSS_i (pages accessed in the last Delta time units). If Sum(WSS_i) > Total RAM, the OS suspends/swaps out one or more entire processes.
   - **Page Fault Frequency (PFF)**: Set upper and lower thresholds for page fault rates. If rate > Upper, give the process more frames. If frames are exhausted, suspend a process.`,
    keyTakeaways: [
      'Thrashing causes CPU utilization to plummet because processes are perpetually blocked waiting on disk I/O.',
      'Working Set Strategy and Page Fault Frequency are primary OS defense mechanisms.',
    ],
    mastered: true,
    bookmarked: false,
  },
  {
    id: 'iq-3',
    subjectId: 'programming',
    topic: 'Object Oriented Programming',
    question: 'Explain the difference between Compile-time Polymorphism and Run-time Polymorphism with real code examples.',
    difficulty: 'easy',
    companies: ['TCS', 'Wipro', 'Accenture', 'Capgemini'],
    answerGuide: `1. **Compile-time (Static) Polymorphism**:
   - Resolved at compile time.
   - Implemented via Method Overloading (same method name, different parameter types/count) or Operator Overloading.
   - Fast execution because function call address is bound during compilation.

2. **Run-time (Dynamic) Polymorphism**:
   - Resolved at runtime based on the actual object instance.
   - Implemented via Method Overriding using \`virtual\` functions in C++ or \`@Override\` in Java.
   - The compiler creates a Virtual Method Table (vtable), and each object has a pointer (vptr) pointing to its class vtable.`,
    keyTakeaways: [
      'Overloading = Static binding (compile time). Overriding = Dynamic dispatch (runtime via vtable).',
      'Virtual destructor is critical in C++ base classes to avoid memory leaks when deleting via base pointer.',
    ],
    mastered: false,
    bookmarked: true,
  },
  {
    id: 'iq-4',
    subjectId: 'dbms',
    topic: 'Transactions',
    question: 'Explain the differences between Dirty Read, Non-Repeatable Read, and Phantom Read anomalies.',
    difficulty: 'medium',
    companies: ['Amazon', 'Flipkart', 'Cisco'],
    answerGuide: `These are isolation anomalies defined in SQL-92 standards:
1. **Dirty Read (Read Uncommitted)**: Transaction T1 reads data modified by T2 that has NOT yet been committed. If T2 later rolls back, T1 processed phantom/invalid data.
2. **Non-Repeatable Read (Read Committed)**: T1 reads a row. T2 modifies or deletes that row and commits. T1 re-reads the same row and gets a different value.
3. **Phantom Read (Repeatable Read)**: T1 executes a query with a range predicate (e.g. \`WHERE salary > 50000\`). T2 inserts a new row satisfying the predicate and commits. T1 re-executes the query and sees a new "phantom" row.
- **Serializable Isolation** prevents all three anomalies.`,
    keyTakeaways: [
      'Read Uncommitted allows Dirty Reads.',
      'Read Committed prevents Dirty Reads.',
      'Repeatable Read prevents Dirty & Non-Repeatable Reads.',
      'Serializable prevents all three.',
    ],
    mastered: false,
    bookmarked: false,
  },
  {
    id: 'iq-5',
    subjectId: 'data-mining',
    topic: 'K-Means & DBSCAN',
    question: 'Compare K-Means and DBSCAN clustering. When would you prefer DBSCAN over K-Means?',
    difficulty: 'medium',
    companies: ['ZS Associates', 'Mu Sigma', 'Tiger Analytics', 'Fractal'],
    answerGuide: `1. **K-Means**:
   - Assumes spherical, equal-variance clusters.
   - Sensitive to outliers (they skew the centroid calculation).
   - Requires knowing 'k' beforehand (often determined via Elbow Method or Silhouette analysis).

2. **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)**:
   - Does NOT require specifying cluster count. Finds arbitrary shapes (crescents, rings, spirals).
   - Robust to outliers: explicitly classifies sparse noise points as outliers (label -1).
   - Parameters: eps (radius) and minPts (minimum samples in neighborhood).
- **Preference**: Use DBSCAN when clusters have arbitrary geometric shapes, when data contains noise/outliers, or when 'k' is unknown.`,
    keyTakeaways: [
      'DBSCAN detects arbitrary cluster shapes and filters noise; k-Means is restricted to convex spherical clusters.',
      'DBSCAN struggles with datasets with drastically varying density.',
    ],
    mastered: false,
    bookmarked: true,
  },
];

export const INITIAL_CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'code-1',
    title: 'Two Sum (Array Hash Map Pattern)',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: ['Amazon', 'Google', 'TCS Digital', 'Infosys SP'],
    problemStatement: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.
You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

**Example 1:**
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]`,
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`,
    },
    solutionCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    lookup = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in lookup:
            return [lookup[diff], i]
        lookup[n] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (mp.count(need)) return {mp[need], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
    },
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]' },
    ],
    timeComplexity: 'O(N) single-pass lookup',
    spaceComplexity: 'O(N) for hash table storage',
    status: 'solved',
  },
  {
    id: 'code-2',
    title: 'Valid Parentheses (Monotonic Stack)',
    difficulty: 'Easy',
    topic: 'Stack & Strings',
    companies: ['Microsoft', 'Infosys', 'Wipro Turbo', 'Accenture'],
    problemStatement: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
Input: s = "()" -> Output: true

**Example 2:**
Input: s = "()[]{}" -> Output: true

**Example 3:**
Input: s = "(]" -> Output: false`,
    starterCode: {
      javascript: `function isValid(s) {
  // Use a stack to track open brackets
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top_elem = stack.pop() if stack else '#'
            if mapping[char] != top_elem:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `#include <string>
#include <stack>

bool isValid(std::string s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return st.empty();
}`,
    },
    solutionCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };
  for (let c of s) {
    if (c in pairs) {
      if (stack.pop() !== pairs[c]) return false;
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s):
    st = []
    d = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in d:
            if not st or st.pop() != d[c]:
                return False
        else:
            st.append(c)
    return len(st) == 0`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.empty() || st.top() != c) return false;
        else st.pop();
    }
    return st.empty();
}`,
    },
    testCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' },
    ],
    timeComplexity: 'O(N) where N is string length',
    spaceComplexity: 'O(N) worst case for all opening brackets',
    status: 'unsolved',
  },
  {
    id: 'code-3',
    title: 'SQL: Find the N-th Highest Salary',
    difficulty: 'Medium',
    topic: 'Database & SQL',
    companies: ['Amazon', 'Goldman Sachs', 'TCS Digital', 'Cognizant'],
    problemStatement: `Write an SQL query to report the N-th highest salary from the \`Employee\` table. If there is no N-th highest salary, the query should report \`null\`.

Table: Employee
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+

Example for N = 2:
Output: 200`,
    starterCode: {
      javascript: `// SQL Query representation:
// SELECT DISTINCT salary 
// FROM Employee 
// ORDER BY salary DESC 
// LIMIT 1 OFFSET (N - 1);`,
      python: `# Using Pandas representation:
def nth_highest_salary(employee_df, n):
    unique_salaries = employee_df['salary'].drop_duplicates().sort_values(ascending=False)
    if len(unique_salaries) < n:
        return None
    return unique_salaries.iloc[n - 1]`,
      cpp: `// SQL Query representation:
// SELECT IFNULL(
//   (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET N-1),
//   NULL
// ) AS getNthHighestSalary;`,
    },
    solutionCode: {
      javascript: `SELECT IFNULL(
  (SELECT DISTINCT salary 
   FROM Employee 
   ORDER BY salary DESC 
   LIMIT 1 OFFSET (N - 1)),
  NULL
) AS getNthHighestSalary;`,
      python: `SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as ranking
  FROM Employee
) as ranked_emp
WHERE ranking = N
LIMIT 1;`,
      cpp: `SELECT (
  SELECT DISTINCT salary 
  FROM Employee 
  ORDER BY salary DESC 
  LIMIT 1 OFFSET 1 -- For 2nd highest salary
) AS SecondHighestSalary;`,
    },
    testCases: [
      { input: 'Employee salaries: [100, 200, 300], N = 2', expectedOutput: '200' },
      { input: 'Employee salaries: [100], N = 2', expectedOutput: 'null' },
    ],
    timeComplexity: 'O(N log N) with index or sorting',
    spaceComplexity: 'O(1) with B-Tree index scan',
    status: 'unsolved',
  },
];

export const INITIAL_LOGS: StudySessionLog[] = [
  { id: 'log-1', date: '2026-10-06', minutes: 120, subjectId: 'dbms', notes: 'Solved 10 normalization problems.' },
  { id: 'log-2', date: '2026-10-07', minutes: 90, subjectId: 'os', notes: 'Reviewed CPU scheduling and Banker algorithm.' },
  { id: 'log-3', date: '2026-10-08', minutes: 110, subjectId: 'aptitude', notes: 'Completed Time & Work exercises.' },
  { id: 'log-4', date: '2026-10-09', minutes: 80, subjectId: 'programming', notes: 'Two-pointer technique & leetcode medium.' },
];
