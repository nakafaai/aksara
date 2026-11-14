import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "cracked-voice",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Telapak tangan Gilang basah karena sorot lampu panggung.",
        },
        {
          correct: true,
          label: "Gilang memerah dan menunduk sampai latihan selesai.",
        },
        {
          correct: true,
          label:
            "Gilang datang ke ruang musik paling akhir dan duduk di dekat pintu.",
        },
        { correct: false, label: "Gilang menghafal partitur di dalam bus." },
      ],
    },
  },
};

export default item;
