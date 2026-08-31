import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Das eine sichere Alter für das erste eigene Gerät.",
        },
        {
          isCorrect: false,
          label: "Warum jede Bildschirmzeit schädlich ist.",
        },
        {
          isCorrect: false,
          label: "Wie man das erste Smartphone eines Kindes kauft.",
        },
        {
          isCorrect: false,
          label: "Eine Ein-Stunden-Regel für alle Familienmitglieder.",
        },
        {
          isCorrect: true,
          label: "Altersgerechte Mediennutzung in der Familie.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The One Safe Age for a Child's First Device.",
        },
        {
          isCorrect: false,
          label: "Why All Screen Time Is Harmful.",
        },
        {
          isCorrect: false,
          label: "How to Buy a Child's First Smartphone.",
        },
        {
          isCorrect: false,
          label: "A One-Hour Rule for Every Family Member.",
        },
        {
          isCorrect: true,
          label: "Age-Appropriate Family Media Use.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Satu Usia Aman untuk Gawai Pertama Anak.",
        },
        {
          isCorrect: false,
          label: "Mengapa Semua Waktu Layar Berbahaya.",
        },
        {
          isCorrect: false,
          label: "Cara Membeli Ponsel Pertama Anak.",
        },
        {
          isCorrect: false,
          label: "Aturan Satu Jam untuk Setiap Anggota Keluarga.",
        },
        {
          isCorrect: true,
          label: "Penggunaan Media Keluarga Sesuai Usia.",
        },
      ],
    },
  },
};

export default item;
