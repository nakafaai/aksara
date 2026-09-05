import { assert, it } from "@effect/vitest";
import { findExternalLinkPlacementIssues } from "#nakafa-content/link/check";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects non-HTTPS learner-visible Markdown links", () => {
  const source = [
    "[HTTP source](http://example.com/report)",
    "[Email](mailto:editor@example.com)",
    "[FTP source][source]",
    "",
    "[source]: ftp://example.com/report",
  ].join("\n");

  assert.deepEqual(
    findExternalLinkPlacementIssues(source).map(({ column, line, rule }) => ({
      column,
      line,
      rule,
    })),
    [
      { column: 1, line: 1, rule: "external-link-invalid-placement" },
      { column: 1, line: 2, rule: "external-link-invalid-placement" },
      { column: 1, line: 3, rule: "external-link-invalid-placement" },
    ]
  );
});

it("checks invalid external links inside authored blockquotes", () => {
  const samples = {
    de: [
      "> Ein Bemessungsbeispiel verwendet feste Reaktions- und Verzögerungswerte. [Quelle](http://example.com/one)",
      "> Diese Gleichungen gelten nahe der Erdoberfläche. [Quelle](http://example.com/two) Der Standardwert ist festgelegt. [Standard](http://example.com/three)",
    ],
    en: [
      "> One design example uses fixed reaction and deceleration values. [Source](http://example.com/one)",
      "> These equations apply near Earth's surface. [Source](http://example.com/two) The standard value is defined. [Standard](http://example.com/three)",
    ],
    id: [
      "> Salah satu contoh perancangan memakai nilai reaksi dan perlambatan tetap. [Sumber](http://example.com/one)",
      "> Persamaan ini berlaku di dekat permukaan Bumi. [Sumber](http://example.com/two) Nilai standarnya sudah ditetapkan. [Standar](http://example.com/three)",
    ],
  } as const;

  for (const blockquotes of Object.values(samples)) {
    assert.deepEqual(
      blockquotes.flatMap((source) =>
        findExternalLinkPlacementIssues(source).map(({ rule }) => rule)
      ),
      [
        "external-link-invalid-placement",
        "external-link-invalid-placement",
        "external-link-invalid-placement",
      ]
    );
  }
});

it("allows HTTPS Markdown links for editorial source review", () => {
  assert.deepEqual(
    findExternalLinkPlacementIssues(
      "[Official dataset](https://data.example.org/report)"
    ),
    []
  );
});

it("reports exact excerpts for terminal and multiline JSX destinations", () => {
  const terminal = '<Resource href="https://example.org/report" />';
  const multiline = `${terminal}\nAfter`;
  assert.equal(findExternalLinkPlacementIssues(terminal)[0]?.excerpt, terminal);
  assert.equal(
    findExternalLinkPlacementIssues(multiline)[0]?.excerpt,
    terminal
  );
});

it("keeps external destinations limited to HTTPS Markdown links", () => {
  const httpsUrl = "https://data.example.org/report";
  const samples = [
    {
      source: "[HTTP resource](http://data.example.org/report)",
    },
    {
      source: "[Protocol-relative resource](//data.example.org/report)",
    },
    {
      source: `![External image](${httpsUrl})`,
    },
    {
      source: `<a href={"${httpsUrl}"}>External resource</a>`,
    },
    {
      source: `<Resource href="${httpsUrl}" />`,
    },
    {
      source: `<Embed src="${httpsUrl}" />`,
    },
    {
      source: "<Link href={externalUrl}>Official resource</Link>",
    },
    {
      source: `<Resource url="${httpsUrl}" />`,
    },
    {
      source: `<Resource uri={"${httpsUrl}"} />`,
    },
    {
      source: "<Resource sourceUrl={externalUrl} />",
    },
    {
      source: `<Resource data={{ target: "${httpsUrl}" }} />`,
    },
    {
      source: `<Resource data={{ targets: ["${httpsUrl}"] }} />`,
    },
    {
      source:
        '<Button onClick={() => window.open("https://data.example.org/report")}>Open</Button>',
    },
    {
      source: `<Resource {...{ target: "${httpsUrl}" }} />`,
    },
    {
      source: '<a {...{ href: "javascript:alert(1)" }}>Open</a>',
    },
    {
      source: '<Resource {...{ imageUrl: "data:text/plain,unsafe" }} />',
    },
    {
      source: "<Resource {...externalAttributes} />",
    },
    {
      source: "<Panel content={<Resource {...externalAttributes} />} />",
    },
    {
      source:
        '<Button onClick={() => window.open("https://" + host)}>Open</Button>',
    },
    {
      source: '<Resource data={{ target: "https://" + host }} />',
    },
    {
      source:
        '<Callout content={<a href="https://data.example.org/report">Open</a>} />',
    },
    {
      source:
        '<Panel content={<img src="https://data.example.org/image.png" />} />',
    },
    {
      source: "<Panel content={<iframe src={externalUrl}>Open</iframe>} />",
    },
    {
      source: "<button formAction={externalUrl}>Submit</button>",
    },
    {
      source:
        '<button formAction="https://data.example.org/submit">Submit</button>',
    },
    { source: "<button formAction>Submit</button>" },
    { source: '<img srcSet="data:image/svg+xml,unsafe 1x" />' },
    { source: '<img srcSet="/local.png 1x, https://e.co/image.png 2x" />' },
    { source: '<img srcSet="/local.png 1x, //localhost/image.png 2x" />' },
    { source: '<blockquote cite="javascript:alert(1)">Quote</blockquote>' },
    { source: '<object data="data:text/html,unsafe" />' },
    {
      source:
        '<Resource data={{ targets: [, "https://data.example.org/report"] }} />',
    },
    {
      source: '<Resource href="https&#58;//data.example.org/report" />',
    },
    {
      source: "<Panel content={<button formAction>Submit</button>} />",
    },
    {
      source:
        '<Panel content={<a href={"https://data.example.org/report"}>Open</a>} />',
    },
    {
      // biome-ignore lint/suspicious/noTemplateCurlyInString: This is authored MDX source.
      source: "<Resource href={`/lesson/${slug}`} />",
    },
    {
      source:
        '<Resource {...(condition ? { title: "safe" } : externalAttributes)} />',
    },
  ];

  for (const { source } of samples) {
    assert.deepEqual(
      findExternalLinkPlacementIssues(source).map(({ rule }) => rule),
      ["external-link-invalid-placement"]
    );
  }
});

it("allows internal links and URLs protected by code math or metadata syntax", () => {
  const source = [
    "[Lesson notes](/en/material/notes)",
    "`[source](https://example.com)`",
    "```md",
    "[source](https://example.com)",
    "```",
    '<CodeBlock code="[source](https://example.com)" />',
    '<CodeBlock data={[{ code: "[source](https://example.com)" }]} />',
    '<Panel content={<CodeBlock code="[source](https://example.com)" />} />',
    '<InlineMath math="\\\\text{https://example.com}" />',
    '<Panel content={<InlineMath math="\\\\text{https://example.com}" />} />',
    '<Panel content={<BlockMath math="\\\\text{https://example.com}" />} />',
    '<LineEquation title="Case: Distant Circles" />',
    '<Chart data={{ ratio: "H:O = 2:1" }} />',
    "<Object data={rows} />",
    '<Callout title="Use //2 for floor division" />',
    '<Callout {...{ title: "Direct explanation", count: 2, active: true }} />',
    "<Panel content={<MathVisual {...{ width: 400 }} />} />",
    '<Chart label="The ratio is 1//2" />',
    '<button formAction="/internal/submit">Submit</button>',
    "<Resource href={`/internal/lesson`} />",
    // biome-ignore lint/suspicious/noTemplateCurlyInString: This is authored MDX source.
    '<Resource href={`/internal/${"lesson"}`} />',
    '<Resource href={condition ? "/first" : "/second"} />',
    '<Resource href={("/first", "/second")} />',
    '<Resource href={"/lesson" + "/part"} />',
    '<Resource {...{ items: [null, "safe"] }} />',
    '<Resource {...{ items: [, "safe"], title: "/" + "safe" }} />',
    '<Resource {...{ ...{ title: "safe" } }} />',
    '<Resource {...(condition ? { title: "safe" } : { title: "also safe" })} />',
    "<Panel content={<Callout title={label} />} />",
    "<Panel content={<button disabled>Submit</button>} />",
    'export const sourceUrl = "https://example.com";',
  ].join("\n");

  assert.deepEqual(findExternalLinkPlacementIssues(source), []);
});

it("fails closed when static destination combinations exceed the bound", () => {
  const parts = [
    'a ? "/a" : "ht"',
    'b ? "/b" : "tps"',
    'c ? "/c" : "://"',
    'd ? "/d" : "example"',
    'e ? "/e" : "."',
    'f ? "/f" : "org"',
  ];
  const source = `<Resource href={${parts.map((part) => `(${part})`).join(" + ")}} />`;

  assert.deepEqual(
    findExternalLinkPlacementIssues(source).map(({ rule }) => rule),
    ["external-link-invalid-placement"]
  );
});

it("checks external URLs after more than thirty-two structured values", () => {
  const values = Array.from({ length: 33 }, (_, index) => `"value-${index}"`);
  values.push('"https://data.example.org/report"');
  const source = `<Resource data={{ values: [${values.join(", ")}] }} />`;

  assert.deepEqual(
    findExternalLinkPlacementIssues(source).map(({ rule }) => rule),
    ["external-link-invalid-placement"]
  );
});

it("rejects prose that points at a link instead of naming its source", () => {
  const samples = {
    de: "Die Quelle kann über diesen Link geöffnet werden.",
    en: "The source can be opened through this link.",
    id: "Sumbernya bisa dibuka melalui tautan ini.",
  } as const;

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["source-navigation-filler"]
    );
  }
});

it("uses the first Markdown reference definition", () => {
  const invalidFirst = [
    "[Resource][source]",
    "",
    "[source]: javascript:alert(1)",
    "[source]: /internal",
  ].join("\n");
  const safeFirst = [
    "[Resource][source]",
    "",
    "[source]: /internal",
    "[source]: javascript:alert(1)",
  ].join("\n");

  assert.deepEqual(
    findExternalLinkPlacementIssues(invalidFirst).map(({ rule }) => rule),
    ["external-link-invalid-placement"]
  );
  assert.deepEqual(findExternalLinkPlacementIssues(safeFirst), []);
});
