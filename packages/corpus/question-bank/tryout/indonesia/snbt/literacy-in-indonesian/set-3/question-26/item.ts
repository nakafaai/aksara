import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "anchoring-price",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Keterangan itu menunjukkan bahwa peserta menebak dengan asal, dan percobaan itu tetap tidak dapat membedakan kedua penjelasan efek jangkar.",
        },
        {
          correct: false,
          label:
            "Keterangan itu menunjukkan bahwa angka jangkar tetap berpengaruh walaupun tidak dianggap sebagai petunjuk jawaban, dan percobaan itu membuktikan bahwa penjelasan pertama yang benar.",
        },
        {
          correct: false,
          label:
            "Keterangan itu menunjukkan bahwa roda sengaja diatur oleh peneliti, dan percobaan itu tetap tidak dapat membedakan kedua penjelasan efek jangkar.",
        },
        {
          correct: true,
          label:
            "Keterangan itu menunjukkan bahwa angka jangkar tetap berpengaruh walaupun tidak dianggap sebagai petunjuk jawaban, dan percobaan itu tetap tidak dapat membedakan kedua penjelasan efek jangkar.",
        },
        {
          correct: false,
          label:
            "Keterangan itu menunjukkan bahwa angka jangkar tetap berpengaruh walaupun tidak dianggap sebagai petunjuk jawaban, dan percobaan itu tidak dapat menunjukkan ke arah mana jangkar menarik tebakan.",
        },
      ],
    },
  },
};

export default item;
