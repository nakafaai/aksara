import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "cracked-voice",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Gilang duduk di dekat pintu ruang musik." },
        {
          correct: false,
          label: "Suara Gilang keluar bulat dan tenang pada nada rendah.",
        },
        {
          correct: false,
          label: "Barisan bas hanya berisi tiga anak kelas dua belas.",
        },
        {
          correct: true,
          label:
            "Gilang menghafal partitur di dalam bus dan bersenandung di kamar mandi.",
        },
        {
          correct: false,
          label: "Sorot lampu panggung membuat telapak tangan Gilang basah.",
        },
      ],
    },
  },
};

export default item;
