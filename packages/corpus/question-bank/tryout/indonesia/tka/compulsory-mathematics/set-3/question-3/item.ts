import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Harga jaket pada bulan Februari $$5\\%$$ lebih tinggi daripada $$h$$.",
        },
        {
          correct: true,
          label:
            "Besar penurunan harga pada bulan Februari, dalam rupiah, sama dengan besar kenaikan harga pada bulan Januari.",
        },
        {
          correct: true,
          label:
            "Cara I dan Cara II menghasilkan harga bayar yang sama, berapa pun nilai $$h$$.",
        },
        {
          correct: true,
          label:
            "Harga bayar dengan Cara I $$23{,}5\\%$$ lebih rendah daripada $$h$$.",
        },
        {
          correct: true,
          label:
            "Agar kembali sama dengan $$h$$, harga bayar dengan Cara II harus dinaikkan lebih dari $$30\\%$$.",
        },
      ],
    },
  },
};

export default item;
