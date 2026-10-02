import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "sarana penunjuk untuk menemukan sumber, bukan pengganti sumber itu sendiri",
        },
        {
          isCorrect: false,
          label: "salinan final yang menggantikan dokumen asli",
        },
        {
          isCorrect: false,
          label:
            "peringkat hasil yang menjamin dokumen pertama selalu paling relevan",
        },
        {
          isCorrect: false,
          label: "pengganti gambar asli ketika teks tidak dapat dibaca mesin",
        },
        {
          isCorrect: false,
          label: "bukti bahwa sumber yang tidak muncul benar-benar tidak ada",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
