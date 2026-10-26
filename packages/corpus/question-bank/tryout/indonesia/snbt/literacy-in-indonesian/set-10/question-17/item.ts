import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Peta membuktikan lampu menyala, sedangkan buku harian hanya menggambarkan perasaan yang tidak dapat dibandingkan dengan lokasi.",
        },
        {
          correct: false,
          label:
            "Buku harian menunjukkan seluruh lokasi lampu, sedangkan peta menjelaskan berapa lama setiap lampu menyala.",
        },
        {
          correct: true,
          label:
            "Peta menunjukkan status dan sebaran pemasangan, sedangkan buku harian menunjukkan bagaimana beberapa warga mengalami penerangan pada rute serta waktu tertentu.",
        },
        {
          correct: false,
          label:
            "Kedua sumber memberi informasi yang sama karena titik peta dan lokasi dalam catatan dapat disejajarkan.",
        },
        {
          correct: false,
          label:
            "Perbedaan tujuan membuat kedua sumber tidak dapat dipakai bersama dalam satu penyelidikan.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
