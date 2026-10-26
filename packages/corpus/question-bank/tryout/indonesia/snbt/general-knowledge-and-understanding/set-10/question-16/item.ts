import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "sarana penunjuk untuk menemukan sumber, bukan pengganti sumber itu sendiri",
        },
        {
          correct: false,
          label: "salinan final yang menggantikan dokumen asli",
        },
        {
          correct: false,
          label:
            "peringkat hasil yang menjamin dokumen pertama selalu paling relevan",
        },
        {
          correct: false,
          label: "pengganti gambar asli ketika teks tidak dapat dibaca mesin",
        },
        {
          correct: false,
          label: "bukti bahwa sumber yang tidak muncul benar-benar tidak ada",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
