import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "electric-cars",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "jumlah stasiun pengisian daya bertambah pesat di kota-kota besar negaranya",
        },
        {
          correct: false,
          label:
            "harga bus listrik naik hingga lebih mahal daripada harga mobil listrik pribadi",
        },
        {
          correct: false,
          label:
            "pajak bahan bakar bensin di negaranya dinaikkan menjadi dua kali lipat",
        },
        {
          correct: false,
          label:
            "penjualan mobil bensin di negaranya turun selama beberapa tahun berturut-turut",
        },
        {
          correct: true,
          label:
            "sebagian besar listrik di negaranya dihasilkan oleh pembangkit yang bersih",
        },
      ],
    },
  },
};

export default item;
