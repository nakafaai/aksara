import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "courier-rates",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Ongkos paket berukuran $$50\\times40\\times30\\text{ cm}$$ dengan berat aktual $$4\\text{ kg}$$ ke zona Jawa lebih mahal daripada ongkos paket berukuran $$30\\times30\\times30\\text{ cm}$$ dengan berat aktual $$8{,}2\\text{ kg}$$ ke zona yang sama.",
        },
        {
          column: 1,
          label:
            "Untuk paket dalam kardus berukuran $$40\\times30\\times20\\text{ cm}$$ ke zona Luar Jawa, ongkosnya sama untuk setiap berat aktual dari $$0{,}5\\text{ kg}$$ sampai $$4{,}3\\text{ kg}$$.",
        },
        {
          column: 2,
          label:
            "Barang dengan berat aktual paket $$12\\text{ kg}$$ dikirim ke zona Luar Jawa. Mengganti kardus $$60\\times50\\times40\\text{ cm}$$ dengan kardus $$60\\times50\\times25\\text{ cm}$$ tanpa mengubah berat aktual menghemat ongkos $$\\text{Rp}160{.}000{,}00$$.",
        },
        {
          column: 1,
          label:
            "Untuk berat tagih yang sama, ongkos ke zona Luar Jawa selalu kurang dari dua kali ongkos ke zona Jawa.",
        },
      ],
    },
  },
};

export default item;
