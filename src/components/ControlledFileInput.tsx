"use client";

import { createRef, InputHTMLAttributes, RefObject, useEffect } from "react";

export default function ControlledFileInput(props: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  ref?: RefObject<HTMLInputElement | null>;
  files: File[],
  setFiles: (files: File[]) => void
}) {
  const { ref, files, setFiles, ...rest } = props;
  const finalRef = ref ?? createRef<HTMLInputElement>();
  useEffect(() => {
    if (finalRef.current) {
      const dataTransfer = new DataTransfer();
      for (const file of files)
        dataTransfer.items.add(file);
      finalRef.current.files = dataTransfer.files;
    }
  }, [finalRef, files]);

  return <input type="file" ref={finalRef} onChange={e => setFiles([...e.target.files!])} {...rest} />;
};
