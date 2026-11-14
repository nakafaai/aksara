import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "drug-dose",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Ada anak yang jumlah obat di dalam tubuhnya tepat $$375\\text{ mg}$$ sesaat sebelum minum pukul 18.00 pada hari pertama.",
        },
        {
          column: 1,
          label:
            "Untuk anak dengan berat badan berapa pun, jumlah obat di dalam tubuhnya tidak pernah mencapai dua kali takaran sekali minumnya.",
        },
        {
          column: 2,
          label:
            "Seorang anak $$30\\text{ kg}$$ lupa minum obat pukul 12.00 pada hari pertama. Pada pukul 18.00 dokter mengizinkannya minum dua kali takaran biasanya, dengan batas $$400\\text{ mg}$$ sekali minum tetap berlaku. Sesaat setelah minum pukul 18.00, jumlah obat di dalam tubuhnya lebih besar daripada jika ia minum sesuai jadwal.",
        },
        {
          column: 2,
          label:
            "Untuk anak $$20\\text{ kg}$$ yang minum sesuai jadwal, jumlah obat di dalam tubuhnya sesaat sebelum minum pukul 06.00 sama pada hari kedua dan hari ketiga.",
        },
      ],
    },
  },
};

export default item;
