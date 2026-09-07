import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ardian legt mit Sicherheit beide Prüfungen ab.",
        },
        {
          isCorrect: true,
          label:
            "Ardian legt sicher die Schulabschlussprüfung ab. Ob er eine Aufnahmeprüfung ablegt, bleibt offen.",
        },
        {
          isCorrect: false,
          label: "Ardian legt mit Sicherheit keine der beiden Prüfungen ab.",
        },
        {
          isCorrect: false,
          label:
            "Ardian legt sicher eine Aufnahmeprüfung ab. Ob er die Schulabschlussprüfung ablegt, bleibt offen.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung hat keinen Bezug zu den Informationen über Ardian.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ardian definitely takes both exams.",
        },
        {
          isCorrect: true,
          label:
            "Ardian definitely takes the School Exam, but whether he takes an entrance test remains open.",
        },
        {
          isCorrect: false,
          label: "Ardian definitely takes neither exam.",
        },
        {
          isCorrect: false,
          label:
            "Ardian definitely takes an entrance test, but whether he takes the School Exam is unknown.",
        },
        {
          isCorrect: false,
          label: "The conclusion is unrelated to the information about Ardian.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ardian pasti mengikuti kedua ujian.",
        },
        {
          isCorrect: true,
          label:
            "Ardian pasti mengikuti Ujian Sekolah, tetapi keikutsertaannya dalam tes masuk bisa benar atau salah.",
        },
        {
          isCorrect: false,
          label: "Ardian pasti tidak mengikuti kedua ujian.",
        },
        {
          isCorrect: false,
          label:
            "Ardian pasti mengikuti tes masuk, tetapi keikutsertaannya dalam Ujian Sekolah belum diketahui.",
        },
        {
          isCorrect: false,
          label: "Simpulan tidak berkaitan dengan informasi tentang Ardian.",
        },
      ],
    },
  },
};

export default item;
