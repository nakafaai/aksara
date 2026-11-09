import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "nutrition-sachet",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Biaya minimum tetap $$\\text{Rp}36{.}000{,}00$$ dengan $$3$$ sachet susu A dan $$4$$ sachet susu B.",
        },
        {
          correct: false,
          label:
            "Biaya minimum menjadi $$\\text{Rp}26{.}000{,}00$$ dengan $$2$$ sachet susu A dan $$3$$ sachet susu B.",
        },
        {
          correct: false,
          label:
            "Biaya minimum menjadi $$\\text{Rp}28{.}000{,}00$$ dengan $$4$$ sachet susu A dan $$2$$ sachet susu B.",
        },
        {
          correct: false,
          label:
            "Biaya minimum menjadi $$\\text{Rp}30{.}000{,}00$$ dengan $$3$$ sachet susu A dan $$3$$ sachet susu B.",
        },
        {
          correct: true,
          label: "Tidak ada rencana yang memenuhi semua syarat.",
        },
      ],
    },
  },
};

export default item;
