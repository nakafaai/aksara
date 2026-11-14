import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parking-fees",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mobil yang masuk pukul 08.20 dan keluar pukul 14.25 pada hari yang sama membayar $$\\text{Rp}30{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Ada mobil yang melewati pukul 00.00 tepat satu kali dan membayar total tepat $$\\text{Rp}48{.}000{,}00$$, termasuk biaya menginap.",
        },
        {
          column: 1,
          label:
            "Mobil yang masuk pukul 23.00 dan keluar pukul 23.00 keesokan harinya membayar total $$\\text{Rp}46{.}000{,}00$$, termasuk biaya menginap.",
        },
        {
          column: 1,
          label:
            "Mobil yang masuk pukul 22.40 dan keluar pukul 01.20 keesokan harinya membayar total lebih mahal daripada mobil yang parkir tepat $$6$$ jam pada siang hari tanpa melewati pukul 00.00.",
        },
      ],
    },
  },
};

export default item;
