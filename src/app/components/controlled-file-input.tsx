import { createRef, InputHTMLAttributes, useEffect } from "react";

export default function ControlledFileInput(props: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  files: File[],
  setFiles: (files: File[]) => void
}) {
  const { files, setFiles, ...rest } = props;
  const ref = createRef<HTMLInputElement>();
  useEffect(() => {
    if (ref.current) {
      const dataTransfer = new DataTransfer();
      for (const file of files)
        if (file instanceof File)
          dataTransfer.items.add(file);
      ref.current!.files = dataTransfer.files;
    }
  });
  return (
    <input type="file" ref={ref} onChange={e => setFiles([...e.target.files!])} {...rest} />
  );
};