import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team einen nach Absagen aktualisierten digitalen Plan im Kontext Musikproberäume.",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team einen nach Absagen aktualisierten digitalen Plan im folgenden Kontext: Musikproberäume.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team einen nach Absagen aktualisierten digitalen Plan im Kontext Musikproberäume.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team einen nach Absagen aktualisierten digitalen Plan im Kontext Musikproberäume.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team einen nach Absagen aktualisierten digitalen Plan im Kontext Musikproberäume",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested a digital schedule updated after cancellations in this setting (music practice rooms).",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested a digital schedule updated after cancellations in this setting (music practice rooms).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested a digital schedule updated after cancellations in this setting (music practice rooms).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested a digital schedule updated after cancellations in this setting (music practice rooms).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested a digital schedule updated after cancellations in this setting (music practice rooms)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
