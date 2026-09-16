# Components and visuals

Choose a representation for its instructional job, not for variety alone.

For assessed content, also apply the
[question-bank assessment review](question-bank.md#assessment-review).

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
  The owning card composes its header, scene body, and full-width bordered
  footer. Grid and playback controls belong in that footer; do not add a gizmo
  or overlay controls on the mathematical subject.
  Use the established EvilCharts components, tables, and diagrams when their
  axes, values, comparisons, or structure explain the content more clearly.
  The restriction on bespoke SVG does not prohibit the chart library's own
  renderer, and does not require converting every visual to 3D.
- Preserve exact straight geometry with `MathVisual`'s `segment`, `polyline`,
  or `polygon` objects. Generate circles, arcs, and quadratic curves from their
  mathematical functions. Do not smooth polygon edges or use interpolated
  points that change the equation being taught.
  For a sampled analytic `LineEquation`, calculate points from the formula and
  set `smooth: false`. Increase the sampling density when visible segments do
  not represent the curve adequately. Keep discontinuous branches separate.
  When adding samples, remap label indices to their original mathematical
  anchors and use `pointIndices` to preserve the intended visible markers.
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

When removing an external visual or interactive resource, inspect the existing
lesson and renderer manifest first. Reuse a Nakafa-owned visual that already
performs the teaching job. Add a new owned component only for a verified gap.
Preserve the shared grid, rotation, and playback controls. Camera perspective
never changes the mathematical dimension of an authored object.

Lessons and articles should not become uninterrupted walls of text when a
meaningful structure or representation would reduce search and comparison
effort. This is a review decision, not a quota. A clear short lesson can remain
mostly prose, and a routine worked answer can remain prose plus one derivation.
Do not add a table, blockquote, Mermaid diagram, video, or interaction merely
to make the document look more varied.

During a humanization pass, compare the representation inventory before and
after editing. Do not flatten a useful list, table, blockquote, Mermaid diagram,
math block, graph, or custom component into prose just to shorten or smooth the
lesson. A removal is valid only when the representation no longer has a
teaching job or when every locale sibling carries the same job more clearly in
another form.

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
