"use client";

import { createRef, InputHTMLAttributes, RefObject, useCallback, useEffect } from "react";

export default function ControlledFileInput(props: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  ref?: RefObject<HTMLInputElement | null>;
  files: File[],
  setFiles: (files: File[]) => void
}) {
  const { ref, files, setFiles, ...rest } = props;
  const localRef = createRef<HTMLInputElement>();

  const transferData = useCallback(() => {
    if (localRef.current) {
      const dataTransfer = new DataTransfer();
      for (const file of files)
        dataTransfer.items.add(file);
      localRef.current.files = dataTransfer.files;
    }
  }, [localRef, files]);

  useEffect(() => {
    transferData();
  }, [transferData]);

  return (
    <input
      type="file"
      ref={r => {
        localRef.current = r;
        if (ref)
          ref.current = r;
      }}
      onChange={e => {
        setFiles([...e.target.files!]);
        transferData(); // Rewrite files to the input so that the files can be kept when the 'files' prop remains unchanged
      }}
      {...rest}
    />
  );
};
