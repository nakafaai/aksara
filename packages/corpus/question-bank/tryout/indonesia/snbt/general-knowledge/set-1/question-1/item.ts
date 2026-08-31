import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "warum ungewöhnliche Verknüpfungen in einem Traum normal wirken können.",
        },
        {
          isCorrect: false,
          label:
            "die Schwierigkeit, die Erlebnisse schlafender Tiere genau zu kennen.",
        },
        {
          isCorrect: false,
          label:
            "ausschließlich die geringere bewusste Kontrolle im REM-Schlaf.",
        },
        {
          isCorrect: false,
          label:
            "die Empfehlung, dass Kinder nach jeder Unterrichtsstunde schlafen sollten.",
        },
        {
          isCorrect: true,
          label:
            "wissenschaftliche Fragen und Befunde zur Entstehung von Träumen und ihrem Zusammenhang mit Erlebnissen und Erinnerungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "why unusual associations can feel normal inside a dream.",
        },
        {
          isCorrect: false,
          label:
            "the difficulty of knowing exactly what sleeping animals experience.",
        },
        {
          isCorrect: false,
          label: "the role of REM sleep in reducing deliberate control alone.",
        },
        {
          isCorrect: false,
          label: "the recommendation that children sleep after every lesson.",
        },
        {
          isCorrect: true,
          label:
            "scientific questions and evidence about how dreams arise and relate to waking experience and memory.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "alasan hubungan yang tidak biasa dapat terasa wajar di dalam mimpi.",
        },
        {
          isCorrect: false,
          label:
            "kesulitan mengetahui secara pasti pengalaman hewan yang sedang tidur.",
        },
        {
          isCorrect: false,
          label: "peran tidur REM dalam mengurangi pengendalian sadar saja.",
        },
        {
          isCorrect: false,
          label: "anjuran agar anak-anak tidur setiap selesai belajar.",
        },
        {
          isCorrect: true,
          label:
            "pertanyaan ilmiah dan bukti tentang kemunculan mimpi serta kaitannya dengan pengalaman terjaga dan ingatan.",
        },
      ],
    },
  },
};

export default item;
