import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects empty utility claims and decorative code metaphors", () => {
  const samples = {
    de: "Diese Methode ist sehr nützlich. Denke an Werkzeuge in einem Werkzeugkasten.",
    en: "This method is very useful. Think of operators as tools in a toolbox.",
    id: "Metode ini sangat berguna. Bayangkan operator sebagai alat di dalam kotak perkakas.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["inflated-utility-claim", "decorative-code-metaphor"]
    );
  }
});
it("rejects important role labels without the actual mechanism", () => {
  const samples = {
    de: "Der Ortsvektor hat eine wichtige Rolle bei der Bestimmung des Punktes.",
    en: "The position vector has an important role in locating the point.",
    id: "Vektor posisi memiliki peran penting untuk menentukan letak titik.",
  };
  const expectedRules: Record<string, string[]> = {
    de: ["inflated-utility-claim", "empty-evaluative-label"],
    en: ["inflated-utility-claim"],
    id: ["inflated-utility-claim"],
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      expectedRules[locale]
    );
  }

  const directSamples = {
    de: "Die Komponenten des Ortsvektors sind die Koordinaten des Punktes.",
    en: "The position vector components are the coordinates of the point.",
    id: "Komponen vektor posisi merupakan koordinat titik tersebut.",
  };

  for (const [locale, source] of Object.entries(directSamples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});
it("rejects empty big idea labels", () => {
  const samples = {
    de: "Zwei große Ideen erklären den Ursprung der Atomtheorie.",
    en: "Two big ideas explain the origin of atomic theory.",
    id: "Ada dua gagasan besar tentang asal teori atom.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["empty-big-idea-label"]
    );
  }
});
it("rejects causative claims that only label something useful", () => {
  const samples = {
    de: "Diese Eigenschaften machen die Matrix wichtig.",
    en: "These properties make the matrix important.",
    id: "Sifat ini menjadikan matriks tersebut penting.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["inflated-causative-utility"]
    );
  }
});
it("rejects importance labels placed before the actual reason", () => {
  const samples = {
    de: "Die Reihenfolge ist wichtig, weil jede Phase etwas anderes beschreibt.",
    en: "The order matters because each phase describes something different.",
    id: "Urutannya penting karena setiap tahap menjelaskan hal yang berbeda.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["importance-before-cause"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Faktor eksak tidak membatasi angka penting karena bukan data ukur."
    ),
    []
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "Aristotle proposed continuous matter because the observations showed no final particle boundary."
    ),
    []
  );
});
it("rejects stock usefulness and more direct way transitions", () => {
  const samples = {
    de: "Genau deshalb ist die Notation nützlich. Direkter geht es mit dem Tangens.",
    en: "That is why the notation is useful. Another more direct way is to use tangent.",
    id: "Itulah alasan notasi ini berguna. Cara lain yang lebih langsung adalah dengan menggunakan tangen.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["stock-usefulness-transition", "generic-more-direct-way"]
    );
  }
});
it("rejects empty lesson choreography before the actual explanation", () => {
  const samples = {
    de: [
      "Betrachten wir nun ein anderes Beispiel.",
      "Wenden wir dieses Konzept auf ein Beispiel an.",
      "Das folgende Beispiel zeigt das vollständige Vorgehen.",
    ].join("\n"),
    en: [
      "Now look at a different example.",
      "Apply the test to an example.",
      "Look at a simple example to understand the process.",
    ].join("\n"),
    id: [
      "Sekarang perhatikan contoh berikut.",
      "Terapkan konsep ini pada sebuah contoh.",
      "Lihat bagaimana caranya dengan contoh.",
    ].join("\n"),
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      [
        "empty-lesson-choreography",
        "empty-lesson-choreography",
        "empty-lesson-choreography",
      ]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Matriks berikut memiliki dua nilai eigen yang berbeda."
    ),
    []
  );
});
it("rejects a section focus announcement and preserves the direct relation", () => {
  const samples = {
    de: "Im Mittelpunkt stehen hier der Einfluss der Basis und die Verschiebung des Graphen.",
    en: "Here we focus on how the base determines the graph.",
    id: "Di sini kita akan melihat bagaimana basis menentukan bentuk grafik.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["empty-lesson-choreography"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Nilai basis menentukan apakah grafik logaritma naik atau turun."
    ),
    []
  );
});
it("rejects stock rhetorical openers that delay the claim", () => {
  const samples = {
    de: "Was aber, wenn die Matrix wiederholte Eigenwerte hat?",
    en: "Have you ever noticed that this equation is always true?",
    id: "Namun, bagaimana jika pusatnya bukan di titik asal?",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["stock-rhetorical-opener"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Nilai eigen berulang memerlukan pemeriksaan tambahan."
    ),
    []
  );
});
it("rejects empty usefulness questions before the reason", () => {
  const samples = {
    de: "Warum ist das nützlich? Die Gleichung enthält den Radius.\n## Wozu dienen Verteilungen",
    en: "Why does this matter? The equation contains the radius.\n## Why Are Distributions Useful",
    id: "Kenapa ini berguna? Persamaan memuat jari-jari.\n## Mengapa Distribusi Berguna",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["empty-usefulness-question", "empty-usefulness-question"]
    );
  }
});
it("rejects rhetorical not only contrasts but keeps factual negation", () => {
  const samples = {
    de: "Das Ergebnis ist nicht nur eine Zahl, sondern ein vollständiges Modell.",
    en: "The result is not only a number but also a complete model.",
    id: "Hasilnya bukan hanya angka, tetapi juga model yang lengkap.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["rhetorical-not-only"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Penyebut harus tidak nol agar hasil bagi terdefinisi."
    ),
    []
  );
});
it("rejects a vague transformation of uncertainty into usefulness", () => {
  const samples = {
    de: "Wahrscheinlichkeitsverteilungen machen unsichere Ergebnisse vergleichbar und nutzbar.",
    en: "Probability distributions turn uncertain outcomes into quantities that can be compared and used.",
    id: "Distribusi peluang mengubah ketidakpastian menjadi besaran yang dapat dibandingkan dan digunakan.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      locale === "de"
        ? ["inflated-causative-utility", "vague-uncertainty-transformation"]
        : ["vague-uncertainty-transformation"]
    );
  }
});
