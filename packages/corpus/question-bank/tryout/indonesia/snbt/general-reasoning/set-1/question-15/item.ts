import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jedes zugelassene pflanzliche Arzneimittel heilt nachweislich Krankheiten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Verkehrszulassung garantiert, dass ein pflanzliches Arzneimittel für jede Person und jede Erkrankung geeignet ist.",
        },
        {
          isCorrect: false,
          label:
            "Nach der Zulassung eines pflanzlichen Arzneimittels müssen Verbraucher die Kennzeichnung nicht mehr prüfen.",
        },
        {
          isCorrect: true,
          label:
            "Vertrieb und Anwendung pflanzlicher Arzneimittel hängen von behördlicher Prüfung und fortlaufender Überwachung ab.",
        },
        {
          isCorrect: false,
          label:
            "Die staatliche Überwachung endet, sobald ein pflanzliches Arzneimittel zugelassen wurde.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every authorized herbal product is proven to cure disease.",
        },
        {
          isCorrect: false,
          label:
            "A marketing authorization guarantees that a herbal product is suitable for every person and condition.",
        },
        {
          isCorrect: false,
          label:
            "Consumers no longer need to check the label once a herbal product has a marketing authorization.",
        },
        {
          isCorrect: true,
          label:
            "The circulation and use of herbal products depend on regulatory evaluation and continuing supervision.",
        },
        {
          isCorrect: false,
          label:
            "Government supervision ends as soon as a herbal product receives a marketing authorization.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap produk herbal berizin edar terbukti dapat menyembuhkan penyakit.",
        },
        {
          isCorrect: false,
          label:
            "Izin edar menjamin bahwa suatu produk herbal cocok untuk setiap orang dan setiap kondisi.",
        },
        {
          isCorrect: false,
          label:
            "Konsumen tidak perlu lagi memeriksa label setelah suatu produk herbal memperoleh izin edar.",
        },
        {
          isCorrect: true,
          label:
            "Peredaran dan penggunaan produk herbal bergantung pada penilaian regulator serta pengawasan yang berkelanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Pengawasan pemerintah berakhir begitu suatu produk herbal memperoleh izin edar.",
        },
      ],
    },
  },
};

export default item;
