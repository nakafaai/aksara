import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Paket M wird ins Kühllager geschickt.",
        },
        {
          isCorrect: false,
          label:
            "Ein Paket mit rotem Etikett wird in die manuelle Prüfung geschickt.",
        },
        {
          isCorrect: false,
          label: "Paket M wird nicht in die manuelle Prüfung geschickt.",
        },
        {
          isCorrect: false,
          label: "Kein Paket wird beiden Wegen zugewiesen.",
        },
        {
          isCorrect: true,
          label:
            "Paket M wird wegen seines blauen Etiketts in die manuelle Prüfung geschickt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Parcel M is sent to refrigerated storage.",
        },
        {
          isCorrect: false,
          label: "A parcel with a red label is sent to manual inspection.",
        },
        {
          isCorrect: false,
          label: "Parcel M is not sent to manual inspection.",
        },
        {
          isCorrect: false,
          label: "No parcel is sent to both routes.",
        },
        {
          isCorrect: true,
          label:
            "Parcel M is sent to manual inspection because it has a blue label.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Paket M dikirim ke penyimpanan berpendingin.",
        },
        {
          isCorrect: false,
          label: "Paket berlabel merah dikirim ke pemeriksaan manual.",
        },
        {
          isCorrect: false,
          label: "Paket M tidak dikirim ke pemeriksaan manual.",
        },
        {
          isCorrect: false,
          label: "Tidak ada paket yang dikirim ke kedua jalur.",
        },
        {
          isCorrect: true,
          label:
            "Paket M dikirim ke pemeriksaan manual karena memiliki label biru.",
        },
      ],
    },
  },
};

export default item;
