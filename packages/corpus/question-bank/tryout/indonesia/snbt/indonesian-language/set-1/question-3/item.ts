import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Peluang pertumbuhan ekonomi karena besarnya proporsi penduduk usia produktif",
        },
        {
          isCorrect: false,
          label: "Letak geografis Indonesia yang strategis",
        },
        {
          isCorrect: false,
          label: "Keunggulan produk pertanian Indonesia",
        },
        {
          isCorrect: false,
          label:
            "Indonesia menjadi pengekspor nomor satu dunia dan menuju negara maju",
        },
        {
          isCorrect: false,
          label: "Peningkatan produktivitas Indonesia",
        },
      ],
    },
  },
};

export default item;
