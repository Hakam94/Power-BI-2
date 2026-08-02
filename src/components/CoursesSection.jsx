import React, { useState } from 'react';
import { 
  BarChart3, 
  Database, 
  Snowflake, 
  Code2, 
  Layers, 
  Bot, 
  Check, 
  Clock, 
  Sparkles, 
  ArrowRight,
  X,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export default function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = ['All', 'Business Intelligence', 'Data Engineering', 'AI & Automation'];

  const courses = [
    {
      id: 'powerbi',
      title: 'Power BI Masterclass 2026',
      category: 'Business Intelligence',
      level: 'All Levels',
      duration: '24 Hours',
      badge: 'Bestseller',
      icon: BarChart3,
      color: '#F2C811',
      description: 'Master DAX, Star Schema Data Modeling, RLS, Power Query M-Code, and Executive Dashboard UX Design.',
      curriculum: [
        'Star Schema & Snowflake Schema Design Patterns',
        'Advanced DAX: Time Intelligence, CALCULATE & Variables',
        'Row-Level Security (RLS) & Workspace Roles',
        'DirectQuery & Hybrid Table Optimization',
        'Mobile Dashboard UX & Automated Email Alerts'
      ],
      project: 'Build a Multi-Currency Enterprise Executive Financial Dashboard'
    },
    {
      id: 'sql',
      title: 'Modern SQL & Data Warehousing',
      category: 'Data Engineering',
      level: 'Beginner to Advanced',
      duration: '18 Hours',
      badge: 'Essential',
      icon: Database,
      color: '#00D2FF',
      description: 'Complex JOINs, Window Functions, CTEs, Indexing, and Query Optimization for High-Scale Warehouses.',
      curriculum: [
        'Complex Multi-Table INNER, LEFT & FULL Outer Joins',
        'Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)',
        'Common Table Expressions (CTEs) & Recursive Queries',
        'Index Tuning, Execution Plans & Query Bottlenecks',
        'Data Mart Schema Architecture & ETL Staging'
      ],
      project: 'Architect a Scalable E-Commerce Data Mart in PostgreSQL'
    },
    {
      id: 'snowflake',
      title: 'Snowflake Cloud Data Platform',
      category: 'Data Engineering',
      level: 'Intermediate',
      duration: '14 Hours',
      badge: 'Cloud Enterprise',
      icon: Snowflake,
      color: '#00D2FF',
      description: 'Virtual Warehouses, Zero-Copy Cloning, Time Travel, Dynamic Data Masking, and Snowpark Python.',
      curriculum: [
        'Virtual Warehouse Sizing & Auto-Suspend Cost Controls',
        'Zero-Copy Cloning & Time Travel Disaster Recovery',
        'Role-Based Access Control (RBAC) & Column Masking',
        'Snowpipe Automated Ingestion from AWS S3 / Azure Blob',
        'Snowpark Dataframe Transformations in Python'
      ],
      project: 'Deploy an Automated Snowpipe Ingestion Pipeline'
    },
    {
      id: 'python',
      title: 'Python for Data Science & Automation',
      category: 'Data Engineering',
      level: 'All Levels',
      duration: '20 Hours',
      badge: 'Hands-On',
      icon: Code2,
      color: '#3776AB',
      description: 'Pandas, NumPy, Automated Web Scraping, REST API Data Extraction, and Automated Report Emailing.',
      curriculum: [
        'Pandas DataFrame Cleaning & Advanced Merging',
        'API Data Extraction with Requests & OAuth2 Authentication',
        'Automated Excel Report Generation & Email Dispatch',
        'Exploratory Data Analysis (EDA) & Seaborn Visualization',
        'Production Script Packaging & Cron Scheduling'
      ],
      project: 'Automate Daily API Extraction & Push to SQL Database'
    },
    {
      id: 'fabric',
      title: 'Microsoft Fabric & OneLake Architecture',
      category: 'Data Engineering',
      level: 'Advanced',
      duration: '16 Hours',
      badge: 'Next-Gen',
      icon: Layers,
      color: '#7B2CBF',
      description: 'Lakehouse vs Data Warehouse, Direct Lake Mode, Delta Parquet Tables, Data Factory, and Copilot AI.',
      curriculum: [
        'OneLake Delta Lake Table Architecture',
        'Direct Lake Mode for Instant Power BI Queries',
        'Data Factory Pipelines & Notebook Transformations',
        'Real-Time Intelligence & Eventstreams Ingestion',
        'Copilot AI Integration for Fabric Pipelines'
      ],
      project: 'Construct an Enterprise OneLake Direct Lake Pipeline'
    },
    {
      id: 'ai-mcp',
      title: 'AI & MCP for Data Analysts',
      category: 'AI & Automation',
      level: 'All Levels',
      duration: '12 Hours',
      badge: 'Cutting-Edge',
      icon: Bot,
      color: '#BFFF00',
      description: 'Leverage ChatGPT, Claude, and Model Context Protocol (MCP) to auto-generate SQL, DAX, and BI Reports.',
      curriculum: [
        'Prompt Engineering for Complex SQL & DAX Generation',
        'Model Context Protocol (MCP) Client-Server Architecture',
        'Connecting LLMs Safely to Snowflake & Postgres Warehouses',
        'Automated Data Quality Audit Agents',
        'Building Custom MCP Tools for Power BI Automation'
      ],
      project: 'Build an Autonomous AI MCP Data Agent for Exec Reports'
    }
  ];

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-[#0B0B0B]">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F2C811] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mastery Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Interactive Courses & Programs
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Practical enterprise skill tracks designed to take you from fundamentals to senior data leadership.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-[#F2C811] text-black font-semibold border-[#F2C811] shadow-lg shadow-yellow-500/20'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const CourseIcon = course.icon;
            return (
              <div 
                key={course.id}
                className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between glass-card-hover group relative overflow-hidden"
              >
                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-gray-300">
                      {course.badge}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      {course.duration}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <CourseIcon className="w-6 h-6" style={{ color: course.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-snug font-heading">{course.title}</h3>
                      <span className="text-[11px] font-mono text-[#00D2FF]">{course.level}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>

                {/* Project Highlight & CTA */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono text-gray-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#BFFF00]" />
                    <span>Includes Production Capstone</span>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#F2C811] hover:text-black text-white font-semibold text-xs font-mono transition-all duration-200 flex items-center justify-center gap-2 group-hover:border-yellow-500/50"
                  >
                    <span>View Curriculum & Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative bg-[#0D0E12]">
            
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <selectedCourse.icon className="w-6 h-6" style={{ color: selectedCourse.color }} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#F2C811]">{selectedCourse.badge}</span>
                <h3 className="text-2xl font-bold text-white font-heading">{selectedCourse.title}</h3>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {selectedCourse.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
                Key Learning Modules
              </h4>
              <div className="space-y-2">
                {selectedCourse.curriculum.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#BFFF00] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-[11px] font-mono text-[#F2C811] block mb-1">CAPSTONE PROJECT</span>
              <p className="text-xs font-bold text-white">{selectedCourse.project}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-2.5 rounded-full text-xs font-mono text-gray-400 hover:text-white"
              >
                Close
              </button>
              <a
                href="https://www.youtube.com/@HakamDataStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#F2C811] text-black font-bold text-xs font-mono shadow-lg shadow-yellow-500/20 hover:bg-yellow-400"
              >
                Start Learning Free on YouTube
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
