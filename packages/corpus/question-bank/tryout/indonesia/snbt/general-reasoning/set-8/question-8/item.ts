import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Paket M wird ins Kühllager geschickt." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Paket M wird wegen seines blauen Etiketts in die manuelle Prüfung geschickt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein Paket mit rotem Etikett wird in die manuelle Prüfung geschickt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Paket M wird nicht in die manuelle Prüfung geschickt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kein Paket wird beiden Wegen zugewiesen." },
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
            { kind: "text", text: "Parcel M is sent to refrigerated storage." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Parcel M is sent to manual inspection because it has a blue label.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A parcel with a red label is sent to manual inspection.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Parcel M is not sent to manual inspection.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "No parcel is sent to both routes." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Paket M dikirim ke penyimpanan berpendingin.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Paket M dikirim ke pemeriksaan manual karena memiliki label biru.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Paket berlabel merah dikirim ke pemeriksaan manual.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Paket M tidak dikirim ke pemeriksaan manual.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak ada paket yang dikirim ke kedua jalur.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
