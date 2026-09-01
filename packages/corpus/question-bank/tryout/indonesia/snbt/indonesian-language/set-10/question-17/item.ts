import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Peta membuktikan lampu menyala, sedangkan buku harian hanya menggambarkan perasaan yang tidak dapat dibandingkan dengan lokasi.",
        },
        {
          isCorrect: false,
          label:
            "Buku harian menunjukkan seluruh lokasi lampu, sedangkan peta menjelaskan berapa lama setiap lampu menyala.",
        },
        {
          isCorrect: true,
          label:
            "Peta menunjukkan status dan sebaran pemasangan, sedangkan buku harian menunjukkan bagaimana beberapa warga mengalami penerangan pada rute serta waktu tertentu.",
        },
        {
          isCorrect: false,
          label:
            "Kedua sumber memberi informasi yang sama karena titik peta dan lokasi dalam catatan dapat disejajarkan.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan tujuan membuat kedua sumber tidak dapat dipakai bersama dalam satu penyelidikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
