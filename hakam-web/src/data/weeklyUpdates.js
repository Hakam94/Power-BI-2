// Weekly Best Practices content.
//
// Each entry is one editorial update: what changed in a tool, a concrete
// before/after code rewrite showing how the practice changes, an editorial
// "job market signal" note (Hakam's own read of what he's seeing in job
// descriptions — not a scraped/automated LinkedIn statistic), and a
// References section linking to primary sources. New entries get added
// here weekly; this file is the single source of truth for both the
// homepage teaser and the /weekly archive + article pages.
//
// Editorial workflow: every new entry starts as status: 'draft'. Drafts are
// EXCLUDED from the homepage teaser and the /weekly archive listing, but the
// article page at /weekly/<slug> still renders (with a visible "Draft —
// Pending Review" banner) once deployed, so Hakam can open the direct link
// to review/edit before it goes public. Only flip status to 'published'
// (and set a real `date`) once he's approved it — that's what makes it show
// up in the archive and teaser.

export const weeklyUpdates = [
  {
    slug: 'dax-user-defined-functions',
    status: 'published',
    title: 'DAX User-Defined Functions Are Now GA — Stop Copy-Pasting Measure Logic',
    tool: 'Power BI',
    date: '2026-08-17',
    readTime: '6 min read',
    tags: ['Power BI', 'DAX', 'Semantic Model'],
    summary:
      'DAX User-Defined Functions (UDFs) reached general availability in Power BI Desktop and the Power BI Service in the June 2026 release. You can now define a reusable, parameterized DAX function once in your semantic model and call it from any measure — instead of copy-pasting the same DIVIDE/CALCULATE pattern into every YoY, MoM, or margin measure you write.',
    whatChanged: [
      'DAX UDFs are defined with the FUNCTION keyword inside a DEFINE block: FUNCTION <Name> = ( <Parameter>: <Type>, ... ) => <Body>.',
      'Functions can take 0–12 parameters, including reference types like MEASUREREF, COLUMNREF, TABLEREF, and CALENDARREF — so a function can accept "a measure" or "a column" as an argument, not just a scalar value.',
      'Requires semantic model compatibility level 1702 or higher.',
      'Functions can be authored and edited in DAX query view (DQV) or directly in TMDL, and once added to the model they can be called from any measure or DAX query.',
      'Optional parameters with default values are supported, so a function can expose simple defaults for common cases while still allowing overrides.'
    ],
    codeLanguage: 'dax',
    codeBefore: `Sales YoY % =
DIVIDE(
    [Total Sales] - CALCULATE( [Total Sales], SAMEPERIODLASTYEAR( 'Date'[Date] ) ),
    CALCULATE( [Total Sales], SAMEPERIODLASTYEAR( 'Date'[Date] ) )
)

Profit YoY % =
DIVIDE(
    [Total Profit] - CALCULATE( [Total Profit], SAMEPERIODLASTYEAR( 'Date'[Date] ) ),
    CALCULATE( [Total Profit], SAMEPERIODLASTYEAR( 'Date'[Date] ) )
)

Units YoY % =
DIVIDE(
    [Total Units] - CALCULATE( [Total Units], SAMEPERIODLASTYEAR( 'Date'[Date] ) ),
    CALCULATE( [Total Units], SAMEPERIODLASTYEAR( 'Date'[Date] ) )
)`,
    codeAfter: `DEFINE
    FUNCTION YoYPercent = (
        Measure: MEASUREREF
    ) =>
        VAR CurrentValue   = Measure
        VAR PriorYearValue = CALCULATE( Measure, SAMEPERIODLASTYEAR( 'Date'[Date] ) )
        RETURN
            DIVIDE( CurrentValue - PriorYearValue, PriorYearValue )

Sales YoY %  = YoYPercent( [Total Sales] )
Profit YoY % = YoYPercent( [Total Profit] )
Units YoY %  = YoYPercent( [Total Units] )`,
    whyItMatters:
      'The logic lives in exactly one place. If the YoY comparison window changes (say, from SAMEPERIODLASTYEAR to a custom fiscal calendar function), you edit YoYPercent once and every measure that calls it updates automatically — instead of hunting down and re-editing every copy-pasted measure across the model, which is where these calculations quietly drift out of sync today.',
    trendNote:
      'Editorial note, not a scraped statistic: reviewing Power BI / data analyst job descriptions week to week, "semantic model" and "reusable DAX" language is showing up more often alongside the usual DAX/Power Query requirements — consistent with Microsoft pushing UDFs and model-level reuse as a core skill, not just a Desktop-file trick. Worth having a talking point ready for interviews.',
    references: [
      {
        label: 'Using DAX user-defined functions — Power BI (Microsoft Learn)',
        url: 'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-user-defined-functions-overview'
      },
      {
        label: 'Use DAX user-defined functions — DAX (Microsoft Learn)',
        url: 'https://learn.microsoft.com/en-us/dax/best-practices/dax-user-defined-functions'
      },
      {
        label: 'Introducing user-defined functions in DAX (SQLBI)',
        url: 'https://www.sqlbi.com/articles/introducing-user-defined-functions-in-dax/'
      },
      {
        label: 'Understanding parameter types in DAX user-defined functions (SQLBI)',
        url: 'https://www.sqlbi.com/articles/understanding-parameter-types-in-dax-user-defined-functions-udf/'
      },
      {
        label: 'DAX User-Defined Functions (DAX UDFs) for Power BI in simple terms (Tabular Editor)',
        url: 'https://tabulareditor.com/blog/dax-user-defined-functions-dax-udfs-for-power-bi-in-simple-terms'
      },
      {
        label: 'DAXLib — open-source repository of model-independent DAX UDFs',
        url: 'https://daxlib.org/'
      }
    ]
  },
  {
    slug: 'snowflake-ai-classify',
    status: 'draft',
    title: 'Snowflake Retired CLASSIFY_TEXT for AI_CLASSIFY — Here\'s the Rewrite',
    tool: 'Snowflake',
    date: '2026-08-18',
    readTime: '5 min read',
    tags: ['Snowflake', 'Cortex AI', 'SQL'],
    summary:
      'Snowflake Cortex\'s AI_CLASSIFY function reached general availability in November 2025 as the replacement for the older SNOWFLAKE.CORTEX.CLASSIFY_TEXT function, which Snowflake has marked for deprecation by the end of 2026. AI_CLASSIFY runs classification natively in SQL — no external ML pipeline — and adds multi-label output, task descriptions, and image classification that CLASSIFY_TEXT never had.',
    whatChanged: [
      'AI_CLASSIFY is the GA replacement for the legacy SNOWFLAKE.CORTEX.CLASSIFY_TEXT function; Snowflake has stated CLASSIFY_TEXT will be deprecated by the end of 2026.',
      'AI_CLASSIFY supports both single-label (default) and multi-label classification via an output_mode option — CLASSIFY_TEXT only ever returned one label.',
      'An optional task_description (50 words or fewer) can be passed to give the model context about the classification task, improving accuracy on ambiguous inputs.',
      'AI_CLASSIFY is one of several functions renamed under Snowflake\'s new AI_ prefix convention — AI_EXTRACT replaces the older EXTRACT_ANSWER the same way.',
      'Categories still need 2–100 unique, case-sensitive entries in both the old and new function — that constraint didn\'t change.'
    ],
    codeLanguage: 'sql',
    codeBefore: `SELECT
    feedback_id,
    feedback_text,
    SNOWFLAKE.CORTEX.CLASSIFY_TEXT(
        feedback_text,
        ['Product', 'Customer Service', 'Delivery', 'Price']
    ):label::STRING AS feedback_category
FROM customer.feedback;`,
    codeAfter: `SELECT
    feedback_id,
    feedback_text,
    AI_CLASSIFY(
        feedback_text,
        ['Product', 'Customer Service', 'Delivery', 'Price'],
        {
            'task_description': 'Classify support feedback by the main topic the customer is raising'
        }
    ):labels[0]::STRING AS feedback_category
FROM customer.feedback;`,
    whyItMatters:
      'Beyond just avoiding a deprecated function, AI_CLASSIFY\'s task_description gives the model context CLASSIFY_TEXT never accepted, which matters most on ambiguous tickets ("the box arrived late and damaged" — Delivery or Product?). And because output_mode can flip to \'multi\', the same call can tag a ticket with several relevant categories instead of forcing a single label — useful for feedback that genuinely spans more than one topic.',
    trendNote:
      'Editorial note, not a scraped statistic: Snowflake / Cortex-related postings increasingly list "AI SQL functions" or "in-database AI" alongside standard SQL and warehousing skills, rather than treating LLM/ML work as a separate specialization. Worth knowing the AI_ function family by name, not just "Snowflake has some AI stuff now."',
    references: [
      {
        label: 'AI_CLASSIFY — Snowflake Documentation',
        url: 'https://docs.snowflake.com/en/sql-reference/functions/ai_classify'
      },
      {
        label: 'CLASSIFY_TEXT (SNOWFLAKE.CORTEX) — Snowflake Documentation (legacy, deprecating end of 2026)',
        url: 'https://docs.snowflake.com/en/sql-reference/functions/classify_text-snowflake-cortex'
      },
      {
        label: 'Nov 04, 2025: Cortex AI Functions (General Availability) — Snowflake Release Notes',
        url: 'https://docs.snowflake.com/en/release-notes/2025/other/2025-11-04-cortex-aisql-operators-ga'
      },
      {
        label: 'Cortex AI Functions (including LLM functions) — Snowflake Documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql'
      },
      {
        label: 'Snowflake AI SQL User Guide: AI_CLASSIFY (Snowflake Builders Blog)',
        url: 'https://medium.com/snowflake/snowflake-ai-sql-user-guide-ai-classify-15e3d474293f'
      }
    ]
  }
];

export function getWeeklyUpdateBySlug(slug) {
  return weeklyUpdates.find((update) => update.slug === slug);
}

export function getPublishedWeeklyUpdates() {
  return weeklyUpdates.filter((update) => update.status === 'published');
}

export function getLatestWeeklyUpdates(count = 3) {
  return [...getPublishedWeeklyUpdates()]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}
