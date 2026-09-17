# Final language review

- Use phrase searches to find likely problems, then inspect every match in its
  full paragraph. Record the few exact quotations, assessed forms, code output,
  or technical names that must remain. A zero count for one phrase does not
  prove that the writing is natural.
- Read the complete document aloud in the target locale.
- Review the document once with locale siblings visible to verify semantic and
  structural parity, then once with the siblings hidden to verify that every
  sentence stands on its own in the target language.
- Ask whether a teacher could say every sentence to a student without first
  explaining the wording itself.
- Retell the lesson aloud from start to finish. Confirm that each paragraph
  follows from a named fact, question, example, or result and gives the learner
  enough context for the next step. Reject a transition that only announces the
  writing structure.
- Read each section twice and delete restatement. A sentence that repeats an
  idea already stated in the same section adds nothing, and two consecutive
  sentences that announce the same section, definition, or conclusion are a
  defect even when the wording differs. The gate catches a documented
  structure-narration phrase, not a paraphrase, so this read owns the class.
- Read every heading against the first sentence beneath it. A sentence that only
  restates the heading adds nothing, so state the fact, equation, condition, or
  case the section teaches instead. A heading that names the topic and a first
  sentence that states a fact are not a restatement, and a section with nested
  subsections keeps the bridge paragraph that introduces their shared purpose.
  No rule covers this class, so this read owns it.
- Read every numbered item. Reject the whole item when it opens with an ordinal
  that repeats the number, including `4. First simplify the angles.`,
  `1. Zuerst wird ...`, and `2. Pertama sederhanakan ...`. The gate blocks only
  the label form with punctuation, so a verb after the ordinal depends on this
  read. Keep an ordinal that names the first element of a set, as in
  `1. First term a` or `1. Pertama kali`.
- Read every negated sentence together with the sentence that follows it. Delete
  a negative half whose positive half already states the whole fact, and rewrite
  `rather than`, `statt`, `stattdessen`, `alih-alih`, `dan bukan`, and
  `melainkan` the same way. The gate blocks the `not only` frame and an
  evaluative anti-model, so the mirrored pair depends on this read.
- For every causal or qualitative statement, ask `apa yang berubah`,
  `dibandingkan dengan apa`, `kenapa`, and `contohnya apa`. Require answers from
  the paragraph when those questions apply.
- For every claim that a method is easier, safer, clearer, or neater, name the
  exact student action or likely error. Delete the claim if no concrete effect
  can be stated.
- Circle every `ini`, `itu`, `tersebut`, `this`, `those`, and German
  demonstrative used after a multi-item list. Replace it with the exact noun if
  more than one antecedent is possible.
- Read every Indonesian `-nya` and every English `it`, `that`, or `they` the
  same way. Keep the suffix or pronoun when the noun it refers to is local and
  unique, and name the object when a learner could ask `yang mana?`. The gate
  blocks the heading demonstrative form and reports a standalone follow-up such
  as `periksa hasilnya` as a review candidate, so a heading that carries `-nya`
  and the rest of the body prose depend on this read. A clitic on a verb is the
  highest-risk shape, because the verb hides the object it acts on:
  `mempertahankannya`, `menurunkannya`, and `menentukannya` each need the object
  named unless the same sentence already names it.
- Check the ordinal form of the same class. `sifat pertama`, `faktor pertama`,
  `the first identity`, and `die erste Regel` need a set the document actually
  numbers or lists in order. Name the property, factor, or identity instead when
  the set is never enumerated.
- Read every authored `**` pair and confirm it opens and closes inside one
  paragraph. The gate blocks a marker whose partner is missing, so this read
  confirms the intended phrase is still the one being emphasized.
- Read every `<Highlight>`. Confirm it marks one phrase inside one sentence, that
  the phrase is the heading span's core rule, decisive condition, or key term,
  that the span carries no third one, and that a learner can resolve the phrase
  without leaving the paragraph: no bare `berikut` pointing at the block below,
  no `ini`, `itu`, or `tersebut` whose noun never appears nearby. The gate
  blocks the floor, the opening floor, a nested marker, and the third highlight
  in one heading span, not the choice of phrase.
- Walk the heading tree. Ordinary explanation stays at `##` and `###`, and a
  lesson answer key nests `####` and `#####` under its own `###` heading. A
  fourth level in ordinary explanation means the section needs splitting. The
  gate blocks a skipped level and a body that opens above `##`.
- Read every blockquote body by hand. The gate scans blockquote prose for
  address and for an editorial prefix such as `Quick check:` or `Cek cepat:`
  (`blockquote-editorial-label`), and it leaves a real quotation whose bytes are
  protected alone, so a callout's clause and reference defects stay a manual
  finding.
- Confirm terminology is consistent with the current glossary.
- Confirm the prose does not preserve unnatural source-language syntax.
- Apply the MDX references to headings, punctuation, resources,
  representations, math, and component labels. Check response strings against
  [question-bank Markdown](question-bank.md#response-items) separately.
- Walk every internal link. Confirm the sentence genuinely uses, contrasts with,
  or builds on the destination concept, that the label names that concept, and
  that the link is not the section's way of skipping an explanation. The gate
  blocks a label that names nothing, a link-only block, and a navigation
  heading, so the relation itself depends on this read. Judge the density here
  too: several links may share one section, as the transformation lessons do,
  but each must name a distinct sibling concept inside a full teaching sentence.
- Confirm there is no U+2014 or U+2013 character in authored content. Use a
  period, comma, colon, parentheses, or a range word such as `to`, `sampai`,
  or `bis` instead. A hyphen required by standard word formation, such as
  `rata-rata` or `jari-jari`, remains valid. The global Humanizer skill bans
  both dashes and makes an exception only for a writer-supplied sample that
  uses them. Aksara authored content has no such sample, so the exception
  never applies here and the project rule stands. `humanizer-de` also offers a
  semicolon for breaking a dash cluster. This project forbids visible
  semicolons in learner-facing prose, so resolve a dash with a period, comma,
  colon, or parentheses instead.
- Confirm no assessed or immutable byte was silently rewritten.
- Treat deterministic wording rules as regression guards, not proof of a human
  voice. A clean scan still requires a line-by-line read in the complete lesson
  and comparison with every locale sibling.
