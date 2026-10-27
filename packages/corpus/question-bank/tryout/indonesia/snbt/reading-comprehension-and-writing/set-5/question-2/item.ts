import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ditambah secara bertahap selama sesi uji",
        },
        {
          correct: false,
          label: "dicatat setelah hasil uji diketahui",
        },
        {
          correct: false,
          label: "diganti hanya pada kondisi pembanding",
        },
        {
          correct: false,
          label: "diabaikan karena tidak berkaitan dengan hasil",
        },
        {
          correct: true,
          label:
            "dijaga tetap sama agar pengaruh perubahan lebih mudah ditafsirkan",
        },
      ],
    },
  },
};

export default item;
