import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "village-postman",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Isi tas Pak Darto kini kebanyakan tagihan, surat dari bank, dan paket kecil.",
        },
        {
          column: 2,
          label: "Mbah Karsih tidak suka ditelepon anaknya lewat video.",
        },
        {
          column: 2,
          label: "Pak Darto mengirim suratnya dengan layanan kilat.",
        },
        {
          column: 1,
          label: "Warno menelepon ibunya lewat video setiap Minggu.",
        },
      ],
    },
  },
};

export default item;
