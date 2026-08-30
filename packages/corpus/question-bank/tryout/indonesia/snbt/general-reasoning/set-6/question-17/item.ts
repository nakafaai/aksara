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
              text: "Am vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Am vergangenen Sonntag ereignete sich in Kampung Bambu kein Diebstahl.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Am vergangenen Sonntag ereignete sich in Kampung Bambu ein Diebstahl.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die verbesserte Sicherheit verhinderte am vergangenen Sonntag jede Straftat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Seit dem vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
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
              text: "No crime occurred in Kampung Bambu last Sunday.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "No theft occurred in Kampung Bambu last Sunday.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "A theft occurred in Kampung Bambu last Sunday.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Improved security prevented every crime last Sunday.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "No crime has occurred in Kampung Bambu since last Sunday.",
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
              text: "Tidak terjadi kejahatan di Kampung Bambu pada hari Minggu lalu.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Peningkatan keamanan mencegah seluruh kejahatan pada hari Minggu lalu.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak terjadi kejahatan di Kampung Bambu sejak hari Minggu lalu.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
