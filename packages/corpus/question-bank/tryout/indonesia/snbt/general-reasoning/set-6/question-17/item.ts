import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Am vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
        },
        {
          isCorrect: false,
          label:
            "Am vergangenen Sonntag ereignete sich in Kampung Bambu kein Diebstahl.",
        },
        {
          isCorrect: true,
          label:
            "Am vergangenen Sonntag ereignete sich in Kampung Bambu ein Diebstahl.",
        },
        {
          isCorrect: false,
          label:
            "Die verbesserte Sicherheit verhinderte am vergangenen Sonntag jede Straftat.",
        },
        {
          isCorrect: false,
          label:
            "Seit dem vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "No crime occurred in Kampung Bambu last Sunday.",
        },
        {
          isCorrect: false,
          label: "No theft occurred in Kampung Bambu last Sunday.",
        },
        {
          isCorrect: true,
          label: "A theft occurred in Kampung Bambu last Sunday.",
        },
        {
          isCorrect: false,
          label: "Improved security prevented every crime last Sunday.",
        },
        {
          isCorrect: false,
          label: "No crime has occurred in Kampung Bambu since last Sunday.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tidak terjadi kejahatan di Kampung Bambu pada hari Minggu lalu.",
        },
        {
          isCorrect: false,
          label:
            "Tidak terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
        },
        {
          isCorrect: true,
          label: "Terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
        },
        {
          isCorrect: false,
          label:
            "Peningkatan keamanan mencegah seluruh kejahatan pada hari Minggu lalu.",
        },
        {
          isCorrect: false,
          label:
            "Tidak terjadi kejahatan di Kampung Bambu sejak hari Minggu lalu.",
        },
      ],
    },
  },
};

export default item;
