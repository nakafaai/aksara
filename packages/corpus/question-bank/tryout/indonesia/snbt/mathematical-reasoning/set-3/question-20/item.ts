import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "print-prices",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "memesan tepat 480 lembar dalam satu pesanan dengan biaya $$\\text{Rp}192{.}000{,}00$$",
        },
        {
          correct: false,
          label:
            "memesan 500 lembar dalam satu pesanan dengan biaya $$\\text{Rp}200{.}000{,}00$$",
        },
        {
          correct: false,
          label:
            "memesan dua pesanan masing-masing 240 lembar dengan biaya total $$\\text{Rp}192{.}000{,}00$$",
        },
        {
          correct: false,
          label:
            "memesan lima pesanan masing-masing 96 lembar dengan biaya total $$\\text{Rp}240{.}000{,}00$$",
        },
        {
          correct: true,
          label:
            "memesan 501 lembar dalam satu pesanan dengan biaya $$\\text{Rp}150{.}300{,}00$$",
        },
      ],
    },
  },
};

export default item;
