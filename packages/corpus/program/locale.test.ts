import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";

import {
  composeProgramLocale,
  composeProgramLocaleCatalog,
  decodeProgramLocaleCatalog,
  ProgramLocaleCatalogError,
  ProgramLocaleOwnershipError,
  ProgramLocaleSourceSchema,
  programLocaleSourcePath,
} from "#corpus/program/locale";
import { germanProgramLocaleSources } from "#corpus/program/locale/de";
import { LearningProgramSourceSchema } from "#corpus/program/schema";
import { schoolProgramSources } from "#corpus/program/school";

const [first, second] = schoolProgramSources;

const firstSource = Schema.decodeSync(LearningProgramSourceSchema)(first);
const secondSource = Schema.decodeSync(LearningProgramSourceSchema)(second);
const german = Schema.decodeSync(ProgramLocaleSourceSchema)({
  appLocale: "de" as const,
  programKey: firstSource.key,
  publicSlug: "merdeka-lehrplan",
  title: "Merdeka-Lehrplan",
});

describe("program locale sources", () => {
  it("strictly decodes one permanent locale row", async () => {
    await expect(
      Effect.runPromise(decodeProgramLocaleCatalog([german]))
    ).resolves.toEqual([german]);
    await expect(
      Effect.runPromise(decodeProgramLocaleCatalog())
    ).resolves.toEqual(germanProgramLocaleSources);
    expect(programLocaleSourcePath(german.appLocale)).toBe(
      "packages/corpus/program/locale/de.ts"
    );
    const error = await Effect.runPromise(
      decodeProgramLocaleCatalog([{ ...german, invented: true }]).pipe(
        Effect.flip
      )
    );
    expect(error).toBeInstanceOf(ProgramLocaleCatalogError);
  });

  it("composes locale copy only onto its stable owner", async () => {
    await expect(
      Effect.runPromise(composeProgramLocale(firstSource, german))
    ).resolves.toMatchObject({
      key: firstSource.key,
      translations: [
        ...firstSource.translations,
        {
          appLocale: "de",
          publicSlug: german.publicSlug,
          title: german.title,
        },
      ],
    });
    const error = await Effect.runPromise(
      composeProgramLocale(secondSource, german).pipe(Effect.flip)
    );
    expect(error).toBeInstanceOf(ProgramLocaleOwnershipError);
  });

  it("rejects duplicate and orphan locale ownership", async () => {
    const duplicate = await Effect.runPromise(
      composeProgramLocaleCatalog([firstSource], [german, german]).pipe(
        Effect.flip
      )
    );
    expect(duplicate).toBeInstanceOf(ProgramLocaleOwnershipError);

    const orphan = await Effect.runPromise(
      composeProgramLocaleCatalog(
        [firstSource],
        [{ ...german, programKey: secondSource.key }]
      ).pipe(Effect.flip)
    );
    expect(orphan).toBeInstanceOf(ProgramLocaleOwnershipError);
  });
});
