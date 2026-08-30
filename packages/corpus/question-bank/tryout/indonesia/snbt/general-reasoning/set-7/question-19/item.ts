import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta erhält eine Gehaltsüberprüfung, nimmt aber nicht am Beförderungsverfahren teil.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sinta erhält eine Gehaltsüberprüfung und nimmt am Beförderungsverfahren teil.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta erhält weder eine Gehaltsüberprüfung noch ein Beförderungsverfahren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta nimmt ohne Gehaltsüberprüfung am Beförderungsverfahren teil.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta hat die berufliche Zertifizierung nicht abgeschlossen.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta receives a salary review but does not enter the promotion assessment.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sinta receives a salary review and enters the promotion assessment.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta receives neither a salary review nor a promotion assessment.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta enters the promotion assessment without receiving a salary review.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta has not completed the professional certification.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta menerima peninjauan gaji, tetapi tidak mengikuti penilaian promosi.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sinta menerima peninjauan gaji dan mengikuti penilaian promosi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta tidak menerima peninjauan gaji maupun penilaian promosi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta mengikuti penilaian promosi tanpa menerima peninjauan gaji.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sinta belum menyelesaikan sertifikasi profesi.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
