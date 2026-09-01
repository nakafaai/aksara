import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "35 mililiter, karena 150 dikurangi 24 dan 91.",
        },
        {
          isCorrect: false,
          label: "43 mililiter, karena 150 dikurangi 16 dan 91.",
        },
        {
          isCorrect: false,
          label:
            "59 mililiter, karena seluruh air yang belum keluar dianggap sudah tersimpan.",
        },
        {
          isCorrect: false,
          label:
            "67 mililiter, karena air permukaan setelah lima menit ditambahkan ke air yang keluar.",
        },
        {
          isCorrect: true,
          label:
            "51 mililiter, karena 150 mililiter dikurangi 8 mililiter di permukaan dan 91 mililiter yang keluar.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
