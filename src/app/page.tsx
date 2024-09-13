"use client";

import { useState } from "react";
import { UploadButton } from "~/utils/uploadthing";

export default function Home() {
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [finishedAt, setFinishedAt] = useState<Date | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFinishedAt(new Date());
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        onBeforeUploadBegin={(files) => {
          setStartedAt(new Date());

          return files;
        }}
      />

      {startedAt && (
        <div>
          <p>Started at: {startedAt.toISOString()}</p>
          {finishedAt && (
            <>
              <p>Finished at: {finishedAt?.toISOString()}</p>
              <p>Duration: {finishedAt?.getTime() - startedAt.getTime()}ms</p>
            </>
          )}
        </div>
      )}
    </main>
  );
}
