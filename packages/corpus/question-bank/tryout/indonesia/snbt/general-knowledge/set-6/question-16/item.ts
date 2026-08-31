import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ein Gebäude für Besucher möglichst alt aussehen lassen",
        },
        {
          isCorrect: false,
          label: "jedes alte Material trotz Sicherheitsrisiko erhalten",
        },
        {
          isCorrect: true,
          label:
            "den Belegen zu Herkunft, Material und tatsächlich erfolgten Veränderungen entsprechend",
        },
        {
          isCorrect: false,
          label:
            "das ganze Gebäude einheitlich auf ein ausgewähltes Jahr zurückführen",
        },
        {
          isCorrect: false,
          label: "das bekannteste alte Bild exakt kopieren",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "making a building look as old as possible to visitors",
        },
        {
          isCorrect: false,
          label: "retaining every old material even when unsafe",
        },
        {
          isCorrect: true,
          label:
            "faithful to evidence of origin, material, and changes that actually occurred",
        },
        {
          isCorrect: false,
          label: "returning the whole building uniformly to one selected year",
        },
        {
          isCorrect: false,
          label: "copying the most popular old image exactly",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "membuat bangunan terlihat setua mungkin bagi pengunjung",
        },
        {
          isCorrect: false,
          label: "mempertahankan setiap bahan lama meskipun tidak aman",
        },
        {
          isCorrect: true,
          label:
            "setia pada bukti asal, bahan, dan perubahan yang benar-benar terjadi",
        },
        {
          isCorrect: false,
          label:
            "mengembalikan seluruh bangunan secara seragam ke satu tahun pilihan",
        },
        {
          isCorrect: false,
          label: "menyalin persis gambar lama yang paling populer",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
