import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { QuranSourceArtifactSchema } from "@nakafa/aksara-contracts/quran/source";

import type { LocalizedSourceMap } from "#corpus/locale/source";

/** Domain that authenticates the complete ordered official data bundle. */
export const QURAN_SOURCE_BUNDLE_DOMAIN = "aksara.quran.source-bundle";

/** Domain that authenticates the 114 ordered QuranEnc Tafsir responses. */
export const QURAN_TAFSIR_BUNDLE_DOMAIN = "aksara.quranenc.api-bundle";

/** Builds one exact source artifact identity from pinned official bytes. */
function artifact(byteCount: number, digest: string, fileCount = 1) {
  return QuranSourceArtifactSchema.make({
    byteCount,
    digest: Sha256HashSchema.make(`sha256:${digest}`),
    fileCount,
  });
}

/** One source-controlled official file required by the Quran parser. */
export interface PinnedQuranFile {
  readonly artifact: ReturnType<typeof artifact>;
  readonly name: string;
  readonly path: string;
}

interface QuranSourcePolicy {
  readonly data: {
    readonly arabic: PinnedQuranFile;
    readonly metadata: PinnedQuranFile;
    readonly names: LocalizedSourceMap<PinnedQuranFile>;
    readonly translations: LocalizedSourceMap<PinnedQuranFile>;
  };
  readonly evidence: {
    readonly germanPublication: PinnedQuranFile;
    readonly kemenagPublication: PinnedQuranFile;
  };
  readonly tafsir: {
    readonly artifact: ReturnType<typeof artifact>;
    readonly directory: string;
    readonly name: string;
  };
  readonly terms: {
    readonly islamhouse: PinnedQuranFile;
    readonly quranenc: PinnedQuranFile;
    readonly kemenag: PinnedQuranFile;
    readonly tanzil: PinnedQuranFile;
  };
}

/** Complete physical and content identity for every pinned Quran source. */
export const QURAN_SOURCE_POLICY = {
  data: {
    arabic: {
      artifact: artifact(
        1_334_737,
        "ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af"
      ),
      name: "tanzil-text.txt",
      path: "tanzil/text.txt",
    },
    metadata: {
      artifact: artifact(
        77_234,
        "8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a"
      ),
      name: "tanzil-data.xml",
      path: "tanzil/data.xml",
    },
    names: {
      de: {
        artifact: artifact(
          4_944_410,
          "bdd3a3a52bff49be17ef5b7133c6ee258bf82dad3807775eb712de99e1ce5006"
        ),
        name: "bubenheim-edition.pdf",
        path: "german/edition.pdf",
      },
      id: {
        artifact: artifact(
          2_625_985,
          "1468325f35e4300f7cbe2bed4f920f6316a7940d7e4542c9bab100355f586563"
        ),
        name: "kemenag-translation.rar",
        path: "kemenag/translation.rar",
      },
    },
    translations: {
      de: {
        artifact: artifact(
          1_523_305,
          "38763b972b2efeeed3062ba3495042c28f320cf734071e010d746c525ebce47e"
        ),
        name: "quranenc-de.xml",
        path: "german/translation.xml",
      },
      en: {
        artifact: artifact(
          1_690_410,
          "213e1aeb515c5bac6ca446955527b8f3c0f9c21e9d1bad9c6857e9e5b282e9b6"
        ),
        name: "quranenc-en.xml",
        path: "quranenc/en.xml",
      },
      id: {
        artifact: artifact(
          1_820_207,
          "45d0014236443e91af1338fe7b60f9e20741c6ff5b4ee82ead960d111f91071b"
        ),
        name: "quranenc-id.xml",
        path: "quranenc/id.xml",
      },
    },
  },
  evidence: {
    germanPublication: {
      artifact: artifact(
        3485,
        "df3b2437afa0f52c3621c8c611384c45b00169e00a259a4f205a7ccd9150f645"
      ),
      name: "islamhouse-german-bubenheim.json",
      path: "german/publication.json",
    },
    kemenagPublication: {
      artifact: artifact(
        42_174,
        "18b6cbc3d6ff090bda59e1a6511025b6deb06613be3999bdcbbe631be69c6274"
      ),
      name: "kemenag-publication.html",
      path: "kemenag/publication.html",
    },
  },
  tafsir: {
    artifact: artifact(
      6_584_353,
      "39bb758c581712487be03215057cfa697280baf6245d8feb760d86df8361172b",
      114
    ),
    directory: "quranenc/tafsir",
    name: "quranenc-tafsir",
  },
  terms: {
    islamhouse: {
      artifact: artifact(
        97_233,
        "9b28dc4d1b745e98028227488f77d7db8e46a8ac912c322ae34482f0c389d707"
      ),
      name: "islamhouse-faq.html",
      path: "german/faq.html",
    },
    kemenag: {
      artifact: artifact(
        49_424,
        "05f896c4cb9d51a16c32035ae42cd3a5ba9a2245db2e97f7489680f726156115"
      ),
      name: "kemenag-rights.html",
      path: "kemenag/rights.html",
    },
    quranenc: {
      artifact: artifact(
        1_051_521,
        "858791320276bef37616be75f3d57efac5b46463246d7cf5503aab1a6de2c774"
      ),
      name: "quranenc-terms.html",
      path: "quranenc/terms.html",
    },
    tanzil: {
      artifact: artifact(
        7903,
        "795064d93b6b9a9e2df190800a32bfe77add93eb6e978215ddb36f8e0130ccaa"
      ),
      name: "tanzil-terms.html",
      path: "tanzil/terms.html",
    },
  },
} satisfies QuranSourcePolicy;

/** Official endpoint for the exact pinned German Bubenheim XML transcript. */
export const GERMAN_QURAN_SOURCE_URL =
  "https://quranenc.com/en/home/download/xml/german_bubenheim";

/** Official IslamHouse record for the German edition and its credited source. */
export const GERMAN_QURAN_PUBLICATION_URL =
  "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-item/59081/de/json";

/** Official full Bubenheim and Elyas edition published through IslamHouse. */
export const GERMAN_QURAN_EDITION_URL =
  "https://d1.islamhouse.com/data/de/ih_books/single/de-der-edle-quran-und-die-ubersetzung-seiner-bedeutung.pdf";

/** Official IslamHouse reuse conditions for its published materials. */
export const GERMAN_QURAN_TERMS_URL = "https://d1.islamhouse.com/html/faq.htm";
