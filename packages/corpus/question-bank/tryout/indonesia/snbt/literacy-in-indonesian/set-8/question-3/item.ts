import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dibandingkan kelompok tanpa lapisan, pelapisan permukaan bawah menurunkan rata-rata kehilangan massa sebesar $$0{,}54$$ persen.",
        },
        {
          correct: false,
          label:
            "Dibandingkan kelompok tanpa lapisan, pelapisan permukaan bawah menurunkan rata-rata kehilangan massa sebesar sekitar $$193$$ persen.",
        },
        {
          correct: true,
          label:
            "Dibandingkan kelompok tanpa lapisan, rata-rata kehilangan massa pada pelapisan permukaan bawah lebih rendah sekitar $$65{,}9$$ persen. Angka itu menggambarkan sampel daun petik, bukan perkiraan pasti untuk semua tumbuhan.",
        },
        {
          correct: false,
          label:
            "Dibandingkan kelompok tanpa lapisan, pelapisan permukaan bawah menurunkan kehilangan massa sebesar $$65{,}9$$ poin persentase karena kedua nilai diukur dalam gram.",
        },
        {
          correct: false,
          label:
            "Rata-rata $$0{,}28$$ gram berarti $$65{,}9$$ persen daun pada kelompok pelapisan permukaan bawah tidak mengalami transpirasi.",
        },
      ],
    },
  },
};

export default item;
