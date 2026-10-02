# Components and visuals

Choose a representation for its instructional job, not for variety alone.

For assessed content, also apply the
[question-bank assessment review](questions.md#assessment-review).

- Use prose for explanation, interpretation, uncertainty, and causal reasoning.
- Use a short list for parallel items that do not need cross-column comparison.
- Use a Markdown table for exact mappings or repeated comparisons. Keep cells
  compact and explain nuanced reasoning outside the table.
- Use a blockquote only for a real quotation or a clearly identified claim,
  misconception, or source excerpt that the surrounding prose analyzes. Do not
  turn ordinary emphasis into decorative quotations. Start with the actual
  teaching message, without editorial prefixes such as `Quick check:`,
  `Cek cepat:`, `Kurzer Check:`, `Kurze Kontrolle:`, or `Kurz geprüft:`.
- Use Mermaid for a sequence, flow, hierarchy, state change, or relationship
  that is materially harder to understand in prose. Do not convert a simple
  list or one-step process into a diagram.
- Use math components for notation and derivation. Use a domain component such
  as a graph, number line, simulation, or interactive model only when it models
  the concept the learner is studying.
- Compose related block components with the renderer-owned layout primitives.
  Use `<ContentStack>` when a formula and a graph, diagram, number line,
  simulation, or other visual form one teaching unit. Use `<ContentBlock>` for
  one custom visual that needs the standard separation from an adjacent block.
  A blank line in raw MDX improves source readability but does not create DOM
  spacing between two JSX flow components.
- Never repair block spacing with empty paragraphs, repeated `<br />` tags,
  nonbreaking spaces, or content-local margin props. Preserve the semantic
  grouping and let `ContentBlock`, `ContentStack`, or `ContentGrid` own layout.
- Use nearby prose to tell the learner what to notice, how the representation
  connects to the concept, and what conclusion it supports. A visual must not
  carry essential meaning only through color, motion, or position.
- Verify every graph, geometric construction, simulation, and three-dimensional
  component through Nakafa's real renderer. Compilation proves only that the
  source is valid. It does not prove that plotted values, signs, domains,
  discontinuities, asymptotes, labels, axes, legends, camera framing, scale,
  occlusion, or interaction are mathematically and visually correct.
- Recalculate representative plotted points independently from the authored
  equation and compare them with the rendered component. For discontinuous or
  piecewise objects, inspect every branch and boundary. For three-dimensional
  objects, inspect and rotate the rendered scene when interaction is available
  so hidden intersections, incorrect depth, or misleading camera angles are
  not accepted from one static view.
- Mathematical geometry uses Nakafa's shared React Three Fiber foundation:
  `CoordinateSystem` owns the scene, grid, and camera;
  `LineEquation` and the owning geometry primitives compose its objects.
  `MathVisual` adapts authored scene contracts to that same foundation. Never
  introduce a custom SVG math renderer, a parallel canvas shell, or a
  content-local implementation. Plane geometry remains in a fixed coordinate
  plane; choose a frontal or oblique camera for the teaching task. Preserve
  useful authored camera positions and targets. Frame the concept at a readable
  scale; distant geometry and grid extents need not fill the initial view.
  Accept the first view only when the learner can read the intended
  relationship without zooming in or out. Fitting every object is not a
  pedagogical goal. Check each default pose on narrow and wide screens, keep
  the teaching subject dominant, and trim unnecessary construction extensions
  without changing the mathematical meaning. Confirm whether the owning
  component preserves the authored pose or explicitly fits finite content.
  The owning card composes its header, scene body, and full-width bordered
  footer. Grid and playback controls belong in that footer; do not add a gizmo
  or overlay controls on the mathematical subject.
  Use the established EvilCharts components, tables, and diagrams when their
  axes, values, comparisons, or structure explain real data more clearly. The
  chart library's own renderer is a data display, not a hand-drawn
  illustration, so the ban on bespoke SVG does not apply to it.
- Preserve exact straight geometry with `MathVisual`'s `segment`, `polyline`,
  or `polygon` objects. Generate circles, arcs, and curves from their
  mathematical functions under
  [computed and exact visuals](#computed-and-exact-visuals). Do not smooth
  polygon edges or use interpolated points that change the equation being
  taught. When adding samples, remap label indices to their original
  mathematical anchors and use `pointIndices` to preserve the intended visible
  markers.
  A set of isolated observations uses one-point series, without connecting
  them into an additional curve. Declarative circle objects own their exact
  sampling and accept no authored `smooth` override.
  Author a balok as one declarative cuboid with positive dimensions:
  `{ id, kind: "cuboid", appearance, center, size: { length, width, height } }`.
  Verify eight vertices, twelve straight edges, four edges of each
  declared dimension, and a camera view that still reads as a cuboid after
  rotation.
- Use the shared `CoordinateSystem` grid as a quiet spatial reference. Authored
  frames have no grid override. Their ranges bound geometry and clipping,
  independently of the camera's visible focus. Keep the subject dominant.
- Reserve red `#dc2626`, green `#16a34a`, and blue `#2563eb` for the Cartesian
  X, Y, and Z axes respectively. Use other colors for mathematical subject
  objects, and keep each label the same color as its owning object. Keep
  authored color descriptions consistent with the rendered scene.
- Every `MathVisual` label names its owning object's `objectId`. Its color comes
  from that object's appearance, matching `LineEquation` lesson labels. Never
  duplicate a label color or infer its owner from visual proximity.
- Place labels in open regions clear of every subject line, including their
  owning line. An anchor on the correct object does not prove that the rendered
  label is clear. Check the full label bounds, especially equations, against
  neighboring lines and other labels at desktop and mobile widths.
- Every dimension label must identify its segment, arc, radius, face, or angle.
  Attach it to that object or add a mathematically anchored construction line;
  a floating value near several edges is ambiguous. Measure label and control
  overlap at mobile widths and verify the association after rotating the scene.
- Render every locale sibling that changes learner-facing labels or prose around
  a visual. Longer localized text must not clip, overlap, obscure data, or
  detach from the representation it explains.

## Computed and exact visuals

These rules have no exceptions, because a single wrong or jagged graph teaches
the wrong mathematics on an education platform.

- **Only three.js and p5 draw illustrations.** Geometry, graphs, vectors,
  fields, structures, and simulations render through Nakafa's React Three
  Fiber foundation (`CoordinateSystem`, `LineEquation`, `MathVisual`, and the
  owned 3D components) or, once the renderer manifest lists it, a p5 sketch.
  Never author hand-written SVG, raw SVG paths, HTML or CSS drawings, canvas
  code, or images. A p5 sketch meets the same bar as a 3D scene: every drawn
  value is computed, the motion teaches, and the still frame reads on its own.
- **Every plotted coordinate is computed in the source.** Build each point
  series in the MDX expression from the formula the lesson teaches, with
  `Array.from` over a parameter:

  ```tsx
  // F(x) = (3x - 1)^2 stays inside a frame of height 4 for -1/3 <= x <= 1.
  points: Array.from({ length: 401 }, (_, i) => {
    const x = -1 / 3 + (i / 400) * (4 / 3);
    return { x, y: (3 * x - 1) ** 2, z: 0 };
  }),
  ```

  The same applies to `MathVisual` vertices, traces, and surfaces. Never type a
  list of coordinates, never paste values an external script printed, and
  never round a computed value into the source. A literal coordinate is
  allowed only for a point the lesson names exactly, such as a vertex, an
  intercept, or the corner of a polygon, and it must equal the formula's
  value. A reader checks a visual by reading its formula, not its numbers.
- **A smooth function renders smooth.** Sample only the part of the domain
  that stays inside the frame: solve for the frame bounds instead of sampling
  far outside them, so the visible part gets the samples. Use at least two
  hundred samples per visible branch and more where the slope or curvature is
  high, until no corner shows at the largest card size, including full
  screen. Keep `smooth: false`, so the path follows the exact samples instead
  of an interpolating spline.
- **Corners and breaks appear exactly where the mathematics puts them.** Put
  an exact sample at every corner, cusp, piecewise boundary, and named point,
  such as the vertex of `|x|`. Split the series at every discontinuity and
  asymptote instead of joining across it.
- **A revision never removes 3D or animation.** Inventory every interactive
  visual before editing. Fix a visual that is wrong, rebuild it when its
  component cannot carry the job, and add visuals where a main idea has none.
  Never remove, merge, or replace interactive visuals so that the lesson ends
  with fewer than it started with. More well-made 3D scenes and animations
  make a better Nakafa lesson.
- **Fix the component, never the data.** When a component cannot draw a
  concept exactly or smoothly, improve the component in Nakafa's renderer with
  the best composition and deploy it before the content that uses it. Never
  work around a component limit with hard-coded data.
- **The `points` gate enforces this.** Run
  `node --conditions=aksara-source .agents/skills/nakafa-content/scripts/points/check.ts <directory or file>`
  on every changed lesson and article. It rejects literal coordinate lists and
  reports any lesson whose interactive visuals fall below their count on
  `origin/main`.

When removing an external visual or interactive resource, inspect the existing
lesson and renderer manifest first. Reuse a Nakafa-owned visual that already
performs the teaching job. Add a new owned component only for a verified gap.
Preserve the shared grid, rotation, and playback controls. Camera perspective
never changes the mathematical dimension of an authored object.

Lessons and articles should not become uninterrupted walls of text when a
meaningful structure or representation would reduce search and comparison
effort. Tables, blockquotes, and Mermaid diagrams remain review decisions, not
quotas: a routine worked answer can remain prose plus one derivation, and none
of them is added merely to make a document look more varied. Lessons also
follow the interactive visual rule below.

## Interactive visual in every lesson

Nakafa's lesson standard requires rich interactive visuals in every lesson,
usually one for each main idea a learner can see, because learners understand
and remember a concept they can see and change, and they skim long text. The research in the [evidence basis](research.md) governs how the
visual is designed: it carries a teaching job and never decorates.

- The interaction answers a question the lesson asks: change a parameter and
  watch the result, step through a process, rotate a structure, or run a
  random experiment many times. A picture that only illustrates does not count.
- The visual models this lesson's concept. Reusing a component is right when
  its configuration teaches this lesson's question; the same component showing
  the same kind of picture as a neighboring lesson is redundant, and the lesson
  needs a visual of its own.
- Choose the technology by the teaching job. Geometry, graphs, vectors, fields,
  and 3D structures use the shared three.js foundation described above. Data
  exploration uses the established EvilCharts components. When no component in
  the current renderer manifest can carry the teaching job, such as a random
  experiment, a step-by-step algorithm, or a particle simulation, that is a
  renderer gap: the component is built and deployed in Nakafa's renderer first,
  and a lesson uses it only after the manifest lists it.
- Build component families, not one-off pictures. A new component takes the
  parameters its lessons need, computes every drawn value from the governing
  formula in a data module with complete unit tests, and cites the source of
  every scientific constant. Scientific structures such as cells, viruses,
  molecules, and machines must match their cited references in parts,
  proportions where stated, labels, and motion.
- Every visual renders inside its renderer-owned card: a header with a title
  and description, the scene, and a footer holding the controls.
- The still frame teaches on its own, because a learner may pause the motion
  or read the page with reduced motion.
- Be creative inside these limits. A good visual surprises the learner with a
  relationship they can discover by playing, and every frame stays exact.
- Verify every visual as described above, and additionally in every locale
  that changes its labels.

During a humanization pass, compare the representation inventory before and
after editing. Do not flatten a useful list, table, blockquote, Mermaid diagram,
math block, graph, or custom component into prose just to shorten or smooth the
lesson. A removal is valid only when the representation no longer has a
teaching job or when every locale sibling carries the same job more clearly in
another form.

For an article, author-written charts, tables, diagrams, and data displays are
part of the argument and source record. Preserve them unless the underlying
data is wrong or the source can no longer support them. A clean scientific
article remains rich in evidence; it does not become prose-only during editing.

Keep the teaching structure equivalent across locale siblings. If a diagram,
table, example, warning, or worked model is necessary in one authored locale,
preserve the same instructional evidence in the others while localizing its
labels and explanation naturally.

Structural parity applies to the teaching representation and its information.
A list keeps the same ordered steps, a table keeps the same comparisons, and a
displayed derivation keeps the same mathematical work in every sibling.
Sentence boundaries and inline-math wrappers may follow each language's grammar
and do not need a byte-for-byte match.

Do not use raw HTML, manual React renderers, decorative component wrappers, or
content-local component implementations. Verify every nonstandard component
against the current route-domain renderer manifest before authoring with it.
