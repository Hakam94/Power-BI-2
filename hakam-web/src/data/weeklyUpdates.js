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
    slug: 'weekly-roundup-2026-08-18',
    status: 'published',
    title: 'Weekly Data & AI Roundup — Aug 18, 2026',
    date: '2026-08-18',
    readTime: '16 min read',
    tags: ['Power BI', 'Databricks', 'Snowflake', 'Job Market'],
    summary:
      'This week: Power BI\'s visual calculations reached GA with a new ORDERBY parameter (July 2026 release), Databricks Unity Catalog can now natively manage Apache Iceberg tables (no more Delta+UniForm workaround), and Snowflake\'s legacy CLASSIFY_TEXT function is being replaced by AI_CLASSIFY ahead of its end-of-2026 deprecation. Plus three tools worth watching, and a sourced look at which skills actually show up most in data analyst job postings right now.',
    toolSections: [
      {
        tool: 'Power BI',
        headline: 'Visual Calculations Reach GA — Running Totals Get an ORDERBY Parameter',
        whatChanged: [
          'Visual calculations (DAX written directly on a visual instead of in the model) reached general availability in the July 2026 Power BI release.',
          'Visual-calculation-exclusive window functions — RUNNINGSUM, MOVINGAVERAGE, PREVIOUS, and others — now accept an optional ORDERBY parameter, letting you control the sort order the calculation uses independently of how the visual itself is currently sorted.',
          'Without ORDERBY, a visual calculation sorts by the visual\'s default axis order; with it, a running sum can accumulate in, say, descending sales order for a Pareto chart regardless of how the table is displayed on screen.',
          'Visual calculations still live only on the visual they\'re added to — unlike a model measure or a DAX UDF, they aren\'t reusable across other visuals, which is the tradeoff for the simpler syntax.'
        ],
        codeLanguage: 'dax',
        codeBefore: `// Model measure: Pareto running total, the pre-visual-calculations way
Pareto Running Total =
VAR CurrentProduct = SELECTEDVALUE( Product[Product Name] )
VAR SalesRank =
    RANKX( ALLSELECTED( Product[Product Name] ), [Total Sales], , DESC )
RETURN
    CALCULATE(
        [Total Sales],
        TOPN( SalesRank, ALLSELECTED( Product[Product Name] ), [Total Sales], DESC )
    )`,
        codeAfter: `// Visual calculation, added directly on the table/chart — not in the model
Pareto Running Total = RUNNINGSUM( [Total Sales], ORDERBY( [Total Sales], DESC ) )`,
        whyItMatters:
          'The RANKX + TOPN + ALLSELECTED pattern works, but most analysts have to look it up every time they need it. The visual calculation collapses that to one line, at the cost of not being reusable outside that one visual — for a one-off Pareto chart on a single report page, that\'s usually the right tradeoff; for logic every measure needs, a DAX UDF (see last week\'s update) is still the better fit.',
        references: [
          {
            label: 'Power BI July 2026 Feature Summary — Microsoft Fabric Community',
            url: 'https://community.fabric.microsoft.com/t5/Power-BI-Updates-Blog/Power-BI-July-2026-Feature-Summary/ba-p/5303533'
          },
          {
            label: 'Visual Calculations Overview — Power BI (Microsoft Learn)',
            url: 'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview'
          },
          {
            label: 'RUNNINGSUM — DAX Guide',
            url: 'https://dax.guide/runningsum/'
          }
        ]
      },
      {
        tool: 'Databricks',
        headline: 'Unity Catalog Now Natively Manages Apache Iceberg Tables',
        whatChanged: [
          'Unity Catalog managed tables now support Apache Iceberg directly — CREATE TABLE ... USING iceberg creates a natively managed, UC-governed Iceberg table, not just a Delta table exposing Iceberg-compatible reads.',
          'Previously, giving external Iceberg engines access to Databricks data meant creating a Delta table and enabling UniForm (delta.universalFormat.enabledFormats = \'iceberg\'), which generates Iceberg metadata alongside Delta but keeps Delta as the primary, writable format.',
          'A native Iceberg table skips the dual-format shim entirely — the table is Iceberg, governed by Unity Catalog privileges like any other managed table.',
          'Iceberg v3 features (e.g. deletion vectors) are configurable via TBLPROPERTIES, such as \'iceberg.enableDeletionVectors\' = \'true\'.'
        ],
        codeLanguage: 'sql',
        codeBefore: `-- Delta table with UniForm enabled for Iceberg-compatible external reads
CREATE TABLE analytics.sales.orders (
    order_id BIGINT,
    order_total DECIMAL(10,2)
)
TBLPROPERTIES (
    'delta.columnMapping.mode' = 'id',
    'delta.enableIcebergCompatV2' = 'true',
    'delta.universalFormat.enabledFormats' = 'iceberg'
);
-- Table is still fundamentally Delta; Iceberg readers get a
-- generated, read-oriented metadata layer alongside it.`,
        codeAfter: `-- Natively managed Iceberg table in Unity Catalog
CREATE TABLE analytics.sales.orders (
    order_id BIGINT,
    order_total DECIMAL(10,2)
)
USING iceberg
TBLPROPERTIES (
    'iceberg.enableDeletionVectors' = 'true'
);
-- No Delta layer underneath — this is Iceberg end to end,
-- governed directly by Unity Catalog.`,
        whyItMatters:
          'UniForm was always a compatibility bridge — useful, but a workaround. Teams standardizing on Iceberg (for a multi-engine lakehouse where Snowflake, Trino, or other engines read the same tables) no longer need to maintain a Delta table just to get there; the table can be Iceberg natively while still getting Unity Catalog\'s governance, lineage, and access control.',
        references: [
          {
            label: 'Unity Catalog managed tables for Delta Lake and Apache Iceberg — Databricks Docs',
            url: 'https://docs.databricks.com/aws/en/tables/managed'
          },
          {
            label: 'Read Delta Lake tables with Iceberg clients using UniForm — Databricks Docs',
            url: 'https://docs.databricks.com/gcp/en/delta/uniform'
          },
          {
            label: 'Use Apache Iceberg v3 features — Databricks Docs',
            url: 'https://docs.databricks.com/aws/en/iceberg/iceberg-v3'
          },
          {
            label: 'Announcing full Apache Iceberg support in Databricks — Databricks Blog',
            url: 'https://www.databricks.com/blog/announcing-full-apache-iceberg-support-databricks'
          }
        ]
      },
      {
        tool: 'Snowflake',
        headline: 'CLASSIFY_TEXT Is Being Replaced by AI_CLASSIFY',
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
          'Beyond just avoiding a deprecated function, AI_CLASSIFY\'s task_description gives the model context CLASSIFY_TEXT never accepted, which matters most on ambiguous tickets ("the box arrived late and damaged" — Delivery or Product?). And because output_mode can flip to \'multi\', the same call can tag a ticket with several relevant categories instead of forcing a single label.',
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
            label: 'Snowflake AI SQL User Guide: AI_CLASSIFY (Snowflake Builders Blog)',
            url: 'https://medium.com/snowflake/snowflake-ai-sql-user-guide-ai-classify-15e3d474293f'
          }
        ]
      }
    ],
    emergingTools: [
      {
        name: 'Databricks Lakebase',
        description:
          'A Postgres-compatible, serverless OLTP database built into the Databricks platform, so transactional (operational) data and analytical lakehouse data can sit closer together instead of living in separate systems that need constant syncing.',
        whyWatch:
          'Recent releases have added AI-assisted troubleshooting (Insights + Genie) and Beta CDC sync from Lakebase Postgres tables straight into Unity Catalog Delta tables — Databricks is clearly investing in closing the operational/analytical gap, not just shipping it once and moving on.'
      },
      {
        name: 'Snowflake AI Function Studio',
        description:
          'A Public Preview tool inside Snowflake Cortex that automates prompt engineering, model selection, and benchmarking for the AI_ SQL functions, aimed at cutting down manual experimentation before an AI SQL call goes to production.',
        whyWatch:
          'If it matures out of preview, it lowers the bar for analysts (not just ML engineers) to responsibly tune things like AI_CLASSIFY\'s task_description or pick between model options for AI_COMPLETE — worth a look before it\'s GA and everyone else has caught on.'
      },
      {
        name: 'ThoughtSpot Spotter',
        description:
          'ThoughtSpot\'s "agentic analytics" layer — an AI analyst you ask questions in natural language, which reasons through the steps, checks its own work, and returns an answer, backed by a governed semantic layer rather than a free-form text-to-SQL guess. Related agents (SpotterViz, SpotterModel, SpotterCode) extend the same idea to dashboard building, semantic modeling, and embedded-analytics code.',
        whyWatch:
          'It\'s a genuinely different bet than "Copilot bolted onto an existing BI tool" — the whole product is built around the agent doing the querying, not a chat box next to a report canvas. Worth watching whether Power BI Copilot or Snowflake\'s Cortex Analyst converge toward the same shape, since that would say a lot about where BI UX is actually heading.'
      }
    ],
    jobMarketTop5: {
      methodologyNote:
        'These are self-reported job-posting-analysis figures from a single source (365 Data Science\'s Data Analyst Job Outlook 2026), not census data — sample size and methodology aren\'t independently verified here, so treat this as directional rather than precise. Different reports/editions can show different numbers; click through to the source before quoting these elsewhere.',
      items: [
        { tool: 'SQL', percentage: 52.9 },
        { tool: 'Excel', percentage: 50.5 },
        { tool: 'Python', percentage: 31.2 },
        { tool: 'Power BI', percentage: 29 },
        { tool: 'Tableau', percentage: 26.2 }
      ],
      source: {
        label: '365 Data Science — Data Analyst Job Outlook 2026',
        url: 'https://365datascience.com/career-advice/data-analyst-job-outlook/'
      }
    },
    references: []
  },
  {
    slug: 'july-2026-data-tools-month-in-review',
    status: 'draft',
    title: 'July 2026 in Review: What Changed in Power BI, Databricks, Snowflake & Fabric',
    date: '2026-07-31',
    readTime: '14 min read',
    tags: ['Power BI', 'Databricks', 'Snowflake', 'Microsoft Fabric'],
    summary:
      'A test run of this feature\'s research process: instead of one update, this pulls every dated, officially-sourced July 2026 change across Power BI, Databricks, Snowflake, and Microsoft Fabric, and asks the same question of each one — what does this actually change about how a data analyst works day to day? Sourced directly from each vendor\'s own release notes/changelog first, not secondary blogs.',
    toolSections: [
      {
        tool: 'Power BI',
        headline: 'Visual Calculations Reach GA — a Second Reusability Track Alongside DAX UDFs',
        whatChanged: [
          'Per the official Power BI July 2026 Feature Summary (Microsoft Fabric Community blog), visual calculations reached general availability this month, alongside expanded modern visual defaults, conditional formatting improvements for line charts/legends, Model Options moving into the Power BI Service, and TMDL view on the web.',
          'Visual-calculation window functions (RUNNINGSUM, MOVINGAVERAGE, PREVIOUS, and others) gained an optional ORDERBY parameter, so a calculation\'s sort order can be set independently of how the visual itself is currently sorted.'
        ],
        codeLanguage: 'dax',
        codeBefore: `// Model measure: the pre-visual-calculations way to get a Pareto running total
Pareto Running Total =
VAR SalesRank =
    RANKX( ALLSELECTED( Product[Product Name] ), [Total Sales], , DESC )
RETURN
    CALCULATE(
        [Total Sales],
        TOPN( SalesRank, ALLSELECTED( Product[Product Name] ), [Total Sales], DESC )
    )`,
        codeAfter: `// Visual calculation, added directly on the table/chart — not in the model
Pareto Running Total = RUNNINGSUM( [Total Sales], ORDERBY( [Total Sales], DESC ) )`,
        whyItMatters:
          'Impact on analyst work: this is the second "stop writing the same DAX pattern from scratch" release in two months (after DAX UDFs went GA in June) — Microsoft is visibly investing in two parallel reusability tracks: UDFs for logic that needs to live in the model and be called from anywhere, visual calculations for one-off visual-scoped logic like running totals and Pareto charts. An analyst who only learned UDFs is now missing the faster tool for the more common case — a single visual that needs a running total or moving average.',
        references: [
          {
            label: 'Power BI July 2026 Feature Summary — Microsoft Fabric Community (official)',
            url: 'https://community.fabric.microsoft.com/t5/Power-BI-Updates-Blog/Power-BI-July-2026-Feature-Summary/ba-p/5303533'
          },
          {
            label: 'Visual Calculations Overview — Power BI (Microsoft Learn, official)',
            url: 'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview'
          },
          {
            label: 'RUNNINGSUM — DAX Guide',
            url: 'https://dax.guide/runningsum/'
          }
        ]
      },
      {
        tool: 'Databricks',
        headline: 'Packaged Clean Rooms Reach GA',
        whatChanged: [
          'Per Databricks\' official July 2026 release notes, packaged clean rooms are now generally available. In a packaged clean room, a provider supplies notebooks, JARs, and data that a consumer runs against their own data — without the consumer ever seeing the provider\'s code or data assets.',
          'This is a provider/consumer model, distinct from standard Databricks clean rooms which require equal privileges between all collaborators.',
          'Requires a workspace enabled for both serverless compute and Unity Catalog.',
          'Also this month: an OpenAI connector for Lakeflow Connect entered Beta, and a web terminal for notebooks on serverless GPU compute entered Public Preview.'
        ],
        whyItMatters:
          'Impact on analyst work: previously, running a partner\'s proprietary analysis against your own data meant either trusting them with your data, or building a bespoke equal-privilege clean room where both sides had to agree on shared logic. A packaged clean room means an analyst can now run a certified, pre-built notebook from a partner (say, an ad-attribution model or a supply-chain benchmark) against internal data directly, with neither side\'s IP exposed — this is a procurement/legal unlock as much as a technical one, and it changes which cross-company analyses are even feasible to ask for.',
        references: [
          {
            label: 'July 2026 — Databricks on AWS (official release notes)',
            url: 'https://docs.databricks.com/aws/en/release-notes/product/2026/july'
          },
          {
            label: 'What is Databricks Clean Rooms? — Databricks Docs (official)',
            url: 'https://docs.databricks.com/aws/en/clean-rooms/'
          },
          {
            label: 'Databricks Clean Rooms: Now Generally Available on AWS and Azure — Databricks Blog (official)',
            url: 'https://www.databricks.com/blog/databricks-clean-rooms-now-generally-available-aws-and-azure'
          }
        ]
      },
      {
        tool: 'Snowflake',
        headline: 'VOLATILE Scalar UDFs Now Work With Dynamic Table Incremental Refresh',
        whatChanged: [
          'Per Snowflake\'s official release notes (dated July 16, 2026), VOLATILE scalar UDFs are now supported with dynamic table incremental refresh, and are General Availability.',
          'Previously, incremental refresh effectively required a UDF marked IMMUTABLE — genuinely non-deterministic logic (masking, tokenization, anything with real randomness) meant either mislabeling a UDF as IMMUTABLE, or accepting FULL refresh mode, which re-scans and rebuilds the entire table every cycle.',
          'For incremental refresh, VOLATILE UDFs are supported only in the SELECT clause of the dynamic table definition.'
        ],
        codeLanguage: 'sql',
        codeBefore: `CREATE FUNCTION mask_email(email STRING)
RETURNS STRING
AS
$$
  SELECT LEFT(email, 2) || '***@' || SPLIT_PART(email, '@', 2)
$$;
-- Genuinely VOLATILE by default. To get incremental refresh before this
-- release, teams had to either mislabel it IMMUTABLE or fall back to:

CREATE DYNAMIC TABLE masked_customers
  TARGET_LAG = '1 hour'
  WAREHOUSE = analytics_wh
  REFRESH_MODE = FULL
AS
SELECT customer_id, mask_email(email) AS email
FROM customers;`,
        codeAfter: `CREATE FUNCTION mask_email(email STRING)
RETURNS STRING
AS
$$
  SELECT LEFT(email, 2) || '***@' || SPLIT_PART(email, '@', 2)
$$;
-- Still VOLATILE — no mislabeling needed.

CREATE DYNAMIC TABLE masked_customers
  TARGET_LAG = '1 hour'
  WAREHOUSE = analytics_wh
  REFRESH_MODE = INCREMENTAL
AS
SELECT customer_id, mask_email(email) AS email
FROM customers;`,
        whyItMatters:
          'Impact on analyst work: FULL refresh on a large dynamic table is slow and expensive, so analysts building masking, tokenization, or randomized-sampling logic into a pipeline previously had to choose between honest UDF metadata and refresh cost. That tradeoff is gone for the SELECT-clause case — the more common one — so pipelines that were quietly over-paying for FULL refresh (or quietly mislabeling a UDF) can be corrected without a redesign.',
        references: [
          {
            label: 'July 16, 2026: VOLATILE scalar UDFs supported with dynamic table incremental refresh (GA) — Snowflake Release Notes (official)',
            url: 'https://docs.snowflake.com/en/release-notes/2026/other/2026-07-16-volatile-udf-incremental-dynamic-tables'
          },
          {
            label: 'Dynamic table refresh modes — Snowflake Documentation (official)',
            url: 'https://docs.snowflake.com/en/user-guide/dynamic-tables/refresh-modes'
          },
          {
            label: 'Custom incrementalization — Snowflake Documentation (official)',
            url: 'https://docs.snowflake.com/en/user-guide/dynamic-tables/custom-incrementalization'
          }
        ]
      },
      {
        tool: 'Microsoft Fabric',
        headline: 'Native Execution Engine Speeds Up Python UDFs, Scala UDFs & Complex Data Types — No Code Change Required',
        whatChanged: [
          'Per the official Fabric July 2026 Feature Summary, faster Python UDFs, Scala UDFs, and complex data types in the native execution engine reached General Availability this month.',
          'This is a runtime engine improvement, not a syntax change — existing Spark/PySpark code that already uses UDFs or complex (nested/struct/array) data types runs faster without being rewritten.',
          'Also this month: fabric-cicd v1.2.0 added bulk publish mode, using the Fabric bulk import API to publish multiple items in one call instead of one API call per item.'
        ],
        whyItMatters:
          'Impact on analyst work: not every "update" needs a rewrite to matter — this one is worth noting specifically because it doesn\'t. An analyst\'s existing PySpark notebook full of UDFs (often the slowest part of a Spark job, since UDFs historically bypass a lot of the engine\'s optimizations) gets faster automatically on next run. The action item here isn\'t "change your code," it\'s "re-baseline your job\'s runtime before assuming a pipeline still needs a rewrite for performance."',
        references: [
          {
            label: 'Fabric July 2026 Feature Summary — Microsoft Fabric Community (official)',
            url: 'https://community.fabric.microsoft.com/t5/Fabric-Updates-Blog/Fabric-July-2026-Feature-Summary/ba-p/5325823'
          },
          {
            label: "What's New? — Microsoft Fabric (Microsoft Learn, official)",
            url: 'https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new'
          }
        ]
      }
    ],
    references: []
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
