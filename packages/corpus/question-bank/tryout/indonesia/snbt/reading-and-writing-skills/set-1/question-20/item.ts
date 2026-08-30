import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das eine sichere Alter für das erste eigene Gerät.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Altersgerechte Mediennutzung in der Familie.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Warum jede Bildschirmzeit schädlich ist." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wie man das erste Smartphone eines Kindes kauft.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine Ein-Stunden-Regel für alle Familienmitglieder.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The One Safe Age for a Child's First Device.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Age-Appropriate Family Media Use." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Why All Screen Time Is Harmful." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "How to Buy a Child's First Smartphone." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "A One-Hour Rule for Every Family Member." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satu Usia Aman untuk Gawai Pertama Anak." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Penggunaan Media Keluarga Sesuai Usia." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mengapa Semua Waktu Layar Berbahaya." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Cara Membeli Ponsel Pertama Anak." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Aturan Satu Jam untuk Setiap Anggota Keluarga.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
