import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  collectBoundedBytes,
  collectErrorBytes,
  decodeUtf8,
} from "#publisher/git/output";

describe("Git output", () => {
  it("collects exact copied bytes and preserves stream failures", async () => {
    const first = Uint8Array.from([0x61, 0x62]);
    const output = await Effect.runPromise(
      collectBoundedBytes(
        Stream.make(first, Uint8Array.from([0x63])),
        3,
        () => "overflow"
      )
    );
    first[0] = 0x7a;
    expect(output).toEqual(Uint8Array.from([0x61, 0x62, 0x63]));

    const streamError = await Effect.runPromise(
      collectBoundedBytes(
        Stream.fail("stream-failure"),
        3,
        () => "overflow"
      ).pipe(Effect.flip)
    );
    expect(streamError).toBe("stream-failure");
  });

  it("fails before retaining bytes beyond the declared limit", async () => {
    const error = await Effect.runPromise(
      collectBoundedBytes(
        Stream.make(Uint8Array.from([0x61, 0x62])),
        1,
        (actualBytes) => ({ actualBytes })
      ).pipe(Effect.flip)
    );
    expect(error).toEqual({ actualBytes: 2 });
  });

  it("drains diagnostics while retaining only their bounded prefix", async () => {
    const output = await Effect.runPromise(
      collectErrorBytes(
        Stream.make(
          Uint8Array.from([0x61, 0x62, 0x63]),
          Uint8Array.from([0x64, 0x65]),
          Uint8Array.from([0x66])
        ),
        4
      )
    );
    expect(output).toEqual(Uint8Array.from([0x61, 0x62, 0x63, 0x64]));
  });

  it("fatally decodes UTF-8 through the caller's typed error", async () => {
    await expect(
      Effect.runPromise(
        decodeUtf8(new TextEncoder().encode("valid ✓"), () => "invalid")
      )
    ).resolves.toBe("valid ✓");

    const error = await Effect.runPromise(
      decodeUtf8(Uint8Array.from([0xc3, 0x28]), () => "invalid").pipe(
        Effect.flip
      )
    );
    expect(error).toBe("invalid");
  });
});
