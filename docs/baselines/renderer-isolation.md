# Native renderer bundle-isolation evidence

This measurement tested whether Nakafa can keep official MDX execution and real
React client components without making every content route download every rich
implementation. It is an isolated production fixture, not a full Nakafa
production acceptance result.

## Context

- Recorded: 2026-07-21
- Nakafa baseline: `25506da68a5dd97bc55f99b6f7304384c4744206`
- Next.js: 16.2.10 with Turbopack and Cache Components
- MDX: `@mdx-js/mdx` 3.1.1, `outputFormat: "function-body"`, official `run`
- Rendering: request-time PPR child behind `connection()` and `Suspense`

The fixture copied the exact current design-system and analytics sources into a
standalone temporary application. It was an ephemeral measurement harness and
is not checked into Aksara. No custom renderer, per-document import map, or
browser-side artifact execution was introduced.

## Rejected shared module graphs

Each of these shared implementation graphs caused a plain article to preload
unrelated R3F/client code:

- one directly imported global implementation registry;
- `next/dynamic` wrappers;
- `React.lazy` wrappers;
- a shared server registry with literal dynamic imports selected from artifact
  requirements;
- that same shared registry moved behind `connection()`.

Request-time execution did not alter the client-reference preload graph. This
matches the Next.js lazy-loading documentation: automatic code splitting is not
currently supported when a Server Component dynamically imports a Client
Component.

## Passing physical route topology

The passing fixture had no shared rich loader:

- `/plain` imported a base-only official-run renderer;
- `/function` imported a renderer whose only rich implementation was
  FunctionMachine;
- `/atom` imported a renderer whose only rich implementation was AtomShellLab.

The build completed in 5.9 seconds with six of six routes and all three content
routes emitted as Partial Prerendering routes. Their static shells contained
only the fallback, which proved that final content was resolved at request
time.

| Route | Rich implementation delivered | Raw bytes | Encoded bytes |
|---|---|---:|---:|
| plain | none | 0 | 0 |
| function | FunctionMachine only | 77,841 | 24,971 |
| atom | AtomShellLab and R3F only | 1,317,348 | 375,571 |

Three isolated browser contexts confirmed the network result. FunctionMachine
incremented its input from 5 to 6 and rendered `f(x)=13`. AtomShellLab created a
WebGL canvas; selecting Neon updated the pressed state, electron count, and
configuration. No hydration or application error occurred.

## Accepted direction supported by this evidence

The candidate keeps the global renderer artifact as a pure name/version
contract and gives Nakafa physical route-domain entrypoints the smallest
practical static capability union. Shared server page code may receive that
registry but may not import every rich client implementation.

The repository owner approved finite static route-domain registries on
2026-07-21. This accepts the topology class, not every measured route partition.
The actual Nakafa candidate also showed that the legacy filesystem MDX graph
still delivered a Three.js chunk to a plain biology route. The result must be
reproduced with the published-artifact runtime before it becomes a production
gate.

The full application must still prove its exact route topology, hosted browser
behavior, caching, and production performance before corpus migration.
