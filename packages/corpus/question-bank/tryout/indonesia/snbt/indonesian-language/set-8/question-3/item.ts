import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dibandingkan kelompok tanpa lapisan, pelapisan permukaan bawah menurunkan rata-rata kehilangan massa sebesar 0,54 persen.",
        },
        {
          isCorrect: false,
          label:
            "Dibandingkan kelompok tanpa lapisan, pelapisan permukaan bawah menurunkan rata-rata kehilangan massa sebesar sekitar 193 persen.",
        },
        {
          isCorrect: true,
          label:
            "Dibandingkan kelompok tanpa lapisan, rata-rata kehilangan massa pada pelapisan permukaan bawah lebih rendah sekitar 65,9 persen; angka itu menggambarkan sampel daun petik, bukan perkiraan pasti untuk semua tumbuhan.",
        },
        {
          isCorrect: false,
          label:
            "Dibandingkan kelompok tanpa lapisan, pelapisan permukaan bawah menurunkan kehilangan massa sebesar 65,9 poin persentase karena kedua nilai diukur dalam gram.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata 0,28 gram berarti 65,9 persen daun pada kelompok pelapisan permukaan bawah tidak mengalami transpirasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
