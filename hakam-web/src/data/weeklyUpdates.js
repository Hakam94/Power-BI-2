// Weekly Best Practices content.
//
// Each entry is one editorial update: what changed in a tool, a concrete
// before/after code rewrite showing how the practice changes, an editorial
// "job market signal" note (Hakam's own read of what he's seeing in job
// descriptions — not a scraped/automated LinkedIn statistic), and a
// References section linking to primary sources. New entries get added
// here weekly; this file is the single source of truth for both the
// homepage teaser and the /weekly archive + article pages.

export const weeklyUpdates = [
  {
    slug: 'dax-user-defined-functions',
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
  }
];

export function getWeeklyUpdateBySlug(slug) {
  return weeklyUpdates.find((update) => update.slug === slug);
}

export function getLatestWeeklyUpdates(count = 3) {
  return [...weeklyUpdates]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}
