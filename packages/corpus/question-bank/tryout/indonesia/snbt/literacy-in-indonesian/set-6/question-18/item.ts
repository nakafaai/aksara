import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "hotel-occupancy",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada musim sepi 2024, tingkat hunian gabungan hotel berbintang di ketiga kota adalah $$45\\%$$.",
        },
        {
          column: 1,
          label:
            "Seandainya Lembahdaun menambah $$100$$ kamar dan banyak kamar terisi per malam pada musim sepi tetap, tingkat hunian musim sepinya turun di bawah $$35\\%$$.",
        },
        {
          column: 2,
          label:
            "Pada musim sepi 2024, Karangwangi mengisi lebih banyak kamar per malam daripada Tirtasari karena tingkat huniannya lebih tinggi.",
        },
        {
          column: 2,
          label:
            "Pada musim ramai 2024, tingkat hunian gabungan hotel berbintang di ketiga kota lebih dari $$81\\%$$.",
        },
      ],
    },
  },
};

export default item;
