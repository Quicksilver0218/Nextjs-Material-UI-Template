import { createRef, InputHTMLAttributes, useEffect } from "react";

export default function ControlledFileInput(props: InputHTMLAttributes<HTMLInputElement> & {
  files: File[],
  setFiles: (files: File[]) => void
}) {
  const ref = createRef<HTMLInputElement>();
  useEffect(() => {
    if (ref.current) {
      const dataTransfer = new DataTransfer();
      for (const file of props.files)
        if (file instanceof File)
          dataTransfer.items.add(file);
      ref.current!.files = dataTransfer.files;
    }
  });
  const { type, files, setFiles: setfiles, ...rest } = props;
  return (
    <input type="file" ref={ref} onChange={(e) => props.setFiles([...e.target.files!])} {...rest} />
  );
}