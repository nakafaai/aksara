import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sinta erhält eine Gehaltsüberprüfung, nimmt aber nicht am Beförderungsverfahren teil.",
        },
        {
          isCorrect: true,
          label:
            "Sinta erhält eine Gehaltsüberprüfung und nimmt am Beförderungsverfahren teil.",
        },
        {
          isCorrect: false,
          label:
            "Sinta erhält weder eine Gehaltsüberprüfung noch ein Beförderungsverfahren.",
        },
        {
          isCorrect: false,
          label:
            "Sinta nimmt ohne Gehaltsüberprüfung am Beförderungsverfahren teil.",
        },
        {
          isCorrect: false,
          label: "Sinta hat die berufliche Zertifizierung nicht abgeschlossen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sinta receives a salary review but does not enter the promotion assessment.",
        },
        {
          isCorrect: true,
          label:
            "Sinta receives a salary review and enters the promotion assessment.",
        },
        {
          isCorrect: false,
          label:
            "Sinta receives neither a salary review nor a promotion assessment.",
        },
        {
          isCorrect: false,
          label:
            "Sinta enters the promotion assessment without receiving a salary review.",
        },
        {
          isCorrect: false,
          label: "Sinta has not completed the professional certification.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sinta menerima peninjauan gaji, tetapi tidak mengikuti penilaian promosi.",
        },
        {
          isCorrect: true,
          label:
            "Sinta menerima peninjauan gaji dan mengikuti penilaian promosi.",
        },
        {
          isCorrect: false,
          label:
            "Sinta tidak menerima peninjauan gaji maupun penilaian promosi.",
        },
        {
          isCorrect: false,
          label:
            "Sinta mengikuti penilaian promosi tanpa menerima peninjauan gaji.",
        },
        {
          isCorrect: false,
          label: "Sinta belum menyelesaikan sertifikasi profesi.",
        },
      ],
    },
  },
};

export default item;
