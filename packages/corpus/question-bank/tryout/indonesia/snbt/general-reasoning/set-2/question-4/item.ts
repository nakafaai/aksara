import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "bakau",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lontar sanggup menanam sedikitnya $$20{.}000$$ bibit baru agar bibit hidupnya mencapai $$2{.}000$$ batang per kilometer pantai.",
        },
        {
          correct: false,
          label:
            "Persentase bibit yang hidup pada penanaman ulang di Lontar akan setinggi persentase bibit hidup di Muarabaru.",
        },
        {
          correct: false,
          label:
            "Muarabaru dan Pasirkuning tidak membangun pemecah ombak atau tanggul apa pun selama 2022 sampai 2025.",
        },
        {
          correct: false,
          label:
            "Kerapatan $$2{.}000$$ bibit hidup per kilometer adalah kerapatan terendah yang masih mampu memperlambat mundurnya pantai.",
        },
        {
          correct: true,
          label:
            "Rapatnya bakau di Muarabaru dan Pasirkuning ikut menurunkan laju mundur pantai di sana, bukan sekadar akibat pantai yang lebih dulu tenang sehingga bibit mudah hidup.",
        },
      ],
    },
  },
};

export default item;
